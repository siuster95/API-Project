"use strict";

var button = void 0;

var xhr = void 0;

var body = void 0;

var wordarray = void 0;

var title = void 0;

var wordcache = void 0;

var arrayIndex = void 0;

var message = void 0;

var buttonGetSavedMadlib = void 0;

var savedMadlibContent = void 0;

var buttonGetUnfilledMadlib = void 0;

var checkstatusButton = void 0;

var statusElm = void 0;

var CheckModified = void 0;

var change = void 0;

var buttonGetSpecificMadlib = void 0;

var init = function init() {
    //button = document.querySelector("#buttonGet");
    change = false;
    buttonGetUnfilledMadlib = document.querySelector("#GetUnfilled");
    body = document.querySelector("#body");
    title = document.querySelector("#title");
    buttonGetSavedMadlib = document.querySelector("#buttonGetSavedMadlib");
    savedMadlibContent = document.querySelector("#savedMadLibcontent");
    checkstatusButton = document.querySelector("#Headbutton");
    statusElm = document.querySelector("#status");
    CheckModified = document.querySelector("#CheckModified");
    buttonGetSpecificMadlib = document.querySelector("#getSpecificsavedMadeLib");
    wordcache = [];
    var sendgetAJAX = function sendgetAJAX(e) {
        return getAJAX(e);
    };
    var getsavedMB = function getsavedMB(e) {
        return getSavedmadlib(e);
    };
    var getTopics = function getTopics(e) {
        return getUnfilledAJAX(e);
    };
    var getHead = function getHead(e) {
        return getHeadAJAX(e);
    };
    var getStatus = function getStatus(e) {
        return checkStats(e);
    };
    var getSpecific = function getSpecific(e) {
        return specificMadlibSetup(e);
    };
    buttonGetSavedMadlib.addEventListener("click", getsavedMB);
    buttonGetUnfilledMadlib.addEventListener("click", getTopics);
    checkstatusButton.addEventListener("click", getHead);
    CheckModified.addEventListener("click", getStatus);
    buttonGetSpecificMadlib.addEventListener("click", getSpecific);
};

//SENDING THE AJAX CODE TO THE SERVER

//get all topics
var getUnfilledAJAX = function getUnfilledAJAX(e) {

    while (savedMadLibcontent.hasChildNodes()) {
        savedMadLibcontent.removeChild(savedMadLibcontent.firstChild);
    }
    if (statusElm.innerHTML != "") {
        statusElm.innerHTML = "";
    }

    xhr = new XMLHttpRequest();
    xhr.open('GET', '/gettopics');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();

    xhr.onload = function () {
        return gettopics(xhr, e);
    };

    e.preventDefault();

    return false;
};

//check status of page with head request
var getHeadAJAX = function getHeadAJAX(e) {
    xhr = new XMLHttpRequest();
    xhr.open("HEAD", "/checkstatus");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();

    xhr.onload = function () {
        return handlesavedMadlibGet(xhr, false);
    };

    e.preventDefault();

    return false;
};

//get the form of selected category
var getAJAX = function getAJAX(e, input) {
    xhr = new XMLHttpRequest();
    xhr.open('GET', '/madlib' + input);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();

    xhr.onload = function () {
        return handleAJAXonload(xhr);
    };

    e.preventDefault();

    return false;
};

//getSpecific MadLib AJAX
var getSpecificAJAX = function getSpecificAJAX(e, input) {
    xhr = new XMLHttpRequest();
    xhr.open("GET", "/getSpecific" + input);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();

    xhr.onload = function () {
        return handleAJAXSpecificMadLib(xhr);
    };

    e.preventDefault();

    return false;
};

//get the saved mad libs
var getSavedmadlib = function getSavedmadlib(e) {

    xhr = new XMLHttpRequest();
    xhr.open('GET', '/savedMadlib');
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();

    xhr.onload = function () {
        return handlesavedMadlibGet(xhr, true);
    };

    e.preventDefault();

    return false;
};

