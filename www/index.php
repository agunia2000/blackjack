<?php
	define('ROOT', __dir__);

	define("IN_INDEX", 1);

	ini_set('display_errors', 1);
	error_reporting(E_ALL);

	require ROOT . "\application\\vendor\autoload.php";

	include(ROOT . "\application\config\config.inc.php");

	session_start();

	if (isset($_GET['logout'])) {
		unset($_SESSION['login']);
		header('Location: /');
	}

	$pages_for_logged = ['lobby', 'game', 'profile', 'ranking', 'skins', 'achievements', 'shop', 'account'];
	$pages_for_unlogged = ['main', 'login', 'register'];

	if (isset($_GET['page']) && ((in_array($_GET['page'], $pages_for_logged) && isset($_SESSION['login'])) || (in_array($_GET['page'], $pages_for_unlogged) && !isset($_SESSION['login']))))
	{
		include($php_path . $_GET['page'] . '.php');
	}
	elseif (!isset($_GET['page']) && isset($_SESSION['login']))
	{
		include($php_path . 'profile.php');
	}
	elseif (!isset($_GET['page']) && !isset($_SESSION['login']))
	{
		include($php_path . 'main.php');
	}
	else
	{
		header('Location: /');
	}
?>
