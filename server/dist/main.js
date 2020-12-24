"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express = require('express');
var cors = require('cors');
var volleyball = require('volleyball');
var helmet = require('helmet');
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
var api_router = require('./routes/api');
app.use('/api', api_router);
// Database connection must be made for the routes to work on app.
// Routes defined using express in separate file
typeorm_1.createConnection().then(function (connection) {
    var API_PORT = process.env.REACT_APP_API_PORT || 1337;
    app.listen(API_PORT, function () {
        console.log("[main.js]: Listening: http://localhost:" + API_PORT);
    });
});
//# sourceMappingURL=main.js.map