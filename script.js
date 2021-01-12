function createGrid(gridSize) {
    for (let i = 1; i <= gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const divCreation = document.createElement('div');
            divCreation.classList.add('grid');
            divCreation.classList.add('grid-lines');
            divContainer.appendChild(divCreation);
        }
    }
    // TODO: Change how to modify css styles dynamicilly
    divContainer.style.cssText = `grid-template-columns: repeat(${gridSize}, 1fr);
                                  grid-template-rows: repeat(${gridSize}, 1fr);`;

    const gridItems = Array.from(document.querySelectorAll('.grid'));
    
    gridItems.forEach(cell => cell.addEventListener('mousedown', (e) => {
        leftMouseBtn = true;
        changeColor(e);
        gridItems.forEach(cell => cell.addEventListener('mouseover', changeColor));
        
    }));
    document.body.addEventListener('mouseup', (e) => {
        leftMouseBtn = false;
        gridItems.forEach(cell => cell.removeEventListener('mouseover', changeColor));
    });
    return gridItems;
}

function changeColor(e) {
    if (leftMouseBtn) {
        if (e.shiftKey) {
            e.target.style.cssText = `background-color: rgb(255, 255, 255)`;
        }
        else {
            if (setRandomColor) {
                e.target.style.cssText = `background-color: ${randomColor()}`;;
            }
            else {
                e.target.style.cssText = `background-color: ${getColor()}`;
            }
        }
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

const divContainer = document.querySelector('.container');
// Initial grid creation with default 16 rowsXcollumns
let grid = createGrid(16);

// Options ref
const btnToggleLines = document.querySelector('.options__togglelines');
const btnClearGrid = document.querySelector('.options__clear');
const colorPicker = document.querySelector('#colorpicker');
const cellAmount = document.querySelector('#cellamount');
const cboxRandomColor = document.querySelector('#randomcolor');
const sliderNum = document.querySelector('.sldnum');
let setRandomColor = false;
let leftMouseBtn = false;

// * GRID TOGGLE LINES * //
btnToggleLines.addEventListener('click', () => {
    grid.forEach(cell => cell.classList.toggle('grid-lines'));
});

// * GRID CELL COLOR ERASE * //
btnClearGrid.addEventListener('click', () => {
    grid.forEach(cell => cell.style.cssText = "background-color: rgb(255, 255, 255)");
});

cboxRandomColor.addEventListener('click', () => {
    if (cboxRandomColor.checked) {
        setRandomColor = true;
    }
    else {
        setRandomColor = false;
        console.log("Now im false!");
    }
})

// * GRID CELL AMOUNT RESIZE * //
cellAmount.addEventListener('change', () => {
    sliderNum.textContent = cellAmount.value;
    removeAllChildNodes(divContainer);
    grid = createGrid(cellAmount.value);
});





