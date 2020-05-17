const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

const routes = require('./routes')
const adminRoutes= require('./routes/admin');
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
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//unknown routes..
app.use(errorController.get404);
    
//active the server...
app.listen(3000);