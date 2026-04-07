import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const client = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB Connected: ${client.connection.name}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
