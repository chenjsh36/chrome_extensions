function sendMessageToCurrentTab() {
    var args = Array.prototype.slice.call(arguments);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        args.unshift(tabs[0].id); // Add Tab ID to be the new First argument
        console.log('args:', args);
        chrome.tabs.sendMessage.apply(this, args);
    })
}

document.addEventListener('DOMContentLoaded', function() {
    var $mainContent = $('#mainContent');
    console.log('DOMContentLoaded');
    $mainContent.on('click', function() {
        console.log('选择正文');
        // chrome.runtime.sendMessage('选择正文', {}, function(response) {
        //     alert(response);
        //     $mainContent.text('选择正文：' + response);
        // });
        // chrome.tabs.sendMessage('选择正文');
        sendMessageToCurrentTab('选择正文', function(response) {
            $mainContent.text('选择正文：' + response);
        });
    })
})

