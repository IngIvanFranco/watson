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
		this.limpiar(destino);
		var template = document.getElementById(form);
		if (template) { // Si la plantilla existe...
			var clon = template.content.cloneNode(true);
			document.getElementById(destino).innerHTML = "";
			document.getElementById(destino).appendChild(clon); // Inserta
		}	
	}

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
				case "checkbox":
					if (elements[i].checked == false) {
						contCheck = contCheck +1;
					}
					if (contCheck == 4) {
						msj = 'no se ha marcado una opcion'
						cont = cont + 1;
					}
					break;

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
	mostrarDatosTabla(idTabla, datos, func){
		// Eliminar filas
		document.getElementById(idTabla).innerHTML= "";
		//$(idTabla+" > tbody").html("");
		var txt = '';
		for(var i = 0; i < datos.length; i++){
			txt += '<tr>';
			txt += '<td><input type="checkbox" id="checkb" name="checkb"></td>';
			for ( var key in datos[i]) {
				txt += '<td>' + datos[i][key] + '</td>';
		  	}
/*		  	txt += '<td><div class="btn-group-vertical"><button type="button" class="btn2"';
		  	txt += ' id="btnEditAdmin" onclick="setDatosForm'+ func+'(' + i + ')">';
		  	txt += '<img src="../img/logo7.png" ></button></div></td></tr>'; 
*/				
			txt +='</tr>';
		}
		document.getElementById(idTabla).innerHTML= txt;
	}

}