const User = require("../models/User");
const userProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send({
    username: user.name,
    followers: user.followers.length,
    folowing: user.following.length,
  });
};

const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);
    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }
    if (userToFollow.followers.includes(currentUser._id)) {
      return res
        .status(400)
        .json({ message: "User is already being followed" });
    }
    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);
    await userToFollow.save();
    await currentUser.save();
    res.json({ message: `You are now following ${userToFollow.name}` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
const unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);
    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!userToUnfollow.followers.includes(currentUser._id)) {
      return res.status(400).json({ message: "User is not being followed" });
    }
    currentUser.following = currentUser.following.filter(
      (followingId) => followingId.toString() !== userToUnfollow._id.toString()
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (followerId) => followerId.toString() !== currentUser._id.toString()
    );

    await userToUnfollow.save();
    await currentUser.save();
    res.json({ message: `You are no longer following ${userToUnfollow.name}` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
module.exports = { followUser, unfollowUser, userProfile };
