$(document).ready(function () {

	combolinea();
	combociclo();
	$("#buscar").on("keyup", function () {
		var value = $(this).val().toLowerCase();
		$("#cuerpo tr  ").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		});
	});
});

function combociclo() {
  
    var datosOK = "";
    var strUrl = "getdatos/60";
    $.ajax({
        type: "post",
        url: strUrl,
        data:{
           
        },
        dataType: "html",
        success: function (response) {
            data = segdeNegocios(response);
            datosOK = data.message.toUpperCase();
     
            if (datosOK == "OK") {
                var datos = data.data;
                var html11 = "";
               // console.log(datos);
               html11 += "<option value='msj'>Seleccione</option>";
                $.each(datos, function(index, value) { 
                    html11 += "<option value='"+datos[index][0]+" '>"+ datos[index][0]+"</option>"; 
                });

                $("#loadciclo").html(html11);

            } else {
                viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
            }
        }
    
    
    })

}

function tecargolinea() {
	var ciclo = $("#loadciclo").val();
	cargandolinea(ciclo);
  }
  

  function cargandolinea(ciclo) {

	var datosOK = "";
	var strUrl = "getdatos/71";
	$.ajax({
		type: "post",
		url: strUrl,
		data:{
		  ciclo:ciclo
		},
		dataType: "html",
		success: function (response) {
			data = segdeNegocios(response);
			datosOK = data.message.toUpperCase();
	 
			if (datosOK == "OK") {
				var datos = data.data;
				var html11 = "";
			  // console.log(datos);
			  // html11 += "<option value='msj'>Seleccione</option>";
				$.each(datos, function(index, value) { 
					html11 += "<option value='"+datos[index][0]+" '>"+ datos[index][1]+"</option>"; 
				});
	
				$("#lineal").html(html11);
	
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		}
	
	
	})
  
  
  }
  


function loadtutores() {

    var codciclo =  $("#loadciclo").val();
    var codlinea =  $("#lineal").val();
    combotutores(codciclo,codlinea);
 
  
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
                          html1 += "<option value='"+datos[index][0]+"->"+datos[index][4]+" '>"+ datos[index][3]+" - "+ datos[index][1]+"</option>"; 
                      });
  
                      $("#salones").html(html1);
  
                  } else {
                      viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
                  }
              }
          
          
          })
      
      }
  



function metodosalon() {
	var cadena = $("#salones").val();
	var porciones = cadena.split("->");
    var codciclo=$("#loadciclo").val();

    $("#codsaloni").val(porciones[0]);
    $("#codlini").val(porciones[1]);


    metodoslider(parseInt(porciones[0]),parseInt(codciclo),parseInt(porciones[1]))

	//metodoslider(porciones[0],porciones[1],porciones[3]);
}



function metodoslider(codsalon,codciclo,codlinea) {

       

	var datosOK = "";
	var strUrl = "getdatos/55";  //7
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			codsalon: codsalon,
			codciclo:codciclo,
			codlinea:codlinea
			
		},
		dataType: "html",
		success: function (response) {
			data = segdeNegocios(response);
			datosOK = data.message.toUpperCase();

			if (datosOK == "OK") {
				var datos = data.data;
				var html3 = "";
				var cont = 1;
				var control = datos.length;
				$.each(datos, function (index, value) {
					if (index < 3) {
						if (index == 0) {
							html3 +=
								'  <div class="item" padrig="true">' +
								'<div class="cuadrado activado" onclick=\'metododetalle("' +datos[index][0] +'", "' +datos[index][1] +'" );\' );">' +
								'<div class="semana">' +
								'	<div class="texto">SIM</div>' +
								'	<div class="numero">' +
								control +
								"</div>" +
								"	</div>" +
								"</div>" +
								"	</div>";
						} else {
							html3 +=
								'  <div class="item"  >' +
								'<div class="cuadrado" onclick=\'metododetalle("' +datos[index][0] +'", "' +datos[index][1] +'" );\' );">' +
								'<div class="semana">' +
								'	<div class="texto">SIM</div>' +
								'	<div class="numero">' +
								control +
								"</div>" +
								"	</div>" +
								"</div>" +
								"	</div>";
						}
					} else {
						html3 +=
							'  <div class="item" style="display: none;" >' +
							'<div class="cuadrado " onclick=\'metododetalle("' +datos[index][0] +'", "' +datos[index][1] +'" );\' );">' +
							'<div class="semana">' +
							'	<div class="texto">SIM</div>' +
							'	<div class="numero">' +
							control +
							"</div>" +
							"	</div>" +
							"</div>" +
							"	</div>";
					}
					cont++;
					control--;
					$("#simu").html(html3);
				});
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		},
	});
}

