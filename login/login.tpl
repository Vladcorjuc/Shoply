<!-- inspiration: https://www.youtube.com/watch?v=L5WWrGMsnpw !-->


<!DOCTYPE html>
<html lang="ro">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="../icon.png">
        <link rel="stylesheet" type="text/css" href="login.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="login.js" defer></script>
        <title>Shoply</title>
    </head>
    <body>
        <a href="../index/index.html"><img src="../logo.png" alt="Shoply" class="logo"></a>
        <div class="form">
            <div class="button-box">
                <div id="button"></div>
                <button type="button" id="login-button" class="toggle-button" name="action" value="login"
                        onclick="login()">Login</button>
                <button type="button" id="register-button" class="toggle-button" name="action" value="register"
                        onclick="register()">Register</button>
            </div>
            <form id="login" class="credentials" method="POST" action="login.php">
                <label>
                    <input type="hidden" name="action" value="login">
                </label>
                <label>
                    <input type="text" name="username" autocomplete="off" class="input-field" placeholder="Please enter your username" required>
                </label>
                <label>
                    <input type="password" name="password" autocomplete="off" class="input-field" placeholder="Please enter your password" required>
                </label>
                <label>
                    <input type="checkbox" class="checkbox">
                </label>
                <span>Remember password</span>
                <button type="submit" class="submit-button" name="action" value="login"
                        onclick="login()">Login</button>
            </form>
            <?php
                if ($page == "login") {
                    echo '<div class="error">' . $error . '</div>';
                }
            ?>
            <form id="register" class="credentials" method="POST" autocomplete="off" action="login.php">
                <label>
                    <input type="hidden" name="action" value="register">
                </label>
                <label>
                    <input type="text" name="username" autocomplete="off" class="input-field" placeholder="Please enter your username" required>
                </label>
                <label>
                    <input type="password" name="password" autocomplete="off" class="input-field" placeholder="Please enter your password" required>
                </label>
                <label>
                    <input type="checkbox" class="checkbox">
                </label>
                <span>Receive Shoply recommendations by email</span>
                <button type="submit" class="submit-button" name="action" value="register"
                        onclick="register()">Register</button>
            </form>
            <?php
                if ($page == "register") {
                    echo '<div class="error">' . $error . '</div>';
                }
            ?>
        </div>
        <footer>
            <div class="simple_footer_line"><br></div>
            <div class="copyright-text">&copy; Copyright 2020 shoply.com</div>
        </footer>
    </body>
</html>
