import mongoose from 'mongoose';

const ReferralSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // yang pakai
  reward: { type: Number, default: 1000 },
}, { timestamps: true });

export default mongoose.models.Referral || mongoose.model('Referral', ReferralSchema);
