<?php
/**
 * Created by PhpStorm.
 * User: sukhpreetsingh
 * Date: 2018-03-30
 * Time: 12:57 AM
 */


$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BooksOrder";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else
    echo "Connection Successfull";
$conn->close();