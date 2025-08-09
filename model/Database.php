<?php
class Database {
    private $dsn;
    private $user;
    private $pass;
    private $pdo;

    public function __construct() {
        $this->dsn= 'mysql:host=localhost;dbname=todolistdb;port=3306;charset=utf8';
        $this->user= 'root';
        $this->pass= '';
    }

    public function getPDO() {
        if($this->pdo === null) {
            $this->pdo= new PDO($this->dsn, $this->user, $this->pass);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
            $this->pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        }
        return $this->pdo;
    }

    public function prepare($sql, $params= null) {
        $req= $this->getPDO()->prepare($sql);
        if(is_null($params)) {
            $req->execute();
        }
        else {
            $req->execute($params);
        }
        return $req;
    }

    public function getDatas($req, $one= true) {
        $datas= null;

        if($one == true) {
            $datas= $req->fetch();
        }
        else {
            $datas= $req->fetchAll();
        }
        return $datas;
    }
}

?>