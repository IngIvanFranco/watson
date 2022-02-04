class Vista{
	constructor(){}

	/********************************************************* 
		Elimina todos los elementos de destino
		*/
	limpiar(destino){
		document.getElementById(destino).innerHTML = "";
	}

	/********************************************************** 
		Carga TEMPLATE en DESTINO. confirma que la plantilla exista
		*/
	mostrarPlantilla(form,destino){
		// Limpiar contenido
		
		var template = document.getElementById(form);
		if (template) { // Si la plantilla existe...
			var clon = template.content.cloneNode(true);
			document.getElementById(destino).innerHTML = "";
			document.getElementById(destino).appendChild(clon); // Inserta
		}	
	}

	/********************************************************* 
		Lee valores de los inputs de un formulario
		los devuelve en arreglo, cada item con el id del imput
		*/
		getDatosForm(idForm) {
			let nArray = {};
			let form = document.getElementById(idForm).elements;
			for (let i = 0; i < form.length; i++) {
			   nArray[form[i].id] = form[i].value;
			  }  
			  return nArray;
		}
		/***********************************************************

	/********************************************************* 
		Valida que todos los inputs de un formulario contengan
		datos, segun tipo de input
		devuelte texto con 'ok' o mensaje de error
	*/
	validarDatosForm(form){
		let cont = 0;
		let contCheck = 0;
		let elements = document.getElementById(form).elements;
		let msj = 'ok';
		for(let i = 0; i < elements.length; i++) { 
			let field_type = elements[i].type.toLowerCase();
			switch(field_type) {
				case "text": 
				case "textarea":
			    case "hidden":
					if(elements[i].value.length == 0){
						msj = 'Los campos deben contener texto';
						cont = cont + 1;						
					}
					break;

				case "password": 
					if(elements[i].value.length < 5){
						msj = 'El password debe tener al menos cinco caracteres';
						cont = cont + 1; 						
					}
					break;
			    case "email":
			    	if(!this.isEmail(elements[i].value)){
						msj = 'No es un correo electronico valido'; 
						cont = cont + 1;
			    	}
					break;

				case "select-one":
				case "select-multi":
					if(elements[i].selectedIndex < 0){
						msj = 'Debe seleccionar una opción';
						cont = cont + 1;
					} 
					break;

				case "number": 
					if(elements[i].value < 1){
						msj = 'Debe digitar un numero positivo, mayor a cero';
						cont = cont + 1; 						
					}
					break;
				/*case "checkbox":
					if (elements[i].checked == false) {
						contCheck = contCheck +1;
					}
					if (contCheck == 4) {
						msj = 'no se ha marcado una opcion'
						cont = cont + 1;
					}
					break;*/

				default: 
					break;
			}
	    }
	    if (cont > 1) {
	    	msj = "Debe llenar todos los campos";
	    }
	    return msj;
	}
	
	mostrarAviso(aviso){
		alert(aviso);
	}

	mostrarAvisoUsu(aviso){
		var msj = '';
		msj = '<div class="mensaje">'+'<span>'+'<b>'+aviso+'</b>'+'</span>'+'</div>';
		document.getElementById('mostrar').innerHTML = msj;
		$('#mostrar').show();
		$('#mostrar').delay(3000).hide(0);
	}

		mostrarAvisoPas(aviso){
		var msj2 = '';
		msj2 = '<div class="mensaje">'+'<span>'+'<b>'+aviso+'</b>'+'</span>'+'</div>';
		document.getElementById('mostrar2').innerHTML = msj2;
		$('#mostrar2').show();
		$('#mostrar2').delay(3000).hide(0);
	}

	/********************************************************* 
		inserta filas en la tabla idTabla, segun las filas del arreglo datos
		El orden en que estan los elementos de la fila son los mismos
		de las columnas de la tabla. 
		Toma el indice del elemento como identificador para editar.
		frmElemento es el id del formulario donde se desplegaran los datos
		al pulsar el boton editar de cada fila.
		@idTabla: Nombre de la tabla a cargar
		@datos: Array con datos a cargar eb @idTabla
		@func: Parte final del nombre de la funcion a ejecutar para editar una fila
	*/
	mostrarDatosTabla(idTabla, datos, _func){
		// Eliminar filas
		document.getElementById(idTabla).innerHTML= "";
		//$(idTabla+" > tbody").html("");
		var txt = '';
		for(var i = 0; i < datos.length; i++){
			txt += '<tr>';
			// txt += '<td><input type="checkbox" id="checkb" name="checkb"></td>';
			for ( var key in datos[i]) {
				if (key == 'idArqueo') {
					txt += '<td><input class="arqueo form-control" type="text" value="' + datos[i][key] + ' ' + datos[i]['arqueo'] + '" disabled=""></td>';	
				}else if (key == 'arqueo') {
					
				}else if (key == 'horaInicio' || key == 'horaFin') {
					txt += '<td><input class="tamañoInpModal centrarBloq form-control" type="text" style="width: 150px;" value="' + datos[i][key] + '" disabled=""></td>';	
				}else if (key == 'idAuditado') {
					txt += '<td><input type="text" class="centrarBloq form-control" style="width: 400px;" value="' + datos[i][key] + ' - ' + datos[i]['nombreAuditado'] + '" disabled=""></td>';
				}else if (key == 'nombreAuditado') {
					
				}else if (key == 'diferencia') {
					txt += '<td><input class="diferencia centrarBloq form-control" type="text" value="$ ' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'economico') {
					txt += '<td><input class="form-control centrarBloq" type="text" style="width: 115px;" value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'accionDisciplinaria') {
					txt += '<td><input class=" tamañoSelectModal centrarBloq form-control" style="width: 150px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'idAuditoria') {
					txt += '<td ><a style="background-color: red; color:white; text-align: center; text-transform: uppercase; padding:8px; border-radius:7px; font-style: italic; text-decoration: none;" href="./fpdf/index.php?id=' + datos[i][key] + '">pdf</a> </td>';
				}else{
					txt += '<td><button class="btn btn-success" disabled=""><i class="fas fa-check"></i></button></td>';
				}
				
		  	}
/*		  	txt += '<td><div class="btn-group-vertical"><button type="button" class="btn2"';
		  	txt += ' id="btnEditAdmin" onclick="setDatosForm'+ func+'(' + i + ')">';
		  	txt += '<img src="../img/logo7.png" ></button></div></td></tr>'; 
*/			
			// txt += '<td><button class="btn btn-success" disabled=""><i class="fas fa-check"></i></button></td>';
			txt +='</tr>';
		}
		document.getElementById(idTabla).innerHTML= txt;
	}

	mostrarDatosTablaEdit(idTabla, datos, _func){
		// Eliminar filas
		document.getElementById(idTabla).innerHTML= "";
		//$(idTabla+" > tbody").html("");
		var txt = '';
		for(var i = 0; i < datos.length; i++){
			txt += '<tr>';
			// txt += '<td><input type="checkbox" id="checkb" name="checkb"></td>';
			for ( var key in datos[i]) {
				if (key == 'idArqueo') {
					txt += '<td><input class="arqueo form-control" type="text" value="' + datos[i][key] + ' ' + datos[i]['arqueo'] + '" disabled=""></td>';	
				}else if (key == 'arqueo') {
					
				}else if (key == 'horaInicio' || key == 'horaFin') {
					txt += '<td><input class="tamañoInpModal centrarBloq form-control" type="text" style="width: 150px;" value="' + datos[i][key] + '" disabled=""></td>';	
				}else if (key == 'idAuditado') {
					txt += '<td><input type="text" class="centrarBloq form-control" style="width: 400px;" value="' + datos[i][key] + ' - ' + datos[i]['nombreAuditado'] + '" disabled=""></td>';
				}else if (key == 'nombreAuditado') {
					
			
				}else if (key == 'accionDisciplinaria') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'idAuditoria') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'campo1') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'campo2') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'bill20') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'bill10') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'bill5') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'bill2') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 100px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'bill1') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 100px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'mon_mil') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'mon_500') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'mon_200') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'mon_100') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'mon_50') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'sal_conta_otros') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
			
					
                }else if (key == 'bond') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'termica') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'bond_sist') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'termica_sist') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'otros_ing1') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'valor_ing1') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				
				}else if (key == 'otros_ing2') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'valor_ing2') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'otros_ing3') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'valor_ing3') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'otros_ing4') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'valor_ing4') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'otros_ing5') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'valor_ing5') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

                }else if (key == 'docu1') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'valor1') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'docu2') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'valor2') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'docu3') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'valor3') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'docu4') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'valor4') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'docu5') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'valor5') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'docu6') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				}else if (key == 'valor6') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				
				}else if (key == 'observacion') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';

				}else if (key == 'diferencia') {
					txt += '<td><input class="tamañoSelectModal centrarBloq form-control" style="width: 300px; " value="' + datos[i][key] + '" disabled=""></td>';
				
			     }else{
					txt += '<td><button class="btn btn-success" disabled=""><i class="fas fa-check"></i></button></td>';
				}
				
		  	}
