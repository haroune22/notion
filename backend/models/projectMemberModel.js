import mongoose from "mongoose";
import { Schema } from "mongoose";

const projectMemberSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    Project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    role: {
      type: String,
      enum: ["admin", "member"],
    },
  },
  { timestamps: true },
);

projectMemberSchema.index(
  { user: 1, project: 1 },
  { unique: true }
);

const ProjectMember = mongoose.model(
  "ProjectMember",
  projectMemberSchema,
);

export default ProjectMember;
