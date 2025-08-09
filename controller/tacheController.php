<?php
require_once '../service.php';

$action= $_GET['action'];

if($action == 'create') {
    $reference= date('dmYHis') . rand(1, 1000);
    $objet= $_POST['objet'];
    $description= $_POST['description'];
    $priorite= $_POST['priorite'];
    $statut= 'En cours';
    $date_echeance= $_POST['date_echeance'];

    try {
        $tachedb->create($reference, $objet, $description, $priorite, $statut, $date_echeance);
        $package->setJSONResponseSuccess("Tâche ajoutée avec succès");
    }
    catch(Exception $ex) {
        $package->setJSONResponseError("Erreur : " . $ex->getMessage());
    }
}

?>