/*		  	txt += '<td><div class="btn-group-vertical"><button type="button" class="btn2"';
		  	txt += ' id="btnEditAdmin" onclick="setDatosForm'+ func+'(' + i + ')">';
		  	txt += '<img src="../img/logo7.png" ></button></div></td></tr>'; 
*/			
			// txt += '<td><button class="btn btn-success" disabled=""><i class="fas fa-check"></i></button></td>';
			txt +='</tr>';
		}
		document.getElementById(idTabla).innerHTML= txt;
	}

	mostrarDatosTablaUsuEdit(idTabla, datos, func){
		// Eliminar filas
		document.getElementById(idTabla).innerHTML= "";
		//$(idTabla+" > tbody").html("");
		var txt = '';
		let llave = '';
		for(var i = 0; i < datos.length; i++){
			txt += '<tr>';
			for ( var key in datos[i]) {
				txt += '<td class="bordes">' + datos[i][key] + '</td>';
				if (key == 'idUsuario') {
					llave = 'idUsuario';
				}
				if (key == 'idAuditado') {
					llave = 'idAuditado';
				}
			}
			if (llave == 'idUsuario') {
				txt += '<td class="bordes"><button class="btn btn-outline-secondary" onclick="editarUsuarioForm('+ datos[i]['idUsuario'] +');">Editar</button></td>';
			}  
		  	if (llave == 'idAuditado') {
				txt += '<td class="bordes"><button class="btn btn-outline-secondary" onclick="editarUsuarioForm('+ datos[i]['idAuditado'] +');">Editar</button></td>';
			  }
/*		  	txt += '<td><div class="btn-group-vertical"><button type="button" class="btn2"';
		  	txt += ' id="btnEditAdmin" onclick="setDatosForm'+ func+'(' + i + ')">';
		  	txt += '<img src="../img/logo7.png" ></button></div></td></tr>'; 
*/				
			txt +='</tr>';
		}
		document.getElementById(idTabla).innerHTML= txt;
	}

	mostrarDatosTablaUsuBloq(idTabla, datos, func){
		// Eliminar filas
		document.getElementById(idTabla).innerHTML= "";
		//$(idTabla+" > tbody").html("");
		var txt = '';
		for(var i = 0; i < datos.length; i++){
			txt += '<tr>';
			for ( var key in datos[i]) {
				if (key == 'idEstado') {
					
				}else{
					txt += '<td class="bordes">' + datos[i][key] + '</td>';
				}
			}
			if (key == 'idEstado') {
				if (datos[i]['idEstado'] == 1) {
					txt += '<td id="btnCambio" class="bordes"><button class="btn btn-outline-success" onclick="cambiarEstado(1,'+ datos[i]['idUsuario'] +');">Habilitado</button></td>';
				}
				if (datos[i]['idEstado'] == 2) {
					txt += '<td id="btnCambio" class="bordes"><button class="btn btn-outline-danger" onclick="cambiarEstado(2,'+ datos[i]['idUsuario'] +');">Bloqueado</button></td>';
				}
				if (datos[i]['idEstado'] == 3) {
					txt += '<td id="btnCambio" class="bordes"><button class="btn btn-outline-primary" onclick="cambiarEstado(3,'+ datos[i]['idUsuario'] +');">Ninguno</button></td>';
				}
			}
			
/*		  	txt += '<td><div class="btn-group-vertical"><button type="button" class="btn2"';
		  	txt += ' id="btnEditAdmin" onclick="setDatosForm'+ func+'(' + i + ')">';
		  	txt += '<img src="../img/logo7.png" ></button></div></td></tr>'; 
*/				
			txt +='</tr>';
		}
		document.getElementById(idTabla).innerHTML= txt;
	}

	mostrarDatosTablaOfiEdit(idTabla, datos, func){
		// Eliminar filas
		document.getElementById(idTabla).innerHTML= "";
		//$(idTabla+" > tbody").html("");
		var txt = '';
		let llave = '';
		for(var i = 0; i < datos.length; i++){
			txt += '<tr>';
			for ( var key in datos[i]) {
				txt += '<td class="bordes">' + datos[i][key] + '</td>';
				if (key == 'idOficina') {
					llave = 'idOficina';
				}
				if (key == 'idPunto') {
					llave = 'idPunto';
				}
			}
			if (llave == 'idOficina') {
				txt += '<td class="bordes"><button class="btn btn-outline-secondary" onclick="editarOficinaForm('+ datos[i]['idOficina'] +');">Editar</button></td>';
			}  
		  	if (llave == 'idPunto') {
				txt += '<td class="bordes"><button class="btn btn-outline-secondary" onclick="editarPdvForm('+ datos[i]['idPunto'] +');">Editar</button></td>';
			  }
/*		  	txt += '<td><div class="btn-group-vertical"><button type="button" class="btn2"';
		  	txt += ' id="btnEditAdmin" onclick="setDatosForm'+ func+'(' + i + ')">';
		  	txt += '<img src="../img/logo7.png" ></button></div></td></tr>'; 
*/				
			txt +='</tr>';
		}
		document.getElementById(idTabla).innerHTML= txt;
	}

	/* 
	
	PARA EL MODULO DE BLOQUEO DE OFICINA

	mostrarDatosTablaUsuBloq(idTabla, datos, func){
		// Eliminar filas
		document.getElementById(idTabla).innerHTML= "";
		//$(idTabla+" > tbody").html("");
		var txt = '';
		for(var i = 0; i < datos.length; i++){
			txt += '<tr>';
			for ( var key in datos[i]) {
				if (key == 'idEstado') {
					
				}else{
					txt += '<td class="bordes">' + datos[i][key] + '</td>';
				}
			}
			if (key == 'idEstado') {
				if (datos[i]['idEstado'] == 1) {
					txt += '<td id="btnCambio" class="bordes"><button class="btn btn-outline-success" onclick="cambiarEstado(1,'+ datos[i]['idUsuario'] +');">Habilitado</button></td>';
				}
				if (datos[i]['idEstado'] == 2) {
					txt += '<td id="btnCambio" class="bordes"><button class="btn btn-outline-danger" onclick="cambiarEstado(2,'+ datos[i]['idUsuario'] +');">Bloqueado</button></td>';
				}
				if (datos[i]['idEstado'] == 3) {
					txt += '<td id="btnCambio" class="bordes"><button class="btn btn-outline-primary" onclick="cambiarEstado(3,'+ datos[i]['idUsuario'] +');">Ninguno</button></td>';
				}
			}
						
			txt +='</tr>';
		}
		document.getElementById(idTabla).innerHTML= txt;
	}*/

	mostrarDatosTablaReport(idTabla, datos, func){
		// Eliminar filas
		document.getElementById(idTabla).innerHTML= "";
		//$(idTabla+" > tbody").html("");
		var txt = '';
		for(var i = 0; i < datos.length; i++){
			txt += '<tr>';
			for ( var key in datos[i]) {
				txt += '<td class="bordes">' + datos[i][key] + '</td>';
			}
			
/*		  	txt += '<td><div class="btn-group-vertical"><button type="button" class="btn2"';
		  	txt += ' id="btnEditAdmin" onclick="setDatosForm'+ func+'(' + i + ')">';
		  	txt += '<img src="../img/logo7.png" ></button></div></td></tr>'; 
*/				
			txt +='</tr>';
		}
		document.getElementById(idTabla).innerHTML= txt;
	}

	mostrarDatosTablaReportH(idTabla, datos, func){
		// Eliminar filas
		document.getElementById(idTabla).innerHTML= "";
		//$(idTabla+" > tbody").html("");
		var txt = '';
		for(var i = 0; i < datos.length; i++){
			txt += '<tr>';
			for ( var key in datos[i]) {
				if (key == 'idOficina' || key == 'nombreOficina') {
					if (key == 'idOficina') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]['nombreOficina'] + '</td>';
					}
				}
				if (key == 'idUsuarioAnt' || key == 'nombreUsuarioAnt' || key == 'apellidoUsuarioAnt') {
					if (key == 'idUsuarioAnt') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]['nombreUsuarioAnt'] + ' ' + datos[i]['apellidoUsuarioAnt'] + '</td>';
					}
				}
				if (key == 'idPrograma' || key == 'programa') {
					if (key == 'idPrograma') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]['programa'] + '</td>';
					}
				}
				if (key == 'idNovedades' || key == 'novedad') {
					if (key == 'idNovedades') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]['novedad'] + '</td>';
					}
				}
				if (key == 'idUsuario' || key == 'nombreUsuario' || key == 'apellidoUsuario') {
					if (key == 'idUsuario') {
					txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]['nombreUsuario'] + ' ' + datos[i]['apellidoUsuario'] + '</td>';
					}
				}
				if (key == 'idReprogramacion' || key == 'fechaInicioAnt' || key == 'fechaFinAnt' || key == 'diasAnt' || key == 'fechaReprogramacion' || key == 'observacion' || key == 'idProgramacion' || key == 'fechaInicio' || key == 'fechaFin') {
					txt += '<td class="bordes">' + datos[i][key] + '</td>';
				}
			}
			
