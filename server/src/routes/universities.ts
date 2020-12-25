import { getRepository, getConnection } from "typeorm";
import { University } from "../entity/University";
import { Request, Response, Next } from "express";
const fs = require('fs');

const express = require('express');
const router = express.Router();

export async function getAllUniversities(req: Request, res: Response, next: Next) {
	const universities = await getRepository(University).find();
	res.json(universities);
	console.log(universities);
}

export function searchUniversities(req: Request, res: Response, next: Next) {
	console.log(req.body);
	// res.json(req.body);
	getConnection().transaction(async connection => {
		const data = await connection
		.createQueryBuilder(University, "c")
		.select()
		.where("document_with_weights @@ plainto_tsquery(:query)", {
			query: req.body.tags
		})
		.orderBy(
			"ts_rank(document_with_weights, plainto_tsquery(:query))",
			"DESC"
		)
		.getMany();
		
		console.log(data);
		res.send(data);
	})
}

export function addUniversity(req: Request, res: Response, next: Next) {
	getConnection().transaction(async connection => {
		// Data for columns of universities table
		const data_insert = { 
			name: req.body.name, 
			tags: req.body.tags, 
			university_data: req.body.data,
			image_path: req.body.image_path,
		};
		console.log(data_insert);
		getConnection()
		.createQueryBuilder()
		.insert()
		.into(University)
		.values([
			data_insert,
		])
		.execute();
		console.log("[/api/addUniversity]: Inserted new university object into 'universities' table:\n\n", data_insert);
	});
}

router.get('/getAllUniversities', (req: Request, res: Response, next: Next) => {
	getAllUniversities(req, res, next);
});
router.post('/getAllUniversities', (req: Request, res: Response, next: Next) => {
	getAllUniversities(req, res, next);
});

router.get('/searchUniversities', async(req: Request, res: Response, next: Next) => {
	searchUniversities(req, res, next);
});

router.post('/searchUniversities', async (req: Request, res: Response, next: Next) => {
	searchUniversities(req, res, next);
});

router.post('/addUniversity', async (req: Request, res: Response, next: Next) => {
	addUniversity(req, res, next);
});

module.exports = router;