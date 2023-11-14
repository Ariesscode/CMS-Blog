const router = require('express').Router();
const {User, Blog, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => { //check
  const logged_in = req.session.logged_in;
    res.render('dashboard', { logged_in });
});


router.get('/', withAuth, async (req, res) => {
    try {
      // Fetch the user's posts from the database
      const userPosts = await Blog.findAll({
        where: {
          user_id: req.session.user_id,
        },
        attributes: ['id', 'post_heading', 'post_body', 'post_date'], // Define the columns you want to display
      });
  
      res.render('dashboard', { userPosts }); // Render the dashboard page with user's posts in table
    } catch (err) {
      res.status(500).json(err);
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
      const newContent = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
        title: req.body.post_heading,
        text: req.body.post_body,
      });
  
      res.status(200).json(newContent);
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