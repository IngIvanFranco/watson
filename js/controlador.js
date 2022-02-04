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
var usuario = new Usuario();
var programming = new Programming();
var gasto = new Gasto();
var auditorias = new Auditoria();
var edicion = new Edicion();
var oficinaM = new Oficina();
var punto = new Punto();
var idUsuario = [];
var idCatt = [];
var listaProgramacion = [];
var listarAuditados = [];
var listarUsuarios =[];
var arqueo = [];
var miUsuario = [];
var listaProgramas = [];
var listaOfici = [];
var listaPdv = [];
var arqNum;
var positionPro;
var idProgramacion = 0;
var trId = 0;
var trIdG = 0;
var trIdA = 0;
/***** FUNCIONES MANEJADORAS DE EVENTOS ****************/

	//----- presenta la primera pantalla: LOGIN ---------
	// El objeto vista con el metodo mostrarPlantilla nos pide dos parametros (template, destino)

	window.onload = function(){
		vista.mostrarPlantilla('loginSesion','estructuraPrincipal');
	 //vista.mostrarPlantilla('estructuraUsuario','estructuraPrincipal');
		// vista.mostrarPlantilla('sidebarAuditor','sidebarChange');
		// vista.mostrarPlantilla('tituloProgramacion','iconoAcutual');
		// vista.mostrarPlantilla('cuerpoProgramacion','cuerpo');
		
	}

function selection(date) {
	if (date == 1) {
		var llenarCamposD = document.getElementById('documento');
		llenarCamposD.classList.remove('alertVal');
	}else if (date == 2) {
		var llenarCamposP = document.getElementById('contrasena');
		llenarCamposP.classList.remove('alertVal');
	}
	
}

function verificarUsuario() {
	usuario.setData(vista.getDatosForm('login'));
	var datos = usuario.getData();
	if (document.getElementById('idUsuario').value == ""){
		var llenarCamposD = document.getElementById('documento');
		llenarCamposD.className += " alertVal";
		if (document.getElementById('password').value == "") {
			var llenarCamposP = document.getElementById('contrasena');
			llenarCamposP.className += " alertVal";
		}
	}else if (document.getElementById('password').value == "") {
		var llenarCamposP = document.getElementById('contrasena');
		llenarCamposP.className += " alertVal";
	}else{
		datos['opc'] = 'verificarUsuario';
		ejecutarAjax(datos, validarUsuario);
	}
}

function validarUsuario(datos) {
	var cont = 0;
	if (datos != '') {
		passwordBD = datos[0]['password'];
	}

	if (datos == '') {
		cont = cont + 1;
		vista.mostrarAvisoUsu('Usuario incorrecto');
		vista.mostrarAvisoPas("");  
	}

	if (cont == 0) {
		if (datos[0]['idEstado'] == 1) {
			usuario.setData(vista.getDatosForm('login'));
			var datos = usuario.getData();
			datos['passwordBD'] = passwordBD;
			datos['opc'] = 'validarUsuario';
			ejecutarAjax(datos, validarUsuarioResp);
		}else if (datos[0]['idEstado'] == 3) {
			vista.mostrarAviso('El usuario no ha sido habilitado')
		}else{
			vista.mostrarAviso('El usuario se encuentra bloqueado');
		}
	}
}
 function mostrardiferencia (){
var bill100 = $("#campo1").val();
var bill50 =  $("#campo2").val();
var bill20 = $("#bill20").val();
var bill10 =$("#bill10").val();
var bill5 =$("#bill5").val();
var bill2 =$("#bill2").val();
var bill1 =$("#bill1").val();
var monmil =$("#mon_mil").val();
var mon500 =$("#mon_500").val();
var mon200 =$("#mon_200").val();
var mon100 =$("#mon_100").val();
var mon50 =$("#mon_50"). val();
var valor1 =$("#valor1").val();
var valor2 =$("#valor2").val();
var valor3 =$("#valor3").val();
var valor4=$("#valor4").val();
var valor5=$("#valor5").val();
var valor6=$("#valor6").val();
var otrosing1 = $("#valor_ing1").val();
var otrosing2 = $("#valor_ing2").val();
var otrosing3 = $("#valor_ing3").val();
var otrosing4 = $("#valor_ing4").val();
var otrosing5 = $("#valor_ing5").val();
var saldocontable = $("#sal_conta_otros").val();

var totaldoc = (valor1*1)+(valor2*1)+(valor3*1)+(valor4*1)+(valor5*1)+(valor6*1);
var monedas= (monmil*1000)+(mon500*500)+(mon200*200)+(mon100*100)+(mon50*50);
var billetes= ((bill100*100000)+(bill50*50000))+((bill20*20000)+(bill10*10000))+(bill5*5000)+(bill2*2000)+(bill1*1000);
var otrosing= (otrosing1*1)+(otrosing2*1)+(otrosing3*1)+(otrosing4*1)+(otrosing5*1)+(saldocontable*1);
var totalmov= (monedas)+(billetes)+(totaldoc);
var diferencia = (otrosing)-(totalmov);
event.preventDefault();
alert('La diferencia es: '+ diferencia);

 }

function validarUsuarioResp(datos) {
	if (datos.length > 0) {
		if (datos[0]['idCatUsuario'] == 1 || datos[0]['idCatUsuario'] == 13) {
			idUsuario = datos[0]['idUsuario'];
			idCatt = datos[0]['idCatUsuario'];
			vistaInterfazUsuarioAuditor();
		}else if (datos[0]['idCatUsuario'] == 2) {
			idUsuario = datos[0]['idUsuario'];
			idCatt = datos[0]['idCatUsuario'];
			vistaInterfazUsuarioAuxiliar();
		}	
	}else{
		if (datos['ok'] == -1) {
			vista.mostrarAvisoPas('Contraseña incorrecta');
		}else{
			vista.mostrarAvisoUsu('Usuario o Contraseña incorrectos');
		}
	}
	
}

function vistaInterfazUsuarioAuditor(){
	vista.mostrarPlantilla('estructuraUsuario','estructuraPrincipal');
	vista.mostrarPlantilla('sidebarAuditor','sidebarChange');
	vista.mostrarPlantilla('tituloProgramacion','iconoAcutual');
	vista.mostrarPlantilla('cuerpoProgramacion','cuerpo');
	// vista.cargarSelect();
	$(document).ready(function() {
		$('.select2').select2();
	});
	// $(document).ready(function() {
	// 	$('#idUsuario').select2();
	// });
	let selecOficina = document.getElementById('idOficina');
		selecOficina.disabled = true;
	let selecUsuario = document.getElementById('idUsuario');
		selecUsuario.disabled = true;
	cargarProgramas();
}

function vistaInterfazUsuarioAuxiliar(){
	vista.mostrarPlantilla('estructuraUsuario','estructuraPrincipal');
	vista.mostrarPlantilla('sidebarAuxiliar','sidebarChange');
	vista.mostrarPlantilla('tituloProgramacion','iconoAcutual');
	vista.mostrarPlantilla('cuerpoProgramacion','cuerpo');
	// vista.cargarSelect();
	$(document).ready(function() {
		$('.select2').select2();
	});
	// $(document).ready(function() {
	// 	$('#idUsuario').select2();
	// });
	let selecOficina = document.getElementById('idOficina');
		selecOficina.disabled = true;
	let selecUsuario = document.getElementById('idUsuario');
		selecUsuario.disabled = true;
	cargarProgramas();
}

function vistaProgramacion(){
	vista.mostrarPlantilla('tituloProgramacion','iconoAcutual');
	vista.mostrarPlantilla('cuerpoProgramacion','cuerpo');
	$(document).ready(function() {
		$('.select2').select2();
	});
	// $(document).ready(function() {
	// 	$('#idUsuario').select2();
	// });
	let selecOficina = document.getElementById('idOficina');
		selecOficina.disabled = true;
	let selecUsuario = document.getElementById('idUsuario');
		selecUsuario.disabled = true;
	cargarProgramas();
}

function cargarProgramas() {
	let datos = {'opc': 'cargarProgramas'};
	ejecutarAjax(datos, cargarProgramasResp);
}

function cargarProgramasResp(datos) {
	listaProgramas = datos;
	vista.cargarSelect('idPrograma', listaProgramas, 'idPrograma', 'programa');
	programacion(2);
}








/***************************aqui************************* */







function programacion(opc) {
	event.preventDefault();
	if (opc == 1) {
		let checkTipoAuditoria = document.getElementById('idTipoAuditoria').value;
		if (checkTipoAuditoria == undefined) {
			var msj1 = 'no';
		}else{
			var msj1 = 'ok';
		}
		programming.setData(vista.getDatosForm('formProgramacion'));
		let msj = vista.validarDatosForm('formProgramacion');
		if (msj == 'ok' && msj1 == 'ok') {
			var datos = programming.getData();
			datos['idTipoAuditoria'] = checkTipoAuditoria;
			let idOficina = datos['idOficina'];
			let posicionEspacio = idOficina.indexOf(" ");
			let idSolo = idOficina.substring(0, posicionEspacio);
			let nombreOficina = datos['idOficina'];
			let posicionEspacio2 = nombreOficina.indexOf("-") + 2;
			let nombreSolo = nombreOficina.substring(posicionEspacio2, 50);
			datos['idOficina'] = idSolo;
			datos['nombreOficina'] = nombreSolo;
			datos['opc'] = 'crearProgramacion';
			ejecutarAjax(datos, programacionRes);
		}else{
			alert('Debe llenar todos los campos');
		}
	}
	if (opc == 2) {
		let datos = {'opc': 'cargarProgramacion'};
		ejecutarAjax(datos, programacionResp);	
	}
	
}

function programacionRes(resp) {
	if (resp['ok'] == 1) {
		alert('Se ha realizado la programacion');
		programacion(2);
	}
	if (resp['ok'] == -1) {
		alert('Ya existe');
	}
}

function programacionResp(datos1) {
	listaProgramacion = datos1;
	let datos = {'opc': 'listarUsuarios'};
	ejecutarAjax(datos, listarUsuariosResp);
	
}

function listarUsuariosResp(datos) {
	let listaUsuarios = datos;
	if (listaProgramacion == '') {
		vista.mostrarSinDatos();
	}else{
		// $('#tablePrograming').DataTable( {
		// 	"scrollX": true
		// } );
		vista.mostrarTablaProgramacion(trId);
		$(document).ready(function(){
			$('#tablePrograming').DataTable();
		});
		if (idCatt == 1 || idCatt == 13) {
			vista.mostrarDatosTablaProg('tableBody', listaProgramacion, '', trId);
			$(document).ready(function() {
				$('.select2').select2();
			});	
		}
		if (idCatt == 2) {
			vista.mostrarDatosTablaProgAux('tableBody', listaProgramacion, '', trId, idUsuario);
			$(document).ready(function() {
				$('.select2').select2();
			});	
		}
		
	}
}

function vistaGastos(){
	vista.mostrarPlantilla('tituloGastos','iconoAcutual');
	vista.mostrarPlantilla('cuerpoGastos','cuerpo');
	$('#menos1').hide();
	$('#menos2').hide();
	$(document).ready(function() {
		$('.select2').select2();
	});
}

function vistaEditarPerfil(){
	vista.mostrarPlantilla('tituloEditarPerfil','iconoAcutual');
	vista.mostrarPlantilla('cuerpoEditarPerfil','cuerpo');
	let datos = {'opc': 'cargarUsuario', 'idUsuario': idUsuario};
	ejecutarAjax(datos, usuarioResp);
	
}

function usuarioResp(datos1) {
	miUsuario = datos1;
	document.getElementById('idUsuario').value = miUsuario[0]['idUsuario'];
	document.getElementById('nombreUsuario').value = miUsuario[0]['nombreUsuario'];
	document.getElementById('apellidoUsuario').value = miUsuario[0]['apellidoUsuario'];
}

function editarUsu() {
	var passEncrip = miUsuario[0]['password'];
	usuario.setData(vista.getDatosForm('formEditarMiusuario'));
	let msj = vista.validarDatosForm('formEditarMiusuario');
		if (msj == 'ok') {
			var datos = usuario.getData();
			datos['passwordActual'] = document.getElementById('passwordAnt').value;
			datos['passwordEncrip'] = passEncrip;
			datos['opc'] = 'editarMiUsuario';
			ejecutarAjax(datos,editarUsuResp);
		}
}

