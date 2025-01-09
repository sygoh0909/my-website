<?php
header("Content-Type: application/json");

$host = "sql311.infinityfree.com";
$user = "if0_38074000";
$password = "Royallove2019";
$dbname = "if0_38074000_mywebsitedb";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn ->connect_error){
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$query = "SELECT * FROM skills";
$result = $conn->query($query);

$data = [];
if ($result->num_rows>0){
    while ($row = $result->fetch_assoc()){
        $data[] = $row;
    }
}

echo json_encode ($data);

$conn->close();

?>