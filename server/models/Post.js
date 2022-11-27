import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    username: { type: String },
    title: { type: String, required: true },
    text: { type: String, required: true },
    imgUrl: { type: String, default: '' },
    views: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    imgUrl2: { type: String, default: '' },
    price: { type: Number, default: 0 },
    announce: { type: Number, default: 0 },
    announcedate: { type: Date },
    endannounce: { type: Number, default: 0 },
    bid: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export default mongoose.model('Post', PostSchema);
