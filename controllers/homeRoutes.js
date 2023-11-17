const router = require("express").Router();
const blogPrePost = require("../pre-blogData");
const Comment = require("../models/comment");
const Blog = require("../models/blog");
const User = require("../models/user");
const withAuth = require('../utils/auth');
// const withAuth = require('../utils/auth');

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
  const logged_in = req.session.user_id ? true : false;
console.log('logged_in:', logged_in);
res.render('all', { blogPrePost, blogData, blogPosts, logged_in });

  
});
router.get("/login", async (req, res) => {
  res.render("login");
});




 module.exports = router;





















