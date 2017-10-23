
    
    let button;

    let xhr;

    let body;

    let wordarray;

    let title;

    let wordcache;

    let arrayIndex;

    let message;

    let buttonGetSavedMadlib;

    let savedMadlibContent;

    let buttonGetUnfilledMadlib;

    let checkstatusButton;

    let statusElm;

    let CheckModified;

    let change; 

    let buttonGetSpecificMadlib;


    const init = () => {
      //button = document.querySelector("#buttonGet");
      change = false;
      buttonGetUnfilledMadlib = document.querySelector("#GetUnfilled");
      body = document.querySelector("#body");
      title = document.querySelector("#title");
      buttonGetSavedMadlib = document.querySelector("#buttonGetSavedMadlib");
      savedMadlibContent = document.querySelector("#savedMadLibcontent")
      checkstatusButton = document.querySelector("#Headbutton");
      statusElm = document.querySelector("#status");
      CheckModified = document.querySelector("#CheckModified");
      buttonGetSpecificMadlib = document.querySelector("#getSpecificsavedMadeLib");
      wordcache = [];
      const sendgetAJAX = (e) => getAJAX(e);
      const getsavedMB = (e) => getSavedmadlib(e);
      const getTopics = (e) => getUnfilledAJAX(e);
      const getHead = (e) => getHeadAJAX(e);
      const getStatus = (e) => checkStats(e);
      const getSpecific = (e) => specificMadlibSetup(e);
      buttonGetSavedMadlib.addEventListener("click",getsavedMB);
      buttonGetUnfilledMadlib.addEventListener("click",getTopics);
      checkstatusButton.addEventListener("click",getHead);
      CheckModified.addEventListener("click",getStatus);
      buttonGetSpecificMadlib.addEventListener("click",getSpecific);
    };

    


        //SENDING THE AJAX CODE TO THE SERVER

        //get all topics
        const getUnfilledAJAX = (e) => {

        while (savedMadLibcontent.hasChildNodes()) 
        {
            savedMadLibcontent.removeChild(savedMadLibcontent.firstChild);
        }
        if(statusElm.innerHTML != "")
        {
            statusElm.innerHTML = "";
        }

        xhr = new XMLHttpRequest();
        xhr.open('GET','/gettopics');
        xhr.setRequestHeader('Accept','application/json');
        xhr.send();

        xhr.onload = () => gettopics(xhr,e);
        
      e.preventDefault();
        
      return false;
    }

    //check status of page with head request
    const getHeadAJAX = (e) => {
    xhr = new XMLHttpRequest();
    xhr.open("HEAD","/checkstatus");
    xhr.setRequestHeader("Accept","application/json");
    xhr.send();
                
    xhr.onload = () => handlesavedMadlibGet(xhr,false);
              
    e.preventDefault();
                
    return false;
    };
        
    //get the form of selected category
    const getAJAX = (e,input) => {
    xhr = new XMLHttpRequest();
    xhr.open('GET','/madlib' + input);
    xhr.setRequestHeader("Accept","application/json");
    xhr.send();
              
    xhr.onload = () => handleAJAXonload(xhr);
                
    e.preventDefault();
                
    return false;
                
                
    };

    //getSpecific MadLib AJAX
    const getSpecificAJAX = (e,input) => {
        xhr = new XMLHttpRequest();
        xhr.open("GET","/getSpecific" + input);
        xhr.setRequestHeader("Accept","application/json");
        xhr.send();

        xhr.onload = () => handleAJAXSpecificMadLib(xhr);

        e.preventDefault();

        return false;



    }

    //get the saved mad libs
    const getSavedmadlib= (e) => {

    xhr = new XMLHttpRequest();
    xhr.open('GET','/savedMadlib');
    xhr.setRequestHeader("Accept","application/json");
    xhr.send();
      
    xhr.onload = () => handlesavedMadlibGet(xhr,true);
        
    e.preventDefault();
        
    return false;
        
    };

    //put saved data to server
const postResults = (e) => {
    const xhr = new XMLHttpRequest();
    xhr.open("post","/addmadlib");
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept","application/json");

    let results = document.querySelector("#result");
    let name = document.querySelector("#name");
    const formData = `saveMadlib=${results.textContent}&name=${name.value}`;
    xhr.send(formData);
    xhr.onload = () => handlepostRequest(xhr);
    e.preventDefault();
    return false;
};

