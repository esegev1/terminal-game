const prompt = require(`prompt-sync`)({sigint: true});
const pokemon = require('./deck.js');
let wallet = 100;

/******************************************************
*                                                     *
*                 Blackjack Game.                     *
*                                                     *
*******************************************************/

function printCards(dealerHand, playerHand) {
    let dealerHandString = '';
    let playerHandString = '';
    
    for (const card of dealerHand) {
        dealerHandString += `${createCard(card.rank, card.suit)} `;
        // onsole.log(createCard(card.rank, card.suit))
        }
    for (const card of playerHand) {
        playerHandString += `${createCard(card.rank, card.suit)} `;
        // console.log(createCard(card.rank, card.suit))
    }
    
    console.log(`Dealer Hand: ${evaluateHand(dealerHand)}\n ${dealerHandString}`);
    console.log(`Player Hand: ${evaluateHand(playerHand)}\n ${playerHandString}`);
}

//this function evaluates your hand, recieves array with card objs
function evaluateHand(hand) {
 let value = 0;
 let aces = 0;

 for (let card of hand) {
   if (card.rank === 'A') {
     aces += 1;
   } else if (['J', 'Q', 'K'].includes(card.rank)) {
     value += 10;
   } else {
     value += parseInt(card.rank);
   }
 }
 for (let i = 0; i < aces; i++) {
   if (value + 11 <= 21) {
     value += 11;
   } else {
     value += 1;
   }
 }
 return value;
}

// CARD ART
const createCard = (rank, suit) => {
    const heart = '♥'
    const diamond = '♦'
    const spade = '♠'
    const club = '♣'
    let suitArt = ''
    switch (suit) {
        case 'Hearts':
            suitArt = heart
            break
        case 'Diamonds':
            suitArt = diamond
            break
        case 'Spades':
            suitArt = spade
            break
        case 'Clubs':
            suitArt = club
            break
    }

    let rankTop = ''
    let rankBottom = ''

    if (rank!=='10') {
      rankTop = `${rank} `
      rankBottom = ` ${rank}`
    } else {
      rankTop = `${rank}`
      rankBottom = `${rank}`
    }

    const card = `\n.-------.\n|${rankTop}     |\n|   ${suitArt}   |\n|     ${rankBottom}|\n'-------'\n`
    return card
}

//Create random card
function dealCard() {
   const cards = {
       ranks: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
       suits: ['Hearts', 'Diamonds', 'Clubs', 'Spades'],
   }

   const rankIdx = Math.round(Math.random() * 12)
   const suitIdx = Math.round(Math.random() * 3);
  
   const card = {};
   card.rank = cards.ranks[rankIdx]; 
   card.suit = cards.suits[suitIdx];

   return card
}


//Build a hand
function buildHand() {
   const hand = [];
   hand.push(dealCard());
   hand.push(dealCard());

   return hand;
}


function gamePlay() {
    
    let wager = prompt(`Dealer: How much are you losing today sir? `);

    wager = wager * 1 
    
    //initialize cards
    const game = {
       dealerHand: buildHand(),
       playerHand: buildHand(),
    };
    
    //score hands
    game.dealerHandValue = evaluateHand(game.dealerHand);
    game.playerHandValue = evaluateHand(game.playerHand);

    printCards(game.dealerHand, game.playerHand);

    //After scoring initial hand
    if(game.dealerHandValue === 21 && game.playerHandValue <21) {
        console.log(`Dealer: Looks like I win`);
        // wallet -= wager;
    } else if (game.dealerHandValue < 21 && game.playerHandValue === 21) {
        console.log(`Dealer: Oh so you want to take my money!?!?`);
        // wallet += wager;
    } else if (game.dealerHandValue === 21 && game.playerHandValue === 21) {
        console.log(`Dealer: Its a push`);
    } else {
        let playerKeepPlaying = true;
        let playerLose = false;

        //Player's turn
        while (playerKeepPlaying === true) {
            const hitCard = prompt('Do you want to hit? Y/N: ');
            if(hitCard.toLowerCase() === 'y') {
                game.playerHand.push(dealCard()); 
                game.playerHandValue = evaluateHand(game.playerHand);
                if(game.playerHandValue > 21) {
                    console.log(`Your total is ${game.playerHandValue}, so you lose!`);
                    // wallet -= wager;
                    playerLose = true;
                    break;
                }
                console.log(`Dealer: ${game.dealerHandValue}, Player: ${game.playerHandValue}`);
                // console.log(game.dealerHand.rank, game.dealerHand.suit)
                printCards(game.dealerHand, game.playerHand);
                
            } else {
                playerKeepPlaying = false;
            }
        }

        let dealerKeepPlaying = true;
        let dealerLose = false;

        //Dealer's turn
        while(dealerKeepPlaying === true && playerLose === false) {
            if(game.dealerHandValue >= 17 && game.dealerHandValue <= 21) {
                console.log(`Dealer has ${game.dealerHandValue} and stands`); 
                break;
            } else if (game.dealerHandValue < 17) {
                game.dealerHand.push(dealCard());
                game.dealerHandValue = evaluateHand(game.dealerHand);
                console.log(`Dealer pulled a ${game.dealerHand[game.dealerHand.length-1].rank}`);
            } else if (game.dealerHandValue > 21) {  
                console.log(`Dealer: Oh rats!! I have ${game.dealerHandValue}, you take my money!`);
                // wallet += wager;
                dealerLose = true;
                break;
            }
        }
        
        let winner;
        if(playerLose === true) {
            winner = `Dealer`;
            wallet = wallet - wager;
        } else if (dealerLose === true) {
            winner = `Player`;
            wallet = wallet + wager;
        } else {
            if(game.playerHandValue > game.dealerHandValue){
                winner = `Player`;
                wallet = wallet + wager;
            } else if (game.dealerHandValue > game.playerHandValue) {
                winner = `Dealer`;
                wallet = wallet - wager;
            } else {
                winner = `No one`;
            }
        }
        console.log(`Dealer: ${game.dealerHandValue}, Player: ${game.playerHandValue}`);
        console.log(`${winner} wins!`);
    }
    
    console.log(`You now have ${wallet} dollar in your bank!`);

    const playAgain = prompt(`Do you want to play another round? Y/N `);

    if (playAgain.toLowerCase() === 'y') {
        return true;
    } else {
        return false;
    }
    
}


console.log(`**********************************************************`);
console.log(`|             Welcome to Gen Assembly's Casino           |`); 
console.log(`**********************************************************`);
console.log(``);
let continuePlay = true;

while(continuePlay) {
    continuePlay = gamePlay();

}

console.log(`Thanks for stopping by to give me your money!`);
