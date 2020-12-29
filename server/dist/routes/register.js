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
var _this = this;
var app = require('./isLoggedIn');
var Joi = require('joi');
var bcrypt = require('bcryptjs');
var sql_db = require('./sql_db');
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
/**
 * PREVENT USERS FROM REGISTERING ACCOUNTS IF USERNAMES ARE TAKEN.
 */
app.post('/api/register', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, username, email, password, result, salt, hashed_password, values_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                result = register_schema.validate(req.body);
                if (result.error === undefined) {
                    salt = bcrypt.genSaltSync(10);
                    hashed_password = bcrypt.hashSync(password, salt);
                    values_1 = [username, email, hashed_password];
                    sql_db.query("INSERT INTO user(username, email, password) VALUES(?, ?, ?)", values_1, function (err, data, fields) {
                        if (err) {
                            res.json({
                                success: false,
                                msg: "Error registering user. Usernames must be alphanumeric, each field must be shorter than 35 characters.",
                            });
                            return;
                        }
                        // User has been registered and inserted into database
                        // data == [id, user, email, password] data from user inserted
                        if (data) {
                            res.json({
                                success: true,
                                username: values_1[0],
                                msg: "Successfully registered, welcome " + values_1[0] + ".",
                                data: values_1,
                            });
                            var userJson = {
                                username: values_1[0],
                                email: values_1[1],
                                password_hash: values_1[2],
                            };
                            console.log("[/register] Successfully registered user:\n\n session id: " + req.session.id + "\n\n user: " + userJson.username + "\nemail: " + userJson.email + "\n");
                        }
                    });
                }
                else {
                    // User entered invalid registration information -> Failed joi schema
                    console.log("[/register] Error registering user - failed Joi schema:\n\n session id: " + req.session.id + "\n\n user: " + username + "\nemail: " + email + "\n");
                    res.json({
                        success: false,
                        msg: "Please enter valid user information.\nEmail and Password must be between 3 - 30 characters.",
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, sql_db.end()];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
module.exports = app;
//# sourceMappingURL=register.js.map