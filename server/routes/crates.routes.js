import express from "express";
import * as crate from "../controllers/crates.controller.js";

const router = express.Router();
/**
 * Required scopes for reading users.
 * @type {Function}
 */
console.log("User routes loaded.");
router.get("/:address/:min/:max", crate.getCrates);

export default router;
