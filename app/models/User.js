import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  coins: { type: Number, default: 0 },
  rank: { type: String, enum: ['nonpil', 'klovs', 'bvas', 'tzaz'], default: 'nonpil' },
  scanCount: { type: Number, default: 0 },
  streakCount: { type: Number, default: 0 },
  lastStreak: { type: Date, default: null },
  lastQRScan: { type: String, default: null }, // YYYY-MM-DD
  lastRedeem: { type: Date, default: null },
  gameUnlocked: { type: Boolean, default: false },
  konamiClaimed: { type: Boolean, default: false },
  referralUsed: [{ type: String }], // kode yang sudah dipakai
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
