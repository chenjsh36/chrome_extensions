var initArtContent;
var artContent;
var $shadowBox;
var ifShow = false;

function initShadowBox() {
    var $innerBox;
    if ($shadowBox) return;
    
    $shadowBox = $('<div></div>');
    $shadowBox.addClass('hh-shadow-box');
    
    $innerBox = $('<div></div>');
    $innerBox.addClass('hh-inner-box');
    $shadowBox.append($innerBox);
    
    $expandContract = $('<div class="hh-expand-contract"></div>');
    $expand = $('<div class="hh-expand">+</div>');
    $contract = $('<div class="hh-contract">-</div>');
    $expandContract.append($expand);
    $expandContract.append($contract);
    $shadowBox.append($expandContract);

    $shadowBox.css({display: 'none'});
    $('body').append($shadowBox);

    // 放大
    $expand.on('click', function() {
        var parent;
        if (!artContent) return;
        
        parent = artContent.parentElement;
        if (!parent) return;

        artContent = parent;
        console.log('click expand', artContent);
        setShadowBox(artContent);
    })

    // 缩小
    $contract.on('click', function() {
        var parent;
        if (!artContent) return;
        
        children = artContent.children;
        if (!children) return;

        if (artContent === initArtContent) {
            var h1 = artContent.querySelector('h1');
            if (h1) {
                artContent = h1;
            }
        } else {
            artContent = getArticleContent(artContent);
        }

        console.log('click contract', artContent);
        // artContent = children[0];
        setShadowBox(artContent);
    })
}


function setShadowBox(dom) {
    // 获取整个页面的宽高
    var winSize = {
        height: $('body').height(),
        width: $('body').width()
    };
    // 获取 dom 元素的宽高 位置
    var $dom = $(dom);
    var computedStyle = window.getComputedStyle(dom, null);
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

    // 更新选择框的样式
    var borderWidth = [
        '' + domStyle.top + 'px', 
        '' + (winSize.width - domStyle.left - (domStyle.boxSizing === 'content-box' ? parseInt(domStyle.paddingLeft, 10) + parseInt(domStyle.paddingRight, 10) : 0) - domStyle.width) + 'px',
        '' + (winSize.height - domStyle.top - (domStyle.boxSizing === 'content-box' ? parseInt(domStyle.paddingTop, 10) + parseInt(domStyle.paddingBottom, 10) : 0) - domStyle.height) + 'px',
        '' + domStyle.left + 'px'
        ].join(' ');

    if (!$shadowBox) {
        initShadowBox();
    }
    $shadowBox.css({
        'height': winSize.height,
        'width': winSize.width,
        'position': 'absolute',
        'left': 0,
        'top': 0,
        'border-width': borderWidth,
        'display': 'block'
    })
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message === '切换界面') {
        if (ifShow === false) {
            // 解析 dom 树法寻找正文内容
            var body = document.querySelector('body');
            var before = new Date();
            artContent = getArticleContent(body);
            initArtContent = artContent
            var after = new Date();
            console.log('[From Content Script]分析正文内容耗时：', after - before, ' 毫秒');

            // 设置正文边框
            setShadowBox(artContent);
            ifShow = true;

            initArtDistribution();
        } else {
            $shadowBox.hide();
            ifShow = false;

            hideArtDistribution()
        }
    }

    // chrome.app.window.create('popup.html', {
    //     id: 'default'
    // })
    sendResponse('[From Content Script] ' + message + '完毕');
})
