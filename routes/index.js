'use strict';

var path = require('path');

module.exports = function(app){

    app.get('/', function(req, res){
        var locals = {
            title: ':(){:|:&};:'
        };
        res.render('index', locals);
    });

    app.get('/demo/vehicles', function(req, res){
        res.sendFile('vehicles.html', { root: path.join(__dirname, '../public/') });
    });
};