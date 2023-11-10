gridSizes = [16,32,64,128]
let header = document.querySelector("header");
let main = document.querySelector("main");

//skeleton elements
let btnContainer = document.createElement("div");
btnContainer.setAttribute("class", "btn-container")

let gridContainer = document.createElement("div");
gridContainer.setAttribute("class", "grid-container")


header.appendChild(btnContainer);
main.appendChild(gridContainer);


//create buttons for the grid sizes
gridSizes.forEach(size =>{
  let newBtn = document.createElement("button");
  newBtn.textContent = `${size} x ${size}`
  newBtn.setAttribute("class", `grid-button ${size}` )
  btnContainer.appendChild(newBtn);
});


//add evenListener to the buttons
let newGrid = document.querySelectorAll(".grid-button");
newGrid.forEach(gridBtn =>{
  gridBtn.addEventListener("click", () =>{
    let size = gridBtn.classList[1];
    removeCurrentGrid()
    drawGrid(size);
  })
});

const drawGrid = (size) => {
  
  for(let i = 0; i < size; i++){
    let newRow = document.createElement("div");
    newRow.setAttribute("class", "row")

    for (let j = 0; j<size; j++){
      newTile = document.createElement("div");
      newTile.setAttribute("class", `cell col${i} row${j}`);
      newRow.appendChild(newTile);
    };
  gridContainer.appendChild(newRow);
  };
};

const removeCurrentGrid = () =>{
  while(gridContainer.firstChild){
    gridContainer.removeChild(gridContainer.children[0])
  };
};

// while(node.firstChild) {
//   node.removeChild(node.firstChild);
// }