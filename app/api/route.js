import dbConnect from '@/lib/mongodb';
import SpinLog from '@/models/SpinLog';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { startOfDay } from 'date-fns';

const SPIN_REWARDS = [800, 200, 100, 50, 20]; // -40% balance

export async function POST(req) {
  await dbConnect();
  const user = await verifyToken(req);
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const today = startOfDay(new Date());
  const existing = await SpinLog.findOne({ user: user._id, createdAt: { $gte: today } });
  if (existing) return Response.json({ error: 'Sudah spin hari ini' }, { status: 400 });

  // random reward
  const reward = SPIN_REWARDS[Math.floor(Math.random() * SPIN_REWARDS.length)];

  user.coins += reward;
  await user.save();
  await SpinLog.create({ user: user._id, reward });

  return Response.json({ reward });
}
