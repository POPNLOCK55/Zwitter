import express from 'express';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/postsController.js';
import { verifyToken } from '../middleware/middleAuth.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);


/* UPDATE */
router.patch(".:id/likePost", verifyToken, likePost);

export default router;