import { create } from "domain";
import { connect } from "http2";
import "reflect-metadata";
import { Request, Response, Next } from "express";
import { createConnection, getConnection, getRepository, ConnectionOptions, getConnectionOptions, AdvancedConsoleLogger } from "typeorm";
// import './makeSessionsTable';
import * as insertUniData from './insertUniData';

require('dotenv').config();
const cron = require('./cronjobs/updateWeatherJob');
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cors = require('cors');
const volleyball = require('volleyball');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const path = require('path');

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

// PG connection options (typeorm config)
const getOptions = async () => {

	let connectionOptions: ConnectionOptions;
	connectionOptions = {
		type: 'postgres',
		synchronize: false,
		logging: false,
		extra: {
			ssl: false,
		},
		"entities": ["server/dist/entity/*.js"],
		"migrations": ["server/dist/migration/*.js"],
	};
	if (process.env.DATABASE_URL) {
		Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
	} else {
	  // gets your default configuration
	  // you could get a specific config by name getConnectionOptions('production')
	  // or getConnectionOptions(process.env.NODE_ENV)

	// there must be a DATABASE_URL on production - otherwise configure default
	// prod database creds to fallback to -> Heroku env vars.
	}
  
	return connectionOptions;
};

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

if (process.env.NODE_ENV === "production") {
	console.log("RUNNING IN PRODUCTION");
	console.log(process.env.DATABASE_URL);

	// Serve static files from the React frontend app
	app.use(express.static(path.join(__dirname, '../client/build')))

	// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/../client/build/index.html'))
	})

	const connectAndListen = async (): Promise<void> => {
		const options = await getOptions();
		console.log(options);
		await createConnection(options)
		.then(connection => {
			console.log("Connected to database... running server");
			const API_PORT = process.env.API_PORT || 1337;

			// insertUniData.updateUniOverallRating();
			// insertUniData.insertCityName();
			// insertUniData.insertUniversityDataData();
			
			// Overwrites every university's ratings object with new data object structure (if ever updated). -> toronto data rn.
			// insertUniData.insertUniversityDataRatings();


			// GET DOMAIN URL USING NODE_ENV CHECK AT THE TOP OF THIS FILE
			// REPORT HERE
			// FIND WHY ORMCONFIG ISN'T FINDING ANY PROPER CONFIG FILES, EVEN WHEN
			// OPTIONS ARE SUPPLIED IN URL.

			app.listen(API_PORT, () => {
				console.log(`[main.js]: Listening: http://production_url:${API_PORT}`);
			})
		})
	}

	connectAndListen();

} else {
	// Development
	console.log('running on development\n\n', );

	// ORMCONFIG.JSON OVERWRITES ANY DATABASE_URL CONFIG ENV VARIABLES,
	// ORMCONFIG.JSON IN THIS DIR IS USED IN DEVELOPMENT.
	// ELSE, IN PROD, ABOVE getOptions USING HEROKU ENV VARS MAKE THE DB CONNECTION.
	createConnection().then(connection => {
		const API_PORT = process.env.API_PORT || 1337;
		app.listen(API_PORT, () => {
			console.log(`[main.js]: Listening: http://localhost:${API_PORT}`);
		})
	})
}

