(($)=>{
/**
	Date!
*/let ø=undefined;
Date.extend({T:'d',toNativeString:Date.prototype.toString
,toString:function(w,c){w=w||'dt';c=c||$.d.dateSep;let sd,st,d=this;if(w.indexOf('d')>-1)sd=d.format(`#y${c}%m${c}%d`);if(w.indexOf('t')>-1)st=d.format('%H:%M:%S');return sd&&st?sd+' '+st:sd||st}
,fromString:function(s){let a=s.split(/[-.\/ :]/);a[1]-=1;this.setTime(new Date(Date.UTC(...a)).getTime());return this}
// # nativo     % padStart(2,'0')     < texto     > abrv     » inicial
,format(s,lang){let d=this;s=s.replace(/[#%<>»]\w/g,function($1){let f=d[$1.substr(1)],r=f&&f.call?f.call(d):f;if($1[0]!=='#')r=$.d.format(r,$1,lang);return r});return s}
,add:function(o){let d=this;if(o.m)$.d.addMonths(d,o.m);for(var k in o)if(k!=='m')d[k](d[k]()+o[k]);return d}
,ymd:function(y,m,d){let dt=this;dt.y(y);dt.m(m);dt.d(d);return dt}
,y:function(n){let d=this;return n!==ø?(d.setYear(n),d):d.getUTCFullYear()}
,m:function(n){let d=this;return n!==ø?(d.setUTCMonth(n-1),d):d.getUTCMonth()+1}
,d:function(n){let d=this;return n!==ø?(d.setUTCDate(n),d):d.getUTCDate()}
// ,d:function(n){let d=this;return n!==ø?(d.setUTCDate(n===1?0:n-1),d):d.getUTCDate()+1}
// ,d:function(n){let d=this;return n!==ø?(d.setUTCDate((n-1)===0?1:n-1),d):d.getUTCDate()+1}
,H:function(n){let d=this;return n!==ø?(d.setHours(n),d):d.getHours()}
,M:function(n){let d=this;return n!==ø?(d.setMinutes(n),d):d.getMinutes()}
,S:function(n){let d=this;return n!==ø?(d.setSeconds(n),d):d.getSeconds()}
,x:function(n){let d=this;return n!==ø?(d.setMilliseconds(n),d):d.getMilliseconds()}
,w:function(){return this.getUTCDay()||7}
,W:function(){let d=this;let d2=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));d2.setUTCDate(d2.getUTCDate()+4-(d2.getUTCDay()||7));let y=new Date(Date.UTC(d2.getUTCFullYear(),0,1));return Math.ceil((((d2-y)/86400000)+1)/7)}
,isBisiesto:function(){let y=this.y();return y%4==0&&(y%100!=0||y%400==0)}
,monthLastDay:function(){let d=this;return new Date(d.getYear(),d.m(),0).getDate()}
,monthWorkingDays:function(){let d=this;var md=d.monthLastDay(),nD=0,wd;for(var y=0;y<md;y++){d.setDate(y);wd=d.getDay();if(wd!==6&&wd!==0)nD+=1}return nD}
,to:function(w,p1,p2){let f=$.d.to[w];return f&&f.call?f(this,p1,p2):w}
});
$.d={};
$.d.push({T:'$',dateSep:'-'
,dif:(d1,d2,w)=>{d2=d2||new Date();let n=((d1.getTime()-d2.getTime())/1000).abs(),fullDays=n/(60*60*24),y=n/(60*60*24*365),d=y.decs()*365,H=d.decs()*24,M=H.decs()*60,S=M.decs()*60,m2=d2.m(),m1=d1.m(),m=(m2>=m1?m2-m1:(12-(m2-m1).abs()+1)).abs();return {y:y,m:m,d:d,H:H,M:M,S:S,days:fullDays}}
,addMonths:(d,n)=>{let gd=d.d();d.d(5);d.m(d.m()+n);d.d(Math.min(gd,d.monthLastDay()));return d}
,format:(v,w,lang)=>{let fn=w[1];w=w[0];lang=lang||($.lang?$.lang.current:'');switch(w){
case'%':v=isNaN(v)?v:v.padStart(2);break;
case'<':v=$.k($,'lang','Date',fn,lang,v)||v;break;
case'>':v=($.k($,'lang','Date',fn,lang,v)||v).left(3);break;
case'»':v=($.k($,'lang','Date',fn,lang,v)||v).left(1);break;
}return v}
,to:{
 'd':d=>d.H(0).M(0).S(0).x(0)
,'t':d=>d.y(0).m(1).d(1)
}});

if(!$.lang)$.lang={};
$.lang.push({'Date':{
'm':{
 es:['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
,en:['','January','February','March','April','May','June','July','August','September','October','November','December']
,pt:['','Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
},'w':{
 es:['','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']
,en:['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
,pt:['','Segunda feira','Terça feira','Quarta feira','Quinta feira','Sesta feira','Sabado','Domingo']
}
}});

/**<input type="date" id="bday" name="bday" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
	calendar!
*/$.e.calendar={
create:o=>{let e=$.e.create('calendar');e.conf={btns:[],beginDay:0};e.value=null;let aMonths=$.k($,'lang','Date','m',$.lang.current||'es').filter((r,y)=>y>0).map((r,y)=>[y+1,r]);
e.push({tag:'table',class:'head',push:[{tag:'tr',push:[
	{tag:'td',push:{tag:'button',html:'&#171;',onclick:()=>$.e.calendar.requery(e,--e.o.year.value)}}
	,{tag:'td',push:( e.conf.year=$.e.create({tag:'input',maxLength:4,readOnly:true,onchange:()=>e.calendar.requery()}) )}
	,{tag:'td',push:{tag:'button',html:'&#187;',onclick:()=>$.e.calendar.requery(e,++e.o.year.value)}}
]},{tag:'tr',push:[
	{tag:'td',push:{tag:'button',html:'&#171;',onclick:()=>$.e.calendar.monthAdd(e,-1)}}
	,{tag:'td',push:( e.conf.month=$.e.create({tag:'select',a:aMonths,onchange:()=>$.e.calendar.requery(e)}) )}
	,{tag:'td',push:{tag:'button',html:'&#187;',onclick:()=>$.e.calendar.monthAdd(e,+1)}}
]} ]});
let aDays=$.k($,'lang','Date','w',$.lang.current||'es').filter((r,y)=>y>0).map(r=>({tag:'box',text:r.left(2)}));e.push({tag:'div',push:aDays});
let eBody=e.push({tag:'div',class:'body'});for(let a,i=0,y=0;a=[],y<6;y++){for(let x=1;x<=7;x++)if(i<=36)a.push(e.conf.btns[++i]=$.e.create( {tag:'button',text:'?',class:x===6||x===7?'feriado':'',onclick:function(){$.e.calendar.select(e,this.textContent);if(e.onselect)e.onselect.call(e)}} ));eBody.push({tag:'div',push:a})}
let dt=new Date();$.e.calendar.requery(e,dt.y(),dt.m());
return e}
,requery:function(e,y,m){
	let dt=new Date(),o=e.conf;y=(y||o.year.value)*1;m=(m||o.month.value)*1;dt.ymd(y,m,1);
	o.btns.forEach(btn=>btn.name='');
	let mds=dt.monthLastDay(),w=dt.w();(38).each(1,y=>{let isDay=y>=w&&y<w+mds;o.btns[y].style.visibility=!isDay?'hidden':'visible';
	if(isDay)o.btns[y].attr({text:y-w+1,name:'c'+(y-w+1),class:{remove:'selected'}})});o.year.value=y;o.month.value=m;
	if(e.value){
		dt=new Date().fromString(e.value);
		if(dt.y()===y&&dt.m()===m)$.e.calendar.setSelected(e,dt.d())};
	if(e.onrequery)e.onrequery.call(e);
return e}
,monthAdd:(e,n)=>{let dt=new Date().ymd(e.conf.year.value,e.conf.month.value,5);dt.add({m:n});$.e.calendar.requery(e,dt.y(),dt.m())}
,select:(e,day)=>$.e.calendar.unselect(e).setSelected(e,day).setValueDay(e,day)
,setSelected:(e,day)=>(e.$(`div.body>div>button[name="c${day}"]`,{class:{add:'selected'}}),$.e.calendar)
,setValueDay:(e,day)=>(e.value=new Date().ymd(e.conf.year.value,e.conf.month.value,day).toString('d'),$.e.calendar)
,unselect:(e)=>(e.$('div.body>div>button.selected',{class:{remove:'selected'}}),$.e.calendar)
,setValue:(e,dt)=>{e.value=dt.to('d');$.e.calendar.requery(e,dt.y(),dt.m())}
}//calendar

$.css.themes.default.push({calendar:{
bg_c:'#111',ft_c:'#CCC',ft_no_c:'#E60',ft_hover_c:'#FFF',br_hover_c:'#777'
// bg_c:'#E9E9E9',ft_c:'#222',ft_no_c:'#F00',ft_hover_c:'#590',br_hover_c:'#222'
,ft_s:16,boxWidth:35,boxHeight:35
}});

$.css(`
calendar{display:inline-block;background-color:$(calendar.bg_c);font-size:$(calendar.ft_s)px;color:$(calendar.ft_c);border:solid 1px #666;border-radius:4px;box-shadow:2px 2px 4px #111;padding:4px;}
.calendar_box{display:inline-block;text-align:center;width:$(calendar.boxWidth)px;height:$(calendar.boxHeight)px;background-color:$(calendar.bg_c)+0.6;line-height:$(calendar.boxHeight)px;border:none;color:inherit;font-size:inherit}
calendar>table.head{border-collapse:collapse;border:none;border-bottom:solid 2px $(calendar.bg_c)+1;box-shadow:0 1px 2px $(calendar.bg_c)-2}
calendar>table>tr>td{border:solid 2px $(calendar.bg_c)+1}
calendar>table.head button{
	&(.calendar_box);
	background-color:$(calendar.bg_c)+1;
	font-size:150%;
}
calendar select,calendar input{&(.calendar_box);width:calc((5 * $(calendar.boxWidth)px) - 15px);background-color:inherit;color:#999;appearance:none}
calendar>div>box{&(.calendar_box);font-size:70%;background-color:inherit;color:$(calendar.ft_c)-6}
calendar>div.body>div>button{&(.calendar_box);outline:none;border:solid 1px $(calendar.bg_c)}
calendar>div.body>div>button.feriado{color:$(calendar.ft_no_c)}
calendar>div.body>div>button:hover,calendar>div.body>div>button:focus{border:dashed 1px $(calendar.br_hover_c);color:$(calendar.ft_hover_c);font-weight:bold}
calendar>div.body>div>button.selected{
	background-color:#241;
	color:#AE0;
	font-weight:bold;
}`)

})(TepuyJs);
