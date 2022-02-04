const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const mysql = require("mysql2");

app.use(express.static("public"))
app.use(bodyparser());

const port = 3000;

// FILL DATABASE CONNECTION DETAILS
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "testDb"
});

// CONNECT TO DATABASE
con.connect((err) => {
    if (err){
        throw(err);
    }

    console.log("Connected!");
});

app.get('/', (req, res) => {
    res.sendFile('./login.html', { root: __dirname });
});

app.post("/create", (req, res) => {

    // CHECK USERNAME EXISTS
    con.query((`SELECT * FROM tblUsers WHERE username = "${req.body.username}"`), (err, queryResult) => {
        if (err){
            throw(err);
        }

        // ADD USER TO DATABASE
        if(queryResult.length === 0){
            con.query(`INSERT INTO tblUsers(username, password) VALUES("${req.body.username}", "${req.body.password}");`);
            res.send("account created");
        }
        else{
            res.send("username already exists");
        }

    });
});

app.post("/login", (req, res) => {
    
    // CHECK USER AND PASS EXIST
    con.query(`SELECT * FROM tblUsers WHERE username = "${req.body.username}" AND password = "${req.body.password}"`, (err, queryResult) => {
        if (err){
            throw(err);
        }

        // LOGIN USER
        if(queryResult.length > 0){
            res.send("logged in");
        }
        else{
            res.send("account details incorrect");
        }
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});