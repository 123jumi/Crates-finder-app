import express from "express";
import userRoutes from "./crates.routes.js";
/**
 * Express router instance.
 * @type {express.Router}
 */
const router = express.Router();

router.use("/api/crates", userRoutes);

export default router;
