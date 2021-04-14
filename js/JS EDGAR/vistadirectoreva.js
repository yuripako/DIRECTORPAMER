$(document).ready(function () {
    combolinea();
    combociclo();
	mensajecaja();
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
	var strUrl = "getdatos/57";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			codsalon: codsalon,
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
								'<div class="cuadrado activado" onclick=\'metododetalle("' +
								datos[index][0] +
								'");\' );">' +
								'<div class="semana">' +
								'	<div class="texto">EVA</div>' +
								'	<div class="numero">' +
								control +
								"</div>" +
								"	</div>" +
								"</div>" +
								"	</div>";
						} else {
							html3 +=
								'  <div class="item" padrig="true" >' +
								'<div class="cuadrado " onclick=\'metododetalle("' +
								datos[index][0] +
								'");\' );">' +
								'<div class="semana">' +
								'	<div class="texto">EVA</div>' +
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
							'<div class="cuadrado " onclick=\'metododetalle("' +
							datos[index][0] +
							'");\' );">' +
							'<div class="semana">' +
							'	<div class="texto">EVA</div>' +
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

function metododetalle(codexamen) {
	$("#tblMerito").hide(10);
	$("#cuerpoload").show(10);
	var datosOK = "";
	var strUrl = "getdatos/58";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			codexamen: codexamen
		},
		dataType: "html",
		success: function (response) {
			data = segdeNegocios(response);
			datosOK = data.message.toUpperCase();

			if (datosOK == "OK") {
				var datos = data.data;
				var html4 = "";
				var longitud = datos.length;
				html4 += "<th>ID</th>";
				html4 += "<th>Código</th>";
				html4 += "<th style='text-align: left;'>Nombre del alumno</th>";
				html4 += "<th>Salón</th>";
				$.each(datos, function (index, value) {
					html4 += "<th>" + datos[index][0] + "</th>";
				});
				html4 += "<th style='background-color: #aafbff;'>TOTAL</th>";
				$("#cabeza").html(html4);
				bodydata(codexamen, longitud);
				//   custoncolumnas(codexamen);
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		},
	});
}


function bodydata(codexamen, longitud) {
	// FUNCION PARA TRABAJARLO
	var codsalon = $("#codsaloni").val();
	var tipo = $("#tipo").val();
	//alert(tipo);
	var long = longitud;
	var datosOK = "";
	var strUrl = "getdatos/59";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			codexamen: codexamen,
			tipo: tipo,
			codsalon: codsalon,
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
				var cont = 0;
				var contador = 1;
				var totalarriba = 0;
				var totalbuenas = 0;
				var totalmalas = 0;
				var totalblancos = 0;
				/// IMPRESION DE EJEMPLO
				var identiti=1;
				$.each(datos, function (index, value) {
					var cadena = datos[index][6];
					var porciones = cadena.split("-");
					totalarriba += parseFloat(datos[index][5]);
					totalbuenas += parseInt(porciones[0]);
					totalmalas += parseInt(porciones[1]);
					totalblancos += parseInt(porciones[2]);

					//console.log(porciones[0]);
					if (contador == 1) {
						html6 += "<tr>";
						html6 += "<td>" + identiti + "</td>";
						html6 += "<td>" + datos[index][0] + "</td>";
						html6 += "<td style='text-align: left;'>" + datos[index][1] + "</td>";
						html6 += "<td>" + datos[index][2] + "</td>";
					}
				
					contador++;
					html6 +=
						"<td><span style='font-size: 16px;'>" +
						datos[index][5] +
						"</span><br><span  style='font-weight: bold;margin-right: 2px;color: #24d483'>" +
						porciones[0] +
						"</span>  <span style='font-weight: bold;margin-right: 2px;color: RED;'>" +
						porciones[1] +
						"</span> <span  style='font-weight: bold;margin-right: 2px;color: #ccc;'>" +
						porciones[2] +
						"</span></td>";
					if (contador == long + 1) {
						contador = 1;
						identiti++;
						// html6+="<td>"+totalarriba+"</td></tr>";
						html6 +=
							"<td style='background-color: #aafbff;'><span style='font-size: 16px;'>" +
							financial(totalarriba) +
							"</span><br><span  style='font-weight: bold;margin-right: 2px;color: #24d483'>" +
							totalbuenas +
							"</span>  <span style='font-weight: bold;margin-right: 2px;color: RED;'>" +
							totalmalas +
							"</span> <span  style='font-weight: bold;margin-right: 2px;color: #ccc;'>" +
							totalblancos +
							"</span></td>";
						html6 += "</tr>";
						totalarriba = 0;
						totalbuenas = 0;
						totalmalas = 0;
						totalblancos = 0;
					}
				});
				$("#cuerpo").html(html6);
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
