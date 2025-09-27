const prompt = require(`prompt-sync`)({sigint: true});
const pokemon = require('./deck.js');
let wallet = 100;

/******************************************************
*                                                     *
*                 Blackjack Game.                     *
*                                                     *
*******************************************************/
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

    let card = []

    if (suit==='Hearts'||suit==='Diamonds') {
         card = [
            `\x1b[47m\x1b[30m.-------.\x1b[0m`,
            `\x1b[47m\x1b[30m|\x1b[31m${rankTop}\x1b[30m     |\x1b[0m`,
            `\x1b[47m\x1b[30m|   \x1b[31m${suitArt}\x1b[30m   |\x1b[0m`,
            `\x1b[47m\x1b[30m|     \x1b[31m${rankBottom}\x1b[30m|\x1b[0m`,
            `\x1b[47m\x1b[30m'-------'\x1b[0m`
        ]
    } else {
        card = [
            `\x1b[47m\x1b[30m.-------.\x1b[0m`,
            `\x1b[47m\x1b[30m|${rankTop}     |\x1b[0m`,
            `\x1b[47m\x1b[30m|   ${suitArt}   |\x1b[0m`,
            `\x1b[47m\x1b[30m|     ${rankBottom}|\x1b[0m`,
            `\x1b[47m\x1b[30m'-------'\x1b[0m`
        ]    
    }
    
    return card
}

function printCards(user, handOfCards) {
        
    let row1 = ''
    let row2 = ''
    let row3 = ''
    let row4 = ''
    let row5 = ''
    
    console.log(`${user} Hand: ${evaluateHand(handOfCards)}\n`);

    for (const card of handOfCards) {
        const cardArray = createCard(card.rank, card.suit)
        row1 += `${cardArray[0]}`
        row2 += `${cardArray[1]}`
        row3 += `${cardArray[2]}`
        row4 += `${cardArray[3]}`
        row5 += `${cardArray[4]}`       
    }
 
    const handString = `${row1}\n${row2}\n${row3}\n${row4}\n${row5}\n`
    console.log(handString)
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
    console.log(``)

    wager = wager * 1 
    
    //initialize cards
    const game = {
       dealerHand: buildHand(),
       playerHand: buildHand(),
    };
    
    //score hands
    game.dealerHandValue = evaluateHand(game.dealerHand);
    game.playerHandValue = evaluateHand(game.playerHand);

    printCards('Dealer', game.dealerHand);
    printCards('Player', game.playerHand);

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
                printCards('Dealer', game.dealerHand);
                printCards('Player', game.playerHand);
                
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