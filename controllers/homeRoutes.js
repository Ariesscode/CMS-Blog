const router = require("express").Router();
const blogPrePost = require("../pre-blogData");
const Comment = require("../models/comment");
const Blog = require("../models/blog");
const User = require("../models/user");
router.get("/", async (req, res) => {
  const blogData = await Blog.findAll({
    include: [
      {
        model: Comment,
        include: [User],
      },
    ],
  });
  const blogPosts = blogData.map((post) => post.get({ plain: true }));
  return res.render("all", { blogPrePost, blogData, blogPosts });
});
router.get("/login", async (req, res) => {
  res.render("login");
});
module.exports = router;























