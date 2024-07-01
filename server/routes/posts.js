import express from 'express';
import { getFeedPosts, getUserPosts, likePosts } from '../controllers/posts.js';
import { verifyToken } from '../middleware/middleAuth.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);


/* UPDATE */
router.patch(".:id/likePost", verifyToken, likePosts);

export default router;