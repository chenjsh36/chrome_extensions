function setShadowBox(dom) {
    // 获取整个页面的宽高
    var winSize = {
        height: $('body').height(),
        width: $('body').width()
    };
    console.log('winSize:', winSize);
    // 获取 dom 元素的宽高 位置
    var $dom = $(dom);
    var computedStyle = window.getComputedStyle(dom, null);
    console.log('computedStyle:', computedStyle);
    var domStyle = {
        height: $dom.height(),
        width: $dom.width(),
        left: $dom.offset().left,
        top: $dom.offset().top,
        boxSizing: $dom.css('box-sizing'),
        paddingLeft: $dom.css('padding-left'),
        paddingRight: $dom.css('padding-right'),
        paddingTop: $dom.css('padding-top'),
        paddingBottom: $dom.css('padding-bottom'),
    }

    // 插入选择框
    console.log('domStyle:', domStyle);
    var $shadowBox = $('<div></div>');
    var borderWidth = [
        '' + domStyle.top + 'px', 
        '' + (winSize.width - domStyle.left - (domStyle.boxSizing === 'content-box' ? parseInt(domStyle.paddingLeft, 10) + parseInt(domStyle.paddingRight, 10) : 0) - domStyle.width) + 'px',
        '' + (winSize.height - domStyle.top - (domStyle.boxSizing === 'content-box' ? parseInt(domStyle.paddingTop, 10) + parseInt(domStyle.paddingBottom, 10) : 0) - domStyle.height) + 'px',
        '' + domStyle.left + 'px'
        ].join(' ');
    console.log('border-width:', borderWidth);
    $shadowBox.addClass('hh-shadow-box');
    $shadowBox.css({
        'height': winSize.height,
        'width': winSize.width,
        'position': 'absolute',
        'left': 0,
        'top': 0,
        'border-width': borderWidth
    })
    var $innerBox = $('<div></div>');
    $innerBox.addClass('hh-inner-box');
    $shadowBox.append($innerBox);
    $('body').append($shadowBox);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // 解析 dom 树法寻找正文内容
    var body = document.querySelector('body');
    var before = new Date();
    var artContent = getArticleContent(body);
    // artContent.style.backgroundColor = 'red';
    var after = new Date();
    console.log('after before:', after - before);
    // 设置正文边框
    setShadowBox(artContent);
    // 使用 readability: http://blog.csdn.net/wang_long_989/article/details/61921186
    // var content = getArticleContent($('body').html());
    // console.log('content:', content);

    sendResponse('hellofromcontent');
})