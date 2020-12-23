const express = require('express');
const db = require('../db/psql_db');

const router = express.Router();

router.post('/addUniversity', (req, res) => {
	console.log(req.body);
	var uniName = req.body.name;
	var uniTags = req.body.tags;
	db.query('INSERT INTO universities (name, tags) VALUES($1, $2)', [uniName, uniTags], (err, data) => {
		if (err) throw err;
		console.log(data);
	});
})

router.post('/searchUniversities', (req, res) => {
	console.log(req.body);
	db.query('SELECT * FROM universities', (err, data) => {
		if (err) throw err;
		console.log(data.rows);
		res.json(data.rows);
	})
})

module.exports = router;