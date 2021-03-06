var express = require('express');
var router = express.Router();
var universitiesRouter = require('./universities');
var user_router = require('./user');
var payment_router = require('./payment');
// stripe webhooks
var stripe_webhooks_router = require('./stripe_webhooks');
router.get('/', function (req, res) {
    res.json({ message: "GOT ON /API" });
});
router.use('/', universitiesRouter);
router.use('/', user_router);
router.use('/', payment_router);
// stripe webhooks
router.use('/', stripe_webhooks_router);
module.exports = router;
//# sourceMappingURL=api.js.map