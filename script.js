const container = document.getElementById('cells-container')
const containerSize = 600
container.style.width = `${containerSize}px`
container.style.height = `${containerSize}px`

let fillColor = 'rgb(97, 100, 110)'
let defaultBtn = 'rgb(230, 234, 238)'
let activeBtn = 'rgb(199, 206, 214)'

// SET THE CANVAS SIZE
let size = 16
let userSize = size
createCanvas(size)

function createCanvas(size) {
    for (let row = 0; row < size; row++) {
        const rowContainer = document.createElement('div')
        rowContainer.className = 'row-container'
    
        for (let col = 0; col < size; col++) {
            const cells = document.createElement('div')
            cells.className = 'cells'
            rowContainer.appendChild(cells)
        }
    container.appendChild(rowContainer)
    }
}

const sizeBtn = document.getElementById('size-btn')
sizeBtn.addEventListener('click', () => {
    getCanvasSize()
})

// SET NEW SIZE FROM USER'S INPUT
function getCanvasSize() {
    let input = window.prompt('what canvas size do you want?', '1 to 64')
    if (!isNaN(input) && input >= 1 && input <= 64) {
        cleanCanvas()
        createCanvas(input)
    } else {
        alert('it\'s not a number or it\'s not 1 to 64!')
        getCanvasSize()
    }
    userSize = input
}

// CLEAN THE CANVAS size
function cleanCanvas() {
    const rows = document.querySelectorAll('.row-container')
    rows.forEach((row) => {
        container.removeChild(row)
    })
}

// DRAWING DEFAULT COLOR
container.addEventListener('mousedown', changeColor)

container.addEventListener('mousedown', () => {
    container.addEventListener('mouseover', changeColor)
})
container.addEventListener('mouseup', () => {
    container.removeEventListener('mouseover', changeColor)
})

// CLEAN THE CANVAS color
const cleanBtn = document.getElementById('clean-btn')
cleanBtn.addEventListener('click', () => {
    cleanCanvas()
    createCanvas(userSize)
})

let currentMode = 'grey'

// ACTIVATE DEFAULT (GREY) MODE
const greyBtn = document.getElementById('grey-btn')
    greyBtn.style.backgroundColor = activeBtn
greyBtn.addEventListener('click', () => {
    currentMode = 'grey'
    greyBtn.style.backgroundColor = activeBtn
    rainbowBtn.style.backgroundColor = defaultBtn
    eraserBtn.style.backgroundColor = defaultBtn
})

// ACTIVATE RAINBOW MODE
const rainbowBtn = document.getElementById('rainbow-btn')
rainbowBtn.addEventListener('click', () => {
    currentMode = 'rainbow'
    greyBtn.style.backgroundColor = defaultBtn
    rainbowBtn.style.backgroundColor = activeBtn
    eraserBtn.style.backgroundColor = defaultBtn
})

// ACTIVATE ERASER
const eraserBtn = document.getElementById('eraser-btn')
eraserBtn.addEventListener('click', () => {
    currentMode = 'eraser'
    greyBtn.style.backgroundColor = defaultBtn
    rainbowBtn.style.backgroundColor = defaultBtn
    eraserBtn.style.backgroundColor = activeBtn
})

function changeColor(e) {
    if (currentMode === 'grey') {
        fillColor = 'rgb(97, 100, 110)'
    } else if (currentMode === 'rainbow') {
        let red = Math.floor(Math.random() * 256)
        let green = Math.floor(Math.random() * 256)
        let blue = Math.floor(Math.random() * 256)
        fillColor = `rgb(${red}, ${green}, ${blue})`
    } else if (currentMode === 'eraser') {
        fillColor = 'rgb(255, 255, 255)'
    } 
    e.target.style.backgroundColor = fillColor
}