//SVG logo as a string, so it can be used as the innerhtml of a div
var logoString = ' <svg width="75" height="75" viewBox="0 0 242 242" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="Cloudsurf with Triangle Icon"> <g id="Outline"> <g id="Rectangle 7"> <rect width="242" height="241" rx="56" fill="white"/> <rect width="242" height="241" rx="56" fill="url(#paint0_linear)"/> </g> </g> <g id="Cloud"> <path id="Vector" d="M206.594 105.932H206.575C206.575 105.806 206.594 105.679 206.594 105.552C206.594 88.2425 192.081 74.1956 174.156 74.1956C171.85 74.1956 169.6 74.4312 167.444 74.8844C161.013 59.7681 145.656 49.1106 127.694 49.1106C114.213 49.1106 102.194 55.1281 94.3188 64.5169C89.0907 61.9468 83.3091 60.6054 77.4438 60.6019C58.0375 60.6019 42.1001 74.8844 40.2438 93.1725C19.1501 94.26 2.2188 110.971 1.93755 131.724C1.63755 153.329 19.5438 171.092 41.8938 171.364C43.6376 171.382 45.3251 171.273 47.0126 171.074C55.6563 188.691 74.2 200.871 95.7063 200.871C108.681 200.871 120.569 196.431 129.869 189.054C136.975 194.147 145.75 197.192 155.275 197.192C174.813 197.192 191.256 184.522 196.375 167.213C199.6 168.246 203.031 168.826 206.613 168.826C224.575 168.826 239.144 154.743 239.144 137.379C239.125 120.016 224.575 105.932 206.594 105.932Z" fill="white"/> </g> <g id="Cloud-Shadow"> <path id="Vector_2" d="M225.719 111.932C233.087 119.128 227.875 135.621 222.812 141.004C212.838 151.571 194.538 149.106 187.188 147.584C185.2 147.167 184.881 147.312 184.225 147.693C183.644 148.037 183.381 148.581 182.744 149.868C180.381 154.798 174.269 164.349 161.369 168.192C147.925 172.198 135.25 166.089 129.325 162.446C127.075 161.069 126.981 161.033 125.969 161.051C124.938 161.069 123.925 161.794 122.706 162.718C117.344 166.796 105.1 173.992 86.2188 172.941C67.7125 171.907 57.1188 160.888 53.4813 155.214C52.7875 154.127 52.0375 153.221 51.175 153.13C50.1813 153.039 49.075 154.018 48.25 154.816C40.375 162.229 15.5875 164.458 7.375 151.825C15.7375 164.784 28.6562 171.201 41.9125 171.364C43.6562 171.382 45.3438 171.273 47.0312 171.074C55.675 188.691 74.2188 200.871 95.725 200.871C108.7 200.871 120.587 196.431 129.887 189.054C136.994 194.147 145.769 197.192 155.294 197.192C174.831 197.192 191.275 184.523 196.394 167.213C199.619 168.246 203.05 168.826 206.631 168.826C224.594 168.826 239.162 154.743 239.162 137.379C239.125 128.136 234.325 117.696 225.719 111.932Z" fill="#7E98A8"/> </g> <g id="Triangle"> <g id="Polygon 2"> <path d="M126.897 87.75L123 81L119.103 87.75L90.524 137.25L86.6269 144H94.4212H151.579H159.373L155.476 137.25L126.897 87.75Z" fill="white"/> <path d="M126.897 87.75L123 81L119.103 87.75L90.524 137.25L86.6269 144H94.4212H151.579H159.373L155.476 137.25L126.897 87.75Z" fill="url(#paint1_linear)"/> <path d="M126.897 87.75L123 81L119.103 87.75L90.524 137.25L86.6269 144H94.4212H151.579H159.373L155.476 137.25L126.897 87.75Z" stroke="#7E98A8" stroke-width="9"/> </g> </g> </g> <defs> <linearGradient id="paint0_linear" x1="121" y1="0" x2="121" y2="241" gradientUnits="userSpaceOnUse"> <stop offset="0.0913884" stop-color="#B7094C"/> <stop offset="0.317708" stop-color="#892B64"/> <stop offset="0.541667" stop-color="#5C4D7D"/> <stop offset="1" stop-color="#2E6F95"/> </linearGradient> <linearGradient id="paint1_linear" x1="123" y1="90" x2="123" y2="156" gradientUnits="userSpaceOnUse"> <stop offset="0.0913884" stop-color="#B7094C"/> <stop offset="0.317708" stop-color="#892B64"/> <stop offset="0.541667" stop-color="#5C4D7D"/> <stop offset="1" stop-color="#2E6F95"/> </linearGradient> </defs> </svg>'
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

var emotions = [ 
                 "128544",
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
    let emoji          = document.createElement('div');
    emoji.setAttribute("class","reactText")
    emoji.innerHTML    = htmlify(reactType);
    // emoji.style.fontSize = "25px";
    react.appendChild(emoji);  
    react.onclick = function(){handleReact(reactType)};
    document.body.append(react);
}
//hide the small button, open the div of reactions
function openReacts() {
    // hide the react button
    document.getElementById("reactButton").style.display = "none";
    // make a bunch of reaction emojis with background images 
    document.getElementById("reactContainer").style.display = "flex";
    // and stuff them in a new, larger div
    var reacts = document.getElementsByClassName("react");
    for(let i = 0; i < reacts.length; i++) {
        reacts[i].style.display = "flex";
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
        // document.getElementById("logoSVG").style.display = "none";
        react = document.getElementById("reactButton")
        react.style.background = "none";
        react.style.cursor = "pointer";
        react.style.flexDirection ="flex-end";
        span = document.getElementById("selectedEmotion");
        span.innerHTML = htmlify(reactType);
        span.style.fontSize = "30px";

        //react.background.style.display = "none";
    } 
    // hide the react container
    document.getElementById("reactContainer").style.display = "none";
    //show the react button with the new background
    document.getElementById("reactButton").style.display = "flex";

    var reacts = document.getElementsByClassName("react");
    for(let i = 0; i < reacts.length; i++) {
        reacts[i].style.display = "none";
    }
}

function drawScreen() {
    // reaction button
    var reactButton = document.createElement( 'div' );
    reactButton.setAttribute("id", "reactButton");
    reactButton.innerHTML = logoString;
    reactButton.cursor = "pointer";
    //chosen emotion will inherit dom location from button
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
}

// ideally, there are two things we get from localstorage to place all three items.
// we need to set default values for these things in localstorage 
// the first are coordinates for the bottom left of all of these items
// the second is some scale or size of each of these items

// key - "settings"
// value - "left"


chrome.storage.sync.get(['settings'], function(result) {
    if (typeof result.initiated === 'undefined') {
        console.log("Uninitiated user found!")
      } 
    else {
        console.log("Welcome back, returning user.")

    }
});

// reactButton.style.background = "url(" + chrome.extension.getURL("images/badPrismLogo.png") + ")";

drawScreen();



// set the possible reactions up with image paths and coordinates
for (const i of Array(3).keys() ){
    for (const j of Array(3).keys()){
        makeReact(emotions[j * 3 + i], 35 + i * 33 , 37 + j * 33, 40);
    }
}