<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

if (isset($_POST['new_login']) && isset($_POST['new_password']) && isset($_POST['confirm_password'])) {
    $new_login = $_POST['new_login'];
    $new_password = $_POST['new_password'];
    $confirm_password = $_POST['confirm_password'];
    $default_usernames = array();
    array_push($default_usernames, 'Guest-1','Guest-2','Guest-3','Guest-4');
    array_push($default_usernames, 'Easy-Ai-1','Easy-Ai-2','Easy-Ai-3','Easy-Ai-4');
    array_push($default_usernames, 'Medium-Ai-1','Medium-Ai-2','Medium-Ai-3','Medium-Ai-4');
    array_push($default_usernames, 'Hard-Ai-1','Hard-Ai-2','Hard-Ai-3','Hard-Ai-4');
    if ($new_login !== '' && $new_password !== '' && $confirm_password !== '') {
        if (!in_array($new_login, $default_usernames)) {
            if (strlen($new_password) >= 6) {
                if (strcmp($new_password, $confirm_password) == 0) {
                    $new_password = password_hash($new_password, PASSWORD_DEFAULT);
                    try {
                        $stmt = $dbh->prepare('INSERT INTO users (uid, login, password, created) VALUES (null, :login, :password, NOW())');
                        $stmt->execute([':login' => $new_login, ':password' => $new_password]);
                        $stmt2 = $dbh->prepare('INSERT INTO statistics (username) VALUES (:username)');
                        $stmt2->execute([':username' => $new_login]);
                        $_SESSION['login'] = $new_login;
                        header('Location: /');
                    } catch (PDOException $e) {
                        echo '<script type="text/javascript">alert("The same user is already in our database!");</script>';
                    }
                } else echo '<script type="text/javascript">alert("The given passwords differ!");</script>';
            } else echo '<script type="text/javascript">alert("Passwords must be at least 6 characters long!");</script>';
        } else echo '<script type="text/javascript">alert("This username is restricted!");</script>';
    } else echo '<script type="text/javascript">alert("The fields cannot be empty!");</script>';
}
echo $twig->render('register.html.twig');

