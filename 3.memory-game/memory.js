const cards = ["abc", "chestnut", "citroen", "coca-cola", "facebook","figma", "instagram",
                "landrover", "linkedin", "spotify","tokopedia", "twitter","visa","whatsapp","youtube"];


const mainElement = document.querySelector("main");

let bothCards = []   //compare both cards
let firstOrSecondTurnedCard = 0
let counter = 0
let blockEvents = false


const shuffleArray = (array) =>{
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

const clickHandler = (event) => {
  if (blockEvents) {
    return
  }
  turnCard(event.currentTarget);
  event.currentTarget.removeEventListener("click", clickHandler);
};

const addClickListener = (card) => {
  card.addEventListener("click", clickHandler);
};


const compareCards = (bothCards) =>{
  blockEvents = true
  let classOne = bothCards[0].classList.value
  let classTwo = bothCards[1].classList.value

  if (classOne === classTwo){
    firstOrSecondTurnedCard = 0;
    bothCards = [];

    counter++
    if(counter === cards.length){
      let newDiv = document.createElement("div")
      newDiv.textContent = "Congratulations"
      mainElement.appendChild(newDiv)

      let playAgainBtn = document.createElement("button")
      playAgainBtn.textContent = "Play again"
      mainElement.appendChild(playAgainBtn)
      playAgainBtn.addEventListener("click", () =>{
        location.reload();
      })
    }
    
  }else{ 
    bothCards.forEach(card =>{
      setTimeout(()=>{
        card.setAttribute("src", "./img/standard.png");
        addClickListener(card);
        blockEvents = false;
      },800);
    
    });
  };
};

const turnCard = (img) =>{
  if (bothCards.length === 2){
    bothCards = [];
  }
  bothCards.push(img)
  let logo = img.classList[1];
  img.setAttribute("src", `./img/${logo}.png`)
  firstOrSecondTurnedCard++

  if (firstOrSecondTurnedCard === 2){
    firstOrSecondTurnedCard = 0;
    compareCards(bothCards)
  };
};

//shuffle array
for (let i = 0; i<2; i++){
  
  shuffleArray(cards);

  cards.forEach(card =>{
    newImg = document.createElement("img");
    newImg.setAttribute("src", `./img/standard.png`);
    newImg.setAttribute("class", `card ${card}`)
    mainElement.appendChild(newImg);
  });
};



//add eventListener to all cards
let deck = document.querySelectorAll(".card");
deck = Array.from(deck);
deck.forEach(img => {
  img.addEventListener("click", clickHandler);
});