//put saved data to server
var postResults = function postResults(e) {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/addmadlib");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept", "application/json");

    var results = document.querySelector("#result");
    var name = document.querySelector("#name");
    var formData = "saveMadlib=" + results.textContent + "&name=" + name.value;
    xhr.send(formData);
    xhr.onload = function () {
        return handlepostRequest(xhr);
    };
    e.preventDefault();
    return false;
};

//get specific madlib setup
var specificMadlibSetup = function specificMadlibSetup(e) {

    RidElements();

    var title = document.createElement("h2");
    var input = document.createElement("input");
    var button = document.createElement("input");
    var div = document.createElement("div");

    title.setAttribute("id", "specificTitle");
    input.setAttribute("id", "specificInput");
    button.setAttribute("id", "specificButton");
    button.setAttribute("type", "button");
    div.setAttribute("id", "SpecificDiv");

    title.innerHTML = "Which one do you want?";
    button.value = "Get this one";

    title.style.position = "absolute";
    title.style.top = "75%";
    title.style.width = "100%";
    title.style.textAlign = "center";

    div.style.position = "absolute";
    div.style.top = "85%";
    div.style.width = "100%";

    input.style.position = "absolute";
    input.style.margin = "auto";
    input.style.left = "44%";

    button.style.position = "absolute";
    button.style.left = "57%";

    div.appendChild(button);
    div.appendChild(input);
    document.body.appendChild(title);
    document.body.appendChild(div);

    button.addEventListener("click", function (e) {

        var input = document.querySelector("#specificInput").value;
        var specificMLName = "?Input=" + input;
        getSpecificAJAX(e, specificMLName);
    });
};

////////// HANDLING THE AJAX ONLOAD

//handle the form to insert words into madlibs
var handleAJAXonload = function handleAJAXonload(xhr) {
    //get the response text and wordbank 

    RidElements();

    var object = JSON.parse(xhr.response);
    console.dir(object);
    message = JSON.stringify(object.madlib.page);

    //get the length
    wordarray = object.madlib.wordbank;
    console.log(wordarray.length);
    var x = 0;
    //create the title
    var wordtitle = wordarray[x];
    //set global index
    arrayIndex = x;

    var title = document.createElement("h2");
    title.setAttribute("id", "title");
    title.style.position = "absolute";
    title.style.top = "80%";
    title.style.width = "100%";
    title.style.margin = "auto";
    title.style.textAlign = "center";

    title.textContent = "Enter in a " + wordtitle;
    //create the input to recieve it
    var wordfield = document.createElement("Input");
    button = document.createElement("Input");

    wordfield.setAttribute("type", "text");
    wordfield.setAttribute("id", "wordfiled");

    var div = document.createElement("div");
    div.setAttribute("id", "wordfiledDiv");
    div.style.position = "absolute";
    div.style.top = "86%";
    div.style.margin = "auto";
    div.style.display = "block";
    div.style.width = "100%";
    div.appendChild(wordfield);

    wordfield.style.position = "relative";
    wordfield.style.margin = "auto";
    wordfield.style.display = "block";

    button.setAttribute("type", "button");
    button.setAttribute("value", "Press me to enter");
    button.setAttribute("id", "buttonclick");

    var div2 = document.createElement("div");
    div2.setAttribute("id", "EnterDiv");
    div2.style.position = "absolute";
    div2.style.top = "92%";
    div2.style.margin = "auto";
    div2.style.display = "block";
    div2.style.width = "100%";
    div2.appendChild(button);

    button.style.position = "relative";
    button.style.display = "block";
    button.style.margin = "auto";

    //add them to the field
    document.body.appendChild(div);
    document.body.appendChild(div2);
    document.body.appendChild(title);

    //body.textContent = message;

    //if the button is clicked then add to the list and cycle the words
    button.addEventListener("click", function () {
        var wordfield = document.querySelector("#wordfiled");
        var word = wordfield.value;
        enterInaWord(word, xhr);
    });
};

