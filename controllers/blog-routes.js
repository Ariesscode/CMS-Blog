const router = require('express').Router();
const blogPrePost = require('../pre-blogData');
const Comment = require('../models/comment');
const Blog = require('../models/blog');
const withAuth = require('../utils/auth'); //add auth after create app
const fs = require('fs');
const commentData = JSON.parse(fs.readFileSync('./seeds/commentData-seeds.json', 'utf-8'));
const userData = JSON.parse(fs.readFileSync('./seeds/user-seeds.json', 'utf-8'));
const userDatabase = userData;




router.get('/', async (req, res) => {
    

    const blogData = await Blog.findAll();
    const blogPosts = blogData.map(post => post.get({ plain: true }));
  
    const getUserById = (userId) => {
      return userDatabase.find(user => user.id === userId);
    };
  
    const formattedComments = commentData.map(comment => {
      const user = getUserById(comment.user_id);
      return {
        user_name: user ? user.username : 'Unknown User',
        comments: comment.comment,
      };
    });
  
    const commentsByBlogPost = {};
    formattedComments.forEach(comment => {
      const postId = comment.blog_id;
      if (!commentsByBlogPost[postId]) {
        commentsByBlogPost[postId] = [];
      }
      commentsByBlogPost[postId].push(comment);
    });
  
    return res.render('all', { blogPrePost, blogPosts, commentsByBlogPost });
  });



router.get('/dashboard', async (req, res) => { //check
    res.render('dashboard');
});

router.get('/home', async (req, res) => { //check
    res.render('home');
});




module.exports =  { router, userDatabase };







