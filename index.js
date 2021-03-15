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
function addRole(){

}
function addDepartment(a){
    console.log(a);
        connection.promise().query('INSERT INTO department (name) VALUES (?)', [a] )
        .catch(console.log);
}
async function options(action){
    if(action === 'Exit'){
        return 0;
    }
    if(action === 'View All Departments'){
        connection.promise().query("SELECT * FROM department")
        .then( ([rows,fields]) => {
            console.log('\n\n');
            console.table(rows);
            console.log('\n\n');
        })
        .catch(console.log)
        .then(()=>{return prompt()});
        
    }
    if(action === 'View All Roles'){
        connection.promise().query("SELECT role.*, department.name AS 'Department Name' FROM role LEFT JOIN department ON role.department_id = department.id ")
        .then( ([rows,fields]) => {
            console.log('\n\n');
            console.table(rows);
            console.log('\n\n');
        })
        .catch(console.log)
        .then(()=>{return prompt()});
    }
    if(action === 'View All Employees'){
        connection.promise().query("SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS 'Job Title', role.salary, department.name AS 'Department Name', CONCAT(m.first_name , ' ' ,m.last_name) AS 'Manager' FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id")
        .then( ([rows,fields]) => {
            console.log('\n\n');
            console.table(rows);
            console.log('\n\n');
        })
        .catch(console.log)
        .then(()=>{return prompt()});
    }
    if(action === 'Add Department'){
        inquirer
            .prompt(
                {
                    type: 'input',
                    name: 'department',
                    message: 'Enter department name: ',
                    validate: input => {
                        if (input) {
                        return true;
                        } else {
                        console.log('Please enter a department name!');
                        return false;
                        }
                    }
                }
            ).then(({department})=>{
                connection.promise().query('INSERT INTO department (name) VALUES (?)', [department] )
                .catch(console.log);
            })
            .then(()=>{return prompt()});
        
    }
    if(action === 'Add Role'){
        let roleArray =[];
        connection.promise()
            .query("SELECT * FROM role")
            .then( ([rows,fields]) => {
                rows.forEach(item => {
                    roleArray.push(item.title);
                })
                console.log(roleArray);   
            })
        await inquirer
            .prompt(
                [
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Enter job title: ',
                        validate: input => {
                            if (input) {
                            return true;
                            } else {
                            console.log('Please enter a job title!');
                            return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter salary: ',
                        validate: input => {
                            if (input) {
                            return true;
                            } else {
                            console.log('Please enter a salary!');
                            return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        pageSize: 20,
                        message: 'Select role',
                        name: 'role',
                        choices: roleArray
                    }
                ]
            ).then(({role})=>{
                connection.promise().query("SELECT * FROM department WHERE id LIKE %?% ", [role])
                .then( ([rows,fields]) => {
                    console.table(rows);
                });
               // .query("INSERT INTO role (title, salary, department_id) VALUES ('Cashier', 28157.17, 1),, [department] )
               // .catch(console.log);
            })
            .then(()=>{return prompt()});
        
    }
}

function prompt(){
    inquirer
        .prompt(
              {
                type: 'list',
                pageSize: 20,
                message: 'What would you like to do?',
                name: 'choice',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit']
              }
        )
        .then(({choice}) => {
                options(choice);
                
        });
          /*  if(action === 'Add Employee'){
                connection.promise()
                .query("SELECT * FROM role")
                .then( ([rows,fields]) => {
                    let roleArray =[];
                    rows.forEach(item => {
                        roleArray.push(item.title);
                    })
                    console.log(roleArray);   
                })

                inquirer
                        .prompt(
                            {
                                type: 'input',
                                name: 'firstName',
                                message: 'Enter first name: ',
                                validate: input => {
                                    if (input) {
                                    return true;
                                    } else {
                                    console.log('Please enter a first name!');
                                    return false;
                                    }
                                }
                            },
                            {
                                type: 'input',
                                name: 'lastName',
                                message: 'Enter last name: ',
                                validate: input => {
                                    if (input) {
                                    return true;
                                    } else {
                                    console.log('Please enter a last name!');
                                    return false;
                                    }
                                }
                            },
                            {
                                type: 'list',
                                pageSize: 20,
                                message: 'Select Role',
                                name: 'role',
                                choices: roleArray
                            }
                        );
                connection.promise()
                .query("SELECT COUNT(*) FROM department")
                .then([rows,fields]) => {
                    rows.forEach(item => {
                        const count = item.COUNT(*);
                    })
                    let manageridArray = [null];
                    var i;
                    for(i=1, i<count+1, i++){
                        manageridArray.push(i);
                    }

                    inquirer
                        .prompt(
                            {
                                type: 'list',
                                pageSize: 20,
                                message: 'Select Manager ID',
                                name: 'manager',
                                choices: manageridArray
                            }
                        )
                })
                .then(console.log(roleArray));
            
               
            
    
            }*/
        
}

 const init = () => {
    prompt();

}

init();