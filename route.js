import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await dbConnect();
  const { username, password } = await req.json();

  // Cek user
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return Response.json({ error: 'Salah username/password' }, { status: 401 });
  }

  // Buat JWT
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

  return Response.json({
    token,
    user: { username: user.username, role: user.role, coins: user.coins, rank: user.rank, gameUnlocked: user.gameUnlocked }
  });
}