function confirmarContra() {
	let contra = document.getElementById('password').value;
	let confirm = document.getElementById('passwordConf').value;
	if (confirm != contra) {
		var actualizar = document.getElementById('actualizar');
			actualizar.disabled = true;
		var msj = '';
			msj = 'Las contraseñas no coinciden';
		document.getElementById('ms').innerText = msj;
	}else{
		var actualizar = document.getElementById('actualizar');
			actualizar.disabled = false;
		var msj = '';
		document.getElementById('ms').innerText = msj;
	}
}

function editarUsuResp(resp) {
	if (resp['ok'] == 1) {
		alert('Se guardaron los cambios correctamente');
	}
}

function vistaGenerarReportes(){
	vista.mostrarPlantilla('tituloGenerarReportes','iconoAcutual');
	vista.mostrarPlantilla('cuerpoGenerarReportes','cuerpo');
	$('#reporteProgramacion').hide();
	$('#reporteAuditoria').hide();
	$('#reporteGasto').hide();
	$('#reporteHistorialProgramacion').hide();

}

function vistaCrearUsuario(){
	vista.mostrarPlantilla('tituloCrearUsuario','iconoAcutual');
	vista.mostrarPlantilla('cuerpoCrearUsuario','cuerpo');
	$("#opcContrato").hide();
	cargarCatUsuarios();
}

function cargarCatUsuarios() {
	let datos = {'opc': 'cargarCatUsuario'};
	ejecutarAjax(datos,cargarCatUsuariosResp);
}

function cargarCatUsuariosResp(datos) {
	let listaCatUsuarios = datos;
	vista.cargarSelect('idCatUsuario', listaCatUsuarios, 'idCatUsuario', 'catUsuario');
}

function selCrearUsuario() {
	var cat = document.getElementById('idCatUsuario').value;

	var combo = document.getElementById('idCatUsuario');
	var selected = combo.options[combo.selectedIndex].text;
	// Otra opcion en la validacion cat > 2 && cat < 13
	if (cat == 3 || cat == 4 || cat == 5 || cat == 6 || cat == 7 || cat == 8 || cat == 9 || cat == 10 || cat == 11 || cat == 12) {
		$("#opcContrato").show();
		// $("#apellido").hide();
		var contrato = '';
			contrato = '<label for="">Tipo de contrato</label>' +
						'<div class="row">' +
							'<div class="col-6 topEspaciado">'+
								'<input id="nomina" name="nomina" type="checkbox" onclick="opcCheckTC(1);" value="NOMINA">' +
								'<label for="">NOMINA</label>' +
							'</div>' +
							// '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' +
							'<div class="col-6 topEspaciado">' +
								'<input id="comisionPDV" name="comisionPDV" type="checkbox" onclick="opcCheckTC(2);" value="COMISION PDV">' +
								'<label for="">COMISION PDV</label>' +
							'</div>'
						'</div>';
			document.getElementById('campApellido').innerHTML = contrato;
	}else{
		var ape = '';
			ape = '<label for="">Apellido</label>' +
				  '<input id="apellidoUsuario" name="apellidoUsuario" class="form-control topEspaciado" type="text">';
			document.getElementById('campApellido').innerHTML = ape;
		$("#opcContrato").hide();
		// $("#apellido").show();
	}
}

function crearUsuario(){
	let categoria = document.getElementById('idCatUsuario').value;
	if (categoria == 1 || categoria == 2 || categoria == 13) {
		usuario.setData(vista.getDatosForm('formCrearUsuario'));
		let msj = vista.validarDatosForm('formCrearUsuario');
		if (msj == 'ok') {
			var datos = usuario.getData();
			datos['opc'] = 'crearUsuario';
			ejecutarAjax(datos, crearUsuarioResp);
		}else{
			vista.mostrarAviso('Debe llenar todos los campos');
		}
	}else if (categoria == -1) {
		vista.mostrar
		
		Aviso('Debe seleccionar una Categoria');
	}else{
		let tipoContratoN = document.getElementById('nomina').value;
		let tipoContratoC = document.getElementById('comisionPDV').value;
		let checkNomina = document.formCrearUsuario.nomina.checked;
		let checkComisionPDV = document.formCrearUsuario.comisionPDV.checked;
		usuario.setData(vista.getDatosForm('formCrearUsuario'));
		let msj = vista.validarDatosForm('formCrearUsuario');
		if (msj == 'ok') {
			if (checkNomina == true) {
				var datos = usuario.getData();
				datos['tipoContrato'] = tipoContratoN;
				datos['opc'] = 'crearAuditado';
				ejecutarAjax(datos, crearUsuarioResp);
			}else if (checkComisionPDV == true) {
				var datos = usuario.getData();
				datos['tipoContrato'] = tipoContratoC;
				datos['opc'] = 'crearAuditado';
				ejecutarAjax(datos, crearUsuarioResp);
			}else{
				vista.mostrarAviso('Debe seleccionar Tipo de Contrato');
			}
		}else{
			vista.mostrarAviso('Debe llenar todos lo campos');
		}
	}
	
}

function crearUsuarioResp(resp) {
	if (resp['ok'] == 1) {
		vista.mostrarAviso('Exito al crear');
		vistaCrearUsuario();
	}else if (resp['ok'] == -1) {
		vista.mostrarAviso('El usuario ya existe');
	}else{
		vista.mostrarAviso('Error al crear usuario');
	}
}

function vistaEditarUsuario(){
	vista.mostrarPlantilla('tituloEditarUsuario','iconoAcutual');
	vista.mostrarPlantilla('cuerpoEditarUsuario','cuerpo');
	$('.select2').select2();
	cargarCatUsuarios();
}

function editarUsuarioForm(id){
	let opc = document.getElementById('idCatUsuario').value;
	if (opc == 1 || opc == 2 || opc == 13) {
		vista.fomularioEditar(1);
		var p = 0;
		for (let i = 0; i < listarUsuarios.length; i++) {
			if (listarUsuarios[i]['idUsuario'] == id) {
				p = i;
			}
		}
		
		document.getElementById('idUsuario').value = listarUsuarios[p]['idUsuario'];
		document.getElementById('nombreUsuario').value = listarUsuarios[p]['nombreUsuario'];
		document.getElementById('apellidoUsuario').value = listarUsuarios[p]['apellidoUsuario'];
	}else if (opc >=3 && opc <=12) {
		vista.fomularioEditar(2);
		var p = 0;
		for (let i = 0; i < listarUsuarios.length; i++) {
			if (listarUsuarios[i]['idAuditado'] == id) {
				p = i;
			}
		}
		
		document.getElementById('idAuditado').value = listarUsuarios[p]['idAuditado'];
		document.getElementById('nombreAuditado').value = listarUsuarios[p]['nombreAuditado'];
	}
	
}

function editarUsuario() {
	let opc = document.getElementById('idCatUsuario').value;
	let elec = 0;
	if (opc == 1 || opc == 2 || opc == 13) {
		elec = 1;
	}else{
		elec = 2;
	}
	edicion.setData(vista.getDatosForm('formEdit'));
		let msj = vista.validarDatosForm('formEdit');
		if (msj == 'ok') {
			var datos = edicion.getData();
			datos['elec'] = elec;
			datos['opc'] = 'editarUsuario';
			ejecutarAjax(datos, editarUsuarioResp);
		}
}





function editarUsuarioResp(resp) {
	if (resp['ok'] == 1) {
		alert('Exito');
	}
	if (resp['ok'] == 0) {
		alert('No se realizo ningun cambio');
	}
}

function vistaBloquearUsuario(){
	vista.mostrarPlantilla('tituloBloquearUsuario','iconoAcutual');
	vista.mostrarPlantilla('cuerpoBloquearUsuario','cuerpo');
	$('.select2').select2();
	cargarCatUsuarios();
}

function vistaCrearOficina(){
	vista.mostrarPlantilla('tituloCrearOficina','iconoAcutual');
	vista.mostrarPlantilla('cuerpoCrearOficina','cuerpo');
}

function vistaEditarOficina(){
	vista.mostrarPlantilla('tituloEditarOficina','iconoAcutual');
	vista.mostrarPlantilla('cuerpoEditarOficina','cuerpo');
	$('.select2').select2();
	cargarCatOficinas();
}

function cargarCatOficinas(){
	let datos = {'opc': 'cargarCatOficinas'};
	ejecutarAjax(datos,cargarCatOficinasResp);
}

function cargarCatOficinasResp(datos){
	let listaCatOficinas = datos;
	vista.cargarSelect('idCatOficina', listaCatOficinas, 'idCatOficina', 'catOficina');
}

function vistaBloquearOficina(){
	vista.mostrarPlantilla('tituloBloquearOficina','iconoAcutual');
	vista.mostrarPlantilla('cuerpoBloquearOficina','cuerpo');
	$('.select2').select2();
	cargarCatOficinas();
}

function vistaAgregarPGA(){
	vista.mostrarPlantilla('tituloAgregarPGA','iconoAcutual');
	vista.mostrarPlantilla('cuerpoAgregarPGA','cuerpo');
	datos = {'opc': 'listadoUsu'};
	ejecutarAjax(datos, listadoUsuResp);
}

function listadoUsuResp(datos1) {
	let listadoUsu = datos1;
	vista.cargarSelectUsu('idUsuario', listadoUsu, 'idUsuario', 'nombreUsuario', 'apellidoUsuario');
}

function cerrarSesion(){
	vista.mostrarPlantilla('loginSesion');
}

function mostrarSidebar(){
	$("#sidebar").addClass("sidebarOpen");
	$("#iconoS").hide();
}

function ocultarSidebar(){
	$("#sidebar").removeClass("sidebarOpen");
	setTimeout(function(){$("#iconoS").show();},800);
}

function mostrarModal(idProg) {
	idProgramacion = idProg;
	let datos =  {'opc': 'listarAuditados'};
	ejecutarAjax(datos, mostrarModalResp);
}

function mostrarModalResp(datos1){
	listarAuditados = datos1;
	let datos = {'opc': 'cargarArqueo', 'idUsuario': idUsuario};
	ejecutarAjax(datos, cargarArqueoresp);
}

function cargarArqueoresp(datos1){
	arqueo = datos1;
	let datos = {'opc': 'cargarAuditoria', 'idProgramacion': idProgramacion};
	ejecutarAjax(datos, cargarAuditoriaResp);
	
}

function cargarAuditoriaResp(datos){
	let listaAuditorias = datos;
	if (listaAuditorias == '') {
		trIdA = 0;
		var tr = '';
			tr = '<form id="formAuditoria" name="formAuditoria"></form>';
		document.getElementById('inicial').innerHTML = tr;
		vista.campoAuditoria("","","",1);
		$('#checkOk').hide();
		vista.cargarSelectOfi('idAuditado', listarAuditados, 'idAuditado', 'nombreAuditado');
		document.getElementById('idArqueo').value = arqueo[0]['idArqueo'] + ' ' + arqueo[0]['arqueo']; 
		$(document).ready(function() {
			$('.select2').select2();
		});
		$("#modal").removeClass("oculto");
	}else{
		// $('#tablePrograming').DataTable( {
		// 	"scrollX": true
		// } );
		trIdA = 0;
		vista.campoAuditoria("","","",3);
		
		vista.mostrarDatosTabla('tableBody', listaAuditorias, '');
		var tr = '';
			tr = '<form id="formAuditoria" name="formAuditoria"></form>';
		// document.getElementById('inicial').innerHTML = tr;
		$("#inicial").after(tr);
		vista.campoAuditoria("","","",2);
		$('#checkOk').hide();
		vista.cargarSelectOfi('idAuditado', listarAuditados, 'idAuditado', 'nombreAuditado');
		$(document).ready(function() {
			$('.select2').select2();
		});
		document.getElementById('idArqueo').value = arqueo[0]['idArqueo'] + ' ' + arqueo[0]['arqueo']; 
		$("#modal").removeClass("oculto");
	}
}

function cerrarModal(){
	$('#bodyModal'+ ' form').remove();
	$("#modal").addClass("oculto");
}

function mostrarModalEditarAuditoria(idProgram) {
	let datos = {'opc': 'cargarAuditoria', 'idProgramacion': idProgram};
	idProgramacion = idProgram;
	ejecutarAjax(datos, cargarListAudResp);
	
}

