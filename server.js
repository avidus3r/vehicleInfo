'use strict';

require('dotenv').config();

var http        = require('http'),
    express     = require('express'),
    app         = express(),
    jade        = require('jade'),
    path        = require('path'),
    bodyParser  = require('body-parser'),
    request     = require('request'),
    routes      = require('./routes');


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', './templates');

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.raw({extended:true}));
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));


routes(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log('app listening on port ' + app.get('port'));
});

