<?php

    session_start();

    if (!$_SESSION['user']) {

        header('Location: auth.php');

    }

?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Личный кабинет сотрудника</title>
    <link rel="stylesheet" href="style/bootstrap.css">
    <link rel="stylesheet" href="style/style.css">
    <script src="scripts/index.js"></script>
    <script src="scripts/ajax.js"></script>
</head>
<body>
    <div class="container">
    Добро пожаловать, <?= $_SESSION['user']['name'] ?>&nbsp;
    <a class="btn btn-outline-dark" href="engine/logout.php" class="logout">Выход</a>
    <br>
    Вы, <?php 
            ($_SESSION['user']['status'] != 'admin') ? print($_SESSION['user']['status']) : print('администратор. У Вас есть необходимые привилегия.')  ?>&nbsp;
    <header>
        <nav class="navbar navbar-light navbar-expand-lg navbar-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto" id="list">
                    <li class="nav-item active table-link btn btn-outline-dark table-link" id="tests">Тесты</li>
                    <li class="nav-item table-link btn btn-outline-dark table-link" id="acTests">Пройденные тесты</li>
                </ul>
            </div>
        </nav>
    </header>   
    <main>
        <div class="row"></div>
    </main>
    </div>
    
</body>
</html>