/*		  	txt += '<td><div class="btn-group-vertical"><button type="button" class="btn2"';
		  	txt += ' id="btnEditAdmin" onclick="setDatosForm'+ func+'(' + i + ')">';
		  	txt += '<img src="../img/logo7.png" ></button></div></td></tr>'; 
*/				
			txt +='</tr>';
		}
		document.getElementById(idTabla).innerHTML= txt;
	}

	mostrarDatosTablaProg(idTabla, datos, _func, id){
		// Eliminar filas
		document.getElementById(idTabla).innerHTML= "";
		//$(idTabla+" > tbody").html("");
		var txt = '';
		for(var i = 0; i < datos.length; i++){
			txt += '<tr class="fondoColor bordes" name="filaprog'+id+'" id="filaProg'+ id +'">';
			// txt += '<td><input type="checkbox" id="checkb" name="checkb"></td>';
			for ( var key in datos[i]) {
				if (key == 'idCatOficina' || key == 'catOficina') {
					if (key == 'idCatOficina') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]["catOficina"] + '</td>';
					}
				}
				if (key == 'idOficina' || key == 'nombreOficina') {
					if (key == 'idOficina') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]["nombreOficina"] + '</td>';
					}
				}
				if (key == 'idUsuario' || key == 'nombreUsuario' || key == 'apellidoUsuario') {
					if (key == 'idUsuario') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]['nombreUsuario'] + ' ' + datos[i]['apellidoUsuario'] + '</td>';
					}
				}
				if (key == 'idPrograma' || key == 'prorgama') {
					if (key == 'idPrograma') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]["programa"] + '</td>';
					}
				}
				if (key == 'idTipoAuditoria' || key == 'tipoAuditoria') {
					if (key == 'idTipoAuditoria') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]["tipoAuditoria"] + '</td>';
					}
				}
				if (key == 'idProgramacion') {
					
				}
				if (key == 'fechaInicio' || key == 'fechaFin' || key == 'dias') {
					txt += '<td class="bordes">' + datos[i][key] + '</td>';
				}
				/*if (key == 'idProgramacion') {
					txt += '<td style="display: none" id="prog">' + datos[i][key] + '</td>';
				}else{

					if (key == 'idOficina' || key == 'idUsuario' || key == 'idPrograma' || key == 'nombreUsuario' || key == 'idTipoAuditoria' || key == 'idCatOficina') {
						if (key == 'idUsuario') {
							txt += '<td id="reprogramacionAuditor">' + datos[i][key] + '</td>';
						}else{
							txt += '<td>' + datos[i][key] + '</td>';
						}
					}else{
						if (key == 'fechaInicio') {
							txt += '<td class="bordesRight" id="reprogramacionFechaIni">' + datos[i][key] + '</td>';
						}else if (key == 'fechaFin') {
							txt += '<td class="bordesRight" id="reprogramacionFechaFin">' + datos[i][key] + '</td>';
						}else{
							txt += '<td class="bordesRight">' + datos[i][key] + '</td>';
						}
					}
				}*/
				// if (key == 'fechaInicio' || key == 'fechaFin' || key == 'nombre'){
					
				// }
				
			}
			txt += '<td class="bordes"><button onclick="mostrarModal('+ datos[i]['idProgramacion'] +');" class="btn btn-outline-success"><i class="fas fa-file-alt"></i></button> &nbsp;';
			txt += '<button onclick="mostrarModalEditarAuditoria('+ datos[i]['idProgramacion'] +');" class="btn btn-outline-warning"><i class="far fa-edit"></i></button> &nbsp;';
			txt += '<button onclick="mostrarModalReprogramarAuditoria('+ datos[i]['idProgramacion'] +');" class="btn btn-outline-danger"><i class="fas fa-calendar-alt"></i></button>';
			txt += '</td>';
			/*txt += '<td class="bordesBottom"><button onclick="mostrarModalEditarAuditoria('+ datos[i]['idProgramacion'] +');" class="btn btn-outline-warning"><i class="far fa-edit"></i></button></td>';
			txt += '<td id="reprogramarBtnRep" class="bordesRight bordesBottom"><button onclick="mostrarModalReprogramarAuditoria('+ datos[i]['idProgramacion'] +');" class="btn btn-outline-danger"><i class="fas fa-calendar-alt"></i></button></td>';*/
