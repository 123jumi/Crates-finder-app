import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { connectDB } from "./database/index.js";
import limiter from "./middleware/limiter.middleware.js";
import cors from "cors";
dotenv.config({ path: "./.env" });

const app = express();
const port = 3000;

app.use(express.json());
const corsOptions = {
	origin: "https://www.cratesfinder.com" || "http://localhost:9000",
};
app.use(cors(corsOptions));

app.use(limiter);
app.use(router);
connectDB(() => {
	app.listen(port, () => {
		console.log(`Server is running at http://localhost:${port}`);
	});
});
