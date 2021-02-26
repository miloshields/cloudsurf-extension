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
