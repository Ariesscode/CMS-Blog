const router = require('express').Router();

const blogPrePost = [
    {
      user_name: 'Abby',
      post_heading: 'Why MVC is so important',
      post_date: '11/3/2023',
      post_body: 'MVC allows developers to maintain a true seperation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
    },
    
  ];

router.get('/', async (req, res) => {
  
  res.render('all');
});

router.get('/all/:num', async (req, res) => {
    return res.render('all', blogPrePost[req.params.num - 1]);
  });

router.get('/login', async (req, res) => { //check
    res.render('login');
})

router.get('/dashboard', async (req, res) => { //check
    res.render('dashboard');
})
module.exports = router;