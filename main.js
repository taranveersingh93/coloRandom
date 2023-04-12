//VARIABLES
var hexData = 'ABCDEF0123456789';
hexData = hexData.split('');
var currentPalette = {};
var boxes = document.querySelectorAll(".common");
var domHexCodes = document.querySelectorAll(".hexcode");
var button = document.querySelector(".new-palette-btn");
var paletteSection = document.querySelector(".color-boxes");


//event listener
button.addEventListener("click", displayPalette)
window.addEventListener("load", displayPalette)
paletteSection.addEventListener("click", function(event) {
  toggleIcon(event)
})

//FUNCTIONS
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function generateHexCode() {
  var hexcode = '#'
  for(var i = 0; i < 6; i++) {
    hexcode += hexData[getRandomIndex(hexData)]
  }
  return hexcode;
}

function createColor() {
  var color = {
    hexcode: generateHexCode(),
    isLocked: false
  }
  return color;
}

function reassignBoxColors() {
  for (var i = 0; i < 5; i++) {
   currentPalette.colorArray.push(createColor())
  }
}

function reassignCurrentPalette() {
  currentPalette = {
    colorArray: [],
    id: Date.now()
  }
  reassignBoxColors();
}

function renderPalette() {
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = currentPalette.colorArray[i].hexcode;
    domHexCodes[i].innerText = currentPalette.colorArray[i].hexcode;
 }
}

function displayPalette() {
  reassignCurrentPalette();
  renderPalette();
}

function toggleIcon(event) {
  if (event.target.classList.contains("lock-icon") && event.target.src.includes("assets/unlocked.png")) {
        event.target.src = "assets/locked.png"
  } else if (event.target.classList.contains("lock-icon") && event.target.src.includes("assets/locked.png")) {
        event.target.src = "assets/unlocked.png"
  } 
} 
  
function showDomElement(element) {
  element.classList.remove("hidden");
}

function hideDomElement(element) {
  element.classList.add("hidden");
}




