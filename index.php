
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Interfaz de Usuario</title>
	<link rel="icon" type="image/vnd.microsoft.icon" href="img/w5.png">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<!-- <link rel="stylesheet" href="icons/css/fontawesome.min.css"> -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="iconss/css/material-design-iconic-font.min.css">
	<link rel="stylesheet" href="css/select2.min.css">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/estilos.css">
	<link rel="stylesheet" href="css/buttons.dataTables.min.css">
	<link rel="stylesheet" href="css/jquery.dataTablas.min.css">

</head>
<body>

	<!-- Sidebar -->
	<div id="estructuraPrincipal">
		
	</div>
	
	<!-- INICIO DE LAS PLANTILLAS DE NAVEGACION -->
	
	<!-- PLANTILLA INTERFAZ LOGIN -->

	<template id="loginSesion">
		<!-- limiter -->
		<div class="fullSize">
			<!-- container-login100 -->
			<div class="fullscreen">
				<!-- wrap-login100 -->
				<div class="mainDrawer">
					<!-- login100-form validate-form -->
					<div class="mainForm sizeValidate">
						<!-- login100-form-title <-->
						<span></span>
						<span class="mainHead"><img class="logo" src="img/w23.png" alt=""><br>Login</span>
						<!-- wrap-input100 validate-input -->
						<form id="login"  class=" formulario_login">
							<div id="documento" class="drawerDivision squareValidate" data-validate="Debe llenar el campo DOCUMENTO">
								<!-- label-input100 -->
								<span class="nameDrawer">Documento</span>
								<!-- input100 -->
								<input onfocus="selection(1)" class="inputLogin drawerInput" id="idUsuario" type="number" name="idUsuario" placeholder="Ingrese su documento">
								<!-- focus-input100 -->
								<span class="focusDrawer1" data-symbol='"\206"'></span>
							</div>
							<div id="mostrar">

							</div>
							<div id="contrasena" class="drawerDivision squareValidate" data-validate="Deb llenar el campo CONTRASEÑA">
								<span class="nameDrawer">Contraseña</span>
								<input onfocus="selection(2)" onkeypress="pulsar(event)" class="inputLogin drawerInput" id="password" type="password" name="password" placeholder="Ingrese su Contrase&ntilde;a">
								<span class="focusDrawer2 fa" data-symbol="\f191"></span>
							</div>
							<div id="mostrar2">

							</div>
						</form>
						<!-- text-right -->
						<div class="splitText">
							<a href="#" class="aLogin"> Olvidaste tu contrase&ntilde;a?</a>
						</div>
						<!-- container-login100-form-btn -->
						<div class="boxButton">
							<!-- wrap-login100-form-btn -->
							<div class="internalBox">
								<!-- login100-form-bgbtn -->
								<div class="splitForm"></div>
								<!-- login100-form-btn -->
								<button onclick="verificarUsuario();" class="buttonLoginA buttonLogin"> INGRESAR </button>
							</div>
						</div>
						<!-- txt1 text-center -->
						
						<!-- flex-c-m -->
					
					</div>
				</div>
			</div>
		</div>
	</template>

	<!-- PLANTILLAS INTERFAZ USUARIO-->
	
	<!-- Plantilla de estructuracion -->
	
	<template id="estructuraUsuario">
		<div id="sidebarChange">
			
		</div>
		<div id="modal" class="modal oculto">
			<div id="allModal">
				
				<div id="headModal" class="col-12">
					<h6 id="cerrar" onclick="cerrarModal();" >X</h6>
					<h3 class="tituloHM" style="color: white;">Auditorias</h3>
				</div>
				<div id="bodyModal" class="col-12 margenBM">
					<div id="inicial">

					</div>
					<!-- <table class="tablaModal table-sm">
						<thead>
							<tr class="colorFondoModal">
								<th>Arqueo</th>
								<th>Hora inicio</th>
								<th>Hora fin</th>
								<th>Auditado</th>
								<th>Diferencia</th>
								<th>Economica</th>
								<th>Accion disciplinaria</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr id="trAuditoria">
								<td><input class="arqueo form-control" type="text" id="idArqueo" name="idAqueo" value="1$ 001" disabled=""></td>
								<td><input class="tamañoInpModal form-control" type="time" id="horaInicio" name="horaInicio" style="width: 150px;"></td>
								<td><input class="tamañoInpModal form-control" type="time" id="horaFin" name="horaFin" style="width: 150px;"></td>
								<td>
									<select class="form-control" id="idAuditado" name="idAuditado" style="width: 400px;">
										<option value="0">Seleccione...</option>
										<option value="1">Carlos Martinez</option>
										<option value="2">Fernanda Oliveros</option>
										<option value="3">Cristina Urueña</option>
									</select>
								</td>
								<td><input class="diferencia form-control" type="text" id="diferencia" name="diferencia" ></td>
								<td><button id="btnDiferencia" class="btn btn-outline-warning" onclick="btnDiferenciaC();" value="1">$1-$150.000</button></td>
								<td>
									<select class="tamañoSelectModal form-control" id="accionDisciplinaria" name="accionDisciplinaria" style="width: 300px;">
										<option value="0">Seleccione...</option>
										<option value="1">Acta de compromiso</option>
										<option value="2">Acta de compromiso para colaborador e involucrados</option>
										<option value="3">Reporte disciplinario</option>
										<option value="4">Ninguna</option>
									</select>
								</td>
								<td><button class="btn btn-outline-info" onclick="guardarAuditoria();"><i class="fas fa-save"></i></button></td>
								<td><button class="btn btn-outline-success" id="checkOk" name="checkOk"><i class="fas fa-check"></i></button></td>
							</tr>
						</tbody>
					</table>
					<form id="formAuditoria" name="formAuditoria">
						<table class="tablaModal table-sm">
							<thead>
								<tr class="colorFondoModal">
									<th>Arqueo</th>
									<th>Hora inicio</th>
									<th>Hora fin</th>
									<th>Auditado</th>
									<th>Diferencia</th>
									<th>Economica</th>
									<th>Accion disciplinaria</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr id="trAuditoria">
									<td><input class="arqueo form-control" type="text" id="idArqueo" name="idAqueo" value="1$ 001" disabled=""></td>
									<td><input class="tamañoInpModal form-control" type="time" id="horaInicio" name="horaInicio" style="width: 150px;"></td>
									<td><input class="tamañoInpModal form-control" type="time" id="horaFin" name="horaFin" style="width: 150px;"></td>
									<td>
										<select class="form-control" id="idAuditado" name="idAuditado" style="width: 400px;">
											<option value="0">Seleccione...</option>
											<option value="1">Carlos Martinez</option>
											<option value="2">Fernanda Oliveros</option>
											<option value="3">Cristina Urueña</option>
										</select>
									</td>
									<td><input class="diferencia form-control" type="text" id="diferencia" name="diferencia" ></td>
									<td><button id="btnDiferencia" class="btn btn-outline-warning" onclick="btnDiferenciaC();" value="1">$1-$150.000</button></td>
									<td>
										<select class="tamañoSelectModal form-control" id="accionDisciplinaria" name="accionDisciplinaria" style="width: 300px;">
											<option value="0">Seleccione...</option>
											<option value="1">Acta de compromiso</option>
											<option value="2">Acta de compromiso para colaborador e involucrados</option>
											<option value="3">Reporte disciplinario</option>
											<option value="4">Ninguna</option>
										</select>
									</td>
									<td><button class="btn btn-outline-info" onclick="guardarAuditoria();"><i class="fas fa-save"></i></button></td>
									<td><button class="btn btn-outline-success" id="checkOk" name="checkOk"><i class="fas fa-check"></i></button></td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
									<th><p class="diferencia letra">Si corresponde a un faltante adicionar el signo menos (-)</p></th>
									<th></th>
									<th></th>
								</tr>
							</tfoot>
						</table>
					</form> -->
					
					<div id="aggAudi"><img class="imgAgregarModal" src="img/icono-agregar-png.png" alt="" onclick="aggAuditoria();"></div>
				</div>
				<!-- <div id="footerModal" class="col-12">
					<p><b>PIE</b></p>
				</div> -->
			</div>
		</div>
		<div id="modalEditarAuditoria" class="modal oculto">
			<div id="allModal">
				
				<div id="headModal" class="col-12">
					<h6 id="cerrar" onclick="cerrarModalEditarAuditoria();" >X</h6>
					<h3 class="tituloHM" style="color: white;">Editar programacion</h3>
				</div>
				<div id="bodyEditModal" class="margenBM">
					<div >
						<form id="formEditProgramacion" name="formEditProgramacion" class="row positionLetter">
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Seleccione Oficina o Punto  V.</label>
								<br>
								<input type="checkbox" id="oficina99" name="oficina99" onclick="selecCatOficina(5);" value="1">
								<label for="oficina99" style="font-size: 14px;">Ofi.</label>
								<input type="checkbox" name="puntoVenta99" id="puntoVenta99" onclick="selecCatOficina(6);" value="2">
								<label for="" style="font-size: 14px;">P.V.</label>
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Oficina o Punto de venta</label>
								<br>
								<select class="tamanañoSelect select2 form-control form-control-sm" name="idOficina99" id="idOficina99" onchange="ShowSelected(3);">
									<option value="1" selected="">Seleccioné...</option>
									<option value="2">20 de Julio</option>
									<option value="3">Carmen de apicala</option>
								</select>
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Seleccione Auditor o Auxiliar A.</label>
								<br>
								<input type="checkbox" name="auditorSel99" id="auditorSel99" onclick="selecCatUsuario(1);" disabled>
								<label for="" style="font-size: 14px;">Auditor</label>
								<input type="checkbox" name="auxiliarSel99" id="auxiliarSel99" onclick="selecCatUsuario(2);" disabled>
								<label for="" style="font-size: 14px;">Auxiliar A.</label>
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Auditor o Auxiliar de Auditoria</label>
								<input class="tamanañoSelect form-control form-control-sm" name="idUsuario99" id="idUsuario99" disabled></input>	
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Fecha de inicio</label>
								<input class="tamanañoSelect form-control form-control-sm" id="fechaInicio99" name="fechaInicio99" type="date" disabled>	
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Fecha de fin</label>
								<input class="tamanañoSelect form-control form-control-sm" id="fechaFin99" name="fechaFin99" type="date" onchange="fechaAut(3);" disabled>
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Dias</label>
								<input class="tamanañoSelect form-control form-control-sm" id="dias99" name="dias99" type="text" disabled>
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Programa</label>
								<select class="tamanañoSelect form-control form-control-sm" name="idPrograma99" id="idPrograma99">
									<option value="1">Seleccioné...</option>
									<option value="2">Programa 1</option>
									<option value="3">Programa 2</option>
								</select>	
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Tipo Audtoria</label>
								<select class="tamanañoSelect form-control form-control-sm" name="idTipoAuditoria99" id="idTipoAuditoria99">
									<option value="0">Seleccioné...</option>
									<option value="1">Auditoria</option>
									<option value="2">Entrega</option>
									<option value="3">Inspeccion</option>
									<option value="4">Visita no planeada</option>
								</select>	
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<br>
								<button class="btn btn-outline-success posBtn" onclick="editarProgramacion();">Editar</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div id="modalReprogramarAuditoria" class="modal oculto">
			<div id="allModal">
				
				<div id="headModal" class="col-12">
					<h6 id="cerrar" onclick="cerrarModalReprogramacion();" >X</h6>
					<h3 class="tituloHM" style="color: white;">Reprogramacion</h3>
				</div>
				<div id="bodyReproModal" class="margenBM">
					<div >
						<form id="formReproProgramacion" name="formReproProgramacion" class="row positionLetter">
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Seleccione Oficina o Punto V.</label>
								<br>
								<input type="checkbox" id="oficina099" name="oficina099" onclick="selecCatOficina(7);" value="1" disabled="">
								<label for="oficina" style="font-size: 14px;">Ofi.</label>
								<input type="checkbox" name="puntoVenta099" id="puntoVenta099" onclick="selecCatOficina(8);" value="2" disabled="">
								<label for="" style="font-size: 14px;">P.V.</label>
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Oficina o Punto de venta</label>
								<br>
								<input class="tamanañoSelect form-control form-control-sm" name="idOficina099" id="idOficina099" disabled></input>
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Seleccione Auditor o Auxiliar A.</label>
								<br>
								<input type="checkbox" name="auditorSel099" id="auditorSel099" onclick="selecCatUsuario(3);">
								<label for="" style="font-size: 14px;">Auditor</label>
								<input type="checkbox" name="auxiliarSel099" id="auxiliarSel099" onclick="selecCatUsuario(4);">
								<label for="" style="font-size: 14px;">Auxiliar A.</label>
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Auditor o Auxiliar de Auditoria</label>
							 	<br>
								<select class="tamanañoSelect select2 form-control form-control-sm" name="idUsuario099" id="idUsuario099" onchange="ShowSelected(3);">
									<option value="1" selected="">Seleccioné...</option>
									<option value="2">20 de Julio</option>
									<option value="3">Carmen de apicala</option>
								</select>	
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Fecha de inicio</label>
								<input class="tamanañoSelect form-control form-control-sm" id="fechaInicio099" name="fechaInicio099" type="date">	
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Fecha de fin</label>
								<input class="tamanañoSelect form-control form-control-sm" id="fechaFin099" name="fechaFin099" type="date" onchange="fechaAut(2);">
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Dias</label>
								<input class="tamanañoSelect form-control form-control-sm" id="dias099" name="dias099" type="text" disabled>
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Programa</label>
								<select class="tamanañoSelect form-control form-control-sm" name="idPrograma099" id="idPrograma099" disabled="">
									<option value="1">Seleccioné...</option>
									<option value="2">Programa 1</option>
									<option value="3">Programa 2</option>
								</select>	
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Tipo Audtoria</label>
								<select class="tamanañoSelect form-control form-control-sm" name="idTipoAuditoria099" id="idTipoAuditoria099" disabled="">
									<option value="0">Seleccioné...</option>
									<option value="1">Auditoria</option>
									<option value="2">Entrega</option>
									<option value="3">Inspeccion</option>
									<option value="4">Visita no planeada</option>
								</select>	
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label for="">Novedad</label>
								<br>
								<select class="tamanañoSelect form-control form-control-sm select2" name="idNovedades" id="idNovedades">
									<option value="0">Seleccioné...</option>
									<option value="1">Auditoria</option>
									<option value="2">Entrega</option>
									<option value="3">Inspeccion</option>
									<option value="4">Visita no planeada</option>
								</select>	
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<label>Observacion</label>
								<br>
								<textarea type="textarea" id="observacion099" name="observacion099" style="min-width: 300px;"></textarea>
							</div>
							<div class="separador col-lg-6 col-md-6 col-sm-6 col-xl-6">
								<br>
								<button class="btn btn-outline-success posBtn" onclick="reprogramacion();">Guardar</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div class="contenedor">
			<div class="cabeza">
				<div class="row col-12">
					<div class="nombreProyecto col-4">
						<img class="logo" src="img/w23.png" alt="">
					</div>
					<div id="iconoAcutual" class="icono col-4">
						<h2><i class="fas fa-building"></i></h2>
					</div>
					<div class="fotoPerfil col-4">
						<h2><i onclick="mostrarSidebar();" class="fas fa-user-circle"></i></h2>
					</div>
				</div>
			</div>
			<div id="cuerpo" class="cuerpo row">
				
			</div>
			<div class="pie">
				<b><small>&copy;  Copyright 2019 - SEAPTO S.A (Auditoria - <a href="mailto:richardtorgut@gmail.com">richardtorgut@gmail.com</a>)</small></b>
			</div>
		</div>
	</template>

	<!-- Plantilla del sidebar para auditor -->

	<template id="sidebarAuditor">
		<div id="sidebar" class=" closeS">
			<div id="logoS">
				<i id="x" class="fas fa-times pointer" onclick="ocultarSidebar();"c></i>
				<a href="#"><img src="img/usuario.png" alt=""></a>
			</div>


			<!-- Menu del sidebar -->
			
			<div id="menu">
				<ul>
					<li><a href="#" onclick="vistaProgramacion();">Programación</a></li>
					<li><a href="#" onclick="vistaGastos();">Gastos</a></li>
					<li><a href="#" onclick="vistaEditarPerfil();">Editar mi perfil</a></li>
					<li><a href="#" onclick="vistaGenerarReportes();">Generar reportes</a></li>
					<li>
						<a href="#subMenu">Gestionar Usuario</a>
						<div id="subMenu">
							<ul>
								<li class="intMenu"><a href="#" onclick="vistaCrearUsuario();">Crear Usuario</a></li>
								<li class="intMenu"><a href="#" onclick="vistaEditarUsuario();">Editar Usuario</a></li>
								<li class="intMenu"><a href="#" onclick="vistaBloquearUsuario();">Bloquear Usuario</a></li>
							</ul>
						</div>
						
					</li>
					<li>
						<a href="#subMenu2">Gestionar Oficina</a>
						<div id="subMenu2">
							<ul>
								<li class="intMenu"><a href="#" onclick="vistaCrearOficina();">Crear Oficina</a></li>
								<li class="intMenu"><a href="#" onclick="vistaEditarOficina();">Editar Oficina</a></li>
								<!--
									
									MODULO DE BLOQUEO 

								<li class="intMenu"><a href="#" onclick="vistaBloquearOficina();">Bloquear Oficina</a></li>
							-->
							</ul>
						</div>
					</li>
					<li>
						<a href="#" onclick="vistaAgregarPGA();">Agregar PGA</a>
					</li>
					<li><a href="" onclick="cerrarSesion();">Cerrar Sesion</a></li>
				</ul>
			</div>

			<!-- Fin menu del sidebar -->
			
			<!-- redes sociales -->
			
			<div id="social">
				<ul>
					<li>
						<a href="#">
							<i class="fab fa-facebook"></i>
						</a>
					</li>
					<li>
						<a href="#">
							<i class="fab fa-twitter"></i>
						</a>
					</li>
					<li>
						<a href="#">
							<i class="fab fa-linkedin"></i>
						</a>
					</li>
				</ul>
				<div id="copyright">
					Copyright &copy; All Rights Reserved
				</div>
			</div>
		</div>
	</template>

	<!-- Fin de la plantilla -->

	<!-- Plantilla del sidebar para auditor -->

	<template id="sidebarAuxiliar">
		<div id="sidebar" class=" closeS">
			<div id="logoS">
				<i id="x" class="fas fa-times pointer" onclick="ocultarSidebar();"c></i>
				<a href="#"><img src="img/usuario.png" alt=""></a>
			</div>


			<!-- Menu del sidebar -->
			
			<div id="menu">
				<ul>
					<li><a href="#" onclick="vistaProgramacion();">Programación</a></li>
					<li><a href="#" onclick="vistaGastos();">Gastos</a></li>
					<li><a href="#" onclick="vistaEditarPerfil();">Editar mi perfil</a></li>
					<li><a href="#" onclick="vistaGenerarReportes();">Generar reportes</a></li>
					<li><a href="" onclick="cerrarSesion();">Cerrar Sesion</a></li>
				</ul>
			</div>

			<!-- Fin menu del sidebar -->
			
			<!-- redes sociales -->
			
			<div id="social">
				<ul>
					<li>
						<a href="#">
							<i class="fab fa-facebook"></i>
						</a>
					</li>
					<li>
						<a href="#">
							<i class="fab fa-twitter"></i>
						</a>
					</li>
					<li>
						<a href="#">
							<i class="fab fa-linkedin"></i>
						</a>
					</li>
				</ul>
				<div id="copyright">
					Copyright &copy; All Rights Reserved
				</div>
			</div>
		</div>
	</template>

	<!-- Fin de la plantilla -->

	<!-- Plantilla para el icono de pantalla actual programacion -->
	
	<template id="tituloProgramacion">
		<h2><i class="fas fa-home"></i></h2>
	</template>

	<!-- Fin de la plantilla -->

	<!-- Plantilla para la programacion de las auditorias -->

	<template id="cuerpoProgramacion">
			<div class="tituloInterno col-lg-4 col-md-4 col-sm-12 col-xl-4">
				<h3>Programación</h3>	
			</div>
			<form class="contenido col-lg-8 col-md-8 col-sm-12 col-xl-8" name="tipoAuditoria" id="tipoAuditoria">
				<div class="opciones row">
					<div class="col-lg-5 col-md-5 col-sm-5 col-xl-5">
						
						<div>
							<input type="checkbox" id="marcarAuditoria" name="marcarAuditoria" onclick="opcCheckbox(1);" style="display: none;" value="1">
							<label for="marcarAuditoria" id="efecAuditoria" class="auditoria" tabindex="1">Auditoria</label>
						</div>
						
					</div>
					<div class="col-lg-5 col-md-5 col-sm-5 col-xl-5">
						<div>
							<input type="checkbox" id="marcarEntregas" name="marcarEntregas" onclick="opcCheckbox(2);" style="display: none;" value="2">
							<label for="marcarEntregas" id="efecEntregas" class="entregas" tabindex="1">Entregas</label>
						</div>
						
					</div>
				</div>
				<div class="espacioOpc row">
					<div class="col-lg-5 col-md-5 col-sm-5 col-xl-5">
						<div>
							<input type="checkbox" id="marcarInspecciones" name="marcarInspecciones" onclick="opcCheckbox(3);" style="display: none;" value="3">
							<label for="marcarInspecciones" id="efecInspecciones" class="inspecciones" tabindex="1">Inspecciones</label>
							
						</div>
						
					</div>
					<div class="col-lg-5 col-md-5 col-sm-5 col-xl-5">
						<div>
							<input type="checkbox" id="marcarVisitaNoPlaneada" name="marcarVisitaNoPlaneada" onclick="opcCheckbox(4);" style="display: none;" value="4">
							<label for="marcarVisitaNoPlaneada" id="efecVisitaNoPlaneada" class="visitaNoPlaneada" tabindex="1">Visita no planeada</label>
							
						</div>
					</div>
					<div id="idTipoAuditoria"></div>
				</div>
			</form>
			<div class="programacionVisita row">
				<div  class="formulario row col-lg-3 col-md-12 col-sm-12 col-xl-3">
					<form id="formProgramacion" name="formProgramacion">
						<div class="separador col-lg-12 col-md-4 col-sm-6 col-xl-12">
							<label for="">Seleccione Oficina o Punto V.</label>
							<input type="checkbox" id="oficina" name="oficina" onclick="selecCatOficina(1);" value="1">
							<label for="oficina" style="font-size: 14px;">Ofi.</label>
							<br>
							<input type="checkbox" name="puntoVenta" id="puntoVenta" onclick="selecCatOficina(2);" value="2">
							<label for="" style="font-size: 14px;">P.V.</label>
							<br>
							<input type="checkbox" name="acopio" id="acopio" onclick="selecCatOficina(9);" value="3">
							<label for="" style="font-size: 14px;">acopio</label>
							
						</div>
						<div class="separador col-lg-12 col-md-4 col-sm-6 col-xl-12">
							<label for="">Oficina o Punto de venta</label>
							<select class="tamanañoSelect select2 form-control form-control-sm" name="idOficina" id="idOficina" onchange="ShowSelected(3);">
								<option value="1" selected="">Seleccioné...</option>
								<option value="2">20 de Julio</option>
								<option value="3">Carmen de apicala</option>
							</select>
						</div>
						<div class="separador col-lg-12 col-md-4 col-sm-6 col-xl-12">
							<label for="">Seleccione Auditor o Auxiliar A.</label>
							<input type="checkbox" name="auditorSel" id="auditorSel" onclick="selecCatUsuario(1);">
							<label for="" style="font-size: 14px;">Auditor</label>
							<br>
							<input type="checkbox" name="auxiliarSel" id="auxiliarSel" onclick="selecCatUsuario(2);">
							<label for="" style="font-size: 14px;">Auxiliar A.</label>
						</div>
						<div class="separador col-lg-12 col-md-4 col-sm-6 col-xl-12">
							<label for="">Auditor o Auxiliar de Auditoria</label>
							<select class="tamanañoSelect select2 form-control form-control-sm" name="idUsuario" id="idUsuario">
								<option value="1">Seleccioné...</option>
								<option value="2">Julian Ospina</option>
								<option value="3">Gabriela</option>
								<option value="4"></option>
							</select>	
						</div>
						<div class="separador col-lg-12 col-md-4 col-sm-6 col-xl-12">
							<label for="">Fecha de inicio</label>
							<input class="tamanañoSelect form-control form-control-sm" id="fechaInicio" name="fechaInicio" type="date">	
						</div>
						<div class="separador col-lg-12 col-md-4 col-sm-6 col-xl-12">
							<label for="">Fecha de fin</label>
							<input class="tamanañoSelect form-control form-control-sm" id="fechaFin" name="fechaFin" type="date" onchange="fechaAut(1);">
						</div>
						<div class="separador col-lg-12 col-md-5 col-sm-6 col-xl-12">
							<label for="">Dias</label>
							<input class="tamanañoSelect form-control form-control-sm" id="dias" name="dias" type="text" disabled>
						</div>
						<div class="separador col-lg-12 col-md-3 col-sm-6 col-xl-12">
							<label for="">Programa</label>
							<select class="tamanañoSelect form-control form-control-sm" name="idPrograma" id="idPrograma">
								<option value="1">Seleccioné...</option>
								<option value="2">Programa 1</option>
								<option value="3">Programa 2</option>
							</select>	
						</div>
						<div class="separadorBoton col-lg-12 col-md-12 col-sm-12 col-xl-3">
						<button class="botonConfirmar tamanañoSelect btn btn-danger" onclick="programacion(1);"> ✓ </button>
					</div>
					</form>
					
				</div>
				
				<div id="tablaProgramacion" class="tamTabla col-lg-9 col-md-12 col-sm-12 col-xl-9">
					<!-- <div class="proStyle">
						<h3>No se encuentran registros de programacion</h3>
						<h5>Realice su programacion para visualizar la tabla</h5>
						<i class="fas fa-exclamation-circle"></i>
					</div> -->
					<!-- <table class="tabla table-sm table-responsive ">
						<thead>
							<tr class="colorFondo">
								<th class="bordes">Fecha inicio</th>
								<th class="bordes">Fecha fin</th>
								<th class="bordes">Dias</th>
								<th class="bordes">Tipo de auditoria</th>
								<th class="bordes">Categoria oficina o punto de venta</th>
								<th class="bordes">Oficina o Punto de venta</th>
								<th class="bordes">Auditor o Auxiliar de auditoria</th>
								<th class="bordes">Programa</th>
								<th colspan="3" class="bordes">Boton</th>
							</tr>
						</thead>
						<tbody class="bordes">
							<tr class="fondoColor bordes">
								<td class="bordes" id="reprogramacionFechaIni">12/07/2019</td>
								<td class="bordes" id="reprogramacionFechaFin">12/07/2019</td>
								<td class="bordes">Entrega</td>
								<td class="bordes">20 de Julio</td>
								<td class="bordes" id="reprogramacionAuditor">Gabriela</td>
								<td class="bordes">Programa..</td>
								<td class=""><button onclick="mostrarModal();" class="btn btn-outline-success"><i class="fas fa-file-alt"></i></button>
								</td>
								<td><button onclick="mostrarModalEditarAuditoria();" class="btn btn-outline-warning"><i class="far fa-edit"></i></button></td>
								<td id="reprogramarBtnRep"><button onclick="reporogramacionAuditoria(1);" class="btn btn-outline-danger"><i class="fas fa-calendar-alt"></i></button></td>
							</tr>
							<tr class="fondoColor bordes">
								<td class="bordes">12/07/2019</td>
								<td class="bordes">12/07/2019</td>
								<td class="bordes">Entrega</td>
								<td class="bordes">20 de Julio</td>
								<td class="bordes">Gabriela</td>
								<td class="bordes">Programa..</td>
								<td class=""><button class="btn btn-outline-success"><i class="fas fa-file-alt"></i></button>
								</td>
								<td><button class="btn btn-outline-warning"><i class="far fa-edit"></i></button></td>
								<td><button class="btn btn-outline-danger"><i class="fas fa-calendar-alt"></i></button></td>
							</tr>
							<tr class="fondoColor bordes">
								<td class="bordes">12/07/2019</td>
								<td class="bordes">12/07/2019</td>
								<td class="bordes">Entrega</td>
								<td class="bordes">20 de Julio</td>
								<td class="bordes">Gabriela</td>
								<td class="bordes">Programa..</td>
								<td class=""><button onclick="vistaAuditorias();" class="btn btn-outline-success"><i class="fas fa-file-alt"></i></button>
								</td>
								<td><button class="btn btn-outline-warning"><i class="far fa-edit"></i></button></td>
								<td><button class="btn btn-outline-danger"><i class="fas fa-calendar-alt"></i></button></td>
							</tr>
							<tr class="fondoColor">
								<td class="bordes">12/07/2019</td>
								<td class="bordes">12/07/2019</td>
								<td class="bordes">Entrega</td>
								<td class="bordes">20 de Julio</td>
								<td class="bordes">Gabriela</td>
								<td class="bordes">Programa..</td>
								<td class=""><button class="btn btn-outline-success"><i class="fas fa-file-alt"></i></button>
								</td>
								<td><button class="btn btn-outline-warning"><i class="far fa-edit"></i></button></td>
								<td><button class="btn btn-outline-danger"><i class="fas fa-calendar-alt"></i></button></td>
							</tr>
						</tbody>
					</table> -->
				</div>
			</div>
	</template>

	<!-- Fin de la platilla de programcion de auditorias -->


	<!-- Plantilla para el icono de pantalla actual gastos -->
	
	<template id="tituloGastos">
		<h2><i class="fas fa-file-invoice-dollar"></i></h2>
	</template>

	<!-- Fin de la plantilla -->

	<!-- Plantilla de gastos -->
	
	<template id="cuerpoGastos">
		<div class="tablaPosition">
			<h2>GASTOS</h2><br>
			<form id="formGastos" name="formGastos">
				<table class="tablaG table-sm table-responsive">
					<tr class="bordes">
						<th class="bordes">Auditor O Auxiliar</th>
						<th class="bordes">
							<input type="checkbox" name="auditorSel" id="auditorSel" onclick="selecCatUsuario(5);" value="1">
							<label> Auditor</label>
							<input type="checkbox" name="auxiliarSel" id="auxiliarSel" onclick="selecCatUsuario(6);" value="2">
							<label> Auxiliar</label>
						</th>
						<td class="bordes" colspan="2"><select class="form-control select2" id="idUsuario" name="idUsuario"><option>Seleccione...</option></select></td>
					</tr>
					<tr class="bordes">
						<th class="bordes">Fecha de inicio</th>
						<td class="bordes"><input class="form-control" type="datetime-local" id="fechaInicio"></td>
						<th class="bordes fFin">Fecha de fin</th>
						<td class="bordes"><input class="form-control" type="datetime-local" id="fechaFin"></td>
					</tr>
					<tr id="trOficina" class="bordes">
						<th colspan="2" class="bordes">
							Oficina o Punto de venta
							<br>	
							<input type="checkbox" id="oficina" name="oficina" onclick="selecCatOficina(3);" value="1">
							<label for="">Ofi.</label>
							&nbsp;&nbsp;&nbsp;
							<input type="checkbox" name="puntoVenta" id="puntoVenta" onclick="selecCatOficina(4);" value="2">
							<label for="">Pdv</label>
						</th>
						<td colspan="2" class="bordes">
							<select class="form-control select2" name="idOficina" id="idOficina" onchange="ShowSelected(3);">
								<option value="0">Seleccion...</option>
								<option value="1">Ricaurte</option>
								<option value="2">Centro</option>
								<option value="3">Jordan</option>
								<option value="4">Salado</option>
							</select>
						</td>
					</tr>

					<tr class="bordes" style="text-align: center">
						<th colspan="4" class="bordes"><img class="imgAgregar" onclick="aggOficina();" src="img/icono-agregar-png.png" alt="">&nbsp; &nbsp; &nbsp;<img id="menos1" class="imgEliminar" onclick="eliOficina();" src="img/menos.png"></th>
					</tr>

					<tr class="bordes" style="text-align: center">
						<th colspan="4" class="bordes">CONCEPTOS DE GASTOS</th>
					</tr>
					
					<tr id="trGasto" class="bordes">
						<th colspan="1" class="bordes">
							<select class="form-control select2" name="conceptoGasto" id="conceptoGasto">
								<option value="0">Seleccion...</option>
								<option value="1 - Transporte, Fletes y acarreos">Transporte, Fletes y acarreos</option>
								<option value="2 - Casino y Restaurantes">Casino y Restaurantes</option>
								<option value="3 - Alojamiento y Manutencio">Alojamiento y Manutencio</option>
								<option value="4 - otros">otros</option>
							</select>
						</th>
						<td colspan="1" class="bordes">
							<input class="form-control" id="primero" name="primero" type="number" onkeyup="replicarTex();">
						</td> 
						<td colspan="2" class="bordes">
							<input class="form-control" id="observacion" name="observacion" type="textarea" placeholder="Observacion">
						</td>
					</tr>
					<tr class="bordes" style="text-align: center">
						<th colspan="4" class="bordes"><img class="imgAgregar" onclick="aggConcepGasto();" src="img/icono-agregar-png.png" alt="">&nbsp; &nbsp; &nbsp;<img id="menos2" class="imgEliminar" onclick="eliConcepGasto();" src="img/menos.png"></th>
					</tr>
					<tr class="bordes">
						<th colspan="2" class="bordes">
							TOTAL
						</th>
						<td colspan="2" class="bordes">
							<p id="segundo" ></p>
						</td>
					</tr>
				</table>
			</form>
			<div id="btnConfir"class="btonConfGasto">
				<button class="btn btn-outline-success btnConf" onclick="crearGasto();">Confirmar</button>
			</div>
		</div>
	</template>
	
	<!-- Fin de la plantilla de gastos -->

	<!-- Plantilla para el icono de pantalla actual editar perfil  -->
	
	<template id="tituloEditarPerfil">
		<h2><i class="fas fa-user-edit"></i></h2>
	</template>

	<!-- Fin de la plantilla -->

	<!-- Plantilla editar perfil -->

	<template id="cuerpoEditarPerfil">
		<div class="editarPerfil">
			<div class="col-12">
				<h2>Editar Perfil</h2>
			</div>
			
			<form id="formEditarMiusuario" name="formEditarMiusuario">
				<div class="row col-12 formEdit">
					<div class="row col-12">
						<div class="col-12">
							<label class="">ID</label>
						</div>
						<div class="col-12">
							<input class="form-control tamañoCajon" type="text" id="idUsuario" disabled>
						</div>
					</div>
					<div class="row col-6 espacio">
						<div class="col-12">
							<label class="">Nombre</label>
						</div>
						<div class="col-12">
							<input class="form-control" type="text" id="nombreUsuario">
						</div>
					</div>
					<div class="row col-6 espacio">
						<div class="col-12">
							<label for="">Apellido</label>
						</div>
						<div class="col-12">
							<input class="form-control" type="text" id="apellidoUsuario">
						</div>
					</div>
					<div class="row col-12 espacio">
						<div class="col-12">
							<label for="">Contraseña actual</label>
						</div>
						<div class="col-12">
							<input class="form-control tamañoCajon" type="password" id="passwordAnt">
						</div>
					</div>
					<div class="row col-6 espacio">
						<div class="col-12">
							<label for="">Contraseña nueva</label>
						</div>
						<div class="col-12">
							<input class="form-control" type="password" id="password">
							<p></p>
						</div>
					</div>
					<div class="row col-6 espacio">
						<div class="col-12">
							<label for="">Confirme la contraseña</label>
						</div>
						<div class="col-12">
							<input class="form-control" type="password" id="passwordConf" onkeyup="confirmarContra();">
							<p id="ms"></p>
						</div>
					</div>
				</div>
			</form>
			<div class="offset-9 col-3">
				<button class="btn btn-outline-info btnActualizar" id="actualizar" onclick="editarUsu();">Actualizar</button>
			</div>
		</div>
	</template>

	<!-- Fin de la plantilla editar perfil -->

	<!-- Plantilla para el icono de pantalla actual generar reportes -->

	<template id="tituloGenerarReportes">
		<h2><i class="fas fa-file-download"></i></h2>
	</template>

	<!-- Fin de la plantilla -->

	<!-- Plantilla generar reporte -->
	<template id="cuerpoGenerarReportes">

		<div class="reportesGenerales col-12">
			<h2>Generar reportes</h2>
			<div class="row col-12 reportesInterno">
				<div class="col-12">
					<h4>Programacion</h4>
					<div class="row col-12 espaciado">
						<div class="col-6">
							<label for="">Fecha inicio</label>
							<input class="form-control" type="date" id="fechaInicioP" name="fechaInicioP">
						</div>
						<div class="col-6">
							<label for="">Fecha fin</label>
							<input class="form-control" type="date" id="fechaFinP" name="fechaFinP">
						</div>
						<div class="col-12 espaciadoBtn">
							<button class="btn btn-outline-warning" onclick="generarReporteProgramacion();">Generar</button>
						</div>
					</div>
					<div class="tamTabla espaciadoBtn">
						<table id="reporteProgramacion" class="table-sm" style="width: 2400px;">
							<thead class="bordes">
								<tr class="colorFondoRep">
									<th>Programacion #</th>
									<th>fechaInicio</th>
									<th>fechaFin</th>
									<th>Dias</th>
									<th>ID</th>
									<th>Tipo</th>
									<th>ID</th>
									<th>OFI - PDV</th>
									<th>ID</th>
									<th>Nombre Auditor</th>
									<th>o Auxiliar de Auditoria</th>
									<th>ID</th>
									<th>Programa</th>
									<th>ID</th>
									<th>Tipo de Auditoria</th>
								</tr>
							</thead>
							<tbody id="bodyReportesProgra" class="bordes">
								
							</tbody>
						</table>
					</div>
					
				</div>
				<div class="col-12">
					<h4>Auditorias</h4>
					<div class="row col-12 espaciado">
						<div class="col-6">
							<label for="">Fecha inicio</label>
							<input class="form-control" type="date" id="fechaInicio" name="fechaInicio">
						</div>
						<div class="col-6">
							<label for="">Fecha fin</label>
							<input class="form-control" type="date" id="fechaFin" name="fechaFin">
						</div>
						<div class="col-12 espaciadoBtn">
							<button class="btn btn-outline-warning" onclick="generarReporteAuditoria();">Generar</button>
						</div>
					</div>
					<div class="tamTabla espaciadoBtn">
						<table id="reporteAuditoria" class="table-sm" style="width: 2400px;">
							<thead class="bordes">
								<tr>
									<th class="bordes" >Programacion #</th>
									<th class="bordes" >fechaInicio</th>
									<th class="bordes" >fechaFin</th>
									<th class="bordes" >Dias</th>
									<th class="bordes" >ID</th>
									<th class="bordes"  >Tipo</th>
									<th class="bordes"  >ID</th>
									<th class="bordes"  >Oficina o Punto de venta</th>
									<th class="bordes"  >ID</th>
									<th class="bordes" >Nombre Auditor</th>
									<th class="bordes" >Apellidos Auditor</th>
									<th class="bordes" >ID</th>
									<th class="bordes"  >Programa</th>
									<th class="bordes" >ID</th>
									<th class="bordes" >Tipo Auditoria</th>
									<th class="bordes" >Auditoria #</th>
									<th class="bordes"  >Hora De Inicio</th>
									<th class="bordes">Hora Fin</th>
									<th class="bordes">Auditado #</th>
									<th class="bordes">Nombre Auditado</th>
									<th class="bordes">Diferencia</th>
									<th class="bordes">Rango</th>
									<th class="bordes">Accion Disciplinaria</th>
									<th class="bordes">Cod Arqueo</th>
									<th class="bordes"># Arqueo</th>
								</tr>
							</thead>
							<tbody id="bodyReportes" class="bordes">
								<tr class="bordes">
									<td>01</td>
									<td>Maria jose</td>
									<td>12/08/2019</td>
									<td>Carmen</td>
								</tr>
								<tr class="bordes">
									<td>01</td>
									<td>Maria jose</td>
									<td>12/08/2019</td>
									<td>Carmen</td>
								</tr>
								<tr class="bordes">
									<td>01</td>
									<td>Maria jose</td>
									<td>12/08/2019</td>
									<td>Carmen</td>
								</tr>
								<tr class="bordes">
									<td>01</td>
									<td>Maria jose</td>
									<td>12/08/2019</td>
									<td>Carmen</td>
								</tr>
								<tr class="bordes">
									<td>01</td>
									<td>Maria jose</td>
									<td>12/08/2019</td>
									<td>Carmen</td>
								</tr>
							</tbody>
						</table>
					</div>
					
				</div>
				<div class="col-12 rpGastos">
					<h4>Gastos</h4>
					<div class="row col-12 espaciado">
						<div class="col-6">
							<label for="">Fecha inicio</label>
							<input class="form-control" type="date" id="fechaInicioG" name="fechaInicioG">
						</div>
						<div class="col-6">
							<label for="">Fecha fin</label>
							<input class="form-control" type="date" id="fechaFinG" name="fechaFinG">
						</div>
						<div class="col-12 espaciadoBtn">
							<button class="btn btn-outline-warning" onclick="generarReporteGasto();">Generar</button>
						</div>
					</div>
					<div class="tamTabla espaciadoBtn">
						<table id="reporteGasto" class="table-sm" style="width: 1800px;">
							<thead>
								<tr class="bordes">
									<th class="bordes">Gasto #</th>
									<th class="bordes">Fecha inicio</th>
									<th class="bordes">Fecha fin</th>
									<th class="bordes">Oficina</th>
									<th class="bordes">Concepto de gasto</th>
									<th class="bordes">Observacion</th>
									<th class="bordes">Valores parciales</th>
									<th class="bordes">Total</th>
									<th class="bordes">Usuario</th>
								</tr>
							</thead>
							<tbody id="bodyReprtGastos" class="bordes">
								<tr>
									<td>09</td>
									<td>24/07/2019</td>
									<td>Gabriela</td>
									<td>Chicoral</td>
									<td>$120.000</td>
								</tr>
								<tr>
									<td>09</td>
									<td>24/07/2019</td>
									<td>Gabriela</td>
									<td>Chicoral</td>
									<td>$120.000</td>
								</tr>
								<tr>
									<td>09</td>
									<td>24/07/2019</td>
									<td>Gabriela</td>
									<td>Chicoral</td>
									<td>$120.000</td>
								</tr>
								<tr>
									<td>09</td>
									<td>24/07/2019</td>
									<td>Gabriela</td>
									<td>Chicoral</td>
									<td>$120.000</td>
								</tr>
								<tr>
									<td>09</td>
									<td>24/07/2019</td>
									<td>Gabriela</td>
									<td>Chicoral</td>
									<td>$120.000</td>
								</tr>
							</tbody>
						</table>
					</div>
					
				</div>
				<div class="col-12 rpGastos">
					<h4>Historial de programacion</h4>
					<div class="row col-12 espaciado">
						<div class="col-6">
							<label for="">Fecha inicio</label>
							<input class="form-control" type="date" id="fechaInicioH" name="fechaInicioH">
						</div>
						<div class="col-6">
							<label for="">Fecha fin</label>
							<input class="form-control" type="date" id="fechaFinH" name="fechaFinH">
						</div>
						<div class="col-12 espaciadoBtn">
							<button class="btn btn-outline-warning" onclick="generarReporteHistorial();">Generar</button>
						</div>
					</div>
					<div class="tamTabla espaciadoBtn">
						<table id="reporteHistorialProgramacion" class="tabla table-sm display" style="width: 2800px;">
							<thead>
								<tr class="bordes">
									<th class="bordes" colspan="11">Reprogramacion</th>
									<th class="bordes" colspan="3">Programacion actual</th>
								</tr>
								<tr class="bordes">
									<th class="bordes">ID #</th>
									<th class="bordes">Fecha inicio</th>
									<th class="bordes">Fecha fin</th>
									<th class="bordes">Dias</th>
									<th class="bordes">Oficina</th>
									<th class="bordes">Nombre usuario</th>
									<th class="bordes">Programa</th>
									<th class="bordes">Fecha reprogramacion</th>
									<th class="bordes">Novedad</th>
									<th class="bordes">Observacion</th>
									<th class="bordes">ID programacion</th>
									<th class="bordes">Fecha inicio</th>
									<th class="bordes">Fecha fin</th>
									<th class="bordes">Nombre usuario</th>
								</tr>
							</thead>
							<tbody id="bodyReprtHistorial" class="bordes">
								<tr>
									<td>09</td>
									<td>24/07/2019</td>
									<td>Gabriela</td>
									<td>Chicoral</td>
									<td>$120.000</td>
								</tr>
								<tr>
									<td>09</td>
									<td>24/07/2019</td>
									<td>Gabriela</td>
									<td>Chicoral</td>
									<td>$120.000</td>
								</tr>
								<tr>
									<td>09</td>
									<td>24/07/2019</td>
									<td>Gabriela</td>
									<td>Chicoral</td>
									<td>$120.000</td>
								</tr>
								<tr>
									<td>09</td>
									<td>24/07/2019</td>
									<td>Gabriela</td>
									<td>Chicoral</td>
									<td>$120.000</td>
								</tr>
								<tr>
									<td>09</td>
									<td>24/07/2019</td>
									<td>Gabriela</td>
									<td>Chicoral</td>
									<td>$120.000</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</template>

	<!-- Fin de la plantilla generar reportes -->

	<!-- Plantilla del icono de la pantalla actual crear usuario -->

	<template id="tituloCrearUsuario">
		<h2><i class="fas fa-user-plus"></i></h2>
	</template>

	<!-- Fin de la plantilla -->

	<!-- Plantilla crear usuario -->

	<template id="cuerpoCrearUsuario">
		<div class="crearUsuario">
			<h2>Crear Usuario</h2>
			<div class="centrar">
				<form id="formCrearUsuario" name="formCrearUsuario">
					<div class="row col-12">
						<div class="col-12 topEspacio">
							<label for="">Seleccione una categoria</label>
							<select onchange="selCrearUsuario();" class="form-control topEspaciado" name="idCatUsuario" id="idCatUsuario">
								<!-- <option value="0">Seleccione...</option>
								<option value="1">Auditor</option>
								<option value="2">Auxiliar de Auditoria</option>
								<option value="3">Administrador de Oficina</option>
								<option value="4">Auxiliar de Oficina</option>
								<option value="5">Asesor de Venta</option>
								<option value="6">Auxiliar de Premio</option> -->
							</select>	
						</div>
						<div class="col-12 topEspacio">
							<label for="">Documento</label>
							<input id="idUsuario" name="idUsuario" class="form-control topEspaciado" type="text">
						</div>
						<div class="col-6 topEspacio">
							<label for="">Nombre</label>
							<input id="nombreUsuario" name="nombreUsuario" class="form-control topEspaciado" type="text">
						</div>
						<div id="campApellido" class="col-6 topEspacio">
							<label for="">Apellido</label>
							<input id="apellidoUsuario" name="apellidoUsuario" class="form-control topEspaciado" type="text">
						</div>
						<!-- <div id="opcContrato" class="col-12 topEspacio">
							<label for="">Tipo de contrato</label>
							<br><br>
							<input type="checkbox">
							<label for="">NOMINA</label>
							<br><br>
							<input type="checkbox">
							<label for="">COMISION PDV</label>
						</div> -->
					</div>
					
				</form>
				<div class="btnCrearUsuario">
					<button onclick="crearUsuario();" class="btn btn-outline-primary"> Crear usuario </button>
				</div>
			</div>
		</div>
	</template>

	<!-- Fin de la plantilla crear usuario -->

	<!-- Plantilla  del icono de la pantalla actual editar usuario -->

	<template id="tituloEditarUsuario">
		<h2><i class="fas fa-user-edit"></i></h2>
	</template>

	<!-- Fin de la plantilla -->

	<!-- Plantilla editar usuario -->

	<template id="cuerpoEditarUsuario">
		<div class="editarPerfilUsuario col-6">
			<h2>Editar Usuario</h2>
			<label class="espacioSelect" for="">Seleecione una categoria</label>
			<select class="form-control select2 espacioSelect selectEs" name="idCatUsuario" id="idCatUsuario" onchange="ShowSelected(1);">
				<option value="0">Seleccione...</option>
				<option value="1">Auditor</option>
				<option value="2">Auxiliar de Auditoria</option>
			</select>
			<div class="btnBuscar">
				<button class="btn btn-outline-dark">Buscar</button>
			</div>
			<div class="tableEditar">
				<table id="tablaUsuarios" class="tablaG table-sm table-responsive">
					<thead>
						<tr >
							<th class="bordes">Documento</th>
							<th class="bordes">Nombre</th>
							<th class="bordes">Apellido</th>
							<th class="bordes"></th>
						</tr>
					</thead>
					<tbody id="bodyTable">
						<!-- <tr>
							<td class="bordes">12314515</td>
							<td class="bordes">Julian</td>
							<td class="bordes">Ospina</td>
							<td class="bordes"><button class="btn btn-outline-secondary">Editar</button></td>
						</tr>
						<tr>
							<td class="bordes">63252323</td>
							<td class="bordes">Were</td>
							<td class="bordes">Were</td>
							<td class="bordes"><button class="btn btn-outline-secondary">Editar</button></td>
						</tr> -->
					</tbody>
					<tfoot>
						<tr>
							<th class="bordes">Documento</th>
							<th class="bordes">Nombre</th>
							<th class="bordes">Apellido</th>
							<th class="bordes"></th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
		<div id="ubForm" class="formEdicion col-5">
			<!-- <form id="formEdit" name="formEdit">
				<label for="">Documento</label>
				<input class="form-control espacioSelect" type="text">
				<label class="espacioSelect" for="">Nombre</label>
				<input class="form-control espacioSelect" type="text">
				<label class="espacioSelect" for="">Apellido</label>
				<input class="form-control espacioSelect" type="text">
				<label class="espacioSelect" for="">Contraseña</label>
				<input class="form-control espacioSelect" type="text">
			</form>
			<div class="btnAct col-12">
				<button class="btn btn-outline-secondary btnR">Actualizar</button>
			</div> -->
		</div>
	</template>

	<!-- Fin de la platilla editar usuario -->

	<!-- Plantilla del icono de la pantalla actual bloquear usuario -->

	<template id="tituloBloquearUsuario">
		<h2><i class="fas fa-user-lock"></i></h2>
	</template>

	<!-- Fin de la plantilla -->

	<!-- Plantilla bloquear oficina -->

	<template id="cuerpoBloquearUsuario">
		<div class="bloquearUsuario col-6">
			<h2>Bloquear Usuario</h2>
			<label class="espacioSelect" for="">Seleecione una categoria</label>
			<select class="form-control espacioSelect selectEs select2" name="idCatUsuario" id="idCatUsuario" onchange="ShowSelected(2);">
				<option value="0">Seleccione...</option>
				<option value="1">Auditor</option>
				<option value="2">Auxiliar de Auditoria</option>
			</select>
			<div class="btnBuscar">
				<button class="btn btn-outline-dark">Buscar</button>
			</div>
			<div class="tableEditar">
				<!-- <table class="tabla table-sm table-responsive">
					<thead>
						<tr >
							<th class="bordes">Documento</th>
							<th class="bordes">Nombre</th>
							<th class="bordes">Apellido</th>
							<th class="bordes"></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="bordes">12314515</td>
							<td class="bordes">Julian</td>
							<td class="bordes">Ospina</td>
							<td class="bordes"><button class="btn btn-outline-secondary">Editar</button></td>
						</tr>
						<tr>
							<td class="bordes">63252323</td>
							<td class="bordes">Were</td>
							<td class="bordes">Were</td>
							<td class="bordes"><button class="btn btn-outline-secondary">Editar</button></td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th class="bordes">Documento</th>
							<th class="bordes">Nombre</th>
							<th class="bordes">Apellido</th>
							<th class="bordes"></th>
						</tr>
					</tfoot>
				</table> -->
			</div>
		</div>
		<div class="tablaBloq col-6">
			<table id="tablaUsuarios" class="tablaG table-responsive">
				
			</table>
		</div>
	</template>

	<!-- Fin de la plantilla bloquear usuario -->

	<!-- Plantilla del icono de la pantalla actual crear oficina -->
	
	<template id="tituloCrearOficina">
		<h2><i class="fas fa-building"></i></h2>
	</template>

	<!-- Fin de la plantilla -->

	<!-- Plantilla crear oficina -->

	<template id="cuerpoCrearOficina">
		<div class="crearUsuario">
			<h2>Crear Oficina</h2>
			<div class="centrar">
				<form id="formCrearOficina" name="formCrearOficina">
					<div class="row col-12">
						<div class="col-12 topEspacio">
							<label for="">Seleccione una categoria</label>
							<select class="form-control topEspaciado" name="idCatOficina" id="idCatOficina">
								<option value="0">Seleccione...</option>
								<option value="1">Oficina</option>
								<option value="2">Punto de venta</option>
							</select>	
						</div>
						<div class="col-12 topEspacio">
							<label for="">Codigo</label>
							<input class="form-control topEspaciado" type="text" name="idOficina" id="idOficina">
						</div>
						<div class="col-6 topEspacio">
							<label for="">Nombre</label>
							<input class="form-control topEspaciado" type="text" name="nombreOficina" id="nombreOficina">
						</div>
						<div class="col-6 topEspacio">
							<label for="">Ciudad</label>
							<input class="form-control topEspaciado" type="text" name="ubicacion" id="ubicacion">
						</div>
					</div>
					
				</form>
				<div class="btnCrearUsuario">
					<button class="btn btn-outline-primary" onclick="crearOficina();"> Crear oficina </button>
				</div>
			</div>
		</div>
	</template>

	<!-- Fin de la plantilla crear usuario -->

	<!-- Plantilla del icono de la pantalla actual editar oficina -->

	<template id="tituloEditarOficina">
		<h2><i class="fas fa-clinic-medical"></i></h2>
	</template>

	<!-- Fin de la platnilla -->

	<!-- Plantilla Editar Oficina -->

	<template id="cuerpoEditarOficina">
		<div class="editarPerfilOficina col-6">
			<h2>Editar Oficina</h2>
			<label class="espacioSelect" for="">Seleecione una categoria</label>
			<select class="form-control espacioSelect selectEs select2" onchange="ShowSelected(4);" name="idCatOficina" id="idCatOficina">
				<option value="0">Seleccione...</option>
				<option value="1">Oficina</option>
				<option value="2">Punto de venta</option>
			</select>
			<div class="btnBuscar">
				<button class="btn btn-outline-dark">Buscar</button>
			</div>
			<div class="tableEditar">
				<table class="table-sm table-responsive" id="tablaOfi">
					<thead>
						<tr >
							<th class="bordes">Codigo</th>
							<th class="bordes">Nombre</th>
							<th class="bordes">ubicacion</th>
							<th class="bordes"></th>
						</tr>
					</thead>
					<tbody id="tbodyOficinas">
						
					</tbody>
					<tfoot>
						<tr>
							<th class="bordes">Codigo</th>
							<th class="bordes">Nombre</th>
							<th class="bordes">Ciudad</th>
							<th class="bordes"></th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
		<div class="formEdicion col-5">
			<form id="frmEditOfi">
				<label for="">Codigo</label>
				<input class="form-control espacioSelect" type="text" id="idOficina" name="idOficina" disabled="">
				<label class="espacioSelect" for="">Nombre</label>
				<input class="form-control espacioSelect" type="text" id="nombreOficina" name="nombreOficina">
				<label class="espacioSelect" for="">Ciudad</label>
				<input class="form-control espacioSelect" type="text" id="ubicacion" name="ubicacion">
			</form>
			<div class="btnAct col-12">
				<button class="btn btn-outline-secondary btnR" onclick="editarOfi();">Actualizar</button>
			</div>
		</div>
	</template>

	<!-- Fin de la plantilla editar oficina -->

	<!-- Plantilla del icono de la pantalla actual bloquear oficina -->

	<template id="tituloBloquearOficina">
		<h2><i class="fas fa-house-damage"></i></h2>
	</template>

	<!-- Fin de la plantilla -->

	<!-- Plantilla bloquear oficina -->

	<template id="cuerpoBloquearOficina">
		<div class="bloquearOficina col-6">
			<h2>Bloquear Oficina</h2>
			<label class="espacioSelect" for="">Seleecione una categoria</label>
			<select class="form-control espacioSelect selectEs select2" onchange="ShowSelected(5);" name="idCatOficina" id="idCatOficina">
				<option value="0">Seleccione...</option>
				<option value="1">Oficina</option>
				<option value="2">Punto de venta</option>
			</select>
			<div class="btnBuscar">
				<button class="btn btn-outline-dark">Buscar</button>
			</div>
		</div>
		<div class="tablaBloq col-6">
			<table id="tablaOfi" class="table-responsive">
					<thead>
						<tr >
							<th class="bordes">Codigo</th>
							<th class="bordes">Nombre</th>
							<th class="bordes">Ubicacion</th>
							<th class="bordes"></th>
						</tr>
					</thead>
					<tbody id="tbodyOficinas">
						<tr>
							<td class="bordes">3</td>
							<td class="bordes">PAPELERIA</td>
							<td class="bordes">CALLE 10 N. 10-04</td>
							<td class="bordes"><button class="btn btn-outline-danger">Bloqueado</button></td>
						</tr>
						<tr>
							<td class="bordes">20</td>
							<td class="bordes">EMPRESAS UNIDAS</td>
							<td class="bordes">CALLE 17 11-62</td>
							<td class="bordes"><button class="btn btn-outline-success">Habilitado</button></td>
						</tr>
						<tr>
							<td class="bordes">37</td>
							<td class="bordes">LA IGLESIA</td>
							<td class="bordes">CRA. 9 NO. 3-96</td>
							<td class="bordes"><button class="btn btn-outline-danger">Bloqueado</button></td>
						</tr>
						<tr>
							<td class="bordes">74</td>
							<td class="bordes">VILLA CATALINA</td>
							<td class="bordes">MZ. G5 CASA 5</td>
							<td class="bordes"><button class="btn btn-outline-danger">Bloqueado</button></td>
						</tr>
						<tr>
							<td class="bordes">104</td>
							<td class="bordes">MARTIRES 2</td>
							<td class="bordes">CRA. 2 NO. 37-15 LOS MARTIRES</td>
							<td class="bordes"><button class="btn btn-outline-success">Habilitado</button></td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th class="bordes">Documento</th>
							<th class="bordes">Nombre</th>
							<th class="bordes">Apellido</th>
							<th class="bordes"></th>
						</tr>
					</tfoot>
				</table>
		</div>
	</template>

	<!-- Fin de la plantilla bloquear oficina-->

	<!-- Plantilla del icono de la pantalla  actual agregar pga -->

	<template id="tituloAgregarPGA">
		<h2><i class="fas fa-folder-plus"></i></h2>
	</template>

	<!--Fin de la plantilla -->

	<!-- Plantilla agregar pga -->

	<template id="cuerpoAgregarPGA">
		<div class="agregarPGA row">
			<div class="col-12">
				<h2>AGREGAR PGA</h2>
			</div>
			<div id="proAgg" class="col-6">
				<h4>Programa</h4>
				<br>
				<div class="">
					<form class="row" id="formAggProg" name="formAggProg">
						<div class="col-12">
							<Label>Nombre del programa</Label>
						</div>
						<div class="col-12">
							<input class="form-control" type="text" id="programa" name="programa">
						</div>
					</form>
				</div>
				<button class="btn btn-outline-success btnSpace" onclick="agregarPrograma();"> Agregar </button>
			</div>
			<div id="concAgg" class="col-6">
				<h4>Concepto de Gasto</h4>
				<br>
				<div>
					<form class="row" id="formAggConcep" name="formAggConcep">
						<div  class="col-12">
							<label for="">Nuevo concepto de gasto</label>
						</div>
						<div class="col-12">
							<input class="form-control" type="text" id="conceptoGasto">
						</div>
					</form>
				</div>
				<button class="btn btn-outline-success btnSpace" onclick="agregarConceptoGasto();">Agregar</button>
			</div>
			<div id="arqueAgg" class="col-12">
				<h4>Prefijo Arquero de Caja</h4>
				<br>
				<div>
					<form class="row" id="formAggArqueo" name="formAggArqueo">
						<div class="col-6">
							<label for="">Prefijo de arqueo</label>
							<input class="form-control" type="number" name="idArqueo" id="idArqueo">
						</div>
						<div class="col-6">
							<label for="">Documento del usuario</label>
							<select class="form-control select2" name="idUsuario" id="idUsuario">
								<option value="0">Seleccione...</option>
								<option value="1">15545113</option>
								<option value="2">24846421</option>
								<option value="3">34879464</option>
							</select>
						</div>
					</form>
				</div>
				<button class="btn btn-outline-success btnSpace" onclick="agregarAsignarArqueo();">Agregar</button>
			</div>
		</div>
	</template>

	<!-- Fin de la plantilla agregar pga -->
</body>
<script src="js/jQuery_v331.js"></script>
<script src="js/jquery-3.3.1.js"></script>
<script src="iconss/js/font.js"></script>
<script src="js/select2.min.js"></script>
<script src="js/moment.min.js"></script>
<script src="js/modelo.js"></script>
<script src="js/vista.js"></script>
<script src="js/controlador.js"></script>
<script src="js/jquery.dataTables.min.js"></script>
<script src="js/dataTables.buttons.min.js"></script>
<script src="js/jszip.min.js"></script>
<script src="js/pdfmake.min.js"></script>
<script src="js/vfs_fonts.js"></script>
<script src="js/buttons.html5.min.js"></script>


</html>