const router = require('express').Router();
const blogPrePost = require('../../pre-blogData');
const Comment = require('../../models/comment');
const Blog = require('../../models/blog');
const User = require('../../models/user');
const withAuth = require('../../utils/auth');
 //add auth after create app


router.get('/', async (req, res) => {  
 
    const blogData = await Blog.findAll();
    const blogPosts = blogData.map(post => post.get({plain: true}))
    const commentData = await Comment.findAll();
    const blogComments = commentData.map(comment => comment.get({plain: true}))

    return res.render('all', { blogPrePost, blogData, blogPosts, blogComments});
});

router.get('/', async (req, res) => {  
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: Comment,
          include: User, 
        },
      ],
    });

    const blogPosts = blogData.map(post => post.get({ plain: true }));

    return res.render('all', { blogPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});






  
router.post('/comment', withAuth, async (req, res) => {
    try {
     
      const newComment = await Comment.create({
        ...req.body,
        blog_id: req.params.blog_id,
        user_id: req.session.user_id,
        comment: req.body.comment
      });
      res.status(200).json(newComment);
      
  
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
   



module.exports = router;


