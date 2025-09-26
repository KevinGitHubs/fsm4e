import mongoose from 'mongoose';

const SpinLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reward: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.SpinLog || mongoose.model('SpinLog', SpinLogSchema);
