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

$query_skills = "SELECT * FROM skills";
$result_skills = $conn->query($query_skills);

$data = [];
if ($result_skills && $result_skills->num_rows>0){
    while ($row = $result_skills->fetch_assoc()){
        $data['skills'][] = $row;
    }
}
else{
    $data['skills'] = [];
}

$query_experiences = "SELECT * FROM experiences";
$result_experiences = $conn->query($query_experiences);

if ($result_experiences && $result_experiences->num_rows>0){
    while ($row = $result_experiences->fetch_assoc()){
        $data['experiences'][] = $row;
    }
}
else{
    $data['experiences'] = [];
}

echo json_encode ($data);

$conn->close();

?>