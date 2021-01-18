const express = require('express');
const app = express();

app.get('/login', (req, res) => {
	res.json({
		msg: "you got this serverless function"
	});
});

module.exports = app;