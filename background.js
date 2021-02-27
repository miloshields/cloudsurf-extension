// on install, create a user profile with email and id and store it in chrome storage
chrome.runtime.onInstalled.addListener(function() {
  chrome.identity.getProfileUserInfo(function(result){
      chrome.storage.sync.set({ 
        email: result.email,
				id: result.id },
			      function() {
              console.log("Setting information.")
              console.log("Set email to "+result.email);
              console.log("Set ID to "+result.id);
            })
  });
});

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
