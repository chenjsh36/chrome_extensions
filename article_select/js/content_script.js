console.log('content_script');

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log('message:', message, sender, sendResponse);
    // alert('content_script recive :' + message);
    sendResponse('hellofromcontent');
})