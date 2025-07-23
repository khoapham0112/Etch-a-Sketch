let bigGrid = document.querySelector("#grid");
let singleColourbtn = document.querySelector("#singleColour");
let randomizeColourbtn = document.querySelector("#randomizeColour");
let darkenColourbtn = document.querySelector("#darkenColour");
let Sizebtn = document.querySelector("#Size");
let sizeText = document.querySelector("#sizeText");
let Resetbtn = document.querySelector("#Reset");
let colorInput = document.querySelector("#penColor");

let defaultSize = 16;
let currentMode;

function createGrid(size) {
    bigGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    bigGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for( let i = 1; i <= size * size; i++){
        const gridElements = document.createElement("div");
        gridElements.classList.add('grid-element');
        gridElements.addEventListener('mouseover', changeColor);
        bigGrid.appendChild(gridElements);
    }
}

function changeSize() {
    let gridSize = prompt("New size (1-100):");
    if( gridSize >= 1 && gridSize <= 100 && !isNaN(gridSize)){
        bigGrid.replaceChildren();
        createGrid(gridSize);
        text(gridSize);
    } else {
        alert("Wrong Size!");
    }
}

Sizebtn.addEventListener("click", changeSize);

function changeColor(e) {
    let Red = Math.floor(Math.random() * 256);
    let Green = Math.floor(Math.random() * 256);  
    let Blue = Math.floor(Math.random() * 256);

    if(currentMode == "Single Colour") {
        let selectedColor = colorInput.value;
        e.target.style.backgroundColor = `${selectedColor}`;
    } else if ( currentMode == "Random Colour") {
        e.target.style.backgroundColor = `rgb(${Red}, ${Green}, ${Blue})`; 
    } else if ( currentMode == "Dark Colour"){
    if (e.target.style.backgroundColor.match(/rgba/)) {
        let currentOpacity = Number(e.target.style.backgroundColor.slice(-4, -1));
            if (currentOpacity <= 0.9) {
                e.target.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                e.target.classList.add('gray');
            }
            } else if (e.target.classList.contains('gray') && e.target.style.backgroundColor == 'rgb(0, 0, 0)') {
                return;
            } else {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
            }
    }    
} 

singleColourbtn.addEventListener("click", () => {
    currentMode = "Single Colour";
    singleColourbtn.classList.add("active");
    randomizeColourbtn.classList.remove('active');
    darkenColourbtn.classList.remove("active");
})

randomizeColourbtn.addEventListener("click", () => {
    currentMode = "Random Colour";
    singleColourbtn.classList.remove("active");
    randomizeColourbtn.classList.add('active');
    darkenColourbtn.classList.remove("active");
})

darkenColourbtn.addEventListener("click", () => {
    currentMode = "Dark Colour";
    singleColourbtn.classList.remove("active");
    randomizeColourbtn.classList.remove('active');
    darkenColourbtn.classList.add("active");
})

function text(size) {
    sizeText.textContent = "Size: " + size + "x" + size;
}

window.onload = () => {
    createGrid(defaultSize);
    text(defaultSize);
    currentMode = "Single Colour";
    singleColourbtn.classList.add('active');
}

function reset(){
    const grids = Array.from(bigGrid.children);
    grids.forEach(grid => {
        grid.style.backgroundColor = "white";
    })
}

Resetbtn.addEventListener("click", reset);
