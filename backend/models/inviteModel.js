import mongoose from 'mongoose';
import Schema from 'mongoose';

const inviteSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "رفض"],
    default: "pending",
  },
  expiresAt: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const Invite = mongoose.model('Invite', inviteSchema);

export default Invite;