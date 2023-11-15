const router = require('express').Router();
const blogPrePost = require('../../pre-blogData');
const Comment = require('../../models/comment');
const Blog = require('../../models/blog');
const User = require('../../models/user');
const withAuth = require('../../utils/auth');
 //add auth after create app


//  router.get('/', async (req, res) => {
//   try {
//       const blogData = await Blog.findAll({
//           include: [{ model: Comment, include: User }] 
//       });
//       const blogPosts = blogData.map(post => post.get({ plain: true }));
      
//       return res.render('all', { blogPrePost, blogData, blogPosts });
//   } catch (err) {
//       console.error(err);
//       res.status(500).json(err);
//   }
// });
router.get('/', async (req, res) => {
  try {
      const blogPosts = await Blog.findAll({
          include: [{ model: Comment }],
      });

      res.render('blog-posts', { blogPosts });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.post('/comment/:blog_id', withAuth, async (req, res) => {
    try {
     
      const newComment = await Comment.create({
        ...req.body,
        blog_id: req.params.blog_id,
        user_id: req.session.user_id,
        
      });
      res.status(200).json(newComment);
      
  
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
   



module.exports = router;


