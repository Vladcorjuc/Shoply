<!-- inspiration: https://www.youtube.com/watch?v=L5WWrGMsnpw !-->

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="../index/icon.png">
        <link rel="stylesheet" type="text/css" href="login.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="login.js" defer></script>
        <title>Shoply</title>
    </head>
    <body>
        <a href="../index/index.html"><img src="../index/logo.png" alt="Shoply" class="logo"></a>
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
                <button type="submit" class="submit-button" name="action" value="login">Login</button>
            </form>
            <?php if ($page == "login") { ?>
            <div class="error" id="login-error"> <?php echo $error; ?> </div>
            <?php } ?>
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
                <button type="submit" class="submit-button" name="action" value="register">Register</button>
            </form>
            <?php if ($page == "register") { ?>
            <div class="error" id="register-error"> <?php echo $error; ?> </div>
            <?php } ?>
        </div>
        <script>

        </script>
        <?php if ($page == "register") { ?>
        <script>
            const _loginButton = document.getElementById("login-button");
            const _registerButton = document.getElementById("register-button");
            const _loginElement = document.getElementById("login");
            const _registerElement = document.getElementById("register");
            const _buttonElement = document.getElementById("button");
            const _loginError = document.getElementById("login-error");

            _loginButton.style.color = "coral";
            _registerButton.style.color = "white";
            _loginElement.style.left = "-400px";
            _registerElement.style.left = "50px";
            _buttonElement.style.left = "110px";
            if (_loginError !== null) {
                _loginError.style.display = "none;"
            }
        </script>
        <?php } else if ($page == "login") { ?>
        <script>
            const _registerError = document.getElementById("register-error");

            if (_registerError !== null) {
                _registerError.style.display = "none;"
            }
        </script>
        <?php } ?>
        <footer>
            <div class="simple_footer_line"><br></div>
            <div class="copyright-text">&copy; Copyright 2020 shoply.com</div>
        </footer>
    </body>
</html>
