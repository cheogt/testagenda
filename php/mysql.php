<?php

// conexión
$mysqli = new mysqli("localhost", "root", "", "agenda");
if($mysqli->connect_errno)die("Falló la conexión: \n".$mysqli->connect_error);
if(!$mysqli->set_charset("utf8"))die("Error cargando el conjunto de caracteres utf8 \n".$mysqli->error);

?>