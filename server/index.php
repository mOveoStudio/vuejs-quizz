<?php
header("Access-Control-Allow-Origin: *");


$endpoint = ($_GET['endpoint']) ? $_GET['endpoint'] : $_POST['endpoint'];

switch ($endpoint) {
    case "setup_game":
        $json = file_get_contents("game.json");

        sleep(2);

        header('Content-Type: application/json');
        echo $json;
        break;

    case "end_game":
        $body = file_get_contents('php://input');
        $input_data = json_decode($body);
        break;

        //do something with $input_data->gameId

    default:
        header('X-PHP-Response-Code: 404', true, 404);
        header('Content-Type: application/json');
        echo json_encode([
           'error' => 'No route exits for "' . $endpoint . '" endpoint.'
        ]);
        die();
}
