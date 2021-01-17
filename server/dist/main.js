"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
require('dotenv').config();
var cron = require('./cronjobs/updateWeatherJob');
var express = require('express');
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session);
var cors = require('cors');
var volleyball = require('volleyball');
var helmet = require('helmet');
var fileUpload = require('express-fileupload');
var path = require('path');
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
// PG connection options (typeorm config)
var getOptions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var connectionOptions;
    return __generator(this, function (_a) {
        connectionOptions = {
            type: 'postgres',
            synchronize: false,
            logging: false,
            extra: {
                ssl: false,
            },
            "entities": ["server/dist/entity/*.js"],
            "migrations": ["server/dist/migration/*.js"],
        };
        if (process.env.DATABASE_URL) {
            Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
        }
        else {
            // gets your default configuration
            // you could get a specific config by name getConnectionOptions('production')
            // or getConnectionOptions(process.env.NODE_ENV)
            // there must be a DATABASE_URL on production - otherwise configure default
            // prod database creds to fallback to -> Heroku env vars.
        }
        return [2 /*return*/, connectionOptions];
    });
}); };
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
if (process.env.NODE_ENV === "production") {
    console.log("RUNNING IN PRODUCTION");
    console.log(process.env.DATABASE_URL);
    // Serve static files from the React frontend app
    app.use(express.static(path.join(__dirname, '../client/build')));
    // AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname + '/../client/build/index.html'));
    });
    var connectAndListen = function () { return __awaiter(void 0, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getOptions()];
                case 1:
                    options = _a.sent();
                    console.log(options);
                    return [4 /*yield*/, typeorm_1.createConnection(options)
                            .then(function (connection) {
                            console.log("Connected to database... running server");
                            var API_PORT = process.env.API_PORT || 1337;
                            // insertUniData.updateUniOverallRating();
                            // insertUniData.insertCityName();
                            // insertUniData.insertUniversityDataData();
                            // Overwrites every university's ratings object with new data object structure (if ever updated). -> toronto data rn.
                            // insertUniData.insertUniversityDataRatings();
                            // GET DOMAIN URL USING NODE_ENV CHECK AT THE TOP OF THIS FILE
                            // REPORT HERE
                            // FIND WHY ORMCONFIG ISN'T FINDING ANY PROPER CONFIG FILES, EVEN WHEN
                            // OPTIONS ARE SUPPLIED IN URL.
                            app.listen(API_PORT, function () {
                                console.log("[main.js]: Listening: http://production_url:" + API_PORT);
                            });
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    connectAndListen();
}
else {
    // Development
    console.log('running on development\n\n');
    // ORMCONFIG.JSON OVERWRITES ANY DATABASE_URL CONFIG ENV VARIABLES,
    // ORMCONFIG.JSON IN THIS DIR IS USED IN DEVELOPMENT.
    // ELSE, IN PROD, ABOVE getOptions USING HEROKU ENV VARS MAKE THE DB CONNECTION.
    typeorm_1.createConnection().then(function (connection) {
        var API_PORT = process.env.API_PORT || 1337;
        app.listen(API_PORT, function () {
            console.log("[main.js]: Listening: http://localhost:" + API_PORT);
        });
    });
}
//# sourceMappingURL=main.js.map