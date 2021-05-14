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
  




function detalle() {

// $("#tblMerito").hide(10);
// $("#cuerpoload").show(10);

var codciclo= $("#loadciclo").val();

$("#actual").html(codciclo);

let anio=codciclo.substring(0,4);
let ciclo=codciclo.substring(4);

let cicloantes=(anio-1)+''+ciclo;

$("#antes").html(cicloantes);

var datosOK = "";
var strUrl = "getdatos/4";
$.ajax({
    type: "post",
    url: strUrl,
    data:{
        codciclo:codciclo   
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

        //    if (datos=="") {
        //     Swal.fire({
        //         icon: 'warning',
        //        // title: 'Oops...',
        //         text: 'No se encontraron resultados!',
        //         //footer: '<a href>Why do I have this issue?</a>'
        //       })
        //    }

        head+= '<th>LINEA</th>'+
                '<th>Gratuitas</th>'+
                '<th style="background-color:#a2a2a2;">Activo</th>'+
                '<th style="background-color:#a2a2a2;">Pendiente <br>Pago</th>'+
                '<th style="background-color:#a2a2a2;">Total</th>'+
               ' <th>Gratuitas</th>'+
               ' <th>Activo</th>'+
               ' <th>Pendiente <br>Pago</th>'+
               ' <th>Total</th>';

    // head+="<th  style='text-align: center;background-color: azure;'>ID</th>";
    // head+="<th  style='background-color: azure;'>FECHA</th>";
    // head+="<th  style='background-color: azure;'>ACTIVO</th>";
    // head+="<th  style='text-align: left;background-color: azure;'>PENDIENTE PAGO</th>";
    // head+="<th  style='text-align: left;background-color: azure;'>RETIRADOS</th>";
    // head+="<th  style='text-align: left;background-color: azure;'>ELIM/ANUL</th>";
    // head+="<th  style='text-align: left;background-color: azure;'>TOTAL</th>";
     
    $.each(datos, function(index, value) { 

    if(datos[index][1]==""){
        datos[index][1] = 0;
    }
        
    body+="<tr >";
    body+="<td >"+datos[index][0]+"</td>";
    body+="<td></td>";
    body+="<td></td>";
    body+="<td></td>";
    body+="<td></td>";
    body+="<td >"+datos[index][1]+"</td>";
    body+="<td >"+datos[index][3]+"</td>";
    body+="<td >"+datos[index][2]+"</td>";
    body+="<td >"+(parseInt(datos[index][3])+parseInt(datos[index][2]))+"</td>";
    body+="</td>";
         
    //    console.log(datos);

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
