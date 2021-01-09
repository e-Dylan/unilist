const express = require('express');
const router = express.Router();

const universitiesRouter = require('./universities');
const user_router = require('./user');
const payment_router = require('./payment');
// stripe webhooks
const stripe_webhooks_router = require('./stripe_webhooks');

router.get('/', (req, res) => {
	res.json({ message: "GOT ON /API" });
})

router.use('/', universitiesRouter);
router.use('/', user_router);
router.use('/', payment_router);
// stripe webhooks
router.use('/', stripe_webhooks_router);

module.exports = router;