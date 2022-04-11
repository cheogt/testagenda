($=>{
/*
	let eSel=a1.push({tag:'select'
		,body:[[1,'uno','num'],[2,'dos','num'],['a','A','letra']]
		// ,render:true
		// ,filter:r=>r[2]==='num'
		,filter:r=>false
	});
*/
/**
	select!
*/$.e.select={headDefault:['','...']
,create:(o)=>{let e=document.createElement('select');e.o={data:{head:o.head===null?null:o.head||$.e.select.headDefault,body:o.body||[]}};e.o.data.source=e.o.data.body.clone();for(let k in o)if(e.conf.data.hasOwnProperty(k)){$.e.table[k](e,o[k]);delete(o[k])}e.attr(o);return e}
,t:(e)=>e.options[e.selectedIndex].text
,a:(e,a)=>a.forEach(r=>$.e.select.add(e,r))
,add:(e,a)=>{a=a.T==='a'?a:[a,a];let ch=document.createElement('option');ch.value=a[0];ch.text=a[1];e.add(ch);return ch}
,removeAll:(e)=>{for(r in e.options)e.options.remove(0)}
,render:(e)=>{$.e.select.removeAll(e);if(e.o.data.head)$.e.select.add(e,e.o.data.head).classList.add('head');$.e.select.a(e,e.o.data.body)}
,filter:(e,f)=>{e.o.data.body=e.o.data.source.filter(f);$.e.select.render(e)}
};
})(TepuyJs);


/*
	e=e3.push({tag:'table',class:'cssTable'
		// ,selectable:'simple'
		,head:[['col1','col2','col3']]
		,body:[
			[ 1,'a','acdefghi jasdmk ajsdjjasdj sdjsdj']
			,[2,'b','bcdefghi jasdmk ajsdjjasdj sdjsdj']
			,[3,'c','ccdefghi jasdmk ajsdjjasdj sdjsdj']
			,[4,'d','dcdefghi jasdmk ajsdjjasdj sdjsdj']
		]
		// ,onselect:function(event){ log(this,event.selected,event.target) }
		,grid:{
			0:{tag:'input',afterEdit:(td)=>log(td)}
		}
	});
*/
($=>{
/**
	table!
*/let ø=undefined;
$.e.table={
create:o=>{let e=document.createElement('table');e.conf={data:{head:o.head,body:o.body||[]}};e.o.data.source=e.o.data.body.clone();for(let k in o)if(e.conf.data.hasOwnProperty(k)){$.e.table[k](e,o[k]);delete(o[k])}e.attr(o);return e}
,native_section:(e,eSection)=>eSection&&eSection.T==='s'?$.e.table[eSection](e):(eSection||e)
,native_insertCell:(eTr,v)=>{let e=document.createElement(eTr.parentElement.tag==='thead'?'th':'td');if(v.T==='o'&&!v.tag){e.value=v.value;e.textContent=v.text}else e[v.T==='s'||v.T==='n'?'text':'push'](v);return eTr.appendChild(e)}
,native_toA:(e,type)=>{type=type||'textContent';let a=[];$.e.table.tBody(e).children.a().forEach(tr=>{let atds=[];tr.children.a().forEach(td=>atds.push(td[type]));a.push(atds)});return a}
,native_addRows:(e,eSection,a)=>{eSection=$.e.table.native_section(e,eSection);let row;a.forEach(r=>{row=eSection.insertRow();r.forEach(c=>$.e.table.native_insertCell(row,c))});return row}

,tHead:e=>e.tHead||e.createTHead(),tBody:e=>(e.tBodies||[])[0]||e.createTBody(),tFoot:e=>e.tFoot||e.createTFoot()
,a:(e,a)=>a&&a.T==='a'?$.e.table.native_addRows(e,'tBody',a):$.e.table.native_toA(e,a)
,head:(e,a)=>$.e.table.native_addRows(e,'tHead',a)
,body:(e,a)=>$.e.table.native_addRows(e,'tBody',a)
,foot:(e,a)=>$.e.table.native_addRows(e,'tFoot',a)
,removeAll:(e,eSection)=>$.e.table.native_section(e,eSection).innerHTML=''
,unselectAll:e=>e.$('tbody>tr',{class:{remove:'selected'}})
,selectable:(e,s)=>{e.conf.multiSelects||'simple';e.attr({class:{add:'selectable'},onclick:function(event){let tr=event.target.tag==='tr'?event.target:event.target.parent('tr');if(!tr||tr.tag!=='tr'||tr.p.tag!=='tbody')return;let b=tr.classList.contains('selected');if(e.conf.multiSelect!=='multiselect')$.e.table.unselectAll(e);if(b)tr.attr({class:{remove:'selected'}});else tr.attr({class:{add:'selected'}});if(e.onselect)e.onselect({target:tr,selected:!b})}})}
,filter:(e,f)=>{e.o.data.body=e.o.data.source.filter(f);let tb=$.e.table.tBody(e);$.e.table.removeAll(e,tb);$.e.table.native_addRows(e,tb,e.o.data.body)}
,grid:((e,o)=>{if(!e.conf.grid)e.conf.grid={};e.conf.grid.push(o);e.event({onclick:function(event){let td=event.target.tag==='td'?event.target:event.target.parent('td');if(!td||td.tag!=='td'||td.p.p.tag!=='tbody')return;$.e.table.grid.ctrlshow(e,td)}})})
.push({
	ctrlshow:(e,td)=>{let oCtrl=e.conf.grid[td.cellIndex];if(!oCtrl||td.children.length)return;let eCtrl=$.e.create(oCtrl);eCtrl.beforeEdit=eCtrl.afterEdit=ø;eCtrl.attr({value:td.value||td.text(),css:{padding:0,w:td.css('w')-10},onblur:()=>$.e.table.grid.ctrlhide(e,td,eCtrl)});td.innerHTML='';td.appendChild(eCtrl);eCtrl.select();if(eCtrl.beforeEdit)eCtrl.beforeEdit.call(td,td)}
	,ctrlhide:(e,td,ctrl)=>{td.setAttribute('value',ctrl.v());td.text(ctrl.t());ctrl=e.conf.grid[td.cellIndex];if(ctrl.afterEdit)ctrl.afterEdit.call(td,td)}
})
}//table

$.css(`
.cssTable{border-collapse:collapse;table-layout:auto;empty-cells:show;background-color:$(bg_c)+0.2;border:solid 1px $(br_c)}
.cssTable>thead>tr>th{&(.bt);font-weight:bold;border:solid 1px $(br_c);border-radius:$(br_rd)px;padding:$(padding)px;cursor:default}
.cssTable>tbody>tr>td{padding:$(padding)px;border:solid 1px $(br_c);}
.cssTable>tbody>tr:nth-child(even){background-color:$(bg_c)+1}
.cssTable.selectable{cursor:pointer}
.cssTable.selectable>tbody>tr:hover{background-color:$(selected.bg_c)-1;color:$(selected.ft_c)}
.cssTable.selectable>tbody>tr.selected{background-color:$(selected.bg_c);color:$(selected.ft_c)}
.cssTable>thead.sortable th.sortable{cursor:pointer}
.cssTable>thead.sortable th.sortable:hover{&(.bt:hover)}
.cssTable>thead.sortable th.asc{border-top:solid 2px #f90}
.cssTable>thead.sortable th.desc{border-bottom:solid 2px #f90}
.cssTable>tbody.editable{cursor:pointer}
.cssTable>tbody.editable tr td:hover{background-color:#0F0!important}
.table_cell_br td{border:solid 1px $(br_c)}
`);
})(TepuyJs);
