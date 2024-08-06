import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) return;
    const { connection } = await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        dbName: "ams",
      }
    );
    console.log(`Connected to db: ${connection.host}`);
  } catch (error) {
    throw new Error("Error connecting to database");
  }
};
