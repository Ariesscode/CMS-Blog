const router = require('express').Router();
const blogPrePost = require('../../pre-blogData');
const Comment = require('../../models/comment');
const Blog = require('../../models/blog');
const withAuth = require('../../utils/auth');
 //add auth after create app


router.get('/', async (req, res) => {

    const blogData = await Blog.findAll();
    const blogPosts = blogData.map(post => post.get({plain: true}))
    const commentData = await Comment.findAll();
    const blogComments = commentData.map(comment => comment.get({plain: true}))

    return res.render('all', { blogPrePost, blogData, blogPosts, blogComments });
});


  
router.post('/:blog_id/comment', withAuth, async (req, res) => {
    try {
      // Ensure that req.session.user_id is available to associate the comment with the user
      const newComment = await Comment.create({
        ...req.body,
        blog_id: req.params.blog_id,
        user_id: req.session.user_id, // Assuming user_id is stored in the session during login
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
   



module.exports = router;


