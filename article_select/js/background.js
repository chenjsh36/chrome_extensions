/**
 * 和 Conten_script 沟通
 */
function sendMessageToCurrentTab() {
    var args = Array.prototype.slice.call(arguments);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        args.unshift(tabs[0].id); // Add Tab ID to be the new First argument
        console.log('args:', args);
        chrome.tabs.sendMessage.apply(this, args);
    })
}

console.log('background');

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     console.log('background message:', message, sender, sendResponse);
//     if (message === '选择正文') {
//         sendResponse('hellofrombackground');
//     }
// })
// 


chrome.browserAction.onClicked.addListener(function() {
    chrome.app.window.create('main.html', {
        id: 'default'
    })
    sendMessageToCurrentTab('切换界面', function(response) {
        $message.text(response);
    });
})