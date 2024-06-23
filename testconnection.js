const sql = require('mssql');

const databaseconfig = {
    user: 'az-proto-1',
    password: 'Sunny7@260512',
    server: 'az-proto-1.database.windows.net',
    database: 'az-proto-1',
    options: {
        encrypt: true, // for Azure
        trustServerCertificate: false, // change to true if necessary
        connectTimeout: 30000 // increase timeout to 30 seconds
    }
};

sql.connect(databaseconfig).then(pool => {
    return pool.request().query('SELECT * from users');
}).then(result => {
    console.log(result.recordset);
}).catch(err => {
    console.error('Database connection failed:', err);
});
