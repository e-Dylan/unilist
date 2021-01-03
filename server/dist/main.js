"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var cron = require('./cronjobs/updateWeatherJob');
var express = require('express');
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session);
var cors = require('cors');
var volleyball = require('volleyball');
var helmet = require('helmet');
var fileUpload = require('express-fileupload');
require('dotenv').config();
var app = express();
var corsOptions = {
    origin: true,
    credentials: true,
};
// Express middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(volleyball);
app.use(fileUpload());
// init pg session
var sessionPool = require('pg').Pool;
var sessionDBaccess = new sessionPool({
    user: 'role',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'universities_db',
});
app.use(session({
    store: new pgSession({
        pool: sessionDBaccess,
        tableName: 'session',
    }),
    name: 'SID',
    secret: "hushhush",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: true,
        secure: false
    },
}));
var api_router = require('./routes/api');
app.use('/api', api_router);
// Database connection must be made for the routes to work on app.
// Routes defined using express in separate file
typeorm_1.createConnection().then(function (connection) {
    var API_PORT = process.env.REACT_APP_API_PORT || 1337;
    // insertUniData.updateUniOverallRating();
    // insertUniData.insertCityName();
    // insertUniData.insertUniversityDataData();
    app.listen(API_PORT, function () {
        console.log("[main.js]: Listening: http://localhost:" + API_PORT);
    });
});
//# sourceMappingURL=main.js.map