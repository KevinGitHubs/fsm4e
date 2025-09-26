import dbConnect from '@/lib/mongodb';
import QRCode from '@/models/QRCode';
import { verifyAdmin } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  await dbConnect();
  const admin = await verifyAdmin(req);
  if (!admin) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const { coins = 60 } = await req.json(); // default -40% balance
  const code = 'FSM' + uuidv4().slice(-6).toUpperCase();

  await QRCode.create({ code, coins });

  return Response.json({ success: true, code });
}
