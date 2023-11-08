const router = require('express').Router();
const blogPrePost = require('../pre-blogData');
const Comment = require('../models/comment');
const Blog = require('../models/blog');
const withAuth = require('../utils/auth'); //add auth after create app

// ROUTES for blog posts 

    router.get('/dashboard', async (req, res) => { //check
        res.render('dashboard');
    });
    
   
  //blogPosts
router.get('/', async (req, res) => {

    const blogData = await Blog.findAll();
    const blogPosts = blogData.map(post => post.get({plain: true}))
    const commentData = await Comment.findAll();
    const blogComments = commentData.map(comment => comment.get({plain: true}))

    return res.render('all', { blogPrePost, blogData, blogPosts, blogComments });
});

router.get('/dashboard/:id', async (req, res) =>{
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


router.post('/dashboard', async (req, res) => {
    try {
      const newContent = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newContent);
    } catch (err) {
      res.status(400).json(err);
    }
  });
router.put('/dashboard/:id', async (req, res) =>{
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

    router.delete('/dashboard/:id', async (req, res) =>{
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
    
  

    router.get('/login', (req, res) => {
        // If the user is already logged in, redirect to the homepage
        // if (req.session.loggedIn) {
        //   res.redirect('/');
        //   return;
        // }
        // Otherwise, render the 'login' template
        res.render('login');
      });




module.exports = router;


