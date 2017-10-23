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