function cargarListAudResp(datos){
	let listaAuditorias = datos;
	var nuevoId = document.getElementsByName('oficina99');
	nuevoId[0].id = "oficina99";
	var nuevoId1 = document.getElementsByName('puntoVenta99');
	nuevoId1[0].id = "puntoVenta99";
	vista.cargarSelect('idPrograma99', listaProgramas, 'idPrograma', 'programa');
	document.getElementById("oficina99").checked = false;
	document.getElementById("puntoVenta99").checked = false;
	document.getElementById("auditorSel99").checked = false;
	document.getElementById("auxiliarSel99").checked = false;
	document.getElementById('idOficina99').value = '';
	document.getElementById('idUsuario99').value = '';
	document.getElementById('fechaInicio99').value = '';
	document.getElementById('fechaFin99').value = '';
	document.getElementById('dias99').value  = '';
	document.getElementById('idPrograma99').value  = '';
	positionPro = 0;
	for (let i = 0; i < listaProgramacion.length; i++) {
		if (listaProgramacion[i]['idProgramacion'] == idProgramacion) {
			positionPro = i;
		}
		
	}
	if (listaProgramacion[positionPro]['idCatOficina'] == 1) {
		document.getElementById("oficina99").checked = true;
		selecCatOficina(5);
	}else{
		document.getElementById("puntoVenta99").checked = true;
		selecCatOficina(6);
	}
	
	if (listaProgramacion[positionPro]['idCatUsuario'] == 1) {
		document.getElementById("auditorSel99").checked = true;
	}else{
		document.getElementById("auxiliarSel99").checked = true;
	}
	document.getElementById('idUsuario99').value = listaProgramacion[positionPro]['idUsuario'] + ' - ' + listaProgramacion[positionPro]['nombreUsuario'];
	document.getElementById('fechaInicio99').value = listaProgramacion[positionPro]['fechaInicio'];
	document.getElementById('fechaFin99').value = listaProgramacion[positionPro]['fechaFin'];
	document.getElementById('dias99').value  = listaProgramacion[positionPro]['dias'];
	document.getElementById('idPrograma99').value  = listaProgramacion[positionPro]['idPrograma'];
	document.getElementById('idTipoAuditoria99').value  = listaProgramacion[positionPro]['idTipoAuditoria'];
	// vista.campoEditarAud();
	// vista.mostrarDatosTablaEdit('tableEditBody', listaAuditorias, '');
	$("#modalEditarAuditoria").removeClass("oculto");
}

function editarProgramacion(){
	event.preventDefault();
	let datos = {};
	datos['idCatOficina'] = document.getElementById('idCatOficina99').value;
	datos['idOficina'] = document.getElementById('idOficina99').value;
	let idUsuario = document.getElementById('idUsuario99').value;
	let posicionEspacio = idUsuario.indexOf(" ");
	let idSolo = idUsuario.substring(0, posicionEspacio);
	datos['idUsuario'] = idSolo;
	datos['fechaInicio'] = document.getElementById('fechaInicio99').value;
	datos['fechaFin'] = document.getElementById('fechaFin99').value;
	datos['dias'] = document.getElementById('dias99').value;
	datos['idPrograma'] = document.getElementById('idPrograma99').value;
	datos['idTipoAuditoria'] = document.getElementById('idTipoAuditoria99').value;
	datos['idProgramacion'] = idProgramacion;
	datos['opc'] = 'editarProgramacion';
	ejecutarAjax(datos, editarProgramacionResp);
}

function editarProgramacionResp(resp){
	if (resp['ok'] == 1) {
		alert('Exito');
	}
	if (resp['ok'] == 0) {
		alert('No se ha realizado ningun cambio');
	}
}

function  rModalEditarAuditoria(){
	$("#modalEditarAuditoria").addClass("oculto");
}

function mostrarModalReprogramarAuditoria(idProgram) {
	let datos = {'opc': 'cargarNovedades'};
	idProgramacion = idProgram;
	ejecutarAjax(datos, cargarListAudResp1);
	
}

function cargarListAudResp1(datos){
	let listaNovedad = datos;
	var nuevoId = document.getElementsByName('oficina099');
	nuevoId[0].id = "oficina099";
	var nuevoId1 = document.getElementsByName('puntoVenta099');
	nuevoId1[0].id = "puntoVenta099";
	vista.cargarSelect('idPrograma099', listaProgramas, 'idPrograma', 'programa');
	vista.cargarSelect('idNovedades', listaNovedad, 'idNovedades', 'novedad');
	document.getElementById("oficina099").checked = false;
	document.getElementById("puntoVenta099").checked = false;
	document.getElementById("auditorSel099").checked = false;
	document.getElementById("auxiliarSel099").checked = false;
	document.getElementById('idOficina099').value = '';
	document.getElementById('idUsuario099').value = '';
	document.getElementById('fechaInicio099').value = '';
	document.getElementById('fechaFin099').value = '';
	document.getElementById('dias099').value  = '';
	document.getElementById('idPrograma099').value  = '';
	positionPro = 0;
	for (let i = 0; i < listaProgramacion.length; i++) {
		if (listaProgramacion[i]['idProgramacion'] == idProgramacion) {
			positionPro = i;
		}
		
	}
	if (listaProgramacion[positionPro]['idCatOficina'] == 1) {
		document.getElementById("oficina099").checked = true;
	}else{
		document.getElementById("puntoVenta099").checked = true;
	}
	
	if (listaProgramacion[positionPro]['idCatUsuario'] == 1) {
		document.getElementById("auditorSel099").checked = true;
		selecCatUsuario(3);
	}else{
		document.getElementById("auxiliarSel099").checked = true;
		selecCatUsuario(4);
	}
	document.getElementById('idOficina099').value = listaProgramacion[positionPro]['idOficina'] + ' - ' + listaProgramacion[positionPro]['nombreOficina'];
	document.getElementById('fechaInicio099').value = listaProgramacion[positionPro]['fechaInicio'];
	document.getElementById('fechaFin099').value = listaProgramacion[positionPro]['fechaFin'];
	document.getElementById('dias099').value  = listaProgramacion[positionPro]['dias'];
	document.getElementById('idPrograma099').value  = listaProgramacion[positionPro]['idPrograma'];
	document.getElementById('idTipoAuditoria099').value  = listaProgramacion[positionPro]['idTipoAuditoria'];
	// vista.campoEditarAud();
	// vista.mostrarDatosTablaEdit('tableEditBody', listaAuditorias, '');
	$("#modalReprogramarAuditoria").removeClass("oculto");
}

function reprogramacion(){
	event.preventDefault();
	let datos = {};
	var num = new Array("00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59");
	    var f = new Date();
	    var x = num[f.getDate()] + "/" + num[f.getMonth() + 1] + "/" + f.getFullYear() + "   " + f.getHours() + ":" + num[f.getMinutes()];
	datos['idCatOficina'] = listaProgramacion[positionPro]['idCatOficina'];
	datos['idOficina'] = listaProgramacion[positionPro]['idOficina'];
	datos['idUsuarioAnt'] = listaProgramacion[positionPro]['idUsuario'];
	datos['nombreUsuarioAnt'] = listaProgramacion[positionPro]['nombreUsuario'];
	datos['apellidoUsuarioAnt'] = listaProgramacion[positionPro]['apellidoUsuario'];
	datos['fechaInicioAnt'] = listaProgramacion[positionPro]['fechaInicio'];
	datos['fechaFinAnt'] = listaProgramacion[positionPro]['fechaFin'];
	datos['diasAnt'] = listaProgramacion[positionPro]['dias'];
	datos['idPrograma'] = listaProgramacion[positionPro]['idPrograma'];
	datos['fechaReprogramacion'] = x;
	datos['idTipoAuditoria'] = listaProgramacion[positionPro]['idTipoAuditoria'];
	datos['idProgramacion'] = idProgramacion;
	datos['idNovedades'] = document.getElementById('idNovedades').value;
	datos['observacion'] = document.getElementById('observacion099').value;
	datos['opc'] = 'historialReprogramacion';
	ejecutarAjax(datos, reprogramacionResp);
}

function reprogramacionResp(resp){
	let datos = {};
	if (resp['ok'] == 1) {
		datos['fechaInicio'] = document.getElementById('fechaInicio099').value;
		datos['fechaFin'] = document.getElementById('fechaFin099').value;
		datos['dias'] = document.getElementById('dias099').value;
		let catOficinaO = document.getElementById("oficina099").checked;
		let catOficinaP = document.getElementById("puntoVenta099").checked;
		let catOficina = 0;
		if (catOficinaO == true) {
			catOficina = 1;
		}else if (catOficinaP == true) {
			catOficina = 2;
		}
		datos['idCatOficina'] = catOficina;
		let idOficina = document.getElementById('idOficina099').value;
		let posicionEspacio = idOficina.indexOf(" ");
		let idSolo = idOficina.substring(0, posicionEspacio);
		datos['idOficina'] = idSolo;
		datos['idUsuario'] = document.getElementById('idUsuario099').value;
		datos['idPrograma'] = document.getElementById('idPrograma099').value;
		datos['idTipoAuditoria'] = document.getElementById('idTipoAuditoria099').value;
		datos['idProgramacion'] = idProgramacion;
		datos['opc'] = 'reprogramacion';
		ejecutarAjax(datos,respuestaReprogramacion);
	}
	if (resp['ok'] == 0) {
		alert('Ocurrio un error');
	}
}

function respuestaReprogramacion(resp){
	if (resp['ok'] == 1) {
		alert('Se guardaron los cambios exitosamente');
	}
	if (resp['ok'] == 0) {
		alert('No se ha realizado ningun cambio');
	}
}

function cerrarModalReprogramacion(){
	$("#modalReprogramarAuditoria").addClass("oculto");
}

function ShowSelected(es){
	if (es == 1) {
		var cod = document.getElementById("idCatUsuario").value;
		// alert(cod);

		/* Para obtener el texto */
		var combo = document.getElementById("idCatUsuario");
		var selected = combo.options[combo.selectedIndex].text;
		let datos = {'opc': 'cargaUsuarios', 'idCatUsuario': cod};
		if (cod == 1 || cod == 2 || cod == 13) {
			vista.tablaUsuarios(1);
		}
		if (cod >= 3 && cod <= 12) {
			vista.tablaUsuarios(2);
		}
		ejecutarAjax(datos, catUsuarioResp);
	}
	if (es == 2) {
		var cod = document.getElementById("idCatUsuario").value;
		// alert(cod);

		/* Para obtener el texto */
		var combo = document.getElementById("idCatUsuario");
		var selected = combo.options[combo.selectedIndex].text;
		let datos = {'opc': 'cargaUsuarios1', 'idCatUsuario': cod};
		vista.tablaUsuarios(1);
		ejecutarAjax(datos, catUsuarioResp1);
	}
	if (es == 3) {
		// alert("Lol");
	}

	if (es == 4) {
		var cod = document.getElementById('idCatOficina').value;

		var combo = document.getElementById('idCatOficina');
		var selected = combo.options[combo.selectedIndex].text;
		
		if (cod == 1) {
			let datos = {'opc': 'cargarOficinas'};
			ejecutarAjax(datos, cargarOficinasResp);
		}else if (cod == 2) {
			let datos = {'opc': 'cargarPdv'};
			ejecutarAjax(datos, cargarPdvResp);
		}

	}

	if (es == 5) {
		var cod = document.getElementById('idCatOficina').value;

		var combo = document.getElementById('idCatOficina');
		var selected = combo.options[combo.selectedIndex].text;
		
		if (cod == 1) {
			let datos = {'opc': 'cargarOficinas'};
			ejecutarAjax(datos, cargarOficinasResp1);
		}else if (cod == 2) {
			let datos = {'opc': 'cargarPdv'};
			ejecutarAjax(datos, cargarPdvResp1);
		}

	}
}

function catUsuarioResp(datos1){
	listarUsuarios = datos1;
	vista.mostrarDatosTablaUsuEdit('bodyTable', listarUsuarios, '');
}

function catUsuarioResp1(datos1){
	let listarUsuarios1 = datos1;
	vista.mostrarDatosTablaUsuBloq('bodyTable', listarUsuarios1, '');
}

/*function cargarOficinasResp(datos){
	let listaOfici = datos;
	vista.mostrarDatosTablaOfiEdit('tbodyOficinas',)
}*/

function cargarOficinasResp(datos1){
	listaOfici = datos1;
	$(document).ready(function(){
		$('#tablaOfi').DataTable({
				dom: 'Bfrtip',
	        buttons: [
	            'excelHtml5',
	            'pdfHtml5'
	        ]
		});
	});
	vista.mostrarDatosTablaOfiEdit('tbodyOficinas', listaOfici,'');
}

