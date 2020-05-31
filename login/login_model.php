<?php
require_once '../database/database.php';
require_once 'login_view.php';

class LoginModel
{
    public function addUser($username, $password)
    { // create
        if ($username == "" || $password == "") {
            return "Nu ai completat username-ul si parola.";
        }
        $statement = "INSERT IGNORE INTO users (username, password) VALUES (:username, :password)";
        $query = Database::getConnection()->prepare($statement);
        $query->execute(array(
            "username" => $username,
            "password" => password_hash($password, PASSWORD_DEFAULT)
        ));
        if ($query->rowCount() == 0) {
            return "Username-ul nu este disponibil.";
        } else {
            return "";
        }
    }

    public function validateUser($username, $password)
    { // read
        $statement = "SELECT username, password FROM users WHERE username = :username";
        $query = Database::getConnection()->prepare($statement);
        $query->execute(array("username" => $username));
        if ($query->rowCount() == 0) {
            return "Username incorect.";
        }
        $row = $query->fetch(PDO::FETCH_ASSOC);
        if (!password_verify($password, $row["password"])) {
            return "Parola incorecta.";
        }
        return "";
    }
}
