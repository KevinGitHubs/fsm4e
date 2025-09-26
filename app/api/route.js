import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import axios from 'axios';

const REDEEM_RATE = 10000; // 10k koin → Rp 40.000 (balance -40%)

export async function POST(req) {
  await dbConnect();
  const user = await verifyToken(req);
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  if (user.coins < REDEEM_RATE) {
    return Response.json({ error: 'Koin tidak cukup' }, { status: 400 });
  }

  // cek apakah hari ini sudah redeem (opsional)
  const today = new Date().toDateString();
  if (user.lastRedeem === today) {
    return Response.json({ error: 'Sudah redeem hari ini' }, { status: 400 });
  }

  // potong koin
  user.coins -= REDEEM_RATE;
  user.lastRedeem = today;
  await user.save();

  // notifikasi Discord
  axios.post(process.env.DISCORD_WEBHOOK_URL, {
    content: `💰 **REDEEM BERHASIL**\nUser: ${user.username}\nJumlah: Rp 40.000\nSisa Koin: ${user.coins}`
  }).catch(() => {});

  return Response.json({ success: true, message: 'Redeem berhasil! Dana akan dikirim ke Dana Anda dalam 1×24 jam.' });
}
