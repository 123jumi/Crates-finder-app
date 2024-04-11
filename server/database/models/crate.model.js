import mongoose from "mongoose";

const item = mongoose.Schema({
	key: { type: String, required: true },
	value: { type: String, required: true },
});

const crateSchema = mongoose.Schema({
	id: { type: Number, required: true },
	price: { type: Number, required: true },
	stats: [item],
});

export default mongoose.model("crate", crateSchema);
