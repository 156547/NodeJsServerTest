const { table } = require('console');
const mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "testDb"
});

con.connect((err) => {
    if (err){
        throw(err);
    }

    console.log("Connected!");

// CREATE TEST DATABASE
//   con.query("CREATE DATABASE testDb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });

    createTable("tblUsers");
});

// CREATES NEW TABLE FROM GIVEN NAME
function createTable(tableName){
    var sql = `CREATE TABLE ${tableName} (id MEDIUMINT NOT NULL AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id))`;
    
    con.query(sql, (err, result) => {
      if (err){
        throw(err);
      }

      console.log(tableName + " successfully created");
    });
};