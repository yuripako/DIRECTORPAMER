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


    metodoslider(parseInt(porciones[0]))

	//metodoslider(porciones[0],porciones[1],porciones[3]);
}





function metodoslider(codsalon) {
	var datosOK = "";
	var strUrl = "getdatos/61";
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
	var codsalon = $("#codsaloni").val();
	var tipo = $("#tipo").val();
	var codexamen = codexamen;

	var datosOK = "";
	var strUrl = "getdatos/62";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			codsalon: codsalon,
			codexamen: codexamen,
			tipo: tipo
			//linea: linea,
		},
		dataType: "html",
		success: function (response) {
			data = segdeNegocios(response);
			datosOK = data.message.toUpperCase();

			if (datosOK == "OK") {
				var datos = data.data;
				var cuerpodet = "";
				var verde = "";
				var contador = 0;
				if (datos == "") {
					alert("NO SE EXONTRÓ DATOS.");
				}
				var c1 = 0;
				var a1 = 0;
				var a2 = 0;
				var a3 = 0;
				var a4 = 0;
				var a5 = 0;
				var total = 0;
				$.each(datos, function (index, value) {
					var notaa = parseInt(datos[index][2]);
					var notab = parseInt(datos[index][3]);
					var notac = parseInt(datos[index][4]);
					var notad = parseInt(datos[index][5]);
					var notae = parseInt(datos[index][6]);
					var notablanco = parseInt(datos[index][8]);

					if (notaa == 0) {
						a1 = 1;
					} else {
						a1 = 0;
					}
					if (notab == 0) {
						a2 = 1;
					} else {
						a2 = 0;
					}
					if (notac == 0) {
						a3 = 1;
					} else {
						a3 = 0;
					}
					if (notad == 0) {
						a4 = 1;
					} else {
						a4 = 0;
					}
					if (notae == 0) {
						a5 = 1;
					} else {
						a5 = 0;
					}

					total = a1 + a2 + a3 + a4 + a5;

					var totala = 0;
					var totalb = 0;
					var totalc = 0;
					var totald = 0;
					var totale = 0;
					var totalblanca = 0;

					var totalnota = notaa + notab + notac + notad + notae + notablanco;

					totala = parseFloat((notaa * 100) / totalnota);
					totalb = parseFloat((notab * 100) / totalnota);
					totalc = parseFloat((notac * 100) / totalnota);
					totald = parseFloat((notad * 100) / totalnota);
					totale = parseFloat((notae * 100) / totalnota);
					totalblanca = parseFloat((notablanco * 100) / totalnota);

					totalaa = parseInt((notaa * 100) / totalnota);
					totalbb = parseInt((notab * 100) / totalnota);
					totalcc = parseInt((notac * 100) / totalnota);
					totaldd = parseInt((notad * 100) / totalnota);
					totalee = parseInt((notae * 100) / totalnota);

					var max = 0;

					const arr = [
						parseInt(totala),
						parseInt(totalb),
						parseInt(totalc),
						parseInt(totald),
						parseInt(totale),
					];

					// function penul(array) {
					// const pen= array.splice(array.length-2,1);
					// return pen[0];
					// }

					// max=penul(arr);

					max = Math.max.apply(null, arr);
					// var pen=penul(arr);

					var color = "";
					var colora = "";
					var colorb = "";
					var colorc = "";
					var colord = "";
					var colore = "";

					switch (datos[index][7]) {
						case "A":
							colora = "color:#000";
							break;
						case "B":
							colorb = "color:#000";
							break;
						case "C":
							colorc = "color:#000";
							break;
						case "D":
							colord = "color:#000";
							break;
						case "E":
							colore = "color:#000";
							break;
						default:
							color = "color:#000";
					}

					cuerpodet += "<tr>";
					cuerpodet += "<td></td>";
					cuerpodet += "<td></td>";
					cuerpodet += "<td>" + datos[index][0] + "</td>";
					cuerpodet += "<td>" + datos[index][1] + "</td>";
					if (Number.isNaN(totala) == true) {
						cuerpodet += "<td >" + 0 + "%</td>";
					} else {
						if (max == totalaa) {
							colora = "color:#000;";
						//	var cuadro1="border: 1px solid #777;font-weight: bold;";
						}
						cuerpodet +=
							"<td ><span >" + financial(totala) + "%</span></td>";
					}
					if (Number.isNaN(totalb) == true) {
						cuerpodet += "<td >" + 0 + "%</td>";
					} else {
						if (max == totalbb) {
							colorb = "color:#000";
						//	var cuadro2="border: 1px solid #777;font-weight: bold;";
						}
						cuerpodet +=
							"<td ><span >" + financial(totalb) + "%</span></td>";
					}
					if (Number.isNaN(totalc) == true) {
						cuerpodet += "<td >" + 0 + "%</td>";
					} else {
						if (max == totalcc) {
							colorc = "color:#000";
						//	var cuadro3="border: 1px solid #777;font-weight: bold;";
						}
						cuerpodet +=
							"<td ><span >" + financial(totalc) + "%</span></td>";
					}
					if (Number.isNaN(totald) == true) {
						cuerpodet += "<td style='" + colord + "'>" + 0 + "%</td>";
					} else {
						if (max == totaldd) {
							colord = "color:#000";
						//	var cuadro4="border: 1px solid #777;font-weight: bold;";
						}
						cuerpodet +=
							"<td ><span >" + financial(totald) + "%</span></td>";
					}
					if (Number.isNaN(totale) == true) {
						cuerpodet += "<td >" + 0 + "%</td>";
					} else {
						if (max == totalee) {
							colore = "color:#000";
							//var cuadro5="border: 1px solid #777;font-weight: bold;";
						}
						cuerpodet +=
							"<td ><span >" + financial(totale) + "%</span></td>";
					}

					if (Number.isNaN(total) == true) {
						cuerpodet += "<td style='" + color + "'>" + 0 + "%</td>";
					} else {
						cuerpodet +=
							"<td style='" + color + "'>" + financial(totalblanca) + "%</td>";
					}

					cuerpodet += "</tr>";
					a1 = 0;
					a2 = 0;
					a3 = 0;
					a4 = 0;
					a5 = 0;
					total = 0;
				});

				$("#cuerpo").html(cuerpodet);
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
