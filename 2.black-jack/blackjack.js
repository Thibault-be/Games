let cardsDeck = [
  ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "H12", "H13"],
  ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13"],
  ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13"]
];

const drawCardBtn = document.querySelector(".player-draw");
const stopBtn = document.querySelector(".player-stop");
const playerCards = document.querySelector(".player-cards");
const playerValueSpan = document.querySelector(".player-value")
const dealerCards = document.querySelector(".dealer-cards");
const dealerValueSpan = document.querySelector(".dealer-value");
dealerValueSpan.setAttribute("style", "visibility: hidden")

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
        if(dealerCards.children.length === 0){
          cardHTMLElement.setAttribute("style", "visibility: hidden")
        };
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
  if(user === "player" && handValue > 21){
    alert("Bust! More than 21! dealer's turn")
    drawCardBtn.setAttribute("disabled", "");
    stopBtn.setAttribute("disabled", "");
    dealerValueSpan.setAttribute("style", "visibilty: visible");
    let dealerChildren = Array.from(dealerCards.children)
    dealerChildren.forEach(child =>{
      child.setAttribute("style", "visibilty: visible")
    });
    playerValueSpan.textContent = handValue;
    dealerContinueOrNot();
    return
  }
  if(user === "player"){
    playerValueSpan.textContent = handValue;
  }else{
    dealerValueSpan.textContent = handValue;
  };
  return handValue;
};

let dealerHandArray
function dealerContinueOrNot(){
  let playerValue = Number(playerValueSpan.textContent);
  let dealerValue= Number(dealerValueSpan.textContent);  


  switch(playerValue > 21){
    case true:{
      if (dealerValue <=16){
        dealerHandArray = drawCard(1, dealerHand, "dealer");
        determineValueHand(dealerHandArray, "dealer");
        dealerContinueOrNot();
      }else if(dealerValue > 21){
        alert("it's a tie");
      }else if (dealerValue > 16){
        alert("dealer wins");
      }
      break
    }
    case false:{
      if(dealerValue <=16){
        dealerHandArray = drawCard(1, dealerHand, "dealer");
        determineValueHand(dealerHandArray, "dealer");
        dealerContinueOrNot();
      }if(dealerValue === playerValue){
        alert("it's a tie")
      }else if(dealerValue > playerValue && dealerValue <= 21){
        alert("dealer wins");
      }else{
        alert("player wins")
      }
      break;
    };
  };
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
  stopBtn.setAttribute("disabled","");
  drawCardBtn.setAttribute("disabled", "");

  dealerValueSpan.setAttribute("style", "visibilty: visible");

  let dealerChildren = Array.from(dealerCards.children)
  dealerChildren.forEach(child =>{
    child.setAttribute("style", "visibilty: visible")
  });

  dealerContinueOrNot()
});

