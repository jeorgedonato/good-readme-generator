const inquirer = require('inquirer');
const MarkDown = require('./utils/generateMarkdown.js');
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
    type: 'input',
    message: 'What is your Project Description?',
    name: 'description'
  },
  {
    type: 'confirm',
    message: 'Do you want the table of contents to be generated?',
    name: 'tableOfContents'
  },
  {
    type: 'input',
    message: 'Provide some installation instructions for your project.',
    name: 'installation'
  },
  {
    type: 'input',
    message: 'Provide some information on how to use your project.',
    name: 'usage'
  },
  {
    type: 'list',
    name: 'license',
    message: 'What type of license do you use?',
    choices: ['MIT', 'GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'The Unlicense']
  }
];

const init = () => {
  inquirer.prompt(questions).then(function (response) {
    const generated = new MarkDown(response)
    const gMarkDown = generated.completeMarkD();
    // const generated = generateMd.generateMarkdown(response);
    writeToFile(gMarkDown);
  }).catch(function (error) {
    console.log(error);
    return;
  });
};

const writeToFile = markedDown => {
  // const generatedAnswer = generateMd.generateMarkdown(markedDown);
  // const parsed = JSON.parse(generatedAnswer);
  // console.log(markedDown);

  writeFileAsync("README-TEST.md", markedDown).then(function (err) {
    console.log('File Written!')
  });
};


init();
