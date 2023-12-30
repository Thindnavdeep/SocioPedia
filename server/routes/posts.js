import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verificationtoken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verificationtoken, getFeedPosts);
router.get("/:userId/posts", verificationtoken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verificationtoken, likePost);

export default router;
