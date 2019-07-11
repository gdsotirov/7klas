<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "7klas_app", "7klas.APP", "7klas57");

$rnk_yr = "";
if ( $argc > 1 && is_numeric($argv[1]) ) {
  $rnk_yr = $argv[1];
}

if ( $rnk_yr != "" ) {
  $sql_result = $conn->query("SELECT * FROM ClassRanksJSON WHERE json_obj->\"$.clsYear\" = \"$rnk_yr\";");
}
else {
  $sql_result = $conn->query("SELECT * FROM ClassRanksJSON");
}

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
