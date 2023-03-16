const express = require("express");
const user = require("../controllers/User");
const follow = require("../controllers/follow");
const post = require("../controllers/post");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/register", user.registeruser);
router.post("/authenticate", user.loginUser);
router.post("/follow/:id", verifyToken, follow.followUser);
router.post("/unfollow/:id", verifyToken, follow.unfollowUser);
router.get("/user", verifyToken, follow.userProfile);
router.post("/posts", verifyToken, post.addPost);
router.get("/posts/:id", verifyToken, post.uniquePost);
router.get("/all_posts", verifyToken, post.allPost);
router.delete("/posts/:id", verifyToken, post.deletePost);
router.post("/like/:id", verifyToken, post.likePost);
router.post("/unlike/:id", verifyToken, post.unlikePost);
router.post("/comment/:id", verifyToken, post.addComment);

module.exports = router;
