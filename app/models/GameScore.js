import mongoose from 'mongoose';

const GameScoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.GameScore || mongoose.model('GameScore', GameScoreSchema);
