//dictionary mapping reaction types to their corresponding image paths'
var typeToPath = {
    "like" : "128077", //"images/like.png",
    "love" : "128151", //"images/love.png",
    "laugh" : "129315" //images/laugh.png"
};

function htmlify(reactType){
    return "&#" + typeToPath[reactType] + ";"
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
    emoji.style.fontSize = "25px;"
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
        type: reactType,
        url: window.location.toString()
    };
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
makeReact("laugh", 15, 70, 40);
makeReact("love",  60, 70, 40);
makeReact("like", 105, 70, 40);