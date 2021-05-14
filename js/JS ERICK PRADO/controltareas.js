$(document).ready(function () {
	conbosalon();
	mensajecaja();
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

				$("#ciclo").html(html11);
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		},
	});
}

function tecargolinea() {
	var ciclo = $("#ciclo").val();
	cargandolinea(ciclo);
}

function cargandolinea(ciclo) {
	//	alert(ciclo);
	var datosOK = "";
	var strUrl = "getdatos/71";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			ciclo: ciclo,
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
				$.each(datos, function (index, value) {
					html11 +=
						"<option value='" +
						datos[index][0] +
						" '>" +
						datos[index][1] +
						"</option>";
				});

				$("#lineadet").html(html11);
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		},
	});
}

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
	alert("Ahora elige un tipo de alumno.");
	var cadena = $("#lineas").val();
	var porciones = cadena.split("->");
	var cadena22 = porciones[1].slice(0, 4); //separo fecha
	var cadena33 = porciones[1].slice(4, 5); // separo ciclo
	$("#cicloo").html(cadena22 + " - " + cadena33);
	$("#lineaa").html(porciones[2]);
	metodoarea(porciones[3]);
	//alert(porciones[0]);
	metodoslider(porciones[0], porciones[3]);
	$("#codsalones").val(porciones[0]);
	$("#codlinea").val(porciones[3]);
}

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

