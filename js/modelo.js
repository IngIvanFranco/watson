class Usuario{
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
	 		if(this.nombreUsuario) nArray['nombreUsuario'] = this.nombreUsuario;
	 		if(this.apellidoUsuario) nArray['apellidoUsuario'] = this.apellidoUsuario;
	 		if(this.password) nArray['password'] = this.password;
	 		if(this.idCatUsuario) nArray['idCatUsuario'] = this.idCatUsuario;
			if(this.idEstado) nArray['idEstado'] = this.idEstado;
			if(this.tipoContrato) nArray['tipoContrato'] = this.tipoContrato;
	 		// 'nombre': this.nombre, 
	 		// 'catUsuario': this.catUsuario, 
	 		// 'correo': this.correo

	 	// };
	  return nArray;
	}
}

class Programming{
	constructor(){
	}

	setData(datos){
		for ( var nomAtrib in datos) {
			this[nomAtrib] = datos[nomAtrib];
	  	}  
	}
	getData(){
	 	let nArray = {};
	 		if(this.idProgramacion) nArray['idProgramacion'] = this.idProgramacion;
	 		if(this.fechaInicio) nArray['fechaInicio'] = this.fechaInicio;
	 		if(this.fechaFin) nArray['fechaFin'] = this.fechaFin;
	 		if(this.dias) nArray['dias'] = this.dias;
	 		if(this.idCatOficina) nArray['idCatOficina'] = this.idCatOficina;
			if(this.idOficina) nArray['idOficina'] = this.idOficina;
			if(this.idUsuario) nArray['idUsuario'] = this.idUsuario;
			if(this.idPrograma) nArray['idPrograma'] = this.idPrograma;
			if(this.idTipoAuditoria) nArray['idTipoAuditoria'] = this.idTipoAuditoria;
	 		// 'nombre': this.nombre, 
	 		// 'catUsuario': this.catUsuario, 
	 		// 'correo': this.correo

	 	// };
	  return nArray;
	}
}

class Gasto{
	constructor(){
	}

	setData(datos){
		for ( var nomAtrib in datos) {
			this[nomAtrib] = datos[nomAtrib];
	  	}  
	}
	getData(){
	 	let nArray = {};
	 		if(this.idViatico) nArray['idViatico'] = this.idViatico;
	 		if(this.idUsuario) nArray['idUsuario'] = this.idUsuario;
	 		if(this.fechaInicio) nArray['fechaInicio'] = this.fechaInicio;
	 		if(this.fechaFin) nArray['fechaFin'] = this.fechaFin;
	 		if(this.oficina) nArray['oficina'] = this.oficina;
			if(this.conceptoGasto) nArray['conceptoGasto'] = this.conceptoGasto;
			if(this.observacion) nArray['observacion'] = this.observacion;
			if(this.valorParcial) nArray['valorParcial'] = this.valorParcial;
			if(this.totalViaticos) nArray['totalViaticos'] = this.totalViaticos;
			//  if(this.tipoContrato) nArray['tipoContrato'] = this.tipoContrato;
	 		// 'nombre': this.nombre,
	 		// 'catUsuario': this.catUsuario, 
	 		// 'correo': this.correo

	 	// };
	  return nArray;
	}
}

class Auditoria{
	constructor(){
	}

