<?php

    $config = [
        'db_host'     => 'localhost',
        'db_name'     => 'blackjack',
        'db_user'     => 'root',
        'db_password' => 'mysql'
    ];

    if (isset($config) && is_array($config)) {
        try {
            $dbh = new PDO('mysql:host=' . $config['db_host'] . ';dbname=' . $config['db_name'] . ';charset=utf8mb4', $config['db_user'], $config['db_password']);
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch (PDOException $e) {
            print "Nie mozna polaczyc sie z baza danych: " . $e->getMessage();
            exit();
        }
    }
    else {
        exit("Nie znaleziono konfiguracji bazy danych.");
    }