function cargarPdvResp(datos1){
	listaPdv = datos1;
	$(document).ready(function(){
		$('#tablaOfi').DataTable({
				dom: 'Bfrtip',
	        buttons: [
	            'excelHtml5',
	            'pdfHtml5'
	        ]
		});
	});
	vista.mostrarDatosTablaOfiEdit('tbodyOficinas', listaPdv, '');
}

/*function cargarOficinasResp1(datos1){
	listaOfici = datos1;
	$(document).ready(function(){
		$('#tablaOfi').DataTable({
				dom: 'Bfrtip',
	        buttons: [
	            'excelHtml5',
	            'pdfHtml5'
	        ]
		});
	});
	vista.mostrarDatosTablaOfiBloq('tbodyOficinas', listaOfici,'');
}

function cargarPdvResp1(datos1){
	listaPdv = datos1;
	$(document).ready(function(){
		$('#tablaOfi').DataTable({
				dom: 'Bfrtip',
	        buttons: [
	            'excelHtml5',
	            'pdfHtml5'
	        ]
		});
	});
	vista.mostrarDatosTablaOfiBloq('tbodyOficinas', listaPdv, '');
}*/

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

/******* CONSULTA A LA BD *****************************************************************
	realiza la conexion al php del servidor y devuelve un resultado
	los datos se convierten a Json
	@datos: array con datos al servidor, incluye
	@funcionRetorno: Se ejecuta al responder AJAX
	return @resp: datos de respuesta en array 
	*/
	function ejecutarAjax(datos, funcionRetorno){
		$.ajax({
			url: 'php/despachador.php',
			//data: dataJson,
			data: datos,
			type: 'post',
	
			success : function(response){
				if(IsValidJSONString(response)){
					var resp = JSON.parse(response);
					funcionRetorno(resp);
				}else{
					vista.mostrarAviso("Error en los datos de respuesta");
				}
			},
	
			error : function(xhr, status){
				alert('error: ' + status)
			}
		});
	}
	
	//-----------------------------------------------------------------------
	function IsValidJSONString(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}
	
	/*********************************************/
	

function opcCheckbox(opt){
	if (opt == 1) {
		let auditoria = document.tipoAuditoria.marcarAuditoria.checked;
		if (auditoria == true) {
			var nuevoId = document.getElementsByName('marcarAuditoria');
			nuevoId[0].id = "idTipoAuditoria";
			document.getElementById("efecAuditoria").setAttribute("for", "idTipoAuditoria");
			document.getElementById("efecEntregas").setAttribute("for", "marcarEntregas");
			document.getElementById("efecInspecciones").setAttribute("for", "marcarInspecciones");
			document.getElementById("efecVisitaNoPlaneada").setAttribute("for", "marcarVisitaNoPlaneada");
			var nuevoId = document.getElementsByName('marcarEntregas');
			nuevoId[0].id = "marcarEntregas";
			var nuevoId = document.getElementsByName('marcarInspecciones');
			nuevoId[0].id = "marcarInspecciones";
			var nuevoId = document.getElementsByName('marcarVisitaNoPlaneada');
			nuevoId[0].id = "marcarVisitaNoPlaneada";
			var efecAuditoria = document.getElementById('efecAuditoria');
				efecAuditoria.className += " auditoriaSel";
				efecAuditoria.classList.remove('auditoria');
				document.getElementById("marcarEntregas").checked = false;
				var efecEntregas = document.getElementById('efecEntregas');
				efecEntregas.className += " entregas";
				efecEntregas.classList.remove('entregasSel');
				document.getElementById("marcarInspecciones").checked = false;
				var efecInspecciones = document.getElementById('efecInspecciones');
				efecInspecciones.className += " inspecciones";
				efecInspecciones.classList.remove('inspeccionesSel');
				document.getElementById("marcarVisitaNoPlaneada").checked = false;
				var efecVisitaNoPlaneada = document.getElementById('efecVisitaNoPlaneada');
				efecVisitaNoPlaneada.className += " visitaNoPlaneada";
				efecVisitaNoPlaneada.classList.remove('visitaNoPlaneadaSel');
		}else if (auditoria == false) {
			var nuevoId = document.getElementsByName('marcarAuditoria');
			nuevoId[0].id = "marcarAuditoria";
			document.getElementById("efecAuditoria").setAttribute("for", "marcarAuditoria");
			var efecAuditoria = document.getElementById('efecAuditoria');
				efecAuditoria.className += " auditoria";
				efecAuditoria.classList.remove('auditoriaSel');
		}	
	}
	if (opt == 2) {
		let entregas = document.tipoAuditoria.marcarEntregas.checked;
		if (entregas == true) {
			var nuevoId = document.getElementsByName('marcarAuditoria');
			nuevoId[0].id = "marcarAuditoria";
			var nuevoId = document.getElementsByName('marcarEntregas');
			nuevoId[0].id = "idTipoAuditoria";
			document.getElementById("efecEntregas").setAttribute("for", "idTipoAuditoria");
			document.getElementById("efecAuditoria").setAttribute("for", "marcarAuditoria");
			document.getElementById("efecInspecciones").setAttribute("for", "marcarInspecciones");
			document.getElementById("efecVisitaNoPlaneada").setAttribute("for", "marcarVisitaNoPlaneada");
			var nuevoId = document.getElementsByName('marcarInspecciones');
			nuevoId[0].id = "marcarInspecciones";
			var nuevoId = document.getElementsByName('marcarVisitaNoPlaneada');
			nuevoId[0].id = "marcarVisitaNoPlaneada";
			var efecEntregas = document.getElementById('efecEntregas');
				efecEntregas.className += " entregasSel";
				efecEntregas.classList.remove('entregas');
				document.getElementById("marcarAuditoria").checked = false;
				var efecAuditoria = document.getElementById('efecAuditoria');
				efecAuditoria.className += " auditoria";
				efecAuditoria.classList.remove('auditoriaSel');
				document.getElementById("marcarInspecciones").checked = false;
				var efecInspecciones = document.getElementById('efecInspecciones');
				efecInspecciones.className += " inspecciones";
				efecInspecciones.classList.remove('inspeccionesSel');
				document.getElementById("marcarVisitaNoPlaneada").checked = false;
				var efecVisitaNoPlaneada = document.getElementById('efecVisitaNoPlaneada');
				efecVisitaNoPlaneada.className += " visitaNoPlaneada";
				efecVisitaNoPlaneada.classList.remove('visitaNoPlaneadaSel');
		}else if (entregas == false) {
			var nuevoId = document.getElementsByName('marcarEntregas');
			nuevoId[0].id = "marcarEntregas";
			document.getElementById("efecEntregas").setAttribute("for", "marcarEntregas");
			var efecEntregas = document.getElementById('efecEntregas');
				efecEntregas.className += " entregas";
				efecEntregas.classList.remove('entregasSel');
		}	
	}
	if (opt == 3) {
		let inspecciones = document.tipoAuditoria.marcarInspecciones.checked;
		if (inspecciones == true) {
			var nuevoId = document.getElementsByName('marcarAuditoria');
			nuevoId[0].id = "marcarAuditoria";
			var nuevoId = document.getElementsByName('marcarEntregas');
			nuevoId[0].id = "marcarEntregas";
			var nuevoId = document.getElementsByName('marcarInspecciones');
			nuevoId[0].id = "idTipoAuditoria";
			document.getElementById("efecInspecciones").setAttribute("for", "idTipoAuditoria");
			document.getElementById("efecAuditoria").setAttribute("for", "marcarAuditoria");
			document.getElementById("efecEntregas").setAttribute("for", "marcarEntregas");
			document.getElementById("efecVisitaNoPlaneada").setAttribute("for", "marcarVisitaNoPlaneada");
			var nuevoId = document.getElementsByName('marcarVisitaNoPlaneada');
			nuevoId[0].id = "marcarVisitaNoPlaneada";
			var efecInspecciones = document.getElementById('efecInspecciones');
				efecInspecciones.className += " inspeccionesSel";
				efecInspecciones.classList.remove('inspecciones');
				document.getElementById("marcarAuditoria").checked = false;
				var efecAuditoria = document.getElementById('efecAuditoria');
				efecAuditoria.className += " auditoria";
				efecAuditoria.classList.remove('auditoriaSel');
				document.getElementById("marcarEntregas").checked = false;
				var efecEntregas = document.getElementById('efecEntregas');
				efecEntregas.className += " entregas";
				efecEntregas.classList.remove('entregasSel');
				document.getElementById("marcarVisitaNoPlaneada").checked = false;
				var efecVisitaNoPlaneada = document.getElementById('efecVisitaNoPlaneada');
				efecVisitaNoPlaneada.className += " visitaNoPlaneada";
				efecVisitaNoPlaneada.classList.remove('visitaNoPlaneadaSel');
		}else if (inspecciones == false) {
			var nuevoId = document.getElementsByName('marcarInspecciones');
			nuevoId[0].id = "marcarInspecciones";
			document.getElementById("efecInspecciones").setAttribute("for", "marcarInspecciones");
			var efecInspecciones = document.getElementById('efecInspecciones');
				efecInspecciones.className += " inspecciones";
				efecInspecciones.classList.remove('inspeccionesSel');
		}
	}
	if (opt == 4) {
		let visitaNoPlaneada = document.tipoAuditoria.marcarVisitaNoPlaneada.checked;
		if (visitaNoPlaneada == true) {
			var nuevoId = document.getElementsByName('marcarAuditoria');
			nuevoId[0].id = "marcarAuditoria";
			var nuevoId = document.getElementsByName('marcarEntregas');
			nuevoId[0].id = "marcarEntregas";
			var nuevoId = document.getElementsByName('marcarInspecciones');
			nuevoId[0].id = "marcarInspecciones";
			var nuevoId = document.getElementsByName('marcarVisitaNoPlaneada');
			nuevoId[0].id = "idTipoAuditoria";
			document.getElementById("efecVisitaNoPlaneada").setAttribute("for", "idTipoAuditoria");
			document.getElementById("efecAuditoria").setAttribute("for", "marcarAuditoria");
			document.getElementById("efecEntregas").setAttribute("for", "marcarEntregas");
			document.getElementById("efecInspecciones").setAttribute("for", "marcarInspecciones");
			var efecVisitaNoPlaneada = document.getElementById('efecVisitaNoPlaneada');
				efecVisitaNoPlaneada.className += " visitaNoPlaneadaSel";
				efecVisitaNoPlaneada.classList.remove('visitaNoPlaneada');
				document.getElementById("marcarAuditoria").checked = false;
				var efecAuditoria = document.getElementById('efecAuditoria');
				efecAuditoria.className += " auditoria";
				efecAuditoria.classList.remove('auditoriaSel');
				document.getElementById("marcarEntregas").checked = false;
				var efecEntregas = document.getElementById('efecEntregas');
				efecEntregas.className += " entregas";
				efecEntregas.classList.remove('entregasSel');
				document.getElementById("marcarInspecciones").checked = false;
				var efecInspecciones = document.getElementById('efecInspecciones');
				efecInspecciones.className += " inspecciones";
				efecInspecciones.classList.remove('inspeccionesSel');
		}else if (visitaNoPlaneada == false) {
			var nuevoId = document.getElementsByName('marcarVisitaNoPlaneada');
			nuevoId[0].id = "marcarVisitaNoPlaneada";
			document.getElementById("efecVisitaNoPlaneada").setAttribute("for", "marcarVisitaNoPlaneada");
			var efecVisitaNoPlaneada = document.getElementById('efecVisitaNoPlaneada');
				efecVisitaNoPlaneada.className += " visitaNoPlaneada";
				efecVisitaNoPlaneada.classList.remove('visitaNoPlaneadaSel');
		}
	}
	
}

function opcCheckTC(opc) {
	if (opc == 1) {
		let checkNomina = document.formCrearUsuario.nomina.checked;
		if (checkNomina == true) {
			document.getElementById("comisionPDV").checked = false;
		}else if (checkNomina == false) {
			
		}
	}
	if (opc == 2) {
		let checkComisionPDV = document.formCrearUsuario.comisionPDV.checked;
		if (checkComisionPDV) {
			document.getElementById("nomina").checked = false;
		}
	}
}

function pulsar(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        verificarUsuario();
    }
}

