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
		data: {},
		dataType: "html",
		success: function (response) {
			data = segdeNegocios(response);
			datosOK = data.message.toUpperCase();

			if (datosOK == "OK") {
				var datos = data.data;
				var html11 = "";
				// console.log(datos);
				html11 += "<option value='msj'>Seleccione</option>";
				$.each(datos, function (index, value) {
					html11 +=
						"<option value='" +
						datos[index][0] +
						" '>" +
						datos[index][0] +
						"</option>";
				});

				$("#loadciclo").html(html11);
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		},
	});
}

function loadtutores() {
	var codciclo = $("#loadciclo").val();
	var codlinea = $("#lineal").val();
	combotutores(codciclo, codlinea);
}

function combotutores(codciclo, codlinea) {
	var datosOK = "";
	var strUrl = "getdatos/54";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			codciclo: codciclo,
			codlinea: codlinea,
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
				$.each(datos, function (index, value) {
					html1 +=
						"<option value='" +
						datos[index][1] +
						" '>" +
						datos[index][2] +
						"</option>";
				});

				$("#tutores").html(html1);
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		},
	});
}

function loadsalones() {
	var salones = $("#tutores").val();

	combolinea(salones);
}

function combolinea(cosalones) {
	var datosOK = "";
	var strUrl = "getdatos/51";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			cosalones: cosalones,
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
				$.each(datos, function (index, value) {
					html1 +=
						"<option value='" +
						datos[index][0] +
						"->" +
						datos[index][4] +
						" '>" +
						datos[index][3] +
						" - " +
						datos[index][1] +
						"</option>";
				});

				$("#salones").html(html1);
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		},
	});
}

function metodosalon() {
	var cadena = $("#salones").val();
	var porciones = cadena.split("->");
	var codciclo = $("#loadciclo").val(); //CICLO

	$("#codsaloni").val(porciones[0]);
	$("#codlini").val(porciones[1]);

	metodoslider(parseInt(codciclo), parseInt(porciones[1]));
	//SALON  - LINEA -
	//metodoslider(porciones[0],porciones[1],porciones[3]);
}

function metodoslider(ciclo, linea) {
	var datosOK = "";
	var strUrl = "getdatos/1";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			ciclo: ciclo,
			linea: linea,
		},
		dataType: "html",
		success: function (response) {
			data = segdeNegocios(response);
			datosOK = data.message.toUpperCase();

			if (datosOK == "OK") {
				var datos = data.data;
				var html3 = "";
				let semana = [];
				let arr2 = [];

				//	console.log(datos[0][1]);

				let str = datos[0][1];
				let substrings = str.split("|");
				arr2 = substrings;
				//	console.log(arr2.length);

				for (let index = 0; index < arr2.length; index++) {
					if (index < 3) {
						if (index == 0) {
							html3 +=
								'  <div class="item" padrig="true">' +
								'<div class="cuadrado activado" onclick=\'metododetail("' +
								arr2[index] +
								'");\' );">' +
								'<div class="semana">' +
								'	<div class="texto">SEM</div>' +
								'	<div class="numero">' +
								(index + 1) +
								"</div>" +
								"	</div>" +
								"</div>" +
								"	</div>";
						} else {
							html3 +=
								'  <div class="item" padrig="true" >' +
								'<div class="cuadrado " onclick=\'metododetail("' +
								arr2[index] +
								'");\' );">' +
								'<div class="semana">' +
								'	<div class="texto">SEM</div>' +
								'	<div class="numero">' +
								(index + 1) +
								"</div>" +
								"	</div>" +
								"</div>" +
								"	</div>";
						}
					} else {
						html3 +=
							'  <div class="item" style="display: none;" >' +
							'<div class="cuadrado " onclick=\'metododetail("' +
							arr2[index] +
							'");\' );">' +
							'<div class="semana">' +
							'	<div class="texto">SEM</div>' +
							'	<div class="numero">' +
							(index + 1) +
							"</div>" +
							"	</div>" +
							"</div>" +
							"	</div>";
					}

					$("#simu").html(html3);
				}
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		},
	});
}

