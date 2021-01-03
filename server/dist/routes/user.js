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
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var bcrypt = require('bcryptjs');
var Joi = require('joi');
var express = require('express');
var router = express.Router();
var register_schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ca', 'co', 'io', 'app', 'shop', 'xyz'] } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{3,30}$'))
        .required(),
});
router.post('/isLoggedIn', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var manager, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.session) return [3 /*break*/, 4];
                if (!req.session.userID) return [3 /*break*/, 2];
                manager = typeorm_1.getManager();
                return [4 /*yield*/, manager.findOne(User_1.User, req.session.userID)];
            case 1:
                user = _a.sent();
                res.json({
                    success: true,
                    username: user.username,
                    email: user.email,
                    message: "Welcome " + user.username
                });
                console.log("[/api/isLoggedIn]: User " + user.username + " has connected.");
                return [2 /*return*/];
            case 2:
                res.json({
                    success: false,
                    message: "User is not logged in.",
                });
                console.log("[/api/isLoggedIn]: Guest user Anon has connected.");
                return [2 /*return*/];
            case 3: return [3 /*break*/, 5];
            case 4:
                res.json({
                    success: false,
                    msg: "User is not logged in, no session is available."
                });
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/register', function (req, res, next) {
    console.log(req.body);
    var _a = req.body, username = _a.username, email = _a.email, password = _a.password;
    var valid = register_schema.validate(req.body);
    if (valid.error === undefined) {
        var hashed_password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        typeorm_1.getConnection().transaction(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
            var userRepo, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepo = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepo.create({
                                username: username,
                                email: email,
                                password: hashed_password
                            })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, userRepo.save(user)
                                .catch(function (error) {
                                console.log(error);
                                res.json({
                                    success: false,
                                    msg: "[/register]: Failed to register user " + username + ". Database insertion error."
                                });
                                return;
                            })];
                    case 2:
                        _a.sent();
                        console.log("[/register]: Successfully registered user: " + username + "\n\n");
                        res.json({
                            success: true,
                            msg: "Successfully registered user " + username + ".",
                            username: username,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    }
    else {
        console.log("[/register]: Failed to register user. Invalid field credientials.");
        res.json({
            success: false,
            msg: "Registration unsuccessful, all fields must be alphanumeric and between 3-30 characters."
        });
        return;
    }
});
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, userRepo, user;
    return __generator(this, function (_b) {
        console.log("session id: " + req.session.id);
        _a = req.body, username = _a.username, password = _a.password;
        console.log("[/login] Attempting to login user:\n\nusername: " + username + "\n");
        username = username.toLowerCase();
        // User login info validation
        if (username.length > 35 || password.length > 45) {
            res.json({
                success: false,
                msg: 'Fields must be shorter than 35 characters and must be alphanumeric (no special characters).'
            });
            return [2 /*return*/];
        }
        userRepo = typeorm_1.getRepository(User_1.User);
        user = userRepo.findOne({
            where: [
                { username: username }
            ]
        })
            .then(function (user) {
            if (user) {
                // Compare passwords.
                console.log(user);
                bcrypt.compare(password, JSON.parse(user.password), function (bcryptErr, verified) {
                    if (verified) {
                        // User validated
                        req.session.userID = user.id;
                        req.session.save(function (err) {
                            if (err)
                                console.log(err);
                        });
                        var userData = {
                            username: user.username,
                            email: user.email,
                            session: req.session,
                        };
                        console.log("User successfully logging in: " + JSON.stringify(userData, null, 4));
                        res.json({
                            success: true,
                            msg: "Welcome " + username + ".",
                            username: username
                        });
                        return;
                    }
                    else {
                        // Wrong password/username
                        res.json({
                            success: false,
                            msg: 'Password is not correct for this username',
                        });
                    }
                });
            }
            else {
                // User doesn't exist.
                res.json({
                    success: false,
                    msg: "User doesn't exist, this username is available to register."
                });
                return;
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/logout', function (req, res, next) {
    if (req.session && req.session.userID) {
        // User is logged in, terminate session
        var sessionId = req.session.userID;
        req.session.destroy();
        console.log("[/api/logout]: User successfully logged out.");
        res.json({
            success: true,
            msg: "Successfully logged out.",
        });
        return true;
    }
    else {
        console.log('Guest user tried and failed to logout: no session ID.');
        res.json({
            success: false,
            msg: "Not logging out: user was not logged in.",
        });
        return false;
    }
});
module.exports = router;
//# sourceMappingURL=user.js.map