<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

    $username = $_SESSION['login'];

    if(isset($_POST['current_sid'])){
        $current_sid = $_POST['current_sid'];
        $stmt = $dbh->prepare('UPDATE statistics SET currentSkin = :current_sid WHERE username = :username');
        $stmt->execute(['current_sid' => $current_sid, ':username' => $username]);
    }

    $stmt = $dbh->prepare('SELECT * FROM shop JOIN skins USING (sid) WHERE username = :username ORDER BY price DESC');
    $stmt->execute([':username' => $username]);

    $stmt2 = $dbh->prepare('SELECT currentSkin FROM statistics WHERE username = :username');
    $stmt2->execute([':username' => $username]);
    $current_skin = $stmt2->fetch(PDO::FETCH_ASSOC);

    $user_skins = array();

    while ($skin = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $sid = $skin['sid'];
        $path = $skin['path'];
        if ($sid == $current_skin['currentSkin']) $is_current = true;
        else $is_current = false;

        $new_skin = array(
            'sid' => $sid,
            'path' => $path,
            'is_current' => $is_current
        );
        array_push($user_skins, $new_skin);
    }

echo $twig->render('skins.html.twig',  ['user_skins' => $user_skins, 'username' => $_SESSION['login'], 'cash' => $_SESSION['cash']]);
