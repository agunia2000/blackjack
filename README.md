# Blackjack
The web game was typed in HTML/Twig, JavaScript and PHP.
This application was made in collaboration with Kacper Zemła and Maksymilian Dziadoń (Kacper - front-end, Maksymilian - game logic/AI, I (Amadeusz) - back-end and database).
The project was done as part of the coursework for module Inżynieria oprogramowania (eng. Software engineering) during the 5th term of ICT studies (AGH, Kraków, Poland).

## Overview
This is a web view of a card game called Blackjack. It is possible to play with bots (AI) and with other players (hot-seat).
The description below presents the features of the application.

#### Registration, login and my account
![register-and-login](./gitresources/register-and-login.gif) 

The **main page** features symbol of the game, the **Log in button** and the **Register button**. 
Registration is required to play the game.
If you are logged in, you can change the password on the **Account tab**.

#### Skins and shop
![skins-and-shop](./gitresources/skins-and-shop.gif)

The application enables buying and setting skins, which are visible during the game.
If you have enough money, you can purchase a new skin on the **Shop tab**.
After buying, you are moved to the **Skins tab** automatically, where you can choose your current skin by clicking on it.

#### Lobby and game
![lobby-and-game](./gitresources/lobby-and-game.gif)

In order to play, you can click on the **Start game button** located in the centre of the screen.
Next, you will be moved to the **Lobby tab**, where you can set number and types of players.
You can choose from the following types of players: you (as **Host**), other registered user (as **User**), unregistered user (as **Guest**) and bots in three difficulty levels (as **Easy**, **Medium** and **Hard Ai**).
Names **User** and **Guest** have to be typed manually by you.
You can play in any combinations, from 2 to 4 players.
Additionally, registered users (**Host** and **User**) can bet on who will be the winner.
Before starting the game, you have to choose a number of decks of cards (**1**, **2**, **3** or **unlimited decks**).
After setting all parameters, you can click on the **Start game button**.
Rules of the game can be found on [Wikipedia](https://en.wikipedia.org/wiki/Blackjack).
To put it simply: the goal of the Blackjack is to get as close to 21 points as possible without going over 21.
In order to draw a card, you have to click on the **Take new card button**.
You can also skip your move and finish the game by clicking on the **Pass button**.
When you finish the game, the scoreboard (announcing winners and losers) will be displayed on the screen.

#### Statistics and achievements
![stats-and-achievements](./gitresources/stats-and-achievements.gif)

On **Statistics tab** you can see the ranking with detailed statistics of the games and other parameters.
Database saves and stores registered players' statistics only.
The **Achievements tab** contains long list of achievements including various criteria and thresholds.

## How to launch app
* Download repository
* Install [AMPPS](https://ampps.com/downloads/) (or other package containing Apache module and MySQL database)
* Launch database interface phpMyAdmin and sign in
	- login: root
	- password: mysql
* Create a new database named **blackjack** and import database dump which is available in this repository
* Make AMPPS www catalog empty and then copy there the content of www catalog from this repository
* Go to the web page by typing in a browser: localhost, 127.0.0.1 or your PC's IP address 
