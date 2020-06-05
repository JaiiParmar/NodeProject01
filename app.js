const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');


// const host = "localhost";
// const port = "27017";
// const db = "book_store"; // database name
// //set url
// const MONGODB_URI =
//   "imongodb+srv://jaiiparmar:admin7600@cluster0-gn50g.mongodb.net/book_store?retryWrites=true&w=majority";



const app = express();

 var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/book_store";

   const store = new MongoDBStore({
     uri: uristring,
     collection: "sessions",
   });
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

  const PORT = process.env.PORT || 5000;
mongoose
  .connect(uristring, { useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.err(err);
  });
