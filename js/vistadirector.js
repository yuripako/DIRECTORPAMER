$(document).ready(function () {
 
    combolinea();
   // mensajecaja();
   // metododetalle2();
       $("#buscar").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#cuerpo tr   ").filter(function() {

      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        
        });
       
      });
       
      

    });

 
function loadtutores() {

  var codciclo =  $("#loadciclo").val();
  var codlinea =  $("#lineal").val();
  combotutores(codciclo,codlinea);
  metodoslider(codlinea,codciclo)

  }

  function combotutores(codciclo,codlinea) {

        var datosOK = "";
        var strUrl = "getdatos/54";
        $.ajax({
            type: "post",
            url: strUrl,
            data:{
                codciclo:codciclo,
                codlinea:codlinea
            },
            dataType: "html",
            success: function (response) {
                data = segdeNegocios(response);
                datosOK = data.message.toUpperCase();
         
                if (datosOK == "OK") {
                    var datos = data.data;
                    var html1 = "";
                   // console.log(datos);
                    html1 += "<option value='msj'>Seleccione</option>";
                    $.each(datos, function(index, value) { 
                        html1 += "<option value='"+datos[index][1]+" '>"+datos[index][2]+"</option>"; 
                    });

                    $("#tutores").html(html1);

                  

                } else {
                    viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
                }
            }
        
        
        })
    
    }
  

function loadsalones() {
    
var salones=$("#tutores").val();

combolinea(salones)
}


function combolinea(cosalones) {

        var datosOK = "";
        var strUrl = "getdatos/51";
        $.ajax({
            type: "post",
            url: strUrl,
            data:{
                cosalones:cosalones
            },
            dataType: "html",
            success: function (response) {
                data = segdeNegocios(response);
                datosOK = data.message.toUpperCase();
         
                if (datosOK == "OK") {
                    var datos = data.data;
                    var html1 = "";
                   // console.log(datos);
                    html1 += "<option value='msj'>Seleccione</option>";
                    $.each(datos, function(index, value) { 
                        html1 += "<option value='"+datos[index][4]+"->"+datos[index][2]+" '>"+ datos[index][3]+" - "+ datos[index][1]+"</option>"; 
                    });

                    $("#salones").html(html1);

                } else {
                    viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
                }
            }
        
        
        })
    
    }


function metodoslider(linea,ciclo) {
    
  // alert(linea+" "+ciclo);
    var datosOK = "";
    var strUrl = "getdatos/52";
    $.ajax({
        type: "post",
        url: strUrl,
        data:{
            linea:linea,
            ciclo:ciclo
        },
        dataType: "html",
        success: function (response) {
            data = segdeNegocios(response);
            datosOK = data.message.toUpperCase();
        
            if (datosOK == "OK") {
                var datos = data.data;
                var html3 = "";
                var cont=1; 
                var control =    datos.length;          
                $.each(datos, function(index, value) { 
                            if (index<3) {

                                if (index==0) {
                                    html3+='  <div class="item" padrig="true">'+
                                    '<div class="cuadrado activado" onclick=\'metododetalle("' +datos[index][0] + '");\' );">'+
                                        '<div class="semana">'+
                                        '	<div class="texto">SIM</div>'+
                                        '	<div class="numero">'+control+'</div>'+
                                        '	</div>'+
                                        '</div>'+
                                        '	</div>';
                                } else {
                                    html3+='  <div class="item" padrig="true" >'+
                                    '<div class="cuadrado " onclick=\'metododetalle("' +datos[index][0] + '");\' );">'+
                                        '<div class="semana">'+
                                        '	<div class="texto">SIM</div>'+
                                        '	<div class="numero">'+control+'</div>'+
                                        '	</div>'+
                                        '</div>'+
                                        '	</div>';
                                }
                            
                            } else{
                                
                            
                                html3+='  <div class="item" style="display: none;" >'+
                                                '<div class="cuadrado " onclick=\'metododetalle("' +datos[index][0] + '");\' );">'+
                                                    '<div class="semana">'+
                                                    '	<div class="texto">SIM</div>'+
                                                    '	<div class="numero">'+control+'</div>'+
                                                    '	</div>'+
                                                    '</div>'+
                                                    '	</div>';
                            }  
                            cont++;
                            control--;
                            $("#simu").html(html3);
                    
                });
            
            } else {
                viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
            }
        }


    })
}


