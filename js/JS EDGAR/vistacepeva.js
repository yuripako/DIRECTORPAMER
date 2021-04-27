$(document).ready(function () {
	conbosalon();
	mensajecaja();
	$("#buscar").on("keyup", function () {
		var value = $(this).val().toLowerCase();
		$("#cuerpo tr  ").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		});
	});
});

function conbosalon() {
	var datosOK = "";
	var strUrl = "getdatos/1";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {},
		dataType: "html",
		success: function (response) {
			data = segdeNegocios(response);
			datosOK = data.message.toUpperCase();

			if (datosOK == "OK") {
				var datos = data.data;
				var html1 = "";
				html1 += "<option value='msj'>Seleccione</option>";
				$.each(datos, function (index, value) {
					html1 +=
						"<option value='" +
						datos[index][0] +
						"->" +
						datos[index][2] +
						"->" +
						datos[index][3] +
						"->" +
						datos[index][4] +
						"'>" +
						datos[index][1] +
						" - " +
						datos[index][0] +
						"</option>";
				});

				$("#lineas").html(html1);
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		},
	});
}

function metodosalon() {
	alert("Ahora seleccione un tipo de alumno.");
	var cadena = $("#lineas").val();
	var porciones = cadena.split("->");
	var cadena22 = porciones[1].slice(0, 4); //separo fecha
	var cadena33 = porciones[1].slice(4, 5); // separo ciclo
	$("#cicloo").html(cadena22 + " - " + cadena33);
	$("#lineaa").html(porciones[2]);
	//metodoarea(porciones[3]);
	//alert(porciones[0]);
	metodoslider(porciones[0]);
	$("#codsalones").val(porciones[0]);
}

/*
function metodoarea(linea) {
	var datosOK = "";
	var strUrl = "getdatos/2";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			linea: linea,
		},
		dataType: "html",
		success: function (response) {
			data = segdeNegocios(response);
			datosOK = data.message.toUpperCase();

			if (datosOK == "OK") {
				var datos = data.data;
				var html2 = "";
				html2 += "<option value='msj'>Seleccione</option>";
				$.each(datos, function (index, value) {
					html2 +=
						"<option value='" +
						datos[index][0] +
						"'>" +
						datos[index][1] +
						"</option>";
				});

				$("#areainfo").html(html2);
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		},
	});
}
*/
function metodoslider(codsalon) {
	var datosOK = "";
	var strUrl = "getdatos/9";
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
	var codsalon = $("#codsalones").val();
	var tipo = $("#tipo").val();
	var codexamen = codexamen;

	var datosOK = "";
	var strUrl = "getdatos/10";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			codsalon: codsalon,
			codexamen: codexamen,
			tipo: tipo,
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
					financial(parseFloat(totala)),
					financial(	parseFloat(totalb)),
					financial(parseFloat(totalc)),
					financial(parseFloat(totald)),
					financial(parseFloat(totale)),
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
							colora = "border: 1px solid #777;color:#00c67a;font-weight: bold";
							break;
						case "B":
							colorb = "border: 1px solid #777;color:#00c67a;font-weight: bold";
							break;
						case "C":
							colorc ="border: 1px solid #777;color:#00c67a;font-weight: bold";
							break;
						case "D":
							colord = "border: 1px solid #777;color:#00c67a;font-weight: bold";
							break;
						case "E":
							colore = "border: 1px solid #777;color:#00c67a;font-weight: bold";
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
						cuerpodet += "<td style='" + colora + "'>" + 0 + "%</td>";
					} else {
						if (max == totalaa) {
							//colora = "color:#005cfe";
						var	colora="border: 1px solid #777;color:#1123ca;font-weight: bold";
						}
						cuerpodet +=	"<td ><span style='" + colora + "'>" + financial(totala) + "%</span></td>";
					}
					if (Number.isNaN(totalb) == true) {
						cuerpodet += "<td style='" + colorb + "'>" + 0 + "%</td>";
					} else {
						if (max == totalbb) {
							var	colorb="border: 1px solid #777;color:#1123ca;font-weight: bold";
							
						}
						cuerpodet +="<td ><span style='" + colorb + "'>" + financial(totalb) + "%</span></td>";
					}
					if (Number.isNaN(totalc) == true) {
						cuerpodet += "<td style='" + colorc + "'>" + 0 + "%</td>";
					} else {
						if (max == totalcc) {
							var	colorc="border: 1px solid #777;color:#1123ca;font-weight: bold";
						}
						cuerpodet +="<td ><span style='" + colorc + "'>" + financial(totalc) + "%</span></td>";
					}
					if (Number.isNaN(totald) == true) {
						cuerpodet += "<td style='" + colord + "'>" + 0 + "%</td>";
					} else {
						if (max == totaldd) {
							var	colord="border: 1px solid #777;color:#1123ca;font-weight: bold";
						}
						cuerpodet +="<td ><span style='" + colord + "'>" + financial(totald) + "%</span></td>";
					}
					if (Number.isNaN(totale) == true) {
						cuerpodet += "<td style='" + colore + "'>" + 0 + "%</td>";
					} else {
						if (max == totalee) {
							var	colore="border: 1px solid #777;color:#1123ca;font-weight: bold";
						}
						cuerpodet +=
							"<td ><span style='" + colore + "'>" + financial(totale) + "%</span></td>";
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

function load(params) {}

/*
function metododetalle(codexamen) {
	$("#tblMerito").hide(10);
	$("#cuerpoload").show(10);
	var datosOK = "";
	var strUrl = "getdatos/4";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			codexamen: codexamen,
		},
		dataType: "html",
		success: function (response) {
			data = segdeNegocios(response);
			datosOK = data.message.toUpperCase();

			if (datosOK == "OK") {
				var datos = data.data;
				var html4 = "";
				var longitud = datos.length;
				html4 += "<th>Código</th>";
				html4 += "<th>Nombre del alumno</th>";
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
*/

/*
function bodydata(codexamen, longitud) {
	// FUNCION PARA TRABAJARLO
	var codsalon = $("#codsalones").val();
	var tipo = $("#tipo").val();
	//alert(tipo);
	var long = longitud;
	var datosOK = "";
	var strUrl = "getdatos/8";
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
						html6 += "<td>" + datos[index][0] + "</td>";
						html6 += "<td>" + datos[index][1] + "</td>";
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

*/
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
