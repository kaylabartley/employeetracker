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
function addRole() {

}
function addDepartment(a) {
    console.log(a);
    connection.promise().query('INSERT INTO department (name) VALUES (?)', [a])
        .catch(console.log);
}
async function options(action) {
    if (action === 'Exit') {
        return 0;
    }
    if (action === 'View All Departments') {
        connection.promise().query("SELECT * FROM department")
            .then(([rows, fields]) => {
                console.log('\n\n');
                console.table(rows);
                console.log('\n\n');
            })
            .catch(console.log)
            .then(() => { return prompt() });

    }
    if (action === 'View All Roles') {
        connection.promise().query("SELECT role.*, department.name AS 'Department Name' FROM role LEFT JOIN department ON role.department_id = department.id ")
            .then(([rows, fields]) => {
                console.log('\n\n');
                console.table(rows);
                console.log('\n\n');
            })
            .catch(console.log)
            .then(() => { return prompt() });
    }
    if (action === 'View All Employees') {
        connection.promise().query("SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS 'Job Title', role.salary, department.name AS 'Department Name', CONCAT(m.first_name , ' ' ,m.last_name) AS 'Manager' FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id")
            .then(([rows, fields]) => {
                console.log('\n\n');
                console.table(rows);
                console.log('\n\n');
            })
            .catch(console.log)
            .then(() => { return prompt() });
    }
    if (action === 'Add Department') {
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
            ).then(({ department }) => {
                connection.promise().query('INSERT INTO department (name) VALUES (?)', [department])
                    .catch(console.log);
            })
            .then(() => { return prompt() });

    }
    if (action === 'Add Role') {
        let departmentArray = [];
        connection.promise()
            .query("SELECT * FROM department")
            .then(([rows, fields]) => {
                rows.forEach(item => {

                    departmentArray.push({value: item.id, name: item.name});
                    
                })
                
                console.log(departmentArray);
                inquirer
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
                                message: 'Select department',
                                name: 'department',
                                choices: departmentArray
                            }
                        ]
                    ).then(({ department, salary, title }) => {
                        console.log(department);
                        connection.promise().query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [title, salary, department] )
                        .catch(console.log);  
                    })
                    .then(() => { return prompt() });
            });
    }
    if (action === 'Add Employee') {
        let managerArray =[];
        connection.promise()
            .query("SELECT * FROM employee")
            .then(([rows, fields]) => {
                rows.forEach(item => {

                    managerArray.push({value: item.id, name: item.first_name + ' ' + item.last_name});
                    
                })
                console.log(managerArray);
                let roleArray = [];
                connection.promise()
                    .query("SELECT * FROM role")
                    .then(([rows, fields]) => {
                        rows.forEach(item => {

                            roleArray.push({value: item.id, name: item.title});
                            
                        })
                        
                        console.log(roleArray);
                        inquirer
                            .prompt(
                                [
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
                                        message: 'Select Role: ',
                                        name: 'role',
                                        choices: roleArray
                                    },
                                    {
                                        type: 'list',
                                        pageSize: 20,
                                        message: 'Select Manager: ',
                                        name: 'manager',
                                        choices: managerArray
                                    }
                                ])
                            .then(({ firstName, lastName, role, manager }) => {
                                    connection.promise().query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [firstName, lastName, role, manager] )
                                    .catch(console.log);  
                                })
                            .then(() => { return prompt() });
                    });
            });
    }
    if(action === 'Update Employee Role' ){
        let employeeArray =[];
        connection.promise()
            .query("SELECT * FROM employee")
            .then(([rows, fields]) => {
                rows.forEach(item => {

                    employeeArray.push({value: item.id, name: item.first_name + ' ' + item.last_name});
                    
                })
                console.log(employeeArray);
                let roleArray = [];
                connection.promise()
                    .query("SELECT * FROM role")
                    .then(([rows, fields]) => {
                        rows.forEach(item => {

                            roleArray.push({value: item.id, name: item.title});
                            
                        })
                        
                        console.log(roleArray);
                        inquirer
                            .prompt(
                                [
                                    {
                                        type: 'list',
                                        pageSize: 20,
                                        message: 'Select Employee: ',
                                        name: 'employee',
                                        choices: employeeArray
                                    },
                                    {
                                        type: 'list',
                                        pageSize: 20,
                                        message: 'Select Role: ',
                                        name: 'role',
                                        choices: roleArray
                                    } 
                                ])
                            .then(({ employee, role}) => {
                                    connection.promise().query("UPDATE employee SET role_id = ? WHERE id= ? ", [role, employee] )
                                    .catch(console.log);  
                                })
                            .then(() => { return prompt() });
                    });
            });
    }
}

function prompt() {
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
        .then(({ choice }) => {
            options(choice);

        });
}

const init = () => {
    prompt();

}

init();
