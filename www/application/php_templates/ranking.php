<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

    $best_users = array();
    $hostname = $_SESSION['login'];

    $stmt = $dbh->prepare('SELECT * FROM statistics ORDER BY rankingPoints DESC LIMIT 10');
    $stmt->execute();

    while ($stats = $stmt->fetch(PDO::FETCH_ASSOC)){
        $username = $stats['username'];
        $wins = $stats['wins'];
        $failures = $stats['failures'];
        $games = $wins + $failures;
        if ($games > 0) $efficiency = round($wins / $games * 100) . '%';
        else $efficiency = '0%';
        $drawnCards = $stats['drawnCards'];
        $blackjacks = $stats['blackjacks'];
        $snakeEyes = $stats['snakeEyes'];
        $gamePoints = $stats['gamePoints'];
        $rankingPoints = $stats['rankingPoints'];
        $gameTime = $stats['gameTime'];
        $revenue = $stats['revenue'];

        $user = array(
            'username'=> $username,
            'wins' => $wins,
            'failures' => $failures,
            'games' => $games,
            'efficiency' => $efficiency,
            'drawnCards' => $drawnCards,
            'blackjacks' => $blackjacks,
            'snakeEyes' => $snakeEyes,
            'gamePoints' => $gamePoints,
            'rankingPoints' => $rankingPoints,
            'gameTime' => $gameTime,
            'revenue' => $revenue
        );
        array_push($best_users, $user);
    }


echo $twig->render('ranking.html.twig', ['best_users' => $best_users, 'username' => $_SESSION['login'], 'cash' => $_SESSION['cash']]);