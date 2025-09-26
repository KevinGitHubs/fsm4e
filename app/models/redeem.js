import mongoose from 'mongoose';

const RedeemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, default: 10000 }, // 10k koin → 40k rupiah
  status: { type: String, enum: ['pending', 'sent'], default: 'pending' },
}, { timestamps: true });

export default mongoose.models.Redeem || mongoose.model('Redeem', RedeemSchema);
