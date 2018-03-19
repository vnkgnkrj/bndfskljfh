(function(){var R=window.$R=window.RAMJsFx=function(spec,context){return new R.fn(spec,context);};var VALID_ID='(?:[\\w_-]+)';var VALID_FILTER='\\s*\\[\\s*@?\\s*('+VALID_ID+')\\s*((!=|=~|!~|=)\\s*([\'"]?)(.*?)\\4\\s*)?\\]';var VALID_PART='([*]|'+VALID_ID+')?((?:#('+VALID_ID+'))?(?:[.]('+VALID_ID+'))?((?:\\[[^\\]]+\\])*))';var VALID_SPEC='\\s*([>+~]?)\\s*'+VALID_PART;var VALID_FULLSPEC='\\s*((?:'+VALID_SPEC+')*)\\s*(?:,?|$)';var VALID_MULTIPART='\\s*('+VALID_PART+')\\s*(?:,?|$)';var VALID_SHORTCUT=new RegExp('^\\s*(?:#('+VALID_ID+')|(<(?:.|\\s)+?>))\\s*$');var TYPE_ELEMENT=1,TYPE_COMMENT=8,TYPE_DOCUMENT=9;R.fn=function(spec,context){spec=spec!==undefined?spec:document;if(context!=undefined&&context.nodeType==undefined){throw"Selector - context must be omitted or is a DOM object";}
if(spec==null)
return this;if(spec.nodeType){this[0]=spec;this.length=1;return this;}
if(typeof spec=='string'){if(context==undefined){var match=VALID_SHORTCUT.exec(spec);if(match&&match[1]){var d=document.getElementById(match[1]);if(d){if(d.id!=match[1]){return R().find(spec);}
}
return R(d);}else if(match&&match[2]){return R(R.convertHTML(match[2]),context);}else{return R().find(spec);}
}else{return R(context).find(spec);}
}else if(spec.call!=undefined){return R(document).ready(spec);}
var elems=R.castToArray(spec);this.length=0;Array.prototype.push.apply(this,elems);this.length=elems.length;return this;};R.extend=function(target,options){if(target==undefined)throw"target is null";if(options==undefined)throw"options is null";for(var name in options){if(options[name]!=undefined){target[name]=options[name];}
}
return target;};var
oid=0,EXPAND_KEY='RANDOM3E7C2B50D64611DDB4810',storage={},EVENTS_KEY='R_EVENTS';var userAgent=navigator.userAgent;R.extend(R,{browser:{msie:document.uniqueID!=undefined,mozilla:/mozilla/i.test(userAgent)&&!/(?:compatible|webkit)/i.test(userAgent),safari:/webkit/i.test(userAgent)&&!/opera/i.test(userAgent),opera:/opera/i.test(userAgent)
},castToArray:function(elems){if(elems!=null){var len=elems.length;if(len==null||typeof elems=='string'||elems.navigator||elems.call){return[elems]
}else{var ret=[];for(var i=elems.length-1;i>=0;i--)
ret[i]=elems[i];return ret;}
}
return[];},inArray:function(e,a){for(var i=a.length-1;i>=0;i--)
if(a[i]===e)return true;return false;},merge:function(a,b){for(var i=0,j=a.length,len=b.length;i<len;i++,j++)
a[j]=b[i];return a;},map:function(elems,cb){var ret=[];for(var i=0,len=elems.length;i<len;i++){ret[i]=cb(elems[i],i);}
return ret;},grep:function(elems,cb){var ret=[];for(var i=0,len=elems.length;i<len;i++){if(cb(elems[i],i)){ret.push(elems[i]);};}
return ret;},each:function(elems,cb){for(var i=0,len=elems.length;i<len;i++)
cb(elems[i],i);},unique:function(arr){var ret=[],done={},j=0;for(var i=0,len=arr.length;i<len;i++){var id=R.data(arr[i]);if(done[id]==undefined){ret[j++]=arr[i];done[id]=1;}
}
return ret;},convertHTML:function(param,context){context=context||document;if(context.createElement=='undefined'&&context.createElement.call=='undefined'){if(context.nodeType!='undefined'){context=context.ownerDocument;}else{throw'context must be an DOM object or document'
}
}
if(typeof param=='string'){var div=context.createElement('DIV');div.innerHTML=param;return R.castToArray(div.childNodes);}else{return R.castToArray(param);}
},data:function(elem,key,data){var id=elem[EXPAND_KEY];if(id==undefined)id=elem[EXPAND_KEY]=++oid;if(storage[id]==undefined)storage[id]={};if(data!=undefined){storage[id][key]=data;}else if(key!=undefined){return storage[id][key];}else{return id;}
},removeData:function(elem,key){var id=elem[EXPAND_KEY];if(id!=undefined&&storage[id]!=undefined){if(key!=undefined){if(storage[id][key]!=undefined)
delete storage[id][key];for(var name in storage[id])return;R.removeData(elem);}else{try{delete elem[EXPAND_KEY];}catch(e){elem[EXPAND_KEY]=undefined;}
delete storage[id];}
}
},trim:function(s){return(s!=undefined&&typeof s=='string')?s.replace(/^\s+|\s+$/g,''):s;},escapeRegExp:function(s){return s&&s.replace?s.replace(/([^a-z0-9])/ig,'\\$1'):s;},escapeHtml:function(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');},unescapeHtml:function(s){return s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#039;/g,'\'').replace(/&amp;/g,'&');},escapeHtmlForDisplay:function(s){return $R.escapeHtml(s).replace(/  /g,' &nbsp;').replace(/\n/g,'<br/>');},find:function(context,fullspec){if(!(fullspec!=undefined)||typeof fullspec!='string')
throw'search() - fullspec is not defined properly'
if(!context||!(context.length!=undefined)&&(context.nodeType==undefined||!(context.nodeType==TYPE_ELEMENT||context.nodeType==TYPE_DOCUMENT))
)
throw'search() - context is not defined properly';var start=context.length!=undefined?context:[context];var ret=[];var reFS=new RegExp(VALID_FULLSPEC,'g');var liFS=0;var fs=reFS.exec(fullspec);while(fs&&fullspec.length!=liFS&&fs[0].length>0){if(fs.index!=liFS)throw('Invalid Search Full Specification: '+fullspec+' > '+fullspec.substring(fs.index));liFS=reFS.lastIndex;var spec=fs[1];var sret=R.merge([],start);var reS=new RegExp(VALID_SPEC,'g');var liS=0;var s=reS.exec(spec);while(s&&spec.length!=liS&&s[0].length>0){if(s.index!=liS)throw('Invalid Search Specification: '+spec+' > '+spec.substring(s.index));liS=reS.lastIndex;var nret=[];var tagName=(s[2]==undefined||s[2]=='')?'*':s[2].toUpperCase();for(var i=0,len=sret.length;i<len;i++){var se=sret[i];if(s[1]=='+'||s[1]=='~'){for(var e=se.nextSibling;e;e=e.nextSibling){if(e.nodeType==TYPE_ELEMENT){if(tagName=='*'||e.tagName.toUpperCase()==tagName)
nret=nret.concat(e);if(s[1]=='+')break;}
}
}else if(s[1]=='>'){if(tagName=='*'){nret=nret.concat(R.grep(se.childNodes,function(e){return e.nodeType==TYPE_ELEMENT;})
);}else{nret=nret.concat(R.grep(se.childNodes,function(e){return e.nodeType==TYPE_ELEMENT&&e.nodeName.toUpperCase()==tagName;})
);}
}else if(s[1]==''){nret=nret.concat(R.grep(se.getElementsByTagName(tagName),function(e){return e.nodeType==TYPE_ELEMENT;})
);}
}
sret=R.unique(nret);if(s[3]!=undefined&&s[3]!=''){sret=R.filter(sret,s[3]);}
s=reS.exec(spec);}
if(spec.length!=liS)throw('Invalid Search Specification (Remains): '+spec+' > '+spec.substring(liS));ret=ret.concat(sret);fs=reFS.exec(fullspec);}
if(fullspec.length!=liFS)throw('Invalid Search Full Specification (Remains): '+fullspec+' > '+fullspec.substring(liFS));ret=R.unique(ret);return ret;},filter:function(context,multipart){if(!(multipart!=undefined)||typeof multipart!='string')throw'filter() - multipart is not defined properly';if(!(context!=undefined)||typeof context!='object'||!(context.length!=undefined))throw'filter() - context is not defined properly';var ret=[];var reP=new RegExp(VALID_PART);var reMP=new RegExp(VALID_MULTIPART,'g');var liMP=0;var mp=reMP.exec(multipart);while(mp&&multipart.length!=liMP&&mp[0].length>0){if(mp.index!=liMP)throw('Invalid Multi-filter Specification: '+multipart+' > '+multipart.substring(mp.index));liMP=reMP.lastIndex;var part=mp[1];var pret=R.merge([],context);var p=reP.exec(part);if(!p){throw('Invalid Filter Specification: '+part);}
if(p[1]!=undefined&&p[1]!=''&&p[1]!='*'){var t=p[1].toUpperCase();pret=R.grep(pret,function(e){return e.tagName!=undefined&&e.tagName.toUpperCase()==t;});}
if(p[3]!=undefined&&p[3]!=''){pret=R.grep(pret,function(e){return e.id!=undefined&&e.id==p[3];});}
if(p[4]!=undefined&&p[4]!=''){pret=R.grep(pret,function(e){return R.hasClass(e,p[4]);});}
if(p[5]!=undefined&&p[5]!=''){var filter=p[5];var reF=new RegExp(VALID_FILTER,'g');var liF=0;var f=reF.exec(filter);while(f&&filter.length!=liF&&f[0].length>0){if(f.index!=liF)throw('Invalid Filter-Bracket Specification: '+filter+' > '+filter.substring(f.index));liF=reF.lastIndex;pret=R.grep(pret,function(e){var v=R.attr(e,f[1]);if(f[2]==undefined||f[2]=='')return(!!v);if(f[3]=='=')return(v!=undefined)&&v==f[5];if(f[3]=='!=')return v==undefined||v!=f[5];if(f[3]=='=~')return v!=undefined&&new RegExp(f[5]).test(v);if(f[3]=='!~')return v==undefined||!(new RegExp(f[5]).test(v));throw"Filter missing handler";});f=reF.exec(filter);}
if(filter.length!=liF)throw('Invalid Filter-Bracket Specification (Remains): '+filter+' > '+filter.substring(liF));}
ret=ret.concat(pret);mp=reMP.exec(multipart);}
if(multipart.length!=liMP)throw('Invalid Multi-filter Specification (Remains): '+multipart+' > '+multipart.substring(liMP));ret=R.unique(ret);return ret;},walk:function(elem,dir){var r=[];for(var n=elem[dir];n&&n!=document;n=n[dir]){if(n.nodeType==TYPE_ELEMENT)r.push(n);}
return r;},attr:function(elem,name,value){if(arguments.length==3){if(elem.setAttribute!=undefined){elem.setAttribute(name,value);}
if(name!='src'){elem[name]=value;}
return value;}else{var v=elem[name];if(v==undefined&&elem.getAttribute!=undefined)v=elem.getAttribute(name);return(v===null)?undefined:v;}
},removeAttr:function(elem,name){if(elem.removeAttribute!=undefined){elem.removeAttribute(name);}
if(elem[name]!=undefined){elem[name]=undefined;}
},setClass:function(elem,classes){elem.className=classes;},addClass:function(elem,classes){if(elem.className==undefined)return;R.each((classes||'').split(/\s+/),function(c){if(!R.hasClass(elem,c)){elem.className+=(elem.className?' ':'')+c;}
}
);},removeClass:function(elem,classes){if(elem.className==undefined)return;var result=elem.className.split(/\s+/);R.each((classes||'').split(/\s+/),function(c){result=R.grep(result,function(ec){return ec!==c;});}
);elem.className=result.join(' ');},hasClass:function(elem,name){if(elem.className==undefined)return;return(' '+elem.className+' ').indexOf(' '+name+' ')>=0;},css:function(elem,name,value){var camelName=name.replace(/-(\w)/g,function(all,c){return c.toUpperCase();});if(arguments.length==3){elem.style[camelName]=value;return value;}else{if(elem.style&&elem.style[camelName]!=undefined){return elem.style[camelName];}else if(elem.currentStyle&&elem.currentStyle[camelName]!=undefined){return elem.currentStyle[camelName];}else if(elem.style&&elem.style[name]!=undefined){return elem.style[name];}else if(elem.currentStyle&&elem.currentStyle[name]!=undefined){return elem.currentStyle[name];}
return undefined;}
},computedCss:function(elem,name){var camelName=name.replace(/-(\w)/g,function(all,c){return c.toUpperCase();});var ret;if(document.defaultView!=undefined&&document.defaultView.getComputedStyle!=undefined){ret=document.defaultView.getComputedStyle(elem,null).getPropertyValue(name);if(ret==undefined)ret=document.defaultView.getComputedStyle(elem,null).getPropertyValue(camelName);return ret;}else if(elem.currentStyle){ret=elem.currentStyle[camelName];if(ret==undefined)ret=elem.currentStyle[name];ret.replace(/((?:\d*\.)?\d+\w+)(?:\s|$)/g,function(all,len){var bRsLeft=elem.runtimeStyle.left;elem.runtimeStyle.left=len;ret=elem.runtimeStyle.pixelLeft+'px';elem.runtimeStyle.left=bRsLeft;}
);return ret;}
},val:function(elem,value){var opts,i,len;if(arguments.length<2){if(elem.nodeName&&elem.nodeName.toUpperCase()=="SELECT"){opts=elem.options;if(elem.multiple){var ret=[];for(i=0,len=opts.length;i<len;i++){if(opts[i].selected)ret.push(opts[i].value||opts[i].text);}
return ret;}else{return elem.selectedIndex>=0?opts[elem.selectedIndex].value||opts[elem.selectedIndex].text:null;}
}else{return elem.value||"";}
}else{if(elem.nodeName&&elem.nodeName.toUpperCase()=="SELECT"){value=R.castToArray(value);opts=elem.options;for(i=0,len=opts.length;i<len;i++){opts[i].selected=R.inArray((opts[i].value||opts[i].text),value);}
}else{elem.value=value;}
}
},event:{guid:0,cloneId:function(wrapper,cb){cb.R_guid=wrapper.R_guid=cb.R_guid||R.event.guid++;},bind:function(elem,type,handler){var events=R.data(elem,EVENTS_KEY);if(events==undefined){events={handlers:{},the_hook:{}};R.data(elem,EVENTS_KEY,events);}
if(handler.R_guid==undefined){handler.R_guid=R.event.guid++;}
if(events.handlers[type]==undefined)
events.handlers[type]={};events.handlers[type][handler.R_guid]=handler;if(events.the_hook[type]==undefined){var handle=events.the_hook[type]=function(){return R.event.handle.apply(arguments.callee,arguments);};handle.type=type;handle.elem=elem;if(type=='ready'){}else if(elem.addEventListener){elem.addEventListener(type,handle,false);}else if(elem.attachEvent){elem.attachEvent('on'+type,handle);}
}
if(type=='ready'&&R.event.readyIsDetected){handler.call(document,{});}
},unbind:function(elem,type,handler){var events=R.data(elem,EVENTS_KEY);if(events==undefined)return;if(handler==undefined||handler.R_guid==undefined){if(type==undefined){var types=[];for(var each in events.handlers){types.push(each);}
for(var i=types.length-1;i>=0;i--){R.event.unbind(elem,types[i]);}
}else{if(events.handlers[type]==undefined||events.the_hook[type]==undefined)return;if(type=='ready'){}else if(elem.removeEventListener){elem.removeEventListener(type,events.the_hook[type],false);}else if(elem.detachEvent){elem.detachEvent("on"+type,events.the_hook[type]);}
events.the_hook[type].elem=null;delete events.handlers[type];delete events.the_hook[type];for(var each_any in events.handlers)return;R.removeData(elem,EVENTS_KEY);}
}else{if(events.handlers[type]==undefined||events.the_hook[type]==undefined)return;if(events.handlers[type][handler.R_guid]!=undefined){delete events.handlers[type][handler.R_guid];};for(var each in events.handlers[type])return;R.event.unbind(elem,type);}
},trigger:function(type,elem,suppressDefault){if(elem==undefined)throw'In trigger(), elem must be defined';var events=R.data(elem,EVENTS_KEY);if(!(events==undefined||events.the_hook[type]==undefined)){var fake={'type':type,'target':elem,preventDefault:function(){suppressDefault=true;},stopPropagation:function(){}
};fake[EXPAND_KEY]=1;if(events.the_hook[type].call(elem,fake)===false)
suppressDefault=true;}
if(!suppressDefault){var linkClick=elem.nodeName&&elem.nodeName.toUpperCase()=="A"&&type.toUpperCase()=="CLICK";if(elem[type]!=undefined&&!linkClick){var backupHandlers=undefined;if(!(events==undefined||events.handlers[type]==undefined)){backupHandlers=events.handlers[type];events.handlers[type]=undefined;}
try{elem[type]();}catch(e){};if(backupHandlers!=undefined){events.handlers[type]=backupHandlers;}
}else{if(linkClick)
location=elem.href;}
}
},handle:function(e){e=R.event.normalize_event(e||window.event);var events=R.data(this.elem,EVENTS_KEY);if(events==undefined||events.handlers[this.type]==undefined)return;var stop=false;for(var each in events.handlers[this.type]){var cb=events.handlers[this.type][each];if(cb.apply(this.elem,arguments)===false){stop=true;}
}
if(stop){e.preventDefault();e.stopPropagation();}
},normalize_event:function(raw_e){if(raw_e[EXPAND_KEY])return raw_e;var e={originalEvent:raw_e,EXPAND_KEY:true};var props=['altKey','bubbles','button','cancelBubble','cancelable','charCode','clientX','clientY','ctrlKey','currentTarget','detail','eventPhase','explicitOriginalTarget','isChar','keyCode','layerX','layerY','metaKey','pageX','pageY','relatedTarget','screenX','screenY','shiftKey','target','timeStamp','type','view','which'
];for(var i=props.length-1;i>=0;i--)e[props[i]]=raw_e[props[i]];if(e.pageX!=undefined){e.posX=e.pageX;e.posY=e.pageY;}else if(e.clientX!=undefined){e.posX=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;e.posY=e.clientY+document.body.scrollTop+document.documentElement.scrollTop;}
e.originalTarget=raw_e.originalTarget||raw_e.srcElement;e.preventDefault=function(){if(raw_e.preventDefault)raw_e.preventDefault();raw_e.returnValue=false;};e.stopPropagation=function(){if(raw_e.stopPropagation)raw_e.stopPropagation();raw_e.cancelBubble=true;};return e;},readyIsBound:false,readyIsDetected:false,bindReady:function(){if(R.event.readyIsBound)return;R.event.readyIsBound=true;if(R.browser.safari){(function(){var s=document.readyState;if(s=='loaded'||s=='complete'){return R.event.triggerReady();}
setTimeout(arguments.callee,0);})();}else if(R.browser.msie){(function(){if(window==window.top&&document.documentElement.doScroll){try{document.documentElement.doScroll('left');return R.event.triggerReady();}catch(e){}
}
if(document.readyState=='complete')return R.event.triggerReady();return setTimeout(arguments.callee,0);})();}else{document.addEventListener('DOMContentLoaded',R.event.triggerReady,false);}
R.event.bind(window,'load',R.event.triggerReady);},triggerReady:function(){if(R.event.readyIsDetected)return;R.event.readyIsDetected=true;R.event.trigger('ready',document,true);}
}
});R.prototype=R.fn.prototype;R.extend(R.prototype,{RAMJsFx_Version:"1.0.0",length:0,eachAndMerge:function(cb){var elems=[];R.each(this,function(e){elems=elems.concat(cb(e));});return R(R.unique(elems));},find:function(spec){return R(R.find(this,spec));},filter:function(spec){return R(R.filter(this,spec));},get:function(index){if(index!=undefined){return this[index];}else{return R.castToArray(this);}
},add:function(spec){return R.unique(R.merge(this,R(spec)));},map:function(cb){return R(R.map(this,function(e,i){return cb.call(e,e,i);}
));},each:function(cb){R.each(this,function(e,i){return cb.call(e,e,i);}
);return this;},attr:function(name,value){if(arguments.length==1&&typeof name=='string'){return this.length>0?R.attr(this[0],name):undefined
}else if(typeof name=='string'){R.each(this,function(e){R.attr(e,name,value);});return this;}else{for(var key in name){this.attr(key,name[key]);}
return this;}
},removeAttr:function(name){if(typeof name=='string'){R.each(this,function(e){R.removeAttr(e,name);}
);return this;}else{throw"removeAttr only support string as input, not object nor array";}
},data:function(name,value){if(arguments.length==1&&typeof name=='string'){return this.length>0?R.data(this[0],name):undefined
}else if(typeof name=='string'){R.each(this,function(e){R.data(e,name,value);});return this;}else{for(var key in name){this.data(key,name[key]);}
return this;}
},removeData:function(name){if(typeof name=='string'){R.each(this,function(e){R.removeData(e,name);}
);return this;}else{throw"removeData only support string as input, not object nor array";}
},hasClass:function(name){var ret=R.grep(this,function(e){return R.hasClass(e,name);});return ret.length>0;},setClass:function(classes){R.each(this,function(e){return R.setClass(e,classes);});return this;},addClass:function(classes){R.each(this,function(e){return R.addClass(e,classes);});return this;},removeClass:function(classes){R.each(this,function(e){return R.removeClass(e,classes);});return this;},css:function(name,value){if(arguments.length==1&&typeof name=='string'){return this.length>0?R.css(this[0],name):undefined;}else if(typeof name=='string'){R.each(this,function(e){R.css(e,name,value);});return this;}else{for(var key in name){this.css(key,name[key]);}
return this;}
},computedCss:function(name){return this.length>0?R.computedCss(this[0],name):undefined;},toggleVisibility:function(){if(this.css('visibility')=='hidden'){this.show();}else{this.hide();}
return this;},toggleDisplay:function(){if(this.css('display')=='none'){this.show();}else{this.collapse();}
},show:function(){return this.css({'visibility':'visible','display':''});},hide:function(){return this.css({'visibility':'hidden','display':''});},collapse:function(){return this.css({'display':'none'});},outerWidth:function(){return this.attr('offsetWidth');},outerHeight:function(){return this.attr('offsetHeight');},innerWidth:function(){return this.attr('clientWidth')||this.outerWidth()-(parseInt(this.computedCss('border-left-width'))||0)-(parseInt(this.computedCss('border-right-width'))||0);},innerHeight:function(){return this.attr('clientHeight')||this.outerHeight()-(parseInt(this.computedCss('border-top-width'))||0)-(parseInt(this.computedCss('border-bottom-width'))||0);},width:function(){if(this.length>0&&this[0].navigator){return this[0].innerWidth||this[0].document.documentElement.clientWidth||this[0].document.body.clientWidth;}else if(this.length>0&&this[0].nodeType==TYPE_DOCUMENT){return this[0].documentElement.scrollWidth;}else{return this.innerWidth()-(parseInt(this.computedCss('padding-left'))||0)-(parseInt(this.computedCss('padding-right'))||0);}
},height:function(){if(this.length>0&&this[0].navigator){return this[0].innerHeight||this[0].document.documentElement.clientHeight||this[0].document.body.clientHeight;}else if(this.length>0&&this[0].nodeType==TYPE_DOCUMENT){return Math.max(this[0].documentElement.offsetHeight,this[0].documentElement.scrollHeight);}else{return this.innerHeight()-(parseInt(this.computedCss('padding-top'))||0)-(parseInt(this.computedCss('padding-bottom'))||0);}
},scrollTop:function(value){if(this.length<=0)return undefined;if(this[0].nodeType==TYPE_DOCUMENT)throw'Scroll function cannot be used with the document node';if(value!=undefined){if(this[0].navigator){this[0].scrollTo(R(this[0]).scrollLeft(),value);}else{this[0].scrollTop=value;}
return this;}else{if(this[0].navigator){if(this[0].pageYOffset!=undefined)return this[0].pageYOffset;var doc=this[0].document;return doc.documentElement.scrollTop+doc.body.scrollTop;}
else{return this[0].scrollTop;}
}
},scrollLeft:function(value){if(this.length<=0)return undefined;if(this[0].nodeType==TYPE_DOCUMENT)throw'Scroll function cannot be used with the document node';if(value!=undefined){if(this[0].navigator){this[0].scrollTo(value,R(this[0]).scrollTop());}else{this[0].scrollLeft=value;}
return this;}else{if(this[0].navigator){if(this[0].pageXOffset!=undefined)return this[0].pageXOffset;var doc=this[0].document;return doc.documentElement.scrollLeft+doc.body.scrollLeft;}
else{return this[0].scrollLeft;}
}
},offset:function(){if(this.length<=0)return{left:undefined,top:undefined};if(this[0].getBoundingClientRect){var rect=this[0].getBoundingClientRect();var de=this[0].ownerDocument.documentElement;var body=this[0].ownerDocument.body;var ret={top:rect.top+de.scrollTop+body.scrollTop-de.clientTop,left:rect.left+de.scrollLeft+body.scrollLeft-de.clientLeft
};return ret;}else{var obj=this[0];var ret={top:0,left:0};while(obj){ret.top+=obj.offsetTop;ret.left+=obj.offsetLeft;obj=obj.offsetParent;}
return ret;}
},boundingClientRect:function(){if(this.length<=0)return{top:undefined,left:undefined,right:undefined,bottom:undefined};if(this[0].getBoundingClientRect){return this[0].getBoundingClientRect();}else{var de=this[0].ownerDocument.documentElement;var body=this[0].ownerDocument.body;var rect=this.offset();rect.top-=de.scrollTop+body.scrollTop;rect.left-=de.scrollLeft+body.scrollLeft;rect.bottom=rect.left+this.outerWidth();rect.right=rect.top+this.outerHeight();return rect;}
},val:function(value){if(arguments.length==0){return this.length>0?R.val(this[0]):undefined;}else{R.each(this,function(e){R.val(e,value);});}
return this;},html:function(value){if(arguments.length==0){return this.length>0?this[0].innerHTML:undefined;}else{this.empty().each(function(){this.innerHTML=value;});}
return this;},bind:function(type,cb){R.each(this,function(e){R.event.bind(e,type,cb);});return this;},unbind:function(type,cb){R.each(this,function(e){R.event.unbind(e,type,cb);});return this;},one:function(type,cb){var wrapper=function(e){R(this).unbind(type,wrapper);return cb.apply(this,arguments);};R.event.cloneId(wrapper,cb);R.each(this,function(e){R.event.bind(e,type,wrapper);});return this;},trigger:function(type){R.each(this,function(e){R.event.trigger(type,e);});return this;},triggerHandler:function(type){R.each(this,function(e){R.event.trigger(type,e,true);});return this;}
});R.each(['blur','change','click','dblclick','error','focus','keydown','keypress','keyup','load','mousedown','mousemove','mouseout','mouseover','mouseup','resize','scroll','select','submit','unload','ready'],function(type){R.prototype[type]=function(cb){return cb!=undefined?this.bind(type,cb):this.trigger(type);};}
);R.event.bindReady();})();