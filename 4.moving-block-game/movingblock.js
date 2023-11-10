gridSizes = [16,32,64,128]

//global variables
let header = document.querySelector("header");
let main = document.querySelector("main");
let playerPosition = []

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
  playerPosition = [colPosition, rowPosition]
  return playerPosition;
};


drawGrid();

function drawGrid(){
  playerPosition = playerStartPosition(32);
  console.log(playerPosition)

  for(let i = 0; i < 32; i++){
    let newRow = document.createElement("div");
    newRow.setAttribute("class", `row row${i}`)

    for (let j = 0; j<32; j++){
      newTile = document.createElement("div");

      if(i=== playerPosition[1] && j===playerPosition[0]){
        newTile.setAttribute("class",`player col${j} row${i}`);
        //newTile.setAttribute("style", "background-color: black")
        
      }else{
        newTile.setAttribute("class", `cell col${j} row${i}`);
      };
0
      // j === playerPosition[0] && i === playerPosition[1] 
      //   ? newTile.setAttribute("class",`player col${j} row${i}`)           
      //   : newTile.setAttribute("class", `cell col${j} row${i}`);

      
      newRow.appendChild(newTile);
    };
  gridContainer.appendChild(newRow);
  };

}



