<?php 
session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: token, Content-Type');
header('Content-Type: application/json');

require_once 'model/TacheDB.php';
require_once 'tools/Package.php';

$tachedb= new TacheDB();
$package= new Package();
?>