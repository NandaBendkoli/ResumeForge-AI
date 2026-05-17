import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    counterId: { type: String, trim: true },
    seq: { type: Number, default: 100000 }
});

export default mongoose.model("counter", counterSchema);
