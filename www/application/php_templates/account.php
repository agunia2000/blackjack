<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

if (isset($_POST['old_password']) && isset($_POST['new_password']) && isset($_POST['confirm_password'])) {

    $stmt = $dbh->prepare('SELECT * FROM users WHERE login = :login');
    $stmt->execute([':login' => $_SESSION['login']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    $old_password = $_POST['old_password'];
    $new_password = $_POST['new_password'];
    $confirm_password = $_POST['confirm_password'];

    if ($old_password == '' || $new_password == '' || $confirm_password == '') {
        echo '<script type="text/javascript">alert("The fields cannot be empty!");</script>';
    } else {
        if (password_verify($old_password, $user['password']) == false) {
            echo '<script type="text/javascript">alert("Current password does not match!");</script>';
        } elseif (strcmp($new_password, $confirm_password) !== 0) {
            echo '<script type="text/javascript">alert("New passwords differ!");</script>';
        } elseif (strlen($new_password) < 6) {
            echo '<script type="text/javascript">alert("Passwords must be at least 6 characters long!");</script>';
        } else {
            $new_password = password_hash($new_password, PASSWORD_DEFAULT);
            $stmt = $dbh->prepare('UPDATE users SET password = :password WHERE login = :login');
            $stmt->execute([':password' => $new_password, ':login' => $user['login']]);
            echo '<script type="text/javascript">alert("The password has been changed!"); window.location = "/"</script>';
        }
    }
}
echo $twig->render('account.html.twig', ['username' => $_SESSION['login'], 'cash' => $_SESSION['cash']]);