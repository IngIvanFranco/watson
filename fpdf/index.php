<?php
require './fpdf.php';
$hoy = date("d-m-y");
$id=$_GET['id'];
/**************************************************************************
 	
 	MODULO: Cliente
 	PROGRAMA: fpdf/index.php
 	genera un pdf con los datos requeridos 
     por el cliente hecho con la libreria FPDF
 	Programador: TENOLOGO (ADSI) SEBASTIAN CRIALES
    supervision: DIRECTOR TICS ING. IVAN FRANCO
 	Fecha: nov/05/2021
 	ver: 1.0
***************************************************************************/
class PDF extends FPDF
{
// Cabecera de página
function Header()
{  
    $this->SetMargins(30, 25 , 30);
    // Logo
   $this->image('logo.png',10,3,30);
    // Arial bold 15
    $this->SetFont('Arial','B',7);
    // Movernos a la derecha
    $this->Cell(35);
    // Título
   
   
    $this->Cell(100,10,'COMPROBANTE DE PAGO EN EFECTIVO ARQUEO DE CAJA',1,0,'C');
    $this->Cell(28,10,'CODIGO: FR-AC-29 ',1,0,'C');
    
    $this->Cell(28,10,'VERSION:017/01/2020 ',1,0,'C');


    $this->SetXY(10,21);
    $this->SetFont('Arial','B',9);
    $this->Cell(15,5,'N:',0,0,'C');
    
    $this->SetXY(18,28);
    $this->SetFont('Arial','B',7);
    $this->Cell(6,5,'A',1,0,'C');
    $this->Cell(6,5,'M',1,0,'C');
    $this->Cell(6,5,'D',1,0,'C');



    $this->SetXY(70,27);
    $this->SetFont('Arial','B',8);
    $this->Cell(16,5,'Hora inicio',1,0,'C');
    $this->Cell(16,5,'Hora Fin ',1,0,'C');

    $this->SetXY(123,27);
    $this->SetFont('Arial','B',9);
  $this->Cell(16,5,'LUGAR : ',0,0,'C');


  $this->SetXY(123,32);
  $this->SetFont('Arial','B',9);
$this->Cell(16,5,' AUDITOR :',0,0,'C');






$this->SetXY(34,83);
$this->SetFont('Arial','B',8);
$this->Cell(16,5,'BILLETES',1,0,'C');
$this->SetXY(50,83);
$this->Cell(20,5,'CANTIDAD',1,0,'C');
$this->Cell(20,5,'TOTAL',1,0,'C');


$this->SetXY(124,83);
$this->SetFont('Arial','B',8);
$this->Cell(16,5,'MONEDAS',1,0,'C');
$this->SetXY(140,83);
$this->Cell(20,5,'CANTIDAD',1,0,'C');
$this->Cell(20,5,'TOTAL',1,0,'C');



$this->SetXY(34,88);
$this->SetFont('Arial','B',9);
$this->Cell(16,5,'$100.000',1,0,'C');


$this->SetXY(34,93);
$this->SetFont('Arial','B',9);
$this->Cell(16,5,'$50.000',1,3,'C');
$this->Cell(16,5,'$20.000',1,3,'C');
$this->Cell(16,5,'$10.000',1,4,'C');
$this->Cell(16,5,'$5.000',1,5,'C');
$this->Cell(16,5,'$2.000',1,6,'C');
$this->Cell(16,5,'$1.000',1,0,'C');


$this->SetXY(124,88);
$this->SetFont('Arial','B',9);
$this->Cell(16,5,'$1.000',1,0,'C');




$this->SetXY(124,93);
$this->SetFont('Arial','B',9);
$this->Cell(16,5,'$500',1,2,'C');
$this->Cell(16,5,'$200',1,3,'C');
$this->Cell(16,5,'$100',1,4,'C');
$this->Cell(16,5,'$50',1,0,'C');


$this->SetXY(100,140);
$this->SetFont('Arial','B',9);
$this->Cell(16,5,'DOCUMENTOS Y EQUIVALENTES EFECTIVO',0,2,'C');





$this->SetXY(30,203);
$this->SetFont('Arial','B',8);
$this->multiCell(48,6,'INVENTARIO PAPELERIA     TOTAL DE ROLLOS EXISTENTES',0,'C');
$this->SetXY(108,203);
$this->SetFont('Arial','B',9);
$this->Cell(18,5,'BOND',1,2,'C');
$this->SetXY(155,203);
$this->SetFont('Arial','B',9);
$this->Cell(22,5,'TERMICA',1,2,'C');



$this->SetXY(35,219);
$this->Cell(16,5,'OBSERVACIONES',0,2,'C');


$this->SetXY(30,250);
$this->SetFont('Arial','B',9);
$this->Cell(16,5,'AUDITADO',0,2,'');
$this->SetFont('Arial','',9);
$this->Cell(16,5,'FIRMA: __________________________',0,2,'');


/*
$this->SetXY(132,250);
$this->SetFont('Arial','B',9);
$this->Cell(16,5,'AUDITADO',0,2,'C');
$this->SetFont('Arial','',9);
$this->Cell(16,5,'FIRMA:     _____________________',0,2,'');
$this->Cell(16,5,'NOMBRE: _____________________',0,2,'');
$this->Cell(16,5,'CC:            _____________________',0,2,'');
$this->Cell(16,5,'CARGO:    _____________________',0,2,'');
*/
$this->SetXY(15,44);
$this->SetFont('arial','B',9);
$this->Cell(30,5,'OTROS INGRESOS',0,2,'C');





    // Salto de línea
    $this->Ln(13);


   
}

// Pie de página
function Footer()
{
    // Posición: a 1,5 cm del final
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Número de página
    $this->Cell(0,10,'Pagina '.$this->PageNo().'/{nb}',0,0,'C');
}
}

