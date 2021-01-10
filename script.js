function createGrid(gridNumber) {
    for (let i = 1; i <= gridNumber; i++) {
        for (let j = 0; j < gridNumber; j++) {
            const divCreation = document.createElement('div');
            divCreation.classList.add('grid');
            divContainer.appendChild(divCreation);
        }
    }
    // TODO: Change how to modify css styles dynamicilly
    divContainer.style.cssText = `grid-template-columns: repeat(${gridNumber}, 32px);
                                  grid-template-rows: repeat(${gridNumber}, 32px);`;
}

function changeColor(e) {
    e.target.classList.add('colored');
}

const divContainer = document.querySelector('.container');

createGrid(32);

const gridItems = Array.from(document.querySelectorAll('.grid'));
gridItems.forEach(cell => cell.addEventListener('mouseover', changeColor));

