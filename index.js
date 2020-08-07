const inquirer = require('inquirer');
const generateMark = require('./utils/generateMarkdown.js')

const questions = [
  {
    type: 'input',
    message: 'What is your Project Title?',
    name: 'title'
  },
  {
    type: 'editor',
    message: 'What is your Project Description? (Close the editor after saving)',
    name: 'description'
  },
  {
    type: 'confirm',
    message: 'Do you want the table of contents to be generated?',
    name: 'tableOfContents'
  },
  {
    type: 'editor',
    message: 'What is your Project Description? (Close the editor after saving)',
    name: 'description'
  },
  {
    type: ''
  }
];

function writeToFile(fileName, data) {
}

function init() {
  inquirer.prompt(questions).then(answers => {
    console.log(answers)
  }).catch(error => {

  })
}

init();
