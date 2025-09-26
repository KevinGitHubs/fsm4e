// POST /api/report  → lapor bug
import { verifyToken } from '@/lib/auth';
import axios from 'axios';

export async function POST(req) {
  const user = await verifyToken(req);
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { title, description } = await req.json();
  if (!description) return Response.json({ error: 'Deskripsi kosong' }, { status: 400 });

  const msg = `🐛 **BUG REPORT**\nUser: ${user.username}\nJudul: ${title}\nDeskripsi: ${description}`;
  axios.post(process.env.DISCORD_WEBHOOK_URL, { content: msg }).catch(() => {});

  return Response.json({ success: true });
}
