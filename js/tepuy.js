window.TepuyJs=(function(){let ø=undefined;
window.log=function(){for(let k in arguments)console.log(arguments[k])}
Object.defineProperty(Function.prototype,'extend',{enumerable:false,writable:true,value:function(o,bHidden){for(let k in o){let r=o[k],t=typeof(r)==='function'?'f':r.constructor===Object&&(r.get||r.set||r.enumerable||r.writable)?'p':'';if(t!=='p')r={value:r};r.enumerable=r.enumerable!==ø?r.enumerable:!bHidden;if(!r.get&&!r.set)r.writable=r.writable!==ø?r.writable:true;if(t==='f')r.TepuyJs=true;Object.defineProperty(this.prototype,k,r);}}});
[[Boolean,'b'],[RegExp,'r'],[Date,'d'],[Text,'t']].forEach(function(r){r[0].prototype.T=r[1]});
[NodeList,HTMLCollection].forEach(function(e){e.extend({T:'l',a:function(){return $.a(this)}})});
Object.extend({push:function(o){for(let k in o)this[k]=o[k];return this}},true);
/**
	TepuyJs($)
*/let $=(s,o,context)=>{let e=s.T==='e'?s:$.e(s,context);if(o)$.a(e).forEach(r=>r.attr(o));return e};
$.push({T:'$'
,ø:(v,ifn)=>v===ø||v===null?ifn:v
,t:(v,w)=>{return v===null||v===ø?'ø':v===screen?'S':v===window?'W':v===document?'D':Object.prototype.toString.call(v)==='[object Arguments]'?'g':v.T?v.T:'u'}
,k:function(v){if(!v)return;for(var k,y=1;y<arguments.length;y++){k=arguments[y];if(v[k]!==ø)v=v[k];else return ø;}return v}
,s:(v,w,encode)=>{w=w||'json';let o=$.s.notations[w],s='';switch($.t(v)){case'ø':return o.ø;case's':case'd':return o.sb+(v+'').to(encode)+o.se;case'a':for(let y in v)s+=(s?o.ac:'')+$.s(v[y],w,encode)+o.ac;return o.ab+s+o.ae;case'o':for(let k in v)s+=(s?o.oc:'')+o.oab+k+o.oae+$.s(v[k],w,encode);return o.ob+s+o.oe}return String(v)}
,a:(v)=>{let a=[];if(!v)return a;if(v.T==='e'||v.length===ø)return [v];for(let y=0;y<v.length;y++)a.push(v[y]);return a}
,e:(s,e)=>{e=e||document;return /^#[\w_-]+$/.test(s)?e.querySelector(s):e.querySelectorAll(s)}
,o:(o,w)=>{o=o||{};return $.t(o)==='o'?o:o.to?o.to(w):{}}
,f:(o,k)=>o&&o.hasOwnProperty(k)&&o[k].call
// ,f:(o,k)=>o&&o[k]&&o[k].call
,metods:(v,bF)=>{let s='';for(let k in v)if(isNaN(k)&&(!bF?1:$.t(v[k])==='f'))s+=k+' : '+(function(v_){let s_=v_+'';if($.t(v_)==='f')s_=s_.substr(0,s_.indexOf(')')+1)+'{...}';return s_})(v[k])+'\n';return `Def de ${typeof(v)}::\n${s}`}
,eval:(s,ifn)=>{try{return eval('('+s+')')}catch(err){$.eval.err=err;return ifn}}
,clone:(v)=>{var c;switch($.t(v)){case 'a':c=[];for(var k=0;k<v.length;k++)c[k]=$.clone(v[k]);break;case 'o':c={};for(var k in v)c[k]=$.clone(v[k]);break;default:c=v}return c}
});
/**
	function!
*/Function.extend({T:'f'
,pushEvent:function(f){if(!this.events)this.events=[];
	return this.events.push({f:f,inactive:false})-1
}
});
/**
	Object!
*/Object.extend({T:'o'
,clone:function(){return $.clone(this)}
,pushOne:function(k,v){this[o]=v;return this}
,to:function(s,p1,p2){if(!s)return this;f=$.o.to[s];if(f&&f.call)return f(this,p1,p2)}
},true);
$.o.push({to:{
'css':(o)=>{let s='';for(let k in o)s+=(s?';':'')+k+':'+o[k];return s}
}});
/**
	String!
*/String.extend({T:'s',s:function(){return this+''},push:false
,n:function(){return this*1}
,in:function(a){return (arguments.length>1?$.a(arguments):a).indexOf(this+'')>-1}
,n:function(){return this*1}
,r:function(w,c,_c2){let s=this;return _c2===ø?s.replace(w,c||''):s.substr(0,w)+_c2+s.substr(c)}
,m:function(r,ifn){let m=this.match(r)||[];return m.length>0?m:ifn!==ø?ifn:m}
,has:function(s_re){let v=s_re||'';return v.T==='r'?v.test(this):this.indexOf(v)>-1}
,toR:function(gi){return this.left(1)==='/'?$.eval(this):new RegExp(this,gi)}
,a:function(c){return this.split(c||'')||[]}
,toA2:function(cE,cI){return this.a(cE||'||').map(function(r){return r.a(cI||'|')})}
,toL:function(){return this.toLowerCase()}
,toU:function(){return this.toUpperCase()}
// ,reEscape:function(){return this.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
,max:function(n,s){return this.length<=n?this:this.substr(0,n)+(s||'')}
,ord:function(n){return this.charCodeAt(n||0)}
,left:function(n){return this.substr(0,n)}
,right:function(n){return this.substr(this.length-n)}
,allt:function(){return this.r(/\r/g).r(/(\s{2,})/g,function($1){return $1.left(1)}).trim()}
// ,token:function(v,c,gi){let s=this;let w=v.left(1);c=c||' ';gi=gi||'g';v=v.substr(1).a(c);let r0=v[0].to('word'),r1=(v[1]||'').to('word');switch(w){case'?':return r0.test(s);break;case'-':s=s.r(r0);break;case'+':if(!r0.test(s))s+=c+v[0];break;case'*':s=s.r(r0,v[1]);break;case'/':let b=r0.test(s);if(v[1])s=s.r(b?r0:r1,v[b?1:0]);else b?s=s.r(r0):s=s.token('+'+v[0]);break;};return s.allt()}
,to:function(s,p1,p2){if(!s)return this;f=$.s.to[s];if(f&&f.call)return f(this,p1,p2)}
});
$.s.push({notations:{
'json':{ab:'[',ae:']',ac:',',ob:'{',oe:'}',oc:',',oab:'"',oae:'":',sb:'"',se:'"',ø:'null'}
,'css':{ab:'',ae:'',ac:',',ob:'',oe:'',oc:';',oab:'',oae:':',sb:'',se:'',ø:''}
,'url':{ab:'',ae:'',ac:',',ob:'',oe:'',oc:'&',oab:'',oae:'=',sb:'',se:'',ø:''}
},to:{
'hex':(s)=>parseInt(s,16)
,'reverse':(s)=>s.split('').reverse().join('')
,'word':(s)=>('\\b'+s+'\\b').toR('g')
,'acuteless':(s)=>s.normalize('NFD')
,'css:o':(s)=>{let o={},a;s.r(/\/\*.*\*\//g).allt().r(/;$/).split(';').forEach(r=>{a=r.split(':');o[a[0].trim().r(/[\n\t]/g)]=a[1].trim().r(/[\n\t]/g)});return o}
,'css:js':(s)=>s.r(/\-(\w)/g,function(s,c){return c.toU()})
,'js:css':(s)=>s.replace(/([A-Z])/g,'-$1').toL()
,'html':(s)=>s.r(/([ \t\n])/g,function($1){return $1===' '?'&nbsp;':$1==='\n'?'<br>':$1==='\t'?'&emsp;':''}),'-html':(s)=>s.r(/<.*?>/g)
,'url':(s)=>encodeURIComponent(s),'-url':(s)=>decodeURIComponent(s)
,'base64':(s)=>window.btoa(unescape(encodeURIComponent(s))),'-base64':(s)=>decodeURIComponent(escape(window.atob(s)))
}});
/**
	Array!
*/Array.extend({T:'a'
,a:function(){return this}
,clone:function(){return $.clone(this)}
,each:function(f){let v;for(let y in this)if((v=f.call(this[y],this[y],y,this))!==ø)return v}
,dim:function(){return $.t(this[0])==='a'?this[0].length:1}
,insert:function(y,v){this.splice(y,0,v);return this}
,remove:function(y){let a=this;y=y<0?a.length+y:y; a.splice(y,1);return a}
,cat:function(a){for(let y=n;y<this.length;y++)this.push(a[y]);return this}
,p:function(v){this.push(v);return this}
,r:function(y,v){this.splice(y,1,v);return this}
,i:function(v_f_re,y){let v=v_f_re;for(y=y||0;y<this.length;y++){let r=this[y];if(r===v||($.t(v)==='r'&&$.t(r)==='s'&&v.test(r))||($.t(v)==='f'&&v.call(r,y,r)))return y;}return -1}
,idxs:function(v_f_re){let v=v_f_re,y=this.i(v),a=[];while(y>-1){a.push(y);y=this.i(v,y+1)}return a}
,m:function(v_f_re){let v=v_f_re,y=this.i(v),a=[];while(y>-1){a.push(this[y]);y=this.i(v,y+1)}return a}
},true);
/**
	Number!
*/Number.extend({T:'n',push:false
,s:function(){return this+''}
,abs:function(){return Math.abs(this)}
,trunc:function(){return Math.trunc(this)}
,limit:function(min,max){let n=this;return n<min?min:n>max?max:n}
,decs:function(){return this-(this|0)}
,in:function(a){return (arguments.length>1?arguments.a():a).indexOf(this*1)>-1}
,each:function(f_y,f){let nFrom=f?f_y:0;f=f?f:f_y;let v;for(let y=nFrom;y<this;y++)if((v=f.call(y,y))!==undefined)return v}
,isInt:function(){return this%1===0}
,chr:function(){return String.fromCharCode(this)}
,padStart:function(n){return (this+'').padStart(n,'0')}
,padEnd:function(d){return d?this.toFixed(d):this+''}
// Ex: (55.107).round(2,'floor')=>55.1 (55).round(-2)=>100
,round:function(dec,w){let v=this;w=w||'round';if(!dec)return Math[w](v);v=+v;dec=-dec;if(isNaN(v)||!dec.isInt())return NaN;v=v.toString().split('e');v=Math[w](+(v[0]+'e'+(v[1]?(+v[1]-dec):-dec)));v=v.toString().split('e');return +(v[0]+'e'+(v[1]?(+v[1]+dec):dec));}
});
/**
	Element!
*/Element.extend({T:'e'
,p:{get:function(){return this.parentNode}}
,conf:{get:function(){return this.o||{}},set:function(o){this.o=o}}
,tag:{get:function(s,o){return this.tagName.toL()}}
,$:function(s,o){return $(s,o,this)}
,e:function(s){return $.e(s,this)}
,v:function(v){let e=this,e$=$.e[e.tag];return e$&&e$.v&&e$.v.call?e$.v(v):v!==ø?(e.value=v,e):e.value}
,t:function(v){let e=this,e$=$.e[e.tag];return e$&&e$.t&&e$.t.call?e$.t(v):v!==ø?(e.text(v),e):(e.text()||e.value||'')}
,attr:function(o){e=this;if(o.T==='e')return e;let bGet=o.T==='s';if(bGet)o={}.pushOne(o,ø);let v,$t=$.e[e.tag];
for(let k in o)if(k!=='tag'){v=o[k];
	let r=$.f($t,k)?$t[k](e,v)
		:$.f($.e,k)?$.e[k](e,v)
		:e[k]&&e[k].call?e[k].call(e,v)
		:v&&v.call?e.event(k,v)
		:bGet?e.hasOwnProperty(k):e[k]=v
	if(bGet)return r
}return e}
,css:function(o){let e=this;if($.t(o)==='s'&&/^[\w-]{1,}$/.test(o))return $.e.css[o]&&$.e.css[o].call?$.e.css[o](e):$.e.css.computed(e,o);o=$.o(o,'css:o');for(let k in o){let f=$.e.css[k],k2;if(/.+[Cc]olor$/.test(k)){k2=k;f=$.e.css.color};if(f&&f.call)f(e,o[k],k2);e.style[k.to('css:js')]=o[k]}return e}
,text:function(s){let e=this;if(s===ø)return e.textContent;e.innerHTML='';return e.appendChild(document.createTextNode(s))}
,html:function(s){let e=this;if(s===ø)return e.innerHTML,e;e.innerHTML=s;return e}
,push:function(a){let ch,e=this;$.a(a).forEach(r=>e.appendChild(ch=$.e.create(r)));return ch}
,insert:function(o,w){let e=this,s,p=e.p,ch=$.e.create(o);switch(w){case'after':(s=e.nextSibling)?p.insertBefore(ch,s):p.appendChild(ch);break;case'before':default:p.insertBefore(ch,e);break}return ch}
// ,remove:function(){let e=this;return e.p.removeChild(e)}
,parent:function(fns){let e=this;fns=fns||1;switch($.t(fns)){
	case'n':for(var y=0;y<fns;y++)if(e)e=e.p;return e;break;
	case's':while(e=e.p)if(e.tag===fns)return e;break;
	case'f':while(e=e.p)if(fns.call(e,e))return e;break;}}
,siblings:function(n){let e=this;if(n){let w=n<0?'previous':'next';n=n.abs();for(let y=0;y<n&&e;y++)e=e[w+'ElementSibling'];return e}return e.p.children.a().filter(r=>r!==e)}
,tryFocus:function(delay){let e=this;try{e.focus()}catch(err){};let b=e.matches(':focus');if(!b)setTimeout(function(){try{e.focus()}catch(err){}},delay||100);return e}
,selection:function(o){o=o||{};if(o.T!=='o')o={start:o,end:o};let e=this;if(o===ø)return {start:e.selectionStart,end:e.selectionEnd};let len=(e.textContent||e.value).length,n1=o.start||0,n2=o.end===0?0:o.end||len;n1=n1<0?len-n1-1:n1;if(e.textContent)window.getSelection().setBaseAndExtent(e.firstChild,n1,e.firstChild,n2);else e.tryFocus().setSelectionRange(n1,n2)}
,event:function(k,f){if(f){o={};o[k]=f}else o=k;for(let k in o)if($.e.event.custom[k])$.e.event.custom[k](this,o[k]);else $.e.event.setCaller(this,k).pushEvent(o[k]);return this}
});
$.e.push({push:false
,create:(o)=>{if(o.T==='e')return o;if(o.T==='s')return document.createElement(o);let $t=$.e[o.tag];if($t&&$t.create)return $t.create(o);let e=document.createElement(o.tag);e.attr(o);return e}
,class:(e,v)=>{switch($.t(v)){case's':e.className=v;break;case'o':for(var k in v)e.classList[k](v[k]);break}}
});
/**
	event!
*/$.e.event={
parse:(e,k,event)=>{let v=event||{};
let o=({e:e,name:k,specialKey:v.metaKey||v.ctrlKey||v.altKey}).push(v);if(/onkeyup|onkeydown|onkeypress/.test(k))$.e.event.keysEvent(e,v,o);return o}
,keysEvent:(e,v,o)=>{let klen1=v.key.length===1,sk=(o.metaKey?'meta+':'')+(o.ctrlKey?'ctrl+':'')+(o.altKey?'alt+':'')+(o.shiftKey?'shift+':'');o.char=klen1&&!o.specialKey?v.key:'';o.w=(sk&&sk!==v.key.toL()+'+'&&v.key!=='Control'?sk+v.key:sk?sk.r(/\+$/):v.key).toL();if(e.value!==undefined){let s=e.value,ss=e.selectionStart,se=e.selectionEnd;if(o.char)s=e.value.r(ss,se,o.char);else switch(o.w){case 'backspace':s=e.value.r(ss-(ss===se?1:0),se,'');break;case 'delete':s=e.value.r(ss,se+(ss===se?1:0),'');break;}o.futureValue=s}}
,setCaller:(e,k)=>{
	if(!e[k])e[k]=function(event){if(e)return $.e.event.exec(e,k,$.e.event.parse(e,k,event))};
	return e[k]
}
,exec:(e,k,event)=>{
	return !e[k].events.each(function(o){
		if(!o.inactive&&o.f&&o.f.call(e,event)===false)return false;
	}
)}
,custom:{
	onenter:(e,f)=>{return $.e.event(e,'onkeyup',function(event){if(event.which===13)return f.call(e,event)})}
	,onclickout:function(e,f){return document.body.event({onclick:function(event){let t=event.target;do{if(t===e)return;}while(t=t.parentNode);f.call(e,event)}})}
}};
/**
	e.css!
*/$.e.css={
px:(v)=>!isNaN(v)?v+'px':v
,l:(e,v)=>v===ø?e.offsetLeft:e.style.left=$.e.css.px(v)
,t:(e,v)=>v===ø?e.offsetTop:e.style.top=$.e.css.px(v)
,w:(e,v)=>v===ø?e.offsetWidth:e.style.width=$.e.css.px(v)
,h:(e,v)=>v===ø?e.offsetHeight:e.style.height=$.e.css.px(v)
// ,pos:(e)=>{let x=0,y=0;do{x+=e.offsetLeft-e.scrollLeft;y+=e.offsetTop-e.scrollTop}while(e=e.offsetParent);return {t:y,l:x}}
// ,rect:(e)=>{var o=$.e.css.pos(e);return {e:e,l:o.l,t:o.t,w:e.offsetWidth,h:e.offsetHeight,b:o.t+e.offsetHeight,r:o.l+e.offsetWidth}}
// ,rect:(e)=>({}).push(e.getBoundingClientRect()).push({e:e})
,rect:(e)=>({e:e,l:e.offsetLeft,t:e.offsetTop,w:e.offsetWidth,h:e.offsetHeight,r:e.offsetLeft+e.offsetWidth,b:e.offsetTop+e.offsetHeight})
,center:(e,position)=>e.css(!position||position==='none'?{position:'',t:0,l:0,transform:''}:{position:position,top:'50%',left:'50%',transform:'translate(-50%,-50%)'})
,moveTo:(e,eTarget)=>{e=e.css('rect');eTarget=eTarget.css('rect');let w={w:window.innerWidth,h:window.innerHeight},x=eTarget.l,y=eTarget.b;if(y+e.h>w.h)y=eTarget.t-e.h;if(y<0)y=0;if(x+e.w>w.w)x=eTarget.r-e.w;if(x<0)x=0;e.e.css({l:x,t:y})}
,open:(e,sDisplay)=>{e.conf.isOpening=true;e.style.display=sDisplay||'block';setTimeout(()=>e.conf.isOpening=false,20)}
,close:(e)=>{if(!e.conf.isOpening)e.style.display='none'}
,hidden:(e)=>$.e.css.computed(e,'display')==='none'||!$.e.css.computed(e,'visibility')==='hidden'
,display:(e,w)=>{
	let d=$.e.css.computed(e,'display');
	if(!e.defaultDisplay)e.defaultDisplay=d!=='none'?d:'inline';
	e.display=w==='+/-'?(d!=='none'?e.defaultDisplay:'none'):w
}
,computed:(e,w)=>document.defaultView.getComputedStyle(e).getPropertyValue(w.to('js:css'))
//color:function(e,s,k){k=k||'color';if(s===undefined)return $.e.css.computed(e,k);s=s.r(/^[\+-]\d+$|^[\+-]\[[-\d\,]+\]$/,function(s){return $.e.css.color.add($.e.css.computed(e,k),s*1)});e.style[k]=s;return e}
,color:{
	isHex:(s)=>s.T==='s'&&!s.indexOf('#')
	,isRgb:(s)=>s.T==='s'&&!s.indexOf('rgb')
	,add:function(s,a){if(a.T!=='a')a=[a,a,a];(s=$.e.css.color.a(s)).forEach(function(r,y){s[y]=((r*1)+(a[y]*16)).round().limit(0,255)});return $.e.css.color.toHex(s)}
	,a:function(v){if(v.T==='a')return v;return this.isHex(v)?(v.length===4?[v[1]+v[1],v[2]+v[2],v[3]+v[3]]:[v[1]+v[2],v[3]+v[4],v[5]+v[6]]).map(function(n){return n.s().to('hex').limit(0,255)}):v.m(/\d+/g).map(function(r){return isNaN(r)?r:r*1})}
	,toHex:function(v){if(this.isHex(v))return v;v=this.a(v);return '#'+((1<<24)+((v[0]*1)<<16)+((v[1]*1)<<8)+(v[2]*1)).toString(16).slice(1).toU()}
}};
/**
	css! 
*/($.css=(o)=>$.css.push(o)).push({
raw:{},themes:{current:{},default:{}}
,sheet:document.head.appendChild(document.createElement('style')).sheet
,pushRule:(sSel,sRule)=>$.css.sheet.insertRule(sSel+'{'+sRule+'}',$.css.sheet.cssRules.length)
,push:o=>{
	/**TODO:*//*SI ES UN CONJUNTO DE SCREEN O PRINT POR EJEMPLO*/
	o=o.T==='s'?o.to('css-sheet:o'):o;
	for(let k in o){
		let r=o[k].to('css-r:raw-rule').to('css:o');
		let oRaw=$.css.raw[k]?$.css.raw[k].to('css:o'):{};
		oRaw.push(r);
		$.css.raw[k]=oRaw.to('css').r(/\n/g)
	}
}
,loadTheme:(w)=>{
	$.css.themes.current=$.css.themes[w];
	while($.css.sheet.cssRules.length)$.css.sheet.deleteRule(0);
	// for(let y=$.css.sheet.cssRules.length-1;y>=0;y--)$.css.sheet.deleteRule(y);
	for(let k in $.css.raw)$.css.pushRule(k,$.css.raw[k].to('css-r:theme'));
}
// ,defineTheme:function(name,o){var from=name.split('.')[0];this.themes[name]=from!==name?this.themes[from].clone():{};for(var k in o)this.themes[name][k]=this.r(o[k],o);return this}
});//css
$.s.to.push({
'css-sheet:o':(s)=>{let o={};s.split(/}/g).remove(-1).forEach(r=>{r=r.split(/{/g);o[r[0].allt()]=r[1].allt()});return o}
,'css-r:raw-rule':s=>s.replace(/\&\(([-:>\.\w]+)\)/g,(r,$1)=>$.css.raw[$1])
,'css-r:theme':s=>s
	.replace(/\$\(([-\.\w]+)\)/g,(r,$1)=>$.eval('$.css.themes.current.'+$1))
	.replace(/(#\w{3,6})([-+]\d+\.{0,1}\d*)|(rgba{0,1}\([\d\,]+\))([-+]\d+\.{0,1}\d*)/g,(r,$1,$2)=>$.e.css.color.add($1,$2))
	.replace(/\d+\.{0,1}\d*[-+/*]\d+\.{0,1}\d*/g,($1)=>$.eval($1).round(1))
});



$.ajax=(o)=>{
	const xhttp=new XMLHttpRequest();
	const isAsync=!!o.onload;
	if(o.onload)xhttp.onload=function(){o.onload.call(this,this.responseText)}
	if(o.send){
		xhttp.open("POST",o.file,isAsync);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		let s=o.send;
		if($.t(s)!=='s')s=$.s(s,'json','url');
		xhttp.send("datos="+o.send);
	}else xhttp.open("GET",o.file,isAsync);
	xhttp.send();
	return this?.responseText
}

return $})();