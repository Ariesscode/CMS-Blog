const router = require('express').Router();
const blogPrePost = require('../../pre-blogData');
const Comment = require('../../models/comment');
const Blog = require('../../models/blog');
const User = require('../../models/user');
const withAuth = require('../../utils/auth');
 //add auth after create app


 
router.post('/', withAuth, async (req, res) => {
    try {
      const { comment } = req.body;
    if ('user_id' in req.session) {
      const { user_id, user_name } = req.session;

      const dbUserData = await User.findByPk(user_id);
     
      const newComment = await Comment.create({
        ...req.body,
        user_id,
        blog_id: req.params.blog_id,
        user_name: dbUserData.username,
        comment: comment
        
      });
      const logged_in = true;
      res.status(200).json({
        newComment,
        logged_in,
      })
      return res.redirect('/');
    } else {
      res.status(400).send('Comment could not be added. Please try again.');
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
   



module.exports = router;