//show topics callback
var gettopics = function gettopics(xhr, e) {

    RidElements();

    button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("id", "ButtonGet");
    button.setAttribute("value", "Get this MadLib");

    var Label = document.createElement("h2");
    Label.setAttribute("id", "TopicLabel");
    Label.innerHTML = "Pick a Topic";

    var object = JSON.parse(xhr.response);
    var titles = object.titles;

    var selectlist = document.createElement("select");
    selectlist.setAttribute("id", "mySelect");

    var div = document.createElement("div");
    div.setAttribute("id", "selectDiv");
    div.appendChild(selectlist);

    var div2 = document.createElement("div");
    div2.setAttribute("id", "buttonDiv");
    div2.appendChild(button);

    for (var x = 0; x < titles.length; x++) {
        var option = document.createElement("option");
        option.value = titles[x];
        option.text = titles[x];
        selectlist.appendChild(option);
    }

    div.style.position = "absolute";
    div.style.top = "85%";
    div.style.width = "100%";

    div2.style.position = "absolute";
    div2.style.top = "90%";
    div2.style.width = "100%";

    selectlist.style.position = "relative";
    selectlist.style.margin = "auto";
    selectlist.style.display = "block";

    button.style.position = "relative";
    button.style.display = "block";
    button.style.margin = "auto";

    Label.style.position = "absolute";
    Label.style.top = "75%";
    Label.style.width = "100%";
    Label.style.display = "block";
    Label.style.textAlign = "center";

    document.body.appendChild(div);
    document.body.appendChild(div2);
    document.body.appendChild(Label);

    button.addEventListener("click", function (e) {

        var select = document.getElementById("mySelect");
        var chosen = select.options[select.selectedIndex].value;
        var params = "?chosen=" + chosen;
        var sendgetAJAX = function sendgetAJAX(e, params) {
            return getAJAX(e, params);
        };
        sendgetAJAX(e, params);
    });
};

//handle specific madlib ajax
var handleAJAXSpecificMadLib = function handleAJAXSpecificMadLib(xhr) {

    RidElements();

    var object = JSON.parse(xhr.response);

    var status = object.status;

    if (status == "Bad") {
        var _message = document.createElement("h2");
        _message.setAttribute("id", "specificMessage");
        _message.innerHTML = object.message;

        _message.style.position = "absolute";
        _message.style.top = "80%";
        _message.style.width = "100%";
        _message.style.textAlign = "center";

        document.body.appendChild(_message);
    } else if (status == "Good") {
        var Madlib = document.createElement("p");
        Madlib.setAttribute("id", "specificMadlib");
        Madlib.innerHTML = object.madlib;

        Madlib.style.position = "absolute";
        Madlib.style.top = "80%";
        Madlib.style.width = "calc(100% - 20px)";
        Madlib.style.left = "10px";
        Madlib.style.textAlign = "center";
        Madlib.style.fontSize = "13pt";

        document.body.appendChild(Madlib);
    }
};

//show the Saved list in the body 
var handlesavedMadlibGet = function handlesavedMadlibGet(xhr, response) {

    RidElements();

    console.log(xhr.status);
    console.log(response);
    if (response == true) {
        var object = JSON.parse(xhr.response);
        console.dir(object.saveMadlib);
        var saveMadlib = object.saveMadlib;
        //if this is a get request that is getting new values

        var keys = Object.keys(saveMadlib);

        if (keys.length == 0) {
            var madlib = document.createElement("h2");
            madlib.innerHTML = "There's nothing here at the moment";
            savedMadLibcontent.appendChild(madlib);
        }

        for (var x = 0; x < keys.length; x++) {
            var _title = document.createElement("h2");
            var _madlib = document.createElement("p");
            _madlib.style.fontSize = "13pt";
            _madlib.style.marginLeft = "10px";
            _madlib.style.marginRight = "10px";
            _title.innerHTML = keys[x];
            _madlib.innerHTML = saveMadlib[keys[x]];
            savedMadLibcontent.appendChild(_title);
            savedMadLibcontent.appendChild(_madlib);
        }

        change = false;
    }
};

