<?php
App::uses('AppController', 'Controller');

class DirectorPamerController extends AppController {

    public $uses = array('Usuario');

    // ----------- METODOS DE ERICK PRADO -----------
    public function controltareas() {
        
        AppController::isAuthorized();
        $this->layout = 'pages';
        $this->set('titPage', '');
        $this->set('subTitPage', ' '.date("Y"));
        $this->set('objJS', '<!-- Css -->');
        $this->set('piePag', '<!-- Java -->'.'<script src="../js/librerias/controltareas.js?212"></script>');
    }

    public function controltareas_tutorsalon() {
        
        AppController::isAuthorized();
        $this->layout = 'pages';
        $this->set('titPage', '');
        $this->set('subTitPage', ' '.date("Y"));
        $this->set('objJS', '<!-- Css -->');
        $this->set('piePag', '<!-- Java -->'.'<script src="../js/librerias/controltareas_tutorsalon.js?212"></script>');
    }



    // ----------- FIN METODOS DE ERICK PRADO -----------
    
    
    // ----------- METODOS DE EDGAR -----------

    public function vistadirector() {
        
        AppController::isAuthorized();
        $this->layout = 'pages';
        $this->set('titPage', '');
        $this->set('subTitPage', ' '.date("Y"));
        $this->set('objJS', '<!-- Css -->');
        $this->set('piePag', '<!-- Java -->'.'<script src="../js/librerias/vistadirector.js?3121"></script>');
    }


    public function vistadirectormeritosalon() {  //MERITO POR SALON
        
        AppController::isAuthorized();
        $this->layout = 'pages';
        $this->set('titPage', '');
        $this->set('subTitPage', ' '.date("Y"));
        $this->set('objJS', '<!-- Css -->');
        $this->set('piePag', '<!-- Java -->'.'<script src="../js/librerias/vistadirectormeritosalon.js?2313"></script>');
    }


    public function vistadirectoreva() {  //MERITO POR SALON EVA
        
        AppController::isAuthorized();
        $this->layout = 'pages';
        $this->set('titPage', '');
        $this->set('subTitPage', ' '.date("Y"));
        $this->set('objJS', '<!-- Css -->');
        $this->set('piePag', '<!-- Java -->'.'<script src="../js/librerias/vistadirectoreva.js?5"></script>');
    }

    public function vistadirectoracademico() {  //RENDIMIENTO POR SALONES
        
        AppController::isAuthorized();
        $this->layout = 'pages';
        $this->set('titPage', '');
        $this->set('subTitPage', ' '.date("Y"));
        $this->set('objJS', '<!-- Css -->');
        $this->set('piePag', '<!-- Java -->'.'<script src="../js/librerias/vistadirectoracademico.js?11"></script>');
    }

    public function vistadirectorcuadropregunta() {  //CUADRO ESTADISTICA DE PREGUNTA
        
        AppController::isAuthorized();
        $this->layout = 'pages';
        $this->set('titPage', '');
        $this->set('subTitPage', ' '.date("Y"));
        $this->set('objJS', '<!-- Css -->');
        $this->set('piePag', '<!-- Java -->'.'<script src="../js/librerias/vistadirectorcuadropregunta.js?12"></script>');
    }

