module.exports.generateMarkdown = ({ title, description, tableOfContents, usage }) => {
  const markDownStr = `<h2 align='center'>${title}</h2>
  
  ### Description
  ${description}
  `;

  return JSON.stringify(markDownStr);
};
//  = { generateMarkdown };