//enter words into form and have them insert
var enterInaWord = function enterInaWord(word, xhr) {

    //change the title and let you enter a new word 


    var arrayIndexString = arrayIndex.toString();
    message = message.replace(arrayIndexString, word);
    arrayIndex = arrayIndex + 1;
    var wordtitle = wordarray[arrayIndex];
    var title = document.querySelector("#title");
    if (arrayIndex < wordarray.length) {
        title.textContent = "Enter in a " + wordtitle;

        var wordfield = document.querySelector("#wordfiled");
        wordfield.value = "";
    } else {
        //create the result and put it on screen
        var results = document.createElement("p");
        results.setAttribute("id", "result");
        results.textContent = message;

        results.style.position = "absolute";
        results.style.width = "calc(100% - 20px)";
        results.style.left = "10px";
        results.style.top = "77%";
        results.style.margin = "auto";
        results.style.textAlign = "center";

        var div = document.createElement("div");
        div.setAttribute("id", "nameDiv");
        div.style.position = "absolute";
        div.style.width = "100%";
        div.style.top = "90%";

        //create button to post
        var sendbutton = document.createElement("input");
        sendbutton.setAttribute("type", "button");
        sendbutton.setAttribute("id", "sendButton");
        sendbutton.setAttribute("value", "Post MadLib?");

        sendbutton.style.position = "absolute";
        sendbutton.style.left = "57%";

        var resultlabel = document.createElement("h3");
        resultlabel.setAttribute("id", "resultLabel");
        resultlabel.textContent = "Results";

        resultlabel.style.position = "absolute";
        resultlabel.style.top = "70%";
        resultlabel.style.width = "100%";
        resultlabel.style.textAlign = "center";

        //create an input to add in a new name
        var namefield = document.createElement("input");
        namefield.id = "name";

        namefield.style.position = "absolute";
        namefield.style.left = "44%";

        var namelabel = document.createElement("h3");
        namelabel.id = "namelabel";
        namelabel.innerHTML = "Name the poem";

        namelabel.style.position = "absolute";
        namelabel.style.width = "100%";
        namelabel.style.top = "80%";
        namelabel.style.textAlign = "center";

        RidElements();

        //put new elements on the screen
        div.appendChild(namefield);
        div.appendChild(sendbutton);

        document.body.appendChild(resultlabel);
        document.body.appendChild(results);
        document.body.appendChild(namelabel);
        document.body.appendChild(div);

        //add button event
        var addPoem = function addPoem(e) {
            return postResults(e);
        };

        sendbutton.addEventListener("click", addPoem);
    }
};

//show response for posting
var handlepostRequest = function handlepostRequest(xhr) {

    RidElements();

    switch (xhr.status) {
        case 200:
            statusElm.innerHTML = "<b>Success</b>";
            break;

        case 201:
            statusElm.innerHTML = "<b>MadLib Created</b>";
            change = true;
            break;

        case 204:
            statusElm.innerHTML = "<b>MadLib Updated</b>";
            change = true;
            break;

        case 400:
            statusElm.innerHTML = "<b>Bad Request, need a Name</b>";
            break;

        default:
            statusElm.innerHTML = "Error code not implemented by client";
            break;

    }
};

var checkStats = function checkStats(e) {

    RidElements();

    var memoryElm = document.createElement("h2");
    if (change == true) {
        memoryElm.setAttribute("id", "memoryStatus");
        memoryElm.innerHTML = "You changed the Saved List";
        memoryElm.style.position = "absolute";
        memoryElm.style.top = "75%";
        memoryElm.style.width = "100%";
        memoryElm.style.textAlign = "center";
        document.body.appendChild(memoryElm);
    } else {
        memoryElm.setAttribute("id", "memoryStatus");
        memoryElm.innerHTML = "You have not change the Saved List";
        memoryElm.style.position = "absolute";
        memoryElm.style.top = "75%";
        memoryElm.style.width = "100%";
        memoryElm.style.textAlign = "center";
        document.body.appendChild(memoryElm);
    }
};

