<?php

    mb_internal_encoding ("utf-8");
    require_once 'connect.php';
    $connect->set_charset('utf8');
    header("Content-Type: application/json");
    $postData = file_get_contents("php://input");
    $dataPost = json_decode($postData);
    session_start();
    $json;

    function CheckTest($connect, $id, $data)
    {
        $query = "SELECT `answer` FROM `DataTests` WHERE `id_test` = '$id' ORDER BY `id_question`";
        $result = mysqli_query($connect, $query);
        $answer = mysqli_num_rows($result);
        $point = 0;
        $num = 0;
        $rows = array();
        while ($row = mysqli_fetch_array($result))
        {
            if ($row[0] == $data[0][$num]) {
                $point++;
            }
            $num++;
        }
        $query = "UPDATE `TestComp` SET `result` = '". ($point * 100) / $answer . "', `accepted` = 1 WHERE `id_test` = '$id' AND `id_worker` = '" . $_SESSION['user']['id'] . "'";
        $result = mysqli_query($connect, $query);
        array_push($rows, $answer);
        array_push($rows, $point);
        return $rows;
    }

    function Tests($connect)
    {
        $query = "SELECT `id_test` FROM `TestComp` WHERE `accepted` = 0";
        $result = mysqli_query($connect, $query);
        $data = array();
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_array($result))
            {
                $query = "SELECT * FROM `Tests` WHERE `id_test` = '$row[0]'";
                $result2 = mysqli_query($connect, $query);
                while ($grow = mysqli_fetch_array($result2))
                {
                    array_push($data, $grow);
                }
            }
            return $data;
        } 
        return null;
    }

    function GetTest($connect, $id, $startTime, $startDate)
    {
        $query = "SELECT `id_question`, `question` FROM `DataTests` WHERE `id_test` = '$id' ORDER BY `id_question`";
        $result = mysqli_query($connect, $query);
        $data = array();
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_array($result))
            {
                array_push($data, $row);
            }
            $query = "SELECT * FROM `TestComp` WHERE `id_test` = '$id' AND `id_worker` = '" . $_SESSION['user']['id'] . "'" . " AND `time_start` != 'NULL' AND `date_start` != 'NULL'";
            $result = mysqli_query($connect, $query);
            if (mysqli_num_rows($result) > 0) {
                $query = "SELECT `id_test`, (SELECT `time` FROM Tests WHERE `id_test` = '$id') as `time`, `time_start` FROM `TestComp` WHERE `id_test` = '$id' AND `id_worker` = '" . $_SESSION['user']['id'] . "'";
                $result = mysqli_query($connect, $query);
            } else {
                $query = "UPDATE `TestComp` SET `time_start` = '$startTime', `date_start` = '$startDate' WHERE `id_test` = '$id' AND `id_worker` = " . "'" . $_SESSION['user']['id'] . "';";
                $result = mysqli_query($connect, $query);
                $query = "SELECT `id_test`, `time` FROM `Tests` WHERE `id_test` = '$id'";
                $result = mysqli_query($connect, $query);
            }
            while ($row = mysqli_fetch_array($result))
            {
                array_push($data, $row);
            }
            return $data;
        }
        return null;
    }

    function ShowAcceptedTests($connect)
    {
        $query = "SELECT `TestComp`.`id_test`, `Tests`.`name_test`, `result`, `time_start`, `date_start` FROM `TestComp` INNER JOIN `Tests` ON `Tests`.`id_test` = `TestComp`.`id_test` WHERE `accepted` = 1";
        $result = mysqli_query($connect, $query);
        $data = array();
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_array($result))
            {
                array_push($data, $row);
            }
            return $data;
        } 
        return null;
    }

    if (isset($dataPost->status)) {
        $status = htmlentities(mysqli_real_escape_string($connect, $dataPost->status));
        switch ($status)
        {
            case 'tests':
                $json = Tests($connect);
                break;
            case 'acTests':
                $json = ShowAcceptedTests($connect);
                break;
            case 'getTest':
                $json = GetTest($connect, $dataPost->testId, $dataPost->timeStart, $dataPost->dateStart);
                break;
            case 'check':
                $json = CheckTest($connect, $dataPost->testId, $dataPost->data);
                break;
        }
    }
    echo json_encode($json, JSON_UNESCAPED_UNICODE);
    mysqli_close($connect);
?>