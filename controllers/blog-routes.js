const router = require('express').Router();
const blogPrePost = require('./blogData');



router.get('/', async (req, res) => {
    return res.render('all', { blogPrePost });
  

});



router.get('/login', async (req, res) => { //check
    res.render('login');
})

router.get('/dashboard', async (req, res) => { //check
    res.render('dashboard');
})
module.exports = router;


