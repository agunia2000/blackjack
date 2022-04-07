let skins = [];

$.ajax({
    url: "http://localhost/application/json/json_skins.php",
    type: "GET",
    dataType: "json",
    async: false,
    success: function (data) {
        skins = [...data]
    },
    error: function () {
        alert("Your error");
    },
});

const player1Type = parseInt(sessionStorage.getItem("player1Type"));
const player1Name = sessionStorage.getItem("player1Name")
const player1Bet = parseInt(sessionStorage.getItem("player1Bet"));
const player1BetValue = parseInt(sessionStorage.getItem("player1BetValue"));

const player2Type = parseInt(sessionStorage.getItem("player2Type"));
const player2Name = sessionStorage.getItem("player2Name");
const player2Bet = parseInt(sessionStorage.getItem("player2Bet"));
const player2BetValue = parseInt(sessionStorage.getItem("player2BetValue"));

const player3Type = parseInt(sessionStorage.getItem("player3Type"));
const player3Name = sessionStorage.getItem("player3Name");
const player3Bet = parseInt(sessionStorage.getItem("player3Bet"));
const player3BetValue = parseInt(sessionStorage.getItem("player3BetValue"));

const player4Type = parseInt(sessionStorage.getItem("player4Type"));
const player4Name = sessionStorage.getItem("player4Name");
const player4Bet = parseInt(sessionStorage.getItem("player4Bet"));
const player4BetValue = parseInt(sessionStorage.getItem("player4BetValue"));

const numberOfDecks = parseInt(sessionStorage.getItem("numberOfDecks"));

let moveLabel = document.querySelector('#move');
let playersView = document.querySelector('#players');
let actualPlayerCard;
const board = document.querySelector('#game');
let gameOver = false;

const NO_BET = 0;

const HOST = 100;
const USER = 10;
const GUEST = 0;
const AI_EASY = 1;
const AI_MEDIUM = 2;
const AI_HARD = 3;

const ACE = 1;
const JACK = 11;
const QUEEN = 12;
const KING = 13;

const HEART = "heart";
const DIAMOND = "diamond";
const SPADE = "spade";
const CLUB = "club";

class Player {
    constructor(username, playerType, playerBet, playerBetValue, skin, playerNumber) {
        this.username = username;
        this.currentPoints = 0;
        this.pass = false;
        this.chosenSkin = '';
        this.turn = false;
        this.drawnCards = 0;
        this.playerType = playerType;
        this.snakeEyes = false;
        this.isWinner = false;
        this.isLogged = true;
        this.skin = skin;
        this.playerBet = playerBet;
        this.playerBetValue = playerBetValue;
        this.playerNumber = playerNumber;
    }

    AddToWinnerList() {
        this.isWinner = true;
        winners.push(this.username);
    }

    CalculatePlayerBet() {
        let thisPlayer = this;
        let earnedCash = 0;
        if (this.playerBet !== NO_BET) {
            listOfPlayers.forEach(function (player) {
                console.log(player)
                if (thisPlayer.playerBet === player.playerNumber) {
                    earnedCash =  player.isWinner ? thisPlayer.playerBetValue : -thisPlayer.playerBetValue;
                    return;
                }
            });
        }
        return earnedCash;
    }
}


class Deck {
    constructor(deckType) {
        this.deck = []
        this.deckType = deckType;
        this.CreateDeck();
    }

    CreateDeck() {
        const values = [ACE, 2, 3, 4, 5, 6, 7, 8, 9, 10, JACK, QUEEN, KING];
        const symbols = [HEART, DIAMOND, CLUB, SPADE];
        this.deck = []

        let numberOfDecks = this.deckType === 0 ? 1 : this.deckType;

        for (let deckNumber = 0; deckNumber < numberOfDecks; deckNumber++) {
            for (let symbolIndex = 0; symbolIndex < symbols.length; symbolIndex++) {
                for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
                    this.deck.push(new Card(values[valueIndex], symbols[symbolIndex]));
                }
            }
        }
    }
}

class Card {
    constructor(value, symbol) {
        this.value = value;
        this.symbol = symbol;
    }

    GetImageSymbolPath() {
        return "/application/images/game/" + this.symbol + ".png";
    }

    GetCharacterSymbol() {
        if (this.value === ACE) {
            return 'A';
        }
        else if (this.value === JACK) {
            return 'J';
        }
        else if (this.value === QUEEN) {
            return 'Q';
        }
        else if (this.value === KING) {
            return 'K';
        }
        else {
            return this.value;
        }
    }
}

function StartGame() {
    StartTimer();
    let currentPlayer = playersInGame[0];
    currentPlayer.turn = true;
    RenderPlayers();
    RenderBoard();
    moveLabel.innerHTML = 'Player move: ' + listOfPlayers[0].username;

    newCardButton.addEventListener("click", function () {
        OnNewCardButton();
    })

    passButton.addEventListener("click", function () {
        OnPassButton();
    })

    TryPlayAiTurn(currentPlayer);
}

