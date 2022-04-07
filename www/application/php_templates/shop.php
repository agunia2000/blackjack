<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

    $shop_skins = array();

    $stmt = $dbh->prepare('SELECT * FROM shop WHERE sid NOT IN (SELECT sid FROM skins WHERE username = :username) ORDER BY price');
    $stmt->execute([':username' => $_SESSION['login']]);

    while ($skin = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $sid = $skin['sid'];
        $path = $skin['path'];
        $price = $skin['price'];

        $new_skin = array(
            'sid' => $sid,
            'path' => $path,
            'price' => $price
        );

        array_push($shop_skins, $new_skin);
    }

    if(isset($_POST['buy'])){
        $stmt = $dbh->prepare('SELECT * FROM statistics WHERE username = :username');
        $stmt->execute([':username' => $_SESSION['login']]);
        $statistic = $stmt->fetch(PDO::FETCH_ASSOC);

        $stmt = $dbh->prepare('SELECT * FROM shop WHERE sid = :sid');
        $stmt->execute([':sid' => $_POST['buy']]);
        $skin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($statistic && $skin) {
            if($statistic['money'] >= $skin['price']){
                try {
                    $stmt = $dbh->prepare('INSERT INTO skins (username, sid) VALUES (:username, :sid)');
                    $stmt->execute([':username' => $statistic['username'], ':sid' => $skin['sid']]);
                    $stmt = $dbh->prepare('UPDATE statistics SET money = money - :price WHERE username = :username');
                    $stmt->execute([':price' => $skin['price'], ':username' => $statistic['username']]);
                    $_SESSION['cash'] = $_SESSION['cash'] - $skin['price'];
                    header('Location: /skins');
                } catch (PDOException $e) {}
            } else echo '<script type="text/javascript">alert("You did not have money enough to buy this skin!"); window.location = "/shop"</script>';

    }
    }

echo $twig->render('shop.html.twig', ['shop_skins' => $shop_skins, 'username' => $_SESSION['login'], 'cash' => $_SESSION['cash']]);