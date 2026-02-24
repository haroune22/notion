import mongoose from "mongoose";
import { Schema } from "mongoose";

const organizationMemberSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Organization",
    },
    role: {
      type: String,
      enum: ["manager", "admin", "member"],
      default: "user",
    },
  },
  { timestamps: true },
);

organizationMemberSchema.index(
  { user: 1, organization: 1 },
  { unique: true }
);

const OrganizationMember = mongoose.model(
  "OrganizationMember",
  organizationMemberSchema,
);

export default OrganizationMember;
