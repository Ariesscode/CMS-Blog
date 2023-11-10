const router = require('express').Router();
const {User, Blog, Comment} = require('../models');
const withAuth = require('../utils/auth');
//ROUTES for comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {model: User, attributes: ['username']},
                {model: Blog}
            ],
            exclude: [{model: User, attributes: ['password']}]
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
      const commentData = await Comment.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ['username'] },
          { model: Blog },
        ],
        exclude: [{ model: User, attributes: ['password'] },
        ],
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,});
  
      res.status(200).json(newComment);
      
    } catch (err) {
      res.status(400).json(err);
    }
  });
module.exports = router