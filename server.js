require('dotenv').config();
const express = require('express');
const session = require('express-session');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers: helpers});
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/blog-routes')); 


const sess = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  };

  
app.use(session(sess));

app.listen(PORT, () => {
    console.log('Now listening on http://localhost:' + PORT );
})