let cardsDeck = [
  ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "H12", "H13"],
  ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13"],
  ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13"]
];

const mainElement = document.querySelector("main");
const drawCardBtn = document.querySelector(".player-draw");
const stopBtn = document.querySelector(".player-stop");
const playerCards = document.querySelector(".player-cards");
const playerValueSpan = document.querySelector(".player-value")
const dealerCards = document.querySelector(".dealer-cards");
const dealerValueSpan = document.querySelector(".dealer-value");
dealerValueSpan.setAttribute("style", "visibility: hidden")

let suitClass //variable to determine class of div which will be hearts, diamonds, spades or clubs

function drawCard(howMany, array, user){
  for (let i = 0; i < howMany; i++){
    let suit = Math.floor(Math.random()*4+1)-1;

    if(cardsDeck[suit].length === 0){ //if no cards left in 'suit pile' we cannot draw a card from this suit and must try again
      drawCard(1, array, user)
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
      //cardHTMLElement.textContent = drawnCard;
      setSuit(cardHTMLElement, drawnCard);
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

function setSuit(cardHTMLElement, drawnCard){
  suitClass= Array.from(drawnCard);
  let cardText = suitClass.slice(1,).join("");
  suitClass= suitClass[0];

  switch (suitClass){
    case "H": {
      cardHTMLElement.setAttribute("class", "hearts");
      break
    }
    case "D":{
      cardHTMLElement.setAttribute("class", "diamonds");
      break
    }
    case "S":{
      cardHTMLElement.setAttribute("class", "spades");
      break
    }
    case "C":{
      cardHTMLElement.setAttribute("class", "clubs");
      break
    }
  }

  switch(cardText){
    case "1":{
      cardHTMLElement.textContent = "A"
      break;
    }
    case "11":{
      cardHTMLElement.textContent = "J"
      break;
    }
    case "12":{
      cardHTMLElement.textContent = "Q"
      break;
    }
    case "13":{
      cardHTMLElement.textContent = "K"
      break;
    }
    default: cardHTMLElement.textContent = cardText
  }


 }

 function determineValueHand(array, user){

  let handValue = 0;
  let handArray = [];
  let cardValue;
  for (let i = 0; i < array.length; i++){
    cardValue = Array.from(array[i]);

    cardValue = Number(cardValue.slice(1,).join(""));
    
    if(cardValue > 10){
      cardValue = 10;
    };
    handArray.push(cardValue); 
  };
    handArray.sort();


    //account for ace


    let aceCounter = 0
    handArray.forEach(card =>{
      if(card == 1){
        aceCounter += 1
      }
    })

    switch (aceCounter){
      case 0:
      case 1:{
        for (let i = handArray.length - 1; i >= 0; i--){
          cardValue = handArray[i]
          if (handArray[i] === 1){
            if (handValue + 11 <= 21){
              cardValue = 11;
            }else{
              cardValue = 1;
            }
          };
          handValue += cardValue
        };
        break;
      };
      case 2:
      case 3:
      case 4:{
        for (let i = handArray.length - 1; i>=0; i--){
          cardValue = handArray[i];
          handValue += cardValue
          if(handValue +10 <= 21){
            handValue += 10
          }
        }
      }  
    };

  if(user === "player" && handValue > 21){
    drawCardBtn.setAttribute("disabled", "");
    stopBtn.setAttribute("disabled", "");
    dealerValueSpan.setAttribute("style", "visibilty: visible");
    let dealerChildren = Array.from(dealerCards.children)
    dealerChildren.forEach(child =>{
      child.setAttribute("style", "background-color: white")
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
        gameEnded("dealer wins");
        break;
      };
    case false:{
      if(dealerValue <=16){
        dealerHandArray = drawCard(1, dealerHand, "dealer");
        determineValueHand(dealerHandArray, "dealer");
        dealerContinueOrNot();
        return
      }if(dealerValue === playerValue){
        gameEnded("it's a tie")
        return
      }else if(dealerValue > playerValue && dealerValue <= 21){
        gameEnded("dealer wins");
        return
      }else{
        gameEnded("player wins")
        return
      }
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
});


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


function gameEnded(winner){
  let endOfRound = document.createElement("div")
  endOfRound.textContent = winner;
  mainElement.appendChild(endOfRound);

  let newGameBtn = document.createElement("button")
  newGameBtn.setAttribute("class", "new-game");
  newGameBtn.textContent = "play again?"
  mainElement.appendChild(newGameBtn);
  playAgain(newGameBtn)

}

function playAgain(btn){
  console.log("here");
  btn.addEventListener("click", ()=>{
    location.reload()
  })
}

// hide dealer value with width
// make red not visible
