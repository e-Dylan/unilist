const express = require('express');
const router = require('./universities');

const universitiesRouter = require('./universities');

router.get('/', (req, res) => {
	res.json({ message: "GOT ON /API" });
})

router.use('/', universitiesRouter);

module.exports = router;