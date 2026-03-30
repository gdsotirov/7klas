<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include "../../../7klas.cfg";

$conn = new mysqli("localhost", "7klas_app", $db_password, "7klas");

$sql_result = $conn->query("SELECT * FROM SchoolDistrictsJSON");

$json = "";
while($rs = $sql_result->fetch_array(MYSQLI_ASSOC)) {
  if ( $json != "" )
  {
    $json .= ",";
  }
  $json .= $rs["json_obj"];
}

/* Make array */
$json = "[".$json."]";

$conn->close();

echo $json;
?>
