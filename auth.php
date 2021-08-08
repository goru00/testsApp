<?php

    session_start();

    if (isset($_SESSION['user'])) {

        header('Location: /');

    }

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Авторизация работника</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/bootstrap.css">
</head>
<body>
<div class="AuthMain">
    <form action="engine/signin.php" method="post" class="LoginForm">
            <?php
                if (isset($_SESSION['message'])) {
                echo '<div class="alert alert-light"> ' . $_SESSION['message'] . ' </div>';
                }
                unset($_SESSION['message']);
            ?>
        <p>Логин</p>
        <input type="text" name="login" placeholder="Введите свой логин" class="inputLoginForm" require>
        <p>Пароль</p>
        <input type="password" name="password" placeholder="Введите пароль" class="inputLoginForm" require>
        <button type="submit" class="btn btn-outline-dark">Войти</button>
    </form>
</div>
</body>
</html>