require 'conex.php';
$consulta ="SELECT programacion.fechaInicio,  auditoria.idAuditoria, auditoria.horaInicio, auditoria.horaFin, programacion.nombreOficina,auditoria.campo1,auditoria.campo2,auditoria.bill20,auditoria.bill10,
auditoria.bill5, auditoria.bill2,auditoria.bill1,auditoria.mon_mil,auditoria.mon_500,auditoria.mon_200,auditoria.mon_100,auditoria.mon_50,
auditoria.sal_conta_otros,auditoria.bond,auditoria.termica,auditoria.observacion,auditado.nombreAuditado,auditado.idAuditado,usuario.nombreUsuario,categoriausuario.catUsuario,auditoria.otros_ing1,auditoria.valor_ing1,auditoria.otros_ing2,auditoria.valor_ing2,otros_ing3,valor_ing3,otros_ing4,valor_ing4,otros_ing5,valor_ing5,
auditoria.docu1,auditoria.valor1,auditoria.docu2,auditoria.valor2,auditoria.docu3,auditoria.valor3,auditoria.docu4,auditoria.valor4,auditoria.docu5,auditoria.valor5,auditoria.docu6,auditoria.valor6,auditoria.bond_sist,auditoria.termica_sist
, usuario.apellidoUsuario FROM auditoria, programacion, usuario, auditado,categoriausuario WHERE  auditoria.idAuditoria = $id
AND auditoria.idProgramacion = programacion.idProgramacion
AND programacion.idUsuario = usuario.idUsuario
AND auditoria.idAuditado = auditado.idAuditado
AND auditado.idCatUsuario = categoriausuario.idCatUsuario";
$resultado = $mysql->query($consulta);



$pdf = new PDF();
$pdf-> AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('arial','',9);


