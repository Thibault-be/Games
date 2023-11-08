let choices = ["rock", "paper", "scissors"];
const mainElement = document.querySelector("main");

let computerChoice = Math.floor(Math.random() * 3 +1)

choices.forEach(item =>{
  newBtn = document.createElement("button");
  newBtn.textContent = item;
  newBtn.setAttribute("type","submit");

  mainElement.appendChild(newBtn);
});

let playerChoices = document.querySelectorAll("button")
console.log(playerChoices)

playerChoices.forEach(choice =>{
  choice.addEventListener("click", (event) =>{
    console.log(event.target.textContent)
  })
})

