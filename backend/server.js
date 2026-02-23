import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import organizationRoute from "./routes/organization.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", userRoute);
app.use("/api/organization", organizationRoute);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