function metododetail(semana) {
	var ciclo = $("#loadciclo").val(); //CICLO
	var salon = $("#codsaloni").val(); //salon
	var linea = $("#codlini").val(); //linea

	var datosOK = "";
	var strUrl = "getdatos/3";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			ciclo: ciclo,
			salon: salon,
			linea: linea,
			semana: semana,
		},
		dataType: "html",
		success: function (response) {
			data = segdeNegocios(response);
			datosOK = data.message.toUpperCase();

			if (datosOK == "OK") {
				var datos = data.data;
				console.log(datos[0][1]);

				//=======COLORES======================

				var verde =
					'<span style="    margin-right: 10px;   padding-left: 5px;padding-right: 5px; color: #00c67a;border-radius: 50%; background-color: #00c67a;">V</span>';
				var amarillo =
					'<span style="    margin-right: 10px;   padding-left: 5px;padding-right: 5px; color: #f39c12;border-radius: 50%; background-color: #f39c12;">A</span>';
				var rojo =
					'<span style="    margin-right: 10px;   padding-left: 5px;padding-right: 5px; color: #e02;border-radius: 50%; background-color: #e02;">R</span>';
				var plomo =
					'<span style="    margin-right: 10px;   padding-left: 5px;padding-right: 5px; color: #999;border-radius: 50%; background-color: #999;">P</span>';
				var items = [verde, amarillo, amarillo, amarillo];
				var boda = "";
				var head = "";
				let arr2 = [];
				let lomgitud = [];
				head += "<td>CURSOS</td>";
				$.each(datos, function (index, value) {
					lomgitud[index] = datos[0][1];
				});

				var numero = datos[0][1];
				console.log(numero);

				for (let index = 0; index < numero; index++) {
					head += "<td> SEMANA " + (index + 1) + "</td>";
				}

				$.each(datos, function (index, value) {
					//console.log(cabe);

					boda += "<tr>";
					boda += "<td>" + datos[index][0] + "</td>";

					let str = datos[index][3];
					let substrings = str.split("|");
					arr2 = substrings;
					console.log(arr2);

					for (let index2 = 0; index2 < numero; index2++) {
						if (typeof arr2[index2] === "undefined") {
							boda +=
								"<td style=' CURSOR: POINTER;' data-toggle='tooltip'  title='0 0 0'>" +
								plomo +
								"</td>";
						} else {
							boda +=
								"<td style=' CURSOR: POINTER;'  data-toggle='tooltip' title='" +
								arr2[index2] +
								"'>" +
								random_item(items) +
								"</td>";
						}
					}

					boda +=
						"<td style='CURSOR: POINTER;' data-toggle='tooltip' title='TOTAL CORRECTA: " +
						datos[index][3] +
						" TOTAL INCORRECTA: " +
						datos[index][4] +
						" TOTAL BLANCA: " +
						datos[index][4] +
						" '>" +
						random_item(items) +
						"</td>";

					boda += "</tr>";
				});
				head += "<td>TOTAL</td>";
				$("#cuerpa").html(boda);
				$("#cabeza").html(head);
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		},
	});
}

