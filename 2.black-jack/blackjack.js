let cardsDeck = [
  ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "H12", "H13"],
  ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13"],
  ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13"]
];

const drawCardBtn = document.querySelector(".player-draw");
const stopBtn = document.querySelector(".player-stop");
const playerCards = document.querySelector(".player-cards");
const playerValue = document.querySelector(".player-value")
const dealerCards = document.querySelector(".dealer-cards");
const dealerValue = document.querySelector(".dealer-value");
dealerValue.setAttribute("style", "visibility: hidden")

function drawCard(howMany, array, user){
  for (let i = 0; i < howMany; i++){
    let suit = Math.floor(Math.random()*4+1)-1;

    if(cardsDeck[suit].length === 0){ //if no cards left in 'suit pile' we cannot draw a card from this suit and must try again
      drawCard(1)
    }else{
      let cardsLeft = cardsDeck[suit].length;
      let number = Math.floor(Math.random()*cardsLeft +1)-1;
  
      let drawnCard = cardsDeck[suit][number];

      //add drawnCard to hand
      array.push(drawnCard)

      //remove hand from deck
      cardsDeck[suit].splice(number,1)

      //Add hand to HTML
      let cardHTMLElement = document.createElement("div");
      cardHTMLElement.textContent = drawnCard;
      if(user ==="player"){
        playerCards.appendChild(cardHTMLElement);
      }else{
        cardHTMLElement.setAttribute("style", "visibility: hidden")
        dealerCards.appendChild(cardHTMLElement);
      };
    };
  };
  
  return array
};


function determineValueHand(array, user){
  let handValue = 0;
  for (let i = 0; i < array.length; i++){
    let cardValue = Array.from(array[i]);

    cardValue = Number(cardValue.slice(1,).join(""));

    if(cardValue > 10){
      cardValue = 10;
    };
    handValue += cardValue
  };
  if(handValue > 21){
    alert("Bust! More than 21! dealer's turn")
    drawCardBtn.setAttribute("disabled", "");
    stopBtn.setAttribute("disabled", "");
  }
  if(user === "player"){
    playerValue.textContent = handValue;
  }else{
    dealerValue.textContent = handValue;
  }
  return handValue;
};

let playerHand = []
let dealerHand = []

drawCard(2, playerHand, "player");
drawCard(2, dealerHand, "dealer");


determineValueHand(playerHand, "player")
determineValueHand(dealerHand, "dealer")


drawCardBtn.addEventListener("click", () =>{
  let newCard = drawCard(1, playerHand, "player")
  determineValueHand(newCard, "player");
})


stopBtn.addEventListener("click", () =>{
  drawCardBtn.setAttribute("disabled", "");

  dealerValue.setAttribute("style", "visibilty: visible");

  let dealerChildren = Array.from(dealerCards.children)
  dealerChildren.forEach(child =>{
    child.setAttribute("style", "visibilty: visible")
  }) 
    
});


//TODO: hide PC cards until player presses stop

//TODO: Bust message for player and PC