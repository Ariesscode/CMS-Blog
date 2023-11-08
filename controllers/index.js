const router = require('express').Router();
const postRoutes = require('./blog-routes.js');
const commentRoutes = require('./comment-routes.js');
const apiRoutes = require('./api');



router.use('/blog', postRoutes);
router.use('/comment', commentRoutes);
router.use('/api', apiRoutes);
module.exports = router;
