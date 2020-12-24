import { create } from "domain";
import { connect } from "http2";
import "reflect-metadata";
import { Request, Response, Next } from "express";
import { createConnection, getConnection, getRepository } from "typeorm";
import { University } from "./entity/University";

const express = require('express');
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

const api_router = require('./routes/api');
app.use('/api', api_router);

// Database connection must be made for the routes to work on app.
// Routes defined using express in separate file
createConnection().then(connection => {
	const API_PORT = process.env.REACT_APP_API_PORT || 1337;
	app.listen(API_PORT, () => {
		console.log(`[main.js]: Listening: http://localhost:${API_PORT}`);
	})
});


