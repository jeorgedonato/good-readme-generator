const inquirer = require('inquirer');
const generateMd = require('./utils/generateMarkdown.js');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
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
    message: 'Can you provide some details how your project works?? (Close the editor after saving)',
    name: 'usage'
  },
  {
    type: 'input',
    message: 'asdasdasd',
    name: 'lalalal'
  }
];

function writeToFile(fileName, data) {
  writeFileAsync()
}

function init() {
  inquirer.prompt(questions).then(answers => {
    return generateMd.generateMarkdown(answers);
  }).then(generated => {
    writeToFile(data)
  }).catch(error => {
    throw error;
  })
}

init();
