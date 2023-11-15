const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');


router.post('/register', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
//user/login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({where: {email: req.body.email }});

    if (!dbUserData) {
      res.status(400)
        res.json({ message: 'Login credentials un-identified. Please try again.' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.statusText = 'Incorrect password';
        res.status(400)
        res.json({ message: 'Unable to process log-in. Please try again!' });
      return;
    } 

    req.session.save(() => {
      req.session.user_id = dbUserData.id
      req.session.logged_in = true;
      res.status(200).json({ message: 'You are now logged in!', username: dbUserData.username });
    
    });
  
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/profile', async (req, res) => {
//   try {
//       const userData = await User.findByPk(req.session.user_id, {
//           attributes: { exclude: ['password'] },
//           include: [{ model: Content, Resource }]
//       });
//       res.status(200).json(userData);
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });


router.get('/userloggedin', async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
          include: [{ model: Blog, Comment }],
          attributes: { exclude: ['password'] }
      });
      res.status(200).json(userData);
  } catch (err) {
      res.status(500).json(err);
  }
});



// DELETE /api/users/":id"
router.delete('/:id', async (req, res) => {
  try {
      // Delete a user by id
      const userData = await User.destroy({
          where: { id: req.params.id }
      });
      // If no user is found, return an error
      if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
      }
      res.status(200).json(userData);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/')
   
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
