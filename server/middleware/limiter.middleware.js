import rateLimit from "express-rate-limit";
console.log("limiter.middleware.js");
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 50,
	message: "Too many requests from this IP, please try again after 5 minutes",
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default limiter;
