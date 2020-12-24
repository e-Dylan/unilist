const express = require('express');
const router = express.Router();

const universitiesRouter = require('./universities');

router.get('/', (req, res) => {
	res.json({ message: "GOT ON /API" });
})

router.use('/', universitiesRouter);

module.exports = router;