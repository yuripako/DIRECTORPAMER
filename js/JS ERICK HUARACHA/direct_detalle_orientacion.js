$(function() {
    $('.selectd').on('click','.placeholder',function(){
        var parent = $(this).closest('.selectd');
        if ( ! parent.hasClass('is-open')){
            parent.addClass('is-open');
            $('.selectd.is-open').not(parent).removeClass('is-open');
        }else{
            parent.removeClass('is-open');
        }
    }).on('click','ul>li',function(){
        var parent = $(this).closest('.selectd');
        parent.removeClass('is-open').find('.placeholder').html( $(this).html() );
    }); 
    
    carga_inicial();
});

function carga_inicial() {
    var datosOK = "";
    var aParam = '';
    var strUrl = "getdatos/101";
    aParam = segenNegocios(aParam);
    $.post(strUrl, { "objJSON": aParam }, null, "html").done(function(data, textStatus, jqXHR) {
            data = segdeNegocios(data);
            datosOK = data.message.toUpperCase();
            if (datosOK == "OK") {
                var vCiclos = data.data;
                var vHtml = "";
                $.each(vCiclos, function(index, value) {
                    vHtml += '<li onclick="getCiclo('+vCiclos[index]+',this)">'+vCiclos[index]+'</li>';
                });
                $("#preloader").hide(10);
                $("#selectCiclo").html(vHtml);
            } else {
                $("#preloader").hide(10);
                viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            viewMessage("divMessage", "Alerta", "Error al obtener los materiales...", "warning", "warning");
        })
        .always(function() {
            reLogin(datosOK);
        });
}

function getCiclo(valor,e){
    var ulparent = $(e).parent();
    ulparent.attr('data-value',valor);
    $('#selectLinea').prev().text('Seleccionar');
    $('#selectLinea').attr('data-value','');
}

function loadtutores(valor,e) {
    var codciclo = $("#selectCiclo").attr('data-value');
    var codlinea = valor;
    $(e).parent().attr('data-value',valor);
    $('#selectTutor').prev().text('Seleccionar');
    $('#selectTutor').attr('data-value','');
    $('#selectTutor').html('');
    $('#selectSalon').prev().text('Seleccionar');
    $('#selectSalon').attr('data-value','');
    $('#selectSalon').html('');
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
                var vHtml = "";
                $.each(datos, function(index, value) { 
                    vHtml += '<li onclick="loadsalones('+datos[index][1]+',this)">'+datos[index][2]+'</li>'; 
                });
                $("#selectTutor").html(vHtml);
            } else {
                viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
            }
        }
    })
}


function loadsalones(cosalones) {
    $('#selectSalon').prev().text('Seleccionar');
    $('#selectSalon').attr('data-value','');
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
                var vHtml = "";
                $.each(datos, function(index, value) { 
                    vHtml += '<li onclick="loadReporte('+datos[index][0]+',this);" >'+ datos[index][3]+" - "+ datos[index][1]+'</li>'; 
                });
                $("#selectSalon").html(vHtml);
            } else {
                viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
            }
        }
    });
}