function selecCatOficina(opt) {
	var datos = {};
	if (opt == 1) {
		
		let oficinas = document.formProgramacion.oficina.checked;
		if (oficinas == true) {
			var nuevoId = document.getElementsByName('oficina');
			nuevoId[0].id = "idCatOficina";
			var nuevoId = document.getElementsByName('puntoVenta');
			nuevoId[0].id = "puntoVenta";
			chekPunto = document.getElementsByName("puntoVenta");
			chekPunto[0].checked = false
			// datos['idCatOficina'] = opt;
			datos['opc'] = 'listarOficinas';
			ejecutarAjax(datos, listarOficinasResp);	
		}else{
			let selecOficina = document.getElementById('idOficina');
				selecOficina.disabled = true;
			var nuevoId = document.getElementById('idCatOficina');
			nuevoId.id = "oficina";
		}
	}
	if (opt == 2) {
		let puntosVenta = document.formProgramacion.puntoVenta.checked;
		if (puntosVenta == true) {
			var nuevoId = document.getElementsByName('puntoVenta');
			nuevoId[0].id = "idCatOficina";
			var nuevoId = document.getElementsByName('oficina');
			nuevoId[0].id = "oficina";
			chekOficina = document.getElementsByName("oficina");
			chekOficina[0].checked = false;
			datos['opc'] = 'listarPuntosVenta';
			ejecutarAjax(datos, listarPuntosVenta);	
		}else{
			let selecOficina = document.getElementById('idOficina');
				selecOficina.disabled = true;
			var nuevoId = document.getElementById('idCatOficina');
			nuevoId.id = "puntoVenta";
		}
	}
	if (opt == 3) {
		let oficinas = document.formGastos.oficina.checked;
		if (oficinas == true) {
			var nuevoId = document.getElementsByName('oficina');
			nuevoId[0].id = "idCatOficina";
			var nuevoId = document.getElementsByName('puntoVenta');
			nuevoId[0].id = "puntoVenta";
			chekPunto = document.getElementsByName("puntoVenta");
			chekPunto[0].checked = false
			// datos['idCatOficina'] = opt;
			datos['opc'] = 'listarOficinas';
			ejecutarAjax(datos, listarOficinasResp03);	
		}else{
			let selecOficina = document.getElementById('idOficina');
				selecOficina.disabled = true;
			var nuevoId = document.getElementById('idCatOficina');
			nuevoId.id = "oficina";
		}
	}
	if (opt == 4) {
		let puntosVenta = document.formGastos.puntoVenta.checked;
		if (puntosVenta == true) {
			var nuevoId = document.getElementsByName('puntoVenta');
			nuevoId[0].id = "idCatOficina";
			var nuevoId = document.getElementsByName('oficina');
			nuevoId[0].id = "oficina";
			chekOficina = document.getElementsByName("oficina");
			chekOficina[0].checked = false;
			datos['opc'] = 'listarPuntosVenta';
			ejecutarAjax(datos, listarPuntosVenta03);	
		}else{
			let selecOficina = document.getElementById('idOficina');
				selecOficina.disabled = true;
			var nuevoId = document.getElementById('idCatOficina');
			nuevoId.id = "puntoVenta";
		}
	}
	if (opt == 5) {
		let oficinas = document.formEditProgramacion.oficina99.checked;
		if (oficinas == true) {
			var nuevoId = document.getElementsByName('oficina99');
			nuevoId[0].id = "idCatOficina99";
			var nuevoId = document.getElementsByName('puntoVenta99');
			nuevoId[0].id = "puntoVenta99";
			chekPunto = document.getElementsByName("puntoVenta99");
			chekPunto[0].checked = false
			// datos['idCatOficina'] = opt;
			datos['opc'] = 'listarOficinas';
			ejecutarAjax(datos, listarOficinasRespu1);	
		}else{
			let selecOficina = document.getElementById('idOficina99');
				selecOficina.disabled = true;
			var nuevoId = document.getElementById('idCatOficina99');
			nuevoId.id = "oficina99";
		}
	}
	if (opt == 6) {
		let puntosVenta = document.formEditProgramacion.puntoVenta99.checked;
		if (puntosVenta == true) {
			var nuevoId = document.getElementsByName('puntoVenta99');
			nuevoId[0].id = "idCatOficina99";
			var nuevoId = document.getElementsByName('oficina99');
			nuevoId[0].id = "oficina99";
			chekOficina = document.getElementsByName("oficina99");
			chekOficina[0].checked = false;
			datos['opc'] = 'listarPuntosVenta';
			ejecutarAjax(datos, listarPuntosVentaR1);	
		}else{
			let selecOficina = document.getElementById('idOficina99');
				selecOficina.disabled = true;
			var nuevoId = document.getElementById('idCatOficina99');
			nuevoId.id = "puntoVenta99";
		}
	}
	if (opt == 7) {
		let oficinas = document.formReproProgramacion.oficina099.checked;
		if (oficinas == true) {
			var nuevoId = document.getElementsByName('oficina099');
			nuevoId[0].id = "idCatOficina099";
			var nuevoId = document.getElementsByName('puntoVenta099');
			nuevoId[0].id = "puntoVenta099";
			chekPunto = document.getElementsByName("puntoVenta099");
			chekPunto[0].checked = false
			// datos['idCatOficina'] = opt;
			datos['opc'] = 'listarOficinas';
			ejecutarAjax(datos, listarOficinasRespu2);	
		}else{
			let selecOficina = document.getElementById('idOficina099');
				selecOficina.disabled = true;
			var nuevoId = document.getElementById('idCatOficina099');
			nuevoId.id = "oficina099";
		}
	}
	if (opt == 8) {
		let puntosVenta = document.formReproProgramacion.puntoVenta099.checked;
		if (puntosVenta == true) {
			var nuevoId = document.getElementsByName('puntoVenta099');
			nuevoId[0].id = "idCatOficina099";
			var nuevoId = document.getElementsByName('oficina099');
			nuevoId[0].id = "oficina099";
			chekOficina = document.getElementsByName("oficina099");
			chekOficina[0].checked = false;
			datos['opc'] = 'listarPuntosVenta';
			ejecutarAjax(datos, listarPuntosVentaR2);	
		}else{
			let selecOficina = document.getElementById('idOficina099');
				selecOficina.disabled = true;
			var nuevoId = document.getElementById('idCatOficina099');
			nuevoId.id = "puntoVenta099";
		}
	}

	if (opt == 9) {
		let acopio = document.formProgramacion.acopio.checked;
		if (acopio == true) {
			
			var nuevoId = document.getElementsByName('acopio');
			nuevoId[0].id = "idCatOficina";
			var nuevoId = document.getElementsByName('puntoVenta');
			nuevoId[0].id = "puntoVenta";
			chekPunto = document.getElementsByName("puntoVenta");
			chekPunto[0].checked = false
			var nuevoId = document.getElementsByName('oficina');
			nuevoId[0].id = "oficina";
			chekOficina = document.getElementsByName("oficina");
			chekOficina[0].checked = false;
			// datos['idCatOficina'] = opt;
			datos['opc'] = 'listarAcopio';
			ejecutarAjax(datos, listaracopioResp);	
		}else{
			let selecOficina = document.getElementById('idOficina');
				selecOficina.disabled = true;
			var nuevoId = document.getElementById('idCatOficina');
			nuevoId.id = "acopio";
		}
	}
	
}


function listaracopioResp(datos) {
	var listaacopio = datos;
	vista.cargarSelectOfi2('idOficina', listaacopio,'id' , 'nombre_acopio');
	let selecOficina = document.getElementById('idOficina');
		selecOficina.disabled = false;
}


function listarOficinasResp(datos) {
	var listaOficinas = datos;
	vista.cargarSelectOfi2('idOficina', listaOficinas,'idOficina' , 'nombreOficina');
	let selecOficina = document.getElementById('idOficina');
		selecOficina.disabled = false;
}



function listarPuntosVenta(datos) {
	var listaPuntosVenta = datos;
	vista.cargarSelectOfi2('idOficina', listaPuntosVenta, 'idPunto', 'nombrePunto');
	let selecOficina = document.getElementById('idOficina');
		selecOficina.disabled = false;
}

function listarOficinasRespu1(datos) {
	var listaOficinas = datos;
	vista.cargarSelectOfi('idOficina99', listaOficinas,'idOficina' , 'nombreOficina');
	let selecOficina = document.getElementById('idOficina99');
		selecOficina.disabled = false;
		document.getElementById('idOficina99').value = listaProgramacion[positionPro]['idOficina'];
}

function listarPuntosVentaR1(datos) {
	var listaPuntosVenta = datos;
	vista.cargarSelectOfi('idOficina99', listaPuntosVenta, 'idPunto', 'nombrePunto');
	let selecOficina = document.getElementById('idOficina99');
		selecOficina.disabled = false;
		document.getElementById('idOficina99').value = listaProgramacion[positionPro]['idOficina'];
}

function listarOficinasRespu2(datos) {
	var listaOficinas = datos;
	vista.cargarSelectOfi('idOficina099', listaOficinas,'idOficina' , 'nombreOficina');
	let selecOficina = document.getElementById('idOficina099');
		selecOficina.disabled = false;
		document.getElementById('idOficina099').value = listaProgramacion[positionPro]['idOficina'];
}

function listarPuntosVentaR2(datos) {
	var listaPuntosVenta = datos;
	vista.cargarSelectOfi('idOficina099', listaPuntosVenta, 'idPunto', 'nombrePunto');
	let selecOficina = document.getElementById('idOficina099');
		selecOficina.disabled = false;
		document.getElementById('idOficina099').value = listaProgramacion[positionPro]['idOficina'];
}

function listarOficinasResp03(datos) {
	var listaOficinas = datos;
	vista.cargarSelectOfi2('idOficina', listaOficinas,'idOficina' , 'nombreOficina');
	let selecOficina = document.getElementById('idOficina');
		selecOficina.disabled = false;
}

function listarPuntosVenta03(datos) {
	var listaPuntosVenta = datos;
	vista.cargarSelectOfi2('idOficina', listaPuntosVenta, 'idPunto', 'nombrePunto');
	let selecOficina = document.getElementById('idOficina');
		selecOficina.disabled = false;
}

function selecCatOficina0(opt) {
	var datos = {};
	if (opt == 1) {
		let oficinas = document.formGastos.oficina0.checked;
		if (oficinas == true) {
			chekPunto = document.getElementsByName("puntoVenta0");
			chekPunto[0].checked = false
			// datos['idCatOficina'] = opt;
			datos['opc'] = 'listarOficinas';
			ejecutarAjax(datos, listarOficinasResp0);	
		}else{
		
		}
	}
	if (opt == 2) {
		let puntosVenta = document.formGastos.puntoVenta0.checked;
		if (puntosVenta == true) {
			chekOficina = document.getElementsByName("oficina0");
			chekOficina[0].checked = false;
			datos['opc'] = 'listarPuntosVenta';
			ejecutarAjax(datos, listarPuntosVenta0);	
		}else{
			
		}
	}
}

function listarOficinasResp0(datos) {
	var listaOficinas = datos;
	vista.cargarSelectOfi('idOficina0', listaOficinas,'idOficina' , 'nombreOficina');
	
}

function listarPuntosVenta0(datos) {
	var listaPuntosVenta = datos;
	vista.cargarSelectOfi('idOficina0', listaPuntosVenta, 'idPunto', 'nombrePunto');
	
}

function selecCatOficina1(opt) {
	var datos = {};
	if (opt == 1) {
		let oficinas = document.formGastos.oficina1.checked;
		if (oficinas == true) {
			chekPunto = document.getElementsByName("puntoVenta1");
			chekPunto[0].checked = false
			// datos['idCatOficina'] = opt;
			datos['opc'] = 'listarOficinas';
			ejecutarAjax(datos, listarOficinasResp1);	
		}else{
		
		}
	}
	if (opt == 2) {
		let puntosVenta = document.formGastos.puntoVenta1.checked;
		if (puntosVenta == true) {
			chekOficina = document.getElementsByName("oficina1");
			chekOficina[0].checked = false;
			datos['opc'] = 'listarPuntosVenta';
			ejecutarAjax(datos, listarPuntosVenta1);	
		}else{
			
		}
	}
}

function listarOficinasResp1(datos) {
	var listaOficinas = datos;
	vista.cargarSelectOfi2('idOficina1', listaOficinas,'idOficina' , 'nombreOficina');
	
}

function listarPuntosVenta1(datos) {
	var listaPuntosVenta = datos;
	vista.cargarSelectOfi2('idOficina1', listaPuntosVenta, 'idPunto', 'nombrePunto');
	
}

