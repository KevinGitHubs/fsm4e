import mongoose from 'mongoose';

const QRCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  isUsed: { type: Boolean, default: false },
  usedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  usedAt: { type: Date, default: null },
  coins: { type: Number, default: 60 }, // -40% balance
}, { timestamps: true });

export default mongoose.models.QRCode || mongoose.model('QRCode', QRCodeSchema);
