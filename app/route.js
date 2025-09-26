// POST /api/streak  → claim streak 7 hari
import { verifyToken } from '@/lib/auth';
import { startOfDay } from 'date-fns';

const STREAK_REWARD = 1200;

export async function POST(req) {
  const user = await verifyToken(req);
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const today = startOfDay(new Date());
  let streak = user.streakCount || 0;

  // cek apakah hari ini sudah claim
  if (user.lastStreak && startOfDay(user.lastStreak) >= today) {
    return Response.json({ error: 'Sudah claim hari ini' }, { status: 400 });
  }

  // hitung streak (reset kalau bolos 1 hari)
  const yesterday = startOfDay(new Date(today.getTime() - 24 * 60 * 60 * 1000));
  if (!user.lastStreak || startOfDay(user.lastStreak) < yesterday) streak = 1;
  else streak += 1;

  if (streak < 7) {
    user.streakCount = streak;
    user.lastStreak = today;
    await user.save();
    return Response.json({ streak, claimed: false });
  }

  // claim reward
  user.streakCount = 0; // reset
  user.lastStreak = today;
  user.coins += STREAK_REWARD;
  await user.save();

  return Response.json({ success: true, reward: STREAK_REWARD, streak: 7 });
}
