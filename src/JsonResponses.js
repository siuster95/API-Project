const page1 = {
  title: 'Be Kind',
  page: "Be Kind to your 0-footed 1. For a duck may be somebody's 2. Be kind to your 3 in 4. Where the weather is always 5. You may think that this is the 6. Well it is",
  wordbank: ['noun', 'noun', 'noun', 'noun', 'place', 'adjective', 'noun'],
};

const page2 = {
  title: 'Runaway Bride Proposal',
  page: "Look, I guarantee there'll be 0 times. I guarantee that at some 1,2 or both of us is gonna want to get out of this 3. But I also guarantee that if I don't ask you to be 4, I'll 5 it for the rest of my 6, because I know, in my 7, your're the 8 one",
  wordbank: ['adjective', 'noun', 'number', 'noun', 'adjective', 'verb', 'noun', 'body part', 'adjective'],
};

const page3 = {
  title: 'Sick Note',
  page: 'Dear School Nurse: 0 1 will not be attending school today. He/She has come down with a case of 2 and has horrible 3 and a/an 4 fever.We have made an appointment with the 5 Dr. 6, who studied for many years in 7 and has 8 degrees in pediatrics. He will send you all the information you need. Thank You! Sincerely Mrs. 9',
  wordbank: ['silly word', 'last name', 'illness', 'noun(plural)', 'adjective', 'adjective', 'silly word', 'place', 'number', 'adjective'],
};


const pages = [];
pages.push(page1);
pages.push(page2);
pages.push(page3);

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const saveMadlib = {};

// give back a madlib
const madlibResponse = (request, response, titleinput) => {
  const responseJSON = {
    madlib: {},
  };


  for (let x = 0; x < pages.length; x++) {
    if (pages[x].title === titleinput) {
      responseJSON.madlib = pages[x];
    }
  }

  return respondJSON(request, response, 200, responseJSON);
};

// get topics 
const getTopics = (request, response) => {
  const titles = [];
  for (let x = 0; x < pages.length; x++) {
    titles.push(pages[x].title);
  }

  const responseJSON = {
    titles,
  };

  console.log(responseJSON);
  return respondJSON(request, response, 200, responseJSON);
};


// posting a saveMadlib from madlib
const madlibRecieve = (request, response, bodyParams) => {
  const responseJSON = {
    message: 'Result is not valid',
  };

    // if missing saveMadlib, return with error code
  if (!bodyParams.saveMadlib || !bodyParams.name) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // status code to 201
  let responseCode = 201;
  // if it exist, respond with 204
  if (saveMadlib[bodyParams.name]) {
    responseCode = 204;
    responseJSON.id = 'Updated';
    responseJSON.message = 'Object has been updated';
    saveMadlib[bodyParams.name] = bodyParams.saveMadlib;
    return respondJSON(request, response, responseCode, responseJSON);
  }
  // create a new object with the name
  saveMadlib[bodyParams.name] = {};

  // add saveMadlib to the object
  saveMadlib[bodyParams.name] = bodyParams.saveMadlib;

  // if response is created, then set our created message and sent response with a message;
  responseJSON.message = 'Created Successfully';
  return respondJSON(request, response, responseCode, responseJSON);
};

// give back a Saved madlib
const getSavedmadlib = (request, response) => {
  const responseJSON = {
    saveMadlib,
  };

  respondJSON(request, response, 200, responseJSON);
};


module.exports.madlibResponse = madlibResponse;
module.exports.madlibRecieve = madlibRecieve;
module.exports.getSavedmadlib = getSavedmadlib;
module.exports.getTopics = getTopics;