function loadReporte(valor,e) {
    var codsalon = valor;
    var datosOK = "";
    var strUrl = "getdatos/107";
    var aParam = '';
    $("#tbfrecuencia tbody").html('<tr><td colspan="13"><div id="cuerpoload" class="text-center"><div class="lds-ripple"><div></div><div></div></div></div></td></tr>');
    $.ajax({
        type: "post",
        url: strUrl,
        data:  {codsalon:codsalon,tipo:1},
        dataType: "html",
        success: function (response) {
            data = segdeNegocios(response);
            datosOK = data.message.toUpperCase();
        
                if (datosOK == "OK") {
                    var datos = data.data;
                    var vHtml = "";
                    $.each(datos, function(index, value) { 
                        vHtml += '<tr><td>'+datos[index][1]+'</td><td>'+datos[index][2]+'</td>';
                        vHtml += '<td>'+((datos[index][3]=='N')?'Sin registro':'<a href="javascript:modalConveracion('+datos[index][13]+');">'+datos[index][3]+'</a>')+'</td>';
                        vHtml += '<td>'+((datos[index][4]=='N')?'Sin registro':'<a href="javascript:modalConveracion('+datos[index][14]+');">'+datos[index][4]+'</a>')+'</td>';
                        vHtml += '<td>'+((datos[index][5]=='N')?'Sin registro':'<a href="javascript:modalConveracion('+datos[index][15]+');">'+datos[index][5]+'</a>')+'</td>';
                        vHtml += '<td>'+((datos[index][6]=='N')?'Sin registro':'<a href="javascript:modalConveracion('+datos[index][16]+');">'+datos[index][6]+'</a>')+'</td>';
                        vHtml += '<td>'+((datos[index][7]=='N')?'Sin registro':'<a href="javascript:modalConveracion('+datos[index][17]+');">'+datos[index][7]+'</a>')+'</td>';
                        vHtml += '<td>'+((datos[index][8]=='N')?'Sin registro':'<a href="javascript:modalConveracion('+datos[index][18]+');">'+datos[index][8]+'</a>')+'</td>';
                        vHtml += '<td>'+((datos[index][9]=='N')?'Sin registro':'<a href="javascript:modalConveracion('+datos[index][19]+');">'+datos[index][9]+'</a>')+'</td>';
                        vHtml += '<td>'+((datos[index][10]=='N')?'Sin registro':'<a href="javascript:modalConveracion('+datos[index][20]+');">'+datos[index][10]+'</a>')+'</td>';
                        vHtml += '<td>'+((datos[index][11]=='N')?'Sin registro':'<a href="javascript:modalConveracion('+datos[index][21]+');">'+datos[index][11]+'</a>')+'</td>';
                        vHtml += '<td>'+((datos[index][12]=='N')?'Sin registro':'<a href="javascript:modalConveracion('+datos[index][22]+');">'+datos[index][12]+'</a>')+'</td>';
                        vHtml += '<td>'+((datos[index][3]=='N'?0:1) + (datos[index][4]=='N'?0:1) + (datos[index][5]=='N'?0:1) + (datos[index][6]=='N'?0:1) + (datos[index][7]=='N'?0:1) + (datos[index][8]=='N'?0:1) + (datos[index][9]=='N'?0:1) + (datos[index][10]=='N'?0:1) + (datos[index][11]=='N'?0:1) + (datos[index][12]=='N'?0:1))+'</td><tr>';
                    });
                    $("#tbfrecuencia tbody").html(vHtml);
                    
                } else {
                    viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
                }
            }
        });
}

function viewToast(context, message){
    toastr.remove();
    toastr[context](message, '', {
        positionClass: 'toast-bottom-right'
    });
}

function fnExcelReport() {
	    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
	    var textRange; var j=0;
	    tab = document.getElementById('tbfrecuencia'); // id of table
	
	    for(j = 0 ; j < tab.rows.length ; j++) 
	    {     
	        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
	        //tab_text=tab_text+"</tr>";
	    }
	
	    tab_text=tab_text+"</table>";
	    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
	    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
	    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
	
	    var ua = window.navigator.userAgent;
	    var msie = ua.indexOf("MSIE "); 
	
	    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
	    {
	        txtArea1.document.open("txt/html","replace");
	        txtArea1.document.write(tab_text);
	        txtArea1.document.close();
	        txtArea1.focus(); 
	        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
	    }  
	    else                 //other browser not tested on IE 11
		sa = window.open('data:application/vnd.ms-excel;base64,' + $.base64.encode(tab_text));
	
	    return (sa);
	}
