const axios = require('axios');

function MarkDown({ title, description, tableOfContents, installation, usage, gitUser, gitRepo }, licName, licBody) {
  this.title = title;
  this.description = description;
  this.tableOfContents = tableOfContents;
  this.installation = installation;
  this.usage = usage;
  this.gitUser = gitUser;
  this.gitRepo = gitRepo;
  this.licName = licName;
  this.licBody = licBody;
  this.openBox = '```sh';
  this.closeBox = '```';
};
//  = { generateMarkdown };

MarkDown.prototype.createTitleDesc = function () {
  return `# ${this.title ? this.title.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') : 'Good Readme Generator'} 

![Badge](${'https://img.shields.io/github/languages/top/' + this.gitUser + '/' + this.gitRepo})

### Description

${ this.description ? this.description : 'A good web app'} `
}

MarkDown.prototype.createToC = function () {
  if (this.tableOfContents) {
    return `
### Table Of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)`
  } else {
    return '';
  }
}

MarkDown.prototype.createInsUse = function () {
  return `
### Installation
${ this.openBox}
${ this.installation ? this.installation : '"npm install" to install dependecies'}
${ this.closeBox}
### Usage
${ this.openBox}
${ this.usage ? this.usage : '"node index.js" to install to run the program'}
${ this.closeBox} `
}

MarkDown.prototype.createLicense = function () {
  return `
### License
${ this.openBox}
${ this.licName}
${ this.closeBox}

### Contributing
Feel free to contribute.

### Questions
Ask me a question. </br>
![Github Profile](https://github.com/${this.gitUser}.png?size=200) </br>
**https://github.com/${this.gitUser}**
`;
}

MarkDown.prototype.completeMarkD = function () {
  const desc = this.createTitleDesc();
  const toc = this.createToC();
  const insUse = this.createInsUse();
  const license = this.createLicense();
  return desc + toc + insUse + license;
}

module.exports = MarkDown;