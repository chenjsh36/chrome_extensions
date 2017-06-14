/*! Copyright 2009-2016 Evernote Corporation. All rights reserved. */
function HtmlSerializer(){"use strict";function a(a,b){if(b=b.toLowerCase(),b.match(/^on/i))return!1;if(b.match(/^data-/i))return!1;if(pa.indexOf(b)>-1)return!1;switch(a){case"a":return ta.indexOf(b)>-1||sa.indexOf(b)>-1||["charset","coords","href","hreflang","name","rel","rev","shape","target","type"].indexOf(b)>-1;case"abbr":return ta.indexOf(b)>-1;case"acronym":return ta.indexOf(b)>-1;case"address":return ta.indexOf(b)>-1;case"area":return ta.indexOf(b)>-1||sa.indexOf(b)>-1||["alt","coords","href","nohref","shape","target"].indexOf(b)>-1;case"b":return ta.indexOf(b)>-1;case"bdo":return qa.indexOf(b)>-1||["dir","lang"].indexOf(b)>-1;case"big":return ta.indexOf(b)>-1;case"blockquote":return ta.indexOf(b)>-1||["cite"].indexOf(b)>-1;case"br":return qa.indexOf(b)>-1||["clear"].indexOf(b)>-1;case"caption":return ta.indexOf(b)>-1||["align"].indexOf(b)>-1;case"center":return ta.indexOf(b)>-1;case"cite":return ta.indexOf(b)>-1;case"code":return ta.indexOf(b)>-1;case"col":return ta.indexOf(b)>-1||ua.indexOf(b)>-1||["span","valign","width"].indexOf(b)>-1;case"colgroup":return ta.indexOf(b)>-1||ua.indexOf(b)>-1||["valign"].indexOf(b)>-1;case"dd":return ta.indexOf(b)>-1;case"del":return ta.indexOf(b)>-1||["cite","datetime"].indexOf(b)>-1;case"dfn":return ta.indexOf(b)>-1;case"div":return["evernote_attachment_url","evernote_attachment_name","evernote_attachment_mime"].indexOf(b)>-1||(ta.indexOf(b)>-1||["align"].indexOf(b)>-1);case"dl":return ta.indexOf(b)>-1||["compact"].indexOf(b)>-1;case"dt":return ta.indexOf(b)>-1;case"em":return ta.indexOf(b)>-1;case"font":return qa.indexOf(b)>-1||ra.indexOf(b)>-1||["color","face","size"].indexOf(b)>-1;case"h1":return ta.indexOf(b)>-1||["align"].indexOf(b)>-1;case"h2":return ta.indexOf(b)>-1||["align"].indexOf(b)>-1;case"h3":return ta.indexOf(b)>-1||["align"].indexOf(b)>-1;case"h4":return ta.indexOf(b)>-1||["align"].indexOf(b)>-1;case"h5":return ta.indexOf(b)>-1||["align"].indexOf(b)>-1;case"h6":return ta.indexOf(b)>-1||["align"].indexOf(b)>-1;case"hr":return ta.indexOf(b)>-1||["align","noshade","size","width"].indexOf(b)>-1;case"i":return ta.indexOf(b)>-1;case"img":return ta.indexOf(b)>-1||["align","alt","border","height","hspace","ismap","longdesc","name","src","usemap","vspace","width"].indexOf(b)>-1;case"ins":return ta.indexOf(b)>-1||["cite","datetime"].indexOf(b)>-1;case"kbd":return ta.indexOf(b)>-1;case"li":return ta.indexOf(b)>-1||["type","value"].indexOf(b)>-1;case"map":return ra.indexOf(b)>-1||["name","title"].indexOf(b)>-1;case"ol":return ta.indexOf(b)>-1||["compact","start","type"].indexOf(b)>-1;case"p":return ta.indexOf(b)>-1||["align"].indexOf(b)>-1;case"pre":return ta.indexOf(b)>-1||["width"].indexOf(b)>-1;case"q":return ta.indexOf(b)>-1||["cite"].indexOf(b)>-1;case"s":return ta.indexOf(b)>-1;case"samp":return ta.indexOf(b)>-1;case"small":return ta.indexOf(b)>-1;case"span":return ta.indexOf(b)>-1;case"strike":return ta.indexOf(b)>-1;case"strong":return ta.indexOf(b)>-1;case"sub":return ta.indexOf(b)>-1;case"sup":return ta.indexOf(b)>-1;case"table":return ta.indexOf(b)>-1||["align","bgcolor","border","cellpadding","cellspacing","summary","width"].indexOf(b)>-1;case"tbody":return ta.indexOf(b)>-1||ua.indexOf(b)>-1||["valign"].indexOf(b)>-1;case"td":return ta.indexOf(b)>-1||ua.indexOf(b)>-1||["abbr","bgcolor","colspan","height","nowrap","rowspan","valign","width"].indexOf(b)>-1;case"tfoot":return ta.indexOf(b)>-1||ua.indexOf(b)>-1||["valign"].indexOf(b)>-1;case"th":return ta.indexOf(b)>-1||ua.indexOf(b)>-1||["abbr","bgcolor","colspan","height","nowrap","rowspan","valign","width"].indexOf(b)>-1;case"thead":return ta.indexOf(b)>-1||ua.indexOf(b)>-1||["valign"].indexOf(b)>-1;case"tr":return ta.indexOf(b)>-1||ua.indexOf(b)>-1||["bgcolor","valign"].indexOf(b)>-1;case"tt":return ta.indexOf(b)>-1;case"u":return ta.indexOf(b)>-1;case"ul":return ta.indexOf(b)>-1||["compact","type"].indexOf(b)>-1;case"var":return ta.indexOf(b)>-1}}function b(a){return a=a.toUpperCase(),oa.indexOf(a)==-1}function c(a){var c=a.nodeName;return c=c.toUpperCase(),"INPUT"==c&&a.type&&"image"==a.type.toLowerCase()?"img":"BODY"==c?"div":"HTML"==c?"div":"FORM"==c?"div":"LABEL"==c?"span":"FIELDSET"==c?"div":"LEGEND"==c?"span":"IFRAME"==c?"div":"EMBED"==c?"div":"CANVAS"==c?"img":"VIDEO"==c?"img":"HIGHLIGHT"==c?"span":na.indexOf(c)>-1?"div":b(c)&&ma.indexOf(c)==-1?"span":c.toLowerCase()}function d(a,b,c,d,e,f,h){ha=h,FIREFOX&&(Z=[]);try{V=f,V||(V=window),d&&$.push(d),ca?log.warn("Called serialize while blocked. Added callback but won't change base element."):(ca=!0,R=a,S=b,T=c,U=e,g())}catch(a){P(null,a)}}function e(a){var b=!1;try{b=!a.cssRules||a.ownerNode.crossOrigin}catch(a){"SecurityError"==a.name&&(b=!0)}return b}function f(a){var b=e(a);if(m(a)&&!(EDGE&&a.href&&a.href.startsWith("ms-browser-extension://"))){if(la.length>=ka)return void log.warn("Hit style cap of "+ka+" styles. Stopping.");try{if(b&&a.href)return Z.push({href:a.href,owner:a.ownerNode}),Y++,la.push(a.href),W.push(a.href),void Browser.sendToExtension({name:"main_getTextResource",href:a.href});var c=a.cssRules,d=null;if(a.ownerNode&&a.ownerNode.dataset&&a.ownerNode.dataset.evernoteOriginatingUrl){var f=/(.+)\//.exec(a.ownerNode.dataset.evernoteOriginatingUrl);f&&(d=f[1])}for(var g=0;g<c.length;g++)if(c[g].type==CSSRule.IMPORT_RULE){if(!c[g].styleSheet)continue;var h=c[g].styleSheet.href;if(/^https?:\/\//.test(c[g].href)||/^\/\//.test(c[g].href)||d&&(h="/"===c[g].href[0]?d+c[g].href:d+"/"+c[g].href),la.indexOf(h)!=-1)continue;Z.push({href:h,owner:a.ownerNode}),Y++,la.push(h),W.push(h),Browser.sendToExtension({name:"main_getTextResource",href:h})}else c[g].type==CSSRule.MEDIA_RULE&&m(c[g])&&Z.push(c[g]);Z.push(a)}catch(b){var i="";try{i=a.href}catch(a){}log.warn("Error in checkStyleSheet: "+b.message+", sheet href: "+i)}}}function g(){Y=0,la=[],X={},ja=document.getElementsByTagName("base")[0];for(var a=0;a<V.document.styleSheets.length;a++)f(V.document.styleSheets[a]);0==Y&&o(R)}function h(a,b,c){var d;return c=c.trim(),d=c.match(/^http/i)?c:c.match(/^\//)?a.replace(/^(.*?:\/\/[^\/]+).*$/,"$1")+c:a.replace(/^(.*\/)/,"$1")+c,d="url('"+d+"')"}function i(a,b){function c(){for(var a=[e],b=0;b<arguments.length;b++)a.push(arguments[b]);return h.apply(this,a)}var d=V.document.location.href.replace(/[^\/]+$/,""),e=b.replace(/[^\/]+$/,"");return d==e?a:(a&&(a=a.replace(/url\(["']?(.*?)["']?\)/g,c)),a)}function j(){xa||(xa=setInterval(function(){try{if(la.length>=ka)return k(),void o(R);a:for(var a=0;a<wa.length;a++)for(var b=wa[a][0],c=wa[a][1],d=0;d<V.document.styleSheets.length;d++){var e=V.document.styleSheets[d];if(e.ownerNode===b){Z[c]=e,f(V.document.styleSheets[d]),wa.splice(a,1),Y--;break a}}0==Y&&(k(),o(R))}catch(a){P(null,a)}},100))}function k(){xa&&(clearInterval(xa),xa=0)}function l(a,b,c){try{var d=W.indexOf(a.href);if(d==-1){if(W.length)return}else W.splice(d,1);for(var e=0;e<Z.length;e++){var f=Z[e];if(f.href===a.href){var g=i(a.responseText,f.href),h=V.document.createElement("style");h.type="text/css",h.textContent=g,h.dataset.evernoteOriginatingUrl=f.href;for(var k=[],l=0;l<V.document.styleSheets.length;l++)k.push(V.document.styleSheets[l]);return f.owner&&f.owner.parentNode&&f.owner.parentNode!==V.document?f.owner.parentNode.insertBefore(h,f.owner):V.document.head.appendChild(h),_.push(h),wa.push([h,e]),void j()}}}catch(a){P(null,a)}}function m(a){try{if(a.media&&a.media.length){for(var b=0;b<a.media.length;b++){var c=a.media[b].toLowerCase(),d=c.match(/\bscreen\b/i),e=c.match(/\ball\b/i),f=c.match(/\ball and\b/i);if(d||e&&(!EDGE||!f))return!0}return!1}}catch(a){log.log("Skipping stylesheet media check: "+a.message)}return!0}function n(){da=[],ea=[];for(var a=0;a<Z.length;a++){var b=Z[a];if(b.cssRules)for(var c=0;c<b.cssRules.length;c++){var d=b.cssRules[c];if(d.selectorText){if(d.selectorText.indexOf("::-")!==-1)continue;if(d.selectorText.match(/(:?:before)|(:?:after)/)&&da.push(d),!fa||!V.getMatchedCSSRules){var e=[];try{var e=V.document.querySelectorAll(d.selectorText)}catch(a){log.warn("Error in querySelectorAll: "+a.message+", selector: "+d.selectorText);continue}for(var f=0;f<e.length;f++){e[f].dataset||(e[f].dataset={}),e[f].classList.contains("js-evernote-checked")||(e[f].dataset.evernoteId=ga++,e[f].classList.add("js-evernote-checked"));for(var g=e[f].dataset.evernoteId-0;g>=ea.length;)ea.push([]);ea[g].push(d)}}}}}}function o(a){setTimeout(function(){try{n(),ba=[],ba.push({element:a,string:"",i:0,after:null}),v()}catch(a){P(null,a)}},300)}function p(a){return GlobalUtils.escapeXML(a)}function q(a){return"string"==typeof a.id&&"movie_player"==a.id&&V.document.location.href.match(/v=(.*?)(&|$)/)}function r(a){if(q(a)){var b=V.document.location.href.match(/v=(.*?)(&|$)/)[1];return'<a href="'+GlobalUtils.escapeXML(V.document.location.href)+'" target="_blank"><img src="http://img.youtube.com/vi/'+b+'/0.jpg"></img></a>'}return""}function s(a){try{if("application/x-shockwave-flash"===a.getAttribute("type")&&a.getAttribute("flashvars")){var b=/iurlsd=(.+?)(&|$)/.exec(a.getAttribute("flashvars"));if(b||(b=/iurl=(.+?)(&|$)/.exec(a.getAttribute("flashvars"))),b&&(a.style.backgroundImage="url("+decodeURIComponent(b[1])+")",a.style.backgroundPosition="50%",a.style.backgroundRepeat="no-repeat"),b=/video_id=(.+?)(&|$)/.exec(a.getAttribute("flashvars"))){var c=document.createElement("a");c.href="https://www.youtube.com/watch?v="+b[1],c.target="_blank",c.style.display="block",c.style.width="100%",c.style.height="100%",a.appendChild(c)}}}catch(a){log.warn("problem with adding pic to embedded youtube video")}}function t(a){if("iframe"!=a.nodeName.toLowerCase())return null;var b="";if(a.dataset&&a.dataset.en_id&&U&&U[a.dataset.en_id]){b=U[a.dataset.en_id];var c=H(a);a.width&&(c.map.width={value:a.width+"px"}),a.height&&(c.map.height={value:a.height+"px"}),c.map.position&&"static"!==c.map.position.value||(c.map.position={value:"relative"});var d="";for(var e in c.map)d+=e+":"+c.map[e].value+";";d=d?' style="'+Q(d)+'"':"";var f="<div"+d+">"+b+"</div>";return f}return null}function u(a){if(a.parentNode&&a!=R){var b=a.parentNode.nodeName;if(b=b.toLowerCase(),"dl"==b){var d=c(a);if("dd"!=d&&"dt"!=d)return!1}}return!0}function v(){if(aa++,aa%500==0)return void setTimeout(function(){try{v()}catch(a){P(null,a)}},25);var d=ba[ba.length-1];if(d||P(""),0==d.i){if(!b(c(d.element)))return ba.pop(),void v();if(!u(d.element))return log.warn('discarding invalid DL child "'+d.element.nodeName+'"'),ba.pop(),void v();if(S&&d.element!=S.commonAncestorContainer&&!S.intersectsNode(d.element))return ba.pop(),void v();if(S&&d.element===S.endContainer&&0===S.endOffset)return ba.pop(),void v();if(["evernoteClipperResult","evernoteAuthTools","evernoteFilingTools","evernoteGlobalTools","evernoteUserTools","evernoteShareTools","evernoteEmailSharing","evernoteOptionsPage","evernoteClearlyArticle"].indexOf(d.element.id)>-1)return ba.pop(),void v();var e=r(d.element);if(e)return d.string+=e,ba.pop(),void(ba.length?(ba[ba.length-1].string=d.string,v()):P(d.string));var f=t(d.element);if(f)return d.string+=f,ba.pop(),void(ba.length?(ba[ba.length-1].string=d.string,v()):P(d.string));var g={};if(T&&(s(d.element),g="HIGHLIGHT"===d.element.nodeName?{style:' style="x-evernote:highlighted;background-color:#F6EE96;"'}:H(d.element),g.after&&(d.after=g.after)),g.map&&g.map.display&&"none"==g.map.display.value)return ba.pop(),void v();var h=c(d.element);if(d.string+="<"+h,A(d.element),"CANVAS"==d.element.nodeName)try{d.string+=' src="'+d.element.toDataURL()+'"'}catch(a){}else"VIDEO"==d.element.nodeName&&d.element.poster&&(d.string+=' src="'+GlobalUtils.escapeXML(d.element.poster)+'"');if(d.element.attributes&&d.element.attributes.length)for(d.i=0;d.i<d.element.attributes.length;d.i++)!a(h,d.element.attributes[d.i].name)||"VIDEO"==d.element.nodeName&&"src"==d.element.attributes[d.i].name||(d.string+=" "+L(d.element,d.element.attributes[d.i]));T&&"map"!=h?d.string+=g.style:"HIGHLIGHT"==d.element.nodeName&&(d.string+=' style="x-evernote:highlighted;background-color:#F6EE96;"'),d.string+=">",T&&g.before&&(d.string+=g.before),d.i=0}for(;d.i<d.element.childNodes.length;)if(d.element.childNodes[d.i].nodeType==Node.TEXT_NODE){var i;i=S&&d.element.childNodes[d.i]===S.startContainer?p(d.element.childNodes[d.i].textContent.substr(S.startOffset)):S&&d.element.childNodes[d.i]===S.endContainer?p(d.element.childNodes[d.i].textContent.substr(0,S.endOffset)):S&&!S.intersectsNode(d.element.childNodes[d.i])?"":p(d.element.childNodes[d.i].textContent),d.string+=i,d.i++}else{if(d.element.childNodes[d.i].nodeType==Node.ELEMENT_NODE&&w(d.element))return ba.push({element:d.element.childNodes[d.i],string:d.string,i:0,after:null}),d.i++,void v();d.i++}T&&d.after&&(d.string+=d.after),d.string+="</"+c(d.element)+">",ba.pop(),ba.length?(ba[ba.length-1].string=d.string,v()):P(d.string)}function w(a){return"VIDEO"!=a.nodeName}function x(a){if(a["background-position"]&&a["background-repeat"]&&"0px 50%"==a["background-position"].trim()&&"initial initial"==a["background-repeat"].trim()){for(var b in a)b.match(/background/)&&delete a[b];a.background="0"}}function y(a){for(var b={},c=a.split(/;(?!.[^\(]+?\))\s*/),d=0;d<c.length;d++)if(c[d]=c[d].trim(),c[d]){var e=c[d].indexOf(":"),f=c[d].substr(0,e).trim(),g=c[d].substr(e+1).trim();if(f&&g){for(var h=new RegExp("(url\\(.+?\\))","g"),i=h.exec(g),j=g;i;){var k=i[1],l=k;/url\(.+?(data:.+?;.+?,.+?)\)/.test(l)&&(l="url("+/url\(.+?(data:.+?;.+?,.+?)\)/.exec(l)[1]+")"),/url\(\/\/(.+?)\)/.test(l)&&(l="url(http://"+/url\(\/\/(.+?)\)/.exec(l)[1]+")"),/url\((.+?)\)/.test(l)&&(l="url("+GlobalUtils.escapeXML(GlobalUtils.unescapeXML(/url\((.+?)\)/.exec(l)[1]))+")"),j=j.replace(k,l),i=h.exec(g)}g=j,b[f.toLowerCase()]=g}}return x(b),b}function z(a){var b={};if(a.style.cssText){var c;if(EDGE){if(!a.savedCssObj){var d=y(a.style.cssText);a.savedCssObj=d}c=a.savedCssObj}else{if(!a.style.savedCssObj){var d=y(a.style.cssText);a.style.savedCssObj=d}c=a.style.savedCssObj}for(var e in c)b[e]=c[e]}return b}function A(a){"img"==a.nodeName.toLowerCase()&&(a.attributes.width||a.setAttribute("width",a.width),a.attributes.height||a.setAttribute("height",a.height))}function B(a){a.style&&(a.hasAttribute("background")&&(a.style.backgroundImage="url("+a.getAttribute("background")+")"),a.hasAttribute("bgcolor")&&(a.style.backgroundColor=a.getAttribute("bgcolor")),a.hasAttribute("text")&&(a.style.color=a.getAttribute("text")))}function C(a){var b={ids:{regex:/#[_A-Z]+[_A-Z0-9-]+/gi,count:0},classes:{regex:/\.[_A-Z]+[_A-Z0-9-]+/gi,count:0},attrs:{regex:/\[.*?\]/g,count:0},pseudos:{regex:/:+[_A-Z]+[_A-Z0-9-]+/gi,count:0},pseudoEls:{regex:/:+(first-line|first-letter|before|after)/gi,count:0},types:{regex:/(^|\s)[A-Z]+/gi,count:0}};for(var c in b)for(var d=b[c].regex;d.exec(a);)b[c].count++;b.pseudoClasses={},b.pseudoClasses.count=b.pseudos.count-b.pseudoEls.count;var e=b.ids.count,f=b.classes.count+b.attrs.count+b.pseudoClasses.count,g=b.types.count+b.pseudoEls.count,h=256*e*256+256*f+g;return h}function D(a){var b=[],c=0,d=0,e="",f=0;for(d=0;d<a.length;d++)e?a[d]==e&&(e=""):"'"==a[d]||'"'==a[d]?e=a[d]:"("==a[d]?f++:")"==a[d]?f--:","==a[d]&&0==f&&(b.push(a.substring(c,d).trim()),c=d+1);return b.push(a.substr(c).trim()),b}function E(a){return!!ya[a.toLowerCase()]}function F(a,b){var c=a.nodeName.toLowerCase();"table"!=c&&"caption"!=c||"CSS1Compat"==V.document.compatMode&&(b["font-size"]={value:"inherit",score:0},b["font-weight"]={value:"inherit",score:0},b["font-style"]={value:"inherit",score:0},b["font-variant"]={value:"inherit",score:0})}function G(a,b,c){var d={padding:{delete:["padding-top","padding-bottom","padding-left","padding-right"]},margin:{delete:["margin-top","margin-bottom","margin-left","margin-right"]},background:{delete:["background-color","background-position","background-size","background-repeat","background-origin","background-clip","background-attachment","background-image"],further:["background-position","background-repeat"]},"background-position":{delete:["background-position-x","background-position-y"]},"background-repeat":{delete:["background-repeat-x","background-repeat-y"]},border:{delete:["border-width","border-style","border-color"],further:["border-top","border-right","border-bottom","border-left"]},"border-top":{delete:["border-top-width","border-top-style","border-top-color"]},"border-right":{delete:["border-right-width","border-right-style","border-right-color"]},"border-bottom":{delete:["border-bottom-width","border-bottom-style","border-bottom-color"]},"border-left":{delete:["border-left-width","border-left-style","border-left-color"]}};if(d[a]){for(var e in d[a].delete)c[d[a].delete[e]]&&b>=c[d[a].delete[e]].score&&delete c[d[a].delete[e]];for(var e in d[a].further)c[d[a].further[e]]&&G(d[a].further[e],c[d[a].further[e]].score,c)}}function H(a,b,c){B(a);var d="",e=null,f={},g={};a.attributes&&a.attributes.style&&(e=y(a.attributes.style.value));var i={};F(a,i);var j;if(j=fa&&V.getMatchedCSSRules?V.getMatchedCSSRules(a):a.dataset&&a.classList.contains("js-evernote-checked")?ea[a.dataset.evernoteId]:[],j&&j.length)for(var k=0;k<j.length;k++){var l=j[k].parentRule&&j[k].parentRule.media;if(!l||window.matchMedia(j[k].parentRule.media.mediaText).matches){var m=0,n=!1;j[k].selectorText.match(/:visited/i)&&(n=!0);for(var o=D(j[k].selectorText),p=0;p<o.length;p++)if(o[p].indexOf("::-")===-1){var q;try{q=EDGE?a.msMatchesSelector(o[p]):a.matches(o[p])}catch(a){log.log("Couldn't match against selector "+o[p]+" in: "+j[k].selectorText+" because of "+a.message)}if(q){n=!1;var r=C(o[p]);r>=m&&(m=r)}}if(n)continue;var s=z(j[k]);if(s["counter-reset"]){var t=s["counter-reset"].split(/\s+/);if(t.length>0)for(var u=0;u<t.length;)/^\d+$/.test(t[u+1])?(X[t[u]]=parseInt(t[u+1]),u+=2):X[t[u++]]=0}if(s["counter-increment"]){var v=s["counter-increment"].split(/\s+/);if(v.length>0)for(var w=0;w<v.length;)X[v[w]]||(X[v[w]]=0),/^\d+$/.test(v[w+1])?(X[v[w]]+=parseInt(v[w+1]),w+=2):X[v[w++]]++}for(var x in s){var A=x.replace(/^-/,"").replace(/-[a-z]/g,function(a){return a[1].toUpperCase()});if(j[k].style[A]&&"counterIncrement"!==A&&"counterReset"!==A){var H=0;i[x]&&(H=i[x].score);var L=m;s[x].match(/!important\s*$/i)&&(L+=16777216,s[x]=s[x].replace(/\s*!important\s*$/i,"")),L>=H&&(G(x,L,i),i[x]={value:s[x],score:L})}}}}for(var k=0;k<da.length;k++){var M,N=da[k];if(a.matches)try{M=a.matches(N.selectorText.replace(/(:?:before)|(:?:after)/g,""))}catch(a){}if(M){var O=!1,P=!1;N.selectorText.match(/:?:before/)&&(O=!0),N.selectorText.match(/:?:after/)&&(P=!0);for(var x in i)O&&E(x)&&(f[x]=i[x].value),P&&E(x)&&(g[x]=i[x].value);var S=z(N);for(var x in S)O&&(f[x]=S[x]),P&&(g[x]=S[x])}}for(var T=[f,g],U=0;U<T.length;U++){var W=T[U],Y="",Z="",$=0;if(W["counter-reset"])for(var t=W["counter-reset"].split(/\s+/),u=0;u<t.length;)/^\d+$/.test(t[u+1])?(X[t[u]]=parseInt(t[u+1]),u+=2):X[t[u++]]=0;if(W["counter-increment"])for(var v=W["counter-increment"].split(/\s+/),w=0;w<v.length;)X[v[w]]||(X[v[w]]=0),/^\d+$/.test(v[w+1])?(X[v[w]]+=parseInt(v[w+1]),w+=2):X[v[w++]]++;for(var p in W){if("content"==p){var Z=W[p];if(Z=Z.trim(),Z=Z.replace(/\s+!important$/,""),"none"==Z&&(Z='""'),Z.match(/^'/)?Z=Z.replace(/^'(.*?)'.*/,"$1"):Z.match(/^"/)&&(Z=Z.replace(/^"(.*?)".*/,"$1")),Z.match(/^url\((.*)\)/)){var _=Z.match(/^url\((.*)\)/)[1];Z="<img src='"+_+"'></img>"}else if(Z.match(/^\s*counter\(.*?\)/)){var aa=Z.match(/^\s*counter\((.*?)\)/)[1].split(",")[0];"number"==typeof X[aa]&&(Z=GlobalUtils.escapeXML(""+X[aa]))}else if(Z.match(/^\s*attr\((.*?)\)/)){var ba=Z.match(/^\s*attr\((.*?)\)/)[1];Z=a.getAttribute(ba)?GlobalUtils.escapeXML(""+a.getAttribute(ba)):""}else Z.match(/^\s*-webkit-image-set\(.+\)/)?(Y+="background:"+Z+";",Z=""):Z=GlobalUtils.escapeXML(Z)}else"counter-reset"!==p&&"counter-increment"!==p&&(Y+=p+":"+GlobalUtils.escapeXML(GlobalUtils.unescapeXML(W[p]))+";");$++}$&&(Y='<span style="'+Y+'">'+Z+"</span>",0==U?f=Y:g=Y)}if("string"!=typeof f&&(f=null),"string"!=typeof g&&(g=null),I(a,i),J(i),e){var ca=/url\(['"]?(.*?)['"]?\)/i;for(var x in e){if(ca.test(e[x])){var ga=ca.exec(e[x])[1],ia=V.document.location.href;ja&&ja.href&&(ia=ja.href);var ka=h(ia,M,ga);e[x]=e[x].replace('url("'+ga+'")',ka).replace("url('"+ga+"')",ka).replace("url("+ga+")",ka)}i[x]={value:e[x]}}}if(a==R&&(b=va),b)for(var k=0;k<b.length;k++)i[b[k]]&&delete i[b[k]];var la=Object.keys(i);la.sort(function(a,b){var c=i[a],d=i[b];return c.score>d.score});var ma={H1:["height"]};ma.H2=ma.H1,ma.H3=ma.H1,ma.H4=ma.H1,ma.H5=ma.H1,ma.H6=ma.H1,ha&&ha.isOutlookMail&&K(i);for(var k in la)ma[a.tagName]&&ma[a.tagName].indexOf(la[k])>-1||i[la[k]]&&(d+=la[k]+":"+i[la[k]].value+";");return d=d?' style="'+Q(d)+'"':"",{style:d,before:f,after:g,map:i}}function I(a,b){if(b.height&&b.height.value.match(/%$/)){var c=b.height.value;try{if("fixed"!=V.getComputedStyle(a).position){var d=V.getComputedStyle(a.parentNode).height;d||(c="auto")}}catch(a){}b.height.value=c}}function J(a){for(var b=["-webkit-user-select","-moz-user-select","-ms-user-select","user-select","-webkit-user-modify","-moz-user-modify","-ms-user-modify","user-modify"],c=0;c<b;c++)a[b[c]]&&delete a[b[c]]}function K(a){var b={position:{from:"absolute",to:"static"},overflow:{from:"hidden",to:"visible"},"overflow-x":{from:"hidden",to:"visible"},"overflow-y":{from:"hidden",to:"visible"}};for(var c in b)a[c]&&a[c].value==b[c].from&&(a[c].value=b[c].to);a.right&&"0px"===a.right.value&&delete a.right}function L(a,b){var c=null;if("href"==b.name.toLowerCase()){try{var d=a.href.animVal?a.href.animVal:a.href;d&&d.match(/^javascript/i)?d="#":/^https?:\/\//.test(d)||(d=a.baseURI+d)}catch(b){log.warn("Error in transformAttribute, "+b.message),d=a.baseURI}c=Q(d)}else if("src"==b.name.toLowerCase()){var e=a.src;""==b.value.trim()&&(e=""),e&&e.match(/^javascript/i)&&(e="#"),e=M(a,e),c=Q(e)}return null===c&&(c=Q(b.value.replace(/\u000A/g,""))),b.name+'="'+c+'"'}function M(a,b,c){if(!a)return b;var d=V||window;if("IMG"!=a.nodeName||!/^https?:\/\//i.test(b)||/\.gif($|\?)/i.test(b)||!a.naturalWidth&&!a.naturalHeight||SAFARI&&/Version\/(6\.2\.4\s|7\.1[\s\.]|8\.)/.test(navigator.userAgent)&&b===d.location.href)return a.naturalWidth&&a.naturalHeight?b:"";var e=/^(https?:\/\/.[^\/]+)\/?/.exec(b)[1];if(e!==d.document.location.origin)return b;var f=d.document.createElement("canvas");f.width=(c?a.naturalWidth:a.width)||1,f.height=(c?a.naturalHeight:a.height)||1,f.getContext("2d").drawImage(a,0,0,c?a.naturalWidth:a.width,c?a.naturalHeight:a.height);try{return/\.jpe?g$/.test(b)?f.toDataURL("image/jpeg"):f.toDataURL("image/png")}catch(a){return log.warn("Error getting canvas.toDataURL: "+JSON.stringify(a)),EDGE||18===a.code?b:""}finally{f=null}}function N(a){for(var b,c=1,d=0;a&&a.parentNode&&!b;){var e=getComputedStyle(a);e.minWidth.indexOf("px")!==-1?(b=parseFloat(e.minWidth),d=b*c):e.minWidth.indexOf("%")!==-1&&(c*=parseFloat(e.minWidth)/100),a=a.parentNode}return d}function O(){var a,d="",e="",f=R.parentNode;for(a=R.offsetWidth/N(f)<ia?va.concat("min-width"):va;f&&f.parentNode;){var g=H(f,a,!0).style,h=c(f);b(h)&&(d="<"+h+g+">"+d,e=e+"</"+h+">"),f=f.parentNode}return d='<div style="font-size: 16px; display: inline-block;">'+d,e+="</div>",{front:d,back:e}}function P(a,b){if(ca=!1,!b){var c={front:"",back:""};!T||ha&&ha.isEmailClip||(c=O()),a=c.front+a+c.back}for(var d=0;d<_.length;d++)_[d].parentNode.removeChild(_[d]);_=[];for(var d=0;d<$.length;d++)try{$[d](a,b)}catch(a){log.warn("Couldn't run 'serialize' callback: "+a.stack||a.trace)}$=[]}function Q(a){return a?GlobalUtils.escapeXML(a):""}var R,S,T,U,V,W=[],X={},Y=0,Z=[],$=[],_=[],aa=0,ba=[],ca=!1,da=[],ea=[],fa=!1,ga=0,ha={},ia=.8,ja=null,ka=100,la=[],ma=["A","ABBR","ACRONYM","ADDRESS","AREA","B","BDO","BIG","BLOCKQUOTE","BR","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","DD","DEL","DFN","DIV","DL","DT","EM","FONT","H1","H2","H3","H4","H5","H6","HR","I","IMG","INS","KBD","LI","MAP","OL","P","PRE","Q","S","SAMP","SMALL","SPAN","STRIKE","STRONG","SUB","SUP","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","TT","U","UL","VAR"],na=["ARTICLE","ASIDE","DETAILS","FOOTER","FIGURE","FIGCAPTION","HEADER","HGROUP","NAV","SECTION","SUMMARY"],oa=["APPLET","BASE","BASEFONT","BGSOUND","BLINK","BODY","BUTTON","DIR","EMBED","FIELDSET","FORM","FRAME","FRAMESET","HEAD","HTML","IFRAME","ILAYER","INPUT","ISINDEX","LABEL","LAYER","LEGEND","LINK","MARQUEE","MENU","META","NOEMBED","NOFRAMES","NOSCRIPT","OBJECT","OPTGROUP","OPTION","PARAM","PLAINTEXT","SCRIPT","SELECT","STYLE","TEXTAREA","TITLE","XML"],pa=["id","class","accesskey","data","dynsrc","tabindex","style"],qa=["style","title"],ra=["lang","xml:lang","dir"],sa=["accesskey","tabindex"],ta=["style","title","lang","xml:lang","dir"],ua=["align","char","charoff"],va=["border","border-bottom","border-bottom-color","border-bottom-style","border-bottom-width","border-collapse","border-color","border-left","border-left-color","border-left-style","border-left-width","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-style","border-top-width","border-width","bottom","clear","display","float","height","layout-flow","layout-grid","layout-grid-char","layout-grid-char-spacing","layout-grid-line","layout-grid-mode","layout-grid-type","left","margin","margin-bottom","margin-left","margin-right","margin-top","max-height","max-width","min-height","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","position","right","size","table-layout","top","visibility","width","z-index"];Browser.addMessageHandlers({content_textResource:l});var wa=[],xa=0,ya={"border-collapse":!0,"border-spacing":!0,"caption-side":!0,color:!0,cursor:!0,direction:!0,"empty-cells":!0,"font-family":!0,"font-size":!0,"font-style":!0,"font-variant":!0,"font-weight":!0,font:!0,"letter-spacing":!0,"line-height":!0,"list-style-image":!0,"list-style-position":!0,"list-style-type":!0,"list-style":!0,orphans:!0,quotes:!0,"text-align":!0,"text-indent":!0,"text-transform":!0,visibility:!0,"white-space":!0,widows:!0,"word-spacing":!0};this.convertImgSrcToBase64IfPossible=M,this.serialize=d,Object.preventExtensions(this)}Range.prototype.intersectsNode||(Range.prototype.intersectsNode=function(a){var b=document.createRange();return b.selectNode(a),0>this.compareBoundaryPoints(Range.END_TO_START,b)&&0<this.compareBoundaryPoints(Range.START_TO_END,b)}),Object.preventExtensions(HtmlSerializer);