//function metododetalle2(codexamen) {
function metododetalle(codexamen) {
    $("#tblMerito").hide(10);
	$("#cuerpoload").show(10);
	// FUNCION PARA TRABAJARLO
	//var codsalon = $("#codsalones").val();
	var tipo = $("#tipo").val();
    var codlinea = $("#lineal").val();
    var codciclo=$("#loadciclo").val();
	//alert(tipo);

	var datosOK = "";
	var strUrl = "getdatos/53";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			codexamen: codexamen,
			tipo: tipo,
            codlinea:codlinea,
            codciclo:codciclo
		},
		dataType: "html",
		success: function (response) {
			data = segdeNegocios(response);
			datosOK = data.message.toUpperCase();
			if (datosOK == "OK") {
				var datos = data.data;
				var html6 = "";
				if (datos == "") {
					alert("NO SE ENCONTRO RESULTADOS.");
				}
		
     var linea= codlinea;  //codlinea; //LO QUITAS


     var body="";
     var total=0; var totalSAN=0; var matesam=0;
       let merito =[];
       // SALONES
     $.each(datos, function (index, value) {
         //console.log(datos[index][0]);
         merito[index]=datos[index][2];
    }); 
    const unicos = merito.filter((valor, indice) => {
     return merito.indexOf(valor) === indice;
   }
 );
 // FIN DE SALONES

     var head="";
     //console.log(unicos);
     var s1=1;var s2=1;var s3=1;var s4=1;var s5=1;var s6=1;var s7=1;s8=1;

       var COLO1=0;var COLO2=0;var COLO3=0;var COLO4=0;var COLO5=0; var COLO6=0; var promedio=0;
       if (linea==36) {
          head+=" <th>ID</th><th>CÓDIGO</th><th>NOMBRE DEL ALUMNO</th><th>SALÓN</th><th>MS</th><th>APT</th><th>MAT</th><th>CIENC.</th><th>TOT.</th><th style='BACKGROUND-COLOR: aqua;text-align: center;'>EQUI.</th>";
          promedio=datos.length;   
          $.each(datos, function (index, value) {
     
            COLO1+=(parseFloat(datos[index][4])+parseFloat(datos[index][9]));
            COLO2+=(parseFloat(datos[index][3])+parseFloat(datos[index][5])+parseFloat(datos[index][7])+parseFloat(datos[index][10]))
            COLO3+=(parseFloat(datos[index][6])+parseFloat(datos[index][8]));
            COLO4+=( parseFloat(datos[index][3])+parseFloat(datos[index][4])+parseFloat(datos[index][5])+parseFloat(datos[index][6])
            +parseFloat(datos[index][7])+parseFloat(datos[index][8])+parseFloat(datos[index][9])+parseFloat(datos[index][10]) );
            COLO5+=(parseFloat(datos[index][11]));

         
            total=financial( parseFloat(datos[index][3])+parseFloat(datos[index][4])+parseFloat(datos[index][5])+parseFloat(datos[index][6])
            +parseFloat(datos[index][7])+parseFloat(datos[index][8])+parseFloat(datos[index][9])+parseFloat(datos[index][10]) );
           body+="<tr>";
           body+="<td>"+(index+1)+"</td>";
           body+="<td>"+datos[index][0]+"</td>";
           body+="<td>"+datos[index][1]+"</td>";
           body+="<td>"+datos[index][2]+"</td>";
             if (datos[index][2]==unicos[0]) {
              body+="<td>"+s1+"</td>";
              s1++;
             }else if(datos[index][2]==unicos[1]) {
               body+="<td>"+s2+"</td>";s2++;
             }else if(datos[index][2]==unicos[2]) {
               body+="<td>"+s3+"</td>";s3++;
             }else if(datos[index][2]==unicos[3]) {
               body+="<td>"+s4+"</td>";s4++;
             }else if(datos[index][2]==unicos[4]) {
               body+="<td>"+s5+"</td>";s5++;
             }else if(datos[index][2]==unicos[5]) {
               body+="<td>"+s6+"</td>";s6++;
             }else if(datos[index][2]==unicos[6]) {
               body+="<td>"+s7+"</td>";s7++;
             }else {
               body+="<td>"+s8+"</td>";s8++;
             }
           body+="<td>"+financial(parseFloat(datos[index][4])+parseFloat(datos[index][9]))+"</td>";
           body+="<td>"+financial(parseFloat(datos[index][3])+parseFloat(datos[index][5])+parseFloat(datos[index][7])+parseFloat(datos[index][10]))+"</td>";
           body+="<td>"+financial(parseFloat(datos[index][6])+parseFloat(datos[index][8]))+"</td>";
           body+="<td>"+total+"</td>";
           body+="<td style='BACKGROUND-COLOR: aqua;text-align: center;'>"+datos[index][11]+"</td>";
           body+="</tr>";
           total=0;
           
         }); 
         
       }

       if (linea==37) {
        head+=" <th>ID</th><th>CÓDIGO</th><th>NOMBRE DEL ALUMNO</th><th>SALÓN</th><th>MS</th><th>APT</th><th>MAT</th><th>COM.</th><th style='BACKGROUND-COLOR: aqua;text-align: center;'>PROM.</th>";
        promedio=datos.length;   
        $.each(datos, function (index, value) {
   
          COLO1+=(parseFloat(datos[index][3])+parseFloat(datos[index][4]));
          COLO2+=(parseFloat(datos[index][5])+parseFloat(datos[index][6])+parseFloat(datos[index][7])+parseFloat(datos[index][8]))
          COLO3+=(parseFloat(datos[index][9])+parseFloat(datos[index][10]));
          COLO4+= parseFloat(datos[index][11]);

       
          total=financial( parseFloat(datos[index][3])+parseFloat(datos[index][4])+parseFloat(datos[index][5])+parseFloat(datos[index][6])
          +parseFloat(datos[index][7])+parseFloat(datos[index][8])+parseFloat(datos[index][9])+parseFloat(datos[index][10]) );
         body+="<tr>";
         body+="<td>"+(index+1)+"</td>";
         body+="<td>"+datos[index][0]+"</td>";
         body+="<td>"+datos[index][1]+"</td>";
         body+="<td>"+datos[index][2]+"</td>";
           if (datos[index][2]==unicos[0]) {
            body+="<td>"+s1+"</td>";
            s1++;
           }else if(datos[index][2]==unicos[1]) {
             body+="<td>"+s2+"</td>";s2++;
           }else if(datos[index][2]==unicos[2]) {
             body+="<td>"+s3+"</td>";s3++;
           }else if(datos[index][2]==unicos[3]) {
             body+="<td>"+s4+"</td>";s4++;
           }else if(datos[index][2]==unicos[4]) {
             body+="<td>"+s5+"</td>";s5++;
           }else if(datos[index][2]==unicos[5]) {
             body+="<td>"+s6+"</td>";s6++;
           }else if(datos[index][2]==unicos[6]) {
             body+="<td>"+s7+"</td>";s7++;
           }else {
             body+="<td>"+s8+"</td>";s8++;
           }

         body+="<td>"+financial(parseFloat(datos[index][3])+parseFloat(datos[index][4]))+"</td>"
         body+="<td>"+financial(parseFloat(datos[index][5])+parseFloat(datos[index][6])+parseFloat(datos[index][7])+parseFloat(datos[index][8]))+"</td>"
         body+="<td>"+financial(parseFloat(datos[index][9])+parseFloat(datos[index][10]))+"</td>"
         body+="<td style='background-color: aqua;    text-align: center;'>"+financial(parseFloat(datos[index][11]))+"</td>"

     
       
         body+="</tr>";
         total=0;
         
       }); 
       
     }

       if (linea==31) {
        head+=" <th>ID</th><th>CÓDIGO</th><th>NOMBRE DEL ALUMNO</th><th>SALÓN</th><th>MS</th><th>H.V.</th><th>H.M.</th><th>MAT.</th><th>CON.</th><th style='BACKGROUND-COLOR: aqua;text-align: center;'>TOT.</th>";
      
        promedio=datos.length;  
        $.each(datos, function (index, value) {

          COLO1+=(parseFloat(datos[index][3]));
          COLO2+=(parseFloat(datos[index][4]))
          COLO3+=( parseFloat(datos[index][5])+parseFloat(datos[index][6])+parseFloat(datos[index][7]));
          COLO4+=( parseFloat(datos[index][8])+parseFloat(datos[index][9])+parseFloat(datos[index][10])+parseFloat(datos[index][11])
          +parseFloat(datos[index][12])+parseFloat(datos[index][13])+parseFloat(datos[index][14])+parseFloat(datos[index][15])+parseFloat(datos[index][16])
          +parseFloat(datos[index][17])+parseFloat(datos[index][18])+parseFloat(datos[index][19]) );
          COLO5+=(parseFloat(datos[index][20]));


       
     

            totalSAN=financial( parseFloat(datos[index][8])+parseFloat(datos[index][9])+parseFloat(datos[index][10])+parseFloat(datos[index][11])
            +parseFloat(datos[index][12])+parseFloat(datos[index][13])+parseFloat(datos[index][14])+parseFloat(datos[index][15])+parseFloat(datos[index][16])
            +parseFloat(datos[index][17])+parseFloat(datos[index][18])+parseFloat(datos[index][19]) );

            matesam=financial( parseFloat(datos[index][5])+parseFloat(datos[index][6])+parseFloat(datos[index][7]));

           body+="<tr>";
           body+="<td>"+(index+1)+"</td>";
           body+="<td>"+datos[index][0]+"</td>";
           body+="<td>"+datos[index][1]+"</td>";
           body+="<td>"+datos[index][2]+"</td>";
             if (datos[index][2]==unicos[0]) {
              body+="<td>"+s1+"</td>";
              s1++;
             }else if(datos[index][2]==unicos[1]) {
               body+="<td>"+s2+"</td>";s2++;
             }else if(datos[index][2]==unicos[2]) {
               body+="<td>"+s3+"</td>";s3++;
             }else if(datos[index][2]==unicos[3]) {
               body+="<td>"+s4+"</td>";s4++;
             }else if(datos[index][2]==unicos[4]) {
               body+="<td>"+s5+"</td>";s5++;
             }else if(datos[index][2]==unicos[5]) {
               body+="<td>"+s6+"</td>";s6++;
             }else if(datos[index][2]==unicos[6]) {
               body+="<td>"+s7+"</td>";s7++;
             }else {
               body+="<td>"+s8+"</td>";s8++;
             }
           body+="<td>"+financial(parseFloat(datos[index][3]))+"</td>";
           body+="<td>"+financial(parseFloat(datos[index][4]))+"</td>";
           body+="<td>"+matesam+"</td>";
           body+="<td>"+totalSAN+"</td>";
           body+="<td style='BACKGROUND-COLOR: aqua;text-align: center;'>"+financial(parseFloat(datos[index][20]))+"</td>";
           body+="</tr>";
           totalSAN=0;
           matesam=0;
         
         }); 
   
        }
        if (linea==1 || linea==33) {
            head+=" <th>ID</th><th>CÓDIGO</th><th>NOMBRE DEL ALUMNO</th><th>SALÓN</th><th>MS</th><th>CON.</th><th>RED.</th><th>MAT.</th><th>A.V.</th><th>A.M.</th><th style='BACKGROUND-COLOR: aqua;text-align: center;'>PROM.</th>";
            
            promedio=datos.length;  
            $.each(datos, function (index, value) {

              if (isNaN(parseFloat(datos[index][9]))) {
                datos[index][9]=0;
              } 
     

              COLO1+=(parseFloat(datos[index][3]));
              COLO2+=(parseFloat(datos[index][4]) + parseFloat(datos[index][5]));             
              COLO3+=(parseFloat(datos[index][6]) + parseFloat(datos[index][7]) + parseFloat(datos[index][8]) + parseFloat(datos[index][9]) );           
              COLO4+=( (parseFloat(datos[index][3]) + parseFloat(datos[index][4]) + parseFloat(datos[index][5]))/2 );

              COLO5+=(parseFloat(datos[index][6]) + parseFloat(datos[index][7]) + parseFloat(datos[index][8]) + parseFloat(datos[index][9]) );
              COLO6+=(parseFloat(datos[index][10]));

              total=financial( parseFloat(datos[index][3])+parseFloat(datos[index][4])+parseFloat(datos[index][5])+parseFloat(datos[index][6])
              +parseFloat(datos[index][7])+parseFloat(datos[index][8])+parseFloat(datos[index][9])+parseFloat(datos[index][10]) );
             body+="<tr>";
             body+="<td>"+(index+1)+"</td>";
             body+="<td>"+datos[index][0]+"</td>";
             body+="<td>"+datos[index][1]+"</td>";
             body+="<td>"+datos[index][2]+"</td>";
               if (datos[index][2]==unicos[0]) {
                body+="<td>"+s1+"</td>";
                s1++;
               }else if(datos[index][2]==unicos[1]) {
                 body+="<td>"+s2+"</td>";s2++;
               }else if(datos[index][2]==unicos[2]) {
                 body+="<td>"+s3+"</td>";s3++;
               }else if(datos[index][2]==unicos[3]) {
                 body+="<td>"+s4+"</td>";s4++;
               }else if(datos[index][2]==unicos[4]) {
                 body+="<td>"+s5+"</td>";s5++;
               }else if(datos[index][2]==unicos[5]) {
                 body+="<td>"+s6+"</td>";s6++;
               }else if(datos[index][2]==unicos[6]) {
                 body+="<td>"+s7+"</td>";s7++;
               }else {
                 body+="<td>"+s8+"</td>";s8++;
               }

             body+="<td>"+datos[index][3]+"</td>";
             body+="<td>"+financial(parseFloat(datos[index][4]) + parseFloat(datos[index][5]))+"</td>";
             body+="<td>"+financial(parseFloat(datos[index][6]) + parseFloat(datos[index][7]) + parseFloat(datos[index][8]) + parseFloat(datos[index][9]) )+"</td>";
             body+="<td>"+financial( (parseFloat(datos[index][3]) + parseFloat(datos[index][4]) + parseFloat(datos[index][5]))/2 )+"</td>";
             body+="<td>"+financial(parseFloat(datos[index][6]) + parseFloat(datos[index][7]) + parseFloat(datos[index][8]) + parseFloat(datos[index][9]) )+"</td>";
             body+="<td style='BACKGROUND-COLOR: aqua;text-align: center;'>"+datos[index][10]+"</td>";
             body+="</tr>";
             total=0;
             
           }); 


            } 
      var coloro="BACKGROUND-COLOR: aqua;";





      if (linea==1 || linea==33) {
        body+=" <th style='"+coloro+"'></th><th style='"+coloro+"'></th><th style='"+coloro+"'>PROMEDIO GENERAL</th><th style='"+coloro+"'></th><th style='"+coloro+"'></th><th style='"+coloro+"'>"+financial(COLO1/promedio)+"</th><th style='"+coloro+"'>"+financial(COLO2/promedio)+"</th><th style='"+coloro+"'>"+financial(COLO3/promedio)+"</th><th style='"+coloro+"'>"+financial(COLO4/promedio)+"</th><th style='"+coloro+"'>"+financial(COLO5/promedio)+"</th><th style='BACKGROUND-COLOR: #005cfe;color: #fff;text-align: center;'>"+financial(COLO6/promedio)+"</th>";

        } 
        else if(linea==37) {
          body+=" <th style='"+coloro+"'></th><th style='"+coloro+"'></th><th style='"+coloro+"'>PROMEDIO GENERAL</th><th style='"+coloro+"'></th><th style='"+coloro+"'></th><th style='"+coloro+"'>"+financial(COLO1/promedio)+"</th><th style='"+coloro+"'>"+financial(COLO2/promedio)+"</th><th style='"+coloro+"'>"+financial(COLO3/promedio)+"</th><th style='BACKGROUND-COLOR: #005cfe;color: #fff;text-align: center;'>"+financial(COLO4/promedio)+"</th>";

        }
        else {
          body+=" <th style='"+coloro+"'></th><th style='"+coloro+"'></th><th style='"+coloro+"'>PROMEDIO GENERAL</th><th style='"+coloro+"'></th><th style='"+coloro+"'></th><th style='"+coloro+"'>"+financial(COLO1/promedio)+"</th><th style='"+coloro+"'>"+financial(COLO2/promedio)+"</th><th style='"+coloro+"'>"+financial(COLO3/promedio)+"</th><th style='"+coloro+"'>"+financial(COLO4/promedio)+"</th><th style='BACKGROUND-COLOR: #005cfe;color: #fff;text-align: center;'>"+financial(COLO5/promedio)+"</th>";

        }




      $("#cabeza").html(head);
      $("#cuerpo").html(body);
	  	$("#tblMerito").show(10);
	  	$("#cuerpoload").hide(10);
                
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		},
	});
}

function metodoselectarea() {
    //alert("Ahora seleccione un Simulacro.");
}

function metodotipo() {
    alert("Ahora seleccione un Simulacro.");
}

function mensajecaja(){
    var ht= '<tr ><td colspan="11" style="text-align: center;font-size: 16px;border: 1px solid #fff; ">Filtra en el combobox para ver la información.</td></tr>';
         $("#cuerpo").html(ht);
}
function financial(x) {
	return Number.parseFloat(x).toFixed(2);
}