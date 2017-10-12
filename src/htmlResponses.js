const fs = require('fs');

const client = fs.readFileSync(`${__dirname}/../client/client.html`);

const clientresponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(client);
  response.end();
};

module.exports.clientresponse = clientresponse;
