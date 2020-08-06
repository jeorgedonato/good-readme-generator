const fs = require('fs');

function generateMarkdown(data) {
  return `
# ${data.title}

`;
}

module.exports = generateMarkdown;
