//require all my dependencies
const express = require('express'); //checked
const morgan = require('morgan'); //checked
const expressLayouts = require('express-ejs-layouts'); //checked
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const routes = require('./config/routes'); //checked
const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');
const errorHandler = require('./lib/errorHandler');

const app = express(); //checked
const { port, dbUri, sessionSecret } = require('./config/environment'); //checked

mongoose.Promise = require('bluebird');
mongoose.connect(dbUri, { useMongoClient: true });

//settings
app.set('view engine', 'ejs'); //checked
app.set('views', `${__dirname}/views`); //checked

//middleware
app.use(expressLayouts); //checked
app.use(express.static(`${__dirname}/public`)); //checked
app.use(morgan('dev')); //checked
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(customResponses);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(authentication);
app.use(routes); //checked
app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening on port ${port}`)); //checked
