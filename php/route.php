<?php
if($_SERVER["REQUEST_METHOD"]!="POST")die("Acesso restringido");

$include=$_REQUEST['include'];
$accion=$_REQUEST['accion'];
$datos=json_decode($_REQUEST['datos']);

include("$include.php");

?>