function selecCatOficina2(opt) {
	var datos = {};
	if (opt == 1) {
		let oficinas = document.formGastos.oficina2.checked;
		if (oficinas == true) {
			chekPunto = document.getElementsByName("puntoVenta2");
			chekPunto[0].checked = false
			// datos['idCatOficina'] = opt;
			datos['opc'] = 'listarOficinas';
			ejecutarAjax(datos, listarOficinasResp2);	
		}else{
		
		}
	}
	if (opt == 2) {
		let puntosVenta = document.formGastos.puntoVenta2.checked;
		if (puntosVenta == true) {
			chekOficina = document.getElementsByName("oficina2");
			chekOficina[0].checked = false;
			datos['opc'] = 'listarPuntosVenta';
			ejecutarAjax(datos, listarPuntosVenta2);	
		}else{
			
		}
	}
}

function listarOficinasResp2(datos) {
	var listaOficinas = datos;
	vista.cargarSelectOfi2('idOficina2', listaOficinas,'idOficina' , 'nombreOficina');
	
}

function listarPuntosVenta2(datos) {
	var listaPuntosVenta = datos;
	vista.cargarSelectOfi2('idOficina2', listaPuntosVenta, 'idPunto', 'nombrePunto');
	
}

function selecCatOficina3(opt) {
	var datos = {};
	if (opt == 1) {
		let oficinas = document.formGastos.oficina3.checked;
		if (oficinas == true) {
			chekPunto = document.getElementsByName("puntoVenta3");
			chekPunto[0].checked = false
			// datos['idCatOficina'] = opt;
			datos['opc'] = 'listarOficinas';
			ejecutarAjax(datos, listarOficinasResp3);	
		}else{
		
		}
	}
	if (opt == 2) {
		let puntosVenta = document.formGastos.puntoVenta3.checked;
		if (puntosVenta == true) {
			chekOficina = document.getElementsByName("oficina3");
			chekOficina[0].checked = false;
			datos['opc'] = 'listarPuntosVenta';
			ejecutarAjax(datos, listarPuntosVenta3);	
		}else{
			
		}
	}
}

function listarOficinasResp3(datos) {
	var listaOficinas = datos;
	vista.cargarSelectOfi2('idOficina3', listaOficinas,'idOficina' , 'nombreOficina');
	
}

function listarPuntosVenta3(datos) {
	var listaPuntosVenta = datos;
	vista.cargarSelectOfi2('idOficina3', listaPuntosVenta, 'idPunto', 'nombrePunto');
	
}

function selecCatOficina4(opt) {
	var datos = {};
	if (opt == 1) {
		let oficinas = document.formGastos.oficina4.checked;
		if (oficinas == true) {
			chekPunto = document.getElementsByName("puntoVenta4");
			chekPunto[0].checked = false
			// datos['idCatOficina'] = opt;
			datos['opc'] = 'listarOficinas';
			ejecutarAjax(datos, listarOficinasResp4);	
		}else{
		
		}
	}
	if (opt == 2) {
		let puntosVenta = document.formGastos.puntoVenta4.checked;
		if (puntosVenta == true) {
			chekOficina = document.getElementsByName("oficina4");
			chekOficina[0].checked = false;
			datos['opc'] = 'listarPuntosVenta';
			ejecutarAjax(datos, listarPuntosVenta4);	
		}else{
			
		}
	}
}

function listarOficinasResp4(datos) {
	var listaOficinas = datos;
	vista.cargarSelectOfi2('idOficina4', listaOficinas,'idOficina' , 'nombreOficina');
	
}

function listarPuntosVenta4(datos) {
	var listaPuntosVenta = datos;
	vista.cargarSelectOfi2('idOficina4', listaPuntosVenta, 'idPunto', 'nombrePunto');
	
}

function selecCatOficina5(opt) {
	var datos = {};
	if (opt == 1) {
		let oficinas = document.formGastos.oficina5.checked;
		if (oficinas == true) {
			chekPunto = document.getElementsByName("puntoVenta5");
			chekPunto[0].checked = false
			// datos['idCatOficina'] = opt;
			datos['opc'] = 'listarOficinas';
			ejecutarAjax(datos, listarOficinasResp5);	
		}else{
		
		}
	}
	if (opt == 2) {
		let puntosVenta = document.formGastos.puntoVenta5.checked;
		if (puntosVenta == true) {
			chekOficina = document.getElementsByName("oficina5");
			chekOficina[0].checked = false;
			datos['opc'] = 'listarPuntosVenta';
			ejecutarAjax(datos, listarPuntosVenta5);	
		}else{
			
		}
	}
}

function listarOficinasResp5(datos) {
	var listaOficinas = datos;
	vista.cargarSelectOfi2('idOficina5', listaOficinas,'idOficina' , 'nombreOficina');
	
}

function listarPuntosVenta5(datos) {
	var listaPuntosVenta = datos;
	vista.cargarSelectOfi2('idOficina5', listaPuntosVenta, 'idPunto', 'nombrePunto');
	
}

function selecCatOficina6(opt) {
	var datos = {};
	if (opt == 1) {
		let oficinas = document.formGastos.oficina6.checked;
		if (oficinas == true) {
			chekPunto = document.getElementsByName("puntoVenta6");
			chekPunto[0].checked = false
			// datos['idCatOficina'] = opt;
			datos['opc'] = 'listarOficinas';
			ejecutarAjax(datos, listarOficinasResp4);	
		}else{
		
		}
	}
	if (opt == 2) {
		let puntosVenta = document.formGastos.puntoVenta6.checked;
		if (puntosVenta == true) {
			chekOficina = document.getElementsByName("oficina6");
			chekOficina[0].checked = false;
			datos['opc'] = 'listarPuntosVenta';
			ejecutarAjax(datos, listarPuntosVenta6);	
		}else{
			
		}
	}
}

function listarOficinasResp6(datos) {
	var listaOficinas = datos;
	vista.cargarSelectOfi2('idOficina6', listaOficinas,'idOficina' , 'nombreOficina');
	
}

function listarPuntosVenta6(datos) {
	var listaPuntosVenta = datos;
	vista.cargarSelectOfi2('idOficina6', listaPuntosVenta, 'idPunto', 'nombrePunto');
	
}


function selecCatUsuario(opc){
	var datos = {};
	if (opc == 1) {
		let auditores = document.formProgramacion.auditorSel.checked;
		if (auditores == true) {
			document.getElementById('auxiliarSel').checked = false;
			datos['opc'] = 'listarAuditores';
			ejecutarAjax(datos, listarAuditoresResp);
		}else{
			let selecUsuario = document.getElementById('idUsuario');
				selecUsuario.disabled = true;
		}
	}
	if (opc == 2) {
		let auxiliarAud = document.formProgramacion.auxiliarSel.checked;
		if (auxiliarAud == true) {
			document.getElementById('auditorSel').checked = false;
			datos['opc'] = 'listarAuxiliares';
			ejecutarAjax(datos, listarAuxiliaresResp);
		}else{
			let selecUsuario = document.getElementById('idUsuario');
				selecUsuario.disabled = true;
		}
	}
	if (opc == 3) {
		let auditores = document.formReproProgramacion.auditorSel099.checked;
		if (auditores == true) {
			document.getElementById('auxiliarSel099').checked = false;
			datos['opc'] = 'listarAuditores';
			ejecutarAjax(datos, listarAuditoresResp1);
		}else{
			let selecUsuario = document.getElementById('idUsuario099');
				selecUsuario.disabled = true;
		}
	}
	if (opc == 4) {
		let auxiliarAud = document.formReproProgramacion.auxiliarSel099.checked;
		if (auxiliarAud == true) {
			document.getElementById('auditorSel099').checked = false;
			datos['opc'] = 'listarAuxiliares';
			ejecutarAjax(datos, listarAuxiliaresResp1);
		}else{
			let selecUsuario = document.getElementById('idUsuario099');
				selecUsuario.disabled = true;
		}
	}
	if (opc == 5) {
		let auditores = document.formGastos.auditorSel.checked;
		if (auditores == true) {
			document.getElementById('auxiliarSel').checked = false;
			datos['opc'] = 'listarAuditores';
			ejecutarAjax(datos, listarAuditoresResp2);
		}else{
			let selecUsuario = document.getElementById('idUsuario');
				selecUsuario.disabled = true;
		}
	}
	if (opc == 6) {
		let auxiliarAud = document.formGastos.auxiliarSel.checked;
		if (auxiliarAud == true) {
			document.getElementById('auditorSel').checked = false;
			datos['opc'] = 'listarAuxiliares';
			ejecutarAjax(datos, listarAuxiliaresResp2);
		}else{
			let selecUsuario = document.getElementById('idUsuario');
				selecUsuario.disabled = true;
		}
	}

}

function listarAuditoresResp(datos) {
	listaAuditores = datos;
	vista.cargarSelectUsu('idUsuario', listaAuditores, 'idUsuario', 'nombreUsuario', 'apellidoUsuario');
	let selecUsuario = document.getElementById('idUsuario');
		selecUsuario.disabled = false;
}

function listarAuxiliaresResp(datos) {
	listaAuxiliaresAud = datos;
	vista.cargarSelectUsu('idUsuario', listaAuxiliaresAud, 'idUsuario', 'nombreUsuario', 'apellidoUsuario');
	let selecUsuario = document.getElementById('idUsuario');
		selecUsuario.disabled = false;
}

function listarAuditoresResp1(datos) {
	listaAuditores = datos;
	vista.cargarSelectUsu('idUsuario099', listaAuditores, 'idUsuario', 'nombreUsuario', 'apellidoUsuario');
	let selecUsuario = document.getElementById('idUsuario099');
		selecUsuario.disabled = false;
		document.getElementById('idUsuario099').value = listaProgramacion[positionPro]['idUsuario'];
}

function listarAuxiliaresResp1(datos) {
	listaAuxiliaresAud = datos;
	vista.cargarSelectUsu('idUsuario099', listaAuxiliaresAud, 'idUsuario', 'nombreUsuario', 'apellidoUsuario');
	let selecUsuario = document.getElementById('idUsuario099');
		selecUsuario.disabled = false;
		document.getElementById('idUsuario099').value = listaProgramacion[positionPro]['idUsuario'];
}

function listarAuditoresResp2(datos) {
	listaAuditores = datos;
	vista.cargarSelectUsu2('idUsuario', listaAuditores, 'idUsuario', 'nombreUsuario', 'apellidoUsuario');
	let selecUsuario = document.getElementById('idUsuario');
		selecUsuario.disabled = false;
}

function listarAuxiliaresResp2(datos) {
	listaAuxiliaresAud = datos;
	vista.cargarSelectUsu2('idUsuario', listaAuxiliaresAud, 'idUsuario', 'nombreUsuario', 'apellidoUsuario');
	let selecUsuario = document.getElementById('idUsuario');
		selecUsuario.disabled = false;
}

function fechaAut(opc) {
	let fechaIni = "";
	let fechaFin = "";
	switch(opc){
		case 1:
			fechaIni = document.getElementById('fechaInicio').value;
			fechaFin = document.getElementById('fechaFin').value;
			break;

		case 2:
			fechaIni = document.getElementById('fechaInicio099').value;
			fechaFin = document.getElementById('fechaFin099').value;
			break;

		case 3:
			fechaIni = document.getElementById('fechaInicio99').value;
			fechaFin = document.getElementById('fechaFin99').value;
			break;
	}
	
	fechaFin =  new Date(fechaFin);
	fechaFin = fechaFin.setDate(fechaFin.getDate() + 2);
	fechaIni = moment(fechaIni);
	fechaFin = moment(fechaFin);
	// alert(fechaFin.diff(fechaIni , 'days') + ' Dias de diferencia');
	if (fechaIni._isValid == false) {
		alert('Se debe seleccionar una fecha de inicio primero');
	}else{
		let diferencia = fechaFin.diff(fechaIni , 'days');
		document.getElementById('dias').value = diferencia;
	}
}

function aggOficina(){
	if (trId >= 1) {
		trId = trId + 1;
		let trIdN = trId -1;
		var tr = '';
			tr = '<tr id="nuevaOficina'+ trId +'"></tr>';
		$("#nuevaOficina" + trIdN).after(tr);
		vista.campoOficina(trId, trId);
		$(document).ready(function() {
			$('.select2').select2();
		});
		var btnC = '<button class="btn btn-outline-success btnConf" onclick="crearGasto('+ trId +','+ trIdG +');">Confirmar</button>';
			document.getElementById('btnConfir').innerHTML = btnC;
		$('#menos1').show();
	}else{
		trId = trId + 1;
		var tr = '';
			tr = '<tr id="nuevaOficina'+ trId +'"></tr>';
		$("#trOficina").after(tr);
		vista.campoOficina(trId, trId);
		$(document).ready(function() {
			$('.select2').select2();
		});
		var btnC = '<button class="btn btn-outline-success btnConf" onclick="crearGasto('+ trId +','+ trIdG +');">Confirmar</button>';
			document.getElementById('btnConfir').innerHTML = btnC;
		$('#menos1').show();
	}
	// vista.campoOficina();
}

