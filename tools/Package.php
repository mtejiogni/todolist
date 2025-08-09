<?php
class Package {
    public function __construct() {
    }

    public function escapeField($field) {
        $data= htmlentities($field, ENT_NOQUOTES, 'UTF-8');
        $data= addcslashes($data);
        return $data;
    }

    public function setJSONResponseSuccess($message, $datas= null) {
        echo json_encode (
            array(
                'message' => $message,
                'datas' => $datas,
                'status' => 'success',
                'date' => date('d/m/Y-H:i:s')
            )
        );
    }

    public function setJSONResponseError($message) {
        echo json_encode (
            array(
                'message' => $message,
                'status' => 'error',
                'date' => date('d/m/Y-H:i:s')
            )
        );
    }
}
?>