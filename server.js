require('dotenv').config();
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers: helpers});
const path = require('path');
const apiRoutes = require('./controllers/api');
const sequelize = require('./config/connection');
const withAuth = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views'); //check





app.use('/blog', require('./controllers/api/blog-routes')); 
app.use('/dashboard', withAuth, require('./controllers/api/dashboard-routes'));
app.use('/users', require('./controllers/api/user-routes'));
app.use('/api', apiRoutes);



const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
  };

  
  app.use(session(sess));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use(routes);
  


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on http://localhost:' + PORT));
});