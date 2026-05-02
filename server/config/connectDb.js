import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
    if (isConnected) {
        console.log("✅ Using existing database connection");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = db.connections[0].readyState === 1;
        console.log("✅ DataBase Connected Successfully")
    } catch (error) {
        console.error(`❌ DataBase Connection Failed: ${error.message}`)
        console.error("Full error:", error)
    }
}

export default connectDb