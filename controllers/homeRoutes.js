const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const blogPrePost = require('../pre-blogData');
const Comment = require('../models/comment');
const Blog = require('../models/blog');
const User = require('../models/user');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('all', {
//       users,
//       // Pass the logged in flag to the template
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.get('/', async (req, res) => {

  const blogData = await Blog.findAll();
  const blogPosts = blogData.map(post => post.get({plain: true}))
  const commentData = await Comment.findAll();
  const blogComments = commentData.map(comment => comment.get({plain: true}))

  return res.render('all', { blogPrePost, blogData, blogPosts, blogComments });
});



// router.get('/login', withAuth, (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect('/');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;
