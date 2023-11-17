const router = require('express').Router();
const blogPrePost = require('../../pre-blogData');
const Comment = require('../../models/comment');
const Blog = require('../../models/blog');
const User = require('../../models/user');
const withAuth = require('../../utils/auth');
 //add auth after create app


 
router.post('/:id', withAuth, async (req, res) => {
    try {
      const { comment } = req.body;
    if ('user_id' in req.session) {
      const { user_id, user_name } = req.session;
      const logged_in = req.session.logged_in

      const dbUserData = await User.findByPk(user_id);
     
      const newComment = await Comment.create({
        ...req.body,
        user_id,
        blog_id: req.params.id,
        user_name: dbUserData.username,
        comment: comment
        
      });
  
       res.redirect('/?message=comment Added!');
       console.log('newComment:', newComment);
    } else {
      res.status(400).send('Comment could not be added. Please try again.');
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
   



module.exports = router;


