// script used by popup.html, which is opened on extension activation from
// extension bar

// let changeColor = document.getElementById('changeColor');

// make the previously gray button green by getting the 'color' attribute
// from our chrome storage
// chrome.storage.sync.get('color', function(data) {
//     changeColor.style.backgroundColor = data.color;
//     changeColor.setAttribute('value', data.color);
// });

// add an onlick event to the button which turns the background color of the page
// to the same color as the button
// changeColor.onclick = function(element) {
//     let color = element.target.value;
//     // query gets all tabs that have the specified properties and runs this
//     // anonymous function on them
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         // inject the following javascript code into the current page
//         chrome.tabs.executeScript(
//             tabs[0].id,
//             {code: 'document.body.style.backgroundColor = "' + color + '";'});
//     });
// };
