// Inicializar la libreria
window.$=TepuyJs;
$.css.loadTheme('default');

// -------------------------------
// Codigo inicial de la aplicación
onload=function(){
	window.agenda=new Agenda($('.canvas')[0]);

	agenda.datos.user.id=25
	agenda.datos.user.nombre="Usuario de Prueba 25"
	agenda.datos.agenda=[
		//  ['2022-03-07','05:00','06:30',"Test0"]
		// ,['2022-04-01','06:00','08:30',"Test1"]
		// ,['2022-04-10','14:15','14:30',"Test3"]
		// ,['2022-04-02','10:25','11:25',"Test2"]
		// ,['2022-04-24','10:25','11:25',"Test4"]
	]
	request=$.ajax({
		file:'php/route.php'
		,send:{
			include:"agenda_actividades"
			,accion:"consultar"
			,datos:$.s({
				user:agenda.datos.user
				,actividades:[]
			},'json')
		}
		// ,onload:(s)=>{
		// 	let o=$.eval(s,{ok:0,msg:"Consultar: No fue posible recibir respuesta del servidor."});
		// 	alert($.t(o.datos))
		// 	log(o.datos)
		// 	// agenda.datos.agenda=o.datos
		// }
	});
	// alert(request.responseText)
	let o=$.eval(
		request.responseText
		,{ok:0,msg:"Consultar: No fue posible recibir respuesta del servidor."}
	);
	log(o)
	if(o&&o.ok&&o.ok>0)agenda.datos.agenda=o.datos;

	agenda.render.limpiar();
	agenda.render.usuario();
	agenda.render.calendario();
	agenda.render.agenda();
	agenda.actualizaDatos();
}

// -------------------------------
class Agenda{
	eCanvas=null;
	eCalendar=null;
	eUser=null;
	eAgenda=null;
	eDialogo=null;
	// This=this;
	datos={
		user:{id:0,nombre:""}
		,agenda:[]
	};
	findIndex=(o)=>{
		let a=this.datos.agenda;
		for(let y=0;y<a.length;y++)
			if(o.fecha===a[y][0] && o.horaI===a[y][1] && o.horaF===a[y][2]) return y;
		return -1
	}

	// -------------
	// HTML DOM
	render={
		limpiar:()=>this.eCanvas.innerHTML=""

		,usuario:()=>{
			let eUser=this.eCanvas.push({tag:'div',id:'user'
				,push:[
					{tag:'div',push:[
						// {tag:'h3',textContent:"Usuario"},
						{tag:'span',class:"legend",textContent:"Id: "}
						,{tag:'span',class:"value",textContent:this.datos.user.id+''}
						,{tag:'br'}
						,{tag:'span',class:"legend",textContent:"Nombre: "}
						,{tag:'span',class:"value",textContent:this.datos.user.nombre}
						,{tag:'div',innerHTML:'&nbsp;'}
					]}
				]
			});
			// this.eUser.push({tag:'calendar'});
		}

		,calendario:()=>{
			let This=this;
			this.eCalendar=this.eCanvas.push({tag:'calendar'});
			this.eCalendar.onselect=()=>This.filtrar();
			this.eCalendar.onrequery=()=>This.actualizaDatos();
			this.eAgenda=this.eCanvas.push({tag:'div',class:'grid'});
		}

		,agenda:()=>{
			let This=this;
			this.eAgenda.innerHTML="";
			let a=this.datos.agenda.clone();
			a.sort();
			this.eGrid=this.eAgenda.push({tag:"table",class:"actividades"
				,head:[["Fecha","Inicio","Fin","Actividad"]]
				// ,a:a
			});
			this.eAgenda.push({tag:'hr'});
			this.eAgenda.push({tag:'button',class:"btnNewAct",textContent:'+ Nueva Actividad',onclick:()=>{
				This.dialogoFromO({fecha:This.eCalendar.value||"",horaI:"",horaF:"",actividad:""});
				This.eDialogo.grabar=()=>{
					let a=[['','','','']];
					let idx=This.datos.agenda.push(a)-1;
					let eTr=$.e.table.body(This.eGrid,a);
					let o=This.dialogoToO();
					This.rowFromO(eTr,o);
					This.actualizaDatos(eTr,idx);
				};
				This.eDialogo.showModal()
			}});
			this.eCanvas.push({tag:'hr',style:'margin:15px 0'});

			//Grabar datos
			this.eCanvas.push({tag:'div',class:'save',push:{tag:'button',textContent:'Grabar Agenda',onclick:()=>{
				$.ajax({
					file:'php/route.php'
					,send:{
						include:"agenda_actividades"
						,accion:"grabar"
						,datos:$.s({
							user:This.datos.user
							,actividades:This.datos.agenda
						},'json')
					}
					,onload:(s)=>{
						let o=$.eval(s,{ok:0,msg:"No fue posible recibir respuesta del servidor."});
						alert(
							o.ok&&o.ok>0 ? o.msg+"\nRegistros: "+o.ok
								 : "No fueron grabados los datos\n"+o.msg
						)
					}
				});
			}}});
		}

		,rowAddButtonCells:(eTr)=>{
			let This=this;
			if(eTr.children.length>4)return;
			//Editar
			eTr.push({tag:'td',push:{tag:'button',textContent:'Editar',onclick:function(){
				let eTr=this.p.p;
				let o=This.rowToO(eTr);
				let idx=This.findIndex(o);
				This.dialogoFromO(o);
				This.eDialogo.grabar=(o)=>{
					This.rowFromO(eTr,o);
					This.actualizaDatos(eTr,idx);
				}
				This.eDialogo.showModal();
			}}});
			//Eliminar
			eTr.push({tag:'td',push:{tag:'button',textContent:'X',onclick:function(){
				let eTr=this.p.p;
				let o=This.rowToO(eTr);
				let idx=this.findIndex(o);
				if(idx>-1)This.datos.agenda.remove(idx);
				eTr.remove()
			}}});
		}

		//-------------
		// Dialogo
		,crearDialogo:()=>{
			let This=this;
			this.eDialogo=$('#hidden').push({tag:'dialog',id:"actividad",push:[
				{tag:'h2',text:"Actividad"}
				,{tag:'label',innerHTML:"<span class='legend'>Fecha: </span>",push:
					{tag:'input',type:'date',id:'fecha',name:'fecha',required:'required',pattern:'[0-9]{4}-[0-9]{2}-[0-9]{2}'}
				}
				,{tag:'br'}
				,{tag:'label',innerHTML:"<span class='legend'>Inicio: </span>",push:
					{tag:'input',type:'time',id:'horaI',name:'horaI',required:'required',pattern:'[0-9]{2}:[0-9]{2}'}
				}
				,{tag:'br'}
				,{tag:'label',innerHTML:"<span class='legend'>Fin: </span>",push:
					{tag:'input',type:'time',id:'horaF',name:'horaF',required:'required',pattern:'[0-9]{2}:[0-9]{2}'}
				}
				,{tag:'br'}
				,{tag:'label',innerHTML:"<span class='legend'>Actividad: </span>",push:
					{tag:'textarea',id:'actividad',name:'actividad',required:'required'}
				}
				,{tag:'hr'}
				,{tag:'button',text:'Aceptar',onclick:()=>{
					let o=This.dialogoToO();
					This.eDialogo.grabar(o);
					This.eDialogo.close()
				}}
				,{tag:'button',text:'Cancelar',onclick:()=>This.eDialogo.close()}
				// ,{tag:'div',innerHTML:'&nbsp;'}
			]});
		}
	};


	dialogoToO=()=>{
		let o={};
		o.fecha=this.eDialogo.$("#fecha").value;
		o.horaI=this.eDialogo.$("#horaI").value;
		o.horaF=this.eDialogo.$("#horaF").value;
		o.actividad=this.eDialogo.$("#actividad").value;
		return o;
	};
	dialogoFromO=(o)=>{
		this.eDialogo.$("#fecha").value=o.fecha;
		this.eDialogo.$("#horaI").value=o.horaI;
		this.eDialogo.$("#horaF").value=o.horaF;
		this.eDialogo.$("#actividad").value=o.actividad;
	};

	rowToO=(eTr)=>{
		let o={};
		let aTd=eTr.$('td');
		o.fecha=aTd[0].textContent;
		o.horaI=aTd[1].textContent;
		o.horaF=aTd[2].textContent;
		o.actividad=aTd[3].textContent;
		return o;
	};
	rowFromO=(eTr,o)=>{
		let aTd=eTr.$('td');
		aTd[0].textContent=o.fecha;
		aTd[1].textContent=o.horaI;
		aTd[2].textContent=o.horaF;
		aTd[3].textContent=o.actividad;
		this.render.rowAddButtonCells(eTr);
	};

	actualizaDatos=(eTr,idx)=>{
		let a=this.datos.agenda;
		let y=this.eCalendar.conf.year.value;
		let m=this.eCalendar.conf.month.value;
		let len=new Date().ymd(y,m,1).monthLastDay();

		//Actualizar array this.datos.agenda
		if(eTr){
			let o=this.rowToO(eTr);
			if(!idx&&idx!==0)idx=this.findIndex(o);
			if(idx>-1){
				a[idx][0]=o.fecha;
				a[idx][1]=o.horaI;
				a[idx][2]=o.horaF;
				a[idx][3]=o.actividad;
			}
		}
		//Refrescar fechas con contenido
		this.eCalendar.$('div.body>div>button').forEach(eBtn=>eBtn.attr({class:{remove:'contains'}}));
		for(let i=1;i<=len;i++){
			let sYMDFecha=new Date().ymd(y,m,i).toString('d');
			a.forEach(row=>{
				if(row[0]===sYMDFecha){
					let eBtn=this.eCalendar.$('[name="c'+i+'"]')[0];
					eBtn.attr({class:{add:'contains'}});
				}
			});
		}
	};

	filtrar=()=>{
		// this.actualizar();
		$.e.table.tBody(this.eGrid).innerHTML="";
		// $(this.eGrid,{removeAll:true});
		let sYMDFecha=this.eCalendar.value;//.toString('d');
		let a=[];
		this.datos.agenda.forEach(row=>{
			if(row[0]===sYMDFecha)a.push(row)
		});
		this.eGrid.attr({a:a});
		this.eGrid.$('tbody>tr').forEach(eTr=>this.render.rowAddButtonCells(eTr));
	}

	constructor(eCanvas){
		this.eCanvas=eCanvas;
		this.render.crearDialogo();
	};
}//Class Agenda