//get rid of elements
var RidElements = function RidElements() {
    while (savedMadLibcontent.hasChildNodes()) {
        savedMadLibcontent.removeChild(savedMadLibcontent.firstChild);
    }

    var select = document.querySelector("#mySelect");
    var button = document.querySelector("#ButtonGet");
    var results = document.querySelector("#result");
    var name = document.querySelector("#name");
    var resultlabel = document.querySelector("#resultLabel");
    var namelabel = document.querySelector("#namelabel");
    var sendbutton = document.querySelector("#sendButton");
    var label = document.querySelector("#TopicLabel");
    var title = document.querySelector("#title");
    var wordfill = document.querySelector("#wordfiled");
    var buttonclick = document.querySelector("#buttonclick");
    var specificTitle = document.querySelector("#specificTitle");
    var specificButton = document.querySelector("#specificButton");
    var specificInput = document.querySelector("#specificInput");
    var specificMadlib = document.querySelector("#specificMadlib");
    var specificMessage = document.querySelector("#specificMessage");
    var selectDiv = document.querySelector("#selectDiv");
    var buttondiv = document.querySelector("#buttonDiv");
    var enterdiv = document.querySelector("#EnterDiv");
    var wordfileddiv = document.querySelector("#wordfiledDiv");
    var nameDiv = document.querySelector("#nameDiv");
    var specificDiv = document.querySelector("#SpecificDiv");

    if (select != undefined) {
        select.parentNode.removeChild(select);
        button.parentNode.removeChild(button);
    }
    if (statusElm.innerHTML != undefined) {
        statusElm.innerHTML = "";
    }
    var memoryLabel = document.querySelector("#memoryStatus");

    if (memoryLabel != undefined) {
        memoryLabel.parentNode.removeChild(memoryLabel);
    }
    if (label != undefined) {
        label.parentNode.removeChild(label);
    }

    if (results != undefined) {
        results.parentNode.removeChild(results);
    }
    if (name != undefined) {
        name.parentNode.removeChild(name);
    }
    if (resultlabel != undefined) {
        resultlabel.parentNode.removeChild(resultlabel);
    }
    if (namelabel != undefined) {
        namelabel.parentNode.removeChild(namelabel);
    }
    if (sendbutton != undefined) {
        sendbutton.parentNode.removeChild(sendbutton);
    }
    if (title != undefined) {
        title.parentNode.removeChild(title);
    }
    if (wordfill != undefined) {
        wordfill.parentNode.removeChild(wordfill);
    }
    if (buttonclick != undefined) {
        buttonclick.parentNode.removeChild(buttonclick);
    }
    if (specificButton != undefined) {
        specificButton.parentNode.removeChild(specificButton);
    }
    if (specificInput != undefined) {
        specificInput.parentNode.removeChild(specificInput);
    }
    if (specificTitle != undefined) {
        specificTitle.parentNode.removeChild(specificTitle);
    }
    if (specificMadlib != undefined) {
        specificMadlib.parentNode.removeChild(specificMadlib);
    }
    if (specificMessage != undefined) {
        specificMessage.parentNode.removeChild(specificMessage);
    }
    if (selectDiv != undefined) {
        selectDiv.parentNode.removeChild(selectDiv);
    }
    if (buttondiv != undefined) {
        buttondiv.parentNode.removeChild(buttondiv);
    }
    if (enterdiv != undefined) {
        enterdiv.parentNode.removeChild(enterdiv);
    }
    if (wordfileddiv != undefined) {
        wordfileddiv.parentNode.removeChild(wordfileddiv);
    }
    if (nameDiv != undefined) {
        nameDiv.parentNode.removeChild(nameDiv);
    }
    if (specificDiv != undefined) {
        specificDiv.parentNode.removeChild(specificDiv);
    }
};

window.onload = init;
