<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

if(isset($_POST['player1Type'])){
    if(isset($_POST['player1BetValue']))
        if($_POST['player1BetValue'] > $_SESSION['cash']) echo '<script type="text/javascript">alert("Host does not have money enough!"); window.location = "/lobby"</script>';
    if(isset($_POST['player1Bet']))
        if (($_POST['player1Bet'] == 3 && $_POST['player3Type'] == 9999) || ($_POST['player1Bet'] == 4 && $_POST['player4Type'] == 9999) )
            echo '<script type="text/javascript">alert("You cannot bet on player which is not taking part in the game!"); window.location = "/lobby"</script>';
    for($i = 1; $i <= 4; $i++) {
        $username = $_POST['player'.$i.'Name'];
        if ($_POST['player'.$i.'Type'] == 10) {
            if ($username == '') echo '<script type="text/javascript">alert("Username cannot be empty!"); window.location = "/lobby"</script>';
            if ($username == $_SESSION['login']) echo '<script type="text/javascript">alert("Username cannot be the same as hostname!"); window.location = "/lobby"</script>';
            $counter = 0;
            for($j = 1; $j <= 4; $j++) if ($username == $_POST['player'.$j.'Name']) $counter++;
            if ($counter > 1) echo '<script type="text/javascript">alert("Usernames has to be unique!"); window.location = "/lobby"</script>';
            $stmt = $dbh->prepare('SELECT * FROM statistics WHERE username = :username');
            $stmt->execute([':username' => $username]);
            if ($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if(isset($_POST['player'.$i.'BetValue']))
                    if($_POST['player'.$i.'BetValue'] > $user['money']) echo '<script type="text/javascript">alert("Some user or users do not have money enough!"); window.location = "/lobby"</script>';
            } else echo '<script type="text/javascript">alert("Username is not in our database!"); window.location = "/lobby"</script>';
            if (($_POST['player'.$i.'Bet'] == 3 && $_POST['player3Type'] == 9999) || ($_POST['player'.$i.'Bet'] == 4 && $_POST['player4Type'] == 9999) ) {
                echo '<script type="text/javascript">alert("You cannot bet on player which is not taking part in the game!"); window.location = "/lobby"</script>';
            }
        }
    }
    $skins_info = array();
    for($i = 1; $i <= 4; $i++) {
        switch ($_POST['player'.$i.'Type']) {
            case 10:
            case 100:
                $stmt = $dbh->prepare('SELECT * FROM statistics JOIN shop ON currentSkin = sid WHERE username = :username');
                $stmt->execute([':username' => $_POST['player'.$i.'Name']]);
                if ($skin = $stmt->fetch(PDO::FETCH_ASSOC)) $path = $skin['path'];
                else $path = '/application/images/skins/no-skin.png';
                array_push($skins_info, $path);
                break;

            case 0:
                $path = '/application/images/skins/guest.png';
                array_push($skins_info, $path);
                break;

            case 1:
            case 2:
            case 3:
                $path = '/application/images/skins/AI.png';
                array_push($skins_info, $path);
                break;

            default:
                $path = '/application/images/skins/no-skin.png';
                array_push($skins_info, $path);
                break;
        }
    }
    file_put_contents('application/json/json_skins.php', json_encode($skins_info));
} else echo '<script type="text/javascript">alert("You may go to game only by lobby!"); window.location = "/"</script>';

echo $twig->render('game.html.twig');