while($row= $resultado->fetch_assoc()){



    $valorbilletes100 = $row['campo1'] * 100000;
    $valorbill50 = $row['campo2'] * 50000;
    $valorbill20 = $row['bill20'] * 20000;
    $valorbill10 = $row['bill10'] * 10000;
    $valorbill5 = $row['bill5'] * 5000;
    $valorbill2 = $row['bill2'] * 2000;
    $valorbill1 = $row['bill1'] * 1000;
    $monmil = $row['mon_mil'] * 1000;
    $mon500 = $row['mon_500'] * 500;
    $mon200 = $row['mon_200'] * 200;
    $mon100 = $row['mon_100'] * 100;
    $mon50 = $row['mon_50'] * 50;
    
   $totalbill= $valorbilletes100+$valorbill50+$valorbill20+$valorbill10+$valorbill5+$valorbill2+$valorbill1;
   $totalmon= $monmil+$mon500+$mon200+$mon100+$mon50;

$total_docu= $row['valor1'] + $row['valor2']  + $row['valor3'] + $row['valor4'] + $row['valor5'] + $row['valor6'];
$total_mov= $totalbill + $totalmon + $total_docu;

$total_ing = $row['valor_ing1'] + $row['valor_ing2'] + $row['valor_ing3'] +  $row['sal_conta_otros'];


$diferecia= $total_ing-$total_mov ;


    $pdf->SetXY(21,21);
$pdf->Cell(15,5,$row ['idAuditoria'] ,0,2,'C',0);
$pdf->SetXY(18,33);
 $pdf->Cell(18,5, $row['fechaInicio'],1,0,'C',0);
 $pdf->SetXY(70,32);
$pdf->Cell(16,5, $row ['horaInicio'],1,0,'C');
$pdf->Cell(16,5, $row ['horaFin'],1,1,'C');
$pdf->SetXY(140,32);
$pdf->Cell(20,5, utf8_decode( $row['nombreUsuario']).' '. utf8_decode( $row['apellidoUsuario']),0,3,'',0);
$pdf->SetXY(138,27);
$pdf->Cell(32,5, $row ['nombreOficina'],0,3,'',0); 
$pdf->SetXY(15,40);
$pdf->SetFont('arial','B',9);
$pdf->Cell(120,5,'SALDO SISTEMA/ CONTABILIDAD $'. number_format ($row ['sal_conta_otros']),0,3,'',0);


$pdf->SetXY(50,88);
$pdf->Cell(20,5,$row ['campo1'],1,3,'C',0);
$pdf->Cell(20,5, $row ['campo2'],1,3,'C',0);
$pdf->Cell(20,5, $row ['bill20'],1,3,'C',0);
$pdf->Cell(20,5, $row ['bill10'],1,3,'C',0);   
$pdf->Cell(20,5, $row ['bill5'],1,3,'C',0);
$pdf->Cell(20,5, $row ['bill2'],1,3,'C',0);
$pdf->Cell(20,5, $row ['bill1'],1,3,'C',0);
$pdf->SetXY(140,88);
$pdf->Cell(20,5, $row ['mon_mil'],1,3,'C',0);
$pdf->Cell(20,5, $row ['mon_500'],1,3,'C',0);
$pdf->Cell(20,5, $row ['mon_200'],1,3,'C',0);
$pdf->Cell(20,5, $row ['mon_100'],1,3,'C',0);
$pdf->Cell(20,5, $row ['mon_50'],1,3,'C',0);
$pdf->SetXY(30,130);

$pdf->SetXY(64,182);
$pdf->SetFont('arial','B',9);
$pdf->Cell(20,5,'TOTAL DOCUMENTOS Y EQUIVALENTES DE EFECTIVO  ',0,3,'C',0);
$pdf->SetXY(160,182);
$pdf->Cell(20,5,'$ '.number_format( $total_docu),0,3,'L',0);
$pdf->SetXY(30,225);
$pdf->MultiCell(150,5, $row ['observacion'],1,3,'',0);
$pdf->SetXY(30,260);
$pdf->SetFont('arial','',9);
$pdf->Cell(20,5,'NOMBRE: ' .$row ['nombreAuditado'],0,3,'',0);
$pdf->Cell(20,5, 'CC: '.$row ['idAuditado'],0,3,'',0);
$pdf->Cell(20,5, 'CARGO: '.$row ['catUsuario'],0,3,'',0);
$pdf->SetXY(70,88);
$pdf->Cell(20,5, '$ '.number_format( $valorbilletes100),1,3,'R',0);
$pdf->Cell(20,5, '$ '.number_format( $valorbill50),1,3,'R',0);
$pdf->Cell(20,5, '$ '.number_format( $valorbill20),1,3,'R',0);
$pdf->Cell(20,5, '$ '.number_format( $valorbill10),1,3,'R',0);
$pdf->Cell(20,5, '$ '.number_format( $valorbill5),1,3,'R',0);
$pdf->Cell(20,5, '$ '.number_format( $valorbill2),1,3,'R',0);
$pdf->Cell(20,5, '$ '.number_format( $valorbill1),1,3,'R',0);
$pdf->SetXY(160,88);
$pdf->Cell(20,5, '$ '.number_format( $monmil),1,3,'R',0);
$pdf->Cell(20,5, '$ '.number_format( $mon500),1,3,'R',0);
$pdf->Cell(20,5, '$ '.number_format( $mon200),1,3,'R',0);
$pdf->Cell(20,5, '$ '.number_format( $mon100),1,3,'R',0);
$pdf->Cell(20,5, '$ '.number_format( $mon50),1,3,'R',0);
$pdf->SetXY(32,127);
$pdf->SetFont('arial','B',9);
$pdf->Cell(20,5,'TOTAL BILLETES $ '.number_format( $totalbill),0,0);
$pdf->SetXY(123,127);
$pdf->SetFont('arial','B',9);
$pdf->Cell(20,5,'TOTAL MONEDAS $ '.number_format( $totalmon),0,0);
$pdf->SetXY(90,203);
$pdf->Cell(18,5,'BOND SIS.',1,3,'C',0);
$pdf->Cell(18,5, $row ['bond_sist'],1,3,'C',0);
$pdf->SetXY(133,203);
$pdf->Cell(22,5,'TERMICA SIS.',1,3,'C',0);
$pdf->Cell(22,5, $row ['termica_sist'],1,3,'C',0);

$pdf->SetXY(108,208);
$pdf->Cell(18,5,$row ['termica'] ,1,3,'C',0);
$pdf->SetXY(155,208);
$pdf->Cell(22,5, $row ['bond'] ,1,3,'C',0);
$pdf->SetXY(25,49);
$pdf->Cell(50,5,'- '. $row ['otros_ing1'],0,3,'',0);
$pdf->Cell(50,5,'- '. $row ['otros_ing2'],0,3,'',0);
$pdf->Cell(50,5,'- '. $row ['otros_ing3'],0,3,'',0);
$pdf->Cell(50,5,'- '. $row ['otros_ing4'],0,3,'',0);
$pdf->Cell(50,5,'- '. $row ['otros_ing5'],0,3,'',0);
$pdf->SetXY(160,49);
$pdf->SetFont('arial','B',9);
$pdf->Cell(50,5,'$ '.number_format( $row ['valor_ing1']),0,3,'',0);
$pdf->Cell(50,5,'$ '.number_format( $row ['valor_ing2']),0,3,'',0);
$pdf->Cell(50,5,'$ '.number_format( $row ['valor_ing3']),0,3,'',0);
$pdf->Cell(50,5,'$ '.number_format( $row ['valor_ing4']),0,3,'',0);
$pdf->Cell(50,5,'$ '.number_format( $row ['valor_ing5']),0,3,'',0);
$pdf->SetXY(30,146);
$pdf->SetFont('arial','B',9);
$pdf->Cell(50,5,'- '. $row ['docu1'],0,3,'',0);
$pdf->Cell(50,5,'- '. $row ['docu2'],0,3,'',0);
$pdf->Cell(50,5,'- '. $row ['docu3'],0,3,'',0);
$pdf->Cell(50,5,'- '. $row ['docu4'],0,3,'',0);
$pdf->Cell(50,5,'- '. $row ['docu5'],0,3,'',0);
$pdf->Cell(50,5,'- '. $row ['docu6'],0,3,'',0);

$pdf->SetXY(160,146);
$pdf->SetFont('arial','B',9);
$pdf->Cell(50,5,'$ '.number_format ($row ['valor1']),0,3,'',0);
$pdf->Cell(50,5,'$ '.number_format ($row ['valor2']),0,3,'',0);
$pdf->Cell(50,5,'$ '.number_format ($row ['valor3']),0,3,'',0);
$pdf->Cell(50,5,'$ '.number_format ($row ['valor4']),0,3,'',0);
$pdf->Cell(50,5,'$ '.number_format ($row ['valor5']),0,3,'',0);
$pdf->Cell(50,5,'$ '.number_format ($row ['valor6']),0,3,'',0);
$pdf->SetXY(91,187);
$pdf->SetFont('Arial','B',9);
$pdf->Cell(16,5,'TOTAL MOVIMIENTOS ',0,2,'C');
$pdf ->SetXY(160,187);
$pdf->Cell(16,5,'$ '.number_format( $total_mov),0,2,'L');
$pdf->SetXY(98,191);
$pdf->SetFont('Arial','B',9);
$pdf->Cell(16,5,'DIFERENCIA   ',0,2,'C');
$pdf->SetXY(160,191);
$pdf->Cell(16,5,'$ '.number_format ($diferecia),0,2,'L');
$pdf->SetXY(34,75);
$pdf->Cell(16,5,'TOTAL DE INGRESOS $  '.number_format ($total_ing),0,2,'C');



//$diferencia = $_POST['diferencia'];




}


$pdf->Output();







?>