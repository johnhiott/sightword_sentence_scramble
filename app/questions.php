<?php

//remove in production
header("Access-Control-Allow-Origin: *");

$response = array();

try {
    $db = new PDO("mysql:host=localhost;dbname=citewords",  "root", "");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $ex) {
    die($ex->getMessage());
}

$tagStmt = $db->prepare("SELECT * FROM sentences");
$tagStmt->execute();

while ( $tagRow = $tagStmt->fetch(PDO::FETCH_ASSOC) ) {
    array_push($response, $tagRow["sentence"]);
}

echo json_encode($response);
?>