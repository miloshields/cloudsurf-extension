//dictionary mapping reaction types to their corresponding dec values
// var typeToPath = {
//     "angry" :  "128544",
//     "crying":  "128546",
//     "afraid":  "128552",
//     "astonished": "128562",
//     "smiling"  :  "128578", 
//     "love"  :  "128525",
//     "laugh" :  "128514",
//     "chill" : "128526",
//     "raisebrow": "129320"
// };

var emotions = [ "128544",
                 "128546",
                 "128552",
                 "128562",
                 "128578", 
                 "128525",
                 "128514",
                 "128526",
                 "129320",
                ];

function htmlify(reactType){
    return "&#" + reactType + ";"
}

//create a button reaction using the image path (a png)
// and the coordinates from the bottom left
function makeReact(reactType, left, bottom, size) {
    react = document.createElement('div');
    react.setAttribute("class","react");
    react.style.left   = left + "px";
    react.style.bottom = bottom + "px";
    react.style.cursor = "pointer";
    let emoji          = document.createElement('span');
    emoji.innerHTML    = htmlify(reactType);
    emoji.style.fontSize = "25px";
    react.appendChild(emoji);  
    react.onclick = function(){handleReact(reactType)};
    document.body.append(react);
}
//hide the small button, open the div of reactions
function openReacts() {
    // hide the react button
    document.getElementById("reactButton").style.display = "none";
    // make a bunch of reaction emojis with background images 
    document.getElementById("reactContainer").style.display = "block";
    // and stuff them in a new, larger div
    var reacts = document.getElementsByClassName("react");
    for(let i = 0; i < reacts.length; i++) {
        reacts[i].style.display = "block";
    }
}
//calls closeReacts, will be used for API interfacing in the future
function handleReact(reactType) {
    var data = {
        emotion: reactType,
        url:     window.location.href
    };
    console.log("data: ", data);
    var req = new XMLHttpRequest();
    req.open("POST","https://the-prism.herokuapp.com/react", true);
    req.setRequestHeader("Content-type","application/json");
    req.onload = function (e) {
        if (req.readystate === 4) {
            if (req.status === 200) {
                console.log(req.responseText);
            }
            else{
                console.error(req.statusText);
            }
        }
    }
    req.onerror = function (e) {
        console.error(req.statusText);
    };
    req.send(JSON.stringify(data));
    //close the react, setting the new background for the react button
    // to be the selected reaction
    closeReacts(reactType);
}
//close the set of reactions, replace smaller button with
// selected reaction, if applicable
function closeReacts(reactType) {
    if (reactType != "no-select") {
        react = document.getElementById("reactButton")
        react.style.background = "none";
        react.style.cursor = "pointer";
        span = document.getElementById("selectedEmotion");
        span.innerHTML = htmlify(reactType);
        span.style.fontSize = "30px";
        //react.background.style.display = "none";
    } 
    // hide the react container
    document.getElementById("reactContainer").style.display = "none";
    //show the react button with the new background
    document.getElementById("reactButton").style.display = "block";

    var reacts = document.getElementsByClassName("react");
    for(let i = 0; i < reacts.length; i++) {
        reacts[i].style.display = "none";
    }
}
//add divs to dom
var reactButton = document.createElement( 'div' );
reactButton.setAttribute("id", "reactButton");
reactButton.style.background = "url(" + chrome.extension.getURL("images/badPrismLogo.png") + ")";
reactButton.cursor = "pointer";
span = document.createElement('span');
span.setAttribute("id", "selectedEmotion");
reactButton.appendChild(span);
reactButton.onclick = function(){openReacts()};

var reactContainer = document.createElement( 'div' );
reactContainer.setAttribute("id","reactContainer");
reactContainer.style.display = "none";
reactContainer.onclick = function(){closeReacts("no-select")};

document.body.appendChild(reactButton);
document.body.appendChild(reactContainer);

// set the possible reactions up with image paths and coordinates
for (const i of Array(3).keys() ){
    for (const j of Array(3).keys()){
        makeReact(emotions[j * 3 + i], 35 + i * 33 , 35 + j * 33, 40);
    }
}