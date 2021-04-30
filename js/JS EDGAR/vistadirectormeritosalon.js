$(document).ready(function () {

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
	
		 var promedio=0;

		 var COL1=0;var COL2=0;var COL3=0;var COL4=0;var COL5=0;var COL6=0;var COL7=0;var COL8=0;
		 var COL9=0; var COL10=0; var COL11=0;var COL12=0;var COL13=0;var COL14=0;
		 var COL15=0;var COL16=0;var COL17=0;var COL18=0;var COL19=0;var COL20=0;var COL21=0;var COL22=0;var COL23=0;

		   if (linea==36) {
			promedio=datos.length; 

			  head+=" <th>ID</th><th>CÓDIGO</th><th>NOMBRE DEL ALUMNO</th><th>SALÓN</th><th>MS</th><th>R.M</th><th>A.V.</th><th style=' BACKGROUND-COLOR: aqua;'>APT</th>"+
			 "<th>ARIT.</th><th>ÁLG.</th><th>GEOM.</th><th>TRIG.</th><th style=' BACKGROUND-COLOR: aqua;'>MAT.</th><th>FÍS.</th><th>QUÍM.</th><th style=' BACKGROUND-COLOR: aqua;'>CIENC.</th><th style=' BACKGROUND-COLOR: aqua;'>TOT.</th>"+
			  "<th style='BACKGROUND-COLOR: aqua;text-align: center;'>EQUI.</th>";
			  promedio=datos.length;   

			  $.each(datos, function (index, value) {
		 
	
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
	
	             //colores
                  var verde="color: #24d483;font-weight: bold;width: 33%;";
				  var rojo="color: RED;font-weight: bold;width: 33%;";
				  var plomo="color: #777;font-weight: bold;width: 33%;";
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

         //MIS COLUMNAS
                    
		 COL1+=parseFloat(datos[index][3]);  
		 COL2+=parseFloat(datos[index][4]);  
		 COL3+=parseFloat(APT);             
		 COL4+=parseFloat(datos[index][5]);  
		 COL5+=parseFloat(datos[index][6]);  
		 COL6+=parseFloat(datos[index][7]);  
		 COL7+=parseFloat(datos[index][8]);  
		 COL8+=parseFloat(MATE);             
		 COL9+=parseFloat(datos[index][9]);    
		 COL10+=parseFloat(datos[index][10]); 
		 COL11+=parseFloat(CIENCIA);          
		 COL12+=parseFloat(SUMCOL1TOT);      
		 COL13+=parseFloat(datos[index][11]); 


				 body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+RM_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+RM_ARRAY[1]+"</td> <td style='"+rojo+"'>"+RM_ARRAY[2]+"</td><td style='"+plomo+"'>"+RM_ARRAY[3]+"</td> </tr></table></span></td>";
				 body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+RV_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+RV_ARRAY[1]+"</td> <td style='"+rojo+"'>"+RV_ARRAY[2]+"</td><td style='"+plomo+"'>"+RV_ARRAY[3]+"</td> </tr></table></span></td>";
	/*COLUMNA1 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(APT)+"</th></tr><tr> <td style='"+verde+"'>"+(apt1)+"</td> <td style='"+rojo+"'>"+(apt2)+"</td><td style='"+plomo+"'>"+(apt3)+"</td> </tr></table></span></td>";
				 body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+ARI_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+ARI_ARRAY[1]+"</td> <td style='"+rojo+"'>"+ARI_ARRAY[2]+"</td><td style='"+plomo+"'>"+ARI_ARRAY[3]+"</td> </tr></table></span></td>";
				 body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+ALG_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+ALG_ARRAY[1]+"</td> <td style='"+rojo+"'>"+ALG_ARRAY[2]+"</td><td style='"+plomo+"'>"+ALG_ARRAY[3]+"</td> </tr></table></span></td>";
				 body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+GEO_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+GEO_ARRAY[1]+"</td> <td style='"+rojo+"'>"+GEO_ARRAY[2]+"</td><td style='"+plomo+"'>"+GEO_ARRAY[3]+"</td> </tr></table></span></td>";
				 body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+TRIGO_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+TRIGO_ARRAY[1]+"</td> <td style='"+rojo+"'>"+TRIGO_ARRAY[2]+"</td><td style='"+plomo+"'>"+TRIGO_ARRAY[3]+"</td> </tr></table></span></td>";
	/*COLUMNA2 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(MATE)+"</th></tr><tr> <td style='"+verde+"'>"+(MATE1)+"</td> <td style='"+rojo+"'>"+(MATE2)+"</td><td style='"+plomo+"'>"+(MATE3)+"</td> </tr></table></span></td>";

          body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+FIS_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+FIS_ARRAY[1]+"</td> <td style='"+rojo+"'>"+FIS_ARRAY[2]+"</td><td style='"+plomo+"'>"+FIS_ARRAY[3]+"</td> </tr></table></span></td>";
          body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+QUIM_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+QUIM_ARRAY[1]+"</td> <td style='"+rojo+"'>"+QUIM_ARRAY[2]+"</td><td style='"+plomo+"'>"+QUIM_ARRAY[3]+"</td> </tr></table></span></td>";

	/*COLUMNA3 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(CIENCIA)+"</th></tr><tr> <td style='"+verde+"'>"+(CIENCIA1)+"</td> <td style='"+rojo+"'>"+(CIENCIA2)+"</td><td style='"+plomo+"'>"+(CIENCIA3)+"</td> </tr></table></span></td>";
	
	/*COLUMNATOTAL */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(APT+MATE+CIENCIA)+"</th></tr><tr> <td style='"+verde+"'>"+(SUMCOL1TOT)+"</td> <td style='"+rojo+"'>"+(SUMCOL2TOT)+"</td><td style='"+plomo+"'>"+(SUMCOL3TOT)+"</td> </tr></table></span></td>";
	/*EQUI */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(datos[index][11])+"</th></tr><tr> <td style='"+verde+"'>"+(SUMCOL1TOT)+"</td> <td style='"+rojo+"'>"+(SUMCOL2TOT)+"</td><td style='"+plomo+"'>"+(SUMCOL3TOT)+"</td> </tr></table></span></td>";


			   body+="</tr>";
			   total=0;
			 
			 }); 
	   
			  
		   }


		   if (linea==31) {
			head+=" <th>ID</th><th>CÓDIGO</th><th>NOMBRE DEL ALUMNO</th><th>SALÓN</th><th>MS</th><th>LECT</th><th style='background-color: aqua;'>H.V</th><th>R.M</th><th style='background-color: aqua;'>H.M</th><th>ARIT.</th><th>ÁLG.</th>"+
			"<th>GEOM.</th><th>TRIG.</th><th style='background-color: aqua;'>MAT.</th><th>LENG.</th><th>LIT.</th><th>PSIC.</th><th>C.</th><th>H.P.</th><th>H.U.</th><th>GEOG.</th>"+
			"<th>ECON.</th><th>FIL.</th><th>FÍS.</th><th>QUÍM.</th><th>BIO.</th>"+
			"<th style='BACKGROUND-COLOR: aqua;text-align: center;'>CON.</th><th style='BACKGROUND-COLOR: aqua;text-align: center;'>PROM.</th>";
		  
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
			var verde="color: #24d483;font-weight: bold;width: 33%;";
			var rojo="color: RED;font-weight: bold;width: 33%;";
			var plomo="color: #777;font-weight: bold;width: 33%;";
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

				 COL1+=parseFloat(datos[index][3]);  
				 COL2+=parseFloat(datos[index][3]);  
				 COL3+=parseFloat(datos[index][4]);  
				 COL4+=parseFloat(datos[index][4]);  
				 COL5+=parseFloat(datos[index][5]);  
				 COL6+=parseFloat(datos[index][6]);  
				 COL7+=parseFloat(datos[index][7]);  
				 COL8+=parseFloat(datos[index][8]);  
				 COL9+=parseFloat(MAT);   
				 COL10+=parseFloat(datos[index][9]);  
				 COL11+=parseFloat(datos[index][10]);   
				 COL12+=parseFloat(datos[index][11]);  
				 COL13+=parseFloat(datos[index][12]);  
				 COL14+=parseFloat(datos[index][13]);  
				 COL15+=parseFloat(datos[index][14]);  
				 COL16+=parseFloat(datos[index][15]);  
				 COL17+=parseFloat(datos[index][16]);  
				 COL18+=parseFloat(datos[index][17]);  
				 COL19+=parseFloat(datos[index][18]);  
				 COL20+=parseFloat(datos[index][19]);  
				 COL21+=parseFloat(datos[index][20]);  
				 COL22+=parseFloat(COM);  
				 COL23+=parseFloat(datos[index][21]);  
				 

			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+LEC_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+LEC_ARRAY[1]+"</td> <td style='"+rojo+"'>"+LEC_ARRAY[2]+"</td><td style='"+plomo+"'>"+LEC_ARRAY[3]+"</td> </tr></table></span></td>";
 /*COLUMNA1 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(HV)+"</th></tr><tr> <td style='"+verde+"'>"+(HV1)+"</td> <td style='"+rojo+"'>"+(HV2)+"</td><td style='"+plomo+"'>"+(HV3)+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+RM_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+RM_ARRAY[1]+"</td> <td style='"+rojo+"'>"+RM_ARRAY[2]+"</td><td style='"+plomo+"'>"+RM_ARRAY[3]+"</td> </tr></table></span></td>";
 /*COLUMNA2 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(HM)+"</th></tr><tr> <td style='"+verde+"'>"+(HM1)+"</td> <td style='"+rojo+"'>"+(HM2)+"</td><td style='"+plomo+"'>"+(HM3)+"</td> </tr></table></span></td>";			  
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+ARIT_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+ARIT_ARRAY[1]+"</td> <td style='"+rojo+"'>"+ARIT_ARRAY[2]+"</td><td style='"+plomo+"'>"+ARIT_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+ALG_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+ALG_ARRAY[1]+"</td> <td style='"+rojo+"'>"+ALG_ARRAY[2]+"</td><td style='"+plomo+"'>"+ALG_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+GEOM_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+GEOM_ARRAY[1]+"</td> <td style='"+rojo+"'>"+GEOM_ARRAY[2]+"</td><td style='"+plomo+"'>"+GEOM_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+TRIG_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+TRIG_ARRAY[1]+"</td> <td style='"+rojo+"'>"+TRIG_ARRAY[2]+"</td><td style='"+plomo+"'>"+TRIG_ARRAY[3]+"</td> </tr></table></span></td>";
 /*COLUMNA3 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(MAT)+"</th></tr><tr> <td style='"+verde+"'>"+(MAT1)+"</td> <td style='"+rojo+"'>"+(MAT2)+"</td><td style='"+plomo+"'>"+(MAT3)+"</td> </tr></table></span></td>";			  	  
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+LEN_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+LEN_ARRAY[1]+"</td> <td style='"+rojo+"'>"+LEN_ARRAY[2]+"</td><td style='"+plomo+"'>"+LEN_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+LIT_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+LIT_ARRAY[1]+"</td> <td style='"+rojo+"'>"+LIT_ARRAY[2]+"</td><td style='"+plomo+"'>"+LIT_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+PSIC_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+PSIC_ARRAY[1]+"</td> <td style='"+rojo+"'>"+PSIC_ARRAY[2]+"</td><td style='"+plomo+"'>"+PSIC_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+CIV_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+CIV_ARRAY[1]+"</td> <td style='"+rojo+"'>"+CIV_ARRAY[2]+"</td><td style='"+plomo+"'>"+CIV_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+HP_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+HP_ARRAY[1]+"</td> <td style='"+rojo+"'>"+HP_ARRAY[2]+"</td><td style='"+plomo+"'>"+HP_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+HU_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+HU_ARRAY[1]+"</td> <td style='"+rojo+"'>"+HU_ARRAY[2]+"</td><td style='"+plomo+"'>"+HU_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+GEOG_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+GEOG_ARRAY[1]+"</td> <td style='"+rojo+"'>"+GEOG_ARRAY[2]+"</td><td style='"+plomo+"'>"+GEOG_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+ECON_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+ECON_ARRAY[1]+"</td> <td style='"+rojo+"'>"+ECON_ARRAY[2]+"</td><td style='"+plomo+"'>"+ECON_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+FIL_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+FIL_ARRAY[1]+"</td> <td style='"+rojo+"'>"+FIL_ARRAY[2]+"</td><td style='"+plomo+"'>"+FIL_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+FIS_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+FIS_ARRAY[1]+"</td> <td style='"+rojo+"'>"+FIS_ARRAY[2]+"</td><td style='"+plomo+"'>"+FIS_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+QUIM_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+QUIM_ARRAY[1]+"</td> <td style='"+rojo+"'>"+QUIM_ARRAY[2]+"</td><td style='"+plomo+"'>"+QUIM_ARRAY[3]+"</td> </tr></table></span></td>";
			   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+BIOL_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+BIOL_ARRAY[1]+"</td> <td style='"+rojo+"'>"+BIOL_ARRAY[2]+"</td><td style='"+plomo+"'>"+BIOL_ARRAY[3]+"</td> </tr></table></span></td>";
 /*COLUMNA4 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(COM)+"</th></tr><tr> <td style='"+verde+"'>"+(COM1)+"</td> <td style='"+rojo+"'>"+(COM2)+"</td><td style='"+plomo+"'>"+(COM3)+"</td> </tr></table></span></td>";			  	  
	         /*EQUI */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(datos[index][21])+"</th></tr><tr> <td style='"+verde+"'>"+(PRO1)+"</td> <td style='"+rojo+"'>"+(PRO2)+"</td><td style='"+plomo+"'>"+(PRO3)+"</td> </tr></table></span></td>";

			   body+="</tr>";
			 		 
			 }); 
	   
			}

			
			if (linea==37) {
				head+=" <th>ID</th><th>CÓDIGO</th><th>NOMBRE DEL ALUMNO</th><th>SALÓN</th><th>MS</th><th>R.V</th><th>R.M.</th><th style=' BACKGROUND-COLOR: aqua;'>APT</th>"+
			   "<th>ARIT.</th><th>ÁLG.</th><th>GEOM.</th><th>TRIG.</th><th style=' BACKGROUND-COLOR: aqua;'>MAT.</th><th>LENG.</th><th>HP.</th><th style=' BACKGROUND-COLOR: aqua;'>CON.</th>"+
				"<th style='BACKGROUND-COLOR: aqua;text-align: center;'>PROM.</th>";
				promedio=datos.length;   
				$.each(datos, function (index, value) {
		   
	  
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
	  
				   //colores
					var verde="color: #24d483;font-weight: bold;width: 33%;";
					var rojo="color: RED;font-weight: bold;width: 33%;";
					var plomo="color: #777;font-weight: bold;width: 33%;";
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

				   COL1+=parseFloat(datos[index][3]);  
				   COL2+=parseFloat(datos[index][4]);  
				   COL3+=parseFloat(APT);             
				   COL4+=parseFloat(datos[index][5]);  
				   COL5+=parseFloat(datos[index][6]);  
				   COL6+=parseFloat(datos[index][7]);  
				   COL7+=parseFloat(datos[index][8]);  
				   COL8+=parseFloat(MATE);             
				   COL9+=parseFloat(datos[index][9]);    
				   COL10+=parseFloat(datos[index][10]); 
				   COL11+=parseFloat(COM);          
				   COL12+=parseFloat(PROM);      
		



				   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+RM_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+RM_ARRAY[1]+"</td> <td style='"+rojo+"'>"+RM_ARRAY[2]+"</td><td style='"+plomo+"'>"+RM_ARRAY[3]+"</td> </tr></table></span></td>";
				   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+RV_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+RV_ARRAY[1]+"</td> <td style='"+rojo+"'>"+RV_ARRAY[2]+"</td><td style='"+plomo+"'>"+RV_ARRAY[3]+"</td> </tr></table></span></td>";
	  /*COLUMNA1 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(APT)+"</th></tr><tr> <td style='"+verde+"'>"+(apt1)+"</td> <td style='"+rojo+"'>"+(apt2)+"</td><td style='"+plomo+"'>"+(apt3)+"</td> </tr></table></span></td>";
				   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+ARI_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+ARI_ARRAY[1]+"</td> <td style='"+rojo+"'>"+ARI_ARRAY[2]+"</td><td style='"+plomo+"'>"+ARI_ARRAY[3]+"</td> </tr></table></span></td>";
				   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+ALG_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+ALG_ARRAY[1]+"</td> <td style='"+rojo+"'>"+ALG_ARRAY[2]+"</td><td style='"+plomo+"'>"+ALG_ARRAY[3]+"</td> </tr></table></span></td>";
				   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+GEO_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+GEO_ARRAY[1]+"</td> <td style='"+rojo+"'>"+GEO_ARRAY[2]+"</td><td style='"+plomo+"'>"+GEO_ARRAY[3]+"</td> </tr></table></span></td>";
				   body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+TRIGO_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+TRIGO_ARRAY[1]+"</td> <td style='"+rojo+"'>"+TRIGO_ARRAY[2]+"</td><td style='"+plomo+"'>"+TRIGO_ARRAY[3]+"</td> </tr></table></span></td>";
	  /*COLUMNA2 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(MATE)+"</th></tr><tr> <td style='"+verde+"'>"+(MATE1)+"</td> <td style='"+rojo+"'>"+(MATE2)+"</td><td style='"+plomo+"'>"+(MATE3)+"</td> </tr></table></span></td>";
	  body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+LEN_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+LEN_ARRAY[1]+"</td> <td style='"+rojo+"'>"+LEN_ARRAY[2]+"</td><td style='"+plomo+"'>"+LEN_ARRAY[3]+"</td> </tr></table></span></td>";
	  body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+HP_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+HP_ARRAY[1]+"</td> <td style='"+rojo+"'>"+HP_ARRAY[2]+"</td><td style='"+plomo+"'>"+HP_ARRAY[3]+"</td> </tr></table></span></td>";
	  /*COLUMNA3 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(COM)+"</th></tr><tr> <td style='"+verde+"'>"+(COM1)+"</td> <td style='"+rojo+"'>"+(COM2)+"</td><td style='"+plomo+"'>"+(COM3)+"</td> </tr></table></span></td>";
	  /*COLUMNA4 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(PROM)+"</th></tr><tr> <td style='"+verde+"'>"+(PROM1)+"</td> <td style='"+rojo+"'>"+(PROM2)+"</td><td style='"+plomo+"'>"+(PROM3)+"</td> </tr></table></span></td>";


  
				 body+="</tr>";
				 total=0;
			   
			   }); 
		 
				
			 }
  

if (linea==1 || linea==33) {
				promedio=datos.length;   

				head+=" <th>ID</th><th>CÓDIGO</th><th>NOMBRE DEL ALUMNO</th><th>SALÓN</th><th>MS</th><th>L.</th><th style='BACKGROUND-COLOR: aqua;'>CON.</th><th>O.P.</th><th>V.C.</th><th style='BACKGROUND-COLOR: aqua;'>RED.</th><th>N.OP.</th><th>ÁLG.</th><th>G.M.</th><th>E.P.</th><th style='BACKGROUND-COLOR: aqua;'>MAT.</th><th style='BACKGROUND-COLOR: aqua;'>A.V.</th><th style='BACKGROUND-COLOR: aqua;'>A.M.</th><th style='BACKGROUND-COLOR: aqua;text-align: center;'>PROM.</th>";
				
				promedio=datos.length;  
				$.each(datos, function (index, value) {
	
					if (datos[index][9]==null || datos[index][9]=="") {
						datos[index][9]="0|0|0|0";
					}
		 

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
	
				   var verde="color: #24d483;font-weight: bold;width: 33%;";
				   var rojo="color: RED;font-weight: bold;width: 33%;";
				   var plomo="color: #777;font-weight: bold;width: 33%;";
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


				COL1+=parseFloat(datos[index][3]);  
				COL2+=parseFloat(COM);  
				COL3+=parseFloat(datos[index][4]);            
				COL4+=parseFloat(datos[index][5]);  
				COL5+=parseFloat(RED);  
				COL6+=parseFloat(datos[index][6]);  
				COL7+=parseFloat(datos[index][7]);  
				COL8+=parseFloat(datos[index][8]); 
				COL9+=parseFloat(datos[index][9]); 
				COL10+=parseFloat(MATE);  
				COL11+=parseFloat(AV);  
				COL12+=parseFloat(MATE);  
				COL13+=parseFloat(TOTAL);  


				  body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+LECT_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+LECT_ARRAY[1]+"</td> <td style='"+rojo+"'>"+LECT_ARRAY[2]+"</td><td style='"+plomo+"'>"+LECT_ARRAY[3]+"</td> </tr></table></span></td>";
	/*COLUMNA1 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(COM)+"</th></tr><tr> <td style='"+verde+"'>"+(COM1)+"</td> <td style='"+rojo+"'>"+(COM2)+"</td><td style='"+plomo+"'>"+(COM3)+"</td> </tr></table></span></td>";
	body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+OP_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+OP_ARRAY[1]+"</td> <td style='"+rojo+"'>"+OP_ARRAY[2]+"</td><td style='"+plomo+"'>"+OP_ARRAY[3]+"</td> </tr></table></span></td>";
	body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+VC_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+VC_ARRAY[1]+"</td> <td style='"+rojo+"'>"+VC_ARRAY[2]+"</td><td style='"+plomo+"'>"+VC_ARRAY[3]+"</td> </tr></table></span></td>";
	/*COLUMNA1 */ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(RED)+"</th></tr><tr> <td style='"+verde+"'>"+(RED1)+"</td> <td style='"+rojo+"'>"+(RED2)+"</td><td style='"+plomo+"'>"+(RED3)+"</td> </tr></table></span></td>";
	body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+NUOP_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+NUOP_ARRAY[1]+"</td> <td style='"+rojo+"'>"+NUOP_ARRAY[2]+"</td><td style='"+plomo+"'>"+NUOP_ARRAY[3]+"</td> </tr></table></span></td>";
	body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+ALG_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+ALG_ARRAY[1]+"</td> <td style='"+rojo+"'>"+ALG_ARRAY[2]+"</td><td style='"+plomo+"'>"+ALG_ARRAY[3]+"</td> </tr></table></span></td>";
	body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+GM_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+GM_ARRAY[1]+"</td> <td style='"+rojo+"'>"+GM_ARRAY[2]+"</td><td style='"+plomo+"'>"+GM_ARRAY[3]+"</td> </tr></table></span></td>";
	body+="<td><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+"' >"+EP_ARRAY[0]+"</th></tr><tr> <td style='"+verde+"'>"+EP_ARRAY[1]+"</td> <td style='"+rojo+"'>"+EP_ARRAY[2]+"</td><td style='"+plomo+"'>"+EP_ARRAY[3]+"</td> </tr></table></span></td>";
	/*COLUMNA2*/ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(MATE)+"</th></tr><tr> <td style='"+verde+"'>"+(MATE1)+"</td> <td style='"+rojo+"'>"+(MATE2)+"</td><td style='"+plomo+"'>"+(MATE3)+"</td> </tr></table></span></td>";
	/*COLUMNA3*/ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(AV)+"</th></tr><tr> <td style='"+verde+"'>"+(AV1)+"</td> <td style='"+rojo+"'>"+(AV2)+"</td><td style='"+plomo+"'>"+(AV3)+"</td> </tr></table></span></td>";
	/*COLUMNA4*/ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(MATE)+"</th></tr><tr> <td style='"+verde+"'>"+(MATE1)+"</td> <td style='"+rojo+"'>"+(MATE2)+"</td><td style='"+plomo+"'>"+(MATE3)+"</td> </tr></table></span></td>";
	/*COLUMNA5*/ body+="<td style=' BACKGROUND-COLOR: aqua;'><span><table style=' border: 0;' ><tr><th colspan='3'  style='"+arriba+" BACKGROUND-COLOR: aqua;' >"+financial(TOTAL)+"</th></tr><tr> <td style='"+verde+"'>"+(TOTAL1)+"</td> <td style='"+rojo+"'>"+(TOTAL2)+"</td><td style='"+plomo+"'>"+(TOTAL3)+"</td> </tr></table></span></td>";



				 body+="</tr>";
				 total=0;
				 
			   }); 
	
	
				} 

	console.log(promedio);
