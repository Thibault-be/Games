let cardsDeck = [
  ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "H12", "H13"],
  ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13"],
  ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13"]
];


//give two cards to the player
//decide on suit



// for (let i = 0; i < 2; i++) {
//   drawCard()
// }

function drawCard(howMany, array){

  for (let i = 0; i < howMany; i++){
    let suit = Math.floor(Math.random()*4+1)-1;

    if(cardsDeck[suit].length === 0){ //if no cards left in 'suit pile' we cannot draw a card from this suit and must try again
      drawCard(1)
    }else{
      let cardsLeft = cardsDeck[suit].length;
      let number = Math.floor(Math.random()*cardsLeft +1)-1;
      //console.log("suit", suit)
      //console.log("number", number)
  
      let drawnCard = cardsDeck[suit][number];
      //console.log("drawnCard", drawnCard);

      //add drawnCard to hand
      array.push(drawnCard)


      //remove hand from deck
      cardsDeck[suit].splice(number,1)
      //console.log(`cardsDeck[${suit}]`, cardsDeck[suit])
      //console.log(`cardsDeck[${suit}][${number}],cardsDeck[suit][number] `)
    };
  };
};


function determineValueHand(array){

  let handValue = 0;
  for (let i = 0; i < array.length; i++){
    let cardValue = Array.from(array[i]);
    cardValue = Number(cardValue.slice(1,).join(""));
    if(cardValue > 10){
      cardValue = 10;
    };
    handValue += cardValue
  };
  return handValue;
};


let playerStartHand = []
let dealerStartHand = []

drawCard(2, playerStartHand);
console.log("player", playerStartHand);
drawCard(2, dealerStartHand);
//console.log("dealer",dealerStartHand)

let playerStartValue = determineValueHand(playerStartHand)
console.log("playerStartValue",playerStartValue);