//get specific madlib setup
const specificMadlibSetup = (e) => {

    RidElements();

    let title = document.createElement("h2");
    let input = document.createElement("input");
    let button = document.createElement("input");
    let div = document.createElement("div");


    title.setAttribute("id","specificTitle");
    input.setAttribute("id","specificInput");
    button.setAttribute("id","specificButton");
    button.setAttribute("type","button");
    div.setAttribute("id","SpecificDiv");

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

    button.addEventListener("click", (e) => {

        let input = document.querySelector("#specificInput").value;
        let specificMLName = `?Input=${input}`;
        getSpecificAJAX(e,specificMLName);
    });
    
    
}



////////// HANDLING THE AJAX ONLOAD

//handle the form to insert words into madlibs
const handleAJAXonload = (xhr) => {
    //get the response text and wordbank 

    RidElements();

    const object = JSON.parse(xhr.response);
    console.dir(object);
    message = JSON.stringify(object.madlib.page);
    
    //get the length
    wordarray = object.madlib.wordbank;
    console.log(wordarray.length);
    let x = 0;
    //create the title
    let wordtitle = wordarray[x];
    //set global index
    arrayIndex = x;

    let title = document.createElement("h2");
    title.setAttribute("id","title");
    title.style.position = "absolute";
    title.style.top = "80%";
    title.style.width = "100%";
    title.style.margin = "auto";
    title.style.textAlign = "center";

    title.textContent = `Enter in a ${wordtitle}`;
    //create the input to recieve it
    let wordfield = document.createElement("Input");
    button = document.createElement("Input");

    wordfield.setAttribute("type","text");
    wordfield.setAttribute("id","wordfiled");

    let div = document.createElement("div");
    div.setAttribute("id","wordfiledDiv");
    div.style.position = "absolute";
    div.style.top = "86%";
    div.style.margin = "auto";
    div.style.display = "block";
    div.style.width = "100%";
    div.appendChild(wordfield);

    wordfield.style.position = "relative";
    wordfield.style.margin = "auto";
    wordfield.style.display = "block";

    button.setAttribute("type","button");
    button.setAttribute("value","Press me to enter")
    button.setAttribute("id","buttonclick");

    let div2 = document.createElement("div");
    div2.setAttribute("id","EnterDiv");
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
    button.addEventListener("click", () => {
       let wordfield = document.querySelector("#wordfiled");
       let word = wordfield.value;
       enterInaWord(word,xhr);
    });
    
};

    //show topics callback
    const gettopics = (xhr,e) => {

        RidElements();

        button = document.createElement("input");
        button.setAttribute("type","button");
        button.setAttribute("id","ButtonGet");
        button.setAttribute("value","Get this MadLib");

        let Label = document.createElement("h2");
        Label.setAttribute("id","TopicLabel");
        Label.innerHTML = "Pick a Topic";

        let object = JSON.parse(xhr.response);
        let titles = object.titles;

        var selectlist = document.createElement("select");
        selectlist.setAttribute("id","mySelect");

        var div = document.createElement("div");
        div.setAttribute("id","selectDiv");
        div.appendChild(selectlist);
        
        var div2 = document.createElement("div");
        div2.setAttribute("id","buttonDiv");
        div2.appendChild(button);

        for(let x =0;x<titles.length;x++)
        {
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

        button.addEventListener("click", (e) => {

            let select = document.getElementById("mySelect");
            let chosen = select.options[select.selectedIndex].value;
            let params = `?chosen=${chosen}`;
            const sendgetAJAX = (e,params) => getAJAX(e,params);
            sendgetAJAX(e,params);
        });
    };





    //handle specific madlib ajax
    const handleAJAXSpecificMadLib = (xhr) => {

        RidElements();

        let object = JSON.parse(xhr.response);

        let status = object.status;

        if(status == "Bad")
        {
            let message = document.createElement("h2");
            message.setAttribute("id","specificMessage");
            message.innerHTML = object.message;

            message.style.position = "absolute";
            message.style.top = "80%";
            message.style.width = "100%";
            message.style.textAlign = "center";

            document.body.appendChild(message);
        }
        else if(status == "Good")
        {
            let Madlib = document.createElement("p");
            Madlib.setAttribute("id","specificMadlib");
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
    const handlesavedMadlibGet = (xhr,response) => {


        RidElements();

        console.log(xhr.status);
        console.log(response);
        if(response == true)
        {
        const object = JSON.parse(xhr.response);
        console.dir(object.saveMadlib);
        let saveMadlib = object.saveMadlib;
        //if this is a get request that is getting new values
       
        let keys = Object.keys(saveMadlib);
    
        if(keys.length == 0)
        {
            let madlib = document.createElement("h2"); 
            madlib.innerHTML = "There's nothing here at the moment";
            savedMadLibcontent.appendChild(madlib);
        }

        for(let x =0;x < keys.length;x++)
        {
            let title = document.createElement("h2");
            let madlib = document.createElement("p");
            madlib.style.fontSize = "13pt"; 
            madlib.style.marginLeft = "10px";
            madlib.style.marginRight = "10px";
            title.innerHTML = keys[x];
            madlib.innerHTML = saveMadlib[keys[x]];
            savedMadLibcontent.appendChild(title);
            savedMadLibcontent.appendChild(madlib);
        }

        change = false;
        }

        
    }

        //enter words into form and have them insert
        const enterInaWord = (word,xhr) => {
            
            //change the title and let you enter a new word 



            let arrayIndexString = arrayIndex.toString();
            message = message.replace(arrayIndexString,word);
            arrayIndex = arrayIndex + 1;
            let wordtitle = wordarray[arrayIndex];
            let title = document.querySelector("#title");
            if(arrayIndex < wordarray.length)
            {
            title.textContent = `Enter in a ${wordtitle}`;

            let wordfield = document.querySelector("#wordfiled");
            wordfield.value = "";
            }
            else 
            {
                //create the result and put it on screen
                let results = document.createElement("p");
                results.setAttribute("id","result");
                results.textContent = message;
                
                results.style.position = "absolute";
                results.style.width = "calc(100% - 20px)";
                results.style.left = "10px";
                results.style.top = "77%";
                results.style.margin = "auto";
                results.style.textAlign = "center";


                let div = document.createElement("div");
                div.setAttribute("id","nameDiv");
                div.style.position = "absolute";
                div.style.width = "100%";
                div.style.top = "90%";


                //create button to post
                let sendbutton = document.createElement("input");
                sendbutton.setAttribute("type","button");
                sendbutton.setAttribute("id","sendButton");
                sendbutton.setAttribute("value","Post MadLib?");

                sendbutton.style.position = "absolute";
                sendbutton.style.left = "57%";
                
                let resultlabel = document.createElement("h3");
                resultlabel.setAttribute("id","resultLabel");
                resultlabel.textContent = "Results";
                
                resultlabel.style.position = "absolute";
                resultlabel.style.top = "70%";
                resultlabel.style.width = "100%";
                resultlabel.style.textAlign = "center";

                //create an input to add in a new name
                let namefield = document.createElement("input");
                namefield.id = "name";

                namefield.style.position = "absolute";
                namefield.style.left = "44%"
        
                let namelabel = document.createElement("h3");
                namelabel.id = "namelabel";
                namelabel.innerHTML = "Name the poem"

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
                const addPoem = (e) => postResults(e);
        
                sendbutton.addEventListener("click", addPoem);
                
                
        
            }
        };

//show response for posting
const handlepostRequest = (xhr) => {

    RidElements();

    switch(xhr.status)
    {
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

const checkStats = (e) => {

    RidElements();

    let memoryElm = document.createElement("h2");
    if(change == true)
    {
        memoryElm.setAttribute("id","memoryStatus");
        memoryElm.innerHTML = "You changed the Saved List";
        memoryElm.style.position = "absolute";
        memoryElm.style.top = "75%";
        memoryElm.style.width = "100%";
        memoryElm.style.textAlign = "center";
        document.body.appendChild(memoryElm);
    }
    else
    {
        memoryElm.setAttribute("id","memoryStatus");
        memoryElm.innerHTML = "You have not change the Saved List";
        memoryElm.style.position = "absolute";
        memoryElm.style.top = "75%";
        memoryElm.style.width = "100%";
        memoryElm.style.textAlign = "center";
        document.body.appendChild(memoryElm);
    }


};

//get rid of elements
const RidElements = () => {
    while (savedMadLibcontent.hasChildNodes()) 
    {
        savedMadLibcontent.removeChild(savedMadLibcontent.firstChild);
    }  

    let select = document.querySelector("#mySelect");
    let button = document.querySelector("#ButtonGet");
    let results = document.querySelector("#result");
    let name = document.querySelector("#name");
    let resultlabel = document.querySelector("#resultLabel");
    let namelabel = document.querySelector("#namelabel");
    let sendbutton = document.querySelector("#sendButton");
    let label = document.querySelector("#TopicLabel");
    let title = document.querySelector("#title");
    let wordfill = document.querySelector("#wordfiled");
    let buttonclick = document.querySelector("#buttonclick");
    let specificTitle = document.querySelector("#specificTitle");
    let specificButton = document.querySelector("#specificButton");
    let specificInput = document.querySelector("#specificInput");
    let specificMadlib = document.querySelector("#specificMadlib");
    let specificMessage = document.querySelector("#specificMessage");
    let selectDiv = document.querySelector("#selectDiv");
    let buttondiv = document.querySelector("#buttonDiv");
    let enterdiv = document.querySelector("#EnterDiv");
    let wordfileddiv = document.querySelector("#wordfiledDiv");
    let nameDiv = document.querySelector("#nameDiv");
    let specificDiv = document.querySelector("#SpecificDiv");

    if(select != undefined)
    {
        select.parentNode.removeChild(select);
        button.parentNode.removeChild(button);
    }
    if(statusElm.innerHTML != undefined)
    {
    statusElm.innerHTML = "";
    }
    let memoryLabel = document.querySelector("#memoryStatus");

    if(memoryLabel !=undefined)
    {
        memoryLabel.parentNode.removeChild(memoryLabel);
    }
    if(label != undefined)
    {
        label.parentNode.removeChild(label);
    }

    if(results != undefined)
    {
        results.parentNode.removeChild(results);
    }
    if(name != undefined)
    {
        name.parentNode.removeChild(name);
    }
    if(resultlabel != undefined)
    {
        resultlabel.parentNode.removeChild(resultlabel);
    }
    if(namelabel != undefined)
    {
        namelabel.parentNode.removeChild(namelabel);
    }
    if(sendbutton != undefined)
    {
        sendbutton.parentNode.removeChild(sendbutton);
    }
    if(title != undefined)
    {
        title.parentNode.removeChild(title);
    }
    if(wordfill != undefined)
    {
        wordfill.parentNode.removeChild(wordfill);
    }
    if(buttonclick != undefined)
    {
        buttonclick.parentNode.removeChild(buttonclick);
    }
    if(specificButton != undefined)
    {
        specificButton.parentNode.removeChild(specificButton);
    }
    if(specificInput != undefined)
    {
        specificInput.parentNode.removeChild(specificInput);
    }
    if(specificTitle != undefined)
    {
        specificTitle.parentNode.removeChild(specificTitle);
    }
    if(specificMadlib != undefined)
    {
        specificMadlib.parentNode.removeChild(specificMadlib);
    }
    if(specificMessage != undefined)
    {
        specificMessage.parentNode.removeChild(specificMessage);
    }
    if(selectDiv != undefined)
    {
        selectDiv.parentNode.removeChild(selectDiv);
    }
    if(buttondiv != undefined)
    {
        buttondiv.parentNode.removeChild(buttondiv);
    }
    if(enterdiv != undefined)
    {
        enterdiv.parentNode.removeChild(enterdiv);
    }
    if(wordfileddiv != undefined)
    {
        wordfileddiv.parentNode.removeChild(wordfileddiv);
    }
    if(nameDiv != undefined)
    {
        nameDiv.parentNode.removeChild(nameDiv);
    }
    if(specificDiv != undefined)
    {
        specificDiv.parentNode.removeChild(specificDiv);
    }



};

window.onload = init;
     