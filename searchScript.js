// this will be generated using database requests eventually, but is hardcoded


// for the purposes of this mvp TODO add database functionality!
var image_paths = ["images/like.png","images/love.png","images/laugh.png"];

//get array of search result divs
var resultDivs = document.getElementsByClassName("g");

//takes the div containing a search result link and scrapes the link
// from it
function getLink(div) {
    var children = div.children;
    var index = 0;
    for(let i = 0; i < children.length; i++) {
        if(children[i].tagName === "DIV") {
            index = i;
            break;
        }
    }
    children = children[index].children;
    for(let i = 0; i < children.length; i++) {
        if(children[i].tagName === "a"){
            return;
        }
        if(children[i].tagName === "DIV") {
            index = i;
            break;
        }
    }
    children = children[index].children
    for (let i=0; i < children.length; i++) {
        if(children[i].tagName = "A") {
            console.log(children[i].getAttribute("href"));
            return(children[i].getAttribute("href"));
        }
    }

}
//send a POST request to the server, asking for three image paths
// and maybe other data in the future.
var getReactsFunc = function(url)
{
    var xhr = new XMLHttpRequest();
    console.log("Right here team!");

    xhr.open("POST","https://f2f5b818f0d0.ngrok.io/getReacts", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.onreadystatechange = function (e) {
        console.log("Ready state changed.");
        console.log("Ready state is "+xhr.readyState);
        if (xhr.readyState == 4) {
            console.log("Ready state is 4!");
            if (xhr.status === 200) {
                console.log("Successfully received response.");
                console.log("Response:");
                console.log(xhr.responseText);
            }
            else{
                console.log("Something broke.")
                console.error(xhr.statusText);
            }
        }
    }
    // req.onerror = function (e) {
    //     console.error(req.statusText);
    // };
    console.log("about to send request");
    xhr.send(JSON.stringify({ data: "cool"})); 
}


// for each result div, make a corresponding area to put emojis
// if it is a regular result type
for (let div of resultDivs) {
    if(div.classList.length == 1){
        //  react data (image paths) for each page
        //get links to each google result page
        var url = getLink(div);
        getReactsFunc(url);

        //make the corresponding emojis
        makeEmojis(image_paths,div);
    }
}

// make a div that contains 1-3 image parameters (string paths) specified as arguments
// note - if less than three are provided, only those provided should be used.
// otherwise, the first three images will be used
// IMAGE GETTING IS STILL TODO, ALSO NEED TO HANDLE LESS INPUT
function makeEmojis(paths, emojiArea) {
    emojiArea.setAttribute('class',"g emojiArea");

    for (let i = 0; i < 3; i++) {
        var emoji = document.createElement("div");
        emoji.style.backgroundImage = "url(" + chrome.runtime.getURL(paths[i]) + ")";
        emojiArea.appendChild(emoji);
        emoji.setAttribute('class',"emoji num"+(i+1));
	    emoji.style.zIndex = "0";
    }
}