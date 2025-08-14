<?php
require_once '../service.php';

$action= $_GET['action'];

if($action == 'create') {
    $reference= date('dmYHis') . rand(1, 1000);
    $objet= $_REQUEST['objet'];
    $description= $_REQUEST['description'];
    $priorite= $_REQUEST['priorite'];
    $statut= 'En cours';
    $date_echeance= $_REQUEST['date_echeance'];

    try {
        $tachedb->create($reference, $objet, $description, $priorite, $statut, $date_echeance);
        $tache= $tachedb->read($reference);
        $package->setJSONResponseSuccess("Tâche ajoutée avec succès", $tache);
    }
    catch(Exception $ex) {
        $package->setJSONResponseError("Erreur : " . $ex->getMessage());
    }
}



if($action == 'update') {
    $reference= $_REQUEST['reference'];
    $objet= $_REQUEST['objet'];
    $description= $_REQUEST['description'];
    $priorite= $_REQUEST['priorite'];
    $statut= $_REQUEST['statut'];
    $date_echeance= $_REQUEST['date_echeance'];

    try {
        $tachedb->update($reference, $objet, $description, $priorite, $statut, $date_echeance);
        $tache= $tachedb->read($reference);
        $package->setJSONResponseSuccess("Tâche modifiée avec succès", $tache);
    }
    catch(Exception $ex) {
        $package->setJSONResponseError("Erreur : " . $ex->getMessage());
    }
}


if($action == 'update_statut') {
    $reference= $_REQUEST['reference'];
    $statut= $_REQUEST['statut'];

    try {
        $tachedb->updateStatut($reference, $statut);
        $tache= $tachedb->read($reference);
        $package->setJSONResponseSuccess("Statut de la tâche #$reference modifié avec succès", $tache);
    }
    catch(Exception $ex) {
        $package->setJSONResponseError("Erreur : " . $ex->getMessage());
    }
}



if($action == 'delete') {
    $reference= $_REQUEST['reference'];

    try {
        $tachedb->delete($reference);
        $package->setJSONResponseSuccess("Tâche supprimée avec succès");
    }
    catch(Exception $ex) {
        $package->setJSONResponseError("Erreur : " . $ex->getMessage());
    }
}



if($action == 'read') {
    $reference= $_REQUEST['reference'];

    try {
        $datas= $tachedb->read($reference);
        $package->setJSONResponseSuccess("Tâche trouvée", $datas);
    }
    catch(Exception $ex) {
        $package->setJSONResponseError("Erreur : " . $ex->getMessage());
    }
}



if($action == 'readall') {
    try {
        $datas= $tachedb->readAll();
        $package->setJSONResponseSuccess("Tâches trouvées", $datas);
    }
    catch(Exception $ex) {
        $package->setJSONResponseError("Erreur : " . $ex->getMessage());
    }
}


?>