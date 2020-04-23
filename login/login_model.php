<?php
    require_once 'database_configuration.php';
    require_once 'login_view.php';

    class Database {
        private static $connection = NULL; // singleton
        public static function getConnection() {
            if (is_null(self::$connection)) {
                self::$connection = new PDO('mysql:host=' . DATABASE_HOST . ';dbname=' . DATABASE_NAME,
                    DATABASE_USERNAME, DATABASE_PASSWORD);
            }
            return self::$connection;
        }
    }

    class LoginModel {
        public function addUser($username, $password) { // create
            if ($username == "" || $password == "") {
                return "Username and password are mandatory.";
            }
            $statement = "INSERT IGNORE INTO users (username, password) VALUES (:username, :password)";
            $query = Database::getConnection()->prepare($statement);
            $query->execute(array(
                'username' => $username,
                'password' => $password,
            ));
            if ($query->rowCount() == 0) {
                return "Username is already taken.";
            }
            else {
                return "";
            }
        }

        public function validateUser($username, $password) { // read
            $statement = "SELECT * FROM users WHERE username = :username AND password = :password";
            $query = Database::getConnection()->prepare($statement);
            $query->execute(array(
                'username' => $username,
                'password' => $password
            ));
            if ($query->rowCount() == 0) {
                return "Username or password are incorrect.";
            }
            else {
                return "";
            }
        }
    }
