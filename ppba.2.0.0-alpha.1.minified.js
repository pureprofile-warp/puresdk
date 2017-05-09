!function e(t,n,a){function i(o,r){if(!n[o]){if(!t[o]){var c="function"==typeof require&&require;if(!r&&c)return c(o,!0);if(s)return s(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var d=n[o]={exports:{}};t[o][0].call(d.exports,function(e){var n=t[o][1][e];return i(n?n:e)},d,d.exports,e,t,n,a)}return n[o].exports}for(var s="function"==typeof require&&require,o=0;o<a.length;o++)i(a[o]);return i}({1:[function(e,t,n){var a=e("./modules/logger"),i=e("./modules/pubsub"),s=e("./modules/caller"),o=e("./modules/store"),r=e("./modules/dom"),c={},l=function(){document.getElementById("--puresdk-apps-icon--").addEventListener("click",function(e){e.stopPropagation(),r.toggleClass(document.getElementById("--puresdk-apps-container--"),"active")}),document.getElementById("--puresdk-user-avatar--").addEventListener("click",function(e){e.stopPropagation(),r.removeClass(document.getElementById("--puresdk-apps-container--"),"active"),r.toggleClass(document.getElementById("--puresdk-user-sidebar--"),"active")}),window.addEventListener("click",function(e){r.removeClass(document.getElementById("--puresdk-apps-container--"),"active"),r.removeClass(document.getElementById("--puresdk-user-sidebar--"),"active")})},d={setWindowName:function(e){o.setWindowName(e)},setConfiguration:function(e){o.setConfiguration(e)},setHTMLTemplate:function(e){o.setHTMLTemplate(e)},init:function(e){return a.log("initializing with conf: ",e),e&&(e.headerDivId&&o.setHTMLContainer(e.headerDivId),null!==e.appsVisible&&o.setAppsVisible(e.appsVisible),e.rootUrl&&o.setRootUrl(e.rootUrl)),c=e,!0},authenticate:function(e){var t=d;s.makeCall({type:"GET",endpoint:o.getAuthenticationEndpoint(),callbacks:{success:function(n){a.log(n),o.setUserData(n),t.render(),d.getApps(),e(n)},fail:function(e){window.location=o.getLoginUrl()}}})},authenticatePromise:function(){var e=d;return s.promiseCall({type:"GET",endpoint:o.getAuthenticationEndpoint(),middlewares:{success:function(t){a.log(t),o.setUserData(t),e.render(),d.getApps()}}})},getApps:function(){s.makeCall({type:"GET",endpoint:o.getAppsEndpoint(),callbacks:{success:function(e){o.setApps(e),d.renderApps(e.apps)},fail:function(e){window.location=o.getLoginUrl()}}})},getAvailableListeners:function(){return i.getAvailableListeners()},subscribeListener:function(e,t){return i.subscribe(e,t)},getUserData:function(){return o.getUserData()},setInputPlaceholder:function(e){},changeAccount:function(e){s.makeCall({type:"GET",endpoint:o.getSwitchAccountEndpoint(e),callbacks:{success:function(e){window.location="/apps"},fail:function(e){alert("Sorry, something went wrong with your request. Plese try again")}}})},renderApps:function(e){for(var t=function(e){return'\n				<a href="#" style="background: #'+e.color+'"><i class="'+e.icon+'"></i></a>\n				<span class="bac--app-name">'+e.name+'</span>\n				<span class="bac--app-description">'+e.descr+"</span>\n			"},n=function(n){var a=e[n],i=document.createElement("div");i.className="bac--apps",i.innerHTML=t(a),i.onclick=function(e){e.preventDefault(),window.location=a.application_url},document.getElementById("--puresdk-apps-container--").appendChild(i)},a=0;a<e.length;a++)n(a)},renderUser:function(e){var t=function(e){return'\n				<div class="bac--user-image"><i class="fa fa-camera"></i></div>\n				<div class="bac--user-name">'+e.firstname+" "+e.lastname+'</div>\n				<div class="bac--user-email">'+e.email+"</div>\n			"},n=document.createElement("div");n.className="bac--user-sidebar-info",n.innerHTML=t(e),document.getElementById("--puresdk-user-details--").appendChild(n),document.getElementById("--puresdk-user-avatar--").innerHTML=e.firstname.charAt(0)+e.lastname.charAt(0)},renderAccounts:function(e){for(var t=function(e){return'\n				<img src="'+e.sdk_square_logo_icon+'" alt="">\n				<div class="bac-user-app-details">\n					 <span>'+e.name+"</span>\n					 <span>15 team members</span>\n				</div>\n			"},n=function(n){var a=e[n],i=document.createElement("div");i.className="bac--user-list-item",i.innerHTML=t(a),i.onclick=function(e){e.preventDefault(),d.changeAccount(a.sfid)},document.getElementById("--puresdk-user-businesses--").appendChild(i)},a=0;a<e.length;a++)n(a)},styleAccount:function(e){var t=document.createElement("img");t.src=e.sdk_logo_icon,document.getElementById("--puresdk-account-logo--").appendChild(t),document.getElementById("--puresdk-bac--header-apps--").style.cssText="background: #"+e.sdk_background_color+"; color: #"+e.sdk_font_color,document.getElementById("--puresdk-user-sidebar--").style.cssText="background: #"+e.sdk_background_color+"; color: #"+e.sdk_font_color,document.getElementById("--puresdk-account-logo--").onclick=function(e){window.location.href="/"}},render:function(){var e=document.getElementById(o.getHTLMContainer());if(null===e){a.error('the container with id "'+e+'" has not been found on the document. The library is going to create it.');var t=document.createElement("div");t.id=o.getHTLMContainer(),t.style.width="100%",t.style.height="50px",document.body.insertBefore(t,document.body.firstChild),e=document.getElementById(o.getHTLMContainer())}e.innerHTML=o.getHTML(),d.styleAccount(o.getUserData().user.account),d.renderUser(o.getUserData().user),d.renderAccounts(o.getUserData().user.accounts),o.getAppsVisible()===!1&&(document.getElementById("--puresdk-apps-section--").style.cssText="display:none"),l()}};t.exports=d},{"./modules/caller":3,"./modules/dom":4,"./modules/logger":5,"./modules/pubsub":6,"./modules/store":7}],2:[function(e,t,n){"use strict";var a=e("./PPBA");a.setWindowName("PURESDK"),a.setConfiguration({logs:!0,rootUrl:"/",baseUrl:"api/v1/",loginUrl:"api/v1/oauth2",searchInputId:"--puresdk--search--input--",redirectUrlParam:"redirect_url"}),a.setHTMLTemplate('<header class="bac--header-apps" id="--puresdk-bac--header-apps--">\n    <div class="bac--container">\n        <div class="bac--logo" id="--puresdk-account-logo--"></div>\n        <div class="bac--user-actions">\n            <div class="bac--user-apps" id="--puresdk-apps-section--">\n                <i class="fa fa-squares" id="--puresdk-apps-icon--"></i>\n\n                <div class="bac--apps-container" id="--puresdk-apps-container--">\n                    <div class="bac--apps-arrow"></div>\n                </div>\n            </div>\n            <!--<div class="bac&#45;&#45;user-notifications">-->\n                <!--<div class="bac&#45;&#45;user-notifications-count">1</div>-->\n                <!--<i class="fa fa-bell-o"></i>-->\n            <!--</div>-->\n            <div class="bac--user-avatar">\n                <span class="bac--user-avatar-name" id="--puresdk-user-avatar--"></span>\n            </div>\n        </div>\n    </div>\n</header>\n<div class="bac--user-sidebar" id="--puresdk-user-sidebar--">\n    <div id="--puresdk-user-details--"></div>\n    <!--<div class="bac&#45;&#45;user-sidebar-info">-->\n        <!--<div class="bac&#45;&#45;user-image"><i class="fa fa-camera"></i></div>-->\n        <!--<div class="bac&#45;&#45;user-name">Curtis Bartlett</div>-->\n        <!--<div class="bac&#45;&#45;user-email">cbartlett@pureprofile.com</div>-->\n    <!--</div>-->\n    <div class="bac--user-apps" id="--puresdk-user-businesses--">\n        <!--<div class="bac&#45;&#45;user-list-item">-->\n            <!--<img src="http://lorempixel.com/40/40" alt="">-->\n            <!--<div class="bac-user-app-details">-->\n                <!--<span></span>-->\n                <!--<span>15 team members</span>-->\n            <!--</div>-->\n        <!--</div>-->\n    </div>\n    <div class="bac--user-account-settings">\n        <div class="bac-user-acount-list-item">\n            <i class="fa fa-cog-line"></i>\n            <a href="#">Acount Security</a>\n        </div>\n        <div class="bac-user-acount-list-item">\n            <i class="fa fa-lock-line"></i>\n            <a href="#">Acount Security</a>\n        </div>\n        <div class="bac-user-acount-list-item">\n            <i class="fa fa-login-line"></i>\n            <a href="/api/v1/sign-off">Log out</a>\n        </div>\n    </div>\n</div>'),window.PURESDK=a;var i='html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:"";content:none}table{border-collapse:collapse;border-spacing:0}body{overflow-x:hidden}#bac-wrapper{font-family:"Verdana", arial, sans-serif;color:white;min-height:100vh;position:relative}.bac--container{max-width:1160px;margin:0 auto}.bac--header-apps{position:absolute;width:100%;height:50px;background-color:#475369;padding:5px 0;z-index:9999999}.bac--header-apps .bac--container{height:100%;display:flex;align-items:center;justify-content:space-between}.bac--header-search{position:relative}.bac--header-search input{color:#fff;font-size:14px;height:35px;background-color:#6b7586;padding:0 5px 0 10px;border:none;border-radius:3px;min-width:400px;width:100%}.bac--header-search input:focus{outline:none}.bac--header-search input::-webkit-input-placeholder{font-style:normal !important;text-align:center;color:#fff;font-size:14px;font-weight:300;letter-spacing:0.5px}.bac--header-search input::-moz-placeholder{font-style:normal !important;text-align:center;color:#fff;font-size:14px;font-weight:300;letter-spacing:0.5px}.bac--header-search input:-ms-input-placeholder{font-style:normal !important;text-align:center;color:#fff;font-size:14px;font-weight:300;letter-spacing:0.5px}.bac--header-search i{position:absolute;top:8px;right:10px}.bac--user-actions{display:flex;align-items:center}.bac--user-actions>div{cursor:pointer;color:white}.bac--user-actions .bac--user-notifications{position:relative}.bac--user-actions .bac--user-notifications i{font-size:20px}.bac--user-actions .bac--user-notifications-count{position:absolute;display:inline-block;height:15px;width:15px;line-height:15px;color:#fff;font-size:10px;text-align:center;background-color:#fc3b30;border-radius:50%;top:-5px;left:-5px}.bac--user-actions .bac--user-avatar,.bac--user-actions .bac--user-notifications{margin-left:20px}.bac--user-actions .bac--user-avatar-name{color:#fff;background-color:#adadad;border-radius:50%;display:inline-block;height:30px;width:30px;line-height:30px;text-align:center;font-size:14px}.bac--user-apps{position:relative}#--puresdk-user-businesses--{height:calc(100vh - 458px);overflow:scroll}.bac--apps-container{background:#fff;position:absolute;top:45px;right:-40px;display:flex;width:360px;flex-wrap:wrap;border-radius:10px;padding:30px;justify-content:space-between;text-align:center;-webkit-box-shadow:0 0 10px 2px rgba(0,0,0,0.2);box-shadow:0 0 10px 2px rgba(0,0,0,0.2);opacity:0;visibility:hidden;transition:all 0.4s ease}.bac--apps-container.active{opacity:1;visibility:visible}.bac--apps-container .bac--apps-arrow{position:absolute;display:block;height:20px;width:20px;top:-10px;right:36px;background:#fff;transform:rotate(-45deg);z-index:1}.bac--apps-container .bac--apps{width:32%;display:flex;font-size:30px;margin-bottom:40px;text-align:center;justify-content:center;flex-wrap:wrap}.bac--apps-container .bac--apps a{display:block;color:#fff;text-decoration:none;width:65px;height:65px;line-height:65px;text-align:center;border-radius:10px;-webkit-box-shadow:0 0 5px 0 rgba(0,0,0,0.2);box-shadow:0 0 5px 0 rgba(0,0,0,0.2)}.bac--apps-container .bac--apps .bac--app-name{width:100%;color:#000;font-size:18px;padding:10px 0}.bac--apps-container .bac--apps .bac--app-description{color:#919191;font-size:12px;font-style:italic}.bac--user-sidebar{font-family:"Verdana", arial, sans-serif;color:white;background-color:#515f77;box-sizing:border-box;width:320px;height:100%;position:absolute;top:0;right:0;z-index:999999;padding-top:10px;opacity:0;margin-top:50px;transform:translateX(100%);transition:all 0.4s ease}.bac--user-sidebar.active{opacity:1;transform:translateX(0%)}.bac--user-sidebar .bac--user-list-item{display:flex;cursor:pointer;align-items:center;padding:10px 10px 10px 40px;border-bottom:2px solid #6b7586}.bac--user-sidebar .bac--user-list-item:hover{background-color:#6b7586}.bac--user-sidebar .bac--user-list-item img{margin-right:20px;border:2px solid #fff}.bac--user-sidebar .bac--user-list-item span{width:100%;display:block;margin-bottom:5px}.bac--user-sidebar .bac-user-app-details span{font-size:12px}.bac--user-sidebar-info{display:flex;justify-content:center;flex-wrap:wrap;text-align:center;padding:10px 20px 15px}.bac--user-sidebar-info .bac--user-image{display:inline-block;height:80px;width:80px;line-height:80px;text-align:center;color:#fff;border-radius:50%;background-color:#adadad;margin-bottom:15px}.bac--user-sidebar-info .bac--user-image i{font-size:32px}.bac--user-sidebar-info .bac--user-name{width:100%;text-align:center;font-size:18px;margin-bottom:10px}.bac--user-sidebar-info .bac--user-email{font-size:12px;font-weight:300}.bac--user-account-settings{padding:50px}.bac--user-account-settings .bac-user-acount-list-item{display:flex;align-items:center;margin-bottom:30px}.bac--user-account-settings .bac-user-acount-list-item a{text-decoration:none;color:#fff}.bac--user-account-settings .bac-user-acount-list-item i{font-size:24px;margin-right:20px}#--puresdk-account-logo--{cursor:pointer}',s=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css",o.styleSheet?o.styleSheet.cssText=i:o.appendChild(document.createTextNode(i)),s.appendChild(o);var r=document.createElement("link");r.href="https://file.myfontastic.com/MDvnRJGhBd5xVcXn4uQJSZ/icons.css",r.rel="stylesheet",document.getElementsByTagName("head")[0].appendChild(r),t.exports=a},{"./PPBA":1}],3:[function(e,t,n){var a=e("./store.js"),i=(e("./logger"),{makeCall:function(e){var t=e.endpoint,n=new XMLHttpRequest;n.open(e.type,t),n.setRequestHeader("Content-Type","application/json"),n.onload=function(){n.status>=200&&n.status<300?e.callbacks.success(JSON.parse(n.responseText)):200!==n.status&&e.callbacks.fail(JSON.parse(n.responseText))},e.params||(e.params={}),n.send(JSON.stringify(e.params))},promiseCall:function(e){return new Promise(function(t,n){var i=new XMLHttpRequest;i.open(e.type,e.endpoint),i.setRequestHeader("Content-Type","application/json"),i.onload=function(){this.status>=200&&this.status<300?(e.middlewares.success(JSON.parse(i.responseText)),t(JSON.parse(i.responseText))):window.location.href=a.getLoginUrl()},i.onerror=function(){window.location=a.getLoginUrl()},i.send()})}});t.exports=i},{"./logger":5,"./store.js":7}],4:[function(e,t,n){var a={hasClass:function(e,t){return e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.className)},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=" "+t},toggleClass:function(e,t){this.hasClass(e,t)?this.removeClass(e,t):this.addClass(e,t)}};t.exports=a},{}],5:[function(e,t,n){var a=e("./store.js"),i={log:function(e){return a.logsEnabled()?(i.log=console.log.bind(console),void i.log(e)):!1},error:function(e){return a.logsEnabled()?(i.error=console.error.bind(console),void i.error(e)):!1}};t.exports=i},{"./store.js":7}],6:[function(e,t,n){"use strict";var a=e("./store.js"),i=e("./logger.js"),s={searchKeyUp:{info:"Listener on keyUp of search input on top bar"},searchEnter:{info:"Listener on enter key pressed on search input on top bar"},searchOnChange:{info:"Listener on change of input value"}},o={getAvailableListeners:function(){return s},subscribe:function(e,t){if("searchKeyUp"===e){var n=document.getElementById(a.getSearchInputId());return n.addEventListener("keyup",t),function(){n.removeEventListener("keyup",t,!1)}}if("searchEnter"===e){var o=function(e){13===e.keyCode&&t(e)};return n.addEventListener("keydown",o),function(){n.removeEventListener("keydown",o,!1)}}if("searchOnChange"===e){var n=document.getElementById(a.getSearchInputId());return n.addEventListener("change",t),function(){n.removeEventListener("keyup",t,!1)}}return i.error("The event you tried to subscribe is not available by the library"),i.log("The available events are: ",s),function(){}}};t.exports=o},{"./logger.js":5,"./store.js":7}],7:[function(e,t,n){var a={general:{},userData:{},configuration:{},htmlTemplate:"",apps:null},i={getState:function(){return Object.assign({},a)},setWindowName:function(e){a.general.windowName=e},setConfiguration:function(e){a.configuration=e},getAppsVisible:function(){return null===a.configuration.appsVisible||void 0===a.configuration.appsVisible?!0:a.configuration.appsVisible},setAppsVisible:function(e){a.configuration.appsVisible=e},setHTMLTemplate:function(e){a.htmlTemplate=e},setApps:function(e){a.apps=e},getLoginUrl:function(){return a.configuration.rootUrl+a.configuration.loginUrl+"?"+a.configuration.redirectUrlParam+"="+window.location.href},getAuthenticationEndpoint:function(){return a.configuration.rootUrl+a.configuration.baseUrl+"session"},getSwitchAccountEndpoint:function(e){return a.configuration.rootUrl+a.configuration.baseUrl+"accounts/switch/"+e},getAppsEndpoint:function(){return a.configuration.rootUrl+a.configuration.baseUrl+"apps"},logsEnabled:function(){return a.configuration.logs},getSearchInputId:function(){return a.configuration.searchInputId},setHTMLContainer:function(e){a.configuration.headerDivId=e},getHTLMContainer:function(){return a.configuration.headerDivId?a.configuration.headerDivId:"ppsdk-container"},getHTML:function(){return a.htmlTemplate},getWindowName:function(){return a.general.windowName},setUserData:function(e){a.userData=e},getUserData:function(){return a.userData},setRootUrl:function(e){a.configuration.rootUrl=e}};t.exports=i},{}]},{},[2]);