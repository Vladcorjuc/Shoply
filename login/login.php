<?php
    require_once 'login_controller.php';

    if (isset($_SESSION["username"])) {
        header("Location: ../index/index.html");
    }
    else {
        if (isset($_POST["action"])) {
            $action = $_POST["action"];
            switch ($action) {
                case "login":
                case "register":
                    $parameters = array($_POST["username"], $_POST["password"]);
                    break;
                case "logout":
                    unset($_SESSION["username"]);
                    header("Location: ../index/index.html");
            }
        }
        else {
            $action = "";
            $parameters = "";
        }

        $controller = new LoginController($action, $parameters);
    }