pie="";


if (linea==36) {
	
pie+=" <th><td></td><td></td><td>PROMEDIO GENERAL</td><td></td>"+
"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL1/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL2/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL3/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL4/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL5/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+			  
"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL6/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL7/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL8/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL9/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL10/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL11/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL12/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL13/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>";

}


if (linea==1 || linea==33) {
	
	pie+=" <th><td></td><td></td><td>PROMEDIO GENERAL</td><td></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL1/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL2/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL3/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL4/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL5/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+			  
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL6/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL7/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL8/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL9/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL10/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL11/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL12/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL13/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>";



	}
	
if (linea==37) {
	
		pie+=" <th><td></td><td></td><td>PROMEDIO GENERAL</td><td></td>"+
		"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL1/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
		"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL2/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
		"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL3/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
		"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL4/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
		"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL5/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+			  
		"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL6/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
		"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL7/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
		"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL8/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
		"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL9/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
		"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL10/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
		"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL11/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
		"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL12/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>";

}
		
if (linea==31) {
	
	pie+=" <th><td></td><td></td><td>PROMEDIO GENERAL</td><td></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL1/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL2/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL3/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL4/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL5/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL6/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL7/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL8/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL9/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL10/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL11/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL12/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL13/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL14/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL15/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL16/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL17/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL18/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL19/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL20/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL21/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL22/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>"+
	"<td><span><table style=' border: 0;' ><tr><th colspan='3'>"+financial(COL23/promedio)+"</th></tr><tr> <td ></td> <td ></td><td ></td> </tr></table></span></td>";




}

		


		  $("#cabeza").html(head);
		  $("#cuerpo").html(body);
		  $("#pie").html(pie);


			  $("#tblMerito").show(10);
			  $("#cuerpoload").hide(10);
					
				} else {
					viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
				}
			},
		});
	}
	   






function financial(x) {
	return Number.parseFloat(x).toFixed(2);
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
