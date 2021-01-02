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
exports.insertUniversityData = void 0;
var typeorm_1 = require("typeorm");
var University_1 = require("./entity/University");
var calcActiveOverallRating = function (data) {
    var total = 0;
    var iters = 0;
    // Every top-level data object has a rating, sum them all.
    var keys = Object.keys(data);
    for (var i = 1; i < keys.length; i++) { // start at idx=1 to skip overall rating field.
        total += data[keys[i]].rating;
        iters += 1;
    }
    var average = total / iters;
    return (average / 10).toFixed(1);
};
function insertUniversityData() {
    var _this = this;
    typeorm_1.getConnection().transaction(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var manager, uni, newData, average, finalData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    return [4 /*yield*/, manager.findOne(University_1.University, 1)];
                case 1:
                    uni = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    newData = {
                        ratings: {
                            overall_rating: undefined,
                            education: {
                                rating: 92,
                                desc: "Superior",
                            },
                            covid19: {
                                rating: 25,
                                cases: {
                                    rating: 65,
                                    total: 133,
                                    past_week: 14,
                                },
                                qol: {
                                    rating: 50,
                                    desc: "Good",
                                }
                            },
                            the_city: {
                                rating: 90
                            },
                            food: {
                                rating: 84,
                            },
                            amenities: {
                                rating: 85,
                            },
                            sports: {
                                rating: 80,
                                desc: "44 teams in 26 sports",
                            },
                            transportation: {
                                rating: 97,
                            },
                            academic_resources: {
                                rating: 89,
                            },
                            parties: {
                                rating: 73,
                                frequency: { rating: 0, desc: "Uncertain" },
                            },
                            online_resources: {
                                rating: 90,
                            },
                            professor_interaction: {
                                rating: 0,
                                desc: "Uncertain",
                            },
                            cost_value: {
                                rating: 80,
                            },
                            fun: {
                                rating: 50
                            },
                            campus: {
                                rating: 87
                            },
                            people_community: {
                                rating: 87
                            },
                            internet: {
                                rating: 90,
                                desc: "High speed"
                            },
                            clubs_extracurriculars: {
                                rating: 76,
                            },
                            restaurants: {
                                rating: 95,
                            },
                            academic_services: {
                                rating: 90,
                            },
                            fitness_gym: {
                                rating: 75
                            },
                            weather: {
                                rating: 60,
                                now: {
                                    rating: 40,
                                    temp: 0,
                                    feels_like: 0,
                                    desc: "Snowing",
                                },
                                average: {
                                    rating: 83,
                                    temp: 0,
                                    feels_like: 0,
                                    desc: "Warm summers, cold winters.",
                                }
                            },
                            facilities: {
                                rating: 90
                            },
                            research: {
                                rating: 97
                            },
                        },
                        location_data: {
                            lat: 43.66301198062148, lng: -79.39574759717516
                        },
                        data: {
                            costs: {
                                tuition: "$6,590",
                                residence: "~$9,500",
                                mealplan_food: "$5,300",
                                books_supplies: "$1,000",
                                transportation: "$210",
                            },
                            the_school: {
                                known_for: "Biotech & AI",
                                campus_size: "Very large",
                                campus_type: "Big city",
                                equipment: "High tech",
                                community: "Large, diverse",
                            },
                            class_types: {
                                class_sizes: "< 50 students",
                                classrooms: "Lecture halls",
                                classes: "Lectures, labs",
                            },
                            culture: {
                                diversity: "Complex",
                                majority: "Uncertain",
                                average_class: "Uncertain",
                            },
                            awards: {
                                annual_value: "$23 million",
                                scholarships: "Yes",
                                bursaries: "Yes",
                                applied_auto: "Both",
                                entrance_during: "Both",
                            },
                            jobs_coop: {
                                coop_service: "Yes",
                                reputation: "Supportive",
                                average_salary: "$50,000",
                            },
                            the_city: {
                                city_type: "Big city",
                                population: "2,819,723",
                                public_transit: "Bus, rail, cabs",
                            },
                            surroundings: {
                                restaurants: "Tons.",
                                bars_clubs: "Lots, all styles.",
                                nature: "Lots: parks, paths.",
                                near_water: "Lake Ontario",
                            },
                            environment: {
                                // https://aqicn.org/city/toronto/ AUTOMATE
                                air_quality: "Moderate (55)",
                                pollution: "Low (37)",
                                water_quality: "Safe (tap)",
                            },
                        },
                    };
                    average = calcActiveOverallRating(newData.ratings);
                    newData.ratings.overall_rating = average;
                    finalData = JSON.stringify(newData);
                    uni.university_data = finalData;
                    console.log('[database]: Inserting university into table: university. Data: \n\n', JSON.parse(finalData));
                    console.log("+1 column changed: [" + uni.name + "].");
                    return [4 /*yield*/, manager.save(uni)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log("\n\nCaught error: \n\n", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
}
exports.insertUniversityData = insertUniversityData;
//# sourceMappingURL=insertUniData.js.map