import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verificationtoken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verificationtoken, getUser);
router.get("/:id/friends", verificationtoken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verificationtoken, addRemoveFriend);

export default router;
