//SVG logo as a string, so it can be used as the innerhtml of a div
var logoString = ' <svg id="buttonSVG" viewBox="0 0 242 242" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="Cloudsurf with Triangle Icon"> <g id="Outline"> <g id="Rectangle 7"> <rect width="242" height="241" rx="56" fill="white"/> <rect width="242" height="241" rx="56" fill="url(#paint0_linear)"/> </g> </g> <g id="Cloud"> <path id="Vector" d="M206.594 105.932H206.575C206.575 105.806 206.594 105.679 206.594 105.552C206.594 88.2425 192.081 74.1956 174.156 74.1956C171.85 74.1956 169.6 74.4312 167.444 74.8844C161.013 59.7681 145.656 49.1106 127.694 49.1106C114.213 49.1106 102.194 55.1281 94.3188 64.5169C89.0907 61.9468 83.3091 60.6054 77.4438 60.6019C58.0375 60.6019 42.1001 74.8844 40.2438 93.1725C19.1501 94.26 2.2188 110.971 1.93755 131.724C1.63755 153.329 19.5438 171.092 41.8938 171.364C43.6376 171.382 45.3251 171.273 47.0126 171.074C55.6563 188.691 74.2 200.871 95.7063 200.871C108.681 200.871 120.569 196.431 129.869 189.054C136.975 194.147 145.75 197.192 155.275 197.192C174.813 197.192 191.256 184.522 196.375 167.213C199.6 168.246 203.031 168.826 206.613 168.826C224.575 168.826 239.144 154.743 239.144 137.379C239.125 120.016 224.575 105.932 206.594 105.932Z" fill="white"/> </g> <g id="Cloud-Shadow"> <path id="Vector_2" d="M225.719 111.932C233.087 119.128 227.875 135.621 222.812 141.004C212.838 151.571 194.538 149.106 187.188 147.584C185.2 147.167 184.881 147.312 184.225 147.693C183.644 148.037 183.381 148.581 182.744 149.868C180.381 154.798 174.269 164.349 161.369 168.192C147.925 172.198 135.25 166.089 129.325 162.446C127.075 161.069 126.981 161.033 125.969 161.051C124.938 161.069 123.925 161.794 122.706 162.718C117.344 166.796 105.1 173.992 86.2188 172.941C67.7125 171.907 57.1188 160.888 53.4813 155.214C52.7875 154.127 52.0375 153.221 51.175 153.13C50.1813 153.039 49.075 154.018 48.25 154.816C40.375 162.229 15.5875 164.458 7.375 151.825C15.7375 164.784 28.6562 171.201 41.9125 171.364C43.6562 171.382 45.3438 171.273 47.0312 171.074C55.675 188.691 74.2188 200.871 95.725 200.871C108.7 200.871 120.587 196.431 129.887 189.054C136.994 194.147 145.769 197.192 155.294 197.192C174.831 197.192 191.275 184.523 196.394 167.213C199.619 168.246 203.05 168.826 206.631 168.826C224.594 168.826 239.162 154.743 239.162 137.379C239.125 128.136 234.325 117.696 225.719 111.932Z" fill="#7E98A8"/> </g> <g id="Triangle"> <g id="Polygon 2"> <path d="M126.897 87.75L123 81L119.103 87.75L90.524 137.25L86.6269 144H94.4212H151.579H159.373L155.476 137.25L126.897 87.75Z" fill="white"/> <path d="M126.897 87.75L123 81L119.103 87.75L90.524 137.25L86.6269 144H94.4212H151.579H159.373L155.476 137.25L126.897 87.75Z" fill="url(#paint1_linear)"/> <path d="M126.897 87.75L123 81L119.103 87.75L90.524 137.25L86.6269 144H94.4212H151.579H159.373L155.476 137.25L126.897 87.75Z" stroke="#7E98A8" stroke-width="9"/> </g> </g> </g> <defs> <linearGradient id="paint0_linear" x1="121" y1="0" x2="121" y2="241" gradientUnits="userSpaceOnUse"> <stop offset="0.0913884" stop-color="#B7094C"/> <stop offset="0.317708" stop-color="#892B64"/> <stop offset="0.541667" stop-color="#5C4D7D"/> <stop offset="1" stop-color="#2E6F95"/> </linearGradient> <linearGradient id="paint1_linear" x1="123" y1="90" x2="123" y2="156" gradientUnits="userSpaceOnUse"> <stop offset="0.0913884" stop-color="#B7094C"/> <stop offset="0.317708" stop-color="#892B64"/> <stop offset="0.541667" stop-color="#5C4D7D"/> <stop offset="1" stop-color="#2E6F95"/> </linearGradient> </defs> </svg>'

// getting user identifiers
var email, userid; 
chrome.storage.sync.get(['email', 'id'], function(result) {	
    email  = result.email;
    userid = result.id;
});

//unicodes corresponding to emoticons
var emotions = [ 
                 "128544",  //angry
                 "128546",  //crying
                 "128552",  //afraid
                 "128562",  //astonished
                 "128578",  //smiling
                 "128525",  //love
                 "128514",  //laugh
                 "128526",  //chill
                 "129320",  //oh?
                ];

