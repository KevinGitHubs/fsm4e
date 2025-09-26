import dbConnect from '@/lib/mongodb';
import GameScore from '@/models/GameScore';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function POST(req) {
  await dbConnect();
  const user = await verifyToken(req);
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  // anti-cheat: interval klik < 80 ms = cheat
  const { clicks, score } = await req.json();
  for (let i = 1; i < clicks.length; i++) {
    if (clicks[i] - clicks[i - 1] < 80) {
      return Response.json({ error: 'Cheat detected' }, { status: 400 });
    }
  }

  // unlock game harus true
  if (!user.gameUnlocked) return Response.json({ error: 'Game belah unlock' }, { status: 403 });

  // simpan score
  const entry = await GameScore.create({ user: user._id, score });

  // hitung rank & reward (-40% balance)
  const rank = (await GameScore.countDocuments({ score: { $gt: score } })) + 1;
  const mul = ['nonpil', 'klovs', 'bvas', 'tzaz'].indexOf(user.rank) + 1;
  let coin = 0;
  if (rank === 1) coin = Math.floor(300 * mul);
  else if (rank === 2) coin = Math.floor(240 * mul);
  else if (rank === 3) coin = Math.floor(180 * mul);
  else coin = Math.floor(30 * mul);

  user.coins += coin;
  await user.save();

  return Response.json({ coin, rank });
}
