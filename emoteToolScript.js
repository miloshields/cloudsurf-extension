//SVG logo as a string, so it can be used as the innerhtml of a div
var logoString = '<svg id = "logoSVG" viewBox="0 0 249 202" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="Map" filter="url(#filter0_d)"> <g id="Map_2" filter="url(#filter1_d)"> <path d="M1 37.285V188.027C1 192.954 5.79485 196.323 10.2038 194.495L68.1196 167.143V0L9.44029 24.3532C6.94922 25.387 4.81378 27.1715 3.30937 29.4765C1.80497 31.7815 1.0006 34.5013 1 37.285H1ZM81.5435 167.143L162.087 195V27.8571L81.5435 0V167.143ZM233.427 0.504911L175.511 27.8571V195L234.19 170.647C236.682 169.613 238.817 167.829 240.322 165.524C241.826 163.219 242.63 160.499 242.63 157.715V6.97299C242.63 2.04576 237.836 -1.32321 233.427 0.504911Z" fill="black"/> <path d="M1 37.285V188.027C1 192.954 5.79485 196.323 10.2038 194.495L68.1196 167.143V0L9.44029 24.3532C6.94922 25.387 4.81378 27.1715 3.30937 29.4765C1.80497 31.7815 1.0006 34.5013 1 37.285H1ZM81.5435 167.143L162.087 195V27.8571L81.5435 0V167.143ZM233.427 0.504911L175.511 27.8571V195L234.19 170.647C236.682 169.613 238.817 167.829 240.322 165.524C241.826 163.219 242.63 160.499 242.63 157.715V6.97299C242.63 2.04576 237.836 -1.32321 233.427 0.504911Z" fill="url(#paint0_linear)"/> </g> </g> <defs> <filter id="filter0_d" x="1" y="0" width="247.63" height="202" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/> <feOffset dx="5" dy="6"/> <feGaussianBlur stdDeviation="0.5"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/> </filter> <filter id="filter1_d" x="0" y="0" width="243.63" height="200" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/> <feOffset dy="4"/> <feGaussianBlur stdDeviation="0.5"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/> </filter> <linearGradient id="paint0_linear" x1="121.815" y1="0" x2="121.815" y2="195" gradientUnits="userSpaceOnUse"> <stop offset="0.0913884" stop-color="#EAAC8B"/> <stop offset="0.334106" stop-color="#E56B6F"/> <stop offset="0.472802" stop-color="#B56576"/> <stop offset="0.630762" stop-color="#6D597A"/> <stop offset="0.846511" stop-color="#355070"/> </linearGradient> </defs> </svg> '
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
        document.getElementById("logoSVG").style.display = "none";
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
//add divs to dom
var reactButton = document.createElement( 'div' );
reactButton.setAttribute("id", "reactButton");
reactButton.innerHTML = logoString;
// reactButton.style.background = "url(" + chrome.extension.getURL("images/badPrismLogo.png") + ")";
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
        makeReact(emotions[j * 3 + i], 35 + i * 33 , 37 + j * 33, 40);
    }
}