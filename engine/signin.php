<?php

	session_start();

	require_once 'connect.php';

	if (!isset($_POST['login'])) echo "Логин был не введен!";
	if (!isset($_POST['login'])) echo "Пароль был не введен!";

	$login = $_POST['login'];

	$password = $_POST['password'];

	$check_user = mysqli_query($connect, "SELECT * FROM `Workers` WHERE `login` = '$login' AND `password` = '$password'");

	if (mysqli_num_rows($check_user) > 0) {

	$user = mysqli_fetch_assoc($check_user);

	$_SESSION['user'] = [

		"id" => $user['id_worker'],

		"name" => $user['name'],

		"status" => $user['status']

	];

	header('Location: /');

	} else {

		$_SESSION['message'] = 'Не верный логин или пароль';

		header('Location: ../auth.php');

	}

?>

<pre>

<?php

	print_r($check_user);

	print_r($user);

?>

</pre>