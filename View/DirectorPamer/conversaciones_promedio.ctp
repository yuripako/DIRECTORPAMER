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
				<div class="enlace">INICIO / OPCIONES / PROCESOS DE TUTORÍA / ACUERDOS DE ORIENTACIÓN / <a href="#">N.° DE CONVERSACIONES PROMEDIO</a></div>
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
                                    <li onclick="loadtutores(1,this);">Católica Talento</li>
                                    <li onclick="loadtutores(31,this);">Virtual San Marcos</li>
                                    <li onclick="loadtutores(36,this);">Virtual UNI</li>
                                    <li onclick="loadtutores(37,this);">Virtual Privado</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

                <div class="col-md-3">
					<div class="form-group">
						<label class="control-label" for="">TIPO DE ALUMNO</label>
						<div class="select-down">
							<div class="selectd">
								<span class="placeholder">TODOS</span>
								<ul id="selectTipo" >
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
						<table id="tbpromedio" class="table">
							<thead>
								<tr>
									<th>CICLO</th>
									<th>LINEA</th>
									<th>SALON</th>
									<th>TUTOR</th>
									<th>NRO ALUMNOS POR SALÓN</th>
									<th>N° DE <br>CONVERSACIONES</th>
									<th>PROMEDIO DE CONVERSACIÓN</th>
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
#tbpromedio>tbody>tr>td:not(:first-of-type){border-left:1px solid #ddd !important;}
#tbpromedio>tbody>tr>td,#tbpromedio>thead>tr>th{text-align:center;}
#tbpromedio, #tbpromedio>tbody>tr>td {border: none !important;}
#tbpromedio>thead>tr>th, #tbpromedio>tbody>tr>td {
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