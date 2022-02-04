<?php
/********************************************************
 	PROYECTO: P A G Seguimiento y Control
 	PROGRAMA: enlaceDB.php
 	Realiza la conexion a la BD via PDO
 	Es utilizado por DESPACHADOR.PHP
 	25/04/2019
*********************************************************/
//PDO

$host = 'localhost'; // Hosting en el que estamos usando nuestra base de datos
$nomBD = 'watson'; // Nombre de la base de datos
$usuario = 'root'; // Usuario donde se encuentra la base de datos
$contraseña = ''; // Contraseña del Usuario

$charset = 'utf8'; // Metodo para que se puedan usar caracteres especiales

$dns = "mysql:host=$host;dbname=$nomBD;charset=$charset"; // Variable que guarda los datos para la conexion 

// Arreglo que gurada las opciones a utilizar por PDO
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

// Intenta conectar con la base de datos 
try {
	 $pdo = new PDO($dns, $usuario, $contraseña, $options);
} catch (\PDOException $e) {
	throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

?>