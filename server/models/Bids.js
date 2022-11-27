import mongoose from 'mongoose';

const BidsSchema = new mongoose.Schema(
  {
    bidsDate: { type: Date },
    bidsPrice: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);
export default mongoose.model('Comment', BidsSchema);
