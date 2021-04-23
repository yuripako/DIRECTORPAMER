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
        //var ulparent = $(this).parent();
        //ulparent.attr('data-value',$(this).attr('data-option'));
        /*console.log(ulparent);*/
        parent.removeClass('is-open').find('.placeholder').html( $(this).html() );
    }); 
    
    /*$('.toggle-menu').click(function() {
        $('#selectCursos').toggleClass('display');
    });*/
    
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
            //console.log(data);
            if (datosOK == "OK") {
                var vCiclos = data.data;
                var vHtml = "";
                console.log(data);
                $.each(vCiclos, function(index, value) {
                    vHtml += '<li onclick="getCiclo('+vCiclos[index]+',this)">'+vCiclos[index]+'</li>';
                });
                $("#loading").hide(10);
                $("#selectCiclo").html(vHtml);
                //$('#selectArea > li:first').trigger("click");
            } else {
                $("#loading").hide(10);
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
/*function loadtutores(valor,e) {
    var codciclo = $("#selectCiclo").attr('data-value');
    var codlinea = valor;
    var ulparent = $(e).parent().attr('data-value',valor);
    combotutores(codciclo,codlinea);
    //metodoslider(codlinea,codciclo)
  
}*/
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
/********-------------------***********/

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
                console.log(datos);
                var vHtml = "";
                $.each(datos, function(index, value) { 
                    vHtml += '<li onclick="loadReporte('+datos[index][4]+','+datos[index][2]+',this);" >'+ datos[index][3]+" - "+ datos[index][1]+'</li>'; 
                });
                $("#selectSalon").html(vHtml);
            } else {
                viewMessage("divMessage", "Alerta", data.data, "danger", "ban");
            }
        }
    })

}

