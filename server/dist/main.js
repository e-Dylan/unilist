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
var fs = require('fs');
var http = require('http');
var https = require('https');
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
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV !== "production") {
            console.log("RUNNING IN PRODUCTION");
            connectionOptions = {
                type: 'postgres',
                username: "postgres",
                password: "sakdj2321jodks2ajdkjo21j42kl",
                host: "unilist-db-aws.cldikagnm4ob.us-east-1.rds.amazonaws.com",
                port: 5432,
                database: "unilist_db_aws",
                synchronize: false,
                logging: false,
                extra: {
                    ssl: false,
                },
                "entities": ["dist/entity/*.js"],
                "migrations": ["dist/migration/*.js"],
            };
            // if (process.env.DATABASE_URL_PROD) {
            // 	Object.assign(connectionOptions, { url: process.env.DATABASE_URL_PROD });
            // } else {
            // 	console.log("ERROR: No database url provided in database connection options. Check NODE_ENV.");
            // 	return;
            // }
        }
        else if (process.env.NODE_ENV === "development") {
            console.log("RUNNING IN DEV");
            connectionOptions = {
                type: 'postgres',
                host: "localhost",
                port: 5432,
                username: "role",
                password: "root",
                database: "universities_db",
                synchronize: false,
                logging: false,
                extra: {
                    ssl: false,
                },
                "entities": ["dist/entity/*.js"],
                "migrations": ["dist/migration/*.js"],
            };
            // if (process.env.DATABASE_URL_DEV) {
            // 	Object.assign(connectionOptions, { url: process.env.DATABASE_URL_DEV });
            // } else {
            // 	console.log("ERROR: No database url provided in database connection options. Check NODE_ENV.");
            // 	return;
            // }
        }
        else {
            console.log("NONE");
            return [2 /*return*/];
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
            user: 'postgres',
            password: 'sakdj2321jodks2ajdkjo21j42kl',
            host: 'unilist-db-aws.cldikagnm4ob.us-east-1.rds.amazonaws.com',
            port: 5432,
            database: 'unilist_db_aws',
        };
// init pg session
var sessionPool = require('pg').Pool;
var sessionDBaccess = new sessionPool(sessionPoolConfig);
console.log("SESSION POOL CONFIG:", sessionPoolConfig);
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
var connectAndListen = function () { return __awaiter(void 0, void 0, void 0, function () {
    var options;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getOptions()];
            case 1:
                options = _a.sent();
                console.log(process.env.NODE_ENV);
                console.log("DATABASE CONNECTION CONFIG:", options);
                typeorm_1.createConnection(options)
                    .then(function (connection) {
                    console.log("Connected to database... running server");
                    if (process.env.NODE_ENV === "development") {
                        var API_PORT_1 = process.env.API_PORT || 1337;
                        app.listen(API_PORT_1, function () {
                            console.log("[main.js]: Listening: http://localhost:" + API_PORT_1);
                        });
                    }
                    else if (process.env.NODE_ENV !== "production") {
                        // Port Config
                        var API_PORT = process.env.API_PORT || 443; // CHANGE To 1337 WHEN NGINX REVERSE-PROXY FROM 443
                        // SSL Cert
                        var credentials = {
                            key: fs.readFileSync(process.env.KEY_SSL_PATH),
                            cert: fs.readFileSync(process.env.CERT_SSL_PATH),
                            ca: fs.readFileSync(process.env.CA_SSL_PATH),
                        };
                        https.createServer(credentials, app)
                            .listen(API_PORT, function () {
                            console.log("[main.ts]: (HTTPS) Server is listening at: " + process.env.PRODUCTION_API_URL);
                        });
                    }
                    // const API_PORT = process.env.PORT || 1337;
                    // insertUniData.updateUniOverallRating();
                    // insertUniData.insertCityName();
                    // insertUniData.insertUniversityDataData();
                    // Overwrites every university's ratings object with new data object structure (if ever updated). -> toronto data rn.
                    // insertUniData.insertUniversityDataRatings();
                    // GET DOMAIN URL USING NODE_ENV CHECK AT THE TOP OF THIS FILE
                    // REPORT HERE
                    // FIND WHY ORMCONFIG ISN'T FINDING ANY PROPER CONFIG FILES, EVEN WHEN
                    // OPTIONS ARE SUPPLIED IN URL.
                    // app.listen(API_PORT, () => {
                    // 	console.log(`[main.js]: Listening: http://localhost:${API_PORT}`);
                    // })
                });
                return [2 /*return*/];
        }
    });
}); };
connectAndListen();
//# sourceMappingURL=main.js.map