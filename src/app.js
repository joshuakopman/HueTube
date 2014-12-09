app = require('express.io')();
var path = require('path');
var bodyParser = require('body-parser');
var LightController = require('./controllers/LightController');
var LightService = require('./services/LightService');
var Config = require("./Config")
var cors = require('cors')

app.http().io();

app.use(cors());
app.use(bodyParser());
app.use(require('express.io').static(path.join(__dirname, 'public')));

lightController = new LightController(new LightService());
lightController.BuildRouting();

// view engine setup
app.set('views', __dirname + '/views/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'jade');


app.get('/', function(req, res) {
    res.render('index.html');
});
//app.use('/', routes);
//app.use('/lights', lights);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

app.listen(Config.node.port);
