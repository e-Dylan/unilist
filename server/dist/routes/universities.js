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
var AddedUniversity_1 = require("../entity/AddedUniversity");
var express = require('express');
var router = express.Router();
function getAllUniversities(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var universities;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeorm_1.getRepository(University_1.University).find()];
                case 1:
                    universities = _a.sent();
                    res.json(universities);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getAllUniversities = getAllUniversities;
function searchUniversities(req, res) {
    var _this = this;
    // console.log(req.body);
    // res.json(req.body);
    var tags = "";
    for (var i = 0; i < req.body.tags.length; i++) {
        tags += req.body.tags[i] + ', ';
    }
    console.log(tags);
    typeorm_1.getConnection().transaction(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection
                        .createQueryBuilder(University_1.University, "c")
                        .select()
                        .where("document_with_weights @@ plainto_tsquery(:query)", {
                        query: tags
                    })
                        .orderBy("ts_rank(document_with_weights, plainto_tsquery(:query))", "DESC")
                        .getMany()];
                case 1:
                    data = _a.sent();
                    // console.log(data);
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.searchUniversities = searchUniversities;
function addUniversity(req, res) {
    var _this = this;
    typeorm_1.getConnection().transaction(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var data_insert;
        return __generator(this, function (_a) {
            data_insert = {
                name: req.body.name,
                tags: req.body.tags,
                university_data: req.body.university_data,
                image_path: req.body.image_path,
            };
            console.log('INSERTING', data_insert);
            typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(University_1.University)
                .values([
                data_insert,
            ])
                .execute();
            console.log("[/api/addUniversity]: Inserted new university object into 'universities' table:\n\n", data_insert);
            res.json({
                success: true,
                msg: "Successfully saved university.",
            });
            console.log('responded');
            return [2 /*return*/];
        });
    }); }).catch(function (error) {
        console.log(error);
        res.json({
            success: false,
            msg: "Error saving university."
        });
    });
}
exports.addUniversity = addUniversity;
function editUniversity(req, res) {
    var _this = this;
    var university = req.body;
    var uniName = university.name;
    console.log("passed university: " + university);
    var newRatingWeight = 0.03;
    var currentRatingWeight = 1 - newRatingWeight;
    typeorm_1.getConnection().transaction(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var manager, uni, uniData, ratings, newRatings, i, currentRating, newRating, adjustedRating, name, tags, university_data, addedUniRepo, newUni;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    return [4 /*yield*/, manager.findOne(University_1.University, { name: uniName })];
                case 1:
                    uni = _a.sent();
                    if (uni) {
                        uniData = JSON.parse(uni.university_data);
                        ratings = uniData.ratings;
                        newRatings = university.university_data.ratings;
                        // UNIVERSITY_DATA.DATA CANNOT BE DIRECTLY AND IMMEDIATELY CHANGED BY USERS.
                        // ONLY ADDS TO THE ADD_UNIVERSITY DATABASE FOR ME TO REVIEW.
                        // Adjust all ratings by small weight
                        console.log("Received university submission (EDIT): editing current university: " + university.name + ":\n\n", university);
                        for (i = 0; i < Object.keys(ratings).length; i++) {
                            currentRating = ratings[Object.keys(ratings)[i]].rating;
                            newRating = newRatings[Object.keys(ratings)[i]].rating;
                            adjustedRating = (currentRating * currentRatingWeight + newRating * newRatingWeight);
                            // Overwrite old rating with adjusted rating
                            uniData.ratings[Object.keys(ratings)[i]].rating = adjustedRating.toFixed(1);
                        }
                        uni.university_data = JSON.stringify(uniData);
                        manager.save(uni)
                            .then(function (uni) {
                            res.json({
                                success: true,
                                msg: "University: " + uni.name + " was successfully updated.",
                                data: uni,
                            });
                        });
                    }
                    else {
                        // University doesn't exist, add it -> to added_university table.
                        console.log("University not found in database, adding as a new university to database: [add_university]");
                        name = university.name, tags = university.tags, university_data = university.university_data;
                        addedUniRepo = typeorm_1.getRepository(AddedUniversity_1.AddedUniversity);
                        newUni = addedUniRepo.create({
                            name: name,
                            tags: tags,
                            university_data: university_data,
                        });
                        addedUniRepo.save(newUni)
                            .then(function (addedUni) {
                            console.log("Received university submission (ADD): saving to added_university table:\n\n", university);
                            res.json({
                                success: true,
                                msg: "University was saved. I'm working to add it and more as we speak.",
                            });
                        })
                            .catch(function (err) {
                            console.log(err);
                            res.json({
                                success: false,
                                msg: "Error saving university, please try again. If this problem persists, contact support at unilistmail@gmail.com.",
                            });
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); })
        .catch(function (err) {
        console.log(err);
        res.json({
            success: false,
            msg: "There was an error saving the university. Please try again.",
        });
    });
}
exports.editUniversity = editUniversity;
router.get('/getAllUniversities', function (req, res, next) {
    getAllUniversities(req, res, next);
});
router.post('/getAllUniversities', function (req, res, next) {
    getAllUniversities(req, res, next);
});
router.get('/searchUniversities', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        searchUniversities(req, res, next);
        return [2 /*return*/];
    });
}); });
router.post('/searchUniversities', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        searchUniversities(req, res, next);
        return [2 /*return*/];
    });
}); });
router.post('/addUniversity', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        addUniversity(req, res);
        return [2 /*return*/];
    });
}); });
router.post('/editUniversity', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        editUniversity(req, res);
        return [2 /*return*/];
    });
}); });
module.exports = router;
//# sourceMappingURL=universities.js.map