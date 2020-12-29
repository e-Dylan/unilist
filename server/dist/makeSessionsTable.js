var fs = require('fs');
var path = require('path');
var options = {
    host: 'localhost',
    port: 5432,
    user: 'role',
    password: 'root',
    database: 'universities_db',
};
var knex = require('knex')({
    client: 'pg',
    connection: options,
});
knex.schema.hasTable('session').then(function (exists) {
    console.log('Making session table');
    if (exists)
        return;
    console.log('GENERATING NEW SESSION TABLE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    return new Promise(function (resolve, reject) {
        var schemaFilePath = path.join('C:/Users/Dylan/Desktop/build/web_projects/web_apps/unilist/server/node_modules/connect-pg-simple/table.sql');
        fs.readFile(schemaFilePath, function (error, contents) {
            // if (error) return reject(error);
            var sql = contents.toString();
            knex.raw(sql).then(function () {
                resolve();
            }).catch(reject);
        });
    });
});
//# sourceMappingURL=makeSessionsTable.js.map