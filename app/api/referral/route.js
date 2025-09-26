// POST /api/referral  → klaim kode
import { verifyToken } from '@/lib/auth';

const REFERRAL_REWARD = 1000;

export async function POST(req) {
  const user = await verifyToken(req);
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { code } = await req.json();
  if (!code) return Response.json({ error: 'Kode kosong' }, { status: 400 });

  // contoh: kode = base64(username-nya) 6 karakter
  const target = Buffer.from(code, 'base64').toString().split('-')[0];
  if (target === user.username) return Response.json({ error: 'Tidak bisa klaim kode sendiri' }, { status: 400 });

  // cek apakah kode sudah pernah dipakai (simpan di array localStorage user)
  const used = user.referralUsed || [];
  if (used.includes(code)) return Response.json({ error: 'Kode sudah pernah dipakai' }, { status: 400 });

  // beri reward kedua-duanya (MongoDB) atau kirim payload utk localStorage
  used.push(code);
  user.referralUsed = used;
  user.coins += REFERRAL_REWARD;
  await user.save();

  return Response.json({ success: true, reward: REFERRAL_REWARD });
}
