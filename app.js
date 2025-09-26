// const prompt = require(`prompt-sync`)({sigint: true});
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
   if (card.value === 'A') {
     aces += 1;
   } else if (['J', 'Q', 'K'].includes(card.value)) {
     value += 10;
   } else {
     value += parseInt(card.value);
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
   const game = {
       dealerHand: buildHand(),
       playerHand: buildHand(),
   }


   //eval


   console.log(`game: ${JSON.stringify(game, null, 2)}`);


   evaluateHand(game);
}




function resolveAce() {


}






function randomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}


function fight(location) {
   if(location === 'Staten Island') {location='StatenIsland';}


   opponents = {
       Bronx: `Mean Jack`,
       Brooklyn: `Filthy Michael`,
       Manhattan: `Rhonda McPunches`,
       Queens: `Pat With a Bat`,
       StatenIsland: `Rob You After`
   }
  
   hitObj = {
       slap: 20,
       punch: 25,
       elbow: 30,
       kick: 35
   }
   const hitKeys = Object.keys(hitObj);


   let yourPower = 100;
   let opponentPower = 100;
  
   console.log(`You'll be fighting '${opponents[location]}'`);
   console.log(`You can slap, punch, elbow or kick by typing one of these below`);
   console.log(``);
   console.log(`LETS GET IT!!!!`);
   console.log(``);
  
   while (yourPower > 0 && opponentPower > 0) {
       console.log(`${name}'s Power: ${yourPower}, ${opponents[location]}'s power: ${opponentPower}, fight on!!`) ;
      
       //User inputs their next move
       let move = prompt(`Next move? `);
       opponentPower = opponentPower - Math.round(hitObj[move] * Math.random(0,2));
      
       //Oponent next move
       let randomHit = hitKeys[Math.floor(Math.random() * hitKeys.length)];
       yourPower = yourPower - Math.round(hitObj[randomHit] *Math.random(0,1));
       console.log(`${opponents[location]} threw a ${randomHit}`) ;
   }
   console.log(`Final score: ${name}: ${yourPower}, ${opponents[location]}: ${opponentPower}`);
  
   console.log(``);
   if (yourPower > opponentPower) {
       walletObj.fightMoney = walletObj.fightMoney + 50;
       console.log(`YOU WIN!! Here's your $50,
now get out of here before the cops come!!`);


   } else {
       console.log(`Com'on kid, YOU LOST, get up,`);
       console.log(`cops will be here soon`);
   }
   console.log(``);


   navigate();


}


function playDice() {
   console.log(`So, you want to gamble huh?`);
   console.log(``);
   let wager = prompt(`How much you got? `);
   console.log(``);
  
   //Cheecks if the wager is a valid number
   while (typeof (wager*1) !== 'number') {
       wager = prompt(`Money, smart a$$!! How much money do you want to bet? `);
       console.log(``);
   }


   console.log(`Ok, here's how this works, we each roll`);
   console.log(`2 dice, whoever has the higher combined`);
   console.log(`total wins the pot.`);
   console.log(``);
      
   let keepGoing = 'y';
   while (keepGoing === 'y') {
       //let dice = Math.random(2,12);
       let yourTotal = randomNumber(2,12);
       //console.log(`dice: ${dice}, yourTotal: ${yourTotal}`);
       console.log(``);


       let opponentTotal = randomNumber(2,12);


       console.log(`You rolled a ${yourTotal}, I rolled a ${opponentTotal}`);
       console.log(``);


       if(yourTotal > opponentTotal) {
           console.log(`You win!! Here's $${wager}`);
           walletObj.diceMoney = walletObj.diceMoney + Number(wager);


       } else if (opponentTotal > yourTotal) {
           console.log(`Ha! Give me my $${wager}`)
           walletObj.diceMoney = walletObj.diceMoney - Number(wager);


       } else {
           console.log(`Tie! Roll again!`);
       }


       console.log(``);
       keepGoing = prompt(`Want to keep going? Y/N? `);
       keepGoing = keepGoing.toLowerCase();
       console.log(``);
   }
   console.log(``);


   navigate();
}




