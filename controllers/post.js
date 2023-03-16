const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");
const addPost = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.send("all fields are required");
  }
  try {
    const newPost = await new Post({
      title,
      description,
      createdBy: req.user._id,
    });
    const post = await newPost.save();
    res.send({
      "Post-ID": post._id,
      Title: post.title,
      Description: post.description,
      "Created Time": post.createdAt,
    });
  } catch (error) {
    res.send(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.find({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (post.length == 0) {
      return res.send("There is no post that you are requesting for");
    }
    await Post.findByIdAndDelete(req.params.id);
    res.send("post has been deleted");
  } catch (error) {
    res.send(error);
  }
};

const allPost = async (req, res) => {
  try {
    const posts = await Post.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });
    // res.send({
    //   id: posts._id,
    //   title: posts.title,
    //   desc: posts.description,
    //   created_at: posts.createdAt,
    //   comments: posts.comments,
    //   likes: posts.likes.length,
    // });
    res.send(posts);
  } catch (error) {
    res.send(error);
  }
};

const uniquePost = async (req, res) => {
  try {
    const post = await Post.findById({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (post.length == 0) {
      return res.send("There is no post that you are requesting for");
    }
    res.send({
      "post Id": post._id,
      likes: post.likes.length,
      comments: post.comments.length,
    });
  } catch (error) {
    res.send(error);
  }
};
const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    let post = await Post.findById({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    // console.log(post);

    if (post.length == 0) {
      return res.send("There is no such post");
    }
    const newComment = await new Comment({
      post: req.params.id,
      user: req.user._id,
      comment,
    });
    const result = await newComment.save();
    post.comments.push(result._id);
    console.log(post);
    await post.save();
    res.send({ " Comment-ID": result._id });
  } catch (error) {
    res.send(error);
  }
};

const unlikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      res.send({ error: "Post not found" });
      return;
    }

    post.likes = post.likes.filter((like) => like.toString() !== userId);

    await post.save();

    res.send({ message: "Post unliked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const likePost = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    const postId = req.params.id;

    const post = await Post.findById(postId);
    console.log(post);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    post.likes.push(user._id);

    await post.save();

    res.json({ message: "Post liked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  addPost,
  deletePost,
  allPost,
  uniquePost,
  addComment,
  likePost,
  unlikePost,
};
