var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport=require('passport');

module.exports = function(app,config){
    function compile(str,path){
        return stylus(str).set('filename',path);
    }

    app.set('views',config.rootPath+'/server/views');
    app.set('view engine','jade');
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(session({
            secret:'multiVisionUnicorns',
            saveUninitialized: true,
            resave: true
        }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware({
        src:config.rootPath+'/public',
        compile:compile
    }));
    app.use(express.static(config.rootPath+'/public'));
};
