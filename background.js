// background.js
//
// This script runs in the background of the extension and both stores 
// information in chrome storage and sends information regarding
// events to content scripts running on pages that users are using.

// on install, create a user profile with email and id and store it
// in chrome storage. additionally, set size and formatting of the
// react tool to their defaults.
chrome.runtime.onInstalled.addListener(function() {
  chrome.identity.getProfileUserInfo(function(result){
      chrome.storage.sync.set({ 
        email: result.email,
				id: result.id,
        size: 6,
        rows: 3,
        cols: 3,
           },
			      function() {
              console.log("Setting information.")
              console.log("Set email to "+result.email);
              console.log("Set ID to "+result.id);
            })
  });
});


// Below is the type of code that will be needed to detect
// "soft reloads" on sites like YouTube, where the URL and
// page changes but the page doesn't actually reload. 

// // TODO send message to content script
// chrome.tabs.onUpdated.addListener(function
//   (tabId, changeInfo, tab) {
//     // read changeInfo data and do something with it (like read the url)
//     if (changeInfo.url) {
//       console.log(changeInfo.url)
//       // do something here
//       chrome.tabs.query({active: true}, function(tabs){  		  
//         chrome.tabs.sendMessage(tab.id, {url: changeInfo.url}, function(response) 
//         { 			
//           return true;
//         }); 		
//       });
//     }
//   }
// );
