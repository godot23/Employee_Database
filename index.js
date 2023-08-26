let inquirer = require("inquirer");
let selector = require("./lib/selector.js")

inquirer
    .prompt([
        {
            type: "list",
            name: "optionSelection",
            message: "please choose an option",
            choices:[
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update employee role"
            ]
        }
    ])

    .then((answers) => {
        if(answers.optionSelection === "view all departments"){
            selector.viewDepart();
        }
        else if(answers.optionSelection === "view all roles"){
            selector.viewRole();
        }
        else if(answers.optionSelection === "view all employees"){
            selector.viewEmployees();
        }
        else if(answers.optionSelection === "add a department"){
            selector.AddDepartment();
        }
        else if(answers.optionSelection === "add a role"){
            selector.addRole();
        }
        else if(answers.optionSelection === "add an employee"){
            selector.addEmployee();
        }
        else if(answers.optionSelection === "update employee role"){
            selector.updateEmployee();
        }
    })