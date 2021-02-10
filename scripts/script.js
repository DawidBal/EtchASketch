function createGrid(gridSize) {
  for (let i = 1; i <= gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const divCreation = document.createElement("div");
      divCreation.classList.add("container__cell");
      divCreation.classList.add("container__cell--outline");
      divContainer.appendChild(divCreation);
    }
  }
  divContainer.style.cssText = `grid-template-columns: repeat(${gridSize}, 1fr);
                                  grid-template-rows: repeat(${gridSize}, 1fr);`;
}

function addGridItemsEvents() {
  const gridItems = Array.from(document.querySelectorAll(".container__cell"));

  gridItems.forEach((cell) => cell.addEventListener("mouseover", changeColor));
  divContainer.addEventListener("mousedown", (e) => { leftMouseBtn = true; changeColor(e)});
  divContainer.addEventListener("mouseup", () => {leftMouseBtn = false});
  return gridItems;
}

function cellBackground(cell, color) {
  cell.style.cssText = `background-color: ${color}`;
}

function changeColor(e) {
  if (!leftMouseBtn) { return }
  
  const holdShift = e.shiftKey;
  const cell = e.target;
  const colorType = setRandomColor ? randomColor() : getColor();

  if (holdShift) {
    cell.style.cssText = "";
  } else {
    cellBackground(cell, colorType);
  }
}


function getColor() {
  return colorPicker.value;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function randomColor() {
  const r = Math.floor(Math.random() * 254);
  const g = Math.floor(Math.random() * 254);
  const b = Math.floor(Math.random() * 254);
  return `rgb(${r}, ${g}, ${b})`;
}

function setColorFromHistory(eventHandler, element, color) {
  element.addEventListener(eventHandler, () => {
    colorPicker.value = color;
  });
}

function showColorHistory() {
  const history = document.querySelector(".options__history");

  let i = colorHistory.colors.length - 1;
  for (; i < colorHistory.colors.length; i++) {
    if (colorHistory.buttons.length >= 5) {
      history.removeChild(colorHistory.buttons[0]);
      colorHistory.buttons.splice(0, 1);
    }
    const btn = document.createElement("button");
    btn.classList.add("history__color");
    btn.style.cssText = `background: ${colorHistory.colors[i]}`;
    setColorFromHistory("click", btn, colorHistory.colors[i]);
    colorHistory.buttons.push(btn);
    history.append(btn);
  }
}

const divContainer = document.querySelector(".container");
// Initial grid creation with default 16 rowsXcollumns
createGrid(16);
let grid = addGridItemsEvents();
// Options ref
const btnToggleLines = document.querySelector(".options__togglelines");
const btnClearGrid = document.querySelector(".options__clear");
const colorPicker = document.querySelector("#color");
const cellAmount = document.querySelector("#gsize");
const cboxRandomColor = document.querySelector("#togglerandom");
const sliderNum = document.querySelector(".sldnum");

let setRandomColor = false;
let leftMouseBtn = false;

const colorHistory = {
  colors: [],
  buttons: [],
};

const RGB_COLORS = {
  WHITE: "rgb(255, 255, 255)",
};

// * GRID TOGGLE LINES * //
btnToggleLines.addEventListener("click", () => {
  grid.forEach((cell) => cell.classList.toggle("container__cell--outline"));
});

// * GRID CELL COLOR ERASE * //
btnClearGrid.addEventListener("click", () => {
  grid.forEach(
    (cell) => (cell.style.cssText = `background-color: ${RGB_COLORS.WHITE}`)
  );
});

cboxRandomColor.addEventListener("click", () => {
  if (cboxRandomColor.checked) {
    setRandomColor = true;
  } else {
    setRandomColor = false;
  }
});

// * GRID CELL AMOUNT RESIZE * //
cellAmount.addEventListener("change", () => {
  sliderNum.textContent = cellAmount.value;
  removeAllChildNodes(divContainer);
  createGrid(cellAmount.value);
  grid = addGridItemsEvents();
});

colorPicker.addEventListener("change", () => {
  if (colorHistory.colors.length >= 5) {
    colorHistory.colors.shift();
  }
  colorHistory.colors.push(colorPicker.value);
  showColorHistory();
});
