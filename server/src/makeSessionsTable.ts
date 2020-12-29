const fs = require('fs');
const path = require('path');

const options = {
	host: 'localhost',
	port: 5432,
	user: 'role',
	password: 'root',
	database: 'universities_db',
};

const knex = require('knex')({
	client: 'pg',
	connection: options,
});

knex.schema.hasTable('session').then(exists => {
	console.log('Making session table');
	if (exists) return;
	console.log('GENERATING NEW SESSION TABLE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
	return new Promise((resolve, reject) : void => {
		const schemaFilePath = path.join('C:/Users/Dylan/Desktop/build/web_projects/web_apps/unilist/server/node_modules/connect-pg-simple/table.sql');
		fs.readFile(schemaFilePath, (error, contents) => {
			// if (error) return reject(error);
			const sql = contents.toString();
			knex.raw(sql).then((): void => {
				resolve();
			}).catch(reject);
		});
	});
})
