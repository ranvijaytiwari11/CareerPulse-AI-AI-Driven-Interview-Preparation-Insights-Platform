import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("✅ DataBase Connected Successfully")
    } catch (error) {
        console.error(`❌ DataBase Connection Failed: ${error.message}`)
        console.error("Full error:", error)
        process.exit(1)
    }
}

export default connectDb