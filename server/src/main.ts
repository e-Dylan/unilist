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
	if (process.env.NODE_ENV === "production") {
		console.log("RUNNING IN PRODUCTION");
		connectionOptions = {
			type: 'postgres',
			username: "postgres",
			password: "sakdj2321jodks2ajdkjo21j42kl",
			host: "unilist-db-aws.cldikagnm4ob.us-east-1.rds.amazonaws.com",
			port: 5432,
			database: "unilist_db_aws",
			synchronize: false,
			logging: false,
			extra: {
				ssl: false,
			},
			"entities": ["dist/entity/*.js"],
			"migrations": ["dist/migration/*.js"],
		};
		// if (process.env.DATABASE_URL_PROD) {
		// 	Object.assign(connectionOptions, { url: process.env.DATABASE_URL_PROD });
		// } else {
		// 	console.log("ERROR: No database url provided in database connection options. Check NODE_ENV.");
		// 	return;
		// }
	} else if (process.env.NODE_ENV === "development") {
		console.log("RUNNING IN DEV");
		connectionOptions = {
			type: 'postgres',
			host: "localhost",
			port: 5432,
			username: "role",
			password: "root",
			database: "universities_db",
			synchronize: false,
			logging: false,
			extra: {
				ssl: false,
			},
			"entities": ["dist/entity/*.js"],
			"migrations": ["dist/migration/*.js"],
		};
		// if (process.env.DATABASE_URL_DEV) {
		// 	Object.assign(connectionOptions, { url: process.env.DATABASE_URL_DEV });
		// } else {
		// 	console.log("ERROR: No database url provided in database connection options. Check NODE_ENV.");
		// 	return;
		// }
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
	user: 'postgres',
	password: 'sakdj2321jodks2ajdkjo21j42kl',
	host: 'unilist-db-aws.cldikagnm4ob.us-east-1.rds.amazonaws.com',
	port: 5432,
	database: 'unilist_db_aws',
};

// init pg session
const sessionPool = require('pg').Pool;
const sessionDBaccess = new sessionPool(sessionPoolConfig);
console.log("SESSION POOL CONFIG:", sessionPoolConfig);

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

const connectAndListen = async (): Promise<void> => {
	const options = await getOptions();
	console.log("DATABASE CONNECTION CONFIG:", options);
	createConnection(options)
	.then(connection => {
		console.log("Connected to database... running server");
		const API_PORT = process.env.PORT || 1337;

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
			console.log(`[main.js]: Listening: http://domain_url:${API_PORT}`);
		})
	})
}

connectAndListen();

