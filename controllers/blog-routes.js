const router = require('express').Router();
const blogPrePost = require('../pre-blogData');



router.get('/', async (req, res) => {
    return res.render('all', { blogPrePost });
  

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