	setData(datos){
		for ( var nomAtrib in datos) {
			this[nomAtrib] = datos[nomAtrib];
	  	}  
	}
	getData(){
	 	let nArray = {};
		    if(this.idAuditoria) nArray['idAuditoria'] = this.idAuditoria;
	 		if(this.horaInicio) nArray['horaInicio'] = this.horaInicio;
			if(this.horaFin) nArray['horaFin'] = this.horaFin;
			if(this.idAuditado) nArray['idAuditado'] = this.idAuditado; 
	 		if(this.accionDisciplinaria) nArray['accionDisciplinaria'] = this.accionDisciplinaria;
			if(this.idArqueo) nArray['idArqueo'] = this.idArqueo;
			if(this.arqueo) nArray['arqueo'] = this.arqueo;
			if(this.idProgramacion) nArray['idProgramacion'] = this.idProgramacion;
			if(this.campo1) nArray['campo1'] = this.campo1;
			if(this.campo2) nArray['campo2'] = this.campo2;
			if(this.bill20) nArray['bill20'] = this.bill20;
			if(this.bill10) nArray['bill10'] = this.bill10;
			if(this.bill5) nArray['bill5'] = this.bill5;
			if(this.bill2) nArray['bill2'] = this.bill2;
			if(this.bill1) nArray['bill1'] = this.bill1;
			if(this.mon_mil) nArray['mon_mil'] = this.mon_mil;
			if(this.mon_500) nArray['mon_500'] = this.mon_500;
			if(this.mon_200) nArray['mon_200'] = this.mon_200;
			if(this.mon_100) nArray['mon_100'] = this.mon_100;
			if(this.mon_50) nArray['mon_50'] = this.mon_50;
			if(this.sal_conta_otros) nArray['sal_conta_otros'] = this.sal_conta_otros;
	        if(this.bond) nArray['bond'] = this.bond;
			if(this.termica) nArray['termica'] = this.termica;
			if(this.otros_ing1) nArray['otros_ing1'] = this.otros_ing1;
			if(this.valor_ing1) nArray['valor_ing1'] = this.valor_ing1;
			if(this.otros_ing2) nArray['otros_ing2'] = this.otros_ing2;
			if(this.valor_ing2) nArray['valor_ing2'] = this.valor_ing2;
			if(this.otros_ing3) nArray['otros_ing3'] = this.otros_ing3;
			if(this.valor_ing3) nArray['valor_ing3'] = this.valor_ing3;
            if(this.otros_ing4) nArray['otros_ing4'] = this.otros_ing4;
			if(this.valor_ing4) nArray['valor_ing4'] = this.valor_ing4;
            if(this.otros_ing5) nArray['otros_ing5'] = this.otros_ing5;
			if(this.valor_ing5) nArray['valor_ing5'] = this.valor_ing5;
            if(this.docu1) nArray['docu1'] = this.docu1;
			if(this.valor1) nArray['valor1'] = this.valor1;
			if(this.docu2) nArray['docu2'] = this.docu2;
			if(this.valor2) nArray['valor2'] = this.valor2;
			if(this.docu3) nArray['docu3'] = this.docu3;
			if(this.valor3) nArray['valor3'] = this.valor3;
			if(this.docu4) nArray['docu4'] = this.docu4;
			if(this.valor4) nArray['valor4'] = this.valor4;
			if(this.docu5) nArray['docu5'] = this.docu5;
			if(this.valor5) nArray['valor5'] = this.valor5;
			if(this.docu6) nArray['docu6'] = this.docu6;
			if(this.valor6) nArray['valor6'] = this.valor6;
            if(this.bond_sist) nArray['bond_sist'] = this.bond_sist;
			if(this.termica_sist) nArray['termica_sist'] = this.termica_sist;
            if(this.observacion) nArray['observacion'] = this.observacion;
			if(this.diferencia) nArray['diferencia'] = this.diferencia;
			


			

			
			
			
		
		
		
	 		// 'nombre': this.nombre, 
	 		// 'catUsuario': this.catUsuario,       
	 		// 'correo': this.correo

	 	// };
	  return nArray;
	}
}

class Edicion{
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
			if(this.nombreUsuario) nArray['nombreUsuario'] = this.nombreUsuario;
			if(this.apellidoUsuario) nArray['apellidoUsuario'] = this.apellidoUsuario;
			if(this.password) nArray['password'] = this.password;
			if(this.idAuditado) nArray['idAuditado'] = this.idAuditado;
			if(this.idCatUsuario) nArray['idCatUsuario'] = this.idCatUsuario;
			if(this.nombreAuditado) nArray['nombreAuditado'] = this.nombreAuditado;
			if(this.tipoContrato) nArray['tipoContrato'] = this.tipoContrato;
	 		// 'nombre': this.nombre, 
	 		// 'catUsuario': this.catUsuario, 
	 		// 'correo': this.correo

	 	// };
	  return nArray;
	}
}

class Oficina{
	constructor(){
	}

	setData(datos){
		for ( var nomAtrib in datos) {
			this[nomAtrib] = datos[nomAtrib];
	  	}  
	}
	getData(){
	 	let nArray = {};
			if(this.idCatOficina) nArray['idCatOficina'] = this.idCatOficina;
			if(this.idOficina) nArray['idOficina'] = this.idOficina;
			if(this.nombreOficina) nArray['nombreOficina'] = this.nombreOficina;
			if(this.ubicacion) nArray['ubicacion'] = this.ubicacion;
	 		// 'nombre': this.nombre, 
	 		// 'catUsuario': this.catUsuario, 
	 		// 'correo': this.correo

	 	// };
	  return nArray;
	}
}

class Punto{
	constructor(){
	}

	setData(datos){
		for ( var nomAtrib in datos) {
			this[nomAtrib] = datos[nomAtrib];
	  	}  
	}
	getData(){
	 	let nArray = {};
			if(this.idCatOficina) nArray['idCatOficina'] = this.idCatOficina;
			if(this.idPunto) nArray['idPunto'] = this.idPunto;
			if(this.nombrePunto) nArray['nombrePunto'] = this.nombrePunto;
			if(this.ubicacionPunto) nArray['ubicacionPunto'] = this.ubicacionPunto;
	 		// 'nombre': this.nombre, 
	 		// 'catUsuario': this.catUsuario, 
	 		// 'correo': this.correo

	 	// };
	  return nArray;
	}
}