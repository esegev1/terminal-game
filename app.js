const prompt = require(`prompt-sync`)({sigint: true});
const pokemon = require('./deck.js');
// const fs = require(`fs`).promises;
// const path = require('path');


/******************************************************
*        
*                 Blackjack Game
*
*******************************************************/


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
   
   // console.log(`${JSON.stringify(card, null, 2)}`);
   // console.log(``);


   return card


}


//Build a hand
function buildHand() {
   const hand = [];
   hand.push(dealCard());
   hand.push(dealCard());
   // console.log(hand);


   return hand;
}


function gamePlay() {
   
    //initialize cards
    const game = {
       dealerHand: buildHand(),
       playerHand: buildHand(),
   };

    //score hands
    game.dealerHandValue = evaluateHand(game.dealerHand);
    game.playerHandValue = evaluateHand(game.playerHand);

    console.log(`Dealer Hand: ${game.dealerHandValue}, Player Hand: ${game.playerHandValue}`);


    //After scoring initial hand
    if(game.dealerHandValue === 21 && game.playerHandValue <21) {
        console.log(`Dealer wins`);
    } else if (game.dealerHandValue < 21 && game.playerHandValue === 21) {
        console.log(`Player wins`);
    } else if (game.dealerHandValue === 21 && game.playerHandValue === 21) {
        console.log(`Its a push`);
    } else {
        let keepPlaying = true;
       
        //Player's turn
        while (keepPlaying === true) {
           //Player turn
            const hitCard = prompt('Do you want to hit? Y/N: ');
            if(hitCard.toLowerCase() === 'y') {
                game.playerHand.push(dealCard()); 
                game.playerHandValue = evaluateHand(game.playerHand);
                if(game.playerHandValue > 21) {
                    console.log(`Your total is ${game.playerHandValue}, so you lose!`);
                    break;
                }
                console.log(`Dealer: ${game.dealerHandValue}, Player: ${game.playerHandValue}`);
            } else {
                keepPlaying = false;
            }
        
        
        }
        keepPlaying = true;
        //Dealer's turn
        while(keepPlaying === true) {
            
            if(game.dealerHandValue >= 17) {
                console.log(`Dealer has ${game.dealerHandValue} and stands`); 
                break;
            } else if (game.dealerHandValue < 17) {
                game.dealerHand.push(dealCard());
                game.dealerHandValue = evaluateHand(game.dealerHand);
                console.log(`Dealer pulled a ${game.dealerHand[game.dealerHand.length-1].rank}`);
            } else if (game.dealerHandValue > 21) {  
                console.log(`Dealer busted with a ${game.dealerHandValue}, you lose!`)
                break;
            }
        }
        console.log(`Dealer: ${game.dealerHandValue}, Player: ${game.playerHandValue}`);
    }
   
//    checkBlackjack(game);
//    console.log(`game: ${JSON.stringify(game, null, 2)}`);


   //evaluateHand(game);
}

gamePlay();







