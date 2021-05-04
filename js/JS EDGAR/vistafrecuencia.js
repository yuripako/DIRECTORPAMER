$(document).ready(function () {


    document.getElementById("lineal").disabled = true;
    document.getElementById("datepicker").disabled = true;
    document.getElementById("datepicker2").disabled = true;
    document.getElementById("consultar").disabled = true;

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
        dateFormat: 'dd-mm-yy'
    });

    $("#datepicker2").datepicker({
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
        dateFormat: 'dd-mm-yy'
    });


combociclo();
$("#buscar").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#cuerpo tr  ").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});
});


function habilitar() {
    document.getElementById("datepicker").disabled = false;
    document.getElementById("datepicker2").disabled = false;
    document.getElementById("consultar").disabled = false;
}


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
    document.getElementById("lineal").disabled = false;
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
               html11 += "<option value='msj'>Seleccione</option>";
              
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
var fechacalendar1 = fechaini[2]+"-"+fechaini[1]+"-"+fechaini[0]

var fecha2= $("#datepicker2").val();
var fechafini2 = fecha2.split("-");
var fechacalendar2 = fechafini2[2]+"-"+fechafini2[1]+"-"+fechafini2[0]

//  alert(fechacalendar1+" "+fechacalendar2);

var mes = $("#numero").val();

meses=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
//alert(meses[mes]);


var datosOK = "";
var strUrl = "getdatos/72";
$.ajax({
    type: "post",
    url: strUrl,
    data:{
        codciclo:codciclo,
        codlinea:codlinea,
        fechacalendar1:fechacalendar1,
        fechacalendar2:fechacalendar2     
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
    head+="<th  style='background-color: azure;'>FECHA</th>";
    head+="<th  style='background-color: azure;'>ACTIVO</th>";
    head+="<th  style='text-align: left;background-color: azure;'>PENDIENTE PAGO</th>";
    head+="<th  style='text-align: left;background-color: azure;'>RETIRADOS</th>";
    head+="<th  style='text-align: left;background-color: azure;'>ELIM/ANUL</th>";
    head+="<th  style='text-align: left;background-color: azure;'>TOTAL</th>";
     
    $.each(datos, function(index, value) { 

    if (datos[index][3]=="") {
        datos[index][3]=0;
    }
        
    body+="<tr >";
    body+="<td style='text-align: center;'>"+(index+1)+"</td>";
    body+="<td >"+datos[index][0]+"</td>";
    body+="<td >"+datos[index][1]+"</td>";
    body+="<td >"+datos[index][2]+"</td>";
    body+="<td ></td>";
    body+="<td ></td>";
    body+="<td >"+(parseInt(datos[index][1])+parseInt(datos[index][2]))+"</td>";
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
