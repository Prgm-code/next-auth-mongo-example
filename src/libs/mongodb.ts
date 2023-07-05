import mongoose from "mongoose";

const { MONGODB_URI, MONGODB_USER, MONGODB_PASSWORD, MONGODB_DB} = process.env;
if (!MONGODB_URI)
  throw new Error(
    "Please define the MONGODB_URI MONGODB_USER MONGODB_PASSWORD MONGODB_DB environment variable inside .env.local"
  );

  export const connectDB = async () => {
    try {
      const { connection } = await mongoose.connect(MONGODB_URI, {
        user: MONGODB_USER,
        pass: MONGODB_PASSWORD,
        dbName: MONGODB_DB,
      });
      if (connection.readyState === 1) {
        console.log("MongoDB connected");
      }
      return Promise.resolve(true);
    } catch (error) {
      console.log(error);
      return Promise.reject(false);
    }
  };
  
  