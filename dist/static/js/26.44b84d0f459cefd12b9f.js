webpackJsonp([26],{"/p59":function(t,e){},lmcN:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),s=a.n(n),r=a("exGp"),i=a.n(r),c=a("0xDb"),d={name:"",components:{},data:function(){return{id:"",title:"",date:"",wap:""}},created:function(){var t=this;return i()(s.a.mark(function e(){var a,n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.$route.params.id/1,t.id=a,e.next=4,t.axios.get("/web/newdetail/"+a);case 4:n=e.sent,t.title=n.data.title,t.date=Object(c.b)(n.data.createDate),t.wap=n.data.wap;case 8:case"end":return e.stop()}},e,t)}))()},methods:{}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"detail"},[a("h1",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),a("time",{staticClass:"time"},[t._v(t._s(t.date))]),t._v(" "),a("div",{staticClass:"wap",domProps:{innerHTML:t._s(t.wap)}})])},staticRenderFns:[]};var u=a("VU/8")(d,o,!1,function(t){a("/p59")},"data-v-2e24b1a8",null);e.default=u.exports}});
//# sourceMappingURL=26.44b84d0f459cefd12b9f.js.map