function aggConcepGasto() {
	if (trIdG >= 1) {
		trIdG = trIdG + 1;
		let trIdN = trIdG -1;
		var tr = '';
			tr = '<tr id="nuevoConcepGasto' + trIdG +'"></tr>';
		$("#nuevoConcepGasto" + trIdN).after(tr);
		vista.campoGasto(trIdG);
		$(document).ready(function() {
			$('.select2').select2();
		});
		var btnC = '<button class="btn btn-outline-success btnConf" onclick="crearGasto('+ trId +','+ trIdG +');">Confirmar</button>';
			document.getElementById('btnConfir').innerHTML = btnC;
		$('#menos2').show();
	}else{
		trIdG = trIdG + 1;
		var tr = '';
			tr = '<tr id="nuevoConcepGasto' + trIdG + '"></tr>';
		$('#trGasto').after(tr);
		vista.campoGasto(trIdG);
		$(document).ready(function() {
			$('.select2').select2();
		});
		var btnC = '<button class="btn btn-outline-success btnConf" onclick="crearGasto('+ trId +','+ trIdG +');">Confirmar</button>';
			document.getElementById('btnConfir').innerHTML = btnC;
		$('#menos2').show();
	}
}

function eliOficina(){
	$('#nuevaOficina' + trId).remove();
	trId = trId - 1;
	var btnC = '<button class="btn btn-outline-success btnConf" onclick="crearGasto('+ trId +','+ trIdG +');">Confirmar</button>';
			document.getElementById('btnConfir').innerHTML = btnC;
	if (trId == 0) {
		$('#menos1').hide();
	}
}

function eliConcepGasto(){
	$('#nuevoConcepGasto' + trIdG).remove();
	trIdG = trIdG - 1;
	var btnC = '<button class="btn btn-outline-success btnConf" onclick="crearGasto('+ trId +','+ trIdG +');">Confirmar</button>';
			document.getElementById('btnConfir').innerHTML = btnC;
	if (trIdG == 0) {
		$('#menos2').hide();
	}
}

function replicarTex(opc) {
	document.getElementById('segundo').innerHTML = document.getElementById('primero').value;
	if (opc == 1) {
		var num1 = Number(document.querySelector('#texto' + opc).value);
		var num2 = Number(document.querySelector('#primero').value);
		var suma = parseInt(num1 + num2);
		document.getElementById('segundo').innerHTML = suma; 
	}else if (opc == 2) {
		var ant = opc -1;
		var num1 = Number(document.querySelector('#primero').value);
		var num2 = Number(document.querySelector('#texto' + ant).value);
		var num3 = Number(document.querySelector('#texto' + opc).value);
		var suma = parseInt(num1 + num2 + num3);
		document.getElementById('segundo').innerHTML = suma;
	}else if (opc == 3) {
		var ant = opc - 2;
		var num1 = Number(document.querySelector('#primero').value);
		var num2 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num3 = Number(document.querySelector('#texto' + ant).value);
		var num4 = Number(document.querySelector('#texto' + opc).value);
		var suma = parseInt(num1 + num2 + num3 + num4);
		document.getElementById('segundo').innerHTML = suma;
	}else if (opc == 4) {
		var ant = 1;
		var num1 = Number(document.querySelector('#primero').value);
		var num2 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num3 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num4 = Number(document.querySelector('#texto' + ant).value);
		var num5 = Number(document.querySelector('#texto' + opc).value);
		var suma = parseInt(num1 + num2 + num3 + num4 + num5);
		document.getElementById('segundo').innerHTML = suma;
	}else if (opc == 5) {
		var ant = 1;
		var num1 = Number(document.querySelector('#primero').value);
		var num2 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num3 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num4 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num5 = Number(document.querySelector('#texto' + ant).value);
		var num6 = Number(document.querySelector('#texto' + opc).value);
		var suma = parseInt(num1 + num2 + num3 + num4 + num5 + num6);
		document.getElementById('segundo').innerHTML = suma;
	}else if (opc == 6) {
		var ant = 1;
		var num1 = Number(document.querySelector('#primero').value);
		var num2 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num3 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num4 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num5 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num6 = Number(document.querySelector('#texto' + ant).value);
		var num7 = Number(document.querySelector('#texto' + opc).value);
		var suma = parseInt(num1 + num2 + num3 + num4 + num5 + num6 + num7);
		document.getElementById('segundo').innerHTML = suma;
	}else if (opc == 7) {
		var ant = 1;
		var num1 = Number(document.querySelector('#primero').value);
		var num2 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num3 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num4 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num5 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num6 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num7 = Number(document.querySelector('#texto' + ant).value);
		var num8 = Number(document.querySelector('#texto' + opc).value);
		var suma = parseInt(num1 + num2 + num3 + num4 + num5 + num6 + num7 + num8);
		document.getElementById('segundo').innerHTML = suma;
	}else if (opc == 8) {
		var ant = 1;
		var num1 = Number(document.querySelector('#primero').value);
		var num2 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num3 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num4 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num5 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num6 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num7 = Number(document.querySelector('#texto' + ant).value);
		ant = ant + 1;
		var num8 = Number(document.querySelector('#texto' + ant).value);
		var num9 = Number(document.querySelector('#texto' + opc).value);
		var suma = parseInt(num1 + num2 + num3 + num4 + num5 + num6 + num7 + num8);
		document.getElementById('segundo').innerHTML = suma;
	}
}

function crearGasto(ofi,gast) {
	gasto.setData(vista.getDatosForm('formGastos'));
		let msj = vista.validarDatosForm('formGastos');
		if (msj == 'ok') {
			var datos = gasto.getData();
			var ofic = document.getElementById('idOficina').value;
			var concep = document.getElementById('conceptoGasto').value;
			var valorP = document.getElementById('primero').value;
			var obser = datos['observacion'];
			if (ofi == undefined && gast == undefined) {
				datos['oficina'] = document.getElementById('idOficina').value;
				datos['valorParcial'] = document.getElementById('primero').value;
				datos['totalViaticos'] = document.getElementById('segundo').innerText;
			}else if (ofi > 0 && gast == 0 ) {
				var nuevoCon = 0;
				for (let i = 0; i < ofi; i++) {
					nuevoCon = nuevoCon + 1;
					ofic = ofic + '||\n<br> ' + document.getElementById('idOficina'+ nuevoCon).value;
					
				}
				datos['oficina'] = ofic;
				datos['valorParcial'] = document.getElementById('primero').value;
				datos['totalViaticos'] = document.getElementById('segundo').innerText;
			}else if (ofi == 0 && gast > 0) {
				var nuevoCon = 0;
				for (let i = 0; i < gast; i++) {
					nuevoCon = nuevoCon + 1;
					concep = concep + '||\n<br> ' + document.getElementById('nuevoConcepGastos' + nuevoCon).value; 
					valorP = valorP + '||\n<br> ' + document.getElementById('texto' + nuevoCon).value;
					obser = obser + '||\n<br> ' + document.getElementById('observacion' + nuevoCon).value;
				}
				datos['oficina'] = document.getElementById('idOficina').value;
				datos['conceptoGasto'] = concep;
				datos['valorParcial'] = valorP;
				datos['observacion'] = obser;
				datos['totalViaticos'] = document.getElementById('segundo').innerText;
			}else{
				var nuevoCon = 0;
				for (let i = 0; i < ofi; i++) {
					nuevoCon = nuevoCon + 1;
					ofic = ofic + '||\n<br> ' + document.getElementById('idOficina'+ nuevoCon).value;
				}
				nuevoCon = 0;
				for (let i = 0; i < gast; i++) {
					nuevoCon = nuevoCon + 1;
					concep = concep + '||\n<br> ' + document.getElementById('nuevoConcepGastos' + nuevoCon).value; 
					valorP = valorP + '||\n<br> ' + document.getElementById('texto' + nuevoCon).value;
					obser = obser + '||\n<br> ' + document.getElementById('observacion' + nuevoCon).value;
				}
				datos['oficina'] = ofic;
				datos['conceptoGasto'] = concep;
				datos['observacion'] = obser;
				datos['valorParcial'] = valorP;
				datos['totalViaticos'] = document.getElementById('segundo').innerText;
			}
			/*var usuario = idUsuario;
			datos['idUsuario'] = usuario;*/
			datos['opc'] = 'crearGasto';
			ejecutarAjax(datos, crearGastoResp);
		}else{
			vista.mostrarAviso('Debe llenar todos los campos');
		}
}

function crearGastoResp(resp){
	if (resp['ok'] == 1) {
		alert('exito al crear');
		trId = 0;
		trIdG = 0;
		vistaGastos();
	}
}

function guardarAuditoria(opc){
	event.preventDefault();
	if (opc == undefined) {
		auditorias.setData(vista.getDatosForm('formAuditoria'));
		let msj = vista.validarDatosForm('formAuditoria');
		if (msj == 'ok') {
			var datos = auditorias.getData();
			datos['arqueo'] = datos['idArqueo'].substring(3,10);
			var arq = datos['idArqueo'].substring(0,2);
			datos['idArqueo'] = arq;
		/*	datos['economico'] = document.getElementById('btnDiferencia').innerText;*/
			datos['idProgramacion'] = idProgramacion;
			datos['opc'] = 'crearAuditoria';
			ejecutarAjax(datos, guardarAuditoriaResp);
		}else{
			vista.mostrarAviso('Debe llenar todos los campos');
		}	
	}else if (opc > -1) {
		auditorias.setData(vista.getDatosForm('formAuditoria' + opc));
		let msj = vista.validarDatosForm('formAuditoria' + opc);
		if (msj == 'ok') {
			var datos = auditorias.getData();
			datos['arqueo'] = datos['idArqueo'].substring(3,10);
			arqNum = Number(datos['arqueo']);
			arq = datos['idArqueo'].substring(0,2);
			datos['idArqueo'] = arq;
			datos['idAuditado'] = document.getElementById('idAuditado'+ opc).value;
			datos['economico'] = document.getElementById('btnDiferencia'+ opc).innerText;
			datos['idProgramacion'] = idProgramacion;
			datos['opc'] = 'crearAuditoria';
			ejecutarAjax(datos, guardarAuditoriaResp2);
		}else{
			vista.mostrarAviso('Debe llenar todos los campos');
		}
	}
	
}

function guardarAuditoriaResp(resp){
	if (resp['ok'] == 1) {
		var nuevoArqueo = arqueo[0]['arqueo'] + 1;
		let datos = {'opc': 'actualizarArqueo', 'idArqueo': arqueo[0]['idArqueo'], 'arqueo': nuevoArqueo};
		ejecutarAjax(datos, actializarArqueoResp);
	}
}

function guardarAuditoriaResp2(resp){
	if (resp['ok'] == 1) {
		var nuevoArqueo = Number(arqNum) + 1;
		let datos = {'opc': 'actualizarArqueo', 'idArqueo': arqueo[0]['idArqueo'], 'arqueo': nuevoArqueo};
		ejecutarAjax(datos, actializarArqueoResp);
	}
}

function actializarArqueoResp(resp){
	if (resp['ok'] == 1) {
		let datos = {'opc': 'cargarArqueo', 'idUsuario': idUsuario};
		ejecutarAjax(datos, cargarArqueoresp2);
		
	}
}

function cargarArqueoresp2(){
	alert('exito al guardar');
	$('#checkOk').show();
	$('#btnSave').hide();
}

