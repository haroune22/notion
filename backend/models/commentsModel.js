import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentsSchema = new Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const Comments = mongoose.model("Comments", commentsSchema);

export default Comments;

