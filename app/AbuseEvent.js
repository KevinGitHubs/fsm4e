import mongoose from 'mongoose';

const AbuseEventSchema = new mongoose.Schema({
  type: { type: String, enum: ['double-coin', 'global-rain', 'freeze-game', 'rank-up'], required: true },
  value: { type: Number, default: 2 },
  duration: { type: Number, default: 30 },
  createdBy: { type: String, required: true },
  active: { type: Boolean, default: true },
  endsAt: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.AbuseEvent || mongoose.model('AbuseEvent', AbuseEventSchema);
