const router = require('express').Router();
const postRoutes = require('./blog-routes.js');
const commentRoutes = require('./comment-routes.js');



router.use('/', postRoutes);
router.use('/comment', commentRoutes);
module.exports = router;
