const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const apiRoutes = require('./api');


router.use('/user', userRoutes);
router.use('/api', apiRoutes);

module.exports = router;