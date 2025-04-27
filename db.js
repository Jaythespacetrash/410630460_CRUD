// db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',        
    user: 'root',             
    password: 'rootpass',     
    database: 'lab_CRUD',    
});

module.exports = pool;
