const router = require('express').Router();
const blogPrePost = require('../pre-blogData');
const Blog = require('../models/blog');
const withAuth = require('../utils/auth');



router.get('/', withAuth, async (req, res) => {

    const blogData = await Blog.findAll();
    const blogPosts = blogData.map(post => post.get({plain: true}))

    return res.render('all', { blogPrePost, blogPosts });
  

});



router.get('/login', async (req, res) => { 
    res.render('login');
});

router.get('/dashboard', async (req, res) => { //check
    res.render('dashboard');
});

router.get('/home', async (req, res) => { //check
    res.render('home');
});



module.exports = router;


