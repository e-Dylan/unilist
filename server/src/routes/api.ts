const express = require('express');
const router = express.Router();

const universitiesRouter = require('./universities');
const user_router = require('./user');

router.get('/', (req, res) => {
	res.json({ message: "GOT ON /API" });
})

router.use('/', universitiesRouter);
router.use('/', user_router);

module.exports = router;