// get unicodes ready for display in html
function htmlify(reactType){
    return "&#" + reactType + ";"
}


// function: drawScreen
// purpose:  instantiates all of the html necessary for the emotion tool
// arguments:
//          align : "left" or "right" - a user preference that allows users
//                  to describe the direction that the react container
//                  should open in
//          size  : integers that describes the scaling of the original button
//                  (in rems) -> the reacts themselves will be scaled
//                  proportionally
//           x,y  : integers - a user preference that describes how far to
//                  the right (x) and how far down up from the bottom (y) 
//                  their emotion tool appears on each page
//      emoticons : an array of emotion unicode strings corresponding to
//                  emotions that will be rendered on button click
//      rows, cols: integers - user preference that describes the numebr of
//                  rows and columns that their array of emotions has
function drawScreen(align, size, x, y, emoticons, rows, cols)
{
    reactButton  = makeReactButton(size, x, y);
    reactContain = makeReacts(align, size, x, y, emoticons, rows, cols)

    document.body.append(reactContain);
    document.body.append(reactButton);

    document.getElementById('reactButton').addEventListener('click', handleClick);
}

// function makeReactButton
// purpose: make the div and set the basic attributes of the react
//          button
// arguments: 
//          size: integer (in rem) gets assigned to width and height
//          x,y : integers (in % of screen) get assigned to left
//                  and bottom, respectively
// returns:
//          the DOM div element itself
function makeReactButton(size, x, y)
{
    //generate the react button
    var reactButton = document.createElement( 'div' );
    reactButton.setAttribute("id", "reactButton");
    reactButton.innerHTML    = logoString;
    
    //set user-specified attributers
    reactButton.style.width  = size+"rem";
    reactButton.style.height = size+"rem";
    reactButton.style.left   = x+"%";
    reactButton.style.bottom = y+"%";
    
    return reactButton;
}

// function makeReacts
// purpose: 
//          make the react container and the reacts held within it,
//          as well as any other buttons or functionality for the
//          container.
// arguments:
//          align : "left" or "right" - a user preference that allows users
//                  to describe the direction that the react container
//                  should open in
//          size  : integers that describes the scaling of the original button
//                  (in rems) -> the reacts themselves will be scaled
//                  proportionally
//           x,y  : integers - a user preference that describes how far to
//                  the right (x) and how far down up from the bottom (y) 
//                  their emotion tool appears on each page
//      emoticons : an array of emotion unicode strings corresponding to
//                  emotions that will be rendered on button click
//      rows, cols: integers - user preference that describes the numebr of
//                  rows and columns that their array of emotions has
function makeReacts(align, size, x, y, emoticons, rows, cols)
{
    // make container to hold reactions
    var reactContainer = document.createElement( 'div' );
    reactContainer.setAttribute("id", "reactContainer");
    reactContainer.style.bottom = x+"%";
    reactContainer.style.left   = y+"%";

    reactContainer.style.setProperty('--grid-rows', rows);
    reactContainer.style.setProperty('--grid-cols', cols);

    for (emote in emoticons) {
        let react = document.createElement("div");
        react.innerHTML = htmlify(emoticons[emote])
        react.style.fontSize = (size/3)+"rem";
        react.onclick = function(){handleReact(emoticons[emote])};
        reactContainer.appendChild(react).className = "grid-item reactText"
    }
    return reactContainer;
}

// handles a click on the reactButton
const handleClick = (e) => 
{
    openReacts();

    const close = (evt) => {       
        if (e !== evt) {
            closeReacts()
            document.removeEventListener('click', close)
        }
    }
    document.addEventListener('click', close)
}

// openReacts
// purpose: allow user to react to the page, TODO should set an onclick
//          to close for the rest of the body
function openReacts()
{
    document.getElementById("reactButton").style.display    = "none";
    document.getElementById("reactContainer").style.display = "grid";
}


//just actually calling drawScreen
drawScreen("left", 5, 1, 1, emotions, 3, 3);

//handle the reaction made by the user
function handleReact(reactType) 
{
    // update the value of the react button
    document.getElementById('reactButton').style.reactType = reactType  

    var data = {
        emotion: reactType,
        url:     window.location.href,
        userid:  userid
    };
    console.log("data: ", data)
    var req = new XMLHttpRequest();
    req.open("POST","https://the-prism.herokuapp.com/react", true);
    req.setRequestHeader("Content-type","application/json");
    req.onload = function (e) {
        if (req.readystate === 4) {
            if (req.status === 200) {
                console.log(req.responseText)
            }
            else{
                console.error(req.statusText)
            }
        }
    }
    req.onerror = function (e) {
        console.error(req.statusText)
    };
    req.send(JSON.stringify(data))
}

// close the set of reactions
// replace smaller button with selected reaction, if applicable
function closeReacts(reactType) {
    
    react = document.getElementById("reactButton")
    
    // hide the react container
    document.getElementById("reactContainer").style.display = "none";
    
    //show the react button with the new background
    document.getElementById("reactButton").style.display = "flex";
}
