const withAuth = (req, res, next) => {
  if (req.session && req.session.logged_in) {
    next();
  } else {
    // User is not logged in, redirect to login page or handle accordingly
    res.redirect('/login');
  }
};

module.exports = withAuth;