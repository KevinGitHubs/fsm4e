import dbConnect from '@/lib/mongodb';
import QRCode from '@/models/QRCode';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function POST(req) {
  await dbConnect();
  const user = await verifyToken(req);
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const today = new Date().toDateString();
  if (user.lastQRScan === today) return Response.json({ error: 'Sudah scan hari ini' }, { status: 400 });

  const { code } = await req.json();
  const qr = await QRCode.findOne({ code });
  if (!qr || qr.isUsed) return Response.json({ error: 'QR tidak valid atau sudah digunakan' }, { status: 400 });

  qr.isUsed = true;
  qr.usedBy = user._id;
  qr.usedAt = new Date();
  await qr.save();

  user.coins += qr.coins;
  user.scanCount += 1;
  user.gameUnlocked = true;
  user.lastQRScan = today;
  await user.save();

  return Response.json({ success: true, coins: qr.coins });
}
