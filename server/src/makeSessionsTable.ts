const fs = require('fs');
const path = require('path');

const options = process.env.NODE_ENV === "development" ?
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

const knex = require('knex')({
	client: 'pg',
	connection: options,
});

knex.schema.hasTable('session').then(exists => {
	console.log('Making session table');
	if (exists) return;
	console.log('GENERATING NEW SESSION TABLE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
	return new Promise<void>((resolve, reject) => {
		const schemaFilePath = path.join('C:/Users/Dylan/Desktop/build/web_projects/web_apps/unilist/server/node_modules/connect-pg-simple/table.sql');
		fs.readFile(schemaFilePath, (error, contents) => {
			// if (error) return reject(error);
			const sql = contents.toString();
			knex.raw(sql).then(() => {
				resolve();
			}).catch(reject);
		});
	});
})
