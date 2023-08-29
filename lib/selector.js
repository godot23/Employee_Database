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
     const sql = `insert into department (name) values ("${response.departmentName}")`
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
      value ("${response.roleTitle}", ${response.roleSalary}, ${response.departmentID})`
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
        value ("${response.employeeFirst}", "${response.employeeLast}", ${response.roleID}, ${response.managerID})`
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
    const sqlGet = "select first_name, last_name from employee"
    db.promise().query(sqlGet)
    .then (results => {
        console.log(results);
        console.log(results[0][0].last_name);
        let newArr = results[0].map(name => name.last_name)
        return newArr;
    })
    .then (async results => {
    await inquirer
    .prompt ([
        {
            type: "list",
            name: "nameSelection",
            message: "please choose an employee",
            choices: results
        },
        {
            type: "input",
            name: "newRoleID",
            message: "please enter the new role ID"
        },
    ])
    .then((response) =>{
        const sql = `update employee set role_id = "${response.newRoleID}" where last_name = "${response.nameSelection}"`
        db.query(sql, (err, results) => {
            if(err){
                console.log("an error has occured. please try again")
            }
            else{
                console.log("updated");
                
            }
        })
    })
})
}



module.exports = {viewDepartment, viewRole, viewEmployees, addDepartment, addEmployee, addRole, updateEmployee}