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
                //$('#selectArea > li:first').trigger("click");
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
    if(codciclo === undefined) {
        viewToast("warning", 'Seleccione Ciclo');
        
    }else{
        var codlinea = valor;
        $(e).parent().attr('data-value',valor);
        $('#selectTutor').prev().text('Seleccionar');
        $('#selectTutor').attr('data-value','');
        $('#selectTutor').html('');
        $('#selectSalon').prev().text('Seleccionar');
        $('#selectSalon').attr('data-value','');
        $('#selectSalon').html('');
        var datosOK = "";
        var strUrl = "getdatos/104";
        var aParam = '';
        $("#tbpromedio tbody").html('<tr><td colspan="7"><div id="cuerpoload" class="text-center"><div class="lds-ripple"><div></div><div></div></div></div></td></tr>');
        $.ajax({
            type: "post",
            url: strUrl,
            data:  {codciclo:codciclo,codlinea:codlinea},
            dataType: "html",
            success: function (response) {
                data = segdeNegocios(response);
                datosOK = data.message.toUpperCase();
        
                if (datosOK == "OK") {
                    var datos = data.data;
                    var vHtml = "";
                    $.each(datos, function(index, value) { 
                        vHtml += '<tr><td>'+datos[index][0].substr(0,4)+'.'+datos[index][0].substr(4)+'</td><td>'+datos[index][1]+'</td><td>'+datos[index][2]+'</td><td>'+datos[index][3]+'</td><td>'+datos[index][4]+'</td><td>'+datos[index][5]+'</td><td>'+datos[index][6]+'</td></tr>'; 
                    });
                    $("#tbpromedio tbody").html(vHtml);
                    
                } else {
                    viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
                }
            }
        });
    }
    

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
	    tab = document.getElementById('tbpromedio'); // id of table
	
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