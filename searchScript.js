// this will be generated using database requests eventually, but is hardcoded

// for the purposes of this mvp TODO add database functionality!
var image_paths = ["images/like.png","images/love.png","images/laugh.png"];

//get array of search result divs
var resultDivs = [...document.getElementsByClassName("g")]; //convert to array
console.log(resultDivs);
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
    for (let i = 0; i < children.length; i++) {
        if(children[i].tagName = "A") {
            return(children[i].getAttribute("href"));
        }
    }

}

//send a POST request to the server, asking for three image paths
// and maybe other data in the future.
var getReactsFunc = function(url)
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST","https://the-prism.herokuapp.com/getReacts", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4) {
           if (xhr.status === 200) {
                console.log("Response:", xhr.responseText);
            }
            else{
                console.log("Something broke.")
                console.error(xhr.statusText);
            }
        }
    }
    xhr.send(JSON.stringify({ 'url': url})); 
}


// for each result div, make a corresponding area to put emojis
// if it is a regular result type
while (resultDivs.length != 0) {
    div = resultDivs.shift();
    if (div.classList.length == 1) {
        //get links to each google result page
        var url = getLink(div);

        //get react data
        getReactsFunc(url);

        //make the corresponding emojis
        makeEmojis(image_paths, div);
    }
}


// make a div that contains 1-3 image parameters (string paths) specified as arguments
// note - if less than three are provided, only those provided should be used.
// otherwise, the first three images will be used
// IMAGE GETTING IS STILL TODO, ALSO NEED TO HANDLE LESS INPUT
function makeEmojis(paths, emojiArea) {
    emojiArea.setAttribute('class',"g emojiArea");

    let emo_value = 128511;
    for (let i = 0; i < 3; i++) {
        emo_value += 1;
        var emojiDiv = document.createElement("div");
        const emoji  = document.createElement('span');
        emoji.innerHTML = "&#" + emo_value.toString() + ";";
        emojiDiv.appendChild(emoji);  
        emojiArea.appendChild(emojiDiv);
        emojiDiv.setAttribute('class', "emoji num" + ( i + 1 ));
	    emojiDiv.style.zIndex = "0";
    }
}