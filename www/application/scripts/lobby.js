function handleSubmit() {
    sessionStorage.setItem("player1Name", player1Name.value);
    sessionStorage.setItem("player2Name", player2Name.value);
    sessionStorage.setItem("player3Name", player3Name.value);
    sessionStorage.setItem("player4Name", player4Name.value);
    sessionStorage.setItem("player1Type", player1Type.value);
    sessionStorage.setItem("player2Type", player2Type.value);
    sessionStorage.setItem("player3Type", player3Type.value);
    sessionStorage.setItem("player4Type", player4Type.value);
    sessionStorage.setItem("player1Bet", player1Bet.value);
    sessionStorage.setItem("player2Bet", player2Bet.value);
    sessionStorage.setItem("player3Bet", player3Bet.value);
    sessionStorage.setItem("player4Bet", player4Bet.value);
    sessionStorage.setItem("player1BetValue", player1BetValue.value);
    sessionStorage.setItem("player2BetValue", player2BetValue.value);
    sessionStorage.setItem("player3BetValue", player3BetValue.value);
    sessionStorage.setItem("player4BetValue", player4BetValue.value);

    sessionStorage.setItem("numberOfDecks", numberOfDecks.value);

    return;
}



const player1Type = document.querySelector("#player1Type");
const player1Name = document.querySelector("#player1Name");
const player1Bet = document.querySelector("#player1Bet");
const player1BetValue = document.querySelector("#player1BetValue");
sessionStorage.setItem('hostName', player1Name.value);

const player2Type = document.querySelector("#player2Type");
const player2Name = document.querySelector("#player2Name");
const player2Bet = document.querySelector("#player2Bet");
const player2BetValue = document.querySelector("#player2BetValue");

const player3Type = document.querySelector("#player3Type");
const player3Name = document.querySelector("#player3Name");
const player3Bet = document.querySelector("#player3Bet");
const player3BetValue = document.querySelector("#player3BetValue");

const player4Type = document.querySelector("#player4Type");
const player4Name = document.querySelector("#player4Name");
const player4Bet = document.querySelector("#player4Bet");
const player4BetValue = document.querySelector("#player4BetValue");

const numberOfDecks = document.querySelector("#numberOfDecks")

if(player3Type.options[player3Type.selectedIndex].text === ''){
    player3Name.readOnly = true;
}

if(player4Type.options[player4Type.selectedIndex].text === ''){
    player4Name.readOnly = true;
}

function setName(select, input, i) {
    console.log(select)
    if(select.value === "100"){
        
        input.readOnly = true;
    }
    select.addEventListener("change", function (e) {
        if (e.target.value === '1') {
            input.value = `Easy-Ai-${i}`;
            input.readOnly = true;
        } else if (e.target.value === '2') {
            input.value = `Medium-Ai-${i}`;
            input.readOnly = true;
        } else if (e.target.value === '3') {
            input.value = `Hard-Ai-${i}`;
            input.readOnly = true;
        } else if (e.target.options[e.target.selectedIndex].text === 'Guest') {
            input.value = `Guest-${i}`;
            input.readOnly = true;
        } else if (e.target.options[e.target.selectedIndex].text === '') {
            input.readOnly = true;
            input.value = '';
        }else if (e.target.options[e.target.selectedIndex].text === 'Host') {
            input.readOnly = true;
            input.value = sessionStorage.getItem("hostName");
        }else {
            input.value = '';
            input.readOnly = false;
        }
    })
}

function checkBet(playerType, playerBet, playerBetValue){
    if(playerType.value === "9999"){
        playerBet.setAttribute("disabled", true);
        playerBetValue.setAttribute("disabled", true);
    }
    playerType.addEventListener("change", function(e){


        if(playerType.value === '0' || playerType.value === '1' || playerType.value === '2' || playerType.value === '3' || playerType.value === '9999' ){
            playerBet.setAttribute("disabled", true);
            playerBetValue.setAttribute("disabled", true);
            playerBetValue.value = "";
            playerBet.value = "0";
        } else{
            playerBet.removeAttribute("disabled");
            if(playerBet.value !== "0"){
                playerBetValue.removeAttribute("disabled");
                
                
            }
        }
    })

}

function checkIfBet(playerBet, playerBetValue){
    if(playerBet.value === "0"){
        playerBetValue.setAttribute('disabled', true);
    }

    playerBet.addEventListener("change", function(e){
        if(e.target.value === "0"){
            playerBetValue.setAttribute('disabled', true);
            playerBetValue.value = "";
        } else{
            playerBetValue.removeAttribute('disabled');
            // playerBetValue.value ="0"; 
            
        }
    })
}

setName(player1Type, player1Name, 1);
setName(player2Type, player2Name, 2);
setName(player3Type, player3Name, 3);
setName(player4Type, player4Name, 4);

checkBet(player1Type, player1Bet , player1BetValue);
checkBet(player2Type, player2Bet , player2BetValue);
checkBet(player3Type, player3Bet , player3BetValue);
checkBet(player4Type, player4Bet , player4BetValue);

checkIfBet(player1Bet, player1BetValue)
checkIfBet(player2Bet, player2BetValue)
checkIfBet(player3Bet, player3BetValue)
checkIfBet(player4Bet, player4BetValue)