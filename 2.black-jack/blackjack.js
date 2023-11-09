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
//dealerValueSpan.setAttribute("style", "visibility: hidden")
dealerValueSpan.setAttribute("style", "background-color: white")

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
          //cardHTMLElement.setAttribute("style", "visibility: hidden")
          cardHTMLElement.setAttribute("style", "background-color: white")
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

  // console.log("cardText",cardText)
  // cardHTMLElement.textContent = cardText;
  

 }

 function determineValueHand(array, user){
  let handValue = 0;
  let handArray = [];
  for (let i = 0; i < array.length; i++){
    let cardValue = Array.from(array[i]);

    cardValue = Number(cardValue.slice(1,).join(""));
    
    if(cardValue > 10){
      cardValue = 10;
    };
    console.log(typeof(cardValue))
    handArray.push(cardValue);
    handArray.sort();
    console.log("handArray", handArray)
    handValue += cardValue
  };
  if(user === "player" && handValue > 21){
    alert("Bust! More than 21! dealer's turn")
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

// function determineValueHand(array, user){
//   let handValue = 0;
//   array.sort()
//   console.log(array)
//   for (let i = 0; i < array.length; i++){
//     let cardValue = Array.from(array[i]);
//     console.log(cardValue)

//     cardValue = Number(cardValue.slice(1,).join(""));

//     if(cardValue > 10){
//       cardValue = 10;
//     };
//     handValue += cardValue
//   };
//   if(user === "player" && handValue > 21){
//     alert("Bust! More than 21! dealer's turn")
//     drawCardBtn.setAttribute("disabled", "");
//     stopBtn.setAttribute("disabled", "");
//     dealerValueSpan.setAttribute("style", "visibilty: visible");
//     let dealerChildren = Array.from(dealerCards.children)
//     dealerChildren.forEach(child =>{
//       child.setAttribute("style", "background-color: white")
//     });
//     playerValueSpan.textContent = handValue;
//     dealerContinueOrNot();
//     return
//   }
//   if(user === "player"){
//     playerValueSpan.textContent = handValue;
//   }else{
//     dealerValueSpan.textContent = handValue;
//   };
//   return handValue;
// };

let dealerHandArray
function dealerContinueOrNot(){
  let playerValue = Number(playerValueSpan.textContent);
  let dealerValue= Number(dealerValueSpan.textContent); 
  console.log("i am back in dealerContinueOrNOt") 


  switch(playerValue > 21){
    case true:{    
        alert("dealer wins");
        break;
      };
    case false:{
      if(dealerValue <=16){
        dealerHandArray = drawCard(1, dealerHand, "dealer");
        console.log("drawing new hand")
        determineValueHand(dealerHandArray, "dealer");
        console.log("determine its value")
        dealerContinueOrNot();
        return
      }if(dealerValue === playerValue){
        console.log("it's a tie")
        alert("it's a tie")
        return
      }else if(dealerValue > playerValue && dealerValue <= 21){
        console.log("dealer wins")
        alert("dealer wins");
        return
      }else{
        console.log("I am here")
        alert("player wins")
        return
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


// hide dealer value with width
// make red not visible
