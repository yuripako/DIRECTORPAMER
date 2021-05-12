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
    loadTipoAlumno();
});
function loadTipoAlumno(){
    
        var datosOK = "";
        var aParam = '';
        var strUrl = "getdatos/112";
        aParam = segenNegocios(aParam);
        $.post(strUrl, { "objJSON": aParam }, null, "html").done(function(data, textStatus, jqXHR) {
                data = segdeNegocios(data);

                datosOK = data.message.toUpperCase();
                if (datosOK == "OK") {
                    var datos = data.data;
                    var vHtml = '';
                    $.each(datos, function(index, value) {
                        vHtml += '<li onclick="getReporte(\''+datos[index]['key']+'\',this)">'+datos[index]['tex']+'</li>';
                    });
                    $("#preloader").hide(10);
                    $("#selectTipo").html(vHtml);
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
                    vHtml += '<li onclick="getLineas('+vCiclos[index]+',this)">'+vCiclos[index]+'</li>';
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

function getLineas(valor,e){
    var ulparent = $(e).parent();
    ulparent.attr('data-value',valor);
    $('#selectLinea').prev().text('Cargando...');
    $('#selectLinea').attr('data-value','');
    $("#selectLinea").html('');
    $('#selectTutor').prev().text('Seleccionar');
    $('#selectTutor').attr('data-value','');
    $('#selectTutor').html('');
    $('#selectSalon').prev().text('Seleccionar');
    $('#selectSalon').attr('data-value','');
    $('#selectSalon').html('');
    var datosOK = "";
    var strUrl = "getdatos/109";
    var aParam = '';
    $.ajax({
        type: "post",
        url: strUrl,
        data:  {codciclo:valor},
        dataType: "html",
        success: function (response) {
            data = segdeNegocios(response);
            datosOK = data.message.toUpperCase();
    
            if (datosOK == "OK") {
                var datos = data.data;
                var vHtml = "";
                $.each(datos, function(index, value) { 
                    vHtml += '<li onclick="loadtutores('+datos[index][0]+',this)">'+datos[index][1]+'</li>';
                });
                $("#selectLinea").html(vHtml);
                $('#selectLinea').prev().text('Seleccionar');
            } else {
                viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
            }
        }
    });
}
function loadtutores(valor,e) {
    var codciclo = $("#selectCiclo").attr('data-value');
    var codlinea = valor;
    $(e).parent().attr('data-value',valor);
    $('#selectTutor').prev().text('Cargando...');
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
                    vHtml += '<li onclick="loadsalones('+datos[index][0]+',this)">'+datos[index][2]+'</li>';
                });
                $("#selectTutor").html(vHtml);
                $('#selectTutor').prev().text('Seleccionar');
            } else {
                viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
            }
        }
    })
}


function loadsalones(codTutor) {
    $('#selectSalon').prev().text('Cargando...');
    $('#selectSalon').attr('data-value','');
    var codCiclo = $('#selectCiclo').attr('data-value');
    var codLinea = $('#selectLinea').attr('data-value');
    var datosOK = "";
    var strUrl = "getdatos/113";
    var aParam = '{"codlinea":"'+codLinea+'","codtutor":"' + codTutor + '","codciclo":"' + codCiclo + '"}';
    var postParam = segenNegocios(aParam);
    $.ajax({
        type: "post",
        url: strUrl,
        data: {"objJSON":postParam},
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
                $('#selectSalon').prev().text('Seleccionar');
            } else {
                viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
            }
        }
    });
}

function getReporte(tipo,e){
    var codsalon = $("#selectSalon").attr('data-value');
    if(codsalon === undefined) {
        viewToast("warning", 'Seleccione Salón');
    }else{
        $(e).parent().attr('data-value',tipo);
        loadReporte(codsalon,null,tipo);
    }
}

function loadReporte(codSalon,e,codTipoAlum){
	if(codTipoAlum== null){
        codTipoAlum = $("#selectTipo").attr('data-value');
        $(e).parent().attr('data-value',codSalon);
    }
    var codsalon = codSalon;
	var codLinea = $('#selectLinea').attr('data-value');
	var codAlumno = 0;
	var codArea = 0;
    sChargeData();
    var strUrl = "getdatos/110";
    var datosOK = "";
    var aParam = '{"codLinea":"'+codLinea+'","codSalon":"' + codSalon + '","codAlumno":"' + codAlumno + '","codArea":"' + codArea + '","tipoAlumno":"' + codTipoAlum + '"}';
    aParam = segenNegocios(aParam);
    $("#tblSimulacros").html('<div id="cuerpoload" class="text-center"><div class="lds-ripple"><div></div><div></div></div></div>');
    $.post(strUrl,  {"objJSON": aParam}, null, "html")
        .done(function (data, textStatus, jqXHR) {
            data = segdeNegocios(data);
            datosOK = data.message.toUpperCase();
            if (datosOK == "OK") {

                var table = eval(data.data[0].tableSim[0]);
                $("#MyGrilla").show();
                $("#tblSimulacros").html('<table id="tblReporteSimu" class="display" cellspacing="0" width="100%"></table>')
                $('#tblReporteSimu').DataTable(table);

                $("#tblReporteSimu").find('.clsAlumno').click(function(event) {
                    $("#panProIng").hide();
                    var codAlu = $(this).attr('codalu');
                    var emaAlu = $(this).attr('emaalu');
                    Get_Data_Probabilidad(codAlu,emaAlu);

                    var aluNombre = $(this).text();
                    var aluCarrera = $(this).parent().next().text();

                    $("#panProIngDetallado .salon .abajo .texto").text(aluNombre);
                    $("#panProIngDetallado .alumno .abajo .texto").text(aluCarrera);

                    $("#panProIngDetallado").show();
                });

            } else {
                $("#MyGrilla").hide();
                toastr.error(data.data);
                fChargeData();
            }
            
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            fChargeData();
            $("#MyGrilla").hide();
            toastr.error("error al Cargar notas de Simulacro");
        })
        .always(function () {
            
        });
}

function Get_Data_Probabilidad(codAlumno,emailAlumno){
    var strUrl = "getdatos/120"; 
    var datosOK = "";
    var SCategoria = "";
    var SMax = "";
    var SMin = "";
    var SPuntaje = "";
    var aParam = '{"codAlumno":' + $.trim(codAlumno) + ',"emailAlumno":"' + $.trim(emailAlumno) + '"}';
    aParam = segenNegocios(aParam);
    $.post(strUrl,  {"objJSON": aParam}, null, "html")
        .done(function (data, textStatus, jqXHR) {
            data = segdeNegocios(data);
            datosOK = data.message.toUpperCase();
            if (datosOK == "OK") {
                var datos = data.data[0];
                $("#container").show();
            } else {
                $("#container").hide();
            }
            
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            $("#container").hide();
            fChargeData();
            toastr.error("error al Cargar notas de Simulacro");
        })
        .always(function () {
            
        });

}

function sChargeData() {
	$('#loadingReporte').show();
}
function fChargeData() {
	$('#loadingReporte').hide(5);
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
	    tab = document.getElementById('tblReporteSimu'); // id of table
	
	    for(j = 0 ; j < tab.rows.length ; j++) 
	    {     
	        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
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
	        sa=txtArea1.document.execCommand("SaveAs",true,"probabilidades.xls");
	    }  
	    else                 //other browser not tested on IE 11
		sa = window.open('data:application/vnd.ms-excel;base64,' + $.base64.encode(tab_text));
	
	    return (sa);
	}