function modalConveracion(id){
    $('#modalConversacion').modal('show');
    var codacuerdo = id;
    var datosOK = "";
    var strUrl = "getdatos/108";
    var aParam = '';
    $("#aaaaaa tbody").html('<tr><td colspan="13"><div id="cuerpoload" class="text-center"><div class="lds-ripple"><div></div><div></div></div></div></td></tr>');
    $.ajax({
        type: "post",
        url: strUrl,
        data:  {codacuerdo:codacuerdo},
        dataType: "html",
        success: function (response) {
            data = segdeNegocios(response);
            datosOK = data.message.toUpperCase();
        
            if (datosOK == "OK") {
                var datos = data.data[0];
                var vHtml = "";
                vHtml += '<div class="panel-body"><h3 class="my-0">'+datos[3]+'<small class="fa-pull-right">'+datos[2]+'</small></h3></div>'+
                '<div class="panel-body p-0"><div class="row"><div class="col-sm-6 pr-0"><div class="panel-body"><h4 class="mt-0"><b>RESUMEN</b></h4>'+datos[4]+
                '</div></div><div class="col-sm-6 pl-0" style="border-left: 1px solid #dddddd;"><div class="panel-body"><h4 class="mt-0"><b>Acuerdos</b></h4>'+datos[5]+'</div>';
                if(datos[7]!= '0'){
                    vHtml += '<div class="panel-body" ><h4 class="mt-0"><b>NIVEL DE SATISFACCIÓN</b></h4><div class="post-content"><ul class="list-inline">';
                    vHtml += '<li><i class="fa '+((datos[7]=='1')?'fa-smile-o':(datos[7]=='2')?'fa-frown-o':'fa-meh-o')+'" aria-hidden="true"></i></li>';
                    vHtml += '</ul></div></div>';
                }
                var ext = datos[6].substr(datos[6].lastIndexOf('.') + 1);
                var video = '';
			    var audio = '';
			    var foto = '';
                switch( ext ) {
                    case 'jpge':
                        foto = true;
                        break;
                    case 'jpeg':
                        foto = true;
                        break;
                    case 'jpg':
                        foto = true;
                        break;
                    case 'png':
                        foto = true;
                        break;
                    case 'mp4':
                        video = true;
                        break;
                    case 'mp3':
                        audio = true;
                        break;
                }
                if(datos[6]){
                    vHtml += '<div class="panel-body"><h4 class="mt-0"><b>EVIDENCIAS</b></h4><ul class="list-unstyled">';
                    vHtml += (video)?'<li><i class="fa fa-play-circle-o mr-2" aria-hidden="true"></i> <a data-toggle="modal" data-path="'+webroot+datos[6]+'" data-target="#modelVideo" class="link" href="#"> Ver conversación</a></li>':'';
                    vHtml += (audio)?'<li><i class="fa fa-play-circle-o mr-2" aria-hidden="true"></i> <a data-toggle="modal" data-path="'+webroot+datos[6]+'" data-target="#modelAudio" class="link" href="#"> Escuchar conversación</a></li>':'';
                    vHtml += (foto)?'<li><i class="fa fa-file-image-o mr-2" aria-hidden="true"></i> <a data-toggle="modal" data-path="'+webroot+datos[6]+'" data-target="#modelImage" class="link" href="#"> Ver captura de pantalla</a></li>':'';
                    vHtml += '</ul></div>';
                }
                vHtml += '</div></div></div>';
                $("#conversaciones").html(vHtml);
                    
            } else {
                viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
            }
        }
    });
}

$(document).on('show.bs.modal', '#modelImage', function (event) {
    var button = $(event.relatedTarget);
    var path = button.data('path');
    var modal = $(this);
    modal.find('.img-responsive').attr( 'src', path );
});
$(document).on('show.bs.modal', '#modelVideo', function (event) {
    var button = $(event.relatedTarget);
    var path = button.data('path');
    var modal = $(this);
    modal.find('.img-responsive').attr( 'src', path );
});
$(document).on('show.bs.modal', '#modelAudio', function (event) {
    var button = $(event.relatedTarget);
    var path = button.data('path');
    var modal = $(this);
    modal.find('.img-responsive').attr( 'src', path );
});