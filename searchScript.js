
/*** Get the logged in user from the background.js script. ***/
chrome.extension.sendMessage({}, function(response) {
  console.log(response);
});

emotions =  ["_128544", "_128546","_128552","_128562",
            "_128578", "_128525", "_128514", "_128526", "_129320"];

//get array of search result divs
var resultDivs = [...document.getElementsByClassName("g")]; //convert to array

// takes the div containing a search result link and scrapes the url
function getLink(div) {
    console.log("Getting link.")
    var link = div.getElementsByTagName('a')[0].getAttribute("href")
    console.log("Link is " + link );
    return link;
}


// make a div that contains 1-3 image parameters (string paths) specified as arguments
// note - if less than three are provided, only those provided should be used.
// otherwise, the first three images will be used
// NEED TO HANDLE LESS INPUT
function makeEmojis(emojis, emojiArea) {    
    emojiArea.setAttribute('class',"g emojiArea");
    console.log(emojis);
    for (let i = 0; i < 3; i++) {
        
        let num_emotes, emo_value;
        
        num_emotes = emojis[i][1];

        if (num_emotes == 0){
            break;
        }else{
            emo_value = emojis[i][0].substring(1);    //remove underscore.
        }

        var emojiDiv = document.createElement("div");
        const emoji  = document.createElement('span');
        emoji.innerHTML = "&#" + emo_value.toString() + ";";
        emojiDiv.appendChild(emoji);  
        emojiArea.appendChild(emojiDiv);
        emojiDiv.setAttribute('class', "emoji num" + ( i + 1 ));
	    emojiDiv.style.zIndex = "0";
    }
}

//send a POST request to the server, asking for three image paths
// and maybe other data in the future.
async function getReactsFunc(div)
{
    var url = getLink(div);

    var xhr = new XMLHttpRequest();
    xhr.open("POST","https://the-prism.herokuapp.com/getReacts", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4) {
           if (xhr.status === 200) {            
                response = JSON.parse(xhr.response);                 
                if (!Object.keys(response).includes("response")){
                    makeEmojis(JSON.parse(xhr.response), div);                               
                }
            }
            else{
                console.log("Something broke.");
                console.error(xhr.statusText);
                return("something broke.");
            }
        }
    }
    xhr.send(JSON.stringify( { 'url': url } )); 
}

// for each result div, make a corresponding area to put emojis
// if it is a regular result type
while (resultDivs.length != 0) {
    div = resultDivs.shift();
    if (div.classList.length == 1) {
        getReactsFunc(div);
    }
}