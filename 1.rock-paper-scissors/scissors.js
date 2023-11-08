let choices = ["rock", "paper", "scissors"];
const mainElement = document.querySelector("main");

let computerChoice = Math.floor(Math.random() * 2 +1)

choices.forEach(item =>{
  newBtn = document.createElement("button");
  newBtn.textContent = item;
  newBtn.setAttribute("type","submit");

  mainElement.appendChild(newBtn);
});

let playerChoices = document.querySelectorAll("button")

playerChoices.forEach(choice =>{
  choice.addEventListener("click", (event) =>{
    let playerChoice = event.target.textContent
    playGame(playerChoice, computerChoice)
  });
});

function playGame(playerChoice, computerChoice){
  computerChoice = choices[computerChoice];
  console.log(playerChoice, computerChoice)

  if(playerChoice === computerChoice){
    alert(`It's a tie. Player picked ${playerChoice}. Computer picked ${computerChoice}`)
  }else{
    switch (playerChoice){
      case "rock":{
        if (computerChoice === "scissors"){
          alert(`Player wins. Player picked ${playerChoice}. Computer picked ${computerChoice}`)
        }else {
          alert(`Computer wins. Player picked ${playerChoice}. Computer picked ${computerChoice}`)
        }
        break
      };
      case "paper":{
        if(computerChoice === "rock"){
          alert(`Player wins. Player picked ${playerChoice}. Computer picked ${computerChoice}`)
        }else {
          alert(`Computer wins. Player picked ${playerChoice}. Computer picked ${computerChoice}`)
        }
        break

      }; 
      case "scissors":{
        if(computerChoice === "paper"){
          alert(`Player wins. Player picked ${playerChoice}. Computer picked ${computerChoice}`)
        }else {
          alert(`Computer wins. Player picked ${playerChoice}. Computer picked ${computerChoice}`)
        }
        break
      };
    };
  };
  location.reload()
};

