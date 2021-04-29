$(document).ready(function () {


   combociclo();
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
      

 

 function metadatos(){
    $("#tblMerito").hide(10);
    $("#cuerpoload").show(10);
  var codciclo=$("#loadciclo").val();
  var codlinea=$("#lineal").val();


    var datosOK = "";
    var strUrl = "getdatos/68";
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
    
        head+="<th  style='text-align: center;background-color: azure;width: 10%;'>ID</th>";
        head+="<th  style='text-align: left;background-color: azure;width: 15%;'>SALONES</th>";
        head+="<th  style='text-align: left;background-color: azure;width: 10%;'>META %</th>";
        head+="<th  style='text-align: left;background-color: azure;width: 60%;'></th>";
        $.each(datos, function(index, value) { 
   
        body+="<tr >";
        body+="<td style='text-align: center;    padding: 10px;'>"+(index+1)+"</td>";
        body+="<td style='text-align: left;    padding: 10px;'>"+datos[index][1]+"</td>";
        body+="<td style='text-align: left;    padding: 10px;'><span style='display:none'>"+datos[index][3]+"</span><input value='"+datos[index][3]+"'  onkeyup=\"insertcampo1('" +(index+1)+ "','" +datos[index][0]+ "');\"  type='number' class='form-control' name='nota"+(index+1)+"' id='nota"+(index+1)+"'  style='font-size: 16px;    text-align: center;'></td>";
             
    
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
    

function reloadPage() {
    location.reload(); 
}

    function insertcampo1(c1,codsalon) {
    
        var meta = $("#nota"+c1).val();


       var datosOK = "";
       var strUrl = "getdatos/69";
       $.ajax({
           type: "post",
           url: strUrl,
           data:{
            meta:meta,
            codsalon:codsalon 
           },
           dataType: "html",
           success: function (response) {
               data = segdeNegocios(response);
               datosOK = data.message.toUpperCase();
        
               if (datosOK == "OK") {
                   var datos = data.data;
                   var html1 = "";
                
                   $.each(datos, function(index, value) { 
                       // console.log(datos);
                    
                   });
   
   
               } else {
                   viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
               }
           }
       
       
       })
   
   
   }












