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
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jamaica',
    database: 'tracker'
});

function prompt(){
    inquirer
        .prompt(
              {
                type: 'list',
                pageSize: 20,
                message: 'What would you like to do?',
                name: 'action',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'All Employee', 'Update Employee Role', 'Exit']
              }
        )
        .then(({action}) => {
            if(action === 'Exit'){
                return 0;
            }
            if(action === 'View All Departments'){
                connection.promise().query("SELECT * FROM employee")
                .then( ([rows,fields]) => {
                    console.log('\n\n');
                    console.table(rows);
                    console.log('\n\n');
                })
                .catch(console.log);
            }
            if(action === 'View All Roles'){
                connection.promise().query("SELECT role.*, department.name FROM role LEFT JOIN department ON role.department_id = department.id ")
                .then( ([rows,fields]) => {
                    console.log('\n\n');
                    console.table(rows);
                    console.log('\n\n');
                })
                .catch(console.log);
            }
            if(action === 'View All Employees'){
                connection.promise().query("SELECT m.first_name AS 'Manager', e.* , role.title, role.salary, department.name FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON ?? department.id LEFT JOIN employee m ON e.manager_id = m.id ")
                .then( ([rows,fields]) => {
                    console.log('\n\n');
                    console.table(rows);
                    console.log('\n\n');
                })
                .catch(console.log);
            }
        })
        .then(()=> {prompt();});
        
}

 const init = () => {
    prompt();

}

init();