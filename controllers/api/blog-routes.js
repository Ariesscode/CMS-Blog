const router = require('express').Router();
const blogPrePost = require('../../pre-blogData');
const Comment = require('../../models/comment');
const Blog = require('../../models/blog');
const User = require('../../models/user');
const withAuth = require('../../utils/auth'); //user must be logged in to create posts, or comment on a post 
//models imported for functionality 


 
router.post('/:id', withAuth, async (req, res) => {
    try {
      const { comment } = req.body;
    if ('user_id' in req.session) {
      const { user_id, user_name } = req.session; //checks if user logged in and adds a property onto the session of logged status
      const logged_in = req.session.logged_in

      const dbUserData = await User.findByPk(user_id);
     
      const newComment = await Comment.create({ //comment is created using the new instance of comment model
        ...req.body,
        user_id,
        blog_id: req.params.id,
        user_name: dbUserData.username, //retrieves the users username from logged in user id 
        comment: comment
        
      });
  
       res.redirect('/?message=comment Added!'); //when comment is added, it will show a message in url 
       console.log('newComment:', newComment);
    } else {
      res.status(400).send('Comment could not be added. Please try again.');
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
   



module.exports = router;


