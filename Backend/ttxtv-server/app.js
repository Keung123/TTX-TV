var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// TODO: helmet

const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/openapi.json");


var testRouter = require('./routes/test');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// set CORS
app.use(cors());
app.options('*', cors());


// routes define

app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app;
