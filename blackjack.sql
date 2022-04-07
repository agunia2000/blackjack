-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 19 Mar 2022, 12:50
-- Wersja serwera: 8.0.27
-- Wersja PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `blackjack`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `achievements`
--

CREATE TABLE `achievements` (
  `name` varchar(255) NOT NULL,
  `criterion` varchar(255) NOT NULL,
  `threshold` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Zrzut danych tabeli `achievements`
--

INSERT INTO `achievements` (`name`, `criterion`, `threshold`) VALUES
('A Stairs to Climb', 'rankingPoints', 10),
('Amateur', 'wins', 10),
('Are you a spider?', 'snakeEyes', 8),
('Audacious', 'drawnCards', 30),
('Challenger Approaches!', 'rankingPoints', 100),
('Crazy Mad!', 'drawnCards', 40),
('Expert', 'wins', 30),
('First Win', 'wins', 1),
('Five Hundred!', 'gamePoints', 500),
('I Can Sleep On It', 'revenue', 500),
('I\'ll Take the Elevator', 'rankingPoints', 50),
('Inner Eye', 'snakeEyes', 3),
('Is it Necessary?', 'revenue', 1000),
('It\'s an Addiction...', 'gamePoints', 1000000),
('Let\'s Buy a Lamborghini!', 'revenue', 10000),
('Nah, it wasn\'t tight', 'blackjacks', 5),
('Newbie', 'wins', 5),
('Not Poor Anymore', 'revenue', 250),
('One Hundred', 'gamePoints', 100),
('Perfection.', 'blackjacks', 10),
('Persian Eye!', 'snakeEyes', 1),
('Pocket Money', 'revenue', 100),
('Professional', 'wins', 20),
('Risky', 'drawnCards', 10),
('That\'s a One Thousand!', 'gamePoints', 1000),
('Tight!', 'blackjacks', 1),
('Two Eyes', 'snakeEyes', 2),
('Two Hundred', 'gamePoints', 200),
('Venturesome', 'drawnCards', 20);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `shop`
--

CREATE TABLE `shop` (
  `sid` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Zrzut danych tabeli `shop`
--

INSERT INTO `shop` (`sid`, `name`, `path`, `price`) VALUES
(1, 'Basic Green', '/application/images/skins/green.png', 20),
(2, 'Basic Red', '/application/images/skins/red.png', 10),
(3, 'Basic Blue', '/application/images/skins/blue.png', 50),
(4, 'Golden', '/application/images/skins/gold.png', 200),
(5, 'Silver', '/application/images/skins/silver.png', 150),
(6, 'Blue with Springs', '/application/images/skins/blue_springs.png', 120),
(7, 'Golden Pixelized', '/application/images/skins/golden_pixelized.png', 300),
(8, 'Golden Spear', '/application/images/skins/golden_spear.png', 350),
(9, 'Hearthstone', '/application/images/skins/hearthstone.png', 230),
(10, 'Magic The Gathering', '/application/images/skins/magic.png', 180),
(11, 'Pink Poker', '/application/images/skins/pink_poker.png', 140),
(12, 'Pokemon', '/application/images/skins/pokemon.jpg', 500);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `skins`
--

CREATE TABLE `skins` (
  `username` varchar(255) NOT NULL,
  `sid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Zrzut danych tabeli `skins`
--

INSERT INTO `skins` (`username`, `sid`) VALUES
('agunia', 1),
('agunia', 10),
('david', 2),
('david', 4),
('david', 8),
('filipek', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `statistics`
--

CREATE TABLE `statistics` (
  `username` varchar(255) NOT NULL,
  `wins` int NOT NULL DEFAULT '0',
  `failures` int NOT NULL DEFAULT '0',
  `drawnCards` int NOT NULL DEFAULT '0',
  `blackjacks` int NOT NULL DEFAULT '0',
  `snakeEyes` int NOT NULL DEFAULT '0',
  `gamePoints` int NOT NULL DEFAULT '0',
  `rankingPoints` int NOT NULL DEFAULT '0',
  `gameTime` int NOT NULL DEFAULT '0',
  `revenue` int NOT NULL DEFAULT '50',
  `money` int NOT NULL DEFAULT '50',
  `currentSkin` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Zrzut danych tabeli `statistics`
--

INSERT INTO `statistics` (`username`, `wins`, `failures`, `drawnCards`, `blackjacks`, `snakeEyes`, `gamePoints`, `rankingPoints`, `gameTime`, `revenue`, `money`, `currentSkin`) VALUES
('agunia', 6, 3, 22, 2, 0, 156, 15, 139, 260, 60, 10),
('david', 20, 15, 69, 2, 0, 517, 31, 378, 760, 200, 4),
('filipek', 1, 0, 2, 0, 0, 13, 2, 9, 55, 5, 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `uid` int NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`uid`, `login`, `password`, `created`) VALUES
(2, 'david', '$2y$10$eJoZULzON7RYC3XvByjGau88SSapFZUR1RtOVmbWLVWr3jgKVZ3Gm', '2022-03-18 22:03:18'),
(6, 'filipek', '$2y$10$3v0vw0qpr4Gc5ZiQxeE5r.pCMdR7N3zjqfZRZhDIy229gARPmurdC', '2022-03-18 22:31:35'),
(7, 'agunia', '$2y$10$UdyKcFTRSMLOxX8Ch2VGie70WxLsIDGXTAmn.umjyMuXvcbmDIv/K', '2022-03-18 22:38:15');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `achievements`
--
ALTER TABLE `achievements`
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`sid`);

--
-- Indeksy dla tabeli `skins`
--
ALTER TABLE `skins`
  ADD UNIQUE KEY `skin` (`username`,`sid`);

--
-- Indeksy dla tabeli `statistics`
--
ALTER TABLE `statistics`
  ADD UNIQUE KEY `username` (`username`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `uid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
