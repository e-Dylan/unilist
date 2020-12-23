const express = require('express');
const cors = require('cors');

const db = require('./db/psql_db');

require('dotenv').config();

const api_router = require('./routes/api');

const app = express();
app.use(express.json());

const corsOptions = {
	origin: true,
	credentials: true,
}
app.use(cors(corsOptions));

app.get('/getu', (req, res, next) => {
	db.query('SELECT * FROM universities', (err, data) => {
		console.log(data.rows);
	})
})

app.use('/api', api_router);

const API_PORT = process.env.REACT_APP_API_PORT || 1337;
app.listen(API_PORT, () => {
	console.log(`[main.js]: Listening: http://localhost:${API_PORT}`);
})
