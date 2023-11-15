const router = require('express').Router();
const blogPrePost = require('../../pre-blogData');
const Comment = require('../../models/comment');
const Blog = require('../../models/blog');
const User = require('../../models/user');
const withAuth = require('../../utils/auth');
 //add auth after create app


 
router.post('/comment/:blog_id', withAuth, async (req, res) => {
    try {
     
      const newComment = await Comment.create({
        ...req.body,
        blog_id: req.params.blog_id,
        user_id: req.session.user_id,
        
      });
      const logged_in = true;
      res.status(200).json({
        newComment,
        logged_in,
      });
      
  
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
   



module.exports = router;


