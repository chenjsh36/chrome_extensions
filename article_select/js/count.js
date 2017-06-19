/**
 * 方法来自陈鑫的基于行块分布函数的通用网页正文抽取
 * https://wenku.baidu.com/view/2b5c9793daef5ef7ba0d3cb5.html
 */
// 函数定义===============================================================
function getHtml() {
    return document.getElementsByTagName('html')[0];
}

function getClearText(html) {
    var regEx_script = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g; // 定义script的正则表达式  
    var regEx_style = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/g; // 定义style的正则表达式  
    var regEx_html = /<(?:.|\s)*?>/g; // 定义HTML标签的正则表达式
    var regEx_html2 = /<(?:\s|(.+?=".*")|(.))*?>/g; // 防止冒号内存在 >
    var regEx_html3 = /<(?:(.+?(=".*?")*)|\s)*?>/g; // 修复没有冒号不匹配的问题
    var regEx_together = />(\s)*?</g;
    // html = html.replace(regEx_together, '>\r\n<');
    html = html.replace(regEx_script, "");
    html = html.replace(regEx_style, "");
    html = html.replace(regEx_html3, "");
    html = html.replace("((\r\n)|\n)[\\s\t ]*(\\1)+", "$1").replace("^((\r\n)|\n)", "");//去除空白行
    // html = html.replace("    +| +|　+", ""); //去除空白  
    html = html.replace(/[ |\t]/g, '');
    return html;
}

function getLines(art) {
    return art.split('\n');
}

function getBlocks(l, k) {
    var len = l.length;
    var i = 0;
    var j = 0;
    var blocks = [];
    var tmp = 0;
    for (; i < len - k; i++) {
        tmp = 0;
        for (j = i; j < i + k - 1; j++) {
            tmp += l[j].length;
        }
        blocks.push(tmp);
    }

    return blocks;
}

function getBlocksMap(l, k) {
    var len = l.length;
    var i = 0;
    var j = 0;
    var blocks = [];
    var tmp = 0;
    for (; i < len - k; i++) {
        tmp = '';
        for (j = i; j < i + k; j++) {
            tmp += l[j] + '\n';
        }
        blocks.push(tmp);
    }

    return blocks;
}

function createDiv(width, height) {
    var dom = document.createElement('div');
    dom.style.position = 'absolute';
    dom.style.height = '' + height + 'px';
    dom.style.width = '' + width + 'px';
    dom.style['background-color'] = 'rgba(255, 255, 255, .6)';
    dom.style.border = '1px solid #333';
    dom.style.right = '30px';
    dom.style.top = '30px';
    document.body.appendChild(dom);
    return dom;
}

function initBlockDistributionChart(dom, data) {
    if (!echarts) {
        console.error('echarts is not include!');
        return;
    }
    var xData = data.map(function(item, index) {
        return index;
    });
    // console.log(xData, data);
    var chart = echarts.init(dom);
    var option = {
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        dataZoom: [{
            show: true,
            realtime: true,
            start: 0,
            end: 100
        },
        {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100
        }],
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : xData
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'行块文本长度',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: data,
                markLine: {
                    silent: true,
                    data: [{
                        yAxis: 180
                    }]
                }
            }
        ]
    };

    chart.setOption(option);
}

function getMarks(l, k) {
    var xStart = 0;
    var xEnd = l.length - 1;
    var threshold = 180; // 阈值
    var minNum = 3 * k;
    var raiseBlocks = []; // 骤升行块
    var hasFound = false;
    var yMax = -Infinity;
    var xMax = 0;
    var blocksMax = 0;
    var i, j, len;
    var area = [xStart, xEnd]; // 正文区域
    // 边界点区域寻找
    for (i = 0; i < l.length; i++) {
        // 小于最低值
        // console.log('for:', i, l[i], l[i + 1]);
        if (l[i] <= minNum) {
            // 噪点抛弃
            if (hasFound === true && i >= xStart + 1 && i <= xStart + k && l[i] <= minNum) {
                console.log('噪点抛弃:', i);
                hasFound = false;
            }
            // 骤降点
            if (hasFound === true && l[i + 1] <= minNum) {
                xEnd = i;
                raiseBlocks.push([xStart, xEnd]);
                hasFound = false;
                console.log('骤降点:', i, l[i], raiseBlocks);
            }
        }
        // 大于阈值
        if (l[i] >= threshold) {
            // 骤升点
            console.log('大于阈值:', i, l[i]);
            if (hasFound === false) {
                console.log('骤升点:', i);
                hasFound = true;
                xStart = i;
            }
        }
        // 寻找最大值的坐标
        // if (l[i] > yMax) {
        //     yMax = l[i];
        //     xMax = i;
        // }
    }

    if (hasFound === true) {
        // 此时 i === length
        xEnd = i - 1;
        raiseBlocks.push([xStart, xEnd]);
    }
    if (hasFound === false && raiseBlocks.length === 0) {
        raiseBlocks.push([xStart, xEnd]);
    }

    if (raiseBlocks.length > 1) {
        raiseBlocks.forEach(function(item, index) {
            var begin = item[0];
            var end = item[1];
            for (var i = begin; i < end; i++) {
                if (l[i] > yMax) {
                    yMax = l[i];
                    xMax = i;
                    blocksMax = index;
                }
            }
        })
    }
    // 包含行块最大值的区域
    // raiseBlocks.forEach(function(item) {
    //     if (item[0] <= xMax && item[1] >= xMax) {
    //         area = item;
    //     }
    // })
    return raiseBlocks[blocksMax];
}



function initArtDistribution() {

    // 计算出正文位置
    var html = getHtml();
    // var text = getClearText(html.innerHTML); // 文本
    var text = html.innerText;
    var lines = getLines(text); // 以换行符分割文本
    lines.forEach(function(item, index) {
        console.log('line ' + index + ' ' + item);
    })

    // 1 行块
    var blockWidth = 7; // 行块厚度

    // 2 行块长度
    var blocks = getBlocks(lines, blockWidth);
    console.log('行块数量：', blocks.length);

    var blocksMap = getBlocksMap(lines, blockWidth);
    console.log('blocksMap:', blocksMap);

    // 3 行块分布图
    $chart = createDiv(400, 300);
    initBlockDistributionChart($chart, blocks);

    // 求取骤升和骤降两个边界点
    var mark = getMarks(blocks, blockWidth);
    console.log('边界点：', mark);
    // console.log(blocksMap[mark[0]] + '\n...\n' + blocksMap[mark[1] - blockWidth]);
    for (var i = mark[0] + 1; i < mark[1] + blockWidth; i++) {
        console.log('line ' + i + lines[i]);
    }    
}
// 函数定义===============================================================
var $chart;
window.initArtDistribution = initArtDistribution;

window.hideArtDistribution = function() {
    $chart.style.display = 'none';
}
window.showArtDistribution = function() {
    $chart.style.display = 'block';
}