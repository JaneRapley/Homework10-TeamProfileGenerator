const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern")
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const OUTPUT_PATH = path.join(OUTPUT_DIR, "team.html")
const render = require("./src/pagetemplate")
const teamMembersArray = []
const idArray = []

function menu() {

    function createManager() {
        console.log("Please input team information");
        inquirer.prompt([
            {
                name: "managerName",
                message: "What is the managers name?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "You must enter at least 1 character"
                }
            },
            {
                name: "managerId",
                message: "What is the managers id number?",
                validate: answer => {
                    const pass = answer.match(
                        /^[0-9]*$/
                    )
                    if (pass) {
                        return true
                    }
                    return "You must enter a positive number."
                }
            },
            {
                name: "managerEmail",
                message: "What is the managers email?",
            },
            {
                name: "officeNumber",
                message: "What is the managers office number?",
            }


        ])
        .then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembersArray.push(manager)
            idArray.push(answers.managerId) 
            createTeam() 
        })
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "jobType",
                message: "What type of team memeber would you like to add?",
                choices: [
                    "Engineer", 
                    "Intern",
                    "Done adding team members",
                ]
            }
        ])

        .then(choice => {
            switch (choice.jobType) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        })
    }
}

menu()