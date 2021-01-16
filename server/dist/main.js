"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
// Define local or production domains/db connections.
var sessionPoolConfig = process.env.NODE_ENV === "development" ?
    {
        user: 'role',
        password: 'root',
        host: 'localhost',
        port: 5432,
        database: 'universities_db',
    }
    :
        {
            user: 'ddqwlvixtcdyjx',
            password: '54287b2da081f88c55db4201c979795c80fd7aac8faf7cd4622621330b270c5c',
            host: 'ec2-184-73-249-9.compute-1.amazonaws.com',
            port: 5432,
            database: 'djsjgdo6g6dis',
        };
var cron = require('./cronjobs/updateWeatherJob');
var express = require('express');
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session);
var cors = require('cors');
var volleyball = require('volleyball');
var helmet = require('helmet');
var fileUpload = require('express-fileupload');
var path = require('path');
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
var sessionDBaccess = new sessionPool(sessionPoolConfig);
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
        maAge: 1000 * 60 * 60 * 24,
        sameSite: true,
        secure: false
    },
}));
var api_router = require('./routes/api');
app.use('/api', api_router);
// Database connection must be made for the routes to work on app.
// Routes defined using express in separate file
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')));
// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});
typeorm_1.createConnection().then(function (connection) {
    var API_PORT = process.env.API_PORT || 1337;
    // insertUniData.updateUniOverallRating();
    // insertUniData.insertCityName();
    // insertUniData.insertUniversityDataData();
    // Overwrites every university's ratings object with new data object structure (if ever updated). -> toronto data rn.
    // insertUniData.insertUniversityDataRatings();
    app.listen(API_PORT, function () {
        console.log("[main.js]: Listening: http://localhost:" + API_PORT);
    });
});
//# sourceMappingURL=main.js.map