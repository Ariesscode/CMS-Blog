const router = require('express').Router();
const {User, Blog, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => { //check
  const logged_in = req.session.logged_in;

  // Define an async function to retrieve the username
  async function getUsernameByUserId(userId) {
    try {
      const user = await User.findByPk(userId); // Find the user by primary key (user_id)

      if (!user) {
        // User not found
        return null;
      }

      return user.username; // Return the username
    } catch (error) {
      console.error('Error fetching username:', error);
      throw error;
    }
  }

  // Usage
  const sessionUserId = await req.session.user_id;

  const userIdFromDB = await getUsernameByUserId(sessionUserId)
    .then((username) => {
      if (username) {
        console.log('Username:', username);
        return username;
      } else {
        console.log('User not found.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  console.log(userIdFromDB)
  res.render('dashboard', { logged_in, userIdFromDB });
});
  


// router.get('/posthistory', async (req, res) => {
//     try {
//       // Fetch the user's posts from the database
    
//       const userPosts = await User.findAll({
//         where: {
//           user_id: req.session.user_id,
//         },
//         attributes: ['id', 'post_heading', 'post_body', 'post_date'], 
//         include: [
//           {
//             model: User,
//             attributes: ['username'], 
//           },
//         ],
//       });
//       const sessionUserId = req.session.user_id;
//       const logged_in = !!req.session.user_id;
//       res.render('dashboard', { userPosts, logged_in, sessionUserId }); 
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  

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