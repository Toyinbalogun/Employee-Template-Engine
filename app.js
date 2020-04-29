const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const outputPath = path.join(__dirname, 'index.html')

const render = require("./lib/htmlRenderer");

const mQuest = [
    {
      name: "name",
      message: "What is the manager's name?",
    },
    {
      name: "id",
      message: "What is their employee ID?",
    },
    {
      name: "email",
      message: "What is their email?",
    },
    {
      name: "officeNumber",
      message: "What is their office number?",
    },
  ];
  
  const empQuest = [
    {
      type: "list",
      name: "addEmployee",
      message: "Add another team member?",
      choices: ["Add engineer", "Add intern", "No"],
    },
  ];
  
  const engQuest = [
    {
      name: "name",
      message: "What is the engineer's name?",
    },
    {
      name: "id",
      message: "What is their employee ID?",
    },
    {
      name: "email",
      message: "What is their email?",
    },
    {
      name: "github",
      message: "What is their Github username?",
    },
  ];
  
  const internQuest = [
    {
      name: "name",
      message: "What is the intern's name?",
    },
    {
      name: "id",
      message: "What is their employee ID?",
    },
    {
      name: "email",
      message: "What is their email?",
    },
    {
      name: "school",
      message: "What is their school?",
    },
  ];
  

  let employees = [];
  
  let addEmployee = async () => {
    let question = await inquirer.prompt(empQuest);
    if (question.addEmployee == "Add engineer") {
      let engineer = await inquirer.prompt(engQuest);
      let newEngineer = new Engineer(
        engineer.name,
        engineer.id,
        engineer.email,
        engineer.github
      );
      employees.push(newEngineer);
      if (engineer.name) {
        addEmployee();
      }
    } else if (question.addEmployee == "Add intern") {
      let intern = await inquirer.prompt(internQuest);
      let newIntern = new Intern(
        intern.name,
        intern.id,
        intern.email,
        intern.school
      );
      employees.push(newIntern);
      if (intern.name) {
        addEmployee();
      }
    } else {
      fs.writeFileSync(outputPath, render(employees));
    }
  };

  (async () => {
    let manager = await inquirer.prompt(mQuest);
    newManager = new Manager(
      manager.name,
      manager.id,
      manager.email,
      manager.officeNumber
    );
    employees.push(newManager);
    addEmployee();
  })();