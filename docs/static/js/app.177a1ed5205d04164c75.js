webpackJsonp([1],Array(21).concat([function(t,e,n){"use strict";function o(t){n(79)}var i=n(41),a=n(137),r=n(4),s=o,c=r(i.a,a.a,!1,s,"data-v-50255c36",null);e.a=c.exports},,,,,,,,,,,,,,,,,function(t,e,n){"use strict";n.d(e,"a",function(){return u});var o=n(55),i=n.n(o),a=n(13),r=n.n(a),s=n(14),c=n.n(s),l="pkey_84N12fk7d9kderRe9d3sdPm9",u=function(){function t(){r()(this,t)}return c()(t,[{key:"getPid",value:function(t){return this.restGetParticipation(t).then(function(t){return i()(t.data).length})}},{key:"restGetConversation",value:function(t){return axios({method:"get",url:"https://polis-api-proxy.herokuapp.com/api/v3/conversations/"+t,headers:{Authorization:l},responseType:"json"})}},{key:"restGetParticipation",value:function(t){return axios({method:"get",url:"https://polis-api-proxy.herokuapp.com/api/v3/conversations/"+t+"/participation",headers:{Authorization:l},responseType:"json"})}},{key:"restGetNextComment",value:function(t){return axios({url:"https://polis-api-proxy.herokuapp.com/api/v3/conversations/"+t+"/nextComment",method:"get",responseType:"json",headers:{Authorization:l}})}},{key:"restPostVote",value:function(t,e,n,o,i){return axios({url:"https://polis-api-proxy.herokuapp.com/api/v3/votes",method:"post",responseType:"json",headers:{Authorization:l,accept:"application/json","Content-Type":"application/json"},data:{agid:t,conversation_id:e,pid:n,tid:o,vote:i}})}},{key:"restPostComment",value:function(t,e,n,o){return axios({url:"https://polis-api-proxy.herokuapp.com/api/v3/conversations/"+e+"/comments",method:"post",responseType:"json",headers:{Authorization:l},data:{agid:t,conversation_id:e,pid:n,txt:o,is_seed:!0,vote:-1}})}}]),t}()},function(t,e,n){"use strict";function o(t){n(133)}var i=n(61),a=n(134),r=n(4),s=o,c=r(i.a,a.a,!1,s,null,null);e.a=c.exports},function(t,e,n){"use strict";e.a={data:function(){return{clipped:!1,drawer:!1,fixed:!1,items:[{title:"Ready?",text:"Click on the icons below and explore the debates in your area!"},{title:"Scan the sticker",text:"If you find Holopolis sticker on the street, scan it and enter the conversation."},{title:"For more information",text:"Click on information icon at the upper left corner to find out more."}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Holopolis-Map",toolbar:!0,info:!1}},methods:{showtoolbar:function(){"/"==this.$route.name||"intro"==this.$route.name?this.toolbar=!1:this.toolbar=!0},showinfo:function(){console.log(this.info),this.info=!this.info}},created:function(){function t(t){!0===window.holopolisPreventTouchBehavior&&t.preventDefault()}this.showtoolbar(),window.holopolisPreventTouchBehavior=!0,document.addEventListener("touchmove",t,{passive:!1})},watch:{$route:function(){this.showtoolbar()}},name:"App"}},function(t,e,n){"use strict";var o=n(22),i=n.n(o),a=n(100),r=n(127),s=(n.n(r),n(56)),c=new a.a;e.a={name:"worldmap",components:{LMap:r.LMap,LTileLayer:r.LTileLayer,LMarker:r.LMarker,LPopup:r.LPopup,vote:s.a},data:function(){return{zoom:13,center:c.getMapDefaultCenter(),url:"https://{s}.tile.osm.org/{z}/{x}/{y}.png",attribution:'&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',markers:[],dialog:!1,selectedMarker:null,shareConversation:null,share:!1}},methods:{showPosition:function(t){this.center=t,this.zoom=15},showMarkers:function(t){this.markers=t},selectMarker:function(t){var e=this;c.getMarkerInfo(t).then(function(t){var n=i()(t,2),o=n[0],a=n[1];e.markers=a,e.selectedMarker=o,e.selectedMarker.conversations[0].datediff=e.datediff(e.selectedMarker.conversations[0].created),e.dialog=!0})},datediff:function(t){var e=(new Date).getTime(),n=e-t;return Math.floor(n/1e3/60/60/24)}},created:function(){var t=this;c.getGpsCenter().then(function(e){var n=document.getElementById("map-main-holder");n.style.height=+window.innerHeight-56+"px",n.style.top="56px",t.showPosition(e),c.getMapMarkers(e).then(t.showMarkers)})}}},,,,,,,,,,,,,,,function(t,e,n){"use strict";function o(t){n(129)}var i=n(57),a=n(136),r=n(4),s=o,c=r(i.a,a.a,!1,s,null,null);e.a=c.exports},function(t,e,n){"use strict";var o=n(22),i=n.n(o),a=n(130),r=n(59),s=n(39),c=new a.a;e.a={components:{opinion:r.a,login:s.a},data:function(){return{visualization:!1,isConversationReady:!1,conversationData:{},conversationId:this.$route.params.id,opinionData:null}},methods:{toggleReadMore:function(){this.conversationData.toggledShort=!this.conversationData.toggledShort,this.conversationData.description=this.conversationData.toggledShort?this.conversationData.shortDescription:this.conversationData.longDescription},voteYes:function(){c.voteYes().then(this.loadNextOpinion).catch(console.error)},voteNo:function(){c.voteNo().then(this.loadNextOpinion).catch(console.error)},skipVote:function(){c.skipVote().then(this.loadNextOpinion).catch(console.error)},loadNextOpinion:function(){var t=this;this.isConversationReady=!1,c.loadNextOpinion(this.conversationId).then(function(e){t.opinionData=e,t.isConversationReady=!0})}},created:function(){var t=this;c.initPage(this.conversationId).then(function(e){var n=i()(e,3),o=n[0],a=n[1];n[2];window.holopolisPreventTouchBehavior=!1,t.opinionData=a,t.conversationData=o,t.isConversationReady=!0}).catch(function(e){console.error(e),t.$router.push("/login")})},destroyed:function(){window.holopolisPreventTouchBehavior=!0}}},function(t,e,n){"use strict";n.d(e,"a",function(){return d});var o=n(35),i=n.n(o),a=n(55),r=n.n(a),s=n(13),c=n.n(s),l=n(14),u=n.n(l),d=function(){function t(){c()(this,t),window.holopolisOpinionStore||(window.holopolisOpinionStore={"3n3dxmbjwt":{3:{txt:"Voy a veces a La Ingobernable por que hacen fiestas increíbles, con su buena música, cerveza barata y comida decente.",tid:3,created:"1542118723629",tweet_id:null,quote_src_url:null,is_seed:!0,is_meta:!1,lang:"es",pid:0,randomN:14.865603912521882,remaining:37,total:37,translations:[],dotdotdot:"Voy a veces a La Ingobernable por que hacen fiestas increíbles, con su buena música, cerveza bar ···"},11:{txt:"string",tid:11,created:"1542197379905",tweet_id:null,quote_src_url:null,is_seed:!0,is_meta:!1,lang:"en",pid:0,randomN:28.392291951090744,remaining:37,total:37,translations:[],dotdotdot:"string"},14:{txt:"Me parece perfecto que siga abierta.",tid:14,created:"1542199372659",tweet_id:null,quote_src_url:null,is_seed:!0,is_meta:!1,lang:"es",pid:0,randomN:219.67840584763005,remaining:37,total:37,translations:[],dotdotdot:"Me parece perfecto que siga abierta."},15:{txt:"Deberían hacer algo.",tid:15,created:"1542199395899",tweet_id:null,quote_src_url:null,is_seed:!0,is_meta:!1,lang:"es",pid:0,randomN:272.6263622900424,remaining:37,total:37,translations:[],dotdotdot:"Deberían hacer algo."},16:{txt:"cwcwece",tid:16,created:"1542200980661",tweet_id:null,quote_src_url:null,is_seed:!0,is_meta:!1,lang:"cy",pid:0,randomN:295.5182634453969,remaining:37,total:37,translations:[],dotdotdot:"cwcwece"},17:{txt:"hjk",tid:17,created:"1542201055833",tweet_id:null,quote_src_url:null,is_seed:!0,is_meta:!1,lang:"fi",pid:0,randomN:654.0221790592196,remaining:37,total:37,translations:[],dotdotdot:"hjk"},19:{txt:"尼豪媽",tid:19,created:"1542201480208",tweet_id:null,quote_src_url:null,is_seed:!0,is_meta:!1,lang:"zh-TW",pid:0,randomN:822.3875814548603,remaining:37,total:37,translations:[],dotdotdot:"尼豪媽"},22:{txt:"Me encanta la ingobernable, qué más decir.",tid:22,created:"1542204923165",tweet_id:null,quote_src_url:null,is_seed:!0,is_meta:!1,lang:"es",pid:0,randomN:908.5233199775795,remaining:37,total:37,translations:[],dotdotdot:"Me encanta la ingobernable, qué más decir."},25:{txt:"Love it",tid:25,created:"1542213294885",tweet_id:null,quote_src_url:null,is_seed:!0,is_meta:!1,lang:"en",pid:0,randomN:947.865678359777,remaining:37,total:37,translations:[],dotdotdot:"Love it"},26:{txt:"HOLA!",tid:26,created:"1542282508143",tweet_id:null,quote_src_url:null,is_seed:!0,is_meta:!1,lang:"es",pid:0,randomN:950.7791360214356,remaining:37,total:37,translations:[],dotdotdot:"HOLA!"}}}),this.store=window.holopolisOpinionStore}return u()(t,[{key:"saveOpinion",value:function(t,e){this.store[t]=this.store[t]||{},this.store[t][e.tid]=e}},{key:"getOpinionsByConversationId",value:function(t){var e=this;return this.store[t]?r()(this.store[t]).map(function(n){return e.store[t][n]}).map(function(t){return i()({notAgreed:!0},t)}):[]}}]),t}()},function(t,e,n){"use strict";function o(t){n(131)}var i=n(60),a=n(135),r=n(4),s=o,c=r(i.a,a.a,!1,s,null,null);e.a=c.exports},function(t,e,n){"use strict";var o=n(132),i=n(39),a=new o.a;e.a={components:{login:i.a},data:function(){return{conversation:null,conversationId:this.$route.params.id,opinionInput:"",suggestions:[],thankscard:!1}},methods:{agreeSuggestion:function(t){var e=this;a.agreeSuggestion(t).then(function(t){e.suggestions=t})},backToVote:function(){this.$router.push("/vote/"+this.$route.params.id)},showSuggestions:function(){this.suggestions=a.getSuggestionsFor(this.opinionInput)},publishOpinion:function(){var t=this;a.publishOpinion(this.opinionInput).then(function(){console.log("go back to vote again"),t.thankscard=!0}).catch(function(t){console.log("server failure, try again later"),console.error(t)})}},created:function(){var t=this;a.initPage(this.conversationId).then(function(e){window.holopolisPreventTouchBehavior=!1,t.conversation=e}).catch(function(e){console.error(e),t.$router.push("/login")})},destroyed:function(){window.holopolisPreventTouchBehavior=!0}}},function(t,e,n){"use strict";var o=n(21);e.a={components:{worldmap:o.a}}},function(t,e,n){"use strict";var o=n(21);e.a={name:"App",components:{worldmap:o.a}}},function(t,e,n){"use strict";e.a={data:function(){return{items:[{title:"LOCALIZE",src:"https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/localize.png?raw=true"},{title:"DISCOVER",src:"https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/discover.png?raw=true"},{title:"VOTE",src:"https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/vote.png?raw=true"},{title:"CONTRIBUTE",src:"https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/contribute.png?raw=true"},{title:"LEARNING",src:"https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/learning.png?raw=true"}],clientHeight:"",e1:0,active:null}},created:function(){this.clientHeight=""+document.documentElement.clientHeight,window.onresize=function(){this.clientHeight=document.documentElement.clientHeight+"px"},this.hide=!1}}},function(t,e,n){"use strict";e.a={data:function(){return{popup:!1}},methods:{onDecode:function(t){this.$router.push("/vote/3n3dxmbjwt")},onInit:function(){document.getElementById("qrcode-stream-container").querySelector("video").style.height=+window.innerHeight-56+"px"}}}},,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(69),i=(n.n(o),n(15)),a=n(74),r=n(77),s=n(146),c=n.n(s),l=n(147),u=(n.n(l),n(148)),d=(n.n(u),n(150)),h=n(171),v=n.n(h);i.default.use(c.a,{iconfont:"fa4"}),i.default.use(d.default),i.default.use(v.a),i.default.config.productionTip=!1,delete L.Icon.Default.prototype._getIconUrl,L.Icon.Default.mergeOptions({iconRetinaUrl:n(172),iconUrl:n(149),shadowUrl:n(173)}),new i.default({el:"#app",router:r.a,components:{App:a.a},template:"<App/>"})},function(t,e){},,,,,function(t,e,n){"use strict";var o=n(40),i=n(75),a=n(4),r=a(o.a,i.a,!1,null,null,null);e.a=r.exports},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[t.toolbar?o("v-toolbar",{attrs:{app:"","clipped-left":t.clipped,color:"teal accent-2","align-center":""}},[o("v-layout",{attrs:{"align-center":"","justify-space-between":"",row:"","fill-height":""}},[o("v-btn",{attrs:{icon:""},nativeOn:{click:function(e){t.showinfo()}}},[o("v-icon",{attrs:{large:""}},[t._v("info")])],1),t._v(" "),o("v-btn",{attrs:{flat:"",to:"/index",exact:"","active-class":""}},[o("img",{attrs:{src:n(76),height:"40",width:"143.2"}})]),t._v(" "),o("v-btn",{attrs:{icon:"",to:"/camera",exact:""}},[o("v-icon",{attrs:{large:""}},[t._v("photo_camera")])],1)],1)],1):t._e(),t._v(" "),o("v-content",[o("v-bottom-sheet",{model:{value:t.info,callback:function(e){t.info=e},expression:"info"}},[o("v-carousel",{attrs:{height:"15em","hide-controls":"",interval:"99999"}},t._l(t.items,function(e,n){return o("v-carousel-item",{key:n,staticStyle:{opacity:"0.6"},attrs:{src:"https://static-cdn.jtvnw.net/jtv_user_pictures/e91a3dcf-c15a-441a-b369-996922364cdc-profile_image-300x300.png"}},[o("v-jumbotron",{attrs:{dark:""}},[o("v-container",{attrs:{"fill-height":""}},[o("v-layout",{attrs:{"align-start":""}},[o("v-flex",[o("h3",{staticClass:"headline mb-0 cyan--text"},[t._v(t._s(e.title))]),t._v(" "),o("div",[t._v(t._s(e.text))])])],1)],1)],1)],1)}))],1),t._v(" "),o("router-view")],1)],1)},i=[],a={render:o,staticRenderFns:i};e.a=a},function(t,e,n){t.exports=n.p+"static/img/logo.a3c8d54.png"},function(t,e,n){"use strict";var o=n(15),i=n(78),a=n(21),r=n(138),s=n(56),c=n(59),l=n(39),u=n(140),d=n(143);o.default.use(i.a),e.a=new i.a({routes:[{path:"/",name:"/",component:u.a},{path:"/index",name:"/index",component:r.a},{path:"/worldmap",name:"worldmap",component:a.a},{path:"/vote/:id",name:"vote",component:s.a},{path:"/opinion/:id",name:"opinion",component:c.a},{path:"/login",name:"login",component:l.a},{path:"/intro",name:"intro",component:u.a},{path:"/camera",name:"camera",component:d.a}]})},,function(t,e){},,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";n.d(e,"a",function(){return h});var o=n(35),i=n.n(o),a=n(36),r=n.n(a),s=n(13),c=n.n(s),l=n(14),u=n.n(l),d=n(38),h=function(){function t(){c()(this,t),this.gateway=new d.a,this.markers=[{id:1,name:"Atocha Renfe",conversation_ids:["92km3zkksd"],coords:{latitude:40.40613,longitude:-3.6903},logo:"https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/SPACES.png?raw=true",icon:L.icon({iconUrl:"https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/PublicSpaces.gif?raw=true",iconSize:[32,47.2]})},{id:2,name:"Why Madrid Should Be Your Next Vacation Destination",conversation_ids:["3eeru2dfur"],coords:{latitude:40.41163,longitude:-3.69293},logo:"https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/EQUALITY.png?raw=true",icon:L.icon({iconUrl:"https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/Equality.gif?raw=true",iconSize:[32,47.2]})},{id:3,name:"Instituto Nacional de Administración Pública",conversation_ids:["6amx5ecten"],coords:{latitude:40.40969,longitude:-3.6953},logo:"https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/HEALTH.png?raw=true",icon:L.icon({iconUrl:"https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/Health.gif?raw=true",iconSize:[32,47.2]})},{id:4,name:"Real Jardín Botánico de Madrid",conversation_ids:["4rffhe8wa9"],coords:{latitude:40.41109,longitude:-3.68978},logo:"https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/EDUCATION.png?raw=true",icon:L.icon({iconUrl:"https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/EDUCATION.gif?raw=true",iconSize:[32,47.2]})}]}return u()(t,[{key:"getMapDefaultCenter",value:function(){return{coords:{latitude:40.40613,longitude:-3.6903}}}},{key:"getGpsCenter",value:function(){var t=this;return new r.a(function(t,e){navigator.geolocation?navigator.geolocation.getCurrentPosition(t,e):e("Geo Location not supported by browser")}).catch(function(e){return console.error(e),t.getMapDefaultCenter()})}},{key:"getMarkerInfo",value:function(t){var e=this;if(void 0!=t.conversations)return new r.a(function(n){return n([t,e.markers])});var n=t.conversation_ids.map(function(t){return e.gateway.restGetConversation(t)}).map(function(t){return t.then(function(t){return t.data})});return r.a.all(n).then(function(n){var o=i()({conversations:n},t);return e.markers=e.markers.filter(function(t){return t.id!==o.id}),e.markers.push(o),[o,e.markers]})}},{key:"getMapMarkers",value:function(){var t=this;return new r.a(function(e){return e(t.markers)})}}]),t}()},,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e,n){"use strict";n.d(e,"a",function(){return d});var o=n(36),i=n.n(o),a=n(13),r=n.n(a),s=n(14),c=n.n(s),l=n(38),u=n(58),d=function(){function t(){r()(this,t),this.gateway=new l.a,this.conversationId=null,this.opinionData=null,this.participationId=null,this.opinionStore=new u.a}return c()(t,[{key:"initPage",value:function(t){var e=this,n=this.gateway.restGetConversation(t).then(function(t){var e=t.data.description,n=e,o=e;return e.length>100&&(o=e.substr(0,96)+" ···",e=o),{topic:t.data.topic,description:e,shortDescription:o,longDescription:n,descriptionIsLong:n.length>o.length,toggledShort:!0}}),o=this.loadNextOpinion(t),a=this.gateway.getPid(t).then(function(t){e.participationId=t});return i.a.all([n,o,a])}},{key:"loadNextOpinion",value:function(t){var e=this;return this.gateway.restGetNextComment(t).then(function(n){return e.opinionData=n.data,e.conversationId=t,e.opinionStore.saveOpinion(t,e.opinionData),e.opinionData})}},{key:"voteYes",value:function(){var t=this;return this._voteInternal(1).then(function(){t.opinionData.notAgreed=!1,t.opinionStore.saveOpinion(t.conversationId,t.opinionData)})}},{key:"voteNo",value:function(){return this._voteInternal(-1)}},{key:"skipVote",value:function(){return this._voteInternal(0)}},{key:"_voteInternal",value:function(t){if(null===this.conversationId||null==this.participationId||null==this.opinionData)throw new Error("load participation id and a opinion first!");return this.gateway.restPostVote(0,this.conversationId,this.participationId,this.opinionData.tid,t)}}]),t}()},function(t,e){},function(t,e,n){"use strict";n.d(e,"a",function(){return f});var o=n(35),i=n.n(o),a=n(22),r=n.n(a),s=n(36),c=n.n(s),l=n(13),u=n.n(l),d=n(14),h=n.n(d),v=n(38),p=n(58),f=function(){function t(){u()(this,t),this.gateway=new v.a,this.store=new p.a,this.participationId=null,this.conversationId=null,this.pidPromise=null,this.opinions=[],this.suggestions=[]}return h()(t,[{key:"initPage",value:function(t){var e=this;return this.conversationId=t,this.pidPromise=this.gateway.getPid(this.conversationId).then(function(t){e.participationId=t,e.opinions=e.store.getOpinionsByConversationId(e.conversationId)}),c.a.all([this.gateway.restGetConversation(this.conversationId),this.pidPromise]).then(function(t){var e=r()(t,2),n=e[0];e[1];return n.data})}},{key:"getSuggestionsFor",value:function(t){return""===(t=t.trim().toLowerCase())?[]:(this.suggestions=this.opinions.filter(function(e){return e.txt.toLowerCase().includes(t)}),this.suggestions)}},{key:"publishOpinion",value:function(t){var e=this;if(null===this.participationId)throw new Error("load participation id first!");return this.pidPromise.then(function(n){return e.gateway.restPostComment(0,e.conversationId,n,t)}).then(function(n){return e.store.saveOpinion(e.conversationId,i()({txt:t},n.data))})}},{key:"agreeSuggestion",value:function(t){var e=this;return this.gateway.restPostVote(0,this.conversationId,this.participationId,t.tid,1).then(function(){return t.notAgreed=!1,e.store.saveOpinion(e.conversationId,t),e.suggestions})}}]),t}()},function(t,e){},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-btn",{staticClass:"headline font-weight-light",attrs:{flat:"",color:"teal accent-4",to:{name:"worldmap"}}},[t._v("Login")])],1)},i=[],a={render:o,staticRenderFns:i};e.a=a},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return null!==t.conversation?n("v-container",{attrs:{"grid-list-xs":""}},[n("v-layout",{staticClass:"ma-3",attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("h4",{staticClass:"display-1"},[t._v(t._s(t.conversation.topic))])]),t._v(" "),n("v-flex",{staticClass:"mt-5",attrs:{xs12:""}},[n("v-layout",{attrs:{row:"","align-center":"","justify-center":"","fill-height":""}},[n("v-flex",{attrs:{xs8:""}},[n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[n("v-textarea",{attrs:{solo:""},on:{keyup:function(e){t.showSuggestions()}},model:{value:t.opinionInput,callback:function(e){t.opinionInput=e},expression:"opinionInput"}})],1)],1),t._v(" "),n("v-flex",{attrs:{xs4:""}},[n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[n("v-btn",{attrs:{fab:"",color:"teal accent-2"},on:{click:t.publishOpinion}},[t._v("\n              Submit\n            ")])],1)],1)],1)],1),t._v(" "),t.suggestions.length>0?n("v-flex",{attrs:{xs12:""}},[n("div",{staticClass:"my-3 title"},[t._v("Is that what you mean?")]),t._v(" "),n("v-layout",{attrs:{row:"",wrap:""}},t._l(t.suggestions,function(e){return n("v-flex",{key:e.id,attrs:{xs12:""}},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs8:""}},[n("v-layout",{attrs:{"align-center":"","justify-start":"",row:"","fill-height":""}},[n("v-card",{attrs:{width:"100%"}},[n("v-card-text",[n("div",[t._v(t._s(e.txt))])])],1)],1)],1),t._v(" "),n("v-flex",{attrs:{xs4:""}},[n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[e.notAgreed?n("v-btn",{attrs:{fab:"",outline:"",color:"teal accent-2"},on:{click:function(n){t.agreeSuggestion(e)}}},[t._v("Agree\n                ")]):t._e()],1)],1)],1)],1)}))],1):t._e()],1),t._v(" "),n("v-dialog",{attrs:{"max-width":"290"},model:{value:t.thankscard,callback:function(e){t.thankscard=e},expression:"thankscard"}},[n("v-card",{staticClass:"rounded-card"},[n("v-card-text",[n("div",{staticClass:"title text-xs-center"},[t._v("Congratulations!")]),t._v(" "),n("div",{staticClass:".body-2 mt-2"},[t._v("You have submitted your comment.")])]),t._v(" "),n("v-divider"),t._v(" "),n("v-card-actions",[n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[n("v-btn",{attrs:{large:"",color:"cyan",flat:"flat",to:{name:"vote",params:{id:this.conversationId}}}},[t._v("\n            Confirm\n          ")])],1)],1)],1)],1)],1):t._e()},i=[],a={render:o,staticRenderFns:i};e.a=a},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{"grid-list-xs":""}},[t.isConversationReady?n("v-layout",{staticClass:"ma-3",attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs8:""}},[n("h4",{staticClass:"display-1"},[t._v(t._s(t.conversationData.topic))])]),t._v(" "),n("v-flex",{attrs:{xs4:""}},[n("v-img",{attrs:{height:"100",width:"100",src:"/static/img/icons/opinion_visualization_clickme.png",alt:"Click me!"},on:{click:function(e){t.visualization=!0}}})],1),t._v(" "),n("v-dialog",{model:{value:t.visualization,callback:function(e){t.visualization=e},expression:"visualization"}},[n("v-card",{staticStyle:{height:"200px"}},[n("img",{attrs:{src:"/static/img/opinion_visualization.gif",alt:"Opinion Visualization"}})])],1),t._v(" "),n("v-flex",{attrs:{xs12:""}},[n("div",{staticClass:"body-2 my-3"},[t._v(t._s(t.conversationData.description))])]),t._v(" "),n("v-flex",{attrs:{xs12:"","offset-xs8":"","offset-md8":"","offset-lg8":""}},[t.conversationData.descriptionIsLong?n("v-btn",{staticClass:"caption",attrs:{flat:"",color:"grey"},on:{click:function(e){t.toggleReadMore()}}},[t._v(t._s(t.conversationData.toggledShort?"Read More":"Read Less"))]):t._e()],1),t._v(" "),n("v-flex",{attrs:{xs12:""}},[n("v-card",{attrs:{flat:"",color:"grey lighten-3"}},[null!==t.opinionData?n("v-container",[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("div",{staticClass:"mb-5 title"},[t._v(t._s(t.opinionData.txt))])])],1),t._v(" "),n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[n("v-flex",{attrs:{xs4:""}},[n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[n("v-btn",{attrs:{round:"",small:"",color:"teal accent-2"},on:{click:function(e){t.voteYes()}}},[t._v("Agree")])],1)],1),t._v(" "),n("v-flex",{attrs:{xs4:""}},[n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[n("v-btn",{attrs:{round:"",small:"",color:"teal accent-2"},on:{click:function(e){t.voteNo()}}},[t._v("Disagree")])],1)],1),t._v(" "),n("v-flex",{attrs:{xs4:""}},[n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[n("v-btn",{attrs:{round:"",small:"",color:"teal accent-2"},on:{click:function(e){t.skipVote()}}},[t._v("Pass")])],1)],1)],1)],1):t._e()],1)],1),t._v(" "),n("v-flex",{staticClass:"mt-5",attrs:{xs12:""}},[n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[n("v-btn",{staticClass:"headline font-weight-light",attrs:{outline:"",color:"teal accent-4",to:{name:"opinion",params:{id:this.conversationId}}}},[t._v("Give your opinion")])],1)],1)],1):t._e()],1)},i=[],a={render:o,staticRenderFns:i};e.a=a},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vue-leaflet"},[n("l-map",{staticStyle:{width:"100%",height:"100vh","z-index":"0",position:"fixed"},attrs:{id:"map-main-holder",zoom:t.zoom,center:[t.center.coords.latitude,t.center.coords.longitude]}},[n("l-tile-layer",{attrs:{url:t.url,attribution:t.attribution}}),t._v(" "),t._l(t.markers,function(e,o){return n("div",{key:o},[n("l-marker",{attrs:{"lat-lng":[e.coords.latitude,e.coords.longitude],icon:e.icon},on:{click:function(n){t.selectMarker(e)}}})],1)})],2),t._v(" "),n("v-dialog",{attrs:{"max-width":"290"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[null!==t.selectedMarker?n("v-card",[n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[n("v-flex",{attrs:{xs2:""}},[n("img",{staticClass:"ml-3 mt-3",attrs:{src:t.selectedMarker.logo,height:"36",width:"31.3"}})]),t._v(" "),n("v-flex",{attrs:{xs10:""}},[n("div",{staticClass:"ml-3 purple--text"},[t._v(t._s(t.selectedMarker.conversations[0].datediff)+" days left to vote")])])],1),t._v(" "),t._l(t.selectedMarker.conversations,function(e,o){return n("div",{key:o},[n("v-card-text",[t._v("\n          "+t._s(e.topic)+"\n        ")]),t._v(" "),n("v-divider",{staticClass:"mx-5",attrs:{color:"black"}}),t._v(" "),n("v-card-actions",[n("v-btn",{attrs:{color:"",flat:"flat",to:{name:"vote",params:{id:e.conversation_id}}},on:{click:function(e){t.dialog=!1}}},[n("v-icon",{attrs:{left:""}},[t._v("check_box")]),t._v("\n            Vote\n          ")],1),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"",flat:"flat"},on:{click:function(n){t.share=!0,t.shareConversation=e}}},[n("v-icon",{attrs:{left:""}},[t._v("share")]),t._v("\n            Share\n          ")],1)],1)],1)})],2):t._e()],1),t._v(" "),n("v-dialog",{attrs:{"max-width":"290"},model:{value:t.share,callback:function(e){t.share=e},expression:"share"}},[null!=t.shareConversation?n("v-card",[n("social-sharing",{attrs:{url:"https://pol.is/"+t.shareConversation.conversation_id,title:"I just spotted this conversation: \n\n"+t.shareConversation.topic+"\n\nCheck it out and join me contributing opinions to our city issues!\n\n",description:"I just spotted this conversation: \n\n"+t.shareConversation.topic+"\n\nCheck it out and join me contributing opinions to our city issues!\n\n",quote:"I just spotted this conversation: \n\n"+t.shareConversation.topic+"\n\nCheck it out and join me contributing opinions to our city issues!\n\n",hashtags:"polis,democracy","twitter-user":"polis"},inlineTemplate:{render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{"grid-list-xs":""}},[n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs3:""}},[n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[n("network",{attrs:{network:"facebook"}},[n("v-icon",{attrs:{color:"indigo",large:""}},[t._v("fa-facebook")])],1)],1)],1),t._v(" "),n("v-flex",{attrs:{xs3:""}},[n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[n("network",{attrs:{network:"twitter"}},[n("v-icon",{attrs:{color:"blue",large:""}},[t._v("fa-twitter")])],1)],1)],1),t._v(" "),n("v-flex",{attrs:{xs3:""}},[n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[n("network",{attrs:{network:"telegram"}},[n("v-icon",{attrs:{color:"blue",large:""}},[t._v("fa-telegram")])],1)],1)],1),t._v(" "),n("v-flex",{attrs:{xs3:""}},[n("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[n("network",{attrs:{network:"whatsapp"}},[n("v-icon",{attrs:{color:"green",large:""}},[t._v("fa-whatsapp")])],1)],1)],1)],1),t._v(" "),n("v-layout",{attrs:{"align-end":"","justify-start":"",row:"","fill-height":""}},[n("v-flex",{attrs:{xs12:""}},[n("v-btn",{attrs:{flat:"",color:"teal"},on:{click:function(e){t.share=!1}}},[t._v("Cancel")])],1)],1)],1)},staticRenderFns:[]}})],1):t._e()],1)],1)},i=[],a={render:o,staticRenderFns:i};e.a=a},function(t,e,n){"use strict";var o=n(62),i=n(139),a=n(4),r=a(o.a,i.a,!1,null,null,null);e.a=r.exports},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("worldmap")],1)},i=[],a={render:o,staticRenderFns:i};e.a=a},function(t,e,n){"use strict";function o(t){n(141)}var i=n(63),a=n(142),r=n(4),s=o,c=r(i.a,a.a,!1,s,null,null);e.a=c.exports},function(t,e){},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-btn",{staticStyle:{"z-index":"100"},attrs:{fixed:"",right:"",top:"",flat:"",color:"cyan",large:"",to:"index",exact:""}},[t._v("\n    skip\n  ")]),t._v(" "),n("v-carousel",{attrs:{height:t.clientHeight,cycle:!1,"hide-delimiters":"",interval:"99999999999"}},t._l(t.items,function(t,e){return n("v-carousel-item",{key:e,attrs:{src:t.src}})}))],1)},i=[],a={render:o,staticRenderFns:i};e.a=a},function(t,e,n){"use strict";function o(t){n(144)}var i=n(64),a=n(145),r=n(4),s=o,c=r(i.a,a.a,!1,s,null,null);e.a=c.exports},function(t,e){},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("qrcode-reader",{staticStyle:{background:"black",position:"fixed",top:"56px"},attrs:{id:"qrcode-stream-container"},on:{decode:t.onDecode,init:t.onInit}},[n("v-card",{staticStyle:{opacity:"0.45"},attrs:{color:"black",dark:""}},[n("v-card-title",{attrs:{"primary-title":""}},[n("div",[n("h3",{staticClass:"headline mb-0 cyan--text"},[t._v("Scan to join the conversation")]),t._v(" "),n("div",[t._v("Find our stickers and place the QR code on the center of the screen.")])])])],1)],1)],1)},i=[],a={render:o,staticRenderFns:i};e.a=a},,function(t,e){},function(t,e){},function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII="},,,,,,,,,,,,,,,,,,,,,function(t,e){},,function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcY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"},function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC"}]),[68]);
//# sourceMappingURL=app.177a1ed5205d04164c75.js.map