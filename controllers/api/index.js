const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const blogRoutes = require('./blog-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');



router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/dashboard', dashboardRoutes);


module.exports = router;