/********************************************************
 	PROYECTO: Watson Seguimiento y Control
 	MODULO: Principal
 	PROGRAMA: controlador.js
 	Enlaza y sincroniza las funciones de las capas Vista y Modelo
 	Es el programa principal.
 	Programador: RICHARD STEVEEN TORRES GUTIERREZ
    Fecha: 25/Julio/2019
 	ver: 1.0
*********************************************************/

var vista = new Vista();
var sesion = new Sesion();

/***** FUNCIONES MANEJADORAS DE EVENTOS ****************/

	//----- presenta la primera pantalla: LOGIN ---------
	// El objeto vista con el metodo mostrarPlantilla nos pide dos parametros (template, destino)

	window.onload = function(){
		vista.mostrarPlantilla('loginSesion','estructuraPrincipal');
		// vista.mostrarPlantilla('estructuraUsuario','estructuraPrincipal');
		// vista.mostrarPlantilla('sidebarAuditor','sidebarChange');
		// vista.mostrarPlantilla('tituloProgramacion','iconoAcutual');
		// vista.mostrarPlantilla('cuerpoProgramacion','cuerpo');
	}

function vistaInterfazUsuario(){
	vista.mostrarPlantilla('estructuraUsuario','estructuraPrincipal');
	vista.mostrarPlantilla('sidebarAuditor','sidebarChange');
	vista.mostrarPlantilla('tituloProgramacion','iconoAcutual');
	vista.mostrarPlantilla('cuerpoProgramacion','cuerpo');
	$(document).ready(function() {
		    $('#prueba').select2();
	});
}

function vistaProgramacion(){
		vista.mostrarPlantilla('tituloProgramacion','iconoAcutual');
		vista.mostrarPlantilla('cuerpoProgramacion','cuerpo');
		$(document).ready(function() {
		    $('#prueba').select2();
		});
}

function vistaGastos(){
	vista.mostrarPlantilla('tituloGastos','iconoAcutual');
	vista.mostrarPlantilla('cuerpoGastos','cuerpo');
}

function vistaEditarPerfil(){
	vista.mostrarPlantilla('tituloEditarPerfil','iconoAcutual');
	vista.mostrarPlantilla('cuerpoEditarPerfil','cuerpo');
}

function vistaGenerarReportes(){
	vista.mostrarPlantilla('tituloGenerarReportes','iconoAcutual');
	vista.mostrarPlantilla('cuerpoGenerarReportes','cuerpo');
}

function vistaCrearUsuario(){
	vista.mostrarPlantilla('tituloCrearUsuario','iconoAcutual');
	vista.mostrarPlantilla('cuerpoCrearUsuario','cuerpo');
}

function vistaEditarUsuario(){
	vista.mostrarPlantilla('tituloEditarUsuario','iconoAcutual');
	vista.mostrarPlantilla('cuerpoEditarUsuario','cuerpo');
}

function vistaBloquearUsuario(){
	vista.mostrarPlantilla('tituloBloquearUsuario','iconoAcutual');
	vista.mostrarPlantilla('cuerpoBloquearUsuario','cuerpo');
}

function vistaCrearOficina(){
	vista.mostrarPlantilla('tituloCrearOficina','iconoAcutual');
	vista.mostrarPlantilla('cuerpoCrearOficina','cuerpo');
}

function vistaEditarOficina(){
	vista.mostrarPlantilla('tituloEditarOficina','iconoAcutual');
	vista.mostrarPlantilla('cuerpoEditarOficina','cuerpo');
}

function vistaBloquearOficina(){
	vista.mostrarPlantilla('tituloBloquearOficina','iconoAcutual');
	vista.mostrarPlantilla('cuerpoBloquearOficina','cuerpo');
}

function vistaAgregarPGA(){
	vista.mostrarPlantilla('tituloAgregarPGA','iconoAcutual');
	vista.mostrarPlantilla('cuerpoAgregarPGA','cuerpo');
}

function cerrarSesion(){
	vista.mostrarPlantilla('loginSesion','estructuraPrincipal');
}

function mostrarSidebar(){
	$("#sidebar").addClass("sidebarOpen");
	$("#iconoS").hide();
}

function ocultarSidebar(){
	$("#sidebar").removeClass("sidebarOpen");
	setTimeout(function(){$("#iconoS").show();},800);
}

function mostrarModal() {
	$("#modal").removeClass("oculto");
}

function cerrarModal(){
	$("#modal").addClass("oculto");
}

function mostrarModalEditarAuditoria() {
	$("#modalEditarAuditoria").removeClass("oculto");
}

function cerrarModalEditarAuditoria(){
	$("#modalEditarAuditoria").addClass("oculto");
}

function ShowSelected(es){
	if (es = 3) {
		alert("Lol");
	}
}

function reporogramacionAuditoria(opc){
	if (opc == 1) {
		document.getElementById('reprogramacionFechaIni').innerHTML = "";
		document.getElementById('reprogramacionFechaFin').innerHTML = "";
		document.getElementById('reprogramacionAuditor').innerHTML = "";
		document.getElementById('reprogramacionFechaIni').innerHTML = '<input id="reprogramacionFechaIniInput" type="date" class="form-control tamañoInpModal">';
		document.getElementById('reprogramacionFechaFin').innerHTML = '<input id="reprogramacionFechaFinInput" type="date" class="form-control tamañoInpModal">';
		document.getElementById('reprogramacionAuditor').innerHTML = '<input id="reprogramacionAuditorInput" type="text" class="form-control">';
		document.getElementById('reprogramarBtnRep').innerHTML = "";
		document.getElementById('reprogramarBtnRep').innerHTML = '<button onclick="reporogramacionAuditoria(2);" class="btn btn-outline-danger"><i class="fas fa-calendar-alt"></i></button>';
	}else if (opc == 2) {
		let fechaini = document.getElementById('reprogramacionFechaIniInput').value;
		document.getElementById('reprogramacionFechaIni').innerHTML = fechaini;
		let fechafin = document.getElementById('reprogramacionFechaFinInput').value;
		document.getElementById('reprogramacionFechaFin').innerHTML = fechafin;
		let auditor = document.getElementById('reprogramacionAuditorInput').value;
		document.getElementById('reprogramacionAuditor').innerHTML = auditor;
		document.getElementById('reprogramarBtnRep').innerHTML = "";
		document.getElementById('reprogramarBtnRep').innerHTML = '<button onclick="reporogramacionAuditoria(1);" class="btn btn-outline-danger"><i class="fas fa-calendar-alt"></i></button>';
	}
	
}
