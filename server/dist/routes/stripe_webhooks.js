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
var fetch = require('node-fetch');
var express = require('express');
var router = express.Router();
router.post('/webhook', function (req, res) {
    try {
        var event = req.body;
        typeorm_1.getConnection().transaction(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
            var manager, checkoutSession, customerId_1, subscriptionId_1, email;
            return __generator(this, function (_a) {
                manager = typeorm_1.getManager();
                // // Handle the event
                switch (event.type) {
                    case 'payment_intent.succeeded':
                        // const paymentIntent = event.data.object;
                        // console.log(paymentIntent);
                        // Then define and call a method to handle the successful payment intent.
                        // handlePaymentIntentSucceeded(paymentIntent);
                        break;
                    case 'payment_method.attached':
                        // const paymentMethod = event.data.object;
                        // console.log(paymentMethod);
                        // Then define and call a method to handle the successful attachment of a PaymentMethod.
                        // handlePaymentMethodAttached(paymentMethod);
                        break;
                    // Handle completed subscription checkout, store customerId in database.
                    case 'checkout.session.completed':
                        console.log("CHECKOUT SESSION COMPLETED");
                        checkoutSession = event.data.object;
                        console.log(checkoutSession);
                        customerId_1 = checkoutSession.customer;
                        subscriptionId_1 = checkoutSession.subscription;
                        email = checkoutSession.customer_email;
                        manager.findOne(User_1.User, { email: email })
                            .then(function (user) {
                            if (user && customerId_1 && subscriptionId_1) {
                                // user exists in database with this email that was successfully subscribed with,
                                // insert customerId for them.
                                user.stripe_customer_id = customerId_1;
                                user.stripe_sub_id = subscriptionId_1;
                                manager.save(user)
                                    .then(function (data) {
                                    console.log('[STRIPE_WEBHOOK]: Saving new member as user:\n\n', data);
                                });
                            }
                            else {
                            }
                        });
                        break;
                    default:
                        console.log("Unhandled event type " + event.type);
                }
                return [2 /*return*/];
            });
        }); });
    }
    catch (err) {
        console.log(err);
    }
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
});
module.exports = router;
//# sourceMappingURL=stripe_webhooks.js.map