webpackJsonp([17],{"4Evv":function(t,a){},IeHp:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("ODCk"),i=s("rLAy"),r=s("63CM"),n=s("62KO"),c=s("YxJB"),l=s("3Lt7"),p=s("/0UN"),o=s("hGvq"),d=s("2sLL"),v=s("pDNl"),m=s("rHil"),A=s("ALGc"),b=s("oWtu"),u=s("4FCr"),h=(r.a,e.a,i.a,n.a,c.a,l.a,p.a,o.a,d.a,v.a,m.a,A.a,b.a,u.a,{directives:{TransferDom:r.a},components:{dateFormat:e.a,Toast:i.a,Confirm:n.a,Flexbox:c.a,FlexboxItem:l.a,Checker:p.a,CheckerItem:o.a,XButton:d.a,XInput:v.a,Group:m.a,XTextarea:A.a,Icon:b.a,LoadMore:u.a},data:function(){return{nofreight:localStorage.getItem("nofreight")||"",freight:localStorage.getItem("freight")||"",type:"",id:"",url:"",data:{}}},created:function(){var t=this.$route.params.type/1,a=this.$route.params.id,s="";this.type=t,s=2===t?"order/orderintegraldetail/":"order/orderdetail/",this.getDetail(s,a)},methods:{getDetail:function(t,a){var s=this;this.axios.get(t+a).then(function(t){if(t.success){var a=t.data;a.createDate=Object(e.a)(a.createDate,"YYYY-MM-DD HH:mm:ss"),2!==s.type?a.orderprolist.length>0&&(a.orderLength=a.orderprolist.length,a.orderprolist.map(function(t,a){switch(t.pic=s.base_img+t.pic,t.types/1){case 0:t.type="";break;case 1:t.type="满赠";break;case 2:t.type="买赠"}})):(a.orderLength=1,a.payamount=a.integral,a.orderprolist=[{pid:a.proid,pic:s.base_img+a.propic,num:a.pronumber,ptitle:a.proname,amount:a.integral}]),s.data=a}})}}}),y={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{},[e("section",{staticClass:"status tac flex01 bb10"},[e("img",{attrs:{src:s("LfW8"),alt:""}}),t._v(" "),e("span",[t._v("订单状态：")]),t._v(" "),1===t.data.status?e("span",[t._v("未付款，请尽快去付款！")]):2===t.data.status?e("span",[t._v("已付款，等待卖家配货！")]):3===t.data.status?e("span",[t._v("已配货，等待卖家发货！")]):4===t.data.status?e("span",[t._v("已发货，等待买家确认收货！")]):5===t.data.status?e("span",[t._v("已确认收货！")]):10===t.data.status?e("span",[t._v("订单已被取消！")]):t._e()]),t._v(" "),e("section",{staticClass:"bb10"},[e("p",{staticClass:"p5-20 vux-1px-b"},[t._v("订单编号："+t._s(t.data.orderid))]),t._v(" "),e("div",{staticClass:" p5-20"},[e("p",{staticClass:"flex01"},[e("span",[t._v("收件人："+t._s(t.data.recive))]),t._v(" "),e("span",[t._v(t._s(t.data.mobile))])]),t._v(" "),e("p",[t._v(t._s(t.data.pname)+t._s(t.data.cname)+t._s(t.data.rname)+t._s(t.data.address))])])]),t._v(" "),t.data.invoice?e("section",{staticClass:"bb10"},[e("p",{staticClass:"p5-20 vux-1px-b"},[t._v("发票类型："+t._s(t.data.invoicebank))]),t._v(" "),e("p",{staticClass:"p5-20 vux-1px-b"},[t._v("发票抬头："+t._s(t.data.invoicetitle))]),t._v(" "),e("p",{staticClass:"p5-20"},[t._v("发票内容："+t._s(t.data.invoicecontext))])]):t._e(),t._v(" "),e("section",{staticClass:"bb10"},[e("ul",{},t._l(t.data.orderprolist,function(a,s){return e("li",{key:s,staticClass:"list1 vux-1px-b"},[e("flexbox",[e("flexbox-item",{attrs:{span:3}},[e("router-link",{staticClass:"flex-demo",attrs:{to:{name:"productDetail",params:{type:t.type,id:a.pid}}}},[e("img",{staticClass:"img-title",attrs:{src:a.pic,onerror:"this.src='static/images/errorImg.jpg'"}})])],1),t._v(" "),e("flexbox-item",{attrs:{span:7}},[e("p",{staticClass:"ptitle"},[t._v(t._s(a.ptitle))]),t._v(" "),e("p",{staticClass:"type"},[t._v(t._s(a.type))])]),t._v(" "),e("flexbox-item",{attrs:{span:2}},[e("div",{staticClass:"flex-demo"},[2===t.type?e("p",[t._v(t._s(a.amount/a.num)+"积分")]):e("p",[t._v("￥"+t._s(a.amount/a.num))]),t._v(" "),e("p",{staticClass:"flex01-1"},[e("svg",{staticClass:"vux-x-icon vux-x-icon-ios-close-empty",attrs:{type:"ios-close-empty",size:"20",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 512 512"}},[e("path",{staticClass:"st0",attrs:{d:"M340.2 160l-84.4 84.3-84-83.9-11.8 11.8 84 83.8-84 83.9 11.8 11.7 84-83.8 84.4 84.2 11.8-11.7-84.4-84.3 84.4-84.2z"}})]),t._v(t._s(a.num))])])])],1)],1)}),0),t._v(" "),e("p",{staticClass:"p5-20 tar"},[t._v("\n      共"+t._s(t.data.orderLength)+"件商品 实付\n      "),2===t.type?e("span",[t._v("积分")]):e("span",[t._v("金额")]),t._v("："+t._s(t.data.payamount)+"\n      "),t.data.amount<=t.nofreight?e("span",[t._v("(含运费："+t._s(t.freight)+")")]):t._e()])]),t._v(" "),e("section",{staticClass:"bb10"},[e("p",{staticClass:"p5-20"},[t._v("买家留言："+t._s(t.data.buyer))])]),t._v(" "),e("section",{staticClass:"createDate"},[e("p",{staticClass:"p5-20"},[t._v("成交时间："),e("span",[t._v(t._s(t.data.createDate))])])])])},staticRenderFns:[]};var g=s("VU/8")(h,y,!1,function(t){s("4Evv")},"data-v-785bdf54",null);a.default=g.exports},LfW8:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0OTU2YTlkOC01NDAyLWNkNDYtYmRhNy0xODE3MTc4ZDhkZTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzI3MjVDN0Q5N0FDMTFFOEE4QkQ4RENBRERFNEJFMkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzI3MjVDN0M5N0FDMTFFOEE4QkQ4RENBRERFNEJFMkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Y2U3MmQzNzktNTJlMS0wYTQ1LTg0NDctNzE2OGNjOTEzYzdlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDI2NWMwYTYtNWNiZC0xMWU4LThiY2Ut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"}});
//# sourceMappingURL=17.2779d71df1213a7eb3be.js.map