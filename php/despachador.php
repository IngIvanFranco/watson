<?php
ini_set('display_errors', 'On'); 		//Solo para depuracion
error_reporting(E_ALL | E_STRICT);




/**************************************************************************
 	PROYECTO: C & G Domicilios
 	MODULO: Cliente
 	PROGRAMA: despachador.php
 	Recibe las solicitudes del cliente (via AJAX) y las
 	ejecuta segun el parametro $_POST["opc"]
 	devuelve datos en formato JSON
 	Programador: RICHARD TORRES
 	Fecha: marzo/11/2019
 	ver: 1.0
***************************************************************************/
/**************************************************************************
 	MODIFICACION:se le agrego compos a la base de datos
	 requeridos por el cliente
	PROGRAMA : Despachador.php
	DESARROLLADOR : TECNOLOGO (ADSI)SEBASTIAN CRIALES
	FECHA: nov/05/2021
	 SUPERVISION :DIRECTOR TICS ING. IVAN FRANCO
***************************************************************************/
include("enlaceBD.php");		//Conecta a la BD $conexion

/********** OBJETOS GLOBALES***********************************************/
//var_dump($_POST);
	$opcion = $_POST["opc"];	//La opcion del menu enviada por ajax desde el cliente
	$cons = "";		 	//Contendra la consulta SQL a realizar
	$sqlTest = "";		//Consulta para probar la existencia de PK
	$sqlTest1 = "";		//Consulta para probar la existencia de FK
	$datos = array();	//Contendra los datos enviados del cliente

	/*********** MODULO DESPACHADOR ********************************************/

	switch ($opcion){
        case 'verificarUsuario':
            $cons = 'SELECT idUsuario, password, idEstado FROM usuario WHERE idUsuario = ?';
                $datos[0] = $_POST['idUsuario'];
                $datos[1] = $_POST['password'];
				
                leerRegistro($cons, $datos);
			break;
			
		case 'validarUsuario':
			$password = $_POST['password'];
			$passwordBD = $_POST['passwordBD'];

			
			if (password_verify($password, $passwordBD)) {
				$cons = 'SELECT idUsuario, password, idCatUsuario, idEstado  FROM usuario WHERE idUsuario = ? AND password = ?';
					$datos[0] = $_POST['idUsuario'];
					$datos[1] = $passwordBD;
					
					$_SESSION['idusr'] =  $_POST['password'];
					$_SESSION['pass'] =  $_POST['passwordBD'];
				
					
					
					leerRegistro($cons, $datos);
					
				}else {
					$arr = array('ok' => -1);
					echo json_encode($arr);
				}
				
				break;
	

		case 'listarOficinas':
			$cons = 'SELECT idOficina, nombreOficina FROM oficina';
				leerRegistro($cons, $datos);
			break;
			case 'listarAcopio':
				$cons = 'SELECT id, nombre_acopio FROM acopio';
					leerRegistro($cons, $datos);
				break;
		case 'listarPuntosVenta':
			$cons = 'SELECT idPunto, nombrePunto FROM puntodeventa';
				leerRegistro($cons, $datos);
			break;

		case 'cargarCatUsuario':
			$cons = 'SELECT * FROM categoriausuario';
				leerRegistro($cons, $datos);
			break;

		case 'crearUsuario':
			$password = $_POST['idUsuario'];
			$passwordCifrado = password_hash($password, PASSWORD_DEFAULT);
			$sqlTest = 'SELECT * FROM usuario WHERE idUsuario = '. $_POST['idUsuario'];
			$cons = 'INSERT INTO usuario (idUsuario, nombreUsuario, apellidoUsuario, password, idCatUsuario, idEstado) VALUES (?, ?, ?, ?, ?, ?)';
				$datos[0] = $_POST['idUsuario'];
				$datos[1] = $_POST['nombreUsuario'];
				$datos[2] = $_POST['apellidoUsuario'];
				$datos[3] = $passwordCifrado;
				$datos[4] = $_POST['idCatUsuario'];
				$datos[5] = 3;
				$reg = actualizar($cons, $datos);
				$arr = array('ok' => $reg);
				echo json_encode($arr);
			break;

		case 'crearAuditado':
			$sqlTest = 'SELECT * FROM auditado WHERE idAuditado = '. $_POST['idUsuario'];
			$cons = 'INSERT INTO auditado (idAuditado, nombreAuditado, idCatUsuario, tipoContrato) VALUES (?, ?, ?, ?)';
				$datos[0] = $_POST['idUsuario'];
				$datos[1] = $_POST['nombreUsuario'];
				$datos[2] = $_POST['idCatUsuario'];
				$datos[3] = $_POST['tipoContrato'];
				$reg = actualizar($cons, $datos);
				$arr = array('ok' => $reg);
				echo json_encode($arr);
			break;

		case 'listarAuditores':
			$cons = 'SELECT idUsuario, nombreUsuario, apellidoUsuario FROM usuario WHERE idCatUsuario = 1';
				leerRegistro($cons, $datos);
			break;
		
		case 'listarAuxiliares':
			$cons = 'SELECT idUsuario, nombreUsuario, apellidoUsuario FROM usuario WHERE idCatUsuario = 2';
			leerRegistro($cons, $datos);
			break;

		case 'cargarProgramas':
			$cons = 'SELECT * FROM programa';
			leerRegistro($cons, $datos);
			break;

		case 'cargarProgramacion':
			// $cons = 'SELECT * FROM programacion';
			$cons = 'SELECT programacion.idProgramacion, programacion.fechaInicio, programacion.fechaFin, programacion.dias, programacion.idCatOficina, categoriaoficina.catOficina, programacion.idOficina, programacion.nombreOficina, programacion.idUsuario, usuario.nombreUsuario, usuario.apellidoUsuario, programacion.idPrograma, programa.programa, programacion.idTipoAuditoria, tipoauditoria.tipoAuditoria 
			FROM `programacion` INNER JOIN categoriaoficina ON programacion.idCatOficina = categoriaoficina.idCatOficina INNER JOIN usuario ON programacion.idUsuario = usuario.idUsuario INNER JOIN programa ON programacion.idPrograma = programa.idPrograma INNER JOIN tipoauditoria ON programacion.idTipoAuditoria = tipoauditoria.idTipoAuditoria ORDER BY programacion.idProgramacion DESC';
			leerRegistro($cons, $datos);
			break;

		case 'listarUsuarios':
			$cons = 'SELECT * FROM usuario';
			leerRegistro($cons, $datos);
			break;

		case 'crearProgramacion':
			$cons = 'INSERT INTO programacion (fechaInicio, fechaFin, dias, idCatOficina, idOficina, nombreOficina, idUsuario, idPrograma, idTipoAuditoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
				$datos[0] = $_POST['fechaInicio'];
				$datos[1] = $_POST['fechaFin'];
				$datos[2] = $_POST['dias'];
				$datos[3] = $_POST['idCatOficina'];
				$datos[4] = $_POST['idOficina'];
				$datos[5] = $_POST['nombreOficina'];
				$datos[6] = $_POST['idUsuario'];
				$datos[7] = $_POST['idPrograma'];
				$datos[8] = $_POST['idTipoAuditoria'];
			$reg = actualizar($cons, $datos);
			$arr = array('ok' => $reg);
			echo json_encode($arr);
			break;

		case 'listarAuditados':
			$cons = 'SELECT idAuditado, nombreAuditado FROM auditado';
			leerRegistro($cons, $datos);
			break;

		case 'crearAuditoria':
          
			$cons = 'INSERT INTO auditoria (horaInicio, horaFin, idAuditado,accionDisciplinaria, idArqueo, arqueo, idProgramacion,
			campo1,campo2,bill20,bill10,bill5,bill2,bill1,mon_mil,mon_500,mon_200,mon_100,mon_50,sal_conta_otros,bond,termica,otros_ing1,valor_ing1,otros_ing2,valor_ing2,otros_ing3,valor_ing3,otros_ing4,valor_ing4,otros_ing5,valor_ing5,docu1,valor1,docu2,valor2,docu3,valor3,docu4,valor4,docu5,valor5,docu6,valor6,termica_sist,bond_sist,observacion,diferencia) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

				$documentosequivalentes= $_POST['valor1']+$_POST['valor2']+ $_POST['valor3']+ $_POST['valor4']+$_POST['valor5']+$_POST['valor6'];
				$billetes= ($_POST['bill20']*20000)+($_POST['campo1']*100000)+($_POST['campo2']*50000)+($_POST['bill10']*10000)+($_POST['bill5']*5000)+($_POST['bill2']*2000)+($_POST['bill1']*1000);
				$monedas = ($_POST['mon_mil']*1000)+($_POST['mon_500']*500)+($_POST['mon_200']*200)+($_POST['mon_100']*100)+($_POST['mon_50']*50);

				$totalmovi= $documentosequivalentes+$billetes+$monedas;
				$totalingre= $_POST['sal_conta_otros']+$_POST['valor_ing1']+$_POST['valor_ing2']+$_POST['valor_ing3'];
					
				
				$difer= $totalingre-$totalmovi;
				
				$datos[0] = $_POST['horaInicio'];
				$datos[1] = $_POST['horaFin'];
				$datos[2] = $_POST['idAuditado'];
			    $datos[3] = $_POST['accionDisciplinaria'];
				$datos[4] = $_POST['idArqueo'];
				$datos[5] = $_POST['arqueo'];
				$datos[6] = $_POST['idProgramacion'];
				$datos[7] = $_POST['campo1'];
				$datos[8] = $_POST['campo2'];
				$datos[9] = $_POST['bill20'];
				$datos[10] = $_POST['bill10'];
				$datos[11] = $_POST['bill5'];
				$datos[12] = $_POST['bill2'];
				$datos[13] = $_POST['bill1'];
				$datos[14] = $_POST['mon_mil'];
				$datos[15] = $_POST['mon_500'];
				$datos[16] = $_POST['mon_200'];
				$datos[17] = $_POST['mon_100'];
				$datos[18] = $_POST['mon_50'];
				$datos[19] = $_POST['sal_conta_otros'];
				$datos[20] = $_POST['bond'];
				$datos[21] = $_POST['termica'];
				$datos[22] = $_POST['otros_ing1'];
				$datos[23] = $_POST['valor_ing1'];
				$datos[24] = $_POST['otros_ing2'];
				$datos[25] = $_POST['valor_ing2'];
				$datos[26] = $_POST['otros_ing3'];
				$datos[27] = $_POST['valor_ing3'];
				$datos[28] = $_POST['otros_ing4'];
				$datos[29] = $_POST['valor_ing4'];
				$datos[30] = $_POST['otros_ing5'];
				$datos[31] = $_POST['valor_ing5'];
                $datos[32] = $_POST['docu1'];
				$datos[33] = $_POST['valor1'];
				$datos[34] = $_POST['docu2'];
				$datos[35] = $_POST['valor2'];
				$datos[36] = $_POST['docu3'];
				$datos[37] = $_POST['valor3'];
				$datos[38] = $_POST['docu4'];
				$datos[39] = $_POST['valor4'];
				$datos[40] = $_POST['docu5'];
				$datos[41] = $_POST['valor5'];
				$datos[42] = $_POST['docu6'];
				$datos[43] = $_POST['valor6'];
				$datos[44] = $_POST['bond_sist'];
				$datos[45] = $_POST['termica_sist'];
				$datos[46] = $_POST['observacion'];
				$datos[47] = $difer;
			
			
			
				

			
			$reg = actualizar($cons, $datos);
			$arr = array('ok' => $reg);
			echo json_encode($arr);
			break;

		case 'crearGasto':
			$cons = 'INSERT INTO viaticos (fechaInicio, fechaFin, oficina, conceptoGasto, observacion, valorParcial, totalViaticos, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
				$datos[0] = $_POST['fechaInicio'];
				$datos[1] = $_POST['fechaFin'];
				$datos[2] = $_POST['oficina'];
				$datos[3] = $_POST['conceptoGasto'];
				$datos[4] = $_POST['observacion'];
				$datos[5] = $_POST['valorParcial'];
				$datos[6] = $_POST['totalViaticos'];
				$datos[7] = $_POST['idUsuario'];
			$reg = actualizar($cons, $datos);
			$arr = array('ok' => $reg);
			echo json_encode($arr);
			break;

		case 'cargarArqueo':
			$cons = 'SELECT * FROM arqueo WHERE idUsuario = ?';
				$datos[0] = $_POST['idUsuario'];
			leerRegistro($cons, $datos);
			break;
		
		case 'actualizarArqueo':
			$cons = 'UPDATE arqueo SET arqueo = ? WHERE idArqueo = ?';
				$datos[0] = $_POST['arqueo'];
				$datos[1] = $_POST['idArqueo'];
			$reg = actualizar($cons, $datos);
			$arr = array('ok' => $reg);
			echo json_encode($arr);
			break;

		case 'cargarAuditoria':
			$cons = 'SELECT auditoria.idArqueo, auditoria.arqueo, auditoria.horaInicio, auditoria.horaFin, auditoria.idAuditado, auditado.nombreAuditado, auditoria.diferencia, auditoria.economico, auditoria.accionDisciplinaria, auditoria.idProgramacion,auditoria.idAuditoria FROM auditoria INNER JOIN auditado ON auditoria.idAuditado = auditado.idAuditado 
			WHERE idProgramacion = ?  AND auditoria.validacopm <> 3';
				$datos[0] = $_POST['idProgramacion'];
			leerRegistro($cons, $datos);
			break;

		case 'editarProgramacion':
			$cons = 'UPDATE programacion SET fechaInicio = ?, fechaFin = ?, dias = ?, idCatOficina = ?, idOficina = ?, idUsuario = ?, idPrograma = ?, idTipoAuditoria = ? WHERE idProgramacion = ?';
				$datos[0] = $_POST['fechaInicio'];
				$datos[1] = $_POST['fechaFin'];
				$datos[2] = $_POST['dias'];
				$datos[3] = $_POST['idCatOficina'];
				$datos[4] = $_POST['idOficina'];
				$datos[5] = $_POST['idUsuario'];
				$datos[6] = $_POST['idPrograma'];
				$datos[7] = $_POST['idTipoAuditoria'];
				$datos[8] = $_POST['idProgramacion'];
			$reg = actualizar($cons, $datos);
			$arr = array('ok' => $reg);
			echo json_encode($arr);
			break;

		case 'cargaUsuarios':
			if ($_POST['idCatUsuario'] == 1 or $_POST['idCatUsuario'] == 2 or $_POST['idCatUsuario'] == 13 ) {
				$cons = 'SELECT idUsuario, nombreUsuario, apellidoUsuario FROM usuario WHERE idCatUsuario = '.$_POST['idCatUsuario'];
			}else {
				$cons = 'SELECT idAuditado, nombreAuditado FROM auditado WHERE idCatUsuario = '.$_POST['idCatUsuario'];
			}
			leerRegistro($cons, $datos);
			break;

		case 'editarUsuario':
			if ($_POST['elec'] == 1) {
				$password = $_POST['password'];
				$passwordCifrado = password_hash($password, PASSWORD_DEFAULT);
				$cons = 'UPDATE usuario SET nombreUsuario = ?, apellidoUsuario = ?, password = ? WHERE idUsuario = ?';
					$datos[0] = $_POST['nombreUsuario'];
					$datos[1] = $_POST['apellidoUsuario'];
					$datos[2] = $passwordCifrado;
					$datos[3] = $_POST['idUsuario'];
				$reg = actualizar($cons, $datos);
				$arr = array('ok' => $reg);
				echo json_encode($arr);
			}
			break;

		case 'editarMiUsuario':
			$password = $_POST['passwordActual'];
			$passwordEncrip = $_POST['passwordEncrip'];
			if (password_verify($password, $passwordEncrip)) {
				$newPass = $_POST['password'];
				$passwordCifrado = password_hash($newPass, PASSWORD_DEFAULT);
				$cons = 'UPDATE usuario SET nombreUsuario = ?, apellidoUsuario = ?, password = ? WHERE idUsuario = ?';
					$datos[0] = $_POST['nombreUsuario'];
					$datos[1] = $_POST['apellidoUsuario'];
					$datos[2] = $passwordCifrado;
					$datos[3] = $_POST['idUsuario'];
				$reg = actualizar($cons, $datos);
				$arr = array('ok' => $reg);
				echo json_encode($arr);
			}
			
			break;

		case 'cargaUsuarios1':
			$cons = 'SELECT idUsuario, nombreUsuario, apellidoUsuario, idEstado FROM usuario WHERE idCatUsuario = '.$_POST['idCatUsuario'];
			leerRegistro($cons, $datos);
			break;

		case 'cambiarEstado':
			$cons = 'UPDATE usuario SET idEstado = ? WHERE idUsuario = ?';
				$datos[0] = $_POST['idEstado'];
				$datos[1] = $_POST['idUsuario'];
			$reg = actualizar($cons, $datos);
			$arr = array('ok' => $reg);
			echo json_encode($arr);
			break;

		case 'generarReporteAuditoria':
			$cons = 'SELECT programacion.idProgramacion, programacion.fechaInicio, programacion.fechaFin, programacion.dias, programacion.idCatOficina, categoriaoficina.catOficina, programacion.idOficina, oficina.nombreOficina, programacion.idUsuario, usuario.nombreUsuario, usuario.apellidoUsuario, programacion.idPrograma, programa.programa, programacion.idTipoAuditoria, tipoauditoria.tipoAuditoria, auditoria.idAuditoria, auditoria.horaInicio, auditoria.horaFin, auditoria.idAuditado, auditado.nombreAuditado, auditoria.diferencia, auditoria.economico, auditoria.accionDisciplinaria, auditoria.idArqueo, auditoria.arqueo FROM `programacion` INNER JOIN categoriaoficina ON programacion.idCatOficina = categoriaoficina.idCatOficina INNER JOIN oficina ON programacion.idOficina = oficina.idOficina INNER JOIN usuario ON programacion.idUsuario = usuario.idUsuario INNER JOIN programa ON programacion.idPrograma = programa.idPrograma INNER JOIN tipoauditoria ON programacion.idTipoAuditoria = tipoauditoria.idTipoAuditoria INNER JOIN auditoria ON programacion.idProgramacion = auditoria.idProgramacion INNER JOIN auditado ON auditoria.idAuditado = auditado.idAuditado WHERE AND auditoria.validacopm <> 3 AND fechaInicio BETWEEN ? AND ?';
				$datos[0] = $_POST['fechaInicio'];
				$datos[1] = $_POST['fechaFin'];
			leerRegistro($cons, $datos);
			break;

		case 'generarReporteProgramacion':
			$cons = 'SELECT programacion.idProgramacion, programacion.fechaInicio, programacion.fechaFin, programacion.dias, programacion.idCatOficina, categoriaoficina.catOficina, programacion.idOficina, programacion.nombreOficina, programacion.idUsuario, usuario.nombreUsuario, usuario.apellidoUsuario, programacion.idPrograma, programa.programa, programacion.idTipoAuditoria, tipoauditoria.tipoAuditoria FROM programacion INNER JOIN categoriaoficina ON programacion.idCatOficina = categoriaoficina.idCatOficina INNER JOIN usuario ON programacion.idUsuario = usuario.idUsuario INNER JOIN programa ON programacion.idPrograma = programa.idPrograma INNER JOIN tipoauditoria ON programacion.idTipoAuditoria = tipoauditoria.idTipoAuditoria WHERE fechaInicio BETWEEN ? AND ?';
				$datos[0] = $_POST['fechaInicio'];
				$datos[1] = $_POST['fechaFin'];
			leerRegistro($cons, $datos);
			break;
			
		case 'generarReporteGasto':
			$cons = 'SELECT * FROM viaticos WHERE fechaInicio BETWEEN ? AND ?';
				$datos[0] = $_POST['fechaInicio'];
				$datos[1] = $_POST['fechaFin'];
			leerRegistro($cons, $datos);
			break;

		case 'generarReporteHistorial':
			$cons = 'SELECT historialreprogramacion.idReprogramacion, historialreprogramacion.fechaInicioAnt, historialreprogramacion.fechaFinAnt, historialreprogramacion.diasAnt, historialreprogramacion.idOficina, oficina.nombreOficina, historialreprogramacion.idUsuarioAnt, historialreprogramacion.nombreUsuarioAnt, historialreprogramacion.apellidoUsuarioAnt, historialreprogramacion.idPrograma, programa.programa, historialreprogramacion.fechaReprogramacion, historialreprogramacion.idNovedades, novedades.novedad, historialreprogramacion.observacion, historialreprogramacion.idProgramacion, programacion.fechaInicio, programacion.fechaFin, programacion.idUsuario, usuario.nombreUsuario, usuario.apellidoUsuario FROM historialreprogramacion INNER JOIN oficina ON historialreprogramacion.idOficina = oficina.idOficina INNER JOIN programa ON historialreprogramacion.idPrograma = programa.idPrograma INNER JOIN novedades ON historialreprogramacion.idNovedades = novedades.idNovedades INNER JOIN programacion ON historialreprogramacion.idProgramacion = programacion.idProgramacion INNER JOIN usuario ON programacion.idUsuario = usuario.idUsuario';
			leerRegistro($cons, $datos);
			break;

		case 'listadoUsu':
			$cons = 'SELECT idUsuario, nombreUsuario, apellidoUsuario FROM usuario';
			leerRegistro($cons, $datos);
			break;

		case 'agregarPrograma':
			$cons = 'INSERT INTO programa (programa) VALUES (?)';
				$datos[0] = $_POST['programa'];
			$reg = actualizar($cons, $datos);
			$arr = array('ok' => $reg);
			echo json_encode($arr);
			break;

		case 'agregarConceptoGasto':
			$cons = 'INSERT INTO conceptogasto (conceptoGasto) VALUES (?)';
				$datos[0] = $_POST['conceptoGasto'];
			$reg = actualizar($cons, $datos);
			$arr = array('ok' => $reg);
			echo json_encode($arr);
			break;

		case 'agregarAsignarArqueo':
			$sqlTest = 'SELECT * FROM arqueo WHERE idUsuario = '. $_POST['idUsuario'];
			$cons = 'INSERT INTO arqueo (idArqueo, arqueo, idUsuario) VALUES (?, ?, ?)';
				$datos[0] = $_POST['idArqueo'];
				$datos[1] = 0;
				$datos[2] = $_POST['idUsuario'];
			$reg = actualizar($cons, $datos);
			$arr = array('ok' => $reg);
			echo json_encode($arr);
			break;

		case 'cargarUsuario':
			$cons = 'SELECT * FROM usuario WHERE idUsuario = ?';
				$datos[0] = $_POST['idUsuario'];
			leerRegistro($cons, $datos);
			break;

		case 'historialReprogramacion':
			$cons = 'INSERT INTO historialreprogramacion (fechaInicioAnt, fechaFinAnt, diasAnt, idCatOficina, idOficina, idUsuarioAnt, nombreUsuarioAnt, apellidoUsuarioAnt, idPrograma, fechaReprogramacion, idNovedades, observacion, idProgramacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
				$datos[0] = $_POST['fechaInicioAnt'];
				$datos[1] = $_POST['fechaFinAnt'];
				$datos[2] = $_POST['diasAnt'];
				$datos[3] = $_POST['idCatOficina'];
				$datos[4] = $_POST['idOficina'];
				$datos[5] = $_POST['idUsuarioAnt'];
				$datos[6] = $_POST['nombreUsuarioAnt'];
				$datos[7] = $_POST['apellidoUsuarioAnt'];
				$datos[8] = $_POST['idPrograma'];
				$datos[9] = $_POST['fechaReprogramacion'];
				$datos[10] = $_POST['idNovedades'];
				$datos[11] = $_POST['observacion'];
				$datos[12] = $_POST['idProgramacion'];
			$reg = actualizar($cons, $datos);
			$arr = array('ok' => $reg);
			echo json_encode($arr);
			break;

		case 'reprogramacion':
			$cons = 'UPDATE  programacion SET fechaInicio = ?, fechaFin = ?, dias = ?, idCatOficina = ?, idOficina = ?, idUsuario = ?, idPrograma = ?, idTipoAuditoria = ? WHERE idProgramacion = ?';
				$datos[0] = $_POST['fechaInicio'];
				$datos[1] = $_POST['fechaFin'];
				$datos[2] = $_POST['dias'];
				$datos[3] = $_POST['idCatOficina'];
				$datos[4] = $_POST['idOficina'];
				$datos[5] = $_POST['idUsuario'];
				$datos[6] = $_POST['idPrograma'];
				$datos[7] = $_POST['idTipoAuditoria'];
				$datos[8] = $_POST['idProgramacion'];
			$reg = actualizar($cons, $datos);
			$arr = array('ok' => $reg);
			echo json_encode($arr);
			break;

		case 'cargarNovedades':
			$cons = 'SELECT * FROM novedades';
				leerRegistro($cons, $datos);
			break;

		case 'crearOficina':
			$sqlTest = 'SELECT * FROM oficina WHERE idOficina = '. $_POST['idOficina'];
			$cons = 'INSERT INTO oficina (idOficina, nombreOficina, ubicacion, idCatOficina) VALUES (?, ?, ?, ?)';
				$datos[0] = $_POST['idOficina'];
				$datos[1] = $_POST['nombreOficina'];
				$datos[2] = $_POST['ubicacion'];
				$datos[3] = $_POST['idCatOficina'];
			$reg = actualizar($cons, $datos);
			$arr = array('ok' => $reg);
			echo json_encode($arr);
			break;

		case 'crearPunto':
			$sqlTest = 'SELECT * FROM puntodeventa WHERE idPunto = '. $_POST['idPunto'];
			$cons = 'INSERT INTO puntodeventa (idPunto, nombrePunto, ubicacionPunto, idCatOficina) VALUES (?, ?, ?, ?)';
				$datos[0] = $_POST['idPunto'];
				$datos[1] = $_POST['nombrePunto'];
				$datos[2] = $_POST['ubicacionPunto'];
				$datos[3] = $_POST['idCatOficina'];
			$reg = actualizar($cons, $datos);
			$arr = array('ok' => $reg);
			echo json_encode($arr);
			break;

		case 'cargarCatOficinas':
			$cons = 'SELECT * FROM categoriaoficina';
			leerRegistro($cons, $datos);
			break;

		case 'cargarOficinas':
			$cons = 'SELECT idOficina, nombreOficina, ubicacion FROM oficina';
			leerRegistro($cons, $datos);
			break;

		case 'cargarPdv':
			$cons = 'SELECT idPunto, nombrePunto, ubicacionPunto FROM puntodeventa';
			leerRegistro($cons, $datos);
			break;

		case 'editarOficina':
			if ($_POST['idCatOficina'] == 1) {
				$cons = 'UPDATE oficina SET nombreOficina = ?, ubicacion = ? WHERE idOficina = ?';
					$datos[0] = $_POST['nombreOficina'];
					$datos[1] = $_POST['ubicacion'];
					$datos[2] = $_POST['idOficina'];
				$reg = actualizar($cons, $datos);
				$arr = array('ok' => $reg);
				echo json_encode($arr);
			}elseif ($_POST['idCatOficina'] == 2) {
				$cons = 'UPDATE puntodeventa SET nombrePunto = ?, ubicacionPunto = ? WHERE idPunto = ?';
					$datos[0] = $_POST['nombreOficina'];
					$datos[1] = $_POST['ubicacion'];
					$datos[2] = $_POST['idOficina'];
				$reg = actualizar($cons, $datos);
				$arr = array('ok' => $reg);
				echo json_encode($arr);
			}
			
			break;
    }

