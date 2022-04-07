<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

    $user_achievements = array();
    $other_achievements = array();

    $stmt = $dbh->prepare('SELECT * FROM statistics WHERE username = :username');
    $stmt->execute([':username' => $_SESSION['login']]);
    $statistics = $stmt->fetch(PDO::FETCH_ASSOC);

    $stmt = $dbh->prepare('SELECT * FROM achievements');
    $stmt->execute();

    while ($achievements = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $achievement = array(
            'name' => $achievements['name'],
            'criterion' => $achievements['criterion'],
            'points' => $statistics[$achievements['criterion']],
            'threshold' => $achievements['threshold']
        );

        if($statistics[$achievements['criterion']] >= $achievements['threshold']){
            array_push($user_achievements, $achievement);
        }
        else {
            array_push($other_achievements, $achievement);
        }

    }

echo $twig->render('achievements.html.twig', ['user_achievements' => $user_achievements ,'other_achievements' => $other_achievements, 'username' => $_SESSION['login'], 'cash' => $_SESSION['cash']]);