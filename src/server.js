const http = require('http');
const url = require('url');
const query = require('querystring');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const htmlandJSresponse = require('./htmlandJSResponses.js');
const jsonresponse = require('./JsonResponses.js');

const htmlURLStruct = {
  '/': htmlandJSresponse.clientresponse,
  '/style.css': htmlandJSresponse.styleresponse,
  '/bundle.js': htmlandJSresponse.scriptresponse,
};

const jsonURLStruct = {
  '/madlib': jsonresponse.madlibResponse,
  '/savedMadlib': jsonresponse.getSavedmadlib,
  '/gettopics': jsonresponse.getTopics,
  '/checkstatus': jsonresponse.checkStatusresponse,
  '/getSpecific': jsonresponse.findspecificMadlib,
};


const onrequest = (request, response) => {
  const urlparts = url.parse(request.url);
  console.log(urlparts.pathname);
  // post
  if (urlparts.pathname === '/addmadlib') {
    console.log('recieving post');

    const res = response;

    const body = [];

    // error out
    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    // push data to body
    request.on('data', (chunk) => {
      body.push(chunk);
    });

    // on end of upload stream.
    request.on('end', () => {
      // combine body array
      const bodyString = Buffer.concat(body).toString();
      // parse the string into an object by field name
      const bodyParams = query.parse(bodyString);
      jsonresponse.madlibRecieve(request, response, bodyParams);
    });
  } else if (htmlURLStruct[urlparts.pathname]) {
    // client and css
    htmlURLStruct[urlparts.pathname](request, response);
  } else if (jsonURLStruct[urlparts.pathname]) {
    // get request. Borrowed from https://stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript
    if (urlparts.pathname === '/madlib') {
      const querystring = urlparts.query;
      const querydata = querystring.split('&');
      const params = {};
      for (let x = 0; x < querydata.length; x++) {
        const temp = querydata[x].split('=');
        temp[1] = decodeURIComponent(temp[1]);
        params[temp[0]] = temp[1];
      }

      jsonresponse.madlibResponse(request, response, params.chosen);

      console.dir(params);
    } else if (urlparts.pathname === '/getSpecific') {
      const querystring = urlparts.query;
      const querydata = querystring.split('&');
      const params = {};
      for (let x = 0; x < querydata.length; x++) {
        const temp = querydata[x].split('=');
        temp[1] = decodeURIComponent(temp[1]);
        params[temp[0]] = temp[1];
      }

      jsonresponse.findspecificMadlib(request, response, params.Input);
    } else {
      jsonURLStruct[urlparts.pathname](request, response);
    }
  } else {
    jsonresponse.pageNotfound(request, response);
  }
};

http.createServer(onrequest).listen(port);

console.log(`Listening on localhost port ${port}`);
