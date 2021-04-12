<?php
App::uses('AppController', 'Controller');

class DirectorPamerController extends AppController {

    public $uses = array('Usuario');

    // ----------- METODOS DE ERICK PRADO -----------
 



    // ----------- FIN METODOS DE ERICK PRADO -----------
    
    
    // ----------- METODOS DE EDGAR -----------

    public function directormerito() {
        
        AppController::isAuthorized();
        $this->layout = 'pages';
        $this->set('titPage', '');
        $this->set('subTitPage', ' '.date("Y"));
        $this->set('objJS', '<!-- Css -->');
        $this->set('piePag', '<!-- Java -->'.'<script src="../js/librerias/directormerito.js?1"></script>');
    }



    // ----------- FIN METODOS DE EDGAR -----------


    // ----------- METODOS DE ERICK HUARACHA -----------
    // ----------- FIN METODOS DE ERICK HUARACHA -----------

    public function getdatos($op = null) {

        $usuario = $this->Session->read('usuario');
        if (count($usuario) <= 0) {

            $response = array(
                'success' => false,
                'message' => 'SESSION',
                'data' => 'SesiÃ³n Expirada. Por favor vuelva iniciar sesiÃ³n para continuar'
            );
            $encoded = json_encode($response);
            exit(AppController::fnEncrypt($encoded));
        }

        if ($this->request->is('post')) {
            $this->layout = '';
            ini_set('max_execution_time', 300);
            ini_set('max_input_time', 300);
            $sql = '';

            if (isset($op)) {
                switch ($op)
                {
                    // ----------- GET DE ERICK PRADO 1-50 -----------
                  


                    // ----------- FIN GET DE ERICK PRADO -----------


                    // ----------- GET DE EDGAR 51 - 100 -----------



                  

                    // ----------- FIN GET DE EDGAR -----------


                    // ----------- GET DE ERICK HUARACHA 101- 150 -----------
                    // ----------- FIN GET DE ERICK HUARACHA -----------
                    
                }
            } else {
                exit();
            }
        } else {
            $this->redirect('/#' . $usuario->correo);
        }
    }


    public function mantto($op = null) {

        if ($this->Session->check('usuario') !== true) {

            $response = array(
                'success' => false,
                'message' => 'SESSION',
                'data' => 'SesiÃ³n Expirada. Por favor vuelva iniciar sesiÃ³n para continuar'
            );

            $encoded = json_encode($response);
            //exit(AppController::fnEncrypt($encoded));
            exit($encoded);

        }

        $usuario = $this->Session->read('usuario');

        if ($this->request->is('post')) {

            $this->layout = '';
            ini_set('max_execution_time', 300);
            $sql = '';

            if (isset($op)) {
                switch ($op) {

                    // case 1:
                    //     $prejson = $this->request->data('objJSON');
                    //     $json = AppController::JSONisValid($prejson);
                    //     $sql = "CALL NPV_PAMERGAMER_PERFIL_GET('$usuario->codigo','$json->personaje','$json->nick')";
                    //     exit(AppController::getResult($sql));
                    // break;

                    // case 3:
                    //     $prejson = $this->request->data('objJSON');
                    //     $json = AppController::JSONisValid($prejson);
                    //     $sql = "CALL NPV_PAMERGAMER_GRABAR_EXAMEN('$usuario->codigo','$json->curso','$json->semana','$json->preg1','$json->preg2','$json->preg3','$json->preg4')";
                    //     exit(AppController::getResult($sql));
                    // break;

                }
            } else {
                exit();
            }
        } else {
            $this->redirect('/#' . $usuario->correo);
        }
    }

    public function close() {
        $this->Session->destroy();
        session_destroy();
        $this->redirect('/users');
    }
}