function StartTimer() {
    gameStartTime = new Date().getTime();
}

function EndTimer() {
    gameEndTime = new Date().getTime();
}

function DisableButtons() {
    newCardButton.disabled = true;
    passButton.disabled = true;
}

function EnableButtons() {
    newCardButton.disabled = false;
    passButton.disabled = false;
}

function WaitForNewTurn() {
    DisableButtons();
    setTimeout(StartNewTurn, 1000);
}

function OnNewCardButton() {
    if (playersInGame.length !== 0) {
        currentPlayer = GetCurrentPlayer();
        PutCard(currentPlayer, DrawCard());
        WaitForNewTurn();
    }
}

function OnPassButton() {
    if (playersInGame.length !== 0) {
        currentPlayer = GetCurrentPlayer();
        Pass(currentPlayer);
        WaitForNewTurn();
    }
}

function TryPlayAiTurn(player) {
    if (player.playerType === USER || player.playerType === GUEST || player.playerType === HOST) {
        return;
    }

    switch (player.playerType) {
        case AI_EASY:
            EasyAiTurn(player);
            break;

        case AI_MEDIUM:
            MediumAiTurn(player);
            break;

        case AI_HARD:
            HardAiTurn(player);
    }

    WaitForNewTurn();
}

function EasyAiTurn(player) {
    PutCard(player, DrawCard());
}

function MediumAiTurn(player) {
    if (player.currentPoints < 14) {
        PutCard(player, DrawCard());
    }
    else {
        if (FiftyChance()) {
            PutCard(player, DrawCard());
        }
        else {
            Pass(player);
        }
    }
}

function HardAiTurn(player) {
    let card = DrawCard();
    if (CalculateCardPoints(player, card) + player.currentPoints <= 21) {
        PutCard(player, card);
    }
    else {
        Pass(player);
    }
}

function StartNewTurn() {
    EnableButtons();
    let nextPlayer = ChangePlayer();
    RemoveIfPlayerPassed();
    CheckIsGameOver();
    RenderPlayers();
    if (gameOver !== true) {
        TryPlayAiTurn(nextPlayer);
    }
}

function FiftyChance() {
    if (Math.random() > 0.5) {
        return true;
    }

    return false;
}

function RenderPlayers() {
    playersView.innerHTML = '';
    for (let i = 0; i < listOfPlayers.length; i++) {

        playersView.innerHTML +=
            `<div class="players__card" data-playerName=${listOfPlayers[i].username}>
            <div class="image"><img src="${listOfPlayers[i].skin}"></div>
            <p class="players__name">${listOfPlayers[i].username}</p>
            <p class="players__points">${listOfPlayers[i].currentPoints}</p>
        </div>`

        //<p class="players__points">Pass: ${listOfPlayers[i].pass}</p>
        //<p class="players__points">Turn: ${listOfPlayers[i].turn}</p> 

        if (listOfPlayers[i].turn === true) {
            actualPlayerCard = document.querySelector(`[data-playerName="${listOfPlayers[i].username}"]`);
            actualPlayerCard.style.boxShadow = "0px 0px 40px 5px var(--orange)";
        }
        if (listOfPlayers[i].pass === true) {
            actualPlayerCard = document.querySelector(`[data-playerName="${listOfPlayers[i].username}"]`);
            actualPlayerCard.style.opacity = "30%";
        }
    }
}

function RenderBoard() {
    for (let i = 0; i < listOfPlayers.length; i++) {
        board.innerHTML +=
            `
        <div class="card" data-player="${listOfPlayers[i].username}">
            <p class='card_pointsL'>
            </p>
            <img src="/application/images/game/default.png" alt="" height="80px" width="80px" >
            <p class='card_pointsR'>
            </p>
        </div>
        `;
    }
}

function GetCurrentPlayer() {
    for (let i = 0; i < playersInGame.length; i++) {
        if (playersInGame[i].turn === true) {
            return playersInGame[i];
        }
    }
}

function RemoveIfPlayerPassed() {
    for (let i = 0; i < playersInGame.length; i++) {
        if (playersInGame[i].pass === true) {
            playersInGame.splice(i, 1);
        }
    }
}

function ChangePlayer() {
    for (let i = 0; i < playersInGame.length; i++) {
        if (playersInGame.length == 1) {

            return playersInGame[i];
        }
        if (playersInGame[i].turn === true) {
            newPlayer = playersInGame[(i + 1) % playersInGame.length];
            newPlayer.turn = true;
            playersInGame[i].turn = false;
            moveLabel.innerHTML = 'Player move: ' + newPlayer.username;

            return newPlayer;
        }
    }
}

function CheckPlayer(player) {
    if (player.currentPoints >= 21) {
        Pass(player);
    }
}

function DrawCard() {
    let card = deck.deck[Math.floor(Math.random() * deck.deck.length)];
    return card;
}

