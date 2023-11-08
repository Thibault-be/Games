let randNumber = Math.floor(Math.random() * 25+1)

let playerGuessElement = document.querySelector("input");

function guess(){
  let playerGuess = Number(playerGuessElement.value);


  if(playerGuess === randNumber){
    alert(`you win. ${playerGuess} was correct`)
  }else if (playerGuess === randNumber-1 || playerGuess === randNumber+1){
    alert("so close")    
  }else{
    alert(`${playerGuess} wasn't even close. Should've been ${randNumber}`)
  }
  location.reload();
}


const submitBtn = document.querySelector("button");
submitBtn.addEventListener("click", () =>{
  guess()
})
