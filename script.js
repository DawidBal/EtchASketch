function createGrid(gridNumber) {
    for (let i = 1; i <= gridNumber; i++) {
        for (let j = 0; j < gridNumber; j++) {
            const divCreation = document.createElement('div');
            divCreation.classList.add('grid');
            divCreation.classList.add('grid-lines');
            divContainer.appendChild(divCreation);
        }
    }
    // TODO: Change how to modify css styles dynamicilly
    divContainer.style.cssText = `grid-template-columns: repeat(${gridNumber}, 1fr);
                                  grid-template-rows: repeat(${gridNumber}, 1fr);`;
}

function changeColor(e) {
    e.target.classList.add('colored');
}

const divContainer = document.querySelector('.container');
createGrid(32);
const btnToggleLines = document.querySelector('.options__togglelines');
const gridItems = Array.from(document.querySelectorAll('.grid'));

gridItems.forEach(cell => cell.addEventListener('mouseover', changeColor));

btnToggleLines.addEventListener('click', (e) => {
    gridItems.forEach(cell => cell.classList.toggle('grid-lines'));
})