/*		  	txt += '<td><div class="btn-group-vertical"><button type="button" class="btn2"';
		  	txt += ' id="btnEditAdmin" onclick="setDatosForm'+ func+'(' + i + ')">';
		  	txt += '<img src="../img/logo7.png" ></button></div></td></tr>'; 
*/				
			txt +='</tr>';
		}
		document.getElementById(idTabla).innerHTML= txt;
	}

	mostrarDatosTablaProgAux(idTabla, datos, _func, id, usu){
		// Eliminar filas
		document.getElementById(idTabla).innerHTML= "";
		//$(idTabla+" > tbody").html("");
		var txt = '';
		for(var i = 0; i < datos.length; i++){
			txt += '<tr class="fondoColor bordes" name="filaprog'+id+'" id="filaProg'+ id +'">';
			// txt += '<td><input type="checkbox" id="checkb" name="checkb"></td>';
			for ( var key in datos[i]) {
				
				if (key == 'idCatOficina' || key == 'catOficina') {
					if (key == 'idCatOficina') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]["catOficina"] + '</td>';
					}
				}
				if (key == 'idOficina' || key == 'nombreOficina') {
					if (key == 'idOficina') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]["nombreOficina"] + '</td>';
					}
				}
				if (key == 'idUsuario' || key == 'nombreUsuario' || key == 'apellidoUsuario') {
					if (key == 'idUsuario') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]['nombreUsuario'] + ' ' + datos[i]['apellidoUsuario'] + '</td>';
					}
				}
				if (key == 'idPrograma' || key == 'prorgama') {
					if (key == 'idPrograma') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]["programa"] + '</td>';
					}
				}
				if (key == 'idTipoAuditoria' || key == 'tipoAuditoria') {
					if (key == 'idTipoAuditoria') {
						txt += '<td class="bordes">' + datos[i][key] + ' ' + datos[i]["tipoAuditoria"] + '</td>';
					}
				}
				if (key == 'idProgramacion') {
					
				}
				if (key == 'fechaInicio' || key == 'fechaFin' || key == 'dias') {
					txt += '<td class="bordes">' + datos[i][key] + '</td>';
				}
				/*if (key == 'idProgramacion') {
					txt += '<td style="display: none" id="prog">' + datos[i][key] + '</td>';
				}else{

					if (key == 'idOficina' || key == 'idUsuario' || key == 'idPrograma' || key == 'nombreUsuario' || key == 'idTipoAuditoria' || key == 'idCatOficina') {
						if (key == 'idUsuario') {
							txt += '<td id="reprogramacionAuditor">' + datos[i][key] + '</td>';
						}else{
							txt += '<td>' + datos[i][key] + '</td>';
						}
					}else{
						if (key == 'fechaInicio') {
							txt += '<td class="bordesRight" id="reprogramacionFechaIni">' + datos[i][key] + '</td>';
						}else if (key == 'fechaFin') {
							txt += '<td class="bordesRight" id="reprogramacionFechaFin">' + datos[i][key] + '</td>';
						}else{
							txt += '<td class="bordesRight">' + datos[i][key] + '</td>';
						}
					}
				}*/
				// if (key == 'fechaInicio' || key == 'fechaFin' || key == 'nombre'){
					
				// }
				
			}
			if (usu == datos[i]['idUsuario']) {
				txt += '<td class="bordes"><button onclick="mostrarModal('+ datos[i]['idProgramacion'] +');" class="btn btn-outline-success"><i class="fas fa-file-alt"></i></button> &nbsp;';
				txt += '</td>';
			}else{
				txt += '<td class="bordes"><button onclick="mostrarModal('+ datos[i]['idProgramacion'] +');" class="btn btn-outline-success no-drop" disabled><i class="fas fa-file-alt no-drop"></i></button> &nbsp;';
				txt += '</td>';
			}
			/*txt += '<td class="bordesBottom"><button onclick="mostrarModalEditarAuditoria('+ datos[i]['idProgramacion'] +');" class="btn btn-outline-warning"><i class="far fa-edit"></i></button></td>';
			txt += '<td id="reprogramarBtnRep" class="bordesRight bordesBottom"><button onclick="mostrarModalReprogramarAuditoria('+ datos[i]['idProgramacion'] +');" class="btn btn-outline-danger"><i class="fas fa-calendar-alt"></i></button></td>';*/