//function metododetalle2(codexamen) {
function metododetalle(codexamen) {
	$("#tblMerito").hide(10);
	$("#cuerpoload").show(10);
	// FUNCION PARA TRABAJARLO
	//var codsalon = $("#codsalones").val();
	var tipo = $("#tipo").val();
	var codlinea = $("#lineal").val();
	var codciclo = $("#loadciclo").val();
	//alert(tipo);

	var datosOK = "";
	var strUrl = "getdatos/53";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			codexamen: codexamen,
			tipo: tipo,
			codlinea: codlinea,
			codciclo: codciclo,
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

				var linea = codlinea; //codlinea; //LO QUITAS

				var body = "";
				var total = 0;
				var totalSAN = 0;
				var matesam = 0;
				let merito = [];
				// SALONES
				$.each(datos, function (index, value) {
					//console.log(datos[index][0]);
					merito[index] = datos[index][2];
				});
				const unicos = merito.filter((valor, indice) => {
					return merito.indexOf(valor) === indice;
				});
				// FIN DE SALONES

				var head = "";
				//console.log(unicos);
				var s1 = 1;
				var s2 = 1;
				var s3 = 1;
				var s4 = 1;
				var s5 = 1;
				var s6 = 1;
				var s7 = 1;
				s8 = 1;

				var COLO1 = 0;
				var COLO2 = 0;
				var COLO3 = 0;
				var COLO4 = 0;
				var COLO5 = 0;
				var COLO6 = 0;
				var promedio = 0;
				if (linea == 36) {
					head +=
						" <th>ID</th><th>CÓDIGO</th><th>NOMBRE DEL ALUMNO</th><th>SALÓN</th><th>MS</th><th>APT</th><th>MAT</th><th>CIENC.</th><th>TOT.</th><th style='BACKGROUND-COLOR: aqua;text-align: center;'>EQUI.</th>";
					promedio = datos.length;
					$.each(datos, function (index, value) {
						COLO1 += parseFloat(datos[index][4]) + parseFloat(datos[index][9]);
						COLO2 +=
							parseFloat(datos[index][3]) +
							parseFloat(datos[index][5]) +
							parseFloat(datos[index][7]) +
							parseFloat(datos[index][10]);
						COLO3 += parseFloat(datos[index][6]) + parseFloat(datos[index][8]);
						COLO4 +=
							parseFloat(datos[index][3]) +
							parseFloat(datos[index][4]) +
							parseFloat(datos[index][5]) +
							parseFloat(datos[index][6]) +
							parseFloat(datos[index][7]) +
							parseFloat(datos[index][8]) +
							parseFloat(datos[index][9]) +
							parseFloat(datos[index][10]);
						COLO5 += parseFloat(datos[index][11]);

						total = financial(
							parseFloat(datos[index][3]) +
								parseFloat(datos[index][4]) +
								parseFloat(datos[index][5]) +
								parseFloat(datos[index][6]) +
								parseFloat(datos[index][7]) +
								parseFloat(datos[index][8]) +
								parseFloat(datos[index][9]) +
								parseFloat(datos[index][10])
						);
						body += "<tr>";
						body += "<td>" + (index + 1) + "</td>";
						body += "<td>" + datos[index][0] + "</td>";
						body += "<td>" + datos[index][1] + "</td>";
						body += "<td>" + datos[index][2] + "</td>";
						if (datos[index][2] == unicos[0]) {
							body += "<td>" + s1 + "</td>";
							s1++;
						} else if (datos[index][2] == unicos[1]) {
							body += "<td>" + s2 + "</td>";
							s2++;
						} else if (datos[index][2] == unicos[2]) {
							body += "<td>" + s3 + "</td>";
							s3++;
						} else if (datos[index][2] == unicos[3]) {
							body += "<td>" + s4 + "</td>";
							s4++;
						} else if (datos[index][2] == unicos[4]) {
							body += "<td>" + s5 + "</td>";
							s5++;
						} else if (datos[index][2] == unicos[5]) {
							body += "<td>" + s6 + "</td>";
							s6++;
						} else if (datos[index][2] == unicos[6]) {
							body += "<td>" + s7 + "</td>";
							s7++;
						} else {
							body += "<td>" + s8 + "</td>";
							s8++;
						}
						body +=
							"<td>" +
							financial(
								parseFloat(datos[index][4]) + parseFloat(datos[index][9])
							) +
							"</td>";
						body +=
							"<td>" +
							financial(
								parseFloat(datos[index][3]) +
									parseFloat(datos[index][5]) +
									parseFloat(datos[index][7]) +
									parseFloat(datos[index][10])
							) +
							"</td>";
						body +=
							"<td>" +
							financial(
								parseFloat(datos[index][6]) + parseFloat(datos[index][8])
							) +
							"</td>";
						body += "<td>" + total + "</td>";
						body +=
							"<td style='BACKGROUND-COLOR: aqua;text-align: center;'>" +
							datos[index][11] +
							"</td>";
						body += "</tr>";
						total = 0;
					});
				}

				if (linea == 37) {
					head +=
						" <th>ID</th><th>CÓDIGO</th><th>NOMBRE DEL ALUMNO</th><th>SALÓN</th><th>MS</th><th>APT</th><th>MAT</th><th>COM.</th><th style='BACKGROUND-COLOR: aqua;text-align: center;'>PROM.</th>";
					promedio = datos.length;
					$.each(datos, function (index, value) {
						COLO1 += parseFloat(datos[index][3]) + parseFloat(datos[index][4]);
						COLO2 +=
							parseFloat(datos[index][5]) +
							parseFloat(datos[index][6]) +
							parseFloat(datos[index][7]) +
							parseFloat(datos[index][8]);
						COLO3 += parseFloat(datos[index][9]) + parseFloat(datos[index][10]);
						COLO4 += parseFloat(datos[index][11]);

						total = financial(
							parseFloat(datos[index][3]) +
								parseFloat(datos[index][4]) +
								parseFloat(datos[index][5]) +
								parseFloat(datos[index][6]) +
								parseFloat(datos[index][7]) +
								parseFloat(datos[index][8]) +
								parseFloat(datos[index][9]) +
								parseFloat(datos[index][10])
						);
						body += "<tr>";
						body += "<td>" + (index + 1) + "</td>";
						body += "<td>" + datos[index][0] + "</td>";
						body += "<td>" + datos[index][1] + "</td>";
						body += "<td>" + datos[index][2] + "</td>";
						if (datos[index][2] == unicos[0]) {
							body += "<td>" + s1 + "</td>";
							s1++;
						} else if (datos[index][2] == unicos[1]) {
							body += "<td>" + s2 + "</td>";
							s2++;
						} else if (datos[index][2] == unicos[2]) {
							body += "<td>" + s3 + "</td>";
							s3++;
						} else if (datos[index][2] == unicos[3]) {
							body += "<td>" + s4 + "</td>";
							s4++;
						} else if (datos[index][2] == unicos[4]) {
							body += "<td>" + s5 + "</td>";
							s5++;
						} else if (datos[index][2] == unicos[5]) {
							body += "<td>" + s6 + "</td>";
							s6++;
						} else if (datos[index][2] == unicos[6]) {
							body += "<td>" + s7 + "</td>";
							s7++;
						} else {
							body += "<td>" + s8 + "</td>";
							s8++;
						}

						body +=
							"<td>" +
							financial(
								parseFloat(datos[index][3]) + parseFloat(datos[index][4])
							) +
							"</td>";
						body +=
							"<td>" +
							financial(
								parseFloat(datos[index][5]) +
									parseFloat(datos[index][6]) +
									parseFloat(datos[index][7]) +
									parseFloat(datos[index][8])
							) +
							"</td>";
						body +=
							"<td>" +
							financial(
								parseFloat(datos[index][9]) + parseFloat(datos[index][10])
							) +
							"</td>";
						body +=
							"<td style='background-color: aqua;    text-align: center;'>" +
							financial(parseFloat(datos[index][11])) +
							"</td>";

						body += "</tr>";
						total = 0;
					});
				}

				if (linea == 31) {
					head +=
						" <th>ID</th><th>CÓDIGO</th><th>NOMBRE DEL ALUMNO</th><th>SALÓN</th><th>MS</th><th>H.V.</th><th>H.M.</th><th>MAT.</th><th>CON.</th><th style='BACKGROUND-COLOR: aqua;text-align: center;'>TOT.</th>";

					promedio = datos.length;
					$.each(datos, function (index, value) {
						COLO1 += parseFloat(datos[index][3]);
						COLO2 += parseFloat(datos[index][4]);
						COLO3 +=
							parseFloat(datos[index][5]) +
							parseFloat(datos[index][6]) +
							parseFloat(datos[index][7]);
						COLO4 +=
							parseFloat(datos[index][8]) +
							parseFloat(datos[index][9]) +
							parseFloat(datos[index][10]) +
							parseFloat(datos[index][11]) +
							parseFloat(datos[index][12]) +
							parseFloat(datos[index][13]) +
							parseFloat(datos[index][14]) +
							parseFloat(datos[index][15]) +
							parseFloat(datos[index][16]) +
							parseFloat(datos[index][17]) +
							parseFloat(datos[index][18]) +
							parseFloat(datos[index][19]);
						COLO5 += parseFloat(datos[index][20]);

						totalSAN = financial(
							parseFloat(datos[index][8]) +
								parseFloat(datos[index][9]) +
								parseFloat(datos[index][10]) +
								parseFloat(datos[index][11]) +
								parseFloat(datos[index][12]) +
								parseFloat(datos[index][13]) +
								parseFloat(datos[index][14]) +
								parseFloat(datos[index][15]) +
								parseFloat(datos[index][16]) +
								parseFloat(datos[index][17]) +
								parseFloat(datos[index][18]) +
								parseFloat(datos[index][19])
						);

						matesam = financial(
							parseFloat(datos[index][5]) +
								parseFloat(datos[index][6]) +
								parseFloat(datos[index][7])
						);

						body += "<tr>";
						body += "<td>" + (index + 1) + "</td>";
						body += "<td>" + datos[index][0] + "</td>";
						body += "<td>" + datos[index][1] + "</td>";
						body += "<td>" + datos[index][2] + "</td>";
						if (datos[index][2] == unicos[0]) {
							body += "<td>" + s1 + "</td>";
							s1++;
						} else if (datos[index][2] == unicos[1]) {
							body += "<td>" + s2 + "</td>";
							s2++;
						} else if (datos[index][2] == unicos[2]) {
							body += "<td>" + s3 + "</td>";
							s3++;
						} else if (datos[index][2] == unicos[3]) {
							body += "<td>" + s4 + "</td>";
							s4++;
						} else if (datos[index][2] == unicos[4]) {
							body += "<td>" + s5 + "</td>";
							s5++;
						} else if (datos[index][2] == unicos[5]) {
							body += "<td>" + s6 + "</td>";
							s6++;
						} else if (datos[index][2] == unicos[6]) {
							body += "<td>" + s7 + "</td>";
							s7++;
						} else {
							body += "<td>" + s8 + "</td>";
							s8++;
						}
						body += "<td>" + financial(parseFloat(datos[index][3])) + "</td>";
						body += "<td>" + financial(parseFloat(datos[index][4])) + "</td>";
						body += "<td>" + matesam + "</td>";
						body += "<td>" + totalSAN + "</td>";
						body +=
							"<td style='BACKGROUND-COLOR: aqua;text-align: center;'>" +
							financial(parseFloat(datos[index][20])) +
							"</td>";
						body += "</tr>";
						totalSAN = 0;
						matesam = 0;
					});
				}
				if (linea == 1 || linea == 33) {
					head +=
						" <th>ID</th><th>CÓDIGO</th><th>NOMBRE DEL ALUMNO</th><th>SALÓN</th><th>MS</th><th>CON.</th><th>RED.</th><th>MAT.</th><th>A.V.</th><th>A.M.</th><th style='BACKGROUND-COLOR: aqua;text-align: center;'>PROM.</th>";

					promedio = datos.length;
					$.each(datos, function (index, value) {
						if (isNaN(parseFloat(datos[index][9]))) {
							datos[index][9] = 0;
						}

						COLO1 += parseFloat(datos[index][3]);
						COLO2 += parseFloat(datos[index][4]) + parseFloat(datos[index][5]);
						COLO3 +=
							parseFloat(datos[index][6]) +
							parseFloat(datos[index][7]) +
							parseFloat(datos[index][8]) +
							parseFloat(datos[index][9]);
						COLO4 +=
							(parseFloat(datos[index][3]) +
								parseFloat(datos[index][4]) +
								parseFloat(datos[index][5])) /
							2;

						COLO5 +=
							parseFloat(datos[index][6]) +
							parseFloat(datos[index][7]) +
							parseFloat(datos[index][8]) +
							parseFloat(datos[index][9]);
						COLO6 += parseFloat(datos[index][10]);

						total = financial(
							parseFloat(datos[index][3]) +
								parseFloat(datos[index][4]) +
								parseFloat(datos[index][5]) +
								parseFloat(datos[index][6]) +
								parseFloat(datos[index][7]) +
								parseFloat(datos[index][8]) +
								parseFloat(datos[index][9]) +
								parseFloat(datos[index][10])
						);
						body += "<tr>";
						body += "<td>" + (index + 1) + "</td>";
						body += "<td>" + datos[index][0] + "</td>";
						body += "<td>" + datos[index][1] + "</td>";
						body += "<td>" + datos[index][2] + "</td>";
						if (datos[index][2] == unicos[0]) {
							body += "<td>" + s1 + "</td>";
							s1++;
						} else if (datos[index][2] == unicos[1]) {
							body += "<td>" + s2 + "</td>";
							s2++;
						} else if (datos[index][2] == unicos[2]) {
							body += "<td>" + s3 + "</td>";
							s3++;
						} else if (datos[index][2] == unicos[3]) {
							body += "<td>" + s4 + "</td>";
							s4++;
						} else if (datos[index][2] == unicos[4]) {
							body += "<td>" + s5 + "</td>";
							s5++;
						} else if (datos[index][2] == unicos[5]) {
							body += "<td>" + s6 + "</td>";
							s6++;
						} else if (datos[index][2] == unicos[6]) {
							body += "<td>" + s7 + "</td>";
							s7++;
						} else {
							body += "<td>" + s8 + "</td>";
							s8++;
						}

						body += "<td>" + datos[index][3] + "</td>";
						body +=
							"<td>" +
							financial(
								parseFloat(datos[index][4]) + parseFloat(datos[index][5])
							) +
							"</td>";
						body +=
							"<td>" +
							financial(
								parseFloat(datos[index][6]) +
									parseFloat(datos[index][7]) +
									parseFloat(datos[index][8]) +
									parseFloat(datos[index][9])
							) +
							"</td>";
						body +=
							"<td>" +
							financial(
								(parseFloat(datos[index][3]) +
									parseFloat(datos[index][4]) +
									parseFloat(datos[index][5])) /
									2
							) +
							"</td>";
						body +=
							"<td>" +
							financial(
								parseFloat(datos[index][6]) +
									parseFloat(datos[index][7]) +
									parseFloat(datos[index][8]) +
									parseFloat(datos[index][9])
							) +
							"</td>";
						body +=
							"<td style='BACKGROUND-COLOR: aqua;text-align: center;'>" +
							datos[index][10] +
							"</td>";
						body += "</tr>";
						total = 0;
					});
				}
				var coloro = "BACKGROUND-COLOR: aqua;";

				if (linea == 1 || linea == 33) {
					body +=
						" <th style='" +
						coloro +
						"'></th><th style='" +
						coloro +
						"'></th><th style='" +
						coloro +
						"'>PROMEDIO GENERAL</th><th style='" +
						coloro +
						"'></th><th style='" +
						coloro +
						"'></th><th style='" +
						coloro +
						"'>" +
						financial(COLO1 / promedio) +
						"</th><th style='" +
						coloro +
						"'>" +
						financial(COLO2 / promedio) +
						"</th><th style='" +
						coloro +
						"'>" +
						financial(COLO3 / promedio) +
						"</th><th style='" +
						coloro +
						"'>" +
						financial(COLO4 / promedio) +
						"</th><th style='" +
						coloro +
						"'>" +
						financial(COLO5 / promedio) +
						"</th><th style='BACKGROUND-COLOR: #005cfe;color: #fff;text-align: center;'>" +
						financial(COLO6 / promedio) +
						"</th>";
				} else if (linea == 37) {
					body +=
						" <th style='" +
						coloro +
						"'></th><th style='" +
						coloro +
						"'></th><th style='" +
						coloro +
						"'>PROMEDIO GENERAL</th><th style='" +
						coloro +
						"'></th><th style='" +
						coloro +
						"'></th><th style='" +
						coloro +
						"'>" +
						financial(COLO1 / promedio) +
						"</th><th style='" +
						coloro +
						"'>" +
						financial(COLO2 / promedio) +
						"</th><th style='" +
						coloro +
						"'>" +
						financial(COLO3 / promedio) +
						"</th><th style='BACKGROUND-COLOR: #005cfe;color: #fff;text-align: center;'>" +
						financial(COLO4 / promedio) +
						"</th>";
				} else {
					body +=
						" <th style='" +
						coloro +
						"'></th><th style='" +
						coloro +
						"'></th><th style='" +
						coloro +
						"'>PROMEDIO GENERAL</th><th style='" +
						coloro +
						"'></th><th style='" +
						coloro +
						"'></th><th style='" +
						coloro +
						"'>" +
						financial(COLO1 / promedio) +
						"</th><th style='" +
						coloro +
						"'>" +
						financial(COLO2 / promedio) +
						"</th><th style='" +
						coloro +
						"'>" +
						financial(COLO3 / promedio) +
						"</th><th style='" +
						coloro +
						"'>" +
						financial(COLO4 / promedio) +
						"</th><th style='BACKGROUND-COLOR: #005cfe;color: #fff;text-align: center;'>" +
						financial(COLO5 / promedio) +
						"</th>";
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
	// alert("Ahora seleccione un Simulacro.");
	metododetail(salon);
}

function mensajecaja() {
	var ht =
		'<tr ><td colspan="11" style="text-align: center;font-size: 16px;border: 1px solid #fff; ">Filtra en el combobox para ver la información.</td></tr>';
	$("#cuerpo").html(ht);
}
function financial(x) {
	return Number.parseFloat(x).toFixed(2);
}

function random_item(items) {
	return items[Math.floor(Math.random() * items.length)];
}

function getMaxOfArray(numArray) {
	return Math.max.apply(null, numArray);
}
