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
var fetch = require('node-fetch');
var stripe = require('stripe')('sk_test_51I5ZHZBwwOafHU1RLxwJmdLILEJczx2LBRhXDuFptzHsDj0R9pSXBNBKbbmUa1AgnqNi9BmwI1esI5MKwzuRbDZq00yLbT81aV');
var express = require('express');
var router = express.Router();
router.post("/createCheckoutSession", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, priceId, customerEmail, session, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, priceId = _a.priceId, customerEmail = _a.customerEmail;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, stripe.checkout.sessions.create({
                        mode: "subscription",
                        payment_method_types: ["card"],
                        line_items: [
                            {
                                price: priceId,
                                quantity: 1,
                            },
                        ],
                        customer_email: customerEmail,
                        // {CHECKOUT_SESSION_ID}
                        // sessionId is returned in the query parameter when customer is redirected to success page.
                        success_url: process.env.DOMAIN_DEVELOPMENT_URL + "/success.html?session_id={CHECKOUT_SESSION_ID}",
                        cancel_url: process.env.DOMAIN_DEVELOPMENT_URL + "/cancel.html?session_id={CHECKOUT_SESSION_ID}",
                    })];
            case 2:
                session = _b.sent();
                console.log('[/api/payment]: Received request to checkout, redirecting to stripe checkout portal.');
                res.send({
                    sessionId: session.id,
                });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                console.log(e_1);
                res.status(400);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/getCheckoutSession', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionId, session;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sessionId = req.query.sessionId;
                return [4 /*yield*/, stripe.checkout.sessions.retrieve(sessionId)];
            case 1:
                session = _a.sent();
                res.json(session);
                return [2 /*return*/];
        }
    });
}); });
router.post('/customerPortal', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var customerId, portalsession;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                customerId = req.body.customerId;
                return [4 /*yield*/, stripe.billingPortal.sessions.create({
                        customer: customerId,
                        return_url: process.env.DOMAIN_DEVELOPMENT_URL,
                    })];
            case 1:
                portalsession = _a.sent();
                res.send({
                    url: portalsession.url,
                });
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=payment.js.map