/*		  	txt += '<td><div class="btn-group-vertical"><button type="button" class="btn2"';
		  	txt += ' id="btnEditAdmin" onclick="setDatosForm'+ func+'(' + i + ')">';
		  	txt += '<img src="../img/logo7.png" ></button></div></td></tr>'; 
*/				
			txt +='</tr>';
		}
		document.getElementById(idTabla).innerHTML= txt;
	}
	
		/********************************************************* 
		Despliega una lista en un select.  select: 	id del select a poblar
	 	lista: 	array con pares key-val.
	 	key = nombre del campo en VALOR
		nVal = nombre del campo a desplegar
	*/
	cargarSelect(select, lista, key, nVal){
		$('#'+ select + ' option').remove();
		$('#'+ select).append('<option value= -1>Seleccione...</option>');
		for(let j=0; j< lista.length; j++){
			$('#'+ select).append('<option value= ' + lista[j][key] + ' >'  + lista[j][nVal] + '</option>');
		}
	}

	cargarSelectUsu(select, lista, key, nVal, bVal){
		$('#'+ select + ' option').remove();
		$('#'+ select).append('<option value= -1>Seleccione...</option>');
		for(let j=0; j< lista.length; j++){
			$('#'+ select).append('<option value= ' + lista[j][key] + ' >' + lista[j][key] + ' - ' + lista[j][nVal] + '   ' + lista[j][bVal] +'</option>');
		}
	}

	cargarSelectUsu2(select, lista, key, nVal, bVal){
		$('#'+ select + ' option').remove();
		$('#'+ select).append('<option value= -1>Seleccione...</option>');
		for(let j=0; j< lista.length; j++){
			$('#'+ select).append('<option value="' + lista[j][key] + ' - ' + lista[j][nVal] + ' ' + lista[j][bVal] +'">' + lista[j][key] + ' - ' + lista[j][nVal] + '   ' + lista[j][bVal] +'</option>');
		}
	}

	cargarSelectOfi(select, lista, key, nVal){
		$('#'+ select + ' option').remove();
		$('#'+ select).append('<option value= -1>Seleccione...</option>');
		for(let j=0; j< lista.length; j++){
			$('#'+ select).append('<option value= ' + lista[j][key] + ' >' + lista[j][key] + ' - ' + lista[j][nVal] + '</option>');
		}
	}

	cargarSelectOfi2(select, lista, key, nVal){
		$('#'+ select + ' option').remove();
		$('#'+ select).append('<option value= -1>Seleccione...</option>');
		for(let j=0; j< lista.length; j++){
			$('#'+ select).append('<option value="' + lista[j][key] + ' - ' + lista[j][nVal] + '">' + lista[j][key] + ' - ' + lista[j][nVal] + '</option>');
		}
	}


	// cargarSelectOfiPru(select, lista, key, nVal){
	// 	// var selector = $('#formAuditoria0');
	// 	// select = selector[3].id;
	// 	let form = document.getElementById('formAuditoria0').elements;
	// 	var pru = form[0].id;
	// 	var pru2 = form[3].id;
	// 	$('#' + form[3].id + ' option').remove();
	// 	$('#' + form[3].id).append('<option value= -1>Seleccione...</option>');
	// 	for(let j=0; j< lista.length; j++){
	// 		$('#' + form[3].id).append('<option value= ' + lista[j][key] + ' >' + lista[j][key] + ' - ' + lista[j][nVal] + '</option>');
	// 	}
	// }

	mostrarTablaProgramacion(id){
		var tabla =	'';
			tabla =	'<table id="tablePrograming" class="tabla table-sm" style="width: 1900px;">' +
						'<thead>' +
							'<tr class="colorFondo">' +
								'<th class="bordes">Fecha Ini</th>' +
								'<th class="bordes">Fecha Fin</th>' +
								'<th class="bordes">Dias</th>' +
								'<th class="bordes">Categoria OFI. o PDV</th>' +
								'<th class="bordes">OFI o PDV</th>' +
								'<th class="bordes">Aud. o Aux. A.</th>' +
								'<th class="bordes">Programa</th>' +
								'<th class="bordes">Tipo auditoria</th>' +
								'<th class="bordes">Boton</th>' +
							'</tr>' +
						'</thead>' +
						'<tbody id="tableBody" class="bordes">'+
						'</tbody>' +
					'</table>';
		document.getElementById('tablaProgramacion').innerHTML = tabla;
	}

	mostrarSinDatos(){
		var mensaje = '';
			mensaje =	'<div class="proStyle">' +
							'<h3>No se encuentran registros de programacion</h3>' +
							'<h5>Realice su programacion para visualizar la tabla</h5>' +
							'<i class="fas fa-exclamation-circle"></i>' +
						'</div>';
		document.getElementById('tablaProgramacion').innerHTML = mensaje;
	}

	campoOficina(id, num){
		var campo = '';
			campo = 
					'<th colspan="2" class="bordes">' +
						'Oficina o Punto de venta' +
						'<br>' +
						'<input type="checkbox" id="oficina'+ num +'" name="oficina'+ num +'" onclick="selecCatOficina'+ num +'(1);" value="1">' +
						'<label for="">Ofi.</label>' +
						'&nbsp;&nbsp;&nbsp;' +
						'<input type="checkbox" name="puntoVenta'+ num +'" id="puntoVenta'+ num +'" onclick="selecCatOficina'+ num +'(2);" value="2">' +
						'<label for="">Pdv</label>' +
					'</th>' +
					'<td colspan="2" class="bordes">' +
						'<select class="form-control select2" name="idOficina'+ num +'" id="idOficina'+ num +'" onchange="ShowSelected(3);">' +
							'<option value="0">Seleccion...</option>' +
							'<option value="1">Ricaurte</option>' +
							'<option value="2">Centro</option>' +
							'<option value="3">Jordan</option>' +
							'<option value="4">Salado</option>' +
						'</select>' +
					'</td>';
			document.getElementById('nuevaOficina' + id).innerHTML = campo;
	}

	campoGasto(id){
		var campoG = '';
			campoG = '<th colspan="1" class="bordes">' +
						'<select class="form-control select2" name="nuevoConcepGastos' + id + '" id="nuevoConcepGastos' + id + '">' +
							'<option value="0">Seleccion...</option>' +
							'<option value="1 - Transporte, Fletes y acarreos">Transporte, Fletes y acarreos</option>' +
							'<option value="2 - Casino y Restaurantes">Casino y Restaurantes</option>' +
							'<option value="3 - Alojamiento y Manutencio">Alojamiento y Manutencio</option>' +
							'<option value="4 - otros">otros</option>' +
						'</select>' +
					 '</th>'+
					 '<td colspan="1" class="bordes">' +
						 '<input class="form-control" id="texto'+ id +'" name="texto'+ id +'" type="number" onkeyup="replicarTex('+ id +');">' +
					 '</td>' +
					 '<td colspan="2" class="bordes">' +
						 '<input class="form-control" id="observacion'+ id +'" name="observacion'+ id +'" type="textarea" placeholder="Observacion">' +
					 '</td>';
			document.getElementById('nuevoConcepGasto' + id).innerHTML = campoG;
	}

	campoAuditoria(id, arqueo, consecutivo, opc){
		if (opc == 1) {
			var campoA = '';
			consecutivo = consecutivo + 1;
				campoA = 	'<table class="tablaModal table-sm ">' +
				'<tbody>' +
				'<tr>' +
						'<th></th>' +
						'<th></th>' +
						'<th></th>' +
						'<th></th>' +
						'<th></th>' +
						'<th></th>' +
						'<th></th>' +
						
						
					'</tr>' +
					'<tr style="color:white;Background-color: blue; border-radius:7px;">' +
								       '<th>Arqueo</th>' +
								       '<th>Hora inicio</th>' +
								       '<th>Hora fin</th>' +
								       '<th>Auditado</th>' +
								       '<th>Accion disciplinaria</th>' +
								       '<th>Saldo Sistema Contable</th>' +
								       '<th>BILLETS DE 100</th>' +
										
										
									'</tr>' +
									'<tr>' +
										'<td><input class="arqueo form-control" type="text" id="idArqueo" name="idAqueo" value="'+ arqueo +' '+ consecutivo +'" disabled=""td>' +
										'<td><input class="tamañoInpModal form-control" type="time" id="horaInicio" name="horaInicio" style="width: 100px;"></td>' +
										'<td><input class="tamañoInpModal form-control" type="time" id="horaFin" name="horaFin" style="width: 100px;"></td>' +
										'<td>' +
											'<select class="form-control select2" id="idAuditado' + id + '" name="idAuditado' + id + '" style="width: 400px;">' +
											// '<option value="0">Seleccione...</option>' +
											// '<option value="1 - Acta de compromiso">Acta de compromiso</option>' +
											// '<option value="2 - Acta de compromiso para colaborador e involucrados">Acta de compromiso para colaborador e involucrados</option>' +
											// '<option value="3 - Reporte disciplinario">Reporte disciplinario</option>'+
											// '<option value="4 - Ninguna">Ninguna</option>' +
											'</select>' +
										'</td>' +
										
										'<td>' +
											'<select class="tamañoSelectModal form-control select2" id="accionDisciplinaria" name="accionDisciplinaria" style="width: 200px;">' +
												'<option value="0">Seleccione...</option>' +
												'<option value="1 - Acta de compromiso">Acta de compromiso</option>' +
												'<option value="2 - Acta de compromiso para colaborador e involucrados">Acta de compromiso para colaborador e involucrados</option>' +
												'<option value="3 - Reporte disciplinario">Reporte disciplinario</option>'+
												'<option value="4 - Ninguna">Ninguna</option>' +
											'</select>' +
											'<td><input class="sal_conta_otros form-control" type="text" id="sal_conta_otros" name="sal_conta_otros" value="0"  style="width: 200px;"></td>' +
											'<td><input class="campo1 form-control" type="text" id="campo1" name="campo1" value="0" ></td>' +
											
										
									'</tr>' +
								'</tbody>'+
								'<tfoot>' + 
									'<tr>' +
										'<th> </th>' +
										'<th></th>' +
										'<th></th>' +
										'<th></th>' +
										'<th></th>' +
										'<th></th>' +
										'<th></th>' +
									'</tr>' +
									'<tr  style="color:white;Background-color: blue; border-radius:7px;" >' +
										
										'<th>BILLETES DE 50</th>' +
										'<th>BILLETES DE 20</th>' +
										'<th>BILLETES DE 10</th>' +
										'<th>BILLETES DE 5</th>' +
										'<th>BILLETES DE 2</th>' +
										'<th>BILLETES DE 1</th>' +
										'<th>MONEDAS DE 1000</th>' +
									
									'</tr>' +
									'<tr>' +
									'<td><input class="campo2 form-control" type="text" id="campo2" name="campo2" value="0" ></td>' +
									'<td><input class="bill20 form-control" type="text" id="bill20" name="bill20" value="0" ></td>' +
									'<td><input class="bill10 form-control" type="text" id="bill10" name="bill10" value="0" ></td>' +
									'<td><input class="bill5 form-control" type="text" id="bill5" name="bill5" value="0" ></td>' +
									'<td><input class="bill2 form-control" type="text" id="bill2" name="bill2"  value="0" ></td>' +
									'<td><input class="bill1 form-control" type="text" id="bill1" name="bill1" value="0" ></td>' +
									'<td><input class="mon_mil form-control" type="text" id="mon_mil" name="mon_mil" value="0" ></td>' +
								
									'</tr>' +
									'<tr  style="color:white;Background-color: blue; border-radius:7px;">' +
									   '<th>MONEDAS DE 500</th>' +
										'<th>MONEDAS DE 200</th>' +
										'<th>MONEDAS DE 100</th>' +
										'<th>MONEDAS DE 50</th>' +
										'<th>OTROS INGRESOS</th>' +
										'<th>VALOR DE INGRESO</th>' +
										'<th>OTROS INGRESOS</th>' +
										
										
									'</tr>' +
									'<tr>' +
									'<td><input class="mon_500 form-control" type="text" id="mon_500" name="mon_500"  value="0"></td>' +
									'<td><input class="mon_200 form-control" type="text" id="mon_200" name="mon_200" value="0" ></td>' +
									'<td><input class="mon_100 form-control" type="text" id="mon_100" name="mon_100" value="0" ></td>' +
									'<td><input class="mon_50 form-control" type="text" id="mon_50" name="mon_50" value="0" ></td>' +
									'<td><input class="otros_ing1 form-control" type="text" id="otros_ing1" name="otros_ing1" value="N/A" ></td>' +
									'<td><input class="valor_ing1 form-control" type="text" id="valor_ing1" name="valor_ing1" value="0" ></td>' +
									'<td><input class="otros_ing2 form-control" type="text" id="otros_ing2" name= "otros_ing2"value="N/A" ></td>' +



									
								   
									
									'</tr>' +
									'<tr  style="color:white;Background-color: blue; border-radius:7px;">' +
									
									    
										
										'<th>VALOR DE INGRESOS </th>' +
										'<th>OTROS INGRESOS</th>' +
										'<th>VALOR DE INGRESO </th>' +
										'<th>OTROS INGRESOS</th>' +
										'<th>VALOR DE INGRESO </th>' +
										'<th>OTROS INGRESOS</th>' +
										'<th>VALOR DE INGRESO </th>' +
										
									'</tr>' +
									'<tr>' +
									
									
									


									
									'<td><input class="valor_ing2 form-control" type="text" id="valor_ing2" name="valor_ing2"value="0"  ></td>' +
									'<td><input class="otros_ing3 form-control" type="text" id="otros_ing3" name="otros_ing3"value="N/A" ></td>' +
									'<td><input class="valor_ing3 form-control" type="text" id="valor_ing3" name="valor_ing3"value="0"  ></td>' +
									'<td><input class="otros_ing4 form-control" type="text" id="otros_ing4" name="otros_ing4"value="N/A" ></td>' +
									'<td><input class="valor_ing4 form-control" type="text" id="valor_ing4" name="valor_ing4"value="0"  ></td>' +
									'<td><input class="otros_ing5 form-control" type="text" id="otros_ing5" name="otros_ing5"value="N/A" ></td>' +
									'<td><input class="valor_ing5 form-control" type="text" id="valor_ing5" name="valor_ing5"value="0"  ></td>' +
									
									'</tr>' +
									
									'<tr  style="color:white;Background-color: blue; border-radius:7px;">' +
									

								        '<th>DOCUMENTOS EQUIVALENTES</th>' +
								        '<th>VALOR</th>' +
									    '<th>DOCUMENTOS EQUIVALENTES</th>' +
								        '<th>VALOR</th>' +
									    '<th>DOCUMENTOS EQUIVALENTES</th>' +
								        '<th>VALOR</th>' +
										'<th>DOCUMENTOS EQUIVALENTES</th>' +
								        
									    
										
									'</tr>' +
									'<tr>' +
									'<td><input class="docu1 form-control" type="text" id="docu1" name="docu1"value="N/A" ></td>' +
								    '<td><input class="valor1 form-control" type="text" id="valor1" name="valor1"value="0"  ></td>' +
									'<td><input class="docu2 form-control" type="text" id="docu2" name="docu2"value="N/A" ></td>' +
									'<td><input class="valor2 form-control" type="text" id="valor2" name="valor2"value="0"  ></td>' +
									'<td><input class="docu3 form-control" type="text" id="docu3" name="docu3"value="N/A" ></td>' +
									'<td><input class="valor3 form-control" type="text" id="valor3" name="valor3"value="0"  ></td>' +
									'<td><input class="docu4 form-control" type="text" id="docu4" name="docu4"value="N/A" ></td>' +
									


									'</tr>'+
									'<tr  style="color:white;Background-color: blue; border-radius:7px;">' +
									
									    
								       
										'<th>VALOR</th>' +
										'<th>DOCUMENTOS EQUIVALENTES</th>' +
										'<th>VALOR</th>' +
									    '<th>DOCUMENTOS EQUIVALENTES</th>' +
								        '<th>VALOR</th>' +
										'<th>BOND SISTEMA</th>' +
										'<th>BOND EXISTENCIAL</th>' +
										
									    
										
									'</tr>' +
									
									'<tr>' +
									
									'<td><input class="valor4 form-control" type="text" id="valor4" name="valor4"value="0"  ></td>' +
									'<td><input class="docu5 form-control" type="text" id="docu5" name="docu5"value="N/A" ></td>' +
									'<td><input class="valor5 form-control" type="text" id="valor5" name="valor5"value="0"  ></td>' +
									'<td><input class="docu6 form-control" type="text" id="docu6" name="docu6"value="N/A" ></td>' +
									'<td><input class="valor6 form-control" type="text" id="valor6" name="valor6"value="0"  ></td>' +
									'<td><input class="bond_sist form-control" type="text" id="bond_sist" name="bond_sist"  value="0"></td>' +
									'<td><input class="bond form-control" type="text" id="bond" name="bond" value="0" ></td>' +
									
									'<td></td>' +
									'</tr>'+
									'<tr  style="color:white;Background-color: blue; border-radius:7px;">' +
									
									'<th>TERMICA SISTEMA</th>' +
									'<th>TERMICA EXISTENCIAL </th>' +
									'<th></th>' +
									'<th>OBSERVACIONES</th>' +
									'<th></th>' +
									'<th></th>' +
									'<th></th>' +





									'</tr>'+
									'<tr>' +
									
									'<td><input class="termica_sist form-control" type="text" id="termica_sist" name="termica_sist" value="0" ></td>' +
									'<td><input class="termica form-control" type="text" id="termica" name="termica"  value="0"></td>' +
									'<td></td>' +
									'<td><input class="observacion form-control" type="text" id="observacion" name="observacion" ></td>' +
									'<td></td>' +
									'<td></td>' +
									'<td></td>' +


									'</tr>'+
									'<tr>'+
									'<td>'+
									'<td>'+
									'<td>'+
									'<td><button class="btn btn-outline-info" onclick="guardarAuditoria(' + id + ');"><i class="fas fa-save"></i></button>'+
									'      <button class="btn_validar"  onclick="mostrardiferencia(); ">Diferencia</button></td>'+
									'<td><button class="btn btn-outline-success" id="checkOk" name="checkOk"><i class="fas fa-check"></i></button></td>' +
									'<td></td>'+
									'<td></td>'+
									'</tr>'+  
				'</tfoot>' +
			'</table>';
				document.getElementById('formAuditoria' + id).innerHTML = campoA;
		}else if (opc == 2) {
			var campoA = '';
			consecutivo = consecutivo + 1;
				campoA = 	'<table class="tablaModal table-sm ">' +
								'<tbody>' +
								'<tr>' +
										'<th></th>' +
										'<th></th>' +
										'<th></th>' +
										'<th></th>' +
										'<th></th>' +
										'<th></th>' +
										'<th></th>' +
										
										
									'</tr>' +
								'<tr style="color:white;Background-color: blue; border-radius:7px;">' +
								       '<th>Arqueo</th>' +
								       '<th>Hora inicio</th>' +
								       '<th>Hora fin</th>' +
								       '<th>Auditado</th>' +
								       '<th>Accion disciplinaria</th>' +
								       '<th>Saldo Sistema Contable</th>' +
								       '<th>BILLETS DE 100</th>' +
										
										
									'</tr>' +
									'<tr>' +
										'<td><input class="arqueo form-control" type="text" id="idArqueo" name="idAqueo" value="'+ arqueo +' '+ consecutivo +'" disabled=""td>' +
										'<td><input class="tamañoInpModal form-control" type="time" id="horaInicio" name="horaInicio" style="width: 100px;"></td>' +
										'<td><input class="tamañoInpModal form-control" type="time" id="horaFin" name="horaFin" style="width: 100px;"></td>' +
										'<td>' +
											'<select class="form-control select2" id="idAuditado' + id + '" name="idAuditado' + id + '" style="width: 400px;">' +
											// '<option value="0">Seleccione...</option>' +
											// '<option value="1 - Acta de compromiso">Acta de compromiso</option>' +
											// '<option value="2 - Acta de compromiso para colaborador e involucrados">Acta de compromiso para colaborador e involucrados</option>' +
											// '<option value="3 - Reporte disciplinario">Reporte disciplinario</option>'+
											// '<option value="4 - Ninguna">Ninguna</option>' +
											'</select>' +
										'</td>' +
										
										'<td>' +
											'<select class="tamañoSelectModal form-control select2" id="accionDisciplinaria" name="accionDisciplinaria" style="width: 200px;">' +
												'<option value="0">Seleccione...</option>' +
												'<option value="1 - Acta de compromiso">Acta de compromiso</option>' +
												'<option value="2 - Acta de compromiso para colaborador e involucrados">Acta de compromiso para colaborador e involucrados</option>' +
												'<option value="3 - Reporte disciplinario">Reporte disciplinario</option>'+
												'<option value="4 - Ninguna">Ninguna</option>' +
											'</select>' +
											'<td><input class="sal_conta_otros form-control" type="text" id="sal_conta_otros" name="sal_conta_otros" value="0"  style="width: 200px;"></td>' +
											'<td><input class="campo1 form-control" type="text" id="campo1" name="campo1" value="0" ></td>' +
											
										
									'</tr>' +
								'</tbody>'+
								'<tfoot>' + 
									'<tr>' +
										'<th> </th>' +
										'<th></th>' +
										'<th></th>' +
										'<th></th>' +
										'<th></th>' +
										'<th></th>' +
										'<th></th>' +
									'</tr>' +
									'<tr  style="color:white;Background-color: blue; border-radius:7px;" >' +
										
										'<th>BILLETES DE 50</th>' +
										'<th>BILLETES DE 20</th>' +
										'<th>BILLETES DE 10</th>' +
										'<th>BILLETES DE 5</th>' +
										'<th>BILLETES DE 2</th>' +
										'<th>BILLETES DE 1</th>' +
										'<th>MONEDAS DE 1000</th>' +
									
									'</tr>' +
									'<tr>' +
									'<td><input class="campo2 form-control" type="text" id="campo2" name="campo2" value="0" ></td>' +
									'<td><input class="bill20 form-control" type="text" id="bill20" name="bill20" value="0" ></td>' +
									'<td><input class="bill10 form-control" type="text" id="bill10" name="bill10" value="0" ></td>' +
									'<td><input class="bill5 form-control" type="text" id="bill5" name="bill5" value="0" ></td>' +
									'<td><input class="bill2 form-control" type="text" id="bill2" name="bill2"  value="0" ></td>' +
									'<td><input class="bill1 form-control" type="text" id="bill1" name="bill1" value="0" ></td>' +
									'<td><input class="mon_mil form-control" type="text" id="mon_mil" name="mon_mil" value="0" ></td>' +
								
									'</tr>' +
									'<tr  style="color:white;Background-color: blue; border-radius:7px;">' +
									   '<th>MONEDAS DE 500</th>' +
										'<th>MONEDAS DE 200</th>' +
										'<th>MONEDAS DE 100</th>' +
										'<th>MONEDAS DE 50</th>' +
										'<th>OTROS INGRESOS</th>' +
										'<th>VALOR DE INGRESO</th>' +
										'<th>OTROS INGRESOS</th>' +
										
										
									'</tr>' +
									'<tr>' +
									'<td><input class="mon_500 form-control" type="text" id="mon_500" name="mon_500"  value="0"></td>' +
									'<td><input class="mon_200 form-control" type="text" id="mon_200" name="mon_200" value="0" ></td>' +
									'<td><input class="mon_100 form-control" type="text" id="mon_100" name="mon_100" value="0" ></td>' +
									'<td><input class="mon_50 form-control" type="text" id="mon_50" name="mon_50" value="0" ></td>' +
									'<td><input class="otros_ing1 form-control" type="text" id="otros_ing1" name="otros_ing1" value="N/A" ></td>' +
									'<td><input class="valor_ing1 form-control" type="text" id="valor_ing1" name="valor_ing1" value="0" ></td>' +
									'<td><input class="otros_ing2 form-control" type="text" id="otros_ing2" name= "otros_ing2"value="N/A" ></td>' +



									
								   
									
									'</tr>' +
									'<tr  style="color:white;Background-color: blue; border-radius:7px;">' +
									
									    
										
										'<th>VALOR DE INGRESOS </th>' +
										'<th>OTROS INGRESOS</th>' +
										'<th>VALOR DE INGRESO </th>' +
										'<th>OTROS INGRESOS</th>' +
										'<th>VALOR DE INGRESO </th>' +
										'<th>OTROS INGRESOS</th>' +
										'<th>VALOR DE INGRESO </th>' +
										
									'</tr>' +
									'<tr>' +
									
									
									


									
									'<td><input class="valor_ing2 form-control" type="text" id="valor_ing2" name="valor_ing2"value="0"  ></td>' +
									'<td><input class="otros_ing3 form-control" type="text" id="otros_ing3" name="otros_ing3"value="N/A" ></td>' +
									'<td><input class="valor_ing3 form-control" type="text" id="valor_ing3" name="valor_ing3"value="0"  ></td>' +
									'<td><input class="otros_ing4 form-control" type="text" id="otros_ing4" name="otros_ing4"value="N/A" ></td>' +
									'<td><input class="valor_ing4 form-control" type="text" id="valor_ing4" name="valor_ing4"value="0"  ></td>' +
									'<td><input class="otros_ing5 form-control" type="text" id="otros_ing5" name="otros_ing5"value="N/A" ></td>' +
									'<td><input class="valor_ing5 form-control" type="text" id="valor_ing5" name="valor_ing5"value="0"  ></td>' +
									
									'</tr>' +
									
									'<tr  style="color:white;Background-color: blue; border-radius:7px;">' +
									

								        '<th>DOCUMENTOS EQUIVALENTES</th>' +
								        '<th>VALOR</th>' +
									    '<th>DOCUMENTOS EQUIVALENTES</th>' +
								        '<th>VALOR</th>' +
									    '<th>DOCUMENTOS EQUIVALENTES</th>' +
								        '<th>VALOR</th>' +
										'<th>DOCUMENTOS EQUIVALENTES</th>' +
								        
									    
										
									'</tr>' +
									'<tr>' +
									'<td><input class="docu1 form-control" type="text" id="docu1" name="docu1"value="N/A" ></td>' +
								    '<td><input class="valor1 form-control" type="text" id="valor1" name="valor1"value="0"  ></td>' +
									'<td><input class="docu2 form-control" type="text" id="docu2" name="docu2"value="N/A" ></td>' +
									'<td><input class="valor2 form-control" type="text" id="valor2" name="valor2"value="0"  ></td>' +
									'<td><input class="docu3 form-control" type="text" id="docu3" name="docu3"value="N/A" ></td>' +
									'<td><input class="valor3 form-control" type="text" id="valor3" name="valor3"value="0"  ></td>' +
									'<td><input class="docu4 form-control" type="text" id="docu4" name="docu4"value="N/A" ></td>' +
									


									'</tr>'+
									'<tr  style="color:white;Background-color: blue; border-radius:7px;">' +
									
									    
								       
										'<th>VALOR</th>' +
										'<th>DOCUMENTOS EQUIVALENTES</th>' +
										'<th>VALOR</th>' +
									    '<th>DOCUMENTOS EQUIVALENTES</th>' +
								        '<th>VALOR</th>' +
										'<th>BOND SISTEMA</th>' +
										'<th>BOND EXISTENCIAL</th>' +
										
									    
										
									'</tr>' +
									
									'<tr>' +
									
									'<td><input class="valor4 form-control" type="text" id="valor4" name="valor4"value="0"  ></td>' +
									'<td><input class="docu5 form-control" type="text" id="docu5" name="docu5"value="N/A" ></td>' +
									'<td><input class="valor5 form-control" type="text" id="valor5" name="valor5"value="0"  ></td>' +
									'<td><input class="docu6 form-control" type="text" id="docu6" name="docu6"value="N/A" ></td>' +
									'<td><input class="valor6 form-control" type="text" id="valor6" name="valor6"value="0"  ></td>' +
									'<td><input class="bond_sist form-control" type="text" id="bond_sist" name="bond_sist"  value="0"></td>' +
									'<td><input class="bond form-control" type="text" id="bond" name="bond" value="0" ></td>' +
									
									'<td></td>' +
									'</tr>'+
									'<tr  style="color:white;Background-color: blue; border-radius:7px;">' +
									
									'<th>TERMICA SISTEMA</th>' +
									'<th>TERMICA EXISTENCIAL </th>' +
									'<th></th>' +
									'<th>OBSERVACIONES</th>' +
									'<th></th>' +
									'<th></th>' +
									'<th></th>' +





									'</tr>'+
									'<tr>' +
									
									'<td><input class="termica_sist form-control" type="text" id="termica_sist" name="termica_sist" value="0" ></td>' +
									'<td><input class="termica form-control" type="text" id="termica" name="termica"  value="0"></td>' +
									'<td></td>' +
									'<td><input class="observacion form-control" type="text" id="observacion" name="observacion" ></td>' +
									'<td></td>' +
									'<td></td>' +
									'<td></td>' +


									'</tr>'+
									'<tr>'+
									'<td>'+
									'<td>'+
									'<td>'+
									
									'<td><button class="btn btn-outline-info" onclick="guardarAuditoria(' + id + ');"><i class="fas fa-save"></i></button>'+
									'      <button class="btn_validar"  onclick="mostrardiferencia(); ">Diferencia</button>'+
								'<button class="btn btn-outline-success" id="checkOk" name="checkOk"><i class="fas fa-check"></i></button></td>'+
									'<td></td>'+
									'<td></td>'+
									'</tr>'+
								'</tfoot>' +
							'</table>';
				document.getElementById('formAuditoria' + id).innerHTML = campoA;
		}else if (opc == 3) {
			var campoA = '';
			consecutivo = consecutivo + 1;
				campoA = 	'<table id="formAuditori" class="tablaModal table-sm ">' +
								'<thead>' +
									'<tr class="colorFondoModal">' +
										'<th>Arqueo</th>' +
										'<th>Hora inicio</th>' +
										'<th>Hora fin</th>' +
										'<th>Auditado</th>' +
										'<th>Diferencia</th>' +
										'<th>Economica</th>' +
										'<th>Accion disciplinaria3</th>' +
										'<th></th>' +
										'<th></th>' +
									'</tr>' +
								'</thead>' +
								'<tbody id="tableBody">' +
								'</tbody>'+
							'</table>';
				document.getElementById('inicial').innerHTML = campoA;
		}
	}

	campoEditarAud(){
		var campoA = '';
			campoA = 	'<table id="formEditAuditori" class="tablaModal table-sm ">' +
							'<thead>' +
								'<tr class="colorFondoModal">' +
									'<th>Arqueo</th>' +
									'<th>Hora inicio</th>' +
									'<th>Hora fin</th>' +
									'<th>Auditado</th>' +
									'<th>Diferencia</th>' +
									'<th>Economica</th>' +
									'<th>Accion disciplinaria</th>' +
									'<th></th>' +
									// '<th></th>' +
								'</tr>' +
							'</thead>' +
							'<tbody id="tableEditBody">' +
							'</tbody>'+
						'</table>';
			document.getElementById('bodyEditModal').innerHTML = campoA;
	}

	tablaUsuarios(opc){
		if (opc == 1) {
			var tabla = '';
			tabla = '<thead>' +
						'<tr>' +
							'<th class="bordes">Documento</th>' +
							'<th class="bordes">Nombre</th>' +
							'<th class="bordes">Apellido</th>' +
							'<th class="bordes"></th>' +
							// '<th></th>' +
						'</tr>' +
					'</thead>' +
					'<tbody id="bodyTable">' +
					'</tbody>'+
					'<tfoot>' +
						'<tr>' +
							'<th class="bordes">Documento</th>' +
							'<th class="bordes">Nombre</th>' +
							'<th class="bordes">Apellido</th>' +
							'<th class="bordes"></th>' +
							// '<th></th>' +
						'</tr>' +
					'</tfoot>' +
				'</table>';
			document.getElementById('tablaUsuarios').innerHTML = tabla;
		}
		if (opc == 2) {
			var tabla = '';
			tabla = '<thead>' +
						'<tr>' +
							'<th class="bordes">Documento</th>' +
							'<th class="bordes">Nombre</th>' +
							'<th class="bordes"></th>' +
							// '<th></th>' +
						'</tr>' +
					'</thead>' +
					'<tbody id="bodyTable">' +
					'</tbody>'+
					'<tfoot>' +
						'<tr>' +
							'<th class="bordes">Documento</th>' +
							'<th class="bordes">Nombre</th>' +
							'<th class="bordes"></th>' +
							// '<th></th>' +
						'</tr>' +
					'</tfoot>' +
				'</table>';
			document.getElementById('tablaUsuarios').innerHTML = tabla;
		}
	}
	
	fomularioEditar(opc){
		if (opc == 1) {
			var form = '';
			form = 	'<form id="formEdit" name="formEdit">' +
							'<label for="">Documento</label>' +
							'<input class="form-control espacioSelect" type="text" id="idUsuario" disabled>' +
							'<label class="espacioSelect" for="" >Nombre</label>' +
							'<input class="form-control espacioSelect" type="text" id="nombreUsuario">' +
							'<label class="espacioSelect" for="">Apellido</label>' +
							'<input class="form-control espacioSelect" type="text" id="apellidoUsuario">' +
							'<label class="espacioSelect" for="">Contraseña</label>' +
							'<input class="form-control espacioSelect" type="password" id="password">' +
						'</form>' +
						'<div class="btnAct col-12">' +
							'<button class="btn btn-outline-secondary btnR" onclick="editarUsuario();">Actualizar</button>' +
						'</div>';
			document.getElementById('ubForm').innerHTML = form;
		}

		if (opc == 2) {
			var form = '';
			form = 	'<form id="formEdit" name="formEdit">' +
							'<label for="">Documento</label>' +
							'<input class="form-control espacioSelect" type="text" id="idAuditado" disabled>' +
							'<label class="espacioSelect" for="" >Nombre</label>' +
							'<input class="form-control espacioSelect" type="text" id="nombreAuditado">' +
						'</form>' +
						'<div class="btnAct col-12">' +
							'<button class="btn btn-outline-secondary btnR" onclick="editarUsuario();">Actualizar</button>' +
						'</div>';
			document.getElementById('ubForm').innerHTML = form;
		}
		
	}
}