const divContainer = document.querySelector('.container');

function createGrid(gridNumber) {
    for (let i = 1; i <= gridNumber; i++) {
        for (let j = 0; j < gridNumber; j++) {
            const divCreation = document.createElement('div');
            divCreation.classList.add('grid');
            divCreation.textContent = i;
            divContainer.appendChild(divCreation);
        }
    }
    divContainer.style.cssText = `grid-template-columns: repeat(${gridNumber}, 32px);
                                  grid-template-rows: repeat(${gridNumber}, 32px);`;
}

createGrid(16);