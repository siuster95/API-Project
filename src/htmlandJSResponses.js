const fs = require('fs');

const client = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const style = fs.readFileSync(`${__dirname}/../hosted/style.css`);
const script = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);

const clientresponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(client);
  response.end();
};

const styleresponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(style);
  response.end();
};

const scriptresponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(script);
  response.end();
};

module.exports.clientresponse = clientresponse;
module.exports.styleresponse = styleresponse;
module.exports.scriptresponse = scriptresponse;
