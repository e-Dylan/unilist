const { Client } = require('pg');

const client = new Client({
	user: 'role',
	password: 'root',
	database: 'universities_db',
	port: 5433,
	host: 'localhost',
});

client.connect(err => {
	if (err) console.error('Client connection error.');
	else console.log('Client successfully connected.');
})

module.exports = {
	query: (sql, params, callback) => {
		// const start = Date.now();
		return client.query(sql, params, callback);
			// const duration = Date.now() - start;
			// console.log("[db]: executed query", { text, duration, rows: data.rowCount });
			// console.log(data.rows);
	}
}