<div class="container-fluid">
	<div id="preloader" style="display: block;">
		<div id="status">
		    <div class="spinner">
			    <div class="rect1"></div>
		    	<div class="rect2"></div>
		    	<div class="rect3"></div>
		    </div>
		</div>
	</div>
	<div id="datos_wrapper" class="">
		<div class="row breadcrumbs">
			<div class="col-sm-12">
				<div class="enlace">INICIO / OPCIONES / PROCESOS DE TUTORÍA / ACUERDOS DE ORIENTACIÓN / <a href="#">DETALLE</a></div>
			</div>
		</div>
        <div class="opciones">
			<div class="row">

				<div class="col-md-2">
					<div class="form-group">
						<label class="control-label" for="">CICLO</label>
						<div class="select-down">
							<div class="selectd">
								<span class="placeholder">Seleccionar</span>
								<ul id="selectCiclo">
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-2">
					<div class="form-group">
						<label class="control-label" for="">LÍNEA</label>
						<div class="select-down">
							<div class="selectd">
								<span class="placeholder">Seleccionar</span>
								<ul id="selectLinea">
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-2">
					<div class="form-group">
						<label class="control-label" for="">TUTOR</label>
						<div class="select-down">
							<div class="selectd">
								<span class="placeholder">Seleccionar</span>
								<ul id="selectTutor" >
								</ul>
							</div>
						</div>
					</div>
				</div>
                <div class="col-md-2">
					<div class="form-group">
						<label class="control-label" for="">SALÓN</label>
						<div class="select-down">
							<div class="selectd">
								<span class="placeholder">Seleccionar</span>
								<ul id="selectSalon" >
								</ul>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
        <div class="row">
			<div class="col-sm-12">
				<div class="cuadro aprendizaje">
					<div class="table-responsive" style="max-height:550px">
						<table id="tbfrecuencia" class="table">
							<thead>
								<tr>
									<th>ALUMNO</th>
									<th>SELECCIONADO</th>
									<th>CONV. 1</th>
                                    <th>CONV. 2</th>
                                    <th>CONV. 3</th>
                                    <th>CONV. 4</th>
                                    <th>CONV. 5</th>
                                    <th>CONV. 6</th>
                                    <th>CONV. 7</th>
                                    <th>CONV. 8</th>
                                    <th>CONV. 9</th>
                                    <th>CONV. 10</th>
                                    <th>TOTAL</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td style="text-align: center;" colspan="13">Seleccione Salón</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="row">
						<div class="col-sm-12" style="text-align: center;">
							<button type="button" class="btn btn-pamer" onclick="fnExcelReport();">
								<i class="fa fa-file-excel-o mr-2" aria-hidden="true"></i> Descargar
							</button>
						</div>
					</div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modalConversacion" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div id="conversaciones">
			</div>
		</div>
	</div>
</div>

<div id="modelImage" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modelImage" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-body">
				<img src="" class="img-responsive">
			</div>
		</div>
	</div>
</div>
<div id="modelVideo" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modelVideo" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-body">
				<video controls src="" class="img-responsive" style="width: 100%; ">
			</div>
		</div>
	</div>
</div>
<div id="modelAudio" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modelAudio" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-body">
				<audio controls src="" class="img-responsive" style="height: 54px; width: 100%; ">
			</div>
		</div>
	</div>
</div>
<script>
	$( document ).ready( function()  {
		$('#modelImage').on('hide.bs.modal', function (event) {
			var modal = $(this);
			modal.find('.img-responsive').attr("src", "");
			console.log("33");
		});
		$('#modelAudio').on('hide.bs.modal', function (event) {
			var modal = $(this);
			modal.find('.img-responsive').attr("src", "");
			console.log("33");
		});
		$('#modelVideo').on('hide.bs.modal', function (event) {
			var modal = $(this);
			modal.find('.img-responsive').attr("src", "");
			console.log("33");
		});
	} );
	var webroot = '<?=$this->webroot;?>'
</script>
<style>
.select-down .selectd .placeholder{
    overflow: hidden;
    white-space: nowrap;
	text-overflow: ellipsis;
}
#tbfrecuencia>tbody>tr>td:nth-child(1){text-align:left;text-transform: uppercase;}
#tbfrecuencia>tbody>tr>td:nth-child(2){border-left:1px solid #ddd !important;border-right:1px solid #ddd !important;}
#tbfrecuencia>tbody>tr>td:last-child{border-left:1px solid #ddd !important;}
#tbfrecuencia>tbody>tr>td,#tbfrecuencia>thead>tr>th{text-align:center;}
#tbfrecuencia, #tbfrecuencia>tbody>tr>td {border: none !important;}
#tbfrecuencia>thead>tr>th, #tbfrecuencia>tbody>tr>td {
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 2px solid #ddd;
    padding: 8px;
}
.lds-ripple {
			display: inline-block;
			position: relative;
			width: 80px;
			height: 80px;
		}
		.lds-ripple div {
			position: absolute;
			border: 4px solid #005CFE;
			opacity: 1;
			border-radius: 50%;
			animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
		}
		.lds-ripple div:nth-child(2) {
			animation-delay: -0.5s;
		}
		@keyframes lds-ripple {
			0% {
				top: 36px;
				left: 36px;
				width: 0;
				height: 0;
				opacity: 1;
			}
			100% {
				top: 0px;
				left: 0px;
				width: 72px;
				height: 72px;
				opacity: 0;
			}
		}

</style>