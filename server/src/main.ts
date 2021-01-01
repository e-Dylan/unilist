import { create } from "domain";
import { connect } from "http2";
import "reflect-metadata";
import { Request, Response, Next } from "express";
import { createConnection, getConnection, getRepository } from "typeorm";
// import './makeSessionsTable';
import * as insertUniData from './insertUniData';

const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cors = require('cors');
const volleyball = require('volleyball');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');

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
const sessionDBaccess = new sessionPool({
	user: 'role',
	password: 'root',
	host: 'localhost',
	port: 5432,
	database: 'universities_db',
});

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
		maAge: 1000 * 60 * 60 * 24 * 7,
		sameSite: true,
		secure: false
	},
}));

const api_router = require('./routes/api');
app.use('/api', api_router);
// Database connection must be made for the routes to work on app.
// Routes defined using express in separate file
createConnection().then(connection => {
	const API_PORT = process.env.REACT_APP_API_PORT || 1337;

	// insertUniData.insertUniversityData();

	app.listen(API_PORT, () => {
		console.log(`[main.js]: Listening: http://localhost:${API_PORT}`);
	})
});

