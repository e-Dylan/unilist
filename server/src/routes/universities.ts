import { getRepository, getConnection, getManager, AdvancedConsoleLogger } from "typeorm";
import { University } from "../entity/University";
import { AddedUniversity } from "../entity/AddedUniversity";
import { Request, Response, Next } from "express";

const express = require('express');
const router = express.Router();

export async function getAllUniversities(req: Request, res: Response, next: Next) {
	const universities = await getRepository(University).find();
	res.json(universities);
}

export function searchUniversities(req: Request, res: Response) {
	// console.log(req.body);
	// res.json(req.body);
	var tags = "";
	for (var i = 0; i < req.body.tags.length; i++) {
		tags += req.body.tags[i]+', ';
	}
	console.log(tags);
	getConnection().transaction(async connection => {
		const data = await connection
		.createQueryBuilder(University, "c")
		.select()
		.where("document_with_weights @@ plainto_tsquery(:query)", {
			query: tags
		})
		.orderBy(
			"ts_rank(document_with_weights, plainto_tsquery(:query))",
			"DESC"
		)
		.getMany();
		
		// console.log(data);
		res.send(data);
	})
}

export function addUniversity(req: Request, res: Response) {	
	getConnection().transaction(async connection => {
		// Data for columns of universities table
		const data_insert = { 
			name: req.body.name, 
			tags: req.body.tags, 
			university_data: req.body.university_data,
			image_path: req.body.image_path,
		};
		console.log('INSERTING', data_insert);
		getConnection()
		.createQueryBuilder()
		.insert()
		.into(University)
		.values([
			data_insert,
		])
		.execute();
		console.log("[/api/addUniversity]: Inserted new university object into 'universities' table:\n\n", data_insert);

		res.json({
			success: true,
			msg: "Successfully saved university.",
		});
		console.log('responded');
	}).catch(error => {
		console.log(error);
		res.json({
			success: false,
			msg: "Error saving university."
		});
	})
}

export function editUniversity(req: Request, res: Response) {
	const university = req.body
	const uniName = university.name;
	console.log(`passed university: ${university}`);

	const newRatingWeight = 0.03;
	const currentRatingWeight = 1 - newRatingWeight;

	getConnection().transaction(async connection => {
		const manager = getManager();

		var uni = await manager.findOne(University, { name: uniName })
		if (uni) {
			// University already exists, make an edit to it.

			// Get existing uni data
			const uniData = JSON.parse(uni.university_data);
			const ratings = uniData.ratings;
			
			const newRatings = university.university_data.ratings;

			// UNIVERSITY_DATA.DATA CANNOT BE DIRECTLY AND IMMEDIATELY CHANGED BY USERS.
			// ONLY ADDS TO THE ADD_UNIVERSITY DATABASE FOR ME TO REVIEW.

			// Adjust all ratings by small weight
			console.log(`Received university submission (EDIT): editing current university: ${university.name}:\n\n`, university);

			for (var i = 0; i < Object.keys(ratings).length; i++) {
				// Objects are parallel meaning same key and index to access the rating object
				const currentRating = ratings[Object.keys(ratings)[i]].rating;
				const newRating = newRatings[Object.keys(ratings)[i]].rating;

				// Weighted sum
				const adjustedRating = (currentRating*currentRatingWeight + newRating*newRatingWeight)
				// Overwrite old rating with adjusted rating
				uniData.ratings[Object.keys(ratings)[i]].rating = adjustedRating.toFixed(1);
			}
			
			uni.university_data = JSON.stringify(uniData);
			manager.save(uni)
			.then(uni => {
				res.json({
					success: true,
					msg: `University: ${uni.name} was successfully updated.`,
					data: uni, 
					// Return new university object so redux client can be updated
					// rather than refreshing the page and recalling db.
				});	
			})
	
		} else {
			// University doesn't exist, add it -> to added_university table.
			console.log("University not found in database, adding as a new university to database: [add_university]");
			
			const { name, tags, university_data } = university;
			const addedUniRepo = getRepository(AddedUniversity);
			const newUni = addedUniRepo.create({
				name,
				tags,
				university_data,
			});
			addedUniRepo.save(newUni)
			.then(addedUni => {
				console.log("Received university submission (ADD): saving to added_university table:\n\n", university);
				res.json({
					success: true,
					msg: "University was saved. I'm working to add it and more as we speak.",
				});
			})
			.catch(err => {
				console.log(err);
				res.json({
					success: false,
					msg: "Error saving university, please try again. If this problem persists, contact support at unilistmail@gmail.com.",
				});
			});
		}
	})
	.catch(err => {
		console.log(err);
		res.json({
			success: false,
			msg: "There was an error saving the university. Please try again.",
		});
	})
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
	addUniversity(req, res);
});

router.post('/editUniversity', async (req: Request, res: Response) => {
	editUniversity(req, res);
})

module.exports = router;