function metodoslider() {
	var ciclo = $("#ciclo").val();
	var linea = $("#lineadet").val();

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
								'<div class="cuadrado activado" onclick=\'metododetalle("' +
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
								'<div class="cuadrado " onclick=\'metododetalle("' +
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
							'<div class="cuadrado " onclick=\'metododetalle("' +
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

function metododetalle(semana) {
	$("#tblMerito").hide(10);
	$("#cuerpoload").show(10);
	var ciclo = $("#ciclo").val();
	var linea = $("#lineadet").val();
	//$("#codexamens").val(codexamen);
	//	$("#tblMerito").hide(10);
	//$("#cuerpoload").show(10);
	var datosOK = "";
	var strUrl = "getdatos/2";
	$.ajax({
		type: "post",
		url: strUrl,
		data: {
			ciclo: ciclo,
			linea: linea,
			semana: semana,
		},
		dataType: "html",
		success: function (response) {
			data = segdeNegocios(response);
			datosOK = data.message.toUpperCase();

			var col1 =
				"background-color: #24d483;; padding: 1px;color: #24d483;;border-radius: 50%; margin-right: 11px;";
			var col2 =
				"background-color: RED; padding: 1px;color: RED;border-radius: 50%; margin-right: 11px;";
			var col3 =
				"background-color: #ccc; padding: 1px;color: #ccc;border-radius: 50%; margin-right: 11px;";
			if (datosOK == "OK") {
				var datos = data.data;
				var html4 = "";
				var longitud = datos.length;

				if (datos == "") {
					alert("No se encontraron datos");
					window.location.reload();
				}

				// console.log(datos);

				

				var col = "";

				var head = "";

				var det = "";

				// Cabecera cursos
				let cursos = [];
				let cursoarray = [];

				cursos = datos[0][4];
				let substrings2 = cursos.split("|");
				cursoarray = substrings2;



				head += "z<th>TUTOR</th>";
				head += "<th>SALÓN</th>";
				for (let conta = 0; conta < cursoarray.length; conta++) {
					head +=
						"<th style='text-align: center;'>" + cursoarray[conta] + "</th>";
				}

				$.each(datos, function (index, value) {

					
					

					// Detalle notas
					let notas = [];
					let notasarray = [];

					notas = datos[index][5];
					let substrings3 = notas.split("|");
					notasarray = substrings3;
					
					col += "<tr>";
					col += "<td>" + datos[index][1] + "</td>";
					col += "<td>" + datos[index][3] + "</td>";

					for (let cont1 = 0; cont1 < notasarray.length ; cont1++) {

						let correcta = "";
						let incorrecta = "";
						let blanca = "";

						let substrings4 = notasarray[cont1].split("-");

						correcta = substrings4[0];
						incorrecta = substrings4[1];
						blanca = substrings4[2];

						col +=
						"<td  style='text-align: center;'><span style='color:#24d483;'>" +
						parseInt(financial(correcta/15)) +
							"</span> &nbsp; &nbsp; &nbsp; &nbsp;	<span style='color:red;'>" +
							parseInt(financial(incorrecta/15)) +
							"</span> &nbsp; &nbsp; &nbsp; &nbsp; <span style='color:#777;'>" +
							parseInt(financial(blanca/15)) +
							"</span></td>";
					}
				

					col += "</tr>";
				});

				$("#cabezadt").html(head);
				$("#cuerpo").html(col);
				$("#tblMerito").show(10);
				$("#cuerpoload").hide(10);
			} else {
				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
			}
		},
	});
}

// function bodydata(codsemana, longitud,curso) {
// 	console.log(curso);
// 	// FUNCION PARA TRABAJARLO
// 	var codsalon = $("#codsalones").val();
// 	var tipo = $("#tipo").val();
// 	var codlinea= $("#codlinea").val();
// 	//alert(tipo);
// 	var long = longitud;
// 	var datosOK = "";
// 	var strUrl = "getdatos/14";
// 	$.ajax({
// 		type: "post",
// 		url: strUrl,
// 		data: {
// 			codlinea: codlinea,
// 			codsalon: codsalon,
// 			codsemana: codsemana,
// 			tipo: tipo
// 		},
// 		dataType: "html",
// 		success: function (response) {
// 			data = segdeNegocios(response);
// 			datosOK = data.message.toUpperCase();
// 			if (datosOK == "OK") {
// 				var datos = data.data;
// 				//console.log(datos);
// 				var html6 = "";
// 				if (datos == "") {
// 					alert("NO SE ENCONTRO RESULTADOS.");
// 				}

// 				/// IMPRESION DE EJEMPLO  curso
// 				var html22="";
// 				let arr2 = [];
// 				let notas = [];
// 				$.each(datos, function (index, value) {

// 				    var ciclo=$("#cicloo").html();
// 					var linea=$("#lineaa").html();
// 					var tipo=$("#tipo").val();

//                     var url="codigo="+datos[index][0]+"&alumno="+datos[index][1]+"&ciclo="+ciclo+"&linea="+linea+"&tipo="+tipo;

// 					html22+="<tr>";
// 					html22+="<td>"+datos[index][0]+"</td>";
// 					html22+="<td><a style='color:#005cfe' href='vistacontroldetalle?"+url+"'>"+datos[index][1]+"</a></td>";

//                     notas[index] = datos[index][0]

// 					let str = datos[index][3];
// 					let substrings = str.split("|");
//                     arr2=substrings;
// 					//console.log(arr2);

// 					for (let index2 = 0; index2 < curso.length; index2++) {

// 						if(typeof arr2[index2] === 'undefined'){
// 							html22+="<td>0 0 0</td>";
// 						  } else {
// 							html22+="<td>"+arr2[index2]+"</td>";
// 						  }

// 					}

// 					html22+="<td style='background-color: aqua;'><span style='margin-right: 7px;'>"+datos[index][4]+"</span><span style='margin-right: 7px;'> "+datos[index][5]+"</span><span style='margin-right: 7px;'> "+datos[index][6]+"</span></td>";

// 				});

//                   $("#cuerpo").html(html22);
// 				$("#tblMerito").show(10);
// 				$("#cuerpoload").hide(10);
// 			} else {
// 				viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
// 			}
// 		},
// 	});
// }

function financial(x) {
	return Number.parseFloat(x).toFixed(2);
}

function metodoselectarea() {
	//alert("Ahora seleccione un Simulacro.");
}

function metodotipo() {
	alert("Ahora seleccione una semana.");
}

function mensajecaja() {
	var ht =
		'<tr ><td colspan="11" style="text-align: center;font-size: 16px;border: 1px solid #fff; ">Filtra en el combobox para ver la información.</td></tr>';
	$("#cuerpo").html(ht);
}
