$(document).ready(function () {

    combociclo();
    $("#buscar").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#cuerpo tr  ").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
    });
    
    
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
    var strUrl = "getdatos/70";
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
        head+="<th  style='text-align: left;background-color: azure;'>SALÓN</th>";
        head+="<th  style='text-align: left;background-color: azure;'>TUTOR</th>";
        head+="<th  style='text-align: left;background-color: azure;'>N° ALUMNOS</th>";
        head+="<th  style='text-align: left;background-color: azure;'>CON NOTA Y CON EVIDENCIA</th>";
        head+="<th  style='text-align: left;background-color: azure;'>CON NOTA Y SIN EVIDENCIA</th>";
        head+="<th  style='text-align: left;background-color: azure;'>RESTO</th>";
        $.each(datos, function(index, value) { 
            if (datos[index][6]=="") {
                datos[index][6]=0;
               }

          body+="<tr>";
          body+="<td style='text-align: center;'>"+(index+1)+"</td>";
          body+="<td>"+datos[index][1]+"</td>";
          body+="<td>"+datos[index][2]+"</td>";
          body+="<td>"+datos[index][3]+"</td>";
          body+="<td>"+datos[index][4]+"</td>";
          body+="<td>"+datos[index][5]+"</td>";
          body+="<td>"+datos[index][6]+"</td>";
          body+="<td>"+datos[index][7]+"</td>";
          
          var tot=(parseInt(datos[index][5]) - parseInt(datos[index][6]) - parseInt(datos[index][7]) );
          body+="<td>"+clean(tot)+"</td>";
          body+="</tr>";
       


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
    
    function clean(x) {
        if (x === Number.NaN) {
          // can never be true
          return null;
        }
        if (isNaN(x)) {
          return 0;
        }
        return x;
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
    