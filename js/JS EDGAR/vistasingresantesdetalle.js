$(document).ready(function () {
    combolinea();
    combociclo();
	mensajecaja();
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


function loadtutores() {
    var codciclo =  $("#loadciclo").val();
    var codlinea =  $("#lineal").val();
    combotutores(codciclo,codlinea);
  
    }


function loadsaloneo() {

    var cosalon=$("#salones").val();
    var parte = cosalon.split("->");
    $("#codsalone").val(parte[0]); 
}

function combotutores(codciclo,codlinea) {
  
        var datosOK = "";
        var strUrl = "getdatos/54";
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
                    var html1 = "";
                   // console.log(datos);
                    html1 += "<option value='msj'>Seleccione</option>";
                    $.each(datos, function(index, value) { 
                        html1 += "<option value='"+datos[index][1]+" '>"+datos[index][2]+"</option>"; 
                    });

                    $("#tutores").html(html1);

                  

                } else {
                    viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
                }
            }
        
        
        })
    
    }
  

 function loadsalones() {
      
        var salones=$("#tutores").val();
        
        combolinea(salones)
 }
        
 function combolinea(cosalones) {
  
    var datosOK = "";
    var strUrl = "getdatos/51";
    $.ajax({
        type: "post",
        url: strUrl,
        data:{
            cosalones:cosalones
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
                $.each(datos, function(index, value) { 
                    html1 += "<option value='"+datos[index][0]+"->"+datos[index][4]+" '>"+ datos[index][3]+" - "+ datos[index][1]+"</option>"; 
                });

                $("#salones").html(html1);

            } else {
                viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
            }
        }
    
    
    })

}


        
function metododetalle() {
 $("#tblMerito").hide(10);
$("#cuerpoload").show(10);


var cadena = $("#salones").val();
var porciones = cadena.split("->");
var codciclo=$("#loadciclo").val();
    //$("#codsaloni").val(porciones[0]);
    //$("#codlini").val(porciones[1]);
//alert(porciones[0]);
//var codsalon =$("#codsalone").val();
//loadvista(codsalon);

var datosOK = "";
var strUrl = "getdatos/65";
$.ajax({
    type: "post",
    url: strUrl,
    data:{
        codsalon:porciones[0]
    },
    dataType: "html",
    success: function (response) {
        data = segdeNegocios(response);
        datosOK = data.message.toUpperCase();
 
        if (datosOK == "OK") {
            var datos = data.data;
            var html1 = "";
           // console.log(datos);

            var head="";
            var body="";
             head+="<th style='width: 5%;'>ID</td>";
             head+="<th style='width: 10%;'>CÓDIGO</td>";
             head+="<th style='width: 20%;'>ESTUDIANTE</td>";
             head+="<th style='width: 10%;'>INGRESÓ? S / N</td>";
             head+="<th style='width: 10%;'>PUNTAJE</td>";
             head+="<th style='width: 35%;'></td>";
            $.each(datos, function(index, value) { 
                //console.log(datos);
            body+="<tr>";
            body+="<td>"+(index+1)+"</td>";
            body+="<td>"+datos[index][0]+"</td>";
            body+="<td>"+datos[index][1]+"</td>";
            body+="<td><span style='display:none'>"+datos[index][2]+"</span> <input maxlength='1' value='"+datos[index][2]+"'  onkeyup=\"insertcampo1('" +(index+1)+ "','" +datos[index][0]+ "');\" type='Text' class='form-control' name='respuesta"+(index+1)+"' id='respuesta"+(index+1)+"' style='font-size: 16px;    text-transform: uppercase;    text-align: center;'></td>";
            body+="<td><span style='display:none'>"+datos[index][3]+"</span> <input value='"+datos[index][3]+"'  onkeyup=\"insertcampo1('" +(index+1)+ "','" +datos[index][0]+ "');\"  type='number' class='form-control' name='nota"+(index+1)+"' id='nota"+(index+1)+"'  style='font-size: 16px;    text-align: center;'></td>";
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

function insertcampo1(c1,codalumno) {
    
     var codciclo=$("#loadciclo").val();
     var codlinea=$("#lineal").val();
     var codsalon =$("#codsalone").val();
    var rpta = $("#respuesta"+c1).val();
    var nota = $("#nota"+c1).val();
  //  console.log(codigo+" "+ingreso);

    var datosOK = "";
    var strUrl = "getdatos/66";
    $.ajax({
        type: "post",
        url: strUrl,
        data:{
            codciclo:codciclo,
            codlinea:codlinea,
            codsalon:codsalon,
            codalumno:codalumno,
            rpta:rpta,
            nota:nota
            
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




function metodotipo() {
    alert("Ahora seleccione un Simulacro.");
}

function mensajecaja(){
    var ht= '<tr ><td colspan="11" style="text-align: center;font-size: 16px;border: 1px solid #fff; ">Filtra en el combobox para ver la información.</td></tr>';
         $("#cuerpo").html(ht);
}
function financial(x) {
	return Number.parseFloat(x).toFixed(2);
}