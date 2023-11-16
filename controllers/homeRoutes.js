const router = require("express").Router();
const blogPrePost = require("../pre-blogData");
const Comment = require("../models/comment");
const Blog = require("../models/blog");
const User = require("../models/user");
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

 router.get('/posthistory', async (req, res) => {
 try {
  
     const userPosts = await Blog.findAll({
       where: {
         user_id: req.session.user_id,
    },
       attributes: ['id', 'post_heading', 'post_body', 'post_date'], 
      include: [
         {
        model: User,
          attributes: ['username'], 
        },
       ],
    });
    const sessionUserId = req.session.user_id;
 const logged_in = !!req.session.user_id;
    res.render('dashboard', { userPosts, logged_in, sessionUserId }); 
   console.log(userPosts)
  } catch (err) {
    res.status(500).json(err);
   }
 });

 module.exports = router;





















