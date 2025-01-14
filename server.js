const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const addUserToViews = require('./middleware/addUserToViews');
require('dotenv').config();
require('./config/database');

// Controllers
const authController = require('./controllers/auth');
const isSignedIn = require('./middleware/isSignedIn');
const app = express();
const appointmentsController = require('./controllers/appointments.js');
const port = process.env.PORT ? process.env.PORT : '3000';
const path = require('path');

// MIDDLEWARE

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(addUserToViews);

app.use('/auth', authController);


app.get('/', async (req, res) => {
  if (req.session.user){
    res.redirect(`/users/${req.session.user._id}/appointments`);
  } else {
    res.render('index.ejs');
  }
});


app.use(isSignedIn);
app.use('/users/:userId/appointments', appointmentsController); 


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
