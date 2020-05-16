const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes')
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//create application
const app = express();

//global configiration value.
//app.set('view engine', 'pug'); // also have to tell where to find it.
app.set('view engine', 'ejs');
app.set('views', 'views');

//bodyparser for request body... data...
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

//routes..
app.use('/admin', adminData.routes);
app.use(shopRoutes);

//unknown routes..
app.use((req, res, next ) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found!'});
});

//active the server...
app.listen(3000);