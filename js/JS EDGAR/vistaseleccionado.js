$(document).ready(function () {


    $("#datepicker").datepicker({
        closeText: 'Cerrar',
		prevText: '<Ant',
		nextText: 'Sig>',
		currentText: 'Hoy',
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'MM yy',    
        onClose: function(dateText, inst) {   

        $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));

           var num = (inst.selectedMonth);
           $("#numero").val(num);
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

var mes = $("#numero").val();

meses=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
//alert(meses[mes]);


var datosOK = "";
var strUrl = "getdatos/64";
$.ajax({
    type: "post",
    url: strUrl,
    data:{
        codciclo:codciclo,
        codlinea:codlinea,
        meses:meses[mes]
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
    head+="<th  style='text-align: left;background-color: azure;'>MES</th>";
    head+="<th  style='text-align: left;background-color: azure;'>CICLO</th>";
    head+="<th  style='text-align: left;background-color: azure;'>LINEA</th>";
    head+="<th  style='text-align: left;background-color: azure;'>TUTOR</th>";
    head+="<th  style='text-align: left;background-color: azure;'>SALON</th>";
    head+="<th  style='text-align: left;background-color: azure;'>N° ALUMNOS</th>";
    head+="<th  style='text-align: left;background-color: azure;'>N° SELECCIONADOS</th>";
     
    $.each(datos, function(index, value) { 
        
    body+="<tr >";
    body+="<td style='text-align: center;'>"+(index+1)+"</td>";
    body+="<td style='text-align: left;'>"+datos[index][0]+"</td>";
    body+="<td style='text-align: left;'>"+datos[index][1]+"</td>";
    body+="<td style='text-align: left;'>"+datos[index][2]+"</td>";
    body+="<td style='text-align: left;'>"+datos[index][3]+"</td>";
    body+="<td style='text-align: left;'>"+datos[index][4]+"</td>";
    body+="<td style='text-align: left;'>"+datos[index][5]+"</td>";
    body+="<td style='text-align: left;'>"+datos[index][6]+"</td>";
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
