var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase_db = require('./services/Firebase_RealtimeDB');

// TODO: helmet

const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/openapi.json");

require('dotenv').config();

var testRouter = require('./routes/test');
var usersRouter = require('./routes/user');
var mediasRouter = require('./routes/media');
var roomsRouter = require('./routes/room');

var app = express();

app.use(logger('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// set CORS

let corsOptions = {
    origin: '*',
  };
app.use(cors(corsOptions));
// app.options('*', cors());


// routes define

app.use('/user', usersRouter);
app.use('/room', roomsRouter);
app.use('/media', mediasRouter);
app.use('/test', testRouter);
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// init Firebase
firebase_db;

module.exports = app;
