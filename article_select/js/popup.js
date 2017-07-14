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


document.addEventListener('DOMContentLoaded', function() {
    var $mainContent = $('#mainContent');
    var $message = $('#message');
    $mainContent.on('click', function() {
        // chrome.runtime.sendMessage('选择正文', {}, function(response) {
        //     alert(response);
        //     $mainContent.text('选择正文：' + response);
        // });
        // chrome.tabs.sendMessage('选择正文');

        sendMessageToCurrentTab('网页正文', function(response) {
            $message.text(response);
        });

    })

    $('#dom-analysis').on('click', function(e) {
        sendMessageToCurrentTab('DOM树分析', function(response) {
            console.log(response);
        })
    })
    $('#text-analysis').on('click', function(e) {
        sendMessageToCurrentTab('文本分析', function(response) {
            console.log(response);
        })
    })
})

