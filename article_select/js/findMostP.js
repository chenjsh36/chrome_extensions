/**
 * 原生 JS 实现 Dom 树分析寻找正文内容
 * @param  {dom} dom [待分析的页面 DOM 元素]
 * @return {dom}     [返回含正文内容的 DOM 元素]
 */
function getArticleContent(dom) {
    var mostP = findMostP(dom, 0);
    var mostPDom = mostP.dom;
    var mostPNum = mostP.len;

    // 寻找 mostP 中含有最多儿子元素为p的子元素
    var pTags = mostPDom.querySelectorAll('p');
    var pTagParent = null;
    var pTagsLen = pTags.length;
    var pTagMostNum = 0;
    var pTagMostDom = null;
    var i = 0;
    var tmp = 0;
    for (; i < pTagsLen; i++) {
        pTagParent = pTags[i].parentElement;
        if (pTagParent !== mostPDom) {
            tmp = getSonPNum(pTagParent);
            if (tmp > pTagMostNum) {
                pTagMostNum = tmp;
                pTagMostDom = pTagParent;
            }
        }
    }

    // 如果存在元素A 且 比较含有最多p儿子的元素A 和 含有最多p子孙的两个元素的元素B
    if (pTagMostDom && pTagMostNum >= mostPNum * .5) {
        console.log('[From findMostP] 元素 A 占据元素 B 的一大部分')
        // 元素 A 占据元素 B 的一大部分
        return getWholeArticle(pTagMostDom, mostPDom);
    } else {
        console.log('[From findMostP] 元素A只是元素B的一小部分')
        // 元素A只是元素B的一小部分
        return mostPDom;
    }
}

// 尽量缩小范围寻找含有最多子孙后代元素标签为 p 的元素
function findMostP(dom, len) {
    if (!len) {
        len = 0;
    }
    var childs = dom.children;
    var childP = null;
    var mostPNum = len;
    var mostPChild = dom;
    for (var i = 0, childLen = childs.length; i < childLen; i++) {
        childP = childs[i].getElementsByTagName('p');
        if (childP.length >= mostPNum) {
            mostPChild = childs[i];
            mostPNum = childP.length;
        }
    }
    if (mostPChild !== dom) {
        return findMostP(mostPChild, mostPNum);
    }
    return {
        dom: dom,
        len: len
    };
}

// 寻找儿子元素标签为 p 的数量
function getSonPNum(dom) {
    var childs = dom.children;
    var pNum = 0;
    var i = 0;
    var childLen = childs.length;
    for (; i < childLen; i++) {
        if (childs[i].tagName.toLocaleLowerCase() === 'p') {
            pNum++;
        }
    }
    return pNum;
}

// 向上寻找整篇文章
function getWholeArticle(dom, mostPDom) {
    var tmpDom = dom;
    while(tmpDom !== mostPDom && tmpDom.getElementsByTagName('h1').length === 0 && tmpDom.getElementsByTagName('title').length === 0) {
        tmpDom = tmpDom.parentElement;
    }
    return tmpDom;
}

window.getArticleContent = getArticleContent;