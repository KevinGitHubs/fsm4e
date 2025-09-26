import dbConnect from '@/lib/mongodb';
import GameScore from '@/models/GameScore';
import User from '@/models/User';
import { startOfDay } from 'date-fns';

export async function GET(req) {
  await dbConnect();
  const today = startOfDay(new Date());
  const scores = await GameScore.find({ createdAt: { $gte: today } })
    .populate('user', 'username')
    .sort({ score: -1 })
    .limit(10);

  const list = scores.map((e, i) => ({ username: e.user.username, score: e.score }));
  return Response.json(list);
}
