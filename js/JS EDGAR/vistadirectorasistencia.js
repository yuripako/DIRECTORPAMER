$(document).ready(function () {


        $("#datepicker").datepicker({
            closeText: 'Cerrar',
            prevText: '<Ant',
            nextText: 'Sig>',
            currentText: 'Hoy',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
            weekHeader: 'Sm',
            dateFormat: 'dd-mm-yy',
            beforeShowDay: function (day) { 
                var day = day.getDay(); 
                if (day == 1 || day ==3 || day ==4 || day ==5 || day ==6 || day ==0) { 
                  return [false, "somecssclass"] 
                } else { 
                  return [true, "someothercssclass"] 
                } 
              } 
    
        });
  
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





function centinela() {
    $("#tblMerito").hide(10);
	$("#cuerpoload").show(10);
    var codciclo= $("#loadciclo").val();
    var codlinea= $("#lineal").val();
    var fecha= $("#datepicker").val();
    var fechaini = fecha.split("-");
    var fechacalendar = fechaini[2]+"-"+fechaini[1]+"-"+fechaini[0]
   // alert(fechacalendar);

    var datosOK = "";
    var strUrl = "getdatos/63";
    $.ajax({
        type: "post",
        url: strUrl,
        data:{
            codciclo:codciclo,
            codlinea:codlinea,
            fechacalendar:fechacalendar
        },
        dataType: "html",
        success: function (response) {
            data = segdeNegocios(response);
            datosOK = data.message.toUpperCase();
     
            if (datosOK == "OK") {
                var datos = data.data;
                var head = "";
                var body = "";
              // console.log(datos);
        
        head+="<th ><span><table  style='BORDER: 0PX;'><tr><th></th></tr> <tr><td style='text-align: center;background-color: aliceblue;'>Ciclo</td></tr></table></span></th>";
        head+="<th><span><table  style='BORDER: 0PX;'><tr><th></th></tr> <tr><td style='background-color: aliceblue;'>Línea</td></tr></table></span></th>";
        head+="<th><span><table  style='BORDER: 0PX;'><tr><th></th></tr> <tr><td style='background-color: aliceblue;'>Salón</td></tr></table></span></th>";
        head+="<th><span><table  style='BORDER: 0PX;'><tr><th></th></tr> <tr><td style='background-color: aliceblue;'>Tutor</td></tr></table></span></th>";
        head+="<th><span><table  style='BORDER: 0PX;'><tr><th></th></tr> <tr><td style='background-color: aliceblue;'>#Alumnos</td></tr></table></span></th>";
        head+="<th><span><table  style='BORDER: 0PX;'><tr><th colspan='3'  style='text-align: center;background-color: antiquewhite;' >LUNES</th></tr><tr> <tr><td>#Cursos</td><td>Asistencia</td><td>Tardanza</td></tr></table></span></th>";
        head+="<th><span><table  style='BORDER: 0PX;'><tr><th colspan='3'  style='text-align: center;background-color: antiquewhite;' >MARTES</th></tr><tr> <tr><td>#Cursos</td><td>Asistencia</td><td>Tardanza</td></tr></table></span></th>";
        head+="<th><span><table  style='BORDER: 0PX;'><tr><th colspan='3'  style='text-align: center;background-color: antiquewhite;'>MIERCOLES</th></tr> <tr><td>#Cursos</td><td>Asistencia</td><td>Tardanza</td></tr></table></span></th>";
        head+="<th><span><table  style='BORDER: 0PX;'><tr><th colspan='3'  style='text-align: center;background-color: antiquewhite;'>JUEVES</th></tr> <tr><td>#Cursos</td><td>Asistencia</td><td>Tardanza</td></tr></table></span></th>";
        head+="<th><span><table  style='BORDER: 0PX;'><tr><th colspan='3'  style='text-align: center;background-color: antiquewhite;'>VIERNES</th></tr></tr> <td>#Cursos</td><td>Asistencia</td><td>Tardanza</td></tr></table></span></th>";
        head+="<th><span><table  style='BORDER: 0PX;'><tr><th colspan='3'  style='text-align: center;background-color: antiquewhite;'>SABADO</th></tr></tr> <td>#Cursos</td><td>Asistencia</td><td>Tardanza</td></tr></table></span></th>";


        $.each(datos, function(index, value) { 
          body+="<tr>";
          body+="<th><span><table  style='BORDER: 0PX;'> <tr><td>"+datos[index][0]+"</td></tr></table></span></th>";
          body+="<th><span><table  style='BORDER: 0PX;'> <tr><td>"+datos[index][1]+"</td></tr></table></span></th>";
          body+="<th><span><table  style='BORDER: 0PX;'> <tr><td>"+datos[index][2]+"</td></tr></table></span></th>";
          body+="<th><span><table  style='BORDER: 0PX;'> <tr><td>"+datos[index][3]+"</td></tr></table></span></th>";
          body+="<th><span><table  style='BORDER: 0PX;'> <tr><td>"+datos[index][4]+"</td></tr></table></span></th>";
          
      	if (datos[index][5]==null || datos[index][5]=="") {
            datos[index][5]="33|0|0";
        }
        if (datos[index][6]==null || datos[index][6]=="") {
            datos[index][6]="33|0|0";
        }
        if (datos[index][7]==null || datos[index][7]=="") {
            datos[index][7]="33|0|0";
        }
        if (datos[index][8]==null || datos[index][8]=="") {
            datos[index][8]="33|0|0";
        }
          var A = datos[index][5]; 
          var A_ARRAY = A.split("|");
          var martes1 = parseFloat( A_ARRAY[1]/ A_ARRAY[0] );
          var martes2 = parseFloat( A_ARRAY[2]/ A_ARRAY[0] );

          var B = datos[index][6]; 
          var B_ARRAY = B.split("|");
          var miercoles1 = parseFloat( B_ARRAY[1]/ B_ARRAY[0] );
          var miercoles2 = parseFloat( B_ARRAY[2]/ B_ARRAY[0] );

          var C = datos[index][7]; 
          var C_ARRAY = C.split("|");
          var jueves1 = parseFloat( C_ARRAY[1]/ C_ARRAY[0] );
          var jueves2 = parseFloat( C_ARRAY[2]/ C_ARRAY[0] );

          var D = datos[index][8]; 
          var D_ARRAY = D.split("|");
          var Viernes1 = parseFloat( D_ARRAY[1]/ D_ARRAY[0] );
          var Viernes2 = parseFloat( D_ARRAY[2]/ D_ARRAY[0] );

          body+="<th><span><table  style='BORDER: 0PX;'><tr><td></td><td></td><td></td></tr></table></span></th>";

          if (A_ARRAY[0]=='33') {
            body+="<th><span><table  style='BORDER: 0PX;'><tr><td>0</td><td>"+financial(martes2)+"</td><td>"+financial(martes1)+"</td></tr></table></span></th>";
          }else{
            body+="<th><span><table  style='BORDER: 0PX;'><tr><td>"+A_ARRAY[0]+"</td><td>"+financial(martes2)+"</td><td>"+financial(martes1)+"</td></tr></table></span></th>";
          }

          if (B_ARRAY[0]=='33') {
            body+="<th><span><table  style='BORDER: 0PX;'><tr><td>0</td><td>"+financial(miercoles2)+"</td><td>"+financial(miercoles1)+"</td></tr></table></span></th>";
          }else{
            body+="<th><span><table  style='BORDER: 0PX;'><tr><td>"+B_ARRAY[0]+"</td><td>"+financial(miercoles2)+"</td><td>"+financial(miercoles1)+"</td></tr></table></span></th>";
          }

          if (C_ARRAY[0]=='33') {
            body+="<th><span><table  style='BORDER: 0PX;'><tr><td>0</td><td>"+financial(jueves2)+"</td><td>"+financial(jueves2)+"</td></tr></table></span></th>";
          }else{
            body+="<th><span><table  style='BORDER: 0PX;'><tr><td>"+C_ARRAY[0]+"</td><td>"+financial(jueves2)+"</td><td>"+financial(jueves1)+"</td></tr></table></span></th>";
          }
          if (D_ARRAY[0]=='33') {
            body+="<th><span><table  style='BORDER: 0PX;'><tr><td>0</td><td>"+financial(Viernes2)+"</td><td>"+financial(Viernes1)+"</td></tr></table></span></th>";
          }else{
            body+="<th><span><table  style='BORDER: 0PX;'><tr><td>"+D_ARRAY[0]+"</td><td>"+financial(Viernes2)+"</td><td>"+financial(Viernes1)+"</td></tr></table></span></th>";
          }
          body+="<th><span><table  style='BORDER: 0PX;'><tr><td></td><td></td><td></td></tr></table></span></th>";

          body+="<td></td>";
          body+="<tr>";

        });

                $("#cabeza").html(head);
                $("#cuerpo").html(body);
                $("#tblMerito").show(10);
                $("#cuerpoload").hide(10);
            } else {
                viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
            }
        }
    
    
    })

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



function financial(x) {
	return Number.parseFloat(x).toFixed(2);
}
