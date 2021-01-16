import { create } from "domain";
import { connect } from "http2";
import "reflect-metadata";
import { Request, Response, Next } from "express";
import { createConnection, getConnection, getRepository } from "typeorm";
// import './makeSessionsTable';
import * as insertUniData from './insertUniData';

// Define local or production domains/db connections.
var sessionPoolConfig = process.env.NODE_ENV === "development" ?
{
	user: 'role',
	password: 'root',
	host: 'localhost',
	port: 5432,
	database: 'universities_db',
}
	:
{	
	user: 'ddqwlvixtcdyjx',
	password: '54287b2da081f88c55db4201c979795c80fd7aac8faf7cd4622621330b270c5c',
	host: 'ec2-184-73-249-9.compute-1.amazonaws.com',
	port: 5432,
	database: 'djsjgdo6g6dis',
};
	

const cron = require('./cronjobs/updateWeatherJob');

const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cors = require('cors');
const volleyball = require('volleyball');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const path = require('path');

require('dotenv').config();

const app = express();

const corsOptions = {
	origin: true,
	credentials: true,
}

// Express middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(volleyball);
app.use(fileUpload());

// init pg session
const sessionPool = require('pg').Pool;
const sessionDBaccess = new sessionPool(sessionPoolConfig);

app.use(session({
	store: new pgSession({
		pool: sessionDBaccess,
		tableName: 'session',
	}),
	name: 'SID',
	secret: "hushhush",
	resave: false,
	saveUninitialized: true,
	cookie: {
		maAge: 1000*60*60*24, // 1day
		sameSite: true,
		secure: false
	},
}));

const api_router = require('./routes/api');
app.use('/api', api_router);
// Database connection must be made for the routes to work on app.
// Routes defined using express in separate file

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

createConnection().then(connection => {
	const API_PORT = process.env.API_PORT || 1337;

	// insertUniData.updateUniOverallRating();
	// insertUniData.insertCityName();
	// insertUniData.insertUniversityDataData();
	
	// Overwrites every university's ratings object with new data object structure (if ever updated). -> toronto data rn.
	// insertUniData.insertUniversityDataRatings();

	app.listen(API_PORT, () => {
		console.log(`[main.js]: Listening: http://localhost:${API_PORT}`);
	})
});

