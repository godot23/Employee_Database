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
    const sql = `select * from department`
    db.query(sql, (err, results) =>{
        console.table(results);
    })
}

function viewRoles(){
    const sql = `select * from roles`
    db.query(sql, (err, results) => {
        console.table(results);
    })
}

function viewEmployees(){
    const sql = `select * from employees`
    db.query(sql, (err, results) => {
        console.table(results)
    })
}

function AddDepartment(){
    inquirer
    .prompt([
        {
            type: "input",
            name: "departmentName",
            message: "enter a new department name"
        }
    ])
    .then((response) => {
     const sql = `insert into department (name) value ${response} `
     db.query(sql, (err, results) => {
        console.log(`added ${response} to database`)
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
      value (${response.roleTitle}, ${response.salary}, ${response.departmentID}`
     db.query(sql, (err, results) => {
        console.log("added to database")
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
        value (${response.employeeFirst}, ${response.employeeLast}, ${response.roleID}, ${response.mangagerID})`
    })
}
function updateEmployee(){

}