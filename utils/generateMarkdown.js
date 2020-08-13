const axios = require('axios');

const licObj = {
  'MIT': 'mit',
  'GNU AGPLv3': 'agpl-3.0',
  'GNU GPLv3': 'gpl-3.0',
  'GNU LGPLv3': 'lgpl-3.0',
  'Mozilla Public License 2.0': 'mpl-2.0',
  'Apache License 2.0': 'apache-2.0',
  'The Unlicense': 'unlicense'
};

function MarkDown({ title, description, tableOfContents, installation, usage, license }) {
  this.title = title;
  this.description = description;
  this.tableOfContents = tableOfContents;
  this.installation = installation;
  this.usage = usage;
  this.license = license;
  this.licenseVal = licObj[this.license];
  this.openBox = '```sh';
  this.closeBox = '```';
  this.licStr = '';
};
//  = { generateMarkdown };

MarkDown.prototype.createTitleDesc = function () {
  return `# ${this.title ? this.title.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') : 'Good Readme Generators'} 

### Description

${this.description ? this.description : 'A good web app'}`
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
${this.openBox}
${this.installation ? this.installation : '"npm install" to install dependecies'}
${this.closeBox}
### Usage
${this.openBox}
${this.usage ? this.usage : '"node index.js" to install to run the program'}
${this.closeBox}`
}

MarkDown.prototype.createLicense = async function () {

  const licData = await axios.get(`https://api.github.com/licenses/${this.licenseVal}`);
  const { data } = await licData;
  // console.log(name)
  return data;
  // return this.licStr
}

MarkDown.prototype.completeMarkD = function () {
  return this.createTitleDesc() + this.createToC() + this.createInsUse() + this.createLicense().then(data => {
    return `
### License
#### ${data.name}
${this.openBox}
${data.body}
${this.closeBox}`
  });
}

module.exports = MarkDown;