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
      const logged_in = req.session.logged_in;

      const newContent = await Blog.create({
        ...req.body,
        blog_id: req.params.blog_id,
        user_id: req.session.user_id,
        title: req.body.post_heading,
        text: req.body.post_body,
      });
      res.status(200).json({
        logged_in,
        newContent,
        message: 'Post added!',
      });
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

    router.delete('/:id', withAuth, async (req, res) =>{
        try {
            const contentData = await Blog.destroy({
                where: {id: req.params.id}
            });
            if (!contentData) {
                res.status(404).json({message: 'No content found with this id!'});
                return;
            }
            res.status(200).send('Content deleted!');
        } catch (err) {
            res.status(500).json(err);
        }
    });
    
    module.exports = router