function loadReporte(cosalones) {

}
function llenaResumen() {
    fblur();
    $('#tabLinea').hide(0);
    $('#dChartLin').show();
    $('#dChartBar').show();
    var name = $("#sLinea option:selected").text().toUpperCase() + " " + $("#sCiclo option:selected").text().toUpperCase();
    $("#nameBox").html(name);
    ga('send', {
        hitType: 'event',
        eventCategory: 'geproyeccion',
        eventAction: usuario,
        eventLabel: name
    });
    var datosOK = "";
    var strUrl = "/pamervirtual/gein/index/2";
    var aParm = '{"etis":"' + $("#hEtis").val() + '","sede":' + $.trim($("#sLocal").val()) + ',"linea":' + $.trim($("#sLinea").val()) + ',"ciclo":' + $.trim($("#sCiclo").val()) + ',"salon":' + $.trim($("#sSalon").val()) + ',"condi":' + $("#sCondi").val() + ',"area":"' + $("#hArea").val() + '","carrera":"' + $("#hCarrera").val() + '","modulo":' + modulo + '}';
    $.post(strUrl, {"objJSON": aParm}, null, "json")
            .done(function (data, textStatus, jqXHR) {
                if (validaNull(data, "Error al Cargar el cuadro.", "mError")) {
                    habilitar();
                    return;
                }
                datosOK = data.message.toUpperCase();
                if (datosOK == "OK") {

                    var datos = data.data;
                    var sArrayTh = data.cabecera;
                    var nomRango = [];
                    var nomColor = [];
                    var nomETI = [];
                    var numCOl = 0;
                    var vHtml = '<table id="tblResumen" class="table table-striped table-bordered" align="center" cellspacing="0" width="100%" style="white-space: nowrap;">' +
                            '<thead style= "background-color: #5ed0f2; color: #222222; font-size: 13px; text-align: center;"><tr >';
                    vHtml = vHtml + '<th colspan=' + sArrayTh.length + ' style="text-align: center; padding-right: 0px; padding-left: 0px; background: #337ab7; color: #FFF;">PROYECCIÓN' + name + '</th>';
                    vHtml = vHtml + '</tr ><tr >';
                    $.each(sArrayTh, function (index, value) {
                        var sHead = $.trim(sArrayTh[index].th);
                        if (sHead.indexOf("|") >= 0) {
                            sHead = sHead.split("|");
                            vHtml = vHtml + '<th  data-toggle="tooltip"  Title="' + sHead[2] + '" style="vertical-align: middle; min-width:30px; text-align: center; padding-right: 10px; padding-left: 10px; background: ' + sHead[0] + ';">' + sHead[1] + '</th>';
                            if (index >= 5) {
                                nomColor[index - 5] = sHead[0];
                                nomRango[index - 5] = {
                                    "name": sHead[1],
                                    "data": []
                                };
                            }
                        } else {
                            vHtml = vHtml + '<th style="vertical-align: middle; text-align: center; padding-right: 10px; padding-left: 10px; background: #5ed0f2;">' + sHead + '</th>';
                        }
                        numCOl++;
                    });
                    //nomRango[0].data[0] = 10;
                    //alert(nomRango[0].name);
                    vHtml = vHtml + '</tr></thead></table>';
                    $('#dChartLin').html('<div id="dProyectado" style="text-align: left; width: 100%; overflow: auto;"></div><div id="dChartProyectado" style="text-align: left; width: 100%;"></div>' + vHtml);
                    $('#tblResumen')
                            .DataTable({
                                //"lengthMenu": [[100, 25, 50, -1], [10, 25, 50, "All"]],
                                "aaData": datos,
                                "sScrollY": 500,
                                "scrollX": true,
                                "scrollCollapse": true,
                                "paging": false,
                                "bLengthChange": false,
                                "bAutoWidth": false,
                                "bPaginate": false,
                                "bInfo": true,
                                "bFilter": true,
                                "bSort": false,
                                dom: 'Bfrtip',
                                buttons: [],
                                "oLanguage": {
                                    sEmptyTable: "...",
                                    sInfo: "Mostrando _TOTAL_ filas.",
                                    sInfoEmpty: "No se encontraron Exámenes."
                                },
                                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                    for (var i in aData) {
                                        if (i >= 5) {
                                            if (aData[i].indexOf("|") >= 0) {
                                                var aNota = aData[i].split("|");
                                                $('td:eq(' + parseInt(i) + ')', nRow).html(aNota[0]);
                                                $('td:eq(' + parseInt(i) + ')', nRow).attr('data-real', aNota[1]);
                                                if (parseFloat(aNota[0]) != parseFloat(aNota[1]))
                                                    $('td:eq(' + parseInt(i) + ')', nRow).attr('title', aNota[1]);
                                                //$('td:eq(' + parseInt(i) + ')', nRow).css('color', 'blue');
                                            } else {
                                                $('td:eq(' + parseInt(i) + ')', nRow).attr('data-real', aData[i]);
                                            }
                                        }
                                    }
                                }
                            });
                    //$("#aExcel").show();
                    var indexEti = -1;
                    $("#tblResumen tbody tr").each(function (index)
                    {
                        if ($(this).html().indexOf('colspan') < 0)
                        {
                            //var eidgroup, eperfil, eusu;

                            $(this).children("td").each(function (index2)
                            {
                                if (index2 == 0 && nomETI[indexEti] != $(this).html()) {
                                    indexEti++;
                                    nomETI[indexEti] = $(this).html();
                                }
                                if (index2 >= 5 && index2 < (numCOl - 2)) {
                                    if (!$.isNumeric(nomRango[index2 - 5].data[indexEti]))
                                        nomRango[index2 - 5].data[indexEti] = 0.0;
                                    nomRango[index2 - 5].data[indexEti] = parseInt((parseFloat(nomRango[index2 - 5].data[indexEti]) + parseFloat($(this).attr('data-real'))).toFixed(0));
                                }
                                return;
                            });
                        }
                    });

                    var totalETI = [];
                    vHtml = '<table id="tblProyectado" class="table table-striped table-bordered" align="center" cellspacing="0" style="width: auto;">' +
                            '<thead style= "font-size: 13px; text-align: center;"><tr >';
                    vHtml = vHtml + '<th colspan=' + (parseInt(nomETI.length) + 1) + ' style="text-align: center; padding-right: 0px; padding-left: 0px; background: #002E4D; color: #FFF;">PROYECCIÓN ' + name + '</th>';
                    vHtml = vHtml + '</tr ><tr >';
                    vHtml = vHtml + '<th style="vertical-align: middle; text-align: center; padding-right: 10px; padding-left: 10px; background: #002E4D; color: #FFF;"></th>';
                    $.each(nomETI, function (index, value) {
                        vHtml = vHtml + '<th style="vertical-align: middle; text-align: center; padding-right: 10px; padding-left: 10px; background: #002E4D; color: #FFF;">' + nomETI[index] + '</th>';
                    });
                    //nomRango[0].data[0] = 10;
                    //alert(nomRango[0].name);
                    vHtml = vHtml + '</tr></thead>';
                    vHtml = vHtml + '<tbody>';
                    $.each(nomRango, function (index, value) {
                        vHtml = vHtml + '<tr>';
                        vHtml = vHtml + '<td style="vertical-align: middle; text-align: left; background: white; color: #002E4D; padding-top: 2px; padding-bottom: 2px;">' + nomRango[index].name + '</td>';
                        var vData = nomRango[index].data;
                        $.each(vData, function (index2, value) {
                            vHtml = vHtml + '<td style="vertical-align: middle; text-align: center; background: white; color: #002E4D; padding-top: 2px; padding-bottom: 2px;">' + vData[index2] + '</td>';
                            if (!$.isNumeric(totalETI[index2]))
                                totalETI[index2] = 0;
                            totalETI[index2] = totalETI[index2] + parseInt(vData[index2]);
                        });
                        vHtml = vHtml + '</tr>';
                    });
                    vHtml = vHtml + '<tr><td style="vertical-align: middle; text-align: center; padding-right: 10px; padding-left: 10px; background: #002E4D; color: #FFF;">TOTAL</td>';
                    $.each(totalETI, function (index, value) {
                        vHtml = vHtml + '<td style="vertical-align: middle; text-align: center; padding-right: 10px; padding-left: 10px; background: #002E4D; color: #FFF;">' + totalETI[index] + '</td>';
                    });
                    vHtml = vHtml + '</tr></tbody></table>';
                    $('#dProyectado').html(vHtml);
                    //return;
                    //alert(JSON.stringify(nomRango));
                    $('#dChartProyectado').highcharts({
                        title: {
                            text: 'PROYECCIÓN GEIN', x: -20 //center
                        },
                        subtitle: {
                            text: '', x: -20
                        },
                        colors: nomColor,
                        xAxis: {
                            //tickInterval: 100,
                            labels: {style: {fontSize: '9px'}},
                            categories: nomETI
                        },
                        yAxis: {
                            title: {
                                text: 'Alumnos'
                            },
                            min: 0,
                            plotLines: [{
                                    value: 0, width: 1, color: '#37b7f3'
                                }]
                        },
                        tooltip: {
                            valueSuffix: '',
                            crosshairs: true,
                            shared: true
                        },
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                            //x: -40,
                            //y: 5,
                            //floating: true,
                            borderWidth: 1,
                            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                            shadow: true,
                            reversed: false
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: true
                                },
                                marker: {
                                    enabled: true,
                                    radius: 4,
                                    lineColor: '#666666',
                                    lineWidth: 1
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: nomRango
                    });

                    strUrl = "/pamervirtual/gein/index/7";
                    $.post(strUrl, {"objJSON": aParm}, null, "json")
                            .done(function (data, textStatus, jqXHR) {
                                if (validaNull(data, "Error al Cargar el cuadro.", "mError")) {
                                    habilitar();
                                    return;
                                }
                                datosOK = data.message.toUpperCase();
                                if (datosOK == "OK") {

                                    var datos = data.data;
                                    var sArrayTh = data.cabecera;
                                    var nomRango = [];
                                    var nomColor = [];
                                    var nomETI = [];
                                    var numCOl = 0;
                                    var vHtml = '<table id="tblConsolidado" class="table table-striped table-bordered" align="center" cellspacing="0" width="100%" style="white-space: nowrap;">' +
                                            '<thead style= "background-color: #5ed0f2; color: #222222; font-size: 13px; text-align: center;"><tr >';
                                    vHtml = vHtml + '<th colspan=' + sArrayTh.length + ' style="text-align: center; padding-right: 0px; padding-left: 0px; background: #337ab7; color: #FFF;">CONSOLIDADO' + name + '</th>';
                                    vHtml = vHtml + '</tr ><tr >';
                                    $.each(sArrayTh, function (index, value) {
                                        var sHead = $.trim(sArrayTh[index].th);
                                        if (sHead.indexOf("|") >= 0) {
                                            sHead = sHead.split("|");
                                            vHtml = vHtml + '<th  data-toggle="tooltip"  Title="' + sHead[2] + '" style="vertical-align: middle; min-width:30px; text-align: center; padding-right: 10px; padding-left: 10px; background: ' + sHead[0] + ';">' + sHead[1] + '</th>';
                                            if (index >= 5) {
                                                nomColor[index - 5] = sHead[0];
                                                nomRango[index - 5] = {
                                                    "name": sHead[1],
                                                    "data": []
                                                };
                                            }
                                        } else {
                                            vHtml = vHtml + '<th style="vertical-align: middle; text-align: center; padding-right: 10px; padding-left: 10px; background: #5ed0f2;">' + sHead + '</th>';
                                        }
                                        numCOl++;
                                    });
                                    //nomRango[0].data[0] = 10;
                                    //alert(nomRango[0].name);
                                    vHtml = vHtml + '</tr></thead></table>';
                                    $('#dChartBar').html('<div id="dConsolidado" style="text-align: left; width: 100%; overflow: auto;"></div><div id="dChartConsolidado" style="text-align: left; width: 100%;"></div>' + vHtml);
                                    $('#tblConsolidado')
                                            .DataTable({
                                                //"lengthMenu": [[100, 25, 50, -1], [10, 25, 50, "All"]],
                                                "aaData": datos,
                                                "sScrollY": 500,
                                                "scrollX": true,
                                                "scrollCollapse": true,
                                                "paging": false,
                                                "bLengthChange": false,
                                                "bAutoWidth": false,
                                                "bPaginate": false,
                                                "bInfo": true,
                                                "bFilter": true,
                                                "bSort": false,
                                                dom: 'Bfrtip',
                                                buttons: [],
                                                "oLanguage": {
                                                    sEmptyTable: "...",
                                                    sInfo: "Mostrando _TOTAL_ filas.",
                                                    sInfoEmpty: "No se encontraron etis."
                                                },
                                                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                                    for (var i in aData) {
                                                        if (i >= 5) {
                                                            if (aData[i].indexOf("|") >= 0) {
                                                                var aNota = aData[i].split("|");
                                                                $('td:eq(' + parseInt(i) + ')', nRow).html(aNota[0]);
                                                                $('td:eq(' + parseInt(i) + ')', nRow).attr('data-real', aNota[1]);
                                                                if (parseFloat(aNota[0]) != parseFloat(aNota[1]))
                                                                    $('td:eq(' + parseInt(i) + ')', nRow).attr('title', aNota[1]);
                                                                //$('td:eq(' + parseInt(i) + ')', nRow).css('color', 'blue');
                                                            } else {
                                                                $('td:eq(' + parseInt(i) + ')', nRow).attr('data-real', aData[i]);
                                                            }
                                                        }
                                                    }
                                                }
                                            });
                                    //$("#aExcel").show();
                                    var indexEti = -1;
                                    $("#tblConsolidado tbody tr").each(function (index)
                                    {
                                        if ($(this).html().indexOf('colspan') < 0)
                                        {
                                            //var eidgroup, eperfil, eusu;

                                            $(this).children("td").each(function (index2)
                                            {
                                                if (index2 == 0 && nomETI[indexEti] != $(this).html()) {
                                                    indexEti++;
                                                    nomETI[indexEti] = $(this).html();
                                                }
                                                if (index2 >= 5 && index2 < (numCOl - 2)) {
                                                    if (!$.isNumeric(nomRango[index2 - 5].data[indexEti]))
                                                        nomRango[index2 - 5].data[indexEti] = 0.0;
                                                    nomRango[index2 - 5].data[indexEti] = parseInt((parseFloat(nomRango[index2 - 5].data[indexEti]) + parseFloat($(this).attr('data-real'))).toFixed(0));
                                                }
                                                return;
                                            });
                                        }
                                    });

                                    var totalETI = [];
                                    vHtml = '<table class="table table-striped table-bordered" align="center" cellspacing="0" style="width: auto;">' +
                                            '<thead style= "font-size: 13px; text-align: center;"><tr >';
                                    vHtml = vHtml + '<th colspan=' + (parseInt(nomETI.length) + 1) + ' style="text-align: center; padding-right: 0px; padding-left: 0px; background: #002E4D; color: #FFF;">CONSOLIDADO ' + name + '</th>';
                                    vHtml = vHtml + '</tr ><tr >';
                                    vHtml = vHtml + '<th style="vertical-align: middle; text-align: center; padding-right: 10px; padding-left: 10px; background: #002E4D; color: #FFF;"></th>';
                                    $.each(nomETI, function (index, value) {
                                        vHtml = vHtml + '<th style="vertical-align: middle; text-align: center; padding-right: 10px; padding-left: 10px; background: #002E4D; color: #FFF;">' + nomETI[index] + '</th>';
                                    });
                                    //nomRango[0].data[0] = 10;
                                    //alert(nomRango[0].name);
                                    vHtml = vHtml + '</tr></thead>';
                                    vHtml = vHtml + '<tbody>';
                                    $.each(nomRango, function (index, value) {
                                        vHtml = vHtml + '<tr>';
                                        vHtml = vHtml + '<td style="vertical-align: middle; text-align: left; background: white; color: #002E4D; padding-top: 2px; padding-bottom: 2px;">' + nomRango[index].name + '</td>';
                                        var vData = nomRango[index].data;
                                        $.each(vData, function (index2, value) {
                                            vHtml = vHtml + '<td style="vertical-align: middle; text-align: center; background: white; color: #002E4D; padding-top: 2px; padding-bottom: 2px;">' + vData[index2] + '</td>';
                                            if (!$.isNumeric(totalETI[index2]))
                                                totalETI[index2] = 0;
                                            totalETI[index2] = totalETI[index2] + parseInt(vData[index2]);
                                        });
                                        vHtml = vHtml + '</tr>';
                                    });
                                    vHtml = vHtml + '<tr><td style="vertical-align: middle; text-align: center; padding-right: 10px; padding-left: 10px; background: #002E4D; color: #FFF;">TOTAL</td>';
                                    $.each(totalETI, function (index, value) {
                                        vHtml = vHtml + '<td style="vertical-align: middle; text-align: center; padding-right: 10px; padding-left: 10px; background: #002E4D; color: #FFF;">' + totalETI[index] + '</td>';
                                    });
                                    vHtml = vHtml + '</tr></tbody></table>';
                                    $('#dConsolidado').html(vHtml);
                                    //return;
                                    //alert(JSON.stringify(nomRango));
                                    $('#dChartConsolidado').highcharts({
                                        title: {
                                            text: 'CONSOLIDADO GEIN', x: -20 //center
                                        },
                                        subtitle: {
                                            text: '', x: -20
                                        },
                                        colors: nomColor,
                                        xAxis: {
                                            //tickInterval: 100,
                                            labels: {style: {fontSize: '9px'}},
                                            categories: nomETI
                                        },
                                        yAxis: {
                                            title: {
                                                text: 'Alumnos'
                                            },
                                            min: 0,
                                            plotLines: [{
                                                    value: 0, width: 1, color: '#37b7f3'
                                                }]
                                        },
                                        tooltip: {
                                            valueSuffix: '',
                                            crosshairs: true,
                                            shared: true
                                        },
                                        legend: {
                                            layout: 'horizontal',
                                            align: 'center',
                                            verticalAlign: 'bottom',
                                            //x: -40,
                                            //y: 5,
                                            //floating: true,
                                            borderWidth: 1,
                                            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                                            shadow: true,
                                            reversed: false
                                        },
                                        plotOptions: {
                                            line: {
                                                dataLabels: {
                                                    enabled: true
                                                },
                                                marker: {
                                                    enabled: true,
                                                    radius: 4,
                                                    lineColor: '#666666',
                                                    lineWidth: 1
                                                }
                                            }
                                        },
                                        credits: {
                                            enabled: false
                                        },
                                        series: nomRango
                                    });
                                    $('#tabProy').show();
                                    $('#tabCons').show();
                                    $('#tabProy').removeClass("active");
                                    $('#tabCons').removeClass("active");
                                    $('#tabProy').addClass("active");
                                    $('#dChartLin').show();
                                    $('#dChartBar').hide(0);
                                    $('#tabLinea').show();
                                    habilitar();
                                } else {
                                    habilitar();
                                    $('#mError').html(data.data);
                                    //$('#mError').html('No hay registro de Resumen de GEIN.');
                                }
                            })
                            .fail(function (jqXHR, textStatus, errorThrown) {
                                habilitar();
                                $('#mError').html('Error al Cargar los cuadros de resumenes');
                                //$('#dResumenDeta').html(JSON.stringify(jqXHR));
                            })
                            .always(function () {
                                reLogin(datosOK);
                            });

                } else {
                    habilitar();
                    $('#mError').html(data.data);
                    //$('#mError').html('No hay registro de Resumen de GEIN.');
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                habilitar();
                $('#mError').html('Error al Cargar los cuadros de resumenes');
                //$('#dResumenDeta').html(JSON.stringify(jqXHR));
            })
            .always(function () {
                reLogin(datosOK);
            });
    return;
}