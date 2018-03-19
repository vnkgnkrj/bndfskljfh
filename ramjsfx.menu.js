(function(){var menubar;var menuset;var focused_menu;var menuset_state=0;var submenu_state=0;function changeFocusedMenu(new_focus){if(focused_menu!=undefined){$R(focused_menu).removeClass("ramjsfx-menu-focused");}
focused_menu=new_focus;if(focused_menu!=undefined){$R(focused_menu).addClass("ramjsfx-menu-focused");}
}
var MENU_CHEVRON_TAG='<span class="ramjsfx-menu-chev">&#9660;</span>';var MENU_SHADOW_BLOCK='<div class="ramjsfx-menu-shadow"></div>';var MENU_ROOTLINK_WRAP='<span class="ramjsfx-menu-rootlink"></span>';var MENU_CONTEXT_MENU_CONTAINER='<div class="ramjsfx-menu-context-box"><div class="ramjsfx-menu-context-shadow-box"></div></div>';$R.extend($R,{menu:{}});$R.extend($R.menu,{disable:function(items){$R(items).removeClass("ramjsfx-menu-enabled").addClass("ramjsfx-menu-disabled");$R(items).find('a').each(function(each){var link=$R(each);if(link.data('menu_href')==undefined){link.data('menu_href',link.attr('href'));link.attr('href','javascript:void(0)');link.attr('tabIndex','-1');}
});},enable:function(items){$R(items).removeClass("ramjsfx-menu-disabled").addClass("ramjsfx-menu-enabled");$R(items).find('a').each(function(each){var link=$R(each);if(link.data('menu_href')!=undefined){link.attr('href',link.data('menu_href'));link.removeData('menu_href');link.removeAttr('tabIndex');}
});},popup:function(contextMenu,event){var menu=contextMenu.find("div div ul.ramjsfx-menu-contextmenu")[0];if(menu===undefined)
throw"contextMenu must be a context menu";contextMenu.show();var width=$R(menu).outerWidth()+10;var height=$R(menu).outerHeight()+10;var clientWidth=$R(window).width();var clientHeight=$R(window).height();var clientX=event.clientX,clientY=event.clientY;var adjX=0,adjY=0;if(clientX+width>clientWidth)
adjX=-(clientX+width-clientWidth);if(clientX+adjX<0)
adjX+=-(clientX+adjX);if(clientY+height>clientHeight)
adjY=-(clientY+height-clientHeight);if(clientX+adjX<0)
adjY+=-(clientX+adjX);contextMenu.css('left',event.posX+adjX+1+'px');contextMenu.css('top',event.posY+adjY-3+'px');var items=[];contextMenu.find('li.ramjsfx-menu-enabled').each(function(e){items.push(e);});contextMenu.find('li').each(function(e){items.push(e);});for(var i in items){var entry=$R(items[i]);if(entry.computedCss('display')!='none'){$R(entry.find('a')[0]).focus();break;}
}
}
});$R.prototype.menu=function(options){options=$R.extend({autoChevron:true
},options||{});var isContextMenu=$R(this).hasClass("ramjsfx-menu-contextmenu");var context_menu=$R(MENU_CONTEXT_MENU_CONTAINER)[0];$R(this).each(function(){var this_bar=this;if(isContextMenu){var shadow=$R(MENU_SHADOW_BLOCK)[0];this_bar.parentNode.insertBefore(context_menu,this_bar);shadow.appendChild(this_bar);context_menu.children[0].appendChild(shadow);$R(this_bar).css('display','');$R(context_menu).collapse();}else{$R(this_bar).find("> li > ul").each(function(e){var shadow=$R(MENU_SHADOW_BLOCK)[0];e.parentNode.insertBefore(shadow,e);shadow.appendChild(e);});}
$R(this_bar).find("> li").each(function(each){$R(each).each(function(e){var link=$R(e);if(!link.hasClass("ramjsfx-menu-disabled")){link.addClass("ramjsfx-menu-enabled")
}
link.find("ul li").each(function(innerE){var innerLink=$R(innerE);if(!innerLink.hasClass("ramjsfx-menu-disabled")){innerLink.addClass("ramjsfx-menu-enabled")
}
});var root_link=link.find('a');if(root_link.length>0&&!isContextMenu){root_link=root_link[0];var wrap=$R(MENU_ROOTLINK_WRAP)[0];$R(root_link.childNodes).each(function(r){wrap.appendChild(r);});root_link.appendChild(wrap);}
if(options.autoChevron&&link.find("ul li").length>0&&!isContextMenu){$R(root_link).append(MENU_CHEVRON_TAG);}
});$R(each).find("> a").click(function(){if($R(this.parentNode).hasClass('ramjsfx-menu-enabled')){if($R(each).find("ul").length==0){$R(this).blur();}else{if(menubar==this_bar&&submenu_state){$R(each).find("ul").css('display','none');submenu_state=0;}else{$R(each).find("ul").css('display','block');submenu_state=1;}
menubar=this_bar;menuset=each;$R(this).focus();}
}
});$R(each).find("ul a, > a")
.blur(function(){if(menuset_state>0)menuset_state--;changeFocusedMenu(undefined);setTimeout(function(){if(menuset!=each){$R(each).find("ul").collapse();}
if(isContextMenu&&menubar!=this_bar){$R(context_menu).collapse();}
if(menuset_state<2){$R(each).find("ul").collapse();menuset=undefined;menubar=undefined;menuset_state=0;if(isContextMenu){$R(context_menu).collapse();}
}
},1);})
.keydown(function(e){if(e.keyCode==27){if(!isContextMenu){$R(each).find("ul").collapse();submenu_state=0;$R(menuset).find("> a").focus();menuset_state=2;return false;}else{$R(this).blur();}
}else if(!isContextMenu&&(e.keyCode==37||e.keyCode==39)){var sibling=$R(menuset);do{sibling=e.keyCode==37?sibling.previousSibling():sibling.nextSibling();}while(sibling.length>0&&(!sibling.hasClass("ramjsfx-menu-enabled")||!sibling.find("> a").length));if(sibling.length>0){sibling.find("> a").focus();}else{var children=$R(menubar).find("> li.ramjsfx-menu-enabled > a");if(children.length>0){$R(children.get(e.keyCode==37?children.length-1:0)).focus();}
}
menuset_state=2;return false;}else if(e.keyCode==38||e.keyCode==40){if(focused_menu==menuset&&!isContextMenu){$R(each).find("ul").css('display','block');submenu_state=1;var children=$R(menuset).find("ul > li.ramjsfx-menu-enabled > a");if(children.length>0){$R(children.get(e.keyCode==38?children.length-1:0)).focus();}
}else{var sibling=$R(focused_menu);do{sibling=e.keyCode==38?sibling.previousSibling():sibling.nextSibling();}while(sibling.length>0&&(!sibling.hasClass("ramjsfx-menu-enabled")||!sibling.find("> a").length));if(sibling.length>0){sibling.find("a").focus();}else{var children=isContextMenu?$R(menubar).find("> li.ramjsfx-menu-enabled > a"):$R(menuset).find("ul > li.ramjsfx-menu-enabled > a");if(children.length>0){$R(children.get(e.keyCode==38?children.length-1:0)).focus();}
}
}
menuset_state=2;return false;}
})
.each(function(e){var link=$R(e);if(link.attr('href')=='#'){link.attr('href','javascript:void(0)');}
});$R(each).find("ul a")
.focus(function(){var parent=this.parentNode;setTimeout(function(){changeFocusedMenu(parent);},1);menubar=this_bar;menuset_state=2;})
.mouseover(function(){$R(this).focus();menuset_state=2;})
.click(function(){if($R(this.parentNode).hasClass('ramjsfx-menu-enabled')){$R(this).blur();}
});$R(each).find("> a").focus(function(){if($R(this.parentNode).hasClass('ramjsfx-menu-enabled')||isContextMenu){if(menubar==this_bar&&submenu_state){$R(each).find("ul").css('display','block');}else{submenu_state=0;}
menuset=each;setTimeout(function(){changeFocusedMenu(each);},1);menubar=this_bar;menuset_state=2;}
})
.mouseover(function(){if(menubar==this_bar&&menuset_state&&($R(this.parentNode).hasClass('ramjsfx-menu-enabled')||isContextMenu)){$R(this).focus();menuset_state=2;}
})
.click(function(){if(isContextMenu){if($R(this.parentNode).hasClass('ramjsfx-menu-enabled')){$R(this).blur();}
}
});});});if(isContextMenu)
return $R(context_menu);};})();