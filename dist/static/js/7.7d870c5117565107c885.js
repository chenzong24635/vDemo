webpackJsonp([7],{EbL4:function(t,e,a){var n,s;void 0===(s="function"==typeof(n=function(t,e,a){return function(t,e,a,n,s,o){function r(t){return"number"==typeof t&&!isNaN(t)}var i=this;if(i.version=function(){return"1.9.3"},i.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:function(t,e,a,n){return a*(1-Math.pow(2,-10*t/n))*1024/1023+e},formattingFn:function(t){var e,a,n,s,o,r,u=t<0;if(t=Math.abs(t).toFixed(i.decimals),a=(e=(t+="").split("."))[0],n=e.length>1?i.options.decimal+e[1]:"",i.options.useGrouping){for(s="",o=0,r=a.length;o<r;++o)0!==o&&o%3==0&&(s=i.options.separator+s),s=a[r-o-1]+s;a=s}return i.options.numerals.length&&(a=a.replace(/[0-9]/g,function(t){return i.options.numerals[+t]}),n=n.replace(/[0-9]/g,function(t){return i.options.numerals[+t]})),(u?"-":"")+i.options.prefix+a+n+i.options.suffix},prefix:"",suffix:"",numerals:[]},o&&"object"==typeof o)for(var u in i.options)o.hasOwnProperty(u)&&null!==o[u]&&(i.options[u]=o[u]);""===i.options.separator?i.options.useGrouping=!1:i.options.separator=""+i.options.separator;for(var c=0,l=["webkit","moz","ms","o"],p=0;p<l.length&&!window.requestAnimationFrame;++p)window.requestAnimationFrame=window[l[p]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[l[p]+"CancelAnimationFrame"]||window[l[p]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,e){var a=(new Date).getTime(),n=Math.max(0,16-(a-c)),s=window.setTimeout(function(){t(a+n)},n);return c=a+n,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)}),i.initialize=function(){return!(!i.initialized&&(i.error="",i.d="string"==typeof t?document.getElementById(t):t,i.d?(i.startVal=Number(e),i.endVal=Number(a),r(i.startVal)&&r(i.endVal)?(i.decimals=Math.max(0,n||0),i.dec=Math.pow(10,i.decimals),i.duration=1e3*Number(s)||2e3,i.countDown=i.startVal>i.endVal,i.frameVal=i.startVal,i.initialized=!0,0):(i.error="[CountUp] startVal ("+e+") or endVal ("+a+") is not a number",1)):(i.error="[CountUp] target is null or undefined",1)))},i.printValue=function(t){var e=i.options.formattingFn(t);"INPUT"===i.d.tagName?this.d.value=e:"text"===i.d.tagName||"tspan"===i.d.tagName?this.d.textContent=e:this.d.innerHTML=e},i.count=function(t){i.startTime||(i.startTime=t),i.timestamp=t;var e=t-i.startTime;i.remaining=i.duration-e,i.options.useEasing?i.countDown?i.frameVal=i.startVal-i.options.easingFn(e,0,i.startVal-i.endVal,i.duration):i.frameVal=i.options.easingFn(e,i.startVal,i.endVal-i.startVal,i.duration):i.countDown?i.frameVal=i.startVal-(i.startVal-i.endVal)*(e/i.duration):i.frameVal=i.startVal+(i.endVal-i.startVal)*(e/i.duration),i.countDown?i.frameVal=i.frameVal<i.endVal?i.endVal:i.frameVal:i.frameVal=i.frameVal>i.endVal?i.endVal:i.frameVal,i.frameVal=Math.round(i.frameVal*i.dec)/i.dec,i.printValue(i.frameVal),e<i.duration?i.rAF=requestAnimationFrame(i.count):i.callback&&i.callback()},i.start=function(t){i.initialize()&&(i.callback=t,i.rAF=requestAnimationFrame(i.count))},i.pauseResume=function(){i.paused?(i.paused=!1,delete i.startTime,i.duration=i.remaining,i.startVal=i.frameVal,requestAnimationFrame(i.count)):(i.paused=!0,cancelAnimationFrame(i.rAF))},i.reset=function(){i.paused=!1,delete i.startTime,i.initialized=!1,i.initialize()&&(cancelAnimationFrame(i.rAF),i.printValue(i.startVal))},i.update=function(t){if(i.initialize()){if(!r(t=Number(t)))return void(i.error="[CountUp] update() - new endVal is not a number: "+t);i.error="",t!==i.frameVal&&(cancelAnimationFrame(i.rAF),i.paused=!1,delete i.startTime,i.startVal=i.frameVal,i.endVal=t,i.countDown=i.startVal>i.endVal,i.rAF=requestAnimationFrame(i.count))}},i.initialize()&&i.printValue(i.startVal)}})?n.call(e,a,e,t):n)||(t.exports=s)},EmH9:function(t,e,a){"use strict";var n=a("oWtu"),s=(n.a,Boolean,String,{name:"check-icon",components:{Icon:n.a},methods:{updateValue:function(){this.$emit("update:value",!this.value)}},props:{value:{type:Boolean,default:!1},type:{type:String,default:"default"}}}),o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"vux-check-icon",on:{click:t.updateValue}},[a("icon",{directives:[{name:"show",rawName:"v-show",value:"default"===t.type&&t.value,expression:"type === 'default' && value"}],attrs:{type:"success"}}),t._v(" "),a("icon",{directives:[{name:"show",rawName:"v-show",value:"plain"===t.type&&t.value,expression:"type === 'plain' && value"}],attrs:{type:"success_circle"}}),t._v(" "),a("icon",{directives:[{name:"show",rawName:"v-show",value:!t.value,expression:"!value"}],attrs:{type:"circle"}}),t._v(" "),a("span",[t._t("default")],2)],1)},staticRenderFns:[]};var r=a("VU/8")(s,o,!1,function(t){a("oscO")},null,null);e.a=r.exports},FYUJ:function(t,e,a){"use strict";var n=a("EbL4"),s=a.n(n),o=(String,Boolean,Number,Number,Number,Number,Object,{name:"countup",mounted:function(){var t=this;this.$nextTick(function(){t._countup=new s.a(t.$el,t.startVal,t.endVal,t.decimals,t.duration,t.options),t.start&&t._countup.start()})},props:{tag:{type:String,default:"span"},start:{type:Boolean,default:!0},startVal:{type:Number,default:0},endVal:{type:Number,required:!0},decimals:{type:Number,default:0},duration:{type:Number,default:2},options:{type:Object,default:function(){return{}}}},render:function(t){return t(this.tag,{},[this.startVal])},watch:{start:function(t){t&&this._countup.start()},endVal:function(t){this._countup.update(t)}}}),r=a("VU/8")(o,null,!1,null,null,null);e.a=r.exports},Neie:function(t,e){},oscO:function(t,e){},t39Q:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),s=a.n(n),o=a("exGp"),r=a.n(o),i=a("Dd8w"),u=a.n(i),c=a("NYxO"),l=a("rHil"),p=a("pDNl"),m=a("2sLL"),d=a("rLAy"),f=a("FYUJ"),h=a("EmH9"),w=a("0xDb"),v=(l.a,p.a,m.a,d.a,f.a,h.a,u()({},Object(c.b)(["components"]),{sendCode:function(){var t=this;return r()(s.a.mark(function e(){var a,n,o;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if((a=t.json.mobile)&&Object(w.d)(a)){e.next=4;break}return t.toast1("请填写正确手机号"),e.abrupt("return",!1);case 4:return e.next=6,t.axios.post("common/sendMessageAnd",{mobile:t.json.mobile,type:1});case 6:if(!(n=e.sent).success){e.next=12;break}t.toast("验证码已发送"),t.buttonStatus=!0,e.next=14;break;case 12:return t.toast1(n.message),e.abrupt("return",!1);case 14:o=setInterval(function(){if(t.counts<=0)return t.buttonStatus=!1,void clearInterval(o);t.counts--},1e3),console.log(1);case 16:case"end":return e.stop()}},e,t)}))()},submit:function(){var t="",e=0;this.json.mobile.trim()?this.json.password.trim()?this.password1.trim()?this.json.password!==this.password1?t="两次密码不一致":this.json.code.trim()?e=1:t="请填写验证码":t="请填写新密码":t="请填写密码":t="请填写手机号",e?this.set():this.toast1(t)},set:function(){var t=this;return r()(s.a.mark(function e(){var a,n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.axios.post("member/register",t.json);case 2:if(!(a=e.sent).success){e.next=8;break}t.toast("账号已创建"),n=setTimeout(function(){console.log("login"),t.$router.push({name:"login"}),clearTimeout(n)},1e3),e.next=10;break;case 8:return t.toast1(a.message),e.abrupt("return",!1);case 10:case"end":return e.stop()}},e,t)}))()},toast:function(t){this.showToast=!0,this.toastText=t},toast1:function(t){this.showToast1=!0,this.toastText1=t}}),{name:"",components:{Group:l.a,XInput:p.a,XButton:m.a,Toast:d.a,Countup:f.a,CheckIcon:h.a},data:function(){return{checkValue:!0,showToast:!1,toastText:"",showToast1:!1,toastText1:"",buttonStatus:!1,mobile:"",password:"",password1:"",code:"",counts:60,json:{code:"",mobile:"",password:"",source:2,username:""}}},destroyed:function(){this.components([!0,!0,!0])},mounted:function(){this.components([!1,!1,!1])},methods:u()({},Object(c.b)(["components"]),{sendCode:function(){var t=this;return r()(s.a.mark(function e(){var a,n,o;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if((a=t.json.mobile)&&Object(w.d)(a)){e.next=4;break}return t.toast1("请填写正确手机号"),e.abrupt("return",!1);case 4:return e.next=6,t.axios.post("common/sendMessageAnd",{mobile:t.json.mobile,type:1});case 6:if(!(n=e.sent).success){e.next=12;break}t.toast("验证码已发送"),t.buttonStatus=!0,e.next=14;break;case 12:return t.toast1(n.message),e.abrupt("return",!1);case 14:o=setInterval(function(){if(t.counts<=0)return t.buttonStatus=!1,void clearInterval(o);t.counts--},1e3),console.log(1);case 16:case"end":return e.stop()}},e,t)}))()},submit:function(){var t="",e=0;this.json.mobile.trim()?this.json.password.trim()?this.password1.trim()?this.json.password!==this.password1?t="两次密码不一致":this.json.code.trim()?e=1:t="请填写验证码":t="请填写新密码":t="请填写密码":t="请填写手机号",e?this.set():this.toast1(t)},set:function(){var t=this;return r()(s.a.mark(function e(){var a,n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.axios.post("member/register",t.json);case 2:if(!(a=e.sent).success){e.next=8;break}t.toast("账号已创建"),n=setTimeout(function(){console.log("login"),t.$router.push({name:"login"}),clearTimeout(n)},1e3),e.next=10;break;case 8:return t.toast1(a.message),e.abrupt("return",!1);case 10:case"end":return e.stop()}},e,t)}))()},toast:function(t){this.showToast=!0,this.toastText=t},toast1:function(t){this.showToast1=!0,this.toastText1=t}})}),b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("router-link",{staticClass:"return",attrs:{to:"/login"}},[a("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-left",attrs:{type:"ios-arrow-left",size:"30",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 512 512"}},[a("path",{attrs:{d:"M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"}})])]),t._v(" "),a("form",{staticClass:"form",attrs:{action:""}},[a("group",{staticClass:"form-list"},[a("x-input",{attrs:{title:"手机号",type:"tel",placeholder:"请输入手机号"},model:{value:t.json.mobile,callback:function(e){t.$set(t.json,"mobile",e)},expression:"json.mobile"}})],1),t._v(" "),a("group",{staticClass:"form-list"},[a("x-input",{attrs:{title:"密码",type:"password",placeholder:"请输入密码"},model:{value:t.json.password,callback:function(e){t.$set(t.json,"password",e)},expression:"json.password"}})],1),t._v(" "),a("group",{staticClass:"form-list"},[a("x-input",{attrs:{title:"确认密码",type:"password",placeholder:"请再次输入密码"},model:{value:t.password1,callback:function(e){t.password1=e},expression:"password1"}})],1),t._v(" "),a("group",{staticClass:"form-list"},[a("x-input",{attrs:{title:"验证码",type:"text",placeholder:"请输入验证码"},model:{value:t.json.code,callback:function(e){t.$set(t.json,"code",e)},expression:"json.code"}}),t._v(" "),a("x-button",{attrs:{disabled:t.buttonStatus,id:"sendCode",type:"primary","action-type":"button"},nativeOn:{click:function(e){return t.sendCode(e)}}},[t.buttonStatus?a("span",[t._v(t._s(t.counts)+"s")]):a("span",[t._v("发送验证码")])])],1),t._v(" "),a("div",{staticClass:"check tac",attrs:{id:"check"}},[a("check-icon",{attrs:{value:t.checkValue,type:"plain"},on:{"update:value":function(e){t.checkValue=e}}},[t._v("\n        我已阅读并同意\n      ")]),t._v(" "),a("router-link",{staticClass:"tk",attrs:{to:""}},[t._v("《Beli品牌官网条款》")])],1),t._v(" "),a("x-button",{attrs:{id:"sure",type:"primary","action-type":"button"},nativeOn:{click:function(e){return t.submit(e)}}},[t._v("创建账号")])],1),t._v(" "),a("toast",{attrs:{type:"success",width:"45vw",time:1e3,"is-show-mask":!0,text:t.toastText,position:"middle"},model:{value:t.showToast,callback:function(e){t.showToast=e},expression:"showToast"}}),t._v(" "),a("toast",{attrs:{type:"warn",width:"45vw",time:1e3,"is-show-mask":!0,text:t.toastText1,position:"middle"},model:{value:t.showToast1,callback:function(e){t.showToast1=e},expression:"showToast1"}})],1)},staticRenderFns:[]};var x=a("VU/8")(v,b,!1,function(t){a("Neie")},"data-v-4283829c",null);e.default=x.exports}});
//# sourceMappingURL=7.7d870c5117565107c885.js.map