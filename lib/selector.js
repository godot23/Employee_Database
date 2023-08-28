const mysql = require('mysql2');
const inquirer = require("inquirer");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "employeeDatabase"
    },
    console.log("connected to the employeeDatabase database")
)

function viewDepartment(){
    const sql = "select * from department"
    db.query(sql, (err, results) =>{
        if(err){
            console.log("an error has occured. please try again")
        }
        console.table(results);
    })
}

function viewRole(){
    const sql = "select * from role"
    db.query(sql, (err, results) => {
        if(err){
            console.log("an error has occured. please try again")
        }
        console.table(results);
    })
}

function viewEmployees(){
    const sql = "select * from employee"
    db.query(sql, (err, results) => {
        if(err){
            console.log("an error has occured. please try again")
        }
        console.table(results)
    })
}

function addDepartment(){
    inquirer
    .prompt([
        {
            type: "input",
            name: "departmentName",
            message: "enter a new department name"
        }
    ])
    .then((response) => {
     const sql = `insert into department (name) value "${response.departmentName}" `
     db.query(sql, (err, results) => {
        if(err){
            console.log("an error has occured. please try again")
        }
        else{
            console.log(`added ${response.departmentName} to database`)
        }
     })
 })
}

function addRole(){
    inquirer
    .prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "enter a new role name"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "enter salary"
        },
        {
            type: "input",
            name: "departmentID",
            message: "enter department id"
        }
    ])
    .then((response) => {
     const sql = `insert into role (title, salary, department_id)
      value ("${response.roleTitle}", ${response.salary}, ${response.departmentID}`
     db.query(sql, (err, results) => {
        if(err){
            console.log("an error has occured. please try again")
        }
        else{
            console.log("added to database")
        }
     })
 })
}

function addEmployee(){
    inquirer
    .prompt([
        {
            type: "input",
            name: "employeeFirst",
            message: "enter employee first name"
        },
        {
            type: "input",
            name: "employeeLast",
            message: "enter employee last name"
        },
        {
            type: "input",
            name: "roleID",
            message: "enter role ID"
        },
        {
            type: "input",
            name: "managerID",
            message: "enter ID of manager"
        },
    ])
    .then((response) =>{
        const sql = `insert into employee(first_name, last_name, role_id, manager_id)
        value ("${response.employeeFirst}", "${response.employeeLast}", ${response.roleID}, ${response.mangagerID})`
        db.query(sql, (err, results) => {
            if(err){
                console.log("an error has occured. please try again")
            }
            else{
                console.log("updated")
            }
        })
    })
}
function updateEmployee(){
    inquirer
    .prompt ([
        {
            type: "input",
            name: "firstNameEntry",
            message: "please enter first name"
        },
        {
            type: "input",
            name: "lastNameEntry",
            message: "please enter last name"
        },
        {
            type: "input",
            name: "newRoleID",
            message: "please enter the new role ID"
        }
    ])
    .then((response) =>{
        const sql = `update employee set role_id = "${response.newRoleID}" where first_name = "${response.firstNameEntry}" and last_name = "${response.lastNameEntry}"`
        db.query(sql, (err, results) => {
            if(err){
                console.log("an error has occured. please try again")
            }
            console.log("updated");
        })
    })
}

// async function updateEmployee() {
//     try {
//         const response = await inquirer.prompt([
//                     {
//             type: "input",
//             name: "firstNameEntry",
//             message: "please enter first name"
//         },
//         {
//             type: "input",
//             name: "lastNameEntry",
//             message: "please enter last name"
//         },
//         {
//             type: "input",
//             name: "newRoleID",
//             message: "please enter the new role ID"
//         }
//         ]);
        
//         const sql = `UPDATE employee SET role_id = ${} WHERE first_name = ? AND last_name = ?`;
//         const values = [response.newRoleID, response.firstNameEntry, response.lastNameEntry];

//         const [results, fields] = await db.query(sql, values);
//         console.log("Updated");
//     } catch (error) {
//         console.error("An error has occurred:", error);
//     } finally {
//         db.end(); // Close the database connection when done
//     }
// }

module.exports = {viewDepartment, viewRole, viewEmployees, addDepartment, addEmployee, addRole, updateEmployee}