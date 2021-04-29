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
				<div class="enlace">INICIO / OPCIONES / PROCESOS COMERCIALES / MATRÍCULAS / <a href="#">MOROSIDAD</a></div>
			</div>
		</div>
        <div class="opciones">
			<div class="row">
				<div class="col-md-3">
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
				<div class="col-md-3">
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

			</div>
		</div>
        <div class="row">
			<div class="col-sm-12">
				<div class="cuadro aprendizaje">
					<div class="table-responsive">
						<table id="tbmorosidad" class="table">
							<thead>
								<tr>
									<th colspan="3"></th>
									<th colspan="4" style="background-color:#143592;">ALUMNOS MOROSOS</th>
								</tr>
								<tr>
									<th>LINEA</th>
									<th>Total <br> Matriculados</th>
									<th>Alumnos <br>al día</th>
									<th>1 a 3 días</th>
									<th>4 a 7 días</th>
									<th>más de 7 días</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td style="text-align: center;" colspan="7">Seleccione linea y ciclo</td>
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
<style>
#tbmorosidad>thead>tr>th:not(:first-of-type){background-color: #0659fd;color:#fff;}
#tbmorosidad>tbody>tr>td:not(:first-of-type){background-color: #b6c9ea;}
#tbmorosidad>thead>tr>th:not(:first-of-type), #tbmorosidad>tbody>tr>td:not(:first-of-type) {
  text-align: center;
}
#tbmorosidad>thead>tr>th:nth-child(2){background-color:#a2a2a2;}
#tbmorosidad>tbody>tr>td:nth-child(2){background-color:#dcdddf;}
#tbmorosidad, #tbmorosidad>tbody>tr>td {
    border: none !important;
}
#tbmorosidad>thead>tr>th, #tbmorosidad>tbody>tr>td {
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