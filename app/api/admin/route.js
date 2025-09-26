import { verifyAdmin } from '@/lib/auth';
import axios from 'axios';

export async function POST(req) {
  const admin = await verifyAdmin(req);
  if (!admin) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const { message } = await req.json();

  axios.post(process.env.DISCORD_WEBHOOK_URL, {
    content: `📢 **GLOBAL CHAT** dari admin: ${message}`
  }).catch(() => {});

  return Response.json({ success: true });
}
