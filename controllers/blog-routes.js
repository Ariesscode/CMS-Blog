const router = require('express').Router();

router.get('/', async (req, res) => {
  
  res.render('all');
});

router.get('/login', async (req, res) => { //check
    res.render('login');
})

router.get('/dashboard', async (req, res) => { //check
    res.render('dashboard');
})
module.exports = router;