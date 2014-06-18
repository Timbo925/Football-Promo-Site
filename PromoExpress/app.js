var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http')
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/promoExpress", {native_parser:true});
var mongoose = require('mongoose')

var routes = require('./routes/index');
var users = require('./routes/users');
var players = require('./routes/players');
var app = express();

mongoose.connect('mongodb://localhost:27017')

// view engine setup
app.set('port', process.env.PORT || 3002);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router by adding it inside the request
app.use(function(req,res,next){
    req.db = db;
    req.mongoose = mongoose
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/api/v1/players', players);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Route Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