    public function vistadirectorasistencia() {  //CONTROL DE ASISTENCIA
        
        AppController::isAuthorized();
        $this->layout = 'pages';
        $this->set('titPage', '');
        $this->set('subTitPage', ' '.date("Y"));
        $this->set('objJS', '<!-- Css -->');
        $this->set('piePag', '<!-- Java -->'.'<script src="../js/librerias/vistadirectorasistencia.js?121"></script>');
        $this->set('objJS', '<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />');
        $this->set('objJS', '<script src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>');
        $this->set('objJS', '<script src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>');
        $this->set('objJS', '<script src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>');
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
                    case 1: //7 nuevo
                        $ciclo = $this->request->data['ciclo'];
                        $linea = $this->request->data['linea'];
                        $sql = "CALL SP_DIRECTOR_SEMANA_TAREA($ciclo,$linea)";
                        exit(AppController::getDataTable($sql));  
                    break;

                    case 2: //7 nuevo
                        $ciclo = $this->request->data['ciclo'];
                        $linea = $this->request->data['linea'];
                        $semana = $this->request->data['semana'];
                        $sql = "CALL SP_DIRECTOR_SEMANA_TAREA_DET($ciclo,$linea,$semana)";
                        exit(AppController::getDataTable($sql));  
                    break;

                    case 3: //7 nuevo
                        $ciclo = $this->request->data['ciclo'];
                        $linea = $this->request->data['linea'];
                        $semana = $this->request->data['semana'];
                        $salon = $this->request->data['salon'];
                        $sql = "CALL SP_DIRECTOR_SEMANA_TAREA_DET_TUTORSALON($ciclo,$linea,$semana,$salon)";
                        exit(AppController::getDataTable($sql));  
                    break;


                    // ----------- FIN GET DE ERICK PRADO -----------


                    // ----------- GET DE EDGAR 51 - 100 -----------


                    case 51:
 
                        $cosalones =  $this->request->data['cosalones'];          
                         $sql = "CALL NPV_DATOSALUMNO_COMBO_SALONES($cosalones)";
                         exit(AppController::getDataTable($sql));
                         
                     break;
 
                     case 52:
                         // SLIDER SIMULACRO ENTREGA DE CASE
                         $linea =  $this->request->data['linea']; 
                         $ciclo =  $this->request->data['ciclo'];                                              
                     
                         $sql = "CALL SP_TUTOR_SLIDER_SIM_SALON_CICLO_LINEA($linea,$ciclo)";
                         exit(AppController::getDataTable($sql));
                         break;
 
                      case 53:
 
                         $codexamen =  $this->request->data['codexamen'];   
                         $tipo = $this->request->data['tipo'];   
                         $codlinea = $this->request->data['codlinea'];  
                         $codciclo = $this->request->data['codciclo'];     
                         $sql = "CALL SP_TUTORDETALLENOTAS($codexamen,$codciclo, $codlinea,'$tipo')";
                          exit(AppController::getDataTable($sql));
                          break;
                      case 54:
 
                          $codciclo = $this->request->data['codciclo']; 
                          $codlinea = $this->request->data['codlinea']; 
                               
                          $sql = "CALL SP_DIRECTOR_TUTORES_DSA($codciclo,$codlinea)";
                           exit(AppController::getDataTable($sql));
                          break;

                  
                          case 55:
                            // SLIDER SIMULACRO ENTREGA DE CASE
                            $codlinea =  $this->request->data['codlinea']; 
                            $codciclo =  $this->request->data['codciclo']; 
                            $codsalon =  $this->request->data['codsalon'];                             
                            $sql = "CALL SP_TUTOR_SLIDER_SIM_SALONEO($codlinea,$codciclo,$codsalon)";
                            exit(AppController::getDataTable($sql));
                            break;

                    case 56:
                        // SLIDER SIMULACRO ENTREGA DE CASE
                        $codexamen =  $this->request->data['codexamen']; 
                        $codsalones =  $this->request->data['codsalones']; 
                        $codlinea =  $this->request->data['codlinea'];   
                        $codciclo =  $this->request->data['codciclo']; 
                        $tipo =  $this->request->data['tipo'];    
                      //  $sql = "CALL SP_TUTORDETALLENOTAS_X_SALON(20464, 20211, 37, 12725, 'TODOS')";
                        $sql = "CALL SP_TUTORDETALLENOTAS_X_SALON($codexamen,$codciclo,$codlinea,$codsalones,'$tipo')";
                        exit(AppController::getDataTable($sql));
                        break;

                        case 57:
                            $codsalon =  $this->request->data['codsalon'];                                                                     
                            $sql = "CALL SP_TUTOR_SLIDER_EVA_SALON($codsalon)";
                            exit(AppController::getDataTable($sql));  
                        break;


                        case 58:
                            $codexamen =  $this->request->data['codexamen'];                             
                            $sql = "CALL SP_TUTORHEAD($codexamen)";
                            exit(AppController::getDataTable($sql));
                        break;

                        case 59:
                            $codsalon =  $this->request->data['codsalon'];   
                            $tipo = $this->request->data['tipo'];  
                            $codexamen =  $this->request->data['codexamen'];                    
                            $sql = "CALL SP_TUTORDETALLENOTAS_SALON($codexamen,'$tipo',$codsalon )";
                            exit(AppController::getDataTable($sql));  
                        break;

                        case 60:
                                             
                            $sql = "CALL SP_DIRECTOR_CICLO( )";
                            exit(AppController::getDataTable($sql));  
                        break;

                        case 61:
                            $codsalon =  $this->request->data['codsalon'];                                                                     
                            $sql = "CALL SP_TUTOR_SLIDER_EVA_SALON($codsalon)";
                            exit(AppController::getDataTable($sql));  
                        break;

                        case 62:                          
                            $codsalon =  $this->request->data['codsalon'];   
                            $codexamen =  $this->request->data['codexamen'];  
                            $tipo =  $this->request->data['tipo'];                  
                            $sql = "CALL NPV_TUTOR_EVA_EVAFILTRO_COD($codexamen,$codsalon,'$tipo');";
                            exit(AppController::getDataTable($sql));  
                        break;
                        
                        case 63:                          
                            $codciclo =  $this->request->data['codciclo']; 
                            $codlinea =  $this->request->data['codlinea']; 
                            $fechacalendar =  $this->request->data['fechacalendar']; 

                            $sql = "CALL SP_DIRECTOR_ASISxxxSALONES($codciclo,$codlinea,'$fechacalendar');";
                            exit(AppController::getDataTable($sql));  
                        break;


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