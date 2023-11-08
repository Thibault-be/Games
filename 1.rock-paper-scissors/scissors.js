let choices = ["rock", "paper", "scissors"];
const mainElement = document.querySelector("main");

choices.forEach(item =>{
  newBtn = document.createElement("button");
  newBtn.textContent = item;
  newBtn.setAttribute("type","submit");

  mainElement.appendChild(newBtn);
});

let numberOfPlayerWinsElement = document.querySelector(".player");
//console.log(numberOfPlayerWinsElement)
let numberOfComputerWinsElement = document.querySelector(".computer")
//console.log(numberOfComputerWinsElement)
let numberOfTiesElement= document.querySelector(".tie");
//console.log(numberOfTiesElement)

let outcome;
let outcomeDiv;

let playerChoices = document.querySelectorAll("button")
playerChoices.forEach(choice =>{
  choice.addEventListener("click", (event) =>{
    let playerChoice = event.target.textContent
    outcomeDiv = addNewDiv()
    playGame(playerChoice)
  });
});

function addNewDiv(){
  let OutcomeElement = document.createElement("div")
  return OutcomeElement;
}

function playGame(playerChoice){
  let computerChoice = (Math.floor(Math.random() * 3) +1)-1
  computerChoice = choices[computerChoice];

  let numberOfPlayerWins = Number(numberOfPlayerWinsElement.textContent);
  console.log("player", numberOfPlayerWins)
  let numberOfComputerWins = Number(numberOfComputerWinsElement.textContent);
  console.log("computer", numberOfComputerWins);
  let numberOfTies = Number(numberOfTiesElement.textContent);
  console.log("ties", numberOfTies);

  if(playerChoice === computerChoice){
    outcome =`It's a tie. Player picked ${playerChoice}. Computer picked ${computerChoice}`
    numberOfTies += 1;
    numberOfTiesElement.textContent = numberOfTies;
  }else{
    switch (playerChoice){
      case "rock":{
        if (computerChoice === "scissors"){
          outcome =`Player wins. Player picked ${playerChoice}. Computer picked ${computerChoice}`
          numberOfPlayerWins += 1
          numberOfPlayerWinsElement.textContent = numberOfPlayerWins

        }else {
          outcome =`Computer wins. Player picked ${playerChoice}. Computer picked ${computerChoice}`
          numberOfComputerWins += 1;
          numberOfComputerWinsElement.textContent = numberOfComputerWins;
        }
        break
      };
      case "paper":{
        if(computerChoice === "rock"){
          outcome = `Player wins. Player picked ${playerChoice}. Computer picked ${computerChoice}`
          numberOfPlayerWins += 1
          numberOfPlayerWinsElement.textContent = numberOfPlayerWins
        }else {
          outcome =`Computer wins. Player picked ${playerChoice}. Computer picked ${computerChoice}`
          numberOfComputerWins += 1;
          numberOfComputerWinsElement.textContent = numberOfComputerWins;
        }
        break

      }; 
      case "scissors":{
        if(computerChoice === "paper"){
          outcome = `Player wins. Player picked ${playerChoice}. Computer picked ${computerChoice}`
          numberOfPlayerWins += 1
          numberOfPlayerWinsElement.textContent = numberOfPlayerWins
        }else {
          outcome =`Computer wins. Player picked ${playerChoice}. Computer picked ${computerChoice}`
          numberOfComputerWins += 1;
          numberOfComputerWinsElement.textContent = numberOfComputerWins;
        }
        break
      };
    };
  };
  outcomeDiv.textContent = outcome;
  mainElement.appendChild(outcomeDiv);
  //location.reload()
};

