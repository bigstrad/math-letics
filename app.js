//"use strict";

// =================================================
// modules
// =================================================
var express         = require('express');
var app             = express();
var passport        = require('passport');
var moment          = require('moment');
var session         = require('express-session');
var router          = express.Router();
var path            = require('path');
var config          = require('./node_app_config/config');

//
// configuration
//

// set our port
var port = process.env.PORT || 8080;

// require('./app_config/passport')(passport); // pass passport for configuration

//
// middleware
//

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//app.use(bodyParser.json())

// parse application/vnd.api+json as json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
//app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img to retrieve
app.use(express.static(__dirname + '/public'));

/*// global console logger
app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});*/

// apply the routes to our application
// this *MUST* reside before error handler functions
app.use('/', router);

// error handlers (see below)
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// required for passport
// reference - https://scotch.io/tutorials/easy-node-authentication-setup-and-local
app.use(session({secret: config.session.secret,
    saveUninitialized: true,
    resave: true})); // session secret
//app.use(session({ secret: 'programmingisthebestworstthingever' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in session


// inject routes
require('./node_app/routes')(app, router, passport);


//
// start and expose app
//

app.listen(port);

// log
console.log('Listening on port ' + port);

// expose app
exports = module.exports = app;


//
// error handlers
//

// also see https://www.joyent.com/developers/node/design/errors

function logErrors(err, req, res, next) {
    console.log(moment().toISOString() + " - logErrors", err);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500)
            .send({status:500, text: moment().toISOString() + " - clientErrorHandler", type:'error'});
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500)
        .send({status:500, text: moment().toISOString() + " - errorHandler", type:'error'});
}