function CalculateCardPoints(player, card) {
    if (card.value === ACE && player.drawnCards == 2 && player.currentPoints == 11) {
        player.snakeEyes = true;
        return 11;
    }
    else if (card.value === ACE && player.currentPoints <= 10) {
        return 11;
    }
    else if (card.value >= 11) {
        return 10;
    }
    else {
        return card.value;
    }
}

function PutCard(player, card) {
    let cardPlace = document.querySelectorAll(`[data-player="${player.username}"] p`);

    let cardImage = document.querySelector(`[data-player="${player.username}"] img`);
    cardImage.src = card.GetImageSymbolPath();
    player.drawnCards += 1;
    player.currentPoints += CalculateCardPoints(player, card);
    cardPlace[0].innerHTML = card.GetCharacterSymbol();
    cardPlace[1].innerHTML = card.GetCharacterSymbol();
    TryRemoveCardFromDeck(card);

    if (player.currentPoints >= 21) {
        Pass(player);
    }
}

function TryRemoveCardFromDeck(card) {
    if (deck.deckType !== 0) {
        let cardIndex = deck.deck.indexOf(card);
        deck.deck.splice(cardIndex, 1);
    }
}

function Pass(player) {
    player.pass = true;
}

function CreateEndingScreen() {
    let endScreen = document.querySelector('#endview');
    endScreen.style.display = 'flex';
    let winnersParagraph = document.querySelector('#winners');
    let losersParagraph = document.querySelector('#losers');
    winnersParagraph.innerHTML += winners;
    losersParagraph.innerHTML += losers;
}

function GameOver() {
    gameOver = true;
    EndTimer();
    DisableButtons();
    CheckWinners();
    CreateCookie();
    CreateEndingScreen();
    setTimeout(() => {
        window.location.href='profile';
    }, 4000);
}

function GetGameTimeInSeconds() {
    return Math.floor(((gameEndTime - gameStartTime) % (1000 * 60)) / 1000);
}

function CreateCookie() {
    var cookie = "gameData=";

    var date = new Date();
    date.setTime(date.getTime() + (30 * 60 * 1000)); // 30 minutes till expire
    expires = "; expires=" + date.toGMTString();

    listOfPlayers.forEach(function (player) {
        if (player.isLogged) {
            cookie += "&" + player.username + "," + player.isWinner + "," + player.snakeEyes + "," + player.currentPoints
                + "," + player.drawnCards + "," + player.CalculatePlayerBet() + "," + GetGameTimeInSeconds();
        }
    });

    cookie += expires + "; path=/";
    document.cookie = cookie;
}

function CheckIsGameOver() {
    if (playersInGame.length === 0) {
        GameOver();
    }
}

function TryFindSnakeEyesWinners() {
    listOfPlayers.forEach(player => {
        if (player.snakeEyes === true) {
            player.AddToWinnerList();
        }
    })
}

function FindNearestWinners() {
    if (winners.length === 0) {
        let currentMaxPoints = Number.NEGATIVE_INFINITY;

        listOfPlayers.forEach(player => {
            if (player.currentPoints > currentMaxPoints && player.currentPoints <= 21) {
                winners = [];
                currentMaxPoints = player.currentPoints;
            }
        })
        listOfPlayers.forEach(player => {
            if(player.currentPoints === currentMaxPoints){
                player.AddToWinnerList();
            }
        })
    }
}

function CreateListOfLosers() {
    losers = listOfPlayers.filter(function (player) {
        if (!winners.includes(player.username)) {
            return player;
        }
    });

    losers = losers.map(player => player.username);
}

function CheckWinners() {
    TryFindSnakeEyesWinners();
    FindNearestWinners();
    CreateListOfLosers();
}

function TryCreatePlayer(playerName, playerType, playerBet, playerBetValue, playerSkin, playerNumber) {
    if (playerName !== "") {
        let player = new Player(playerName, playerType, playerBet, playerBetValue, playerSkin, playerNumber);
        listOfPlayers.push(player);
    }
}

function CreatePlayers() {
    let playerNumber = 1;
    TryCreatePlayer(player1Name, player1Type, player1Bet, player1BetValue, skins[0], playerNumber++);
    TryCreatePlayer(player2Name, player2Type, player2Bet, player2BetValue, skins[1], playerNumber++);
    TryCreatePlayer(player3Name, player3Type, player3Bet, player3BetValue, skins[2], playerNumber++);
    TryCreatePlayer(player4Name, player4Type, player4Bet, player4BetValue, skins[3], playerNumber++);
}


let newCardButton = document.querySelector('#newCard');
let passButton = document.querySelector('#Pass');

let listOfPlayers = [];
CreatePlayers();
let playersInGame = [...listOfPlayers];
let winners = [];
let losers = [];

let deck = new Deck(numberOfDecks);

let gameStartTime = 0;
let gameEndTime = 0;

StartGame();