function aggAuditoria(cons) {
	if (trIdA >= 1) {
		cons = cons + arqueo[0]['arqueo'];
		let trIdN = trIdA -1;
		var tr = '';
			tr = '<form id="formAuditoria' + trIdA +'" name="formAuditoria' + trIdA +'"></form>';
		$("#formAuditoria" + trIdN).after(tr);
		vista.campoAuditoria(trIdA, arqueo[0]['idArqueo'], cons,2);
		vista.cargarSelectOfi('idAuditado'+trIdA, listarAuditados, 'idAuditado', 'nombreAuditado');
		$(document).ready(function() {
			$('.select2').select2();
		});
		trIdA = trIdA + 1;
		var cambio = '';
			cambio = '<img class="imgAgregarModal" src="img/icono-agregar-png.png" alt="" onclick="aggAuditoria('+ trIdA +');">';
			document.getElementById('aggAudi').innerHTML = cambio;
	}else{
		var tr = '';
			tr = '<form id="formAuditoria' + trIdA + '" name="formAuditoria' + trIdA +'"></form>';
		$('#formAuditoria').after(tr);
		vista.campoAuditoria(trIdA, arqueo[0]['idArqueo'], arqueo[0]['arqueo'],2);
		vista.cargarSelectOfi('idAuditado'+trIdA, listarAuditados, 'idAuditado', 'nombreAuditado');
		$(document).ready(function() {
			$('.select2').select2();
		});
		trIdA = trIdA + 1;
		var cambio = '';
			cambio = '<img class="imgAgregarModal" src="img/icono-agregar-png.png" alt="" onclick="aggAuditoria('+ trIdA +');">';
			document.getElementById('aggAudi').innerHTML = cambio;
	}
}

function btnDiferenciaC(id){
	event.preventDefault();
	if (id == undefined) {
		var valor = document.getElementById('btnDiferencia').innerText;
		if (valor == '$1-$150.000') {
			var nuevoValor = '$150.000-$500.000';
			document.getElementById('btnDiferencia').innerText = nuevoValor;
		}
		if (valor == '$150.000-$500.000') {
			var nuevoValor = '$500.001+';
			document.getElementById('btnDiferencia').innerText = nuevoValor;
		}
		if (valor == '$500.001+') {
			var nuevoValor = '$1-$150.000';
			document.getElementById('btnDiferencia').innerText = nuevoValor;
		}	
	}else{
		var valor = document.getElementById('btnDiferencia' + id).innerText;
		if (valor == '$1-$150.000') {
			var nuevoValor = '$150.000-$500.000';
			document.getElementById('btnDiferencia' + id).innerText = nuevoValor;
		}
		if (valor == '$150.000-$500.000') {
			var nuevoValor = '$500.001+';
			document.getElementById('btnDiferencia' + id).innerText = nuevoValor;
		}
		if (valor == '$500.001+') {
			var nuevoValor = '$1-$150.000';
			document.getElementById('btnDiferencia' + id).innerText = nuevoValor;
		}
	}
}

function cambiarEstado(opc,idUsu) {
	if (opc == 1) {
		var estado = 2;
		datos = {'opc': 'cambiarEstado', 'idUsuario': idUsu, 'idEstado' : estado};
		ejecutarAjax(datos, cambiarEstadoResp);
	}
	if (opc == 2) {
		var estado = 3;
		datos = {'opc': 'cambiarEstado', 'idUsuario': idUsu, 'idEstado' : estado};
		ejecutarAjax(datos, cambiarEstadoResp);
	}
	if (opc == 3) {
		var estado = 1;
		datos = {'opc': 'cambiarEstado', 'idUsuario': idUsu, 'idEstado' : estado};
		ejecutarAjax(datos, cambiarEstadoResp);
	}
}

function cambiarEstadoResp(resp) {
	if (resp['ok'] == 1) {
		ShowSelected(2);
	}
}

function generarReporteProgramacion(){
	//$('#reporteProgramacion').dataTable().fnDestroy();
	var inicio = document.getElementById('fechaInicioP').value;
	var fin = document.getElementById('fechaFinP').value;
	if (inicio != '' && fin != '') {
		// Se guardan los valores de inicio y de fin en una varible datos
		var datos = {'opc' : 'generarReporteProgramacion', 'fechaInicio': inicio, 'fechaFin': fin};
		ejecutarAjax(datos, generarReporteProgramacionResp);
		// Se muestra la tabla 
	}else{
		alert('Debe seleccionar fechas');
	}
}

function generarReporteProgramacionResp(datos1) {
	$('#reporteProgramacion').show();
	$(document).ready(function(){
		$('#reporteProgramacion').DataTable({
				dom: 'Bfrtip',
	        buttons: [
	            'excelHtml5',
	            'pdfHtml5'
	        ]
		});
	});
	vista.mostrarDatosTablaReport('bodyReportesProgra', datos1, '');
	
}

function generarReporteAuditoria() {
	//$('#reporteAuditoria').dataTable().fnDestroy();
	var inicio = document.getElementById('fechaInicio').value;
	var fin = document.getElementById('fechaFin').value;
	if (inicio != '' && fin != '') {
		// Se guardan los valores de inicio y de fin en una varible datos
		var datos = {'opc' : 'generarReporteAuditoria', 'fechaInicio': inicio, 'fechaFin': fin};
		ejecutarAjax(datos, generarReporteAuditoriaResp);
		// Se muestra la tabla 
	}else{
		alert('Debe seleccionar fechas');
	}
}

function generarReporteAuditoriaResp(datos1) {
	$('#reporteAuditoria').show();
	$(document).ready(function(){
		$('#reporteAuditoria').DataTable({
				dom: 'Bfrtip',
	        buttons: [
	            'excelHtml5',
	            'pdfHtml5'
	        ]
		});
	});
	vista.mostrarDatosTablaReport('bodyReportes', datos1, '');
}

function generarReporteGasto() {
	//$('#reporteGasto').dataTable().fnDestroy();
	var inicio = document.getElementById('fechaInicioG').value;
	var fin = document.getElementById('fechaFinG').value;
	if (inicio != '' && fin != '') {
		// Se guardan los valores de inicio y de fin en una varible datos
		var datos = {'opc' : 'generarReporteGasto', 'fechaInicio': inicio, 'fechaFin': fin};
		ejecutarAjax(datos, generarReporteGastoResp);
		// Se muestra la tabla 
	}else{
		alert('Debe seleccionar fechas');
	}
}

function generarReporteGastoResp(datos1) {
	/*for (var i = 0; i < datos1.length; i++) {
 		var oficinat = dato[i]['oficina'];
 		let posicionEspacio = oficinat.indexOf(",");
		let oficinat1 = oficinat.substring(0, posicionEspacio);
	}*/
	$('#reporteGasto').show();
	$(document).ready(function(){
		$('#reporteGasto').DataTable({
				dom: 'Bfrtip',
	        buttons: [
	            'excelHtml5',
	            'pdfHtml5'
	        ]
		});
	});

	vista.mostrarDatosTablaReport('bodyReprtGastos', datos1, '');
}

function generarReporteHistorial() {
	//$('#reporteHistorialProgramacion').dataTable().fnDestroy();
	var inicio = document.getElementById('fechaInicioH').value;
	var fin = document.getElementById('fechaFinH').value;
	if (inicio != '' && fin != '') {
		// Se guardan los valores de inicio y de fin en una varible datos
		var datos = {'opc' : 'generarReporteHistorial', 'fechaInicio': inicio, 'fechaFin': fin};
		ejecutarAjax(datos, generarReporteGastoHistorialResp);
		// Se muestra la tabla 
	}else{
		alert('Debe seleccionar fechas');
	}
}

function generarReporteGastoHistorialResp(datos1) {
	$('#reporteHistorialProgramacion').show();
	$(document).ready(function(){
		$('#reporteHistorialProgramacion').DataTable({
				dom: 'Bfrtip',
	        buttons: [
	            'excelHtml5',
	            'pdfHtml5'
	        ]
		});
	});

	vista.mostrarDatosTablaReportH('bodyReprtHistorial', datos1, '');
}

function agregarPrograma() {
	var prog = document.getElementById('programa').value;
	if (prog != '') {
		datos = {'opc': 'agregarPrograma', 'programa': prog};
		ejecutarAjax(datos, agregarProgramaResp);
	}else{
		alert('Debe llenar el campo *Nombre del programa*');
	}
}

function agregarProgramaResp(resp) {
	if (resp['ok'] == 1) {
		alert('Se creo el programa satisfactoriamente');
	}
}

function agregarConceptoGasto() {
	var gas = document.getElementById('conceptoGasto').value;
	if (gas != '') {
		datos = {'opc': 'agregarConceptoGasto', 'conceptoGasto': gas};
		ejecutarAjax(datos, agregarConceptoGastoResp);
	}else{
		alert('Debe llenar el campo *Nuevo concepto de gasto*');
	}
}

function agregarConceptoGastoResp(resp) {
	if (resp['ok'] == 1) {
		alert('Se creo el concepto de gasto satisfactoriamente');
	}
}

function agregarAsignarArqueo() {
	var arq = document.getElementById('idArqueo').value;
	var usu = document.getElementById('idUsuario').value;
	if (arq != '' && usu > -1) {
		arq = arq + '$';
		datos = {'opc': 'agregarAsignarArqueo', 'idArqueo': arq, 'idUsuario': usu};
		ejecutarAjax(datos, agregarAsignarArqueoResp);
	}else{
		alert('Debe llenar todos los campos');
	}
}

function agregarAsignarArqueoResp(resp) {
	if (resp['ok'] == 1) {
		alert('Se asigno el arqueo correctamente');
	}
	if (resp['ok'] == -1) {
		alert('Ya existe el prefijo \n O el usuario ya tiene un prefijo asignado.');
	}
}

function crearOficina(){
	var categoria = document.getElementById('idCatOficina').value;
	if (categoria == 1) {
		oficinaM.setData(vista.getDatosForm('formCrearOficina'));
		let msj = vista.validarDatosForm('formCrearOficina');
		if (msj == 'ok') {
			var datos = oficinaM.getData();
			datos['opc'] = 'crearOficina';
			ejecutarAjax(datos, crearOficinaResp);
		}
	}else if (categoria == 2) {
		var nuevoId = document.getElementsByName('idOficina');
			nuevoId[0].id = "idPunto";
		var nuevoId = document.getElementsByName('nombreOficina');
			nuevoId[0].id = "nombrePunto";
		var nuevoId = document.getElementsByName('ubicacion');
			nuevoId[0].id = "ubicacionPunto";
		punto.setData(vista.getDatosForm('formCrearOficina'));
		let msj = vista.validarDatosForm('formCrearOficina');
		if (msj == 'ok') {
			var datos = punto.getData();
			datos['opc'] = 'crearPunto';
			ejecutarAjax(datos, crearPuntoResp);
		}
	}else{
		alert('Debe seleccionar una categoria');
	}
}

function crearOficinaResp(resp){
	if (resp['ok'] == 1) {
		vista.mostrarAviso('Exito al crear');
		vistaCrearOficina();
	}else if (resp['ok'] == -1) {
		vista.mostrarAviso('La oficina ya existe');
	}else{
		vista.mostrarAviso('Error al crear');
	}
}

function crearPuntoResp(resp){
	if (resp['ok'] == 1) {
		vista.mostrarAviso('Exito al crear');
		vistaCrearOficina();
	}else if (resp['ok'] == -1) {
		vista.mostrarAviso('El punto de venta ya existe');
	}else{
		vista.mostrarAviso('Error al crear');
	}
}

function editarOficinaForm(id){
		var p = 0;
		for (let i = 0; i < listaOfici.length; i++) {
			if (listaOfici[i]['idOficina'] == id) {
				p = i;
			}
		}
		
		document.getElementById('idOficina').value = listaOfici[p]['idOficina'];
		document.getElementById('nombreOficina').value = listaOfici[p]['nombreOficina'];
		document.getElementById('ubicacion').value = listaOfici[p]['ubicacion'];
}

function editarOfi(){
	oficinaM.setData(vista.getDatosForm('frmEditOfi'));
	let msj = vista.validarDatosForm('frmEditOfi');
	if (msj == 'ok') {
		var datos = oficinaM.getData();
		datos['idCatOficina'] = document.getElementById('idCatOficina').value;
		datos['opc'] = 'editarOficina';
		ejecutarAjax(datos, editarOfiResp);
	}
}

function editarOfiResp(resp){
	if (resp['ok'] == 1) {
		alert('Se actualizo con exito!!');
		vistaEditarOficina();
	}else if (resp['ok'] == -1) {
		alert('No se modifico');
	}
}

function editarPdvForm(id){
		var p = 0;
		for (let i = 0; i < listaPdv.length; i++) {
			if (listaPdv[i]['idPunto'] == id) {
				p = i;
			}
		}
		
		document.getElementById('idOficina').value = listaPdv[p]['idPunto'];
		document.getElementById('nombreOficina').value = listaPdv[p]['nombrePunto'];
		document.getElementById('ubicacion').value = listaPdv[p]['ubicacionPunto'];
}