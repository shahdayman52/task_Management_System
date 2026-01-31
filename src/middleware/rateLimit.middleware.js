import rateLimit from "express-rate-limit";

export const apiRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many requests, please try again later",
  },
  standardHeaders:true,
  legacyHeaders:false
});
