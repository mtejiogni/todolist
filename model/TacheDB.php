<?php
require_once 'Database.php';

class TacheDB {
    private $db;
    private $nametable;
    private $idtable;

    public function __construct() {
        $this->db= new Database();
        $this->nametable= 'tache';
        $this->idtable= 'reference';
    }

    public function create($reference, $objet, $description, $priorite, $statut, $date_echeance) {
        $sql= "insert into $this->nametable set reference=?, objet=?, description=?, priorite=?, statut=?, date_echeance=?";
        $params= array($reference, $objet, $description, $priorite, $statut, $date_echeance);
        $this->db->prepare($sql, $params);
    }

    public function update($reference, $objet, $description, $priorite, $statut, $date_echeance) {
        $sql= "update $this->nametable set objet=?, description=?, priorite=?, statut=?, date_echeance=? where reference=?";
        $params= array($objet, $description, $priorite, $statut, $date_echeance, $reference);
        $this->db->prepare($sql, $params);
    }

    public function delete($reference) {
        $sql= "delete from $this->nametable where reference=?";
        $params= array($reference);
        $this->db->prepare($sql, $params);
    }

    public function read($reference) {
        $sql= "select * from $this->nametable where $this->idtable= ?";
        $params= array($reference);
        $req= $this->db->prepare($sql, $params);
        $datas= $this->db->getDatas($req, true);
        return $datas;
    }

    public function readAll() {
        $sql= "select * from $this->nametable order by $this->idtable desc";
        $params= null;
        $req= $this->db->prepare($sql, $params);
        $datas= $this->db->getDatas($req, false);
        return $datas;
    }
}

?>