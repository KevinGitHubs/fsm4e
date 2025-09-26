import jwt from 'jsonwebtoken';
import User from '@/models/User';

// verifikasi token biasa
export async function verifyToken(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findById(decoded.id).select('-password');
  } catch {
    return null;
  }
}

// verifikasi token + pastikan role = admin
export async function verifyAdmin(req) {
  const user = await verifyToken(req);
  if (!user || user.role !== 'admin') return null;
  return user;
}
