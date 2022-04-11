<?php

include("mysql.php");
$idUsr=$datos->user->id;

// Acciones
switch($accion){
	case "grabar":
		try{
			$mysqli->query("DELETE FROM actividades WHERE idUsr=$idUsr");
			$a=$datos->actividades;
			$sql='';
			$len=count($a);
			for($y=0;$y<$len;$y++){
				$r=$a[$y];
				$sql.=(($y==0)?'':',')."($idUsr,'$r[0]','$r[1]','$r[2]','$r[3]')";
			}
			$mysqli->query("INSERT INTO actividades(idUsr,fecha,horaI,horaF,actividad)VALUES".$sql);
		}catch(Exception $err){ die('{"ok":0,"msg":"'+$err->getMessage()+'"}'); }
		echo("{
			\"ok\":$mysqli->affected_rows
			,\"msg\":\"Datos grabados\"
		}");
	break;
	case "consultar":
		$a=Array();
		$q = $mysqli->query("SELECT fecha,horaI,horaF,actividad FROM actividades WHERE idUsr=$idUsr");
		while($r=$q->fetch_array()) {
			$a[] = Array($r[0],$r[1],$r[2],$r[3]);
		}
		echo("{
			\"ok\":".count($a)."
			,\"datos\":".json_encode($a)."
		}");
	break;
}

?>