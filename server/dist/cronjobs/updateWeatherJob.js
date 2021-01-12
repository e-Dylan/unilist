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
var University_1 = require("../entity/University");
var cron = require('node-cron');
var fetch = require('node-fetch');
var weatherAPIKey = '50d9b938ed3fb013a16ec3ed594ea7dc';
console.log("Initializing [updateWeather] cronjob - running every [7 days (Sundays)].");
/**
 * updateWeather cron job: updates weather data for every row (university) in the university table.
 * updates at: uni.university_data.ratings.now. [temp], [feels_like], [desc]
 * 			   uni.university_data.ratings.average. [temp], [feels_like], [desc] <-- TO MAKE. GET DATA FROM API.
 */
// cron.schedule('0 0 * * 0', () => { // 7 days, sunday
cron.schedule('*/10 * * * *', function () {
    console.log('RUNNING: [updateWeather] cronjob - running every [10 minutes].');
    // cron.schedule('* * * * *', () => { // 1 minute
    // console.log('RUNNING: [updateWeather] cronjob - running every [7 days (Sundays)].');
    typeorm_1.getConnection().transaction(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, entity, numRows, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    entity = University_1.University;
                    return [4 /*yield*/, manager.count(entity)];
                case 1:
                    numRows = _a.sent();
                    _loop_1 = function () {
                        var uni, lat, lng;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, manager.findOne(entity, i)];
                                case 1:
                                    uni = _a.sent();
                                    lat = JSON.parse(uni.university_data).location_data.lat;
                                    lng = JSON.parse(uni.university_data).location_data.lng;
                                    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&appid=" + weatherAPIKey)
                                        .then(function (res) { return res.json(); })
                                        .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                                        var nowCurrentTemp, nowFeelsLikeTemp, nowWeatherDesc, avgCurrentTemp, avgFeelsLikeTemp, newData;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    nowCurrentTemp = res.current.temp - 273.15;
                                                    nowFeelsLikeTemp = res.current.feels_like - 273.15;
                                                    nowWeatherDesc = res.current.weather[0].main;
                                                    avgCurrentTemp = nowCurrentTemp;
                                                    avgFeelsLikeTemp = nowFeelsLikeTemp;
                                                    newData = JSON.parse(uni.university_data);
                                                    newData.ratings.weather.now.temp = nowCurrentTemp;
                                                    newData.ratings.weather.now.feels_like = nowFeelsLikeTemp;
                                                    newData.ratings.weather.now.desc = nowWeatherDesc;
                                                    newData = JSON.stringify(newData);
                                                    uni.university_data = newData;
                                                    return [4 /*yield*/, manager.save(uni)];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 1;
                    _a.label = 2;
                case 2:
                    if (!(i <= numRows)) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_1()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log("Finished updating weather data for all (" + numRows + ") rows for " + entity + ".");
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=updateWeatherJob.js.map