/****** LEER REGISTRO   ****************************************
	ejecuta la consulta y devuelve datos en formato JSON
****************************************************************/
function leerRegistro($cons, $datos){
	global $pdo;
	$stmt = $pdo->prepare($cons);

	for ($i = 0; $i < count($datos); $i++) { 
			$stmt->bindValue($i+1, $datos[$i]);
	}

	$stmt->execute(); 
	//Toma todas las filas de la consulta
	$rows = array();
	foreach ($stmt as $r){
		  	$rows[] = $r;	  	
	}
	
	echo json_encode($rows,JSON_UNESCAPED_UNICODE); 
}

/****** ESCRIBIR REGISTRO   ***************************************
	Ejecuta las consultas de prueba e inserción 
	@return: $resultado. 
		-2: 'No existe FK'.
		-1: 'Ya existe PK'.
		 0: 'No ejecuto la consulta'.
	     x: 'Numero de filas afectadas'.
******************************************************************/

function actualizar($cons, $datos){
	global $pdo, $sqlTest, $sqlTest1;
	//	$guardar = true;
	$resultado = 0;							//Asume que tiene exito al actualizar
	//PRUEBA PK - NO DEBE EXISTIR
	if(strlen($sqlTest) > 0){				//En caso de probar existencia
		$stmt1 = $pdo->query($sqlTest);
		$rows = $stmt1->fetch(PDO::FETCH_ASSOC);

		if($rows){
			$resultado = -1;				//Si lo encuentra, no puede crear nuevo
		}
	}

	//PRUEBA FK - SI DEBE EXISTIR 			
	if(strlen($sqlTest1) > 0 && $resultado == 0){				//En caso de probar existencia
		$stmt1 = $pdo->query($sqlTest1);
		$rows = $stmt1->fetch(PDO::FETCH_ASSOC);

		if(!$rows){
			$resultado = -2;				//Si NO lo encuentra, no puede crear nuevo
		}
	}

	if($resultado == 0){ 							//Puede ejecutar
		$stmt = $pdo->prepare($cons);
		for ($i = 0; $i < count($datos); $i++) { 
				$stmt->bindValue($i+1, $datos[$i]);
		}

		$stmt->execute();
		$resultado = $stmt->rowCount(); //Registos afectados por la consulta
	}
	return $resultado;
}
?>