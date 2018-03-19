var RemoteAccessWindowsPool={SetCookie:function(name,value){document.cookie=name+"="+escape(value)+";path=/";},GetCookie:function(name){var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));if(arr!=null)
return unescape(arr[2]);return null;},DeleteCookie:function(name){var exp=new Date();exp.setTime(exp.getTime()-1);var cval=RemoteAccessWindowsPool.GetCookie(name);if(cval!=null)document.cookie=name+"="+cval+";expires="+exp.toGMTString();},Join:function(key){window.onload=function(){var count=RemoteAccessWindowsPool.GetCookie(key);if(count==undefined)count=0;count++;RemoteAccessWindowsPool.SetCookie(key,count);}
window.onunload=function(){var count=RemoteAccessWindowsPool.GetCookie(key);if(count!=undefined){count--;RemoteAccessWindowsPool.SetCookie(key,count);}
}
},IsEmpty:function(key){var count=RemoteAccessWindowsPool.GetCookie(key);return(count==null||count==0);},TryCheck:function(key,url){if(RemoteAccessWindowsPool.IsEmpty(key)){function ClearSuccess(result){if(result!=1){Sys.Debug.trace("Clear session failed");}
else{Sys.Debug.trace("Clear session succeed");}
}
RemoteAccessWindowsPool.SendAjaxRequest(url,"",ClearSuccess);}
},SendAjaxRequest:function(url,params,callback){var request=new Sys.Net.WebRequest();request.set_url(url);request.set_httpVerb('POST');request.get_headers()["Content-type"]="application/x-www-form-urlencoded";request.get_headers()["Content-length"]=params.length;request.get_headers()["Connection"]="close";request.set_body(params);request.add_completed(function(executor,eventArgs){if(executor.get_responseAvailable()&&executor.get_statusCode()==200)
callback(executor.get_responseData());});request.invoke();}
}