class Sesion{
	constructor(){
	}

	setData(datos){
		for ( var nomAtrib in datos) {
			this[nomAtrib] = datos[nomAtrib];
	  	}  
	}
	getData(){
	 	let nArray = {};
	 		if(this.idUsuario) nArray['idUsuario'] = this.idUsuario;
	 		if(this.nomrbe) nArray['nomrbe'] = this.nomrbe;
	 		if(this.apellido) nArray['apellido'] = this.apellido;
	 		if(this.password) nArray['password'] = this.password;
	 		if(this.idCatUsuario) nArray['idCatUsuario'] = this.idCatUsuario;
	 		if(this.idEstado) nArray['idEstado'] = this.idEstado;
	 		// 'nombre': this.nombre, 
	 		// 'catUsuario': this.catUsuario, 
	 		// 'correo': this.correo

	 	// };
	  return nArray;
	}
}