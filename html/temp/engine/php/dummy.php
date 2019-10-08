<?php

$data = json_decode(base64_decode($_POST['data']));
$prettyBookData = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents("lastBuild.json", $prettyBookData);

$response['status'] = 'success';
header('Content-type: application/json');
echo json_encode($response);

?>