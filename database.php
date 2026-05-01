<?php
$host = "sql212.infinityfree.com";
$user = "if0_41794883";
$pass = "dzeVGjDm3wuME3";
$db   = "if0_41794883_gardacakrawala";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Koneksi database gagal");
}
?>