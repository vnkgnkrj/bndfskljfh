(function(){var uniqueWindowId=0;var POPUP_WINDOW_READY_TAG="RAMJsFxWindowReady";var POPUP_WINDOW_EVENT_ATTACHED_TAG="RAMJsFxWindowEventAttached";var POPUP_WINDOW_NAME_CACHE_KEY="RAMJsFxOpenedWindows";var POPUP_WINDOW_NAME_REGEXP=new RegExp("(^|.*;)\\s*"+RAMJsFx.escapeRegExp(POPUP_WINDOW_NAME_CACHE_KEY)+"=([^;]*)(;.*|$)","i");RAMJsFx._getAllOpenedWindows=function(){if(document.cookie.match(POPUP_WINDOW_NAME_REGEXP))
return decodeURIComponent(document.cookie.replace(POPUP_WINDOW_NAME_REGEXP,'$2'));return"";}
RAMJsFx._getAllOpenedWindowArray=function(){var t=RAMJsFx._getAllOpenedWindows().split(",");var result=[];for(var i in t){var name=t[i];if(name.match(/\S/))
result.push(name);}
return result;}
RAMJsFx._setAllOpenedWindows=function(windows){document.cookie=POPUP_WINDOW_NAME_CACHE_KEY+"="+encodeURIComponent(windows)+";path=/";}
RAMJsFx._windowOpened=function(name,opened){var allWindowNames=RAMJsFx._getAllOpenedWindows();var regexp=new RegExp("(?:^|,)("+RAMJsFx.escapeRegExp(name)+")(?:,|$)","");if(arguments.length>1){allWindowNames=allWindowNames.replace(regexp,",");if(opened)
allWindowNames=allWindowNames+","+name+",";allWindowNames=allWindowNames.replace(/,+/i,",");RAMJsFx._setAllOpenedWindows(allWindowNames);}else{return allWindowNames.match(regexp);}
}
RAMJsFx._closeWindow=function(name){var w=window.open("#",name);if(w&&w.close&&!w.closed)
w.close();RAMJsFx._windowOpened(name,false);}
RAMJsFx.openWindow=function(params,callback,timeout,checkingInterval){var newWindowName=params[1]||"window"+(uniqueWindowId++);var newWindowLocation=params[0];var newWindow=window.open(newWindowLocation,params[1],params[2],params[3]);if(callback){timeout=timeout||10000;checkingInterval=checkingInterval||200;var startTime=new Date();var intervalHandler=undefined;var checkWindowOpenedFunc=function(){try{var success=false;try{if(newWindow){var tag1=newWindow[POPUP_WINDOW_READY_TAG].toUpperCase();var tag2=params[0].replace(/#.*$/i,"").toUpperCase();success=tag1.substr(tag1.length-tag2.length)===tag2;}
}catch(e){}
if(success)
RAMJsFx._windowOpened(newWindow.name,true);var timeouted=new Date()-startTime>=timeout;if(success||timeouted||!newWindow){if(intervalHandler){clearTimeout(intervalHandler);intervalHandler=undefined;}
callback(success,newWindow);return;}
setTimeout(checkWindowOpenedFunc,checkingInterval);}catch(e){try{if(newWindow)newWindow.close();}catch(e2){}
callback(false);return;}
};checkWindowOpenedFunc();}
return newWindow;}
RAMJsFx.markWindowReady=function(w){w[POPUP_WINDOW_READY_TAG]=w.location.href.replace(/#.*$/i,"");w[POPUP_WINDOW_EVENT_ATTACHED_TAG]=true;$R(w).bind("beforeunload",function(){this[POPUP_WINDOW_EVENT_ATTACHED_TAG]=false;RAMJsFx._windowOpened(this.name,false);});}
RAMJsFx.closeWindow=function(name){if(RAMJsFx._windowOpened(name))
RAMJsFx._closeWindow(name);}
RAMJsFx.closeAllWindows=function(){var windowNames=RAMJsFx._getAllOpenedWindowArray();for(var i in windowNames)
RAMJsFx._closeWindow(windowNames[i]);}
})();