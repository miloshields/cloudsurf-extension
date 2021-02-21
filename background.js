/*** Return the email addresses when content.js asks for it ***/
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Sending emails:", emails);
  sendResponse( {emails: emails})
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.identity.getAuthToken({interactive: false}, function(token) {
  });
  chrome.identity.getProfileUserInfo(function(result){
    email = result.email;
    console.log(email);
  });

  //chrome.storage.local.set({userid: });
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  sendResponse( {email: email})
});