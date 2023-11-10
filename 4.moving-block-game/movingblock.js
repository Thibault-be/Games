gridSizes = [16,32,64,128]

//global variables
const body = document.querySelector("body");
let header = document.querySelector("header");
let main = document.querySelector("main");
let playerPositionCoordinates = [];
let adjacentTileCoordinates = [];
let playerPositionElement;

//skeleton elements
let btnContainer = document.createElement("div");
btnContainer.setAttribute("class", "btn-container")

let gridContainer = document.createElement("div");
gridContainer.setAttribute("class", "grid-container")

header.appendChild(btnContainer);
main.appendChild(gridContainer);

/***********************************************************************
FUNCTIONS for alternative grid sizes commented out inside this functions
************************************************************************/
function commentedOutFunctionsInside(){
  // //create buttons for the grid sizes
// gridSizes.forEach(size =>{
//   let newBtn = document.createElement("button");
//   newBtn.textContent = `${size} x ${size}`
//   newBtn.setAttribute("class", `grid-button ${size}` )
//   btnContainer.appendChild(newBtn);
// });

// //add evenListener to the buttons
// let newGrid = document.querySelectorAll(".grid-button");
// newGrid.forEach(gridBtn =>{
//   gridBtn.addEventListener("click", () =>{
//     let size = gridBtn.classList[1];
//     removeCurrentGrid()
//     drawGrid(size);
//   })
// });

// const drawGrid = (size) => {
  
//   for(let i = 0; i < size; i++){
//     let newRow = document.createElement("div");
//     newRow.setAttribute("class", "row")

//     for (let j = 0; j<size; j++){
//       newTile = document.createElement("div");
//       newTile.setAttribute("class", `cell col${i} row${j}`);
//       newRow.appendChild(newTile);
//     };
//   gridContainer.appendChild(newRow);
//   };
// };

// const removeCurrentGrid = () =>{
//   while(gridContainer.firstChild){
//     gridContainer.removeChild(gridContainer.children[0])
//   };
// };

}
/***********************************************************************
FUNCTIONS for alternative grid sizes commented out inside this functions
************************************************************************/

const playerStartPosition = (size) =>{
  let colPosition = Math.floor(Math.random() * (size))
  let rowPosition = Math.floor(Math.random() * (size))
  playerPositionCoordinates = [colPosition, rowPosition]
  return playerPositionCoordinates;
};

const findPlayerPosition = () =>{
  let playerElement = document.querySelector(".player");
  let playerCol = Number(playerElement.classList[1].slice(-2,));
  let playerRow = Number(playerElement.classList[2].slice(-2,));
  playerPositionCoordinates = [playerCol, playerRow];

  playerPositionCoordinates = [10,10]

  return playerPositionCoordinates;
};

const findAdjacentTileCoordinates = (playerPositionCoordinates, direction) =>{

  console.log("in find adj", playerPositionCoordinates)
  let pRow = playerPositionCoordinates[1];
  let pCol = playerPositionCoordinates[0];
  console.log(direction)

  switch(direction){
    case "ArrowUp": adjacentTileCoordinates = [pCol, pRow-1]
      break;
    case "ArrowDown": adjacentTileCoordinates = [pCol, pRow+1]
      break;
    case "ArrowLeft": adjacentTileCoordinates = [pCol-1, pRow]
      break;
    case "ArrowRight": adjacentTileCoordinates = [pCol+1, pRow]
      break;
  };
  console.log("adjcor",adjacentTileCoordinates)
};

function drawGrid(){
  playerPositionCoordinates = playerStartPosition(32);
  console.log(playerPositionCoordinates)

  for(let i = 0; i < 32; i++){
    let newRow = document.createElement("div");
    newRow.setAttribute("class", `row row${i}`)

    for (let j = 0; j<32; j++){
      newTile = document.createElement("div");
      newTile.setAttribute("class", i === playerPositionCoordinates[1] && j === playerPositionCoordinates[0] 
        ? `player col${j} row${i}` 
        : `cell col${j} row${i}`);   
      newRow.appendChild(newTile);
    };
  gridContainer.appendChild(newRow);
  };
};

drawGrid();

body.addEventListener("keyup", (event) =>{
  movePlayer(event.code);

});

const movePlayer = (direction) => {
  playerPositionCoordinates = findPlayerPosition();
  console.log("moveplayer", playerPositionCoordinates)
  adjacentTileCoordinates = findAdjacentTileCoordinates(playerPositionCoordinates, direction);

  switch(direction){
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowLeft":
    case "ArrowRight":
  };
};