// POST /api/konami  → klaim easter egg
import { verifyToken } from '@/lib/auth';

const KONAMI_REWARD = 2000;
const KONAMI_CODE = [38,38,40,40,37,39,37,39,66,65];

export async function POST(req) {
  const user = await verifyToken(req);
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { sequence } = await req.json();
  if (!sequence || sequence.length !== KONAMI_CODE.length) {
    return Response.json({ error: 'Salah kode' }, { status: 400 });
  }
  for (let i = 0; i < KONAMI_CODE.length; i++) {
    if (sequence[i] !== KONAMI_CODE[i]) return Response.json({ error: 'Salah urutan' }, { status: 400 });
  }

  // cek apakah sudah pernah klaim (1× seumur hidup)
  if (user.konamiClaimed) return Response.json({ error: 'Sudah pernah klaim' }, { status: 400 });

  user.konamiClaimed = true;
  user.coins += KONAMI_REWARD;
  await user.save();

  return Response.json({ success: true, reward: KONAMI_REWARD });
}
