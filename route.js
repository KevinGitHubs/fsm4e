import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  const user = await verifyToken(req);
  if (!user) return Response.json({ user: null }, { status: 401 });

  return Response.json({
    user: { username: user.username, role: user.role, coins: user.coins, rank: user.rank, gameUnlocked: user.gameUnlocked }
  });
}