/*
    var codciclo = $("#codciclo").val();
	   var codsalones = $("#codsalones").val();
	   var codlinea = $("#codlinea").val();
 */


 function metododetalle(codexamen,simulacro) {

        $("#detallesim2").html(simulacro);
		$("#detallesim").html(simulacro);
		$("#tblMerito").hide(10);
		$("#cuerpoload").show(10);
		// FUNCION PARA TRABAJARLO
		//var codsalon = $("#codsalones").val();
		var tipo = $("#tipo").val();

		var codciclo = $("#loadciclo").val();



		var codsalones=$("#codsaloni").val();
		var codlinea=$("#codlini").val();



		//alert(codexamen+" "+codsalones+"  "+codlinea+" "+codciclo+" "+tipo);
	
		var datosOK = "";
		var strUrl = "getdatos/56";  //6
		$.ajax({
			type: "post",
			url: strUrl,
			data: {
				codexamen: codexamen,
				codsalones:codsalones,
				codlinea:codlinea,
				codciclo:codciclo,
				tipo: tipo
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
			
		 var linea= codlinea //codlinea;
	
	
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
	
           var  gg1="color:#24d483";
		   var  gg2="color:RED";
		   var  gg3="color:#777";
		  
		   if (linea==36) {

			  head+=" <th>ID</th><th>SALÓN</th>";
              head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Razonamiento Matemático </th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
              head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Aptitud Verbal </th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
            //  head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >APT.</th></tr><tr><td>B</td><td>M</td><td>BL</td></tr></table></span></th>";
              head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3'>Aritmética</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
              head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3'>Álgebra</th></tr><tr><td><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
              head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Geometría</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
              head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Trigonometría</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
              //head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >MAT.</th></tr><tr><td>B</td><td>M</td><td>BL</td></tr></table></span></th>";
              head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Física</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
              head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Química</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
              //head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >CIENC.</th></tr><tr><td>B</td><td>M</td><td>BL</td></tr></table></span></th>";
              //head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >TOT.</th></tr><tr><td>B</td><td>M</td><td>BL</td></tr></table></span></th>";
              //head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >EQUI.</th></tr><tr><td>B</td><td>M</td><td>BL</td></tr></table></span></th>";

          
			  promedio=datos.length;   
			  $.each(datos, function (index, value) {
		 
	
				total=financial( parseFloat(datos[index][3])+parseFloat(datos[index][4])+parseFloat(datos[index][5])+parseFloat(datos[index][6])
				+parseFloat(datos[index][7])+parseFloat(datos[index][8])+parseFloat(datos[index][9])+parseFloat(datos[index][10]) );
			   body+="<tr>";
			   body+="<td>"+(index+1)+"</td>";
			   
			   body+="<td>"+datos[index][2]+"</td>";
				
	
	             //colores
                  var verde="color: #444;font-weight: bold;width: 33%;";
				  var rojo="color: #444;font-weight: bold;width: 33%;";
				  var plomo="color: #444;font-weight: bold;width: 33%;";
				  var arriba="arriba: #444;font-weight: bold;";
				 //SEPARACION
				 var RM = datos[index][3]; var RM_ARRAY = RM.split("|");
				 var RV = datos[index][4]; var RV_ARRAY = RV.split("|");

				 var ARI = datos[index][5]; var ARI_ARRAY = ARI.split("|");
				 var ALG = datos[index][6]; var ALG_ARRAY = ALG.split("|");
				 var GEO = datos[index][7]; var GEO_ARRAY = GEO.split("|");
				 var TRIGO = datos[index][8]; var TRIGO_ARRAY = TRIGO.split("|");
				 var FIS = datos[index][9]; var FIS_ARRAY = FIS.split("|");
				 var QUIM = datos[index][10]; var QUIM_ARRAY = QUIM.split("|");
				 var EQUI = datos[index][10]; var EQUI_ARRAY = EQUI.split("|");

				 //SUMA DE COLUMNAS
				 var APT=parseFloat(RM_ARRAY[0])+parseFloat(RV_ARRAY[0]);
				 var apt1=parseInt(RM_ARRAY[1])+parseInt(RV_ARRAY[1]);
				 var apt2=parseInt(RM_ARRAY[2])+parseInt(RV_ARRAY[2]); 
				 var apt3=parseInt(RM_ARRAY[3])+parseInt(RV_ARRAY[3]);
                 
                //SUMA PORCENTAL 1
                PORCT1=parseInt(RM_ARRAY[1])+parseInt(RM_ARRAY[2])+parseInt(RM_ARRAY[3]);
                //SUMA PORCENTAL 2
                PORCT2=parseInt(RV_ARRAY[1])+parseInt(RV_ARRAY[2])+parseInt(RV_ARRAY[3]);
                //SUMA PORCENTAL 2
                PORCT3=parseInt(ARI_ARRAY[1])+parseInt(ARI_ARRAY[2])+parseInt(ARI_ARRAY[3]);
                //SUMA PORCENTAL 2
                PORCT4=parseInt(ALG_ARRAY[1])+parseInt(ALG_ARRAY[2])+parseInt(ALG_ARRAY[3]);
				//SUMA PORCENTAL 2
                PORCT5=parseInt(GEO_ARRAY[1])+parseInt(GEO_ARRAY[2])+parseInt(GEO_ARRAY[3]);
	//SUMA PORCENTAL 2
    PORCT6=parseInt(TRIGO_ARRAY[1])+parseInt(TRIGO_ARRAY[2])+parseInt(TRIGO_ARRAY[3]);
	//SUMA PORCENTAL 2
    PORCT7=parseInt(FIS_ARRAY[1])+parseInt(FIS_ARRAY[2])+parseInt(FIS_ARRAY[3]);
    //SUMA PORCENTAL 2
    PORCT8=parseInt(QUIM_ARRAY[1])+parseInt(QUIM_ARRAY[2])+parseInt(QUIM_ARRAY[3]);

				 var MATE=parseFloat(ARI_ARRAY[0])+parseFloat(ALG_ARRAY[0])+parseFloat(GEO_ARRAY[0])+parseFloat(TRIGO_ARRAY[0]);
				 var MATE1=parseInt(ARI_ARRAY[1])+parseInt(ALG_ARRAY[1])+parseFloat(GEO_ARRAY[1])+parseFloat(TRIGO_ARRAY[1]);
				 var MATE2=parseInt(ARI_ARRAY[2])+parseInt(ALG_ARRAY[2])+parseFloat(GEO_ARRAY[2])+parseFloat(TRIGO_ARRAY[2]);
				 var MATE3=parseInt(ARI_ARRAY[3])+parseInt(ALG_ARRAY[3])+parseFloat(GEO_ARRAY[3])+parseFloat(TRIGO_ARRAY[3]);

				 var CIENCIA=parseFloat(FIS_ARRAY[0])+parseFloat(QUIM_ARRAY[0]);
                 var CIENCIA1=parseInt(FIS_ARRAY[1])+parseInt(QUIM_ARRAY[1]);
				 var CIENCIA2=parseInt(FIS_ARRAY[2])+parseInt(QUIM_ARRAY[2]);
				 var CIENCIA3=parseInt(FIS_ARRAY[3])+parseInt(QUIM_ARRAY[3]);

                 //SUMA TOTAL DECOLUMNAS
                 var SUMCOL1TOT=(apt1+MATE1+CIENCIA1);
				 var SUMCOL2TOT=(apt2+MATE2+CIENCIA2);
				 var SUMCOL3TOT=(apt3+MATE3+CIENCIA3);
                 //FIN DE SUMA
				 body+="<td><span><table style=' border: 0;' ><tr><th colspan='3' ></th></tr><tr> <td style='"+verde+"'>"+financial(RM_ARRAY[1]*100/PORCT1)+"%</td> <td style='"+rojo+"'>"+financial(RM_ARRAY[2]*100/PORCT1)+"%</td><td style='"+plomo+"'>"+financial(RM_ARRAY[3]*100/PORCT1)+"%</td> </tr></table></span></td>";
				 body+="<td><span><table style=' border: 0;' ><tr><th colspan='3' ></th></tr><tr> <td style='"+verde+"'>"+financial(RV_ARRAY[1]*100/PORCT2)+"%</td> <td style='"+rojo+"'>"+financial(RV_ARRAY[2]*100/PORCT2)+"%</td><td style='"+plomo+"'>"+financial(RV_ARRAY[3]*100/PORCT2)+"%</td> </tr></table></span></td>";
//	/*COLUMNA1 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  BACKGROUND-COLOR: aqua;' ></th></tr><tr> <td style='"+verde+"'>"+(apt1)+"</td> <td style='"+rojo+"'>"+(apt2)+"</td><td style='"+plomo+"'>"+(apt3)+"</td> </tr></table></span></td>";
body+="<td><span><table style=' border: 0;' ><tr><th colspan='3' ></th></tr><tr> <td style='"+verde+"'>"+financial(ARI_ARRAY[1]*100/PORCT3)+"%</td> <td style='"+rojo+"'>"+financial(ARI_ARRAY[2]*100/PORCT3)+"%</td><td style='"+plomo+"'>"+financial(ARI_ARRAY[3]*100/PORCT3)+"%</td> </tr></table></span></td>";
body+="<td><span><table style=' border: 0;' ><tr><th colspan='3' ></th></tr><tr> <td style='"+verde+"'>"+financial(ALG_ARRAY[1]*100/PORCT4)+"%</td> <td style='"+rojo+"'>"+financial(ALG_ARRAY[2]*100/PORCT4)+"%</td><td style='"+plomo+"'>"+financial(ALG_ARRAY[3]*100/PORCT4)+"%</td> </tr></table></span></td>";
body+="<td><span><table style=' border: 0;' ><tr><th colspan='3' ></th></tr><tr> <td style='"+verde+"'>"+financial(GEO_ARRAY[1]*100/PORCT5)+"%</td> <td style='"+rojo+"'>"+financial(GEO_ARRAY[2]*100/PORCT5)+"%</td><td style='"+plomo+"'>"+financial(GEO_ARRAY[3]*100/PORCT5)+"%</td> </tr></table></span></td>";
body+="<td><span><table style=' border: 0;' ><tr><th colspan='3' ></th></tr><tr> <td style='"+verde+"'>"+financial(TRIGO_ARRAY[1]*100/PORCT6)+"%</td> <td style='"+rojo+"'>"+financial(TRIGO_ARRAY[2]*100/PORCT6)+"%</td><td style='"+plomo+"'>"+financial(TRIGO_ARRAY[3]*100/PORCT6)+"%</td> </tr></table></span></td>";
//	/*COLUMNA2 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(MATE)+"</th></tr><tr> <td style='"+verde+"'>"+(MATE1)+"</td> <td style='"+rojo+"'>"+(MATE2)+"</td><td style='"+plomo+"'>"+(MATE3)+"</td> </tr></table></span></td>";

body+="<td><span><table style=' border: 0;' ><tr><th colspan='3' ></th></tr><tr> <td style='"+verde+"'>"+financial(FIS_ARRAY[1]*100/PORCT7)+"%</td> <td style='"+rojo+"'>"+financial(FIS_ARRAY[2]*100/PORCT7)+"%</td><td style='"+plomo+"'>"+financial(FIS_ARRAY[3]*100/PORCT7)+"%</td> </tr></table></span></td>";
body+="<td><span><table style=' border: 0;' ><tr><th colspan='3' ></th></tr><tr> <td style='"+verde+"'>"+financial(QUIM_ARRAY[1]*100/PORCT8)+"%</td> <td style='"+rojo+"'>"+financial(QUIM_ARRAY[2]*100/PORCT8)+"%</td><td style='"+plomo+"'>"+financial(QUIM_ARRAY[3]*100/PORCT8)+"%</td> </tr></table></span></td>";

//	/*COLUMNA3 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'   BACKGROUND-COLOR: aqua;' ></th></tr><tr> <td style='"+verde+"'>"+(CIENCIA1)+"</td> <td style='"+rojo+"'>"+(CIENCIA2)+"</td><td style='"+plomo+"'>"+(CIENCIA3)+"</td> </tr></table></span></td>";
	
//	/*COLUMNATOTAL */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'   BACKGROUND-COLOR: aqua;' ></th></tr><tr> <td style='"+verde+"'>"+(SUMCOL1TOT)+"</td> <td style='"+rojo+"'>"+(SUMCOL2TOT)+"</td><td style='"+plomo+"'>"+(SUMCOL3TOT)+"</td> </tr></table></span></td>";
//	/*EQUI */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'   BACKGROUND-COLOR: aqua;' ></th></tr><tr> <td style='"+verde+"'>"+(SUMCOL1TOT)+"</td> <td style='"+rojo+"'>"+(SUMCOL2TOT)+"</td><td style='"+plomo+"'>"+(SUMCOL3TOT)+"</td> </tr></table></span></td>";


			   body+="</tr>";
			   total=0;
			 
			 }); 
	   
			  
		   }


		   if (linea==31) {
			head+=" <th>ID</th><th>SALÓN</th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Comprensión de lectura</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Razonamiento Matemático</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Aritmética</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Álgebra</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Geometría</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Trigonometría</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Lenguaje</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Literatura</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Psicología</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Civica</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Historia del Perú</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Historia Universal</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Geografía</th></tr><tr><td>B</td><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Economía</th></tr><tr><td>B</td><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Filosofía</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Física</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Química</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
			head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Biología</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";


		  
			promedio=datos.length;  
			$.each(datos, function (index, value) {
	
			//colores
			var verde="color: #24d483;font-weight: bold;width: 33%;";
			var rojo="color: RED;font-weight: bold;width: 33%;";
			var plomo="color: #777;font-weight: bold;width: 33%;";
			var arriba="arriba: #444;font-weight: bold;";
	
			//SEPARACION
			var LEC = datos[index][3]; var LEC_ARRAY = LEC.split("|");
			var RM = datos[index][4]; var RM_ARRAY = RM.split("|");
			var ARIT = datos[index][5]; var ARIT_ARRAY = ARIT.split("|");
			var ALG = datos[index][6]; var ALG_ARRAY = ALG.split("|");
			var GEOM = datos[index][7]; var GEOM_ARRAY = GEOM.split("|");
			if (datos[index][8]==null || datos[index][8]=="") {
				datos[index][8]="0|0|0|0";
			}
			var TRIG = datos[index][8]; var TRIG_ARRAY = TRIG.split("|");

			var LEN = datos[index][9]; var LEN_ARRAY = LEN.split("|");
			var LIT = datos[index][10]; var LIT_ARRAY = LIT.split("|");
			var PSIC = datos[index][11]; var PSIC_ARRAY = PSIC.split("|");
			var CIV = datos[index][12]; var CIV_ARRAY = CIV.split("|");
			var HP = datos[index][13]; var HP_ARRAY = HP.split("|");
			var HU = datos[index][14]; var HU_ARRAY = HU.split("|");
			var GEOG = datos[index][15]; var GEOG_ARRAY = GEOG.split("|");
			var ECON = datos[index][16]; var ECON_ARRAY = ECON.split("|");
			var FIL = datos[index][17]; var FIL_ARRAY = FIL.split("|");
			var FIS = datos[index][18]; var FIS_ARRAY = FIS.split("|");
			var QUIM = datos[index][19]; var QUIM_ARRAY = QUIM.split("|");
			var BIOL = datos[index][20]; var BIOL_ARRAY = BIOL.split("|");
			//COLORES
			var verde="color: #444;font-weight: bold;width: 33%;";
			var rojo="color: #444;font-weight: bold;width: 33%;";
			var plomo="color: #444;font-weight: bold;width: 33%;";
			var arriba="arriba: #444;font-weight: bold;";
			//SUMA DE COLUMNAS
	var HV=parseFloat(LEC_ARRAY[0]);var HV1=(LEC_ARRAY[1]);	var HV2=(LEC_ARRAY[2]);var HV3=(LEC_ARRAY[3]);
	var HM=parseFloat(RM_ARRAY[0]);var HM1=(RM_ARRAY[1]);	var HM2=(RM_ARRAY[2]);var HM3=(RM_ARRAY[3]);
	var MAT=( parseFloat(ARIT_ARRAY[0])+parseFloat(ALG_ARRAY[0])+parseFloat(GEOM_ARRAY[0])+parseFloat(TRIG_ARRAY[0])  );
	var MAT1=( parseInt(ARIT_ARRAY[1])+parseInt(ALG_ARRAY[1])+parseInt(GEOM_ARRAY[1])+parseInt(TRIG_ARRAY[1])  );
	var MAT2=( parseInt(ARIT_ARRAY[2])+parseInt(ALG_ARRAY[2])+parseInt(GEOM_ARRAY[2])+parseInt(TRIG_ARRAY[2])  );
	var MAT3=( parseInt(ARIT_ARRAY[3])+parseInt(ALG_ARRAY[3])+parseInt(GEOM_ARRAY[3])+parseInt(TRIG_ARRAY[3])  );

	var COM=( parseFloat(LEN_ARRAY[0])+parseFloat(LIT_ARRAY[0])+parseFloat(PSIC_ARRAY[0])+parseFloat(CIV_ARRAY[0])+ parseFloat(HP_ARRAY[0])+
	parseFloat(HU_ARRAY[0])+ parseFloat(GEOG_ARRAY[0])+ parseFloat(ECON_ARRAY[0])+ parseFloat(FIL_ARRAY[0]) + parseFloat(FIS_ARRAY[0])+parseFloat(QUIM_ARRAY[0])+
	parseFloat(BIOL_ARRAY[0]) );
	var COM1=( parseInt(LEN_ARRAY[1])+parseInt(LIT_ARRAY[1])+parseInt(PSIC_ARRAY[1])+parseInt(CIV_ARRAY[1])+ parseInt(HP_ARRAY[1])+
	parseInt(HU_ARRAY[1])+ parseInt(GEOG_ARRAY[1])+ parseInt(ECON_ARRAY[1])+ parseInt(FIL_ARRAY[1]) + parseInt(FIS_ARRAY[1])+parseInt(QUIM_ARRAY[1])+
	parseInt(BIOL_ARRAY[1]) );
	var COM2=( parseInt(LEN_ARRAY[2])+parseInt(LIT_ARRAY[2])+parseInt(PSIC_ARRAY[2])+parseInt(CIV_ARRAY[2])+ parseInt(HP_ARRAY[2])+
	parseInt(HU_ARRAY[2])+ parseInt(GEOG_ARRAY[2])+ parseInt(ECON_ARRAY[2])+ parseInt(FIL_ARRAY[2]) + parseInt(FIS_ARRAY[2])+parseInt(QUIM_ARRAY[2])+
	parseInt(BIOL_ARRAY[2]) );
	var COM3=( parseInt(LEN_ARRAY[3])+parseInt(LIT_ARRAY[3])+parseInt(PSIC_ARRAY[3])+parseInt(CIV_ARRAY[3])+ parseInt(HP_ARRAY[3])+
	parseInt(HU_ARRAY[3])+ parseInt(GEOG_ARRAY[3])+ parseInt(ECON_ARRAY[3])+ parseFloat(FIL_ARRAY[3]) + parseInt(FIS_ARRAY[3])+parseInt(QUIM_ARRAY[3])+
	parseInt(BIOL_ARRAY[3]) );

	var PRO1= (parseInt(HV1)+parseInt(HM1) +parseInt(MAT1)+parseInt(COM1));
	var PRO2= ( parseInt(HV2)+parseInt(HM2) +parseInt(MAT2)+parseInt(COM2));
	var PRO3=( parseInt(HV3)+parseInt(HM3) +parseInt(MAT3)+parseInt(COM3));
         //SUMA PORCENTALES
		 PORCT1=parseInt(LEC_ARRAY[1])+parseInt(LEC_ARRAY[2])+parseInt(LEC_ARRAY[3]);
		 PORCT2=parseInt(RM_ARRAY[1])+parseInt(RM_ARRAY[2])+parseInt(RM_ARRAY[3]);
		 PORCT3=parseInt(ARIT_ARRAY[1])+parseInt(ARIT_ARRAY[2])+parseInt(ARIT_ARRAY[3]);
		 PORCT4=parseInt(ALG_ARRAY[1])+parseInt(ALG_ARRAY[2])+parseInt(ALG_ARRAY[3]);
		 PORCT5=parseInt(GEOM_ARRAY[1])+parseInt(GEOM_ARRAY[2])+parseInt(GEOM_ARRAY[3]);
		 PORCT6=parseInt(TRIG_ARRAY[1])+parseInt(TRIG_ARRAY[2])+parseInt(TRIG_ARRAY[3]);
		 PORCT7=parseInt(LEN_ARRAY[1])+parseInt(LEN_ARRAY[2])+parseInt(LEN_ARRAY[3]);
		 PORCT8=parseInt(LIT_ARRAY[1])+parseInt(LIT_ARRAY[2])+parseInt(LIT_ARRAY[3]);
		 PORCT9=parseInt(PSIC_ARRAY[1])+parseInt(PSIC_ARRAY[2])+parseInt(PSIC_ARRAY[3]);
		 PORCT10=parseInt(CIV_ARRAY[1])+parseInt(CIV_ARRAY[2])+parseInt(CIV_ARRAY[3]);
		 PORCT11=parseInt(HP_ARRAY[1])+parseInt(HP_ARRAY[2])+parseInt(HP_ARRAY[3]);
		 PORCT12=parseInt(HU_ARRAY[1])+parseInt(HU_ARRAY[2])+parseInt(HU_ARRAY[3]);
		 PORCT13=parseInt(GEOG_ARRAY[1])+parseInt(GEOG_ARRAY[2])+parseInt(GEOG_ARRAY[3]);
		 PORCT14=parseInt(ECON_ARRAY[1])+parseInt(ECON_ARRAY[2])+parseInt(ECON_ARRAY[3]);
		 PORCT15=parseInt(FIL_ARRAY[1])+parseInt(FIL_ARRAY[2])+parseInt(FIL_ARRAY[3]);
		 PORCT16=parseInt(FIS_ARRAY[1])+parseInt(FIS_ARRAY[2])+parseInt(FIS_ARRAY[3]);
		 PORCT17=parseInt(QUIM_ARRAY[1])+parseInt(QUIM_ARRAY[2])+parseInt(QUIM_ARRAY[3]);
		 PORCT18=parseInt(BIOL_ARRAY[1])+parseInt(BIOL_ARRAY[2])+parseInt(BIOL_ARRAY[3]);

			   body+="<tr>";
			   body+="<td>"+(index+1)+"</td>";		  
			   body+="<td>"+datos[index][2]+"</td>";		
	 body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(LEC_ARRAY[1]*100/PORCT1)+"% </td> <td style='"+rojo+"'>"+financial(LEC_ARRAY[2]*100/PORCT1)+"% </td><td style='"+plomo+"'>"+financial(LEC_ARRAY[3]*100/PORCT1)+"% </td> </tr></table></span></td>";
 
	 ///*COLUMNA1 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(HV)+"</th></tr><tr> <td style='"+verde+"'>"+(HV1)+"</td> <td style='"+rojo+"'>"+(HV2)+"</td><td style='"+plomo+"'>"+(HV3)+"</td> </tr></table></span></td>";
body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(RM_ARRAY[1]*100/PORCT2)+"% </td> <td style='"+rojo+"'>"+financial(RM_ARRAY[2]*100/PORCT2)+"% </td><td style='"+plomo+"'>"+financial(RM_ARRAY[3]*100/PORCT2)+"% </td> </tr></table></span></td>";
			   // /*COLUMNA2 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(HM)+"</th></tr><tr> <td style='"+verde+"'>"+(HM1)+"</td> <td style='"+rojo+"'>"+(HM2)+"</td><td style='"+plomo+"'>"+(HM3)+"</td> </tr></table></span></td>";			  
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(ARIT_ARRAY[1]*100/PORCT3)+"% </td> <td style='"+rojo+"'>"+financial(ARIT_ARRAY[2]*100/PORCT3)+"% </td><td style='"+plomo+"'>"+financial(ARIT_ARRAY[3]*100/PORCT3)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(ALG_ARRAY[1]*100/PORCT4)+"% </td> <td style='"+rojo+"'>"+financial(ALG_ARRAY[2]*100/PORCT4)+"% </td><td style='"+plomo+"'>"+financial(ALG_ARRAY[3]*100/PORCT4)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(GEOM_ARRAY[1]*100/PORCT5)+"% </td> <td style='"+rojo+"'>"+financial(GEOM_ARRAY[2]*100/PORCT5)+"% </td><td style='"+plomo+"'>"+financial(GEOM_ARRAY[3]*100/PORCT5)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(TRIG_ARRAY[1]*100/PORCT6)+"% </td> <td style='"+rojo+"'>"+financial(TRIG_ARRAY[2]*100/PORCT6)+"% </td><td style='"+plomo+"'>"+financial(TRIG_ARRAY[3]*100/PORCT6)+"% </td> </tr></table></span></td>";
 
			   ///*COLUMNA3 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(MAT)+"</th></tr><tr> <td style='"+verde+"'>"+(MAT1)+"</td> <td style='"+rojo+"'>"+(MAT2)+"</td><td style='"+plomo+"'>"+(MAT3)+"</td> </tr></table></span></td>";			  	  
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(LEN_ARRAY[1]*100/PORCT7)+"% </td> <td style='"+rojo+"'>"+financial(LEN_ARRAY[2]*100/PORCT7)+"% </td><td style='"+plomo+"'>"+financial(LEN_ARRAY[3]*100/PORCT7)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(LIT_ARRAY[1]*100/PORCT8)+"% </td> <td style='"+rojo+"'>"+financial(LIT_ARRAY[2]*100/PORCT8)+"% </td><td style='"+plomo+"'>"+financial(LIT_ARRAY[3]*100/PORCT8)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(PSIC_ARRAY[1]*100/PORCT9)+"% </td> <td style='"+rojo+"'>"+financial(PSIC_ARRAY[2]*100/PORCT9)+"% </td><td style='"+plomo+"'>"+financial(PSIC_ARRAY[3]*100/PORCT9)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(CIV_ARRAY[1]*100/PORCT10)+"% </td> <td style='"+rojo+"'>"+financial(CIV_ARRAY[2]*100/PORCT10)+"% </td><td style='"+plomo+"'>"+financial(CIV_ARRAY[3]*100/PORCT10)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(HP_ARRAY[1]*100/PORCT11)+"% </td> <td style='"+rojo+"'>"+financial(HP_ARRAY[2]*100/PORCT11)+"% </td><td style='"+plomo+"'>"+financial(HP_ARRAY[3]*100/PORCT11)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(HU_ARRAY[1]*100/PORCT12)+"% </td> <td style='"+rojo+"'>"+financial(HU_ARRAY[2]*100/PORCT12)+"% </td><td style='"+plomo+"'>"+financial(HU_ARRAY[3]*100/PORCT12)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(GEOG_ARRAY[1]*100/PORCT13)+"% </td> <td style='"+rojo+"'>"+financial(GEOG_ARRAY[2]*100/PORCT13)+"% </td><td style='"+plomo+"'>"+financial(GEOG_ARRAY[3]*100/PORCT13)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(ECON_ARRAY[1]*100/PORCT14)+"% </td> <td style='"+rojo+"'>"+financial(ECON_ARRAY[2]*100/PORCT14)+"% </td><td style='"+plomo+"'>"+financial(ECON_ARRAY[3]*100/PORCT14)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(FIL_ARRAY[1]*100/PORCT15)+"% </td> <td style='"+rojo+"'>"+financial(FIL_ARRAY[2]*100/PORCT15)+"% </td><td style='"+plomo+"'>"+financial(FIL_ARRAY[3]*100/PORCT15)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(FIS_ARRAY[1]*100/PORCT16)+"% </td> <td style='"+rojo+"'>"+financial(FIS_ARRAY[2]*100/PORCT16)+"% </td><td style='"+plomo+"'>"+financial(FIS_ARRAY[3]*100/PORCT16)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(QUIM_ARRAY[1]*100/PORCT17)+"% </td> <td style='"+rojo+"'>"+financial(QUIM_ARRAY[2]*100/PORCT17)+"% </td><td style='"+plomo+"'>"+financial(QUIM_ARRAY[3]*100/PORCT17)+"% </td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(BIOL_ARRAY[1]*100/PORCT18)+"% </td> <td style='"+rojo+"'>"+financial(BIOL_ARRAY[2]*100/PORCT18)+"% </td><td style='"+plomo+"'>"+financial(BIOL_ARRAY[3]*100/PORCT18)+"% </td> </tr></table></span></td>";
 
			   ///*COLUMNA4 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(COM)+"</th></tr><tr> <td style='"+verde+"'>"+(COM1)+"</td> <td style='"+rojo+"'>"+(COM2)+"</td><td style='"+plomo+"'>"+(COM3)+"</td> </tr></table></span></td>";			  	  
	//         /*EQUI */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(datos[index][21])+"</th></tr><tr> <td style='"+verde+"'>"+(PRO1)+"</td> <td style='"+rojo+"'>"+(PRO2)+"</td><td style='"+plomo+"'>"+(PRO3)+"</td> </tr></table></span></td>";

			   body+="</tr>";
			 		 
			 }); 
	   
			}

			
			if (linea==37) {
				head+=" <th>ID</th><th>SALÓN</th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Razonamiento Verbal</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Razonamiento Matemático</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Aritmética</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Álgebra</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Geometría</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Trigonometría</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Lenguaje</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Historia del Perú</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";




				
				promedio=datos.length;   
				$.each(datos, function (index, value) {
		   
	  
				  total=financial( parseFloat(datos[index][3])+parseFloat(datos[index][4])+parseFloat(datos[index][5])+parseFloat(datos[index][6])
				  +parseFloat(datos[index][7])+parseFloat(datos[index][8])+parseFloat(datos[index][9])+parseFloat(datos[index][10]) );
				 body+="<tr>";
				 body+="<td>"+(index+1)+"</td>";
				// body+="<td>"+datos[index][0]+"</td>";
				 //body+="<td>"+datos[index][1]+"</td>";
				 body+="<td>"+datos[index][2]+"</td>";

				   //colores
					var verde="color: #444;font-weight: bold;width: 33%;";
					var rojo="color: #444;font-weight: bold;width: 33%;";
					var plomo="color: #444;font-weight: bold;width: 33%;";
					var arriba="arriba: #444;font-weight: bold;";
				   //SEPARACION
				   var RM = datos[index][3]; var RM_ARRAY = RM.split("|");
				   var RV = datos[index][4]; var RV_ARRAY = RV.split("|");
  
				   var ARI = datos[index][5]; var ARI_ARRAY = ARI.split("|");
				   var ALG = datos[index][6]; var ALG_ARRAY = ALG.split("|");
				   var GEO = datos[index][7]; var GEO_ARRAY = GEO.split("|");
				   var TRIGO = datos[index][8]; var TRIGO_ARRAY = TRIGO.split("|");

				   var LEN = datos[index][9]; var LEN_ARRAY = LEN.split("|");
				   var HP = datos[index][10]; var  HP_ARRAY = HP.split("|");

				   var EQUI = datos[index][11]; var EQUI_ARRAY = EQUI.split("|");
                   
               // COLUMAS TOTAL PORCENTAL
		


				   //SUMA DE COLUMNAS
				   var APT=parseFloat(RM_ARRAY[0])+parseFloat(RV_ARRAY[0]);
				   var apt1=parseInt(RM_ARRAY[1])+parseInt(RV_ARRAY[1]);
				   var apt2=parseInt(RM_ARRAY[2])+parseInt(RV_ARRAY[2]); 
				   var apt3=parseInt(RM_ARRAY[3])+parseInt(RV_ARRAY[3]);
				  
				   var MATE=parseFloat(ARI_ARRAY[0])+parseFloat(ALG_ARRAY[0])+parseFloat(GEO_ARRAY[0])+parseFloat(TRIGO_ARRAY[0]);
				   var MATE1=parseInt(ARI_ARRAY[1])+parseInt(ALG_ARRAY[1])+parseFloat(GEO_ARRAY[1])+parseFloat(TRIGO_ARRAY[1]);
				   var MATE2=parseInt(ARI_ARRAY[2])+parseInt(ALG_ARRAY[2])+parseFloat(GEO_ARRAY[2])+parseFloat(TRIGO_ARRAY[2]);
				   var MATE3=parseInt(ARI_ARRAY[3])+parseInt(ALG_ARRAY[3])+parseFloat(GEO_ARRAY[3])+parseFloat(TRIGO_ARRAY[3]);
  
				   var COM =parseFloat(LEN_ARRAY[0])+parseFloat(HP_ARRAY[0]);
				   var COM1 =parseInt(LEN_ARRAY[1])+parseInt(HP_ARRAY[1]);
				   var COM2 =parseInt(LEN_ARRAY[2])+parseInt(HP_ARRAY[2]);
				   var COM3 =parseInt(LEN_ARRAY[3])+parseInt(HP_ARRAY[3]);

				   var  PROM=parseFloat(APT+MATE+COM);
				   var  PROM1=parseInt(apt1+MATE1+COM1);
				   var  PROM2=parseInt(apt2+MATE2+COM2);
				   var  PROM3=parseInt(apt3+MATE3+COM3);

                //SEPARO COLUMNAS 
				PORCT1=parseInt(RM_ARRAY[1])+parseInt(RM_ARRAY[2])+parseInt(RM_ARRAY[3]);
				PORCT2=parseInt(RV_ARRAY[1])+parseInt(RV_ARRAY[2])+parseInt(RV_ARRAY[3]);
				PORCT3=parseInt(ARI_ARRAY[1])+parseInt(ARI_ARRAY[2])+parseInt(ARI_ARRAY[3]);
				PORCT4=parseInt(ALG_ARRAY[1])+parseInt(ALG_ARRAY[2])+parseInt(ALG_ARRAY[3]);
				PORCT5=parseInt(GEO_ARRAY[1])+parseInt(GEO_ARRAY[2])+parseInt(GEO_ARRAY[3]);
				PORCT6=parseInt(TRIGO_ARRAY[1])+parseInt(TRIGO_ARRAY[2])+parseInt(TRIGO_ARRAY[3]);
				PORCT7=parseInt(LEN_ARRAY[1])+parseInt(LEN_ARRAY[2])+parseInt(RM_ARRAY[3]);
				PORCT8=parseInt(HP_ARRAY[1])+parseInt(HP_ARRAY[2])+parseInt(HP_ARRAY[3]);

	 body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(RM_ARRAY[1]*100/PORCT1)+"%</td> <td style='"+rojo+"'>"+financial(RM_ARRAY[2]*100/PORCT1)+"%</td><td style='"+plomo+"'>"+financial(RM_ARRAY[3]*100/PORCT1)+"%</td> </tr></table></span></td>";
	 body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(RV_ARRAY[1]*100/PORCT2)+"%</td> <td style='"+rojo+"'>"+financial(RV_ARRAY[2]*100/PORCT2)+"%</td><td style='"+plomo+"'>"+financial(RV_ARRAY[3]*100/PORCT2)+"%</td> </tr></table></span></td>";
	//  /*COLUMNA1 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(APT)+"</th></tr><tr> <td style='"+verde+"'>"+(apt1)+"</td> <td style='"+rojo+"'>"+(apt2)+"</td><td style='"+plomo+"'>"+(apt3)+"</td> </tr></table></span></td>";
	body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(ARI_ARRAY[1]*100/PORCT3)+"%</td> <td style='"+rojo+"'>"+financial(ARI_ARRAY[2]*100/PORCT3)+"%</td><td style='"+plomo+"'>"+financial(ARI_ARRAY[3]*100/PORCT3)+"%</td> </tr></table></span></td>";
	body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(ALG_ARRAY[1]*100/PORCT4)+"%</td> <td style='"+rojo+"'>"+financial(ALG_ARRAY[2]*100/PORCT4)+"%</td><td style='"+plomo+"'>"+financial(ALG_ARRAY[3]*100/PORCT4)+"%</td> </tr></table></span></td>";
	body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(GEO_ARRAY[1]*100/PORCT5)+"%</td> <td style='"+rojo+"'>"+financial(GEO_ARRAY[2]*100/PORCT5)+"%</td><td style='"+plomo+"'>"+financial(GEO_ARRAY[3]*100/PORCT5)+"%</td> </tr></table></span></td>";
	body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(TRIGO_ARRAY[1]*100/PORCT6)+"%</td> <td style='"+rojo+"'>"+financial(TRIGO_ARRAY[2]*100/PORCT6)+"%</td><td style='"+plomo+"'>"+financial(TRIGO_ARRAY[3]*100/PORCT6)+"%</td> </tr></table></span></td>";
	  ///*COLUMNA2 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(MATE)+"</th></tr><tr> <td style='"+verde+"'>"+(MATE1)+"</td> <td style='"+rojo+"'>"+(MATE2)+"</td><td style='"+plomo+"'>"+(MATE3)+"</td> </tr></table></span></td>";
	  body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(LEN_ARRAY[1]*100/PORCT7)+"%</td> <td style='"+rojo+"'>"+financial(LEN_ARRAY[2]*100/PORCT7)+"%</td><td style='"+plomo+"'>"+financial(LEN_ARRAY[3]*100/PORCT7)+"%</td> </tr></table></span></td>";
	  body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(HP_ARRAY[1]*100/PORCT8)+"%</td> <td style='"+rojo+"'>"+financial(HP_ARRAY[2]*100/PORCT8)+"%</td><td style='"+plomo+"'>"+financial(HP_ARRAY[3]*100/PORCT8)+"%</td> </tr></table></span></td>";
	  // /*COLUMNA3 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(COM)+"</th></tr><tr> <td style='"+verde+"'>"+(COM1)+"</td> <td style='"+rojo+"'>"+(COM2)+"</td><td style='"+plomo+"'>"+(COM3)+"</td> </tr></table></span></td>";
	  ///*COLUMNA4 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(PROM)+"</th></tr><tr> <td style='"+verde+"'>"+(PROM1)+"</td> <td style='"+rojo+"'>"+(PROM2)+"</td><td style='"+plomo+"'>"+(PROM3)+"</td> </tr></table></span></td>";


  
				 body+="</tr>";
				 total=0;
			   
			   }); 
		 
				
			 }
  

			if (linea==1 || linea==33) {

			
                head+=" <th>ID</th><th>SALÓN</th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Lectura Comprensiva y Crítica</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Ortografía y Puntuación</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Vocabulario y Const. Oracional</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Números y Operaciones</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Álgebra</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Geometría y Medidas</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";
                head+= "<th><span><table style=' border: 0;' ><tr><th colspan='3' >Estadística y Probabilidad</th></tr><tr><td style='"+gg1+"'>B</td><td style='"+gg2+"'>M</td><td style='"+gg3+"'>BL</td></tr></table></span></th>";




				promedio=datos.length;  
				$.each(datos, function (index, value) {
	
					if (datos[index][9]==null || datos[index][9]=="") {
						datos[index][9]="0|0|0|0";
					}
		 

				 body+="<tr>";
				 body+="<td>"+(index+1)+"</td>";
			
				 body+="<td>"+datos[index][2]+"</td>";
			
	
				   var verde="color: #444;font-weight: bold;width: 33%;";
				   var rojo="color: #444;font-weight: bold;width: 33%;";
				   var plomo="color: #444;font-weight: bold;width: 33%;";
				   var arriba="arriba: #444;font-weight: bold;";
				  //SEPARACION
				  var LECT = datos[index][3]; var LECT_ARRAY = LECT.split("|");
				  var OP = datos[index][4]; var OP_ARRAY = OP.split("|");
				  var VC = datos[index][5]; var VC_ARRAY = VC.split("|");

				  var NUOP = datos[index][6]; var NUOP_ARRAY = NUOP.split("|");
				  var ALG = datos[index][7]; var ALG_ARRAY = ALG.split("|");
				  var GM = datos[index][8]; var GM_ARRAY = GM.split("|");
				  var EP = datos[index][9]; var EP_ARRAY = EP.split("|");
				//SUMA DE COLUMNAS
				var COM=parseFloat(LECT_ARRAY[0]);var COM1=parseInt(LECT_ARRAY[1]);var COM2=parseInt(LECT_ARRAY[2]);var COM3=parseInt(LECT_ARRAY[3]);

				var RED=(parseFloat(OP_ARRAY[0])+parseFloat(VC_ARRAY[0]))/2;
				var RED1=(parseInt(OP_ARRAY[1])+parseInt(VC_ARRAY[1]));
				var RED2=(parseInt(OP_ARRAY[2])+parseInt(VC_ARRAY[2]));
				var RED3=(parseInt(OP_ARRAY[3])+parseInt(VC_ARRAY[3]));

                var MATE = (parseFloat(NUOP_ARRAY[0]) + parseFloat(ALG_ARRAY[0])+ parseFloat(GM_ARRAY[0])+ parseFloat(EP_ARRAY[0]))/4;
                var MATE1=(parseInt(NUOP_ARRAY[1])+parseInt(ALG_ARRAY[1])+parseInt(GM_ARRAY[1])+parseInt(EP_ARRAY[1]));
				var MATE2=(parseInt(NUOP_ARRAY[2])+parseInt(ALG_ARRAY[2])+parseInt(GM_ARRAY[2])+parseInt(EP_ARRAY[2]));
				var MATE3=(parseInt(NUOP_ARRAY[3])+parseInt(ALG_ARRAY[3])+parseInt(GM_ARRAY[3])+parseInt(EP_ARRAY[3]));

                var AV=(parseFloat(COM)+parseFloat(RED))/2;
				var AV1=(parseInt(COM1)+parseInt(RED1));
				var AV2=(parseInt(COM2)+parseInt(RED2));
				var AV3=(parseInt(COM3)+parseInt(RED3));

                var TOTAL=( (parseFloat(MATE)+parseFloat(AV))/2 )*10;
				var TOTAL1=(parseInt(MATE1)+parseInt(AV1));
				var TOTAL2=(parseInt(MATE2)+parseInt(AV2));
				var TOTAL3=(parseInt(MATE3)+parseInt(AV3));

     PORCT1=parseInt(LECT_ARRAY[1])+parseInt(LECT_ARRAY[2])+parseInt(LECT_ARRAY[3]);
     PORCT2=parseInt(OP_ARRAY[1])+parseInt(OP_ARRAY[2])+parseInt(OP_ARRAY[3]);
     PORCT3=parseInt(VC_ARRAY[1])+parseInt(VC_ARRAY[2])+parseInt(VC_ARRAY[3]);
     PORCT4=parseInt(NUOP_ARRAY[1])+parseInt(NUOP_ARRAY[2])+parseInt(NUOP_ARRAY[3]);
     PORCT5=parseInt(ALG_ARRAY[1])+parseInt(ALG_ARRAY[2])+parseInt(ALG_ARRAY[3]);
     PORCT6=parseInt(GM_ARRAY[1])+parseInt(GM_ARRAY[2])+parseInt(GM_ARRAY[3]);
     PORCT7=parseInt(EP_ARRAY[1])+parseInt(EP_ARRAY[2])+parseInt(EP_ARRAY[3]);

	 body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(LECT_ARRAY[1]*100/PORCT1)+"%</td> <td style='"+rojo+"'>"+financial(LECT_ARRAY[2]*100/PORCT1)+"%</td><td style='"+plomo+"'>"+financial(LECT_ARRAY[3]*100/PORCT1)+"%</td> </tr></table></span></td>";
	///*COLUMNA1 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(COM)+"</th></tr><tr> <td style='"+verde+"'>"+(COM1)+"</td> <td style='"+rojo+"'>"+(COM2)+"</td><td style='"+plomo+"'>"+(COM3)+"</td> </tr></table></span></td>";
    body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(OP_ARRAY[1]*100/PORCT2)+"%</td> <td style='"+rojo+"'>"+financial(OP_ARRAY[2]*100/PORCT2)+"%</td><td style='"+plomo+"'>"+financial(OP_ARRAY[3]*100/PORCT2)+"%</td> </tr></table></span></td>";
    body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(VC_ARRAY[1]*100/PORCT3)+"%</td> <td style='"+rojo+"'>"+financial(VC_ARRAY[2]*100/PORCT3)+"%</td><td style='"+plomo+"'>"+financial(VC_ARRAY[3]*100/PORCT3)+"%</td> </tr></table></span></td>";
    //	/*COLUMNA1 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(RED)+"</th></tr><tr> <td style='"+verde+"'>"+(RED1)+"</td> <td style='"+rojo+"'>"+(RED2)+"</td><td style='"+plomo+"'>"+(RED3)+"</td> </tr></table></span></td>";
    body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(NUOP_ARRAY[1]*100/PORCT4)+"%</td> <td style='"+rojo+"'>"+financial(NUOP_ARRAY[2]*100/PORCT4)+"%</td><td style='"+plomo+"'>"+financial(NUOP_ARRAY[3]*100/PORCT4)+"%</td> </tr></table></span></td>";
    body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(ALG_ARRAY[1]*100/PORCT5)+"%</td> <td style='"+rojo+"'>"+financial(ALG_ARRAY[2]*100/PORCT5)+"%</td><td style='"+plomo+"'>"+financial(ALG_ARRAY[3]*100/PORCT5)+"%</td> </tr></table></span></td>";
    body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(GM_ARRAY[1]*100/PORCT6)+"%</td> <td style='"+rojo+"'>"+financial(GM_ARRAY[2]*100/PORCT6)+"%</td><td style='"+plomo+"'>"+financial(GM_ARRAY[3]*100/PORCT6)+"%</td> </tr></table></span></td>";
    body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' ></th></tr><tr> <td style='"+verde+"'>"+financial(EP_ARRAY[1]*100/PORCT7)+"%</td> <td style='"+rojo+"'>"+financial(EP_ARRAY[2]*100/PORCT7)+"%</td><td style='"+plomo+"'>"+financial(EP_ARRAY[3]*100/PORCT7)+"%</td> </tr></table></span></td>";
    //	/*COLUMNA2*/ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(MATE)+"</th></tr><tr> <td style='"+verde+"'>"+(MATE1)+"</td> <td style='"+rojo+"'>"+(MATE2)+"</td><td style='"+plomo+"'>"+(MATE3)+"</td> </tr></table></span></td>";
//	/*COLUMNA3*/ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(AV)+"</th></tr><tr> <td style='"+verde+"'>"+(AV1)+"</td> <td style='"+rojo+"'>"+(AV2)+"</td><td style='"+plomo+"'>"+(AV3)+"</td> </tr></table></span></td>";
//	/*COLUMNA4*/ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(MATE)+"</th></tr><tr> <td style='"+verde+"'>"+(MATE1)+"</td> <td style='"+rojo+"'>"+(MATE2)+"</td><td style='"+plomo+"'>"+(MATE3)+"</td> </tr></table></span></td>";
//	/*COLUMNA5*/ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(TOTAL)+"</th></tr><tr> <td style='"+verde+"'>"+(TOTAL1)+"</td> <td style='"+rojo+"'>"+(TOTAL2)+"</td><td style='"+plomo+"'>"+(TOTAL3)+"</td> </tr></table></span></td>";



				 body+="</tr>";
				 total=0;
				 
			   }); 
	
	
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
	   






function financial(x) {
	return Number.parseFloat(x).toFixed(1);
}

function metodoselectarea() {
	//alert("Ahora seleccione un Simulacro.");
}

function metodotipo() {
	alert("Ahora seleccione un Simulacro.");
}

function mensajecaja() {
	var ht =
		'<tr ><td colspan="11" style="text-align: center;font-size: 16px;border: 1px solid #fff; ">Filtra en el combobox para ver la información.</td></tr>';
	$("#cuerpo").html(ht);
}
