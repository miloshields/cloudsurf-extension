//code to build out the cloudsurfer options page options page

// --------this code block is just a remnant of the------
//------------chrome extension tutorial------------------
// let page = document.getElementById('buttonDiv');
// const kButtonColors = ['#3aa757','#e8453c', '#f9bb2d', '#4688f1'];
// function constructOptions(kButtonColors) {
//     for (let item of kButtonColors) {
//         let button = document.createElement('button');
//         button.style.backgroundColor = item;
//         button.addEventListener('click',function () {
//             //update storage to match selected color
//             chrome.storage.sync.set({color: item}, function() {
//                 console.log('color is ' + item);
//             })
//         });
//         page.appendChild(button);
//     }
// }
// constructOptions(kButtonColors);

// give buttons corresponding anonymous functions to store
// user customization data in their personal chrome extension
//  cloud
document.getElementById("submitChanges").onclick = function() {
    console.log("Button got clicked. Time to sync data.")
    chrome.storage.sync.set({
        rows: document.getElementById("rows").value,
        cols: document.getElementById("cols").value,
        size: document.getElementById("size").value },
			function() {
              console.log("Setting information.")
              console.log(document.getElementById("rows").value)
    });
}

document.getElementById("submitChangesDefault").onclick = function() {
    console.log("Button got clicked. Time to sync data.")
    chrome.storage.sync.set({
        rows: 3,
        cols: 3,
        size: 6 },
			function() {
              console.log("Setting information to default values.")
              console.log(document.getElementById("rows").value)
    });
}
