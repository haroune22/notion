import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import colors from "colors";

import userRoute from "./routes/userRoute.js";
import organizationRoute from "./routes/organization.js";
import projectRoute from "./routes/project.js";
import taskRoute from './routes/task.js'
import inviteRoute from './routes/invite.js'
import commentsRoute from './routes/comments.js'


dotenv.config();

const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", userRoute);
app.use("/api/organization", organizationRoute);
app.use("/api/projects", projectRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/invite", inviteRoute);
app.get("/api/comments", commentsRoute);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
