<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

if (isset($_POST['login']) && isset($_POST['password'])) {
    $login = $_POST['login'];
    $password = $_POST['password'];
    if($login !== '' && $password !== '') {
        $stmt = $dbh->prepare("SELECT login, password FROM users WHERE login = :login");
        $stmt->execute([':login' => $login]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user) {
            if (password_verify($password, $user['password'])) {
                $_SESSION['login'] = $login;
                header('Location: /');
            } else echo '<script type="text/javascript">alert("The given password is incorrect!");</script>';
        } else echo '<script type="text/javascript">alert("There is no such user!");</script>';
    } else echo '<script type="text/javascript">alert("The fields cannot be empty!");</script>';
}

echo $twig->render('login.html.twig');