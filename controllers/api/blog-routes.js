const router = require('express').Router();
const blogPrePost = require('../pre-blogData');
const Comment = require('../models/comment');
const Blog = require('../models/blog');
const User = require('../models/user');
const withAuth = require('../utils/auth');
 //add auth after create app


router.get('/', async (req, res) => {

    const blogData = await Blog.findAll();
    const blogPosts = blogData.map(post => post.get({plain: true}))
    const commentData = await Comment.findAll();
    const blogComments = commentData.map(comment => comment.get({plain: true}))

    return res.render('all', { blogPrePost, blogData, blogPosts, blogComments });
});


  

   




module.exports = router;


