/*
 * 摘取文章主体正文算法 
 * @param body 
 * @returns {正文} 
 */  
var getArticleContent = function (body) {  
    /** 
     * 行分块的大小(块大小=BLOCKS+1) 
     */  
    var BLOCKS = 0;  
    /** 
     * 判断为正文的文字骤变率 
     */  
    var CHANGE_RATE = 0.9;  
    /** 
     * 每行最小长度 
     */  
    var MIN_LENGTH = 3;

    var html = body;


    /** 
     * 去除html标签 
     * @param html 请求获得的html文本 
     * @return 纯文本 
     */  
    var devareLabel = function (html) {  
        var regEx_script = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g; // 定义script的正则表达式  
        var regEx_style = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/g; // 定义style的正则表达式  
        var regEx_html = /<(?:.|\s)*?>/g; // 定义HTML标签的正则表达式  

        html = html.replace(regEx_script, "");  
        html = html.replace(regEx_style, "");  
        html = html.replace(regEx_html, "\r\n");  
        html = html.replace(/((\r\n|\n)\s*){2,}/gi, '\r\n');
        // html = html.replace("((\r\n)|\n)[\\s\t ]*(\\1)+", "$1").replace("^((\r\n)|\n)", "");//去除空白行  
        // html = html.replace("    +| +|　+", ""); //去除空白  
        html = html.replace(/[ |\t]/g, '');
        console.log('devareLabel:', html.trim());
        return html.trim();  
    };  

    var b_html = devareLabel(html);  

    /** 
     * 将纯文本按BLOCKS分块 
     * @param text 纯文本 
     * @return 分块后的map集合,键即为块号,值为块内容 
     */  
    var splitBlock = function (text) {
        var groupMap = new Array();  
        var bais = text;  
        var br = text.split('\n');  
        var line = null,  
            blocksLine = "";  
        var theCount = 0,  
            groupCount = 0,  
            count = 0;//1.记录每次添加的行数；2.记录块号；3.记录总行数  

        for (var i = 0; i < br.length; i++) {  
            line = br[i];  
            if (line != '') {  
                if (line.length > MIN_LENGTH) {  
                    if (theCount <= BLOCKS) {  
                        blocksLine += line.trim();  
                        theCount++;  
                    }  
                    else {  
                        if (blocksLine != undefined) {  
                            groupMap[groupCount] = blocksLine;  
                            groupCount++;  
                            blocksLine = line.trim();  
                            theCount = 1;  
                        }  
                    }  
                    count++;  
                }  
            }  

        }  

        if (theCount != 0 && blocksLine != undefined) {//加上没凑齐的给给定块数的  
            groupMap[groupCount + 1] = blocksLine;  
        }  
        console.log('groupMap:', groupMap);
        return groupMap;  
    };  

    var o_html = splitBlock(b_html);  

    /** 
     * 分析每块之间变化的情况 
     * @param map 块集合 
     * @return 正文 
     */  
    var judgeBlocks = function (map) {  
        var sets = map;  
        var contentBlock = [];  
        var currentBlock = map.length; //当前行的长度  
        var lastBlock = 0; //上一行的长度  
        for (var i = 0; i < sets.length; i++) {  
            if (sets[i] != undefined) {  
                lastBlock = currentBlock;  
                currentBlock = sets[i].length;  
                var between = Math.abs(currentBlock - lastBlock) / Math.max(currentBlock, lastBlock);  

                if (between >= CHANGE_RATE) {  
                    contentBlock.push(i);  
                }  
            }  
        }  
        console.log('judgeBlocks contentBlock:', contentBlock);
        //下面是取多个峰值节点中两个节点之间内容长度最大的内容  
        var matchNode = contentBlock.length;  

        var lastContent = 0;//前一个两节点之间的内容长度  
        var context = null;//结果  
        if (matchNode > 2) {  
            for (var i = 1; i < matchNode; i++) {  
                var result = "";  
                for (var j = contentBlock[i - 1]; j < contentBlock[i]; j++) {  
                    result += map[j];  
                }  
                if (result.length > lastContent) {  
                    lastContent = result.length;
                    context = result;  
                }
            }  
        }  
        return context;  
    };  

    var articleContent = judgeBlocks(o_html);  

    return articleContent;  
};

window.getArticleContent = getArticleContent;