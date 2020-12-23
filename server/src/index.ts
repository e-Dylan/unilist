import "reflect-metadata";
import { createConnection } from "typeorm";
import { University } from "./entity/University";
const express = require('express');

const app = express();
app.use(express.json());

app.post('/searchUniversities', (req, res) => {

});

createConnection()
	.then(async connection => {
		const data = await connection
		.createQueryBuilder(University, "c")
		.select()
		.where("document_with_weights @@ plainto_tsquery(:query)", {
			query: "university"
		})
		.orderBy(
			"ts_rank(document_with_weights, plainto_tsquery(:query))",
			"DESC"
		)
		.getMany();
		
	console.log(data);
})
.catch(error => console.log("Error: ", error));