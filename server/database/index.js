import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const mongoUrl = process.env.MONGO_URL;

export const connectDB = (callback) => {
	mongoose
		.connect(mongoUrl)
		.then(() => {
			console.log("Connected to db.");
			if (callback) callback();
		})
		.catch((e) => {
			console.log(e);
		});
};
