//VARIABLES
var hexData = 'ABCDEF0123456789';
hexData = hexData.split('');
var currentPalette = {
  colorArray: [],
  id: Date.now()
};
var boxes = document.querySelectorAll(".common");
var domHexCodes = document.querySelectorAll(".hexcode");
var button = document.querySelector(".new-palette-btn");
var paletteSection = document.querySelector(".color-boxes");


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



function reassignCurrentPalette() {
  currentPalette = {
    colorArray: [],
    id: Date.now()
  }
  reassignBoxColors();
}

function loadBoxColors() {
  for (var i = 0; i < 5; i++) {
    currentPalette.colorArray.push(createColor());
  }
}

function reassignBoxColors() {
  for (var i = 0; i < 5; i++) {
    if (!currentPalette.colorArray[i].isLocked) {
      currentPalette.colorArray[i] = createColor();
    }
  }
}

function renderPalette() {
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = currentPalette.colorArray[i].hexcode;
    domHexCodes[i].innerText = currentPalette.colorArray[i].hexcode;
 }
}

function displayPalette() {
  reassignBoxColors();
  renderPalette();
}

function displayFirstPalette() {
  loadBoxColors();
  renderPalette();
}

function toggleIcon(event) {
  var targetID = parseInt(event.target.closest(".column").id);

  if (event.target.classList.contains("lock-icon") && currentPalette.colorArray[targetID].isLocked) {
      event.target.src = "assets/locked.png"
      //console.log(currentPalette.colorArray[targetID].isLocked)
  } else if (event.target.classList.contains("lock-icon") && !currentPalette.colorArray[targetID].isLocked) {
      event.target.src = "assets/unlocked.png"
      //console.log(currentPalette.colorArray[targetID].isLocked)
  } 
} 

function changeIsLocked(event) {
  
  if(event.target.classList.contains("lock-icon")) {
    var targetID = parseInt(event.target.closest(".column").id);
    currentPalette.colorArray[targetID].isLocked = !currentPalette.colorArray[targetID].isLocked;
  }
  
}
  
function showDomElement(element) {
  element.classList.remove("hidden");
}

function hideDomElement(element) {
  element.classList.add("hidden");
}




