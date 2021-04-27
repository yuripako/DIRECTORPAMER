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


function centinela() {

$("#tblMerito").hide(10);
$("#cuerpoload").show(10);

var codciclo= $("#loadciclo").val();
var codlinea= $("#lineal").val();

var datosOK = "";
var strUrl = "getdatos/67";
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
            var head = "";
            var body = "";
          // console.log(datos);

           if (datos=="") {
            Swal.fire({
                icon: 'warning',
               // title: 'Oops...',
                text: 'No se encontraron resultados!',
                //footer: '<a href>Why do I have this issue?</a>'
              })
           }

    head+="<th  style='text-align: center;background-color: azure;'>ID</th>";
    head+="<th  style='text-align: left;background-color: azure;'>CICLO</th>";
    head+="<th  style='text-align: left;background-color: azure;'>LINEA</th>";
    head+="<th  style='text-align: left;background-color: azure;'>TUTOR</th>";
    head+="<th  style='text-align: left;background-color: azure;'>SALÓN</th>";
    head+="<th  style='text-align: left;background-color: azure;'>N° ALUMNOS</th>";
    head+="<th  style='text-align: left;background-color: azure;'>N° DE ALUMNOS SELECCIONADOS</th>";
    head+="<th  style='text-align: left;background-color: azure;'>META DE INGRESANTES</th>";
    head+="<th  style='text-align: left;background-color: azure;'>REAL</th>";
    $.each(datos, function(index, value) { 
    if (datos[index][6]=="") {
        datos[index][6]=0;
    }
    if (datos[index][8]=="") {
        datos[index][8]=0;
    }
    body+="<tr >";
    body+="<td style='text-align: center;    padding: 10px;'>"+(index+1)+"</td>";
    body+="<td style='text-align: left;    padding: 10px;'>"+datos[index][1]+"</td>";
    body+="<td style='text-align: left;    padding: 10px;'>"+datos[index][2]+"</td>";
    body+="<td style='text-align: left;    padding: 10px;'>"+datos[index][3]+"</td>";
    body+="<td style='text-align: left;    padding: 10px;'>"+datos[index][4]+"</td>";
    body+="<td style='text-align: left;    padding: 10px;'>"+datos[index][5]+"</td>";
    body+="<td style='text-align: left;    padding: 10px;'>"+datos[index][6]+"</td>";

    body+="<td style='text-align: left;    padding: 10px;'>"+datos[index][8]+"</td>";
    body+="<td style='text-align: left;    padding: 10px;'>"+datos[index][7]+"</td>";
    body+="</tr>";  
         
       console.log(datos);

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
