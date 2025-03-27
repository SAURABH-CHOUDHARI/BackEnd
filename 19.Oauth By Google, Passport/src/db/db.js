import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        const connection = await mongoose.connect("mongodb://127.0.0.1:27017/kodr");
        console.log("Connected to DB");
        return connection;
    } catch (err) {
        console.error("Database connection error:", err);
        throw err;
    }
};

export default connectDb;