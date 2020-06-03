/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScores, activePlayer, gamePlaying;

init(); 

var lastDice;

function init() {
    scores = [0,0]; 
    roundScores = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';


// Used for setting values in the html content

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


document.querySelector('#name-0').textContent = 'player 1';
document.querySelector('#name-1').textContent = 'player 2';


document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');


document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

}



// Used for setting values in the html content

// document.querySelector('#current-' + activePlayer).textContent = dice; 
// document.querySelector('#current-'  + activePlayer).innerHTML = '<em>' + dice + '</em>'; 



// Used for getting values

var x = document.querySelector('#score-0').textContent;
// console.log(x);


// function btn() {

// }
// btn();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {

        // 1. Random Number 

    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;


    // 2. Display the result

    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-1').src = 'dice-' + dice2 + '.png';

    //  3. Update the round score IF the rolled number was Not a 1 


    if (dice1 !==1 && dice2 !== 1) {
        //  Add Score
         roundScores += dice1 + dice1; /* also means roundScore + dice */
         document.querySelector('#current-' + activePlayer).textContent = roundScores; 
    } else {

        // Next Player
       nextPlayer();
        }



//     if (dice === 6 && lastDice === 6) {
//         // Player looses score
//         scores[activePlayer] = 0;
//         document.querySelector('#score-' + activePlayer).textContent = 0;
//         nextPlayer();

//     } else if (dice !== 1) {
//         //  Add Score
//          roundScores += dice; /* also means roundScore + dice */
//         //  document.querySelector('#current-' + activePlayer).textContent = roundScores; 
//     // } else {

//         // Next Player
//     //    nextPlayer();
//         }
//         // lastDice = dice;
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {
        // Add Current score to global
    scores[activePlayer] += roundScores;

    // Update the UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;

    // Undefined, 0, null or "" are coerced yto false
    // Anything else is coerced to true 
    if(input) {
        var winningScore = input;
    } else {
        winningScore = 100;
    }

    // check if the player won the game 
    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        gamePlaying = false;
    } else {

         // Next player function 
        nextPlayer();
    }

    }
});

function nextPlayer () {
    // Next player function 

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;  
    

    // OR
    // if (activePlayer === 0) {
    //     activePlayer = 1;
    // } else {
    //     activePlayer = 0;
    // }

    roundScores = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);