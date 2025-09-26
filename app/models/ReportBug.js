import mongoose from 'mongoose';

const ReportBugSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  description: { type: String, required: true },
  screenshot: { type: String }, // base64 opsional
  fixed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.ReportBug || mongoose.model('ReportBug', ReportBugSchema);
