/*

// get the client
const mysql = require('mysql2');
// create the connection
const con = mysql.createConnection(
  {host:'localhost', user: 'root', database: 'test'}
);
con.promise().query("SELECT 1")
  .then( ([rows,fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then( () => con.end());

*/

const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });