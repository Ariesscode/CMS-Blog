const router = require('express').Router();
const {User, Blog, Comment} = require('../../models');
const withAuth = require('../../utils/auth');




router.get('/', withAuth, async (req, res) => {
  try {
    const logged_in = req.session.logged_in;

    const userData = await User.findOne({
      where: { id: req.session.user_id },
      attributes: ['id','username'],
      include: [
        {
          model: Blog,
          attributes: ['id', 'post_heading', 'post_body', 'post_date'],
        },
      ],
    });

    if (!userData) {
      console.log('User not found.');
      return res.status(404).json({ message: 'User not found.' });
    }

    const {id, username, Blogs} = userData;

    res.render('dashboard', { logged_in, userId: id, username, userPosts: Blogs });
    console.log({ logged_in, userId: id, username, userPosts: Blogs });
    
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




router.get('/:id', withAuth, async (req, res) =>{
    try {
        const contentData = await Blog.findByPk(req.params.id, {
            include: [{model: User, attributes: ['username']},
            {model: Comment, include: [{model: User, attributes: ['username']}]}],
            exclude: [{model: User, attributes: ['password']}]
        });
        if (!contentData) {
            res.status(404).json({message: 'No content found with this id!'});
            return;
        }
        res.status(200).json(contentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const { title, text } = req.body;
    if ('user_id' in req.session) {
      const { user_id, user_name } = req.session;

      const dbUserData = await User.findByPk(user_id);
     
      const newContent = await Blog.create({
        user_id,
        user_name: dbUserData.username,
        post_heading: title,
        post_body: text,
        
      });

      res.redirect('/')
      console.log('newContent:', newContent);

      // res.send('Post added!');
    } else {
      res.status(400).send('User session information incomplete.');
    }
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', withAuth, async (req, res) =>{
    try {
        const contentData = await Blog.update(req.body, {
            where: {id: req.params.id}
        });
        if (!contentData) {
            res.status(404).json({message: 'No content found with this id!'});
            return;
        }
        res.status(200).json(contentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    console.log('Deleting post with id number:', req.params.id);
      const contentData = await Blog.destroy({
          where: { id: req.params.id }
          
      });

      if (!contentData) {
        console.log('No content found with id number:', req.params.id);

          res.status(404).json({ message: 'No content found with this id!' });
          return;
      }
      console.log('Post deleted successfully:', req.params.id);

      res.render('dashboard');

  } catch (err) {
      res.status(500).json(err);
      console.error('Error deleting post:', err);

  }
});


    module.exports = router