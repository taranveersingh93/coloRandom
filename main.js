//VARIABLES
var hexData = 'ABCDEF0123456789';
hexData = hexData.split('');
var currentPalette = [];
var boxes = document.querySelectorAll(".common");
var domHexCodes = document.querySelectorAll(".hexcode");
var button = document.querySelector(".new-palette-btn");
var paletteSection = document.querySelector(".color-boxes");
var current = document.querySelector('.current-palette-section')

console.log(current)
//event listener
button.addEventListener("click", displayPalette)
window.addEventListener("load", displayFirstPalette)
paletteSection.addEventListener("click", function(event) {
  changeIsLocked(event);
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

function loadBoxColors() {
  for (var i = 0; i < 5; i++) {
    currentPalette[i] = createColor()
  }
}

function reassignBoxColors() {
    for (var i = 0; i < 5; i++) {
    if (!currentPalette[i].isLocked) {
      currentPalette[i] = createColor();
    }
  }
}

function renderPalette() {
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = currentPalette[i].hexcode;
    domHexCodes[i].innerText = currentPalette[i].hexcode;
 }
}

function displayFirstPalette() {
  loadBoxColors();
  renderPalette();
}

function displayPalette() {
  reassignBoxColors();
  renderPalette();
}

function toggleIcon(event) {
  var targetID = parseInt(event.target.closest(".column").id);

  if (event.target.classList.contains("lock-icon") && currentPalette[targetID].isLocked) {
      event.target.src = "assets/locked.png"
  } else if (event.target.classList.contains("lock-icon") && !currentPalette[targetID].isLocked) {
      event.target.src = "assets/unlocked.png"
  } 
} 

function changeIsLocked(event) {
  if (event.target.classList.contains("lock-icon")) {
    var targetID = parseInt(event.target.closest(".column").id);
    currentPalette[targetID].isLocked = !currentPalette[targetID].isLocked;
  }
}
  
function showDomElement(element) {
  element.classList.remove("hidden");
}

function hideDomElement(element) {
  element.classList.add("hidden");
}




