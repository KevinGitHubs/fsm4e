import dbConnect from '@/lib/mongodb';
import AbuseEvent from '@/models/AbuseEvent';
import { verifyAdmin } from '@/lib/auth';
import { broadcast } from '@/lib/ws';
import axios from 'axios';

export async function POST(req) {
  await dbConnect();
  const admin = await verifyAdmin(req);
  if (!admin) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const { type, value, duration } = await req.json();
  const ends = new Date(Date.now() + duration * 1000);

  const abuse = await AbuseEvent.create({
    type,
    value,
    duration,
    createdBy: admin.username,
    active: true,
    endsAt: ends,
  });

  // broadcast ke semua client
  broadcast({ cmd: 'ADMIN_ABUSE', abuse });

  // notifikasi Discord
  axios.post(process.env.DISCORD_WEBHOOK_URL, {
    content: `🚨 **ADMIN ABUSE** ${type} ${value}x selama ${duration}detik oleh ${admin.username}`
  }).catch(() => {});

  return Response.json({ success: true, abuse });
}
