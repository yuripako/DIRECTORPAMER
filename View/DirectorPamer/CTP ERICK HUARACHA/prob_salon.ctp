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
				<div class="enlace">INICIO / OPCIONES / RENDIMIENTO ACADÉMICO / PROBABILIDADES DE INGRESO / <a href="#">POR ALUMNO</a></div>
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
				<div class="col-md-2">
					<div class="form-group">
						<label class="control-label" for="">TIPO DE ALUMNO</label>
						<div class="select-down">
							<div class="selectd">
								<span class="placeholder">Todos</span>
								<ul id="selectTipo" data-value="0">
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
					<div class="container-fluid">
						<div class="row">
							<div class="col-sm-6"><h3><b>Probabilidades de ingreso</b></h3></div>
							<div class="col-sm-6">
								<ul class="prob-list">
									<li>PROBABILIDADES DE INGRESO: </li>
									<li><i class="circular cBlue"></i> MUY ALTA</li>
									<li><i class="circular cGreen"></i> ALTA</li>
									<li><i class="circular cOrange"></i> MEDIA</li>
									<li><i class="circular cRed"></i> BAJA</li>
								</ul>
							</div>
						</div>
					</div>
					
					<div id="tblSimulacros" class="scrollTabla" ></div>
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
.select-down .selectd .placeholder{
    overflow: hidden;
    white-space: nowrap;
	text-overflow: ellipsis;
}
ul.prob-list{list-style: none;margin-top: 20px; margin-bottom: 10px;display: inline-flex;float: right;}
ul.prob-list li{display: inline-flex; align-items: center; font-weight: 700;}
ul.prob-list li i.circular{
	width: 25px;
    height: 25px;
    display: inline-block;
	border-radius: 30%;
    margin-left: 10px;
    margin-right: 5px;
}
.cBlue{background-color: #4173fe;}
.cGreen{background-color: #14e8a5;}
.cOrange{background-color: #ffcc09;}
.cRed{background-color: #ed011e;}

	.clsNota, .clsNMB, .clsNBU, .clsNM, .clsNBA {
	    color: #fff;
	    padding: 5px;
	    border-radius: 8px;
	    width: 100%;
	    height: 32px;
    	display: flex;
	}
	.clsNota {background-color: #4173fe;}
	.clsNMB {background-color: #4173fe;}
	.clsNBU {background-color: #14e8a5;}
	.clsNM {background-color: #ffcc09;}
	.clsNBA {background-color: #ed011e;}
	.clsT{flex: 70%;text-align: center;}
	.clsFAb,.clsFAr,.clsSF{
		flex: 30%;
	    font-size: 27px;
	    align-items: center;
	    line-height: 0.7;
	    font-weight: 700;
	    text-align: center;
	    font-family: 'FontAwesome';
	}
	.clsSF:after{content: "\f068";}
	.clsFAb:after{content: "\f078";}
	.clsFAr:after{content: "\f077";	}
#tblReporteSimu, #tblReporteSimu>tbody>tr>td {border: none !important;font-weight: 600;}
#tblReporteSimu>thead>tr>th, #tblReporteSimu>tbody>tr>td {
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 2px solid #ddd;
    padding: 8px;
}
#tblReporteSimu>tbody>tr>td:nth-child(3){text-transform: uppercase;}
#tblReporteSimu>thead>tr>th,#tblReporteSimu>tbody>tr>td:nth-child(1),#tblReporteSimu>tbody>tr>td:nth-child(2) {text-align: center;}
#tblReporteSimu>tbody>tr>td:nth-child(4),#tblReporteSimu>tbody>tr>td:nth-child(5){border-left:1px solid #ddd !important;border-right:1px solid #ddd !important;text-align: center;}
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
#tblSimulacros.scrollTabla {
    overflow: auto;
    height: 550px;
    white-space: nowrap;
}
#tblSimulacros.scrollTabla::-webkit-scrollbar-thumb{
	    border-radius: 10px;
    	background: #005CFE;
	}
	#tblSimulacros.scrollTabla::-webkit-scrollbar-track{
		border-radius: 10px;
		background: #f1f1f1;

	}
	#tblSimulacros.scrollTabla::-webkit-scrollbar{
		width: 8px;
	}

	#tblSimulacros.scrollTabla::-webkit-scrollbar-thumb:hover {
	  background: #555; 
	}
</style>