function robBank(location) {
   console.log(`Finally someone who likes to have fun!!`);
   console.log(``);
   console.log(`Ok, here's how this works, you have to solve`);
   console.log(`math equations to find the 3 digit combo to `);
   console.log(`the safe. Solve it before the cops show up`);
   console.log(`and the money's all yours!`);
   console.log(``);


   const operatorsArr = ["+", "-", "*"];
  
   let solvedCombo = 0;
  
   //give the user 6 tries to solve 3 formulas
   for(let x=0;x<6;x++){
       console.log(``);
       //Make a 4 operator formula
       let formula = '';
       for(let i=0;i<4; i++) {
           formula = formula + `${randomNumber(1, 10)} ${operatorsArr[randomNumber(0,2)]} `
       }
      
       formula = formula + `${randomNumber(1, 10)}`;
       let compSolution = eval(formula);


       console.log(`Formula: ${formula}`);
  
       let userSolution = prompt(`What's your answer? `);
       console.log(``);


       if(userSolution*1 === compSolution) {
           console.log(`Thats right! Keep it up!`);
           solvedCombo++;
       } else {
          
           console.log(`That's wrong, it was ${compSolution}.`);
           console.log(`Focus kid, I can't go back to jail!`);
       }
       if(solvedCombo === 3) {
           console.log(``);
           console.log(`YOU DID IT!!!!`);
           console.log(``);
           let safeMoney = 1000000*Math.random(0,1);
           walletObj.robberyMoney = walletObj.robberyMoney + safeMoney
          
           console.log(`There's $${formatter.format(safeMoney)} in there!!`);
           console.log(`Lets get out of here!!!!`);
           break;
       }  
   }


   console.log(``);
   navigate();
}


//Lets the user choose a location to travel to
function navigate() {
  const boroughArr = ['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Island', 'Bank'];


   console.log(`Select a location from the list:`)
   for(let i=0; i <boroughArr.length; i++) {
       console.log(`${i+1}. ${boroughArr[i]}`)
   }
   console.log(``);


   let location = prompt(`Where do you want to go? `);
   console.log(``);


   //converts user input from number to borough name
   if(typeof (location*1) == 'number') {
       location = boroughArr[location-1];
   }


   welcomeTo(location);
}


function bankCheck(){
   console.log(`See your balances below:`);
   console.log(`Money from fighting: $${formatter.format(walletObj.fightMoney)}`);
   console.log(`Money from gambling $${formatter.format(walletObj.diceMoney)}`);
   console.log(`Money from robing banks: $${formatter.format(walletObj.robberyMoney)}`);


   console.log(``);


   navigate();
}


function welcomeTo(location) {
   if (location === 'Bank' ) {
       bankCheck();


   } else {
       const activityArr = ['Fight', 'Gamble', 'Steal'];


       console.log(`Welcome to ${location}!`);
       console.log(`Select an activity from below`);
  
       //print out activity list
       for(let i=0; i<activityArr.length; i++) {
           console.log(`${i+1}. ${activityArr[i]}`);
       }


       console.log(``);


       let activity = prompt(`So, what will it be? `);
       console.log(``);
       activity = activity.toLowerCase();
  
       if (activity === '1' || activity === `fight`){
           fight(location);
       } else if (activity === '2' || activity === `gamble`) {
           playDice(location);
       } else if (activity === '3' || activity === `steal`) {
           robBank(location);
       }
   }
  
  


}






// const name = prompt(`Whats your name? `);


// let formatter = new Intl.NumberFormat('en-US', {
//                     maximumFractionDigits: 0
//                 });


// const walletObj = {
//     fightMoney: 0,
//     diceMoney: 0,
//     robberyMoney: 0,
// }


// console.log(``);
// console.log(`Welcome to NYC ${name}!!!`);


// navigate();
assignHand();







