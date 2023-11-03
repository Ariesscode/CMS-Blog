require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/blog-routes')); //check 

app.listen(PORT, () => {
    console.log('Now listening on http://localhost:' + PORT );
})