(($)=>{
/**
	Date!
*/$.css.themes.default.push({
	// bg_c:'#444',ft_c:'#BBB'
	// bg_c:'#2A3245',ft_c:'#BBB',br_c:'#666'
	bg_c:'#E0EAEF',ft_c:'#444',br_c:'#666'
	,ft_s:14
	,spc:5
	,br_c:'#567',br_rd:4
	,padding:5
	,link:{
		ft_c:'#69F'
	}
	,bt:{
		padding:5
		,bg_c:'#222'
		,ft_c:'#CF9'
	}
	,box:{
		padding:20
		,bg_c:'#222'
	}
	,selected:{
		bg_c:"#069"
		,ft_c:"#FFF"
	}
});

$.css(`*{ box-sizing:border-box }
box{ display:inline-block }
win{display:block;position:absolute}
body{
	margin:0; padding:0; min-width:100%!important;
	font-family:verdana,arial,sans; font-size:$(ft_s)px;
	background-color:$(bg_c);
	color:$(ft_c);
	letter-spacing:1px;
}
.h1{font-size:$(ft_s)+2px;margin:$(spc)px 0}
.canvas{
	margin:$(spc)*3px;
	padding:$(spc)*3px;
	background-color:$(bg_c)+0.3;
	border:solid 1px $(bg_c)-3;
	border-radius:$(br_rd)*2px;
}
.section{
	padding:$(spc)*2px;
	background-color:$(bg_c)+0.4;
	border-radius:$(br_rd)px;
	border:solid 1px $(bg_c)-3;
	box-shadow:2px 2px 1px $(bg_c)+1.2,2px 2px 1px $(bg_c)+1.2 inset;
}
.box{
	position:absolute;
	background-color:$(box.bg_c);
	border:solid 1px $(box.bg_c)+3;
	border-radius:$(br_rd)*2px;
	box-shadow:2px 2px 4px $(box.bg_c)-5;
	padding:$(spc)*4px;
	display:none;
}
.bt{
	background-color:$(bt.bg_c);
	color:$(bt.ft_c);
	border:solid 1px $(br_c);
}
.bt:hover{
	outline:solid 1px #0C0;
}
`)

})(TepuyJs);