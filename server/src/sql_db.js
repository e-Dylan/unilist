// const mysql = require('mysql');

// var dbConfig;

// dbConfig = process.env.NODE_ENV === "development" ? {
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'root',
// 	database: 'unilist_db',
// 	port: 3308,
// } : {
// 	host: '',
// 	user: '',
// 	password: '',
// 	database: '',
// 	port: 3306,
// }

// // Create database connection
// const sql_db = mysql.createConnection(dbConfig);

// sql_db.connect(err => {
// 	if (err) {
// 		console.log("Error: database connection error.");
// 		throw(err);
// 		return false;
// 	} else {
// 		console.log('[sql_db.js]: Connected to database for universities.');
// 	}
// })

// module.exports = sql_db;