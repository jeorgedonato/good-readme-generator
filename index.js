const inquirer = require('inquirer');
const MarkDown = require('./utils/generateMarkdown.js');
const fs = require('fs');
const util = require('util');
const axios = require('axios');

const writeFileAsync = util.promisify(fs.writeFile);
const questions = [
  {
    type: 'input',
    message: 'What is your Github Username?',
    name: 'gitUser'
  },
  {
    type: 'input',
    message: "What is the project's repo?",
    name: 'gitRepo'
  },
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

const licObj = {
  'MIT': 'mit',
  'GNU AGPLv3': 'agpl-3.0',
  'GNU GPLv3': 'gpl-3.0',
  'GNU LGPLv3': 'lgpl-3.0',
  'Mozilla Public License 2.0': 'mpl-2.0',
  'Apache License 2.0': 'apache-2.0',
  'The Unlicense': 'unlicense'
};

const init = async () => {
  try {
    const questionRes = await inquirer.prompt(questions);
    const { license } = questionRes;
    const licenseVal = licObj[license]
    const axiosRes = await axios.get(`https://api.github.com/licenses/${licenseVal}`);
    const { data: { name: licName, body: licBody } } = axiosRes;
    const generated = new MarkDown(questionRes, licName, licBody);
    const gMarkDown = generated.completeMarkD();
    writeToFile(gMarkDown);
  } catch (error) {
    throw error;
  }
};

const writeToFile = markedDown => {
  // const generatedAnswer = generateMd.generateMarkdown(markedDown);
  // const parsed = JSON.parse(generatedAnswer);
  // console.log(markedDown);

  writeFileAsync("README.md", markedDown).then(function (err) {
    console.info('File has Successfully Written!');
  });
};


init();
