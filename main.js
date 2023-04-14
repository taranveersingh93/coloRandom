//VARIABLES
var hexData = 'ABCDEF0123456789';
hexData = hexData.split('');
var currentPalette = [];
var savedPalettes = [];
var domColorBoxes = document.querySelectorAll(".common");
var domHexCodes = document.querySelectorAll(".hexcode");
var domNewPaletteButton = document.querySelector(".new-palette-btn");
var domPaletteSection = document.querySelector(".color-boxes");
var domSavePaletteButton = document.querySelector(".save-palette-btn");
var domSavedArea = document.querySelector(".saved-area");


//event listener
domNewPaletteButton.addEventListener("click", displayPalette);
window.addEventListener("load", displayFirstPalette);
domPaletteSection.addEventListener("click", function(event) {
  changeIsLocked(event);
  toggleIcon(event);
})
domSavePaletteButton.addEventListener("click", savePalette);

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
  for (var i = 0; i < domColorBoxes.length; i++) {
    domColorBoxes[i].style.backgroundColor = currentPalette[i].hexcode;
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

function savePalette() {
  savePaletteToArray();
  renderSavedPalettes();
}

function savePaletteToArray() {
  savedPalettes.push([...currentPalette]);
}

function createSinglePaletteHtml(singleSavedPalette) {
  var htmlCode = "";
  htmlCode = `<div class="small-box-container">`;
  for (var i = 0; i < singleSavedPalette.length; i++) {
    htmlCode += 
    `
    <div style="background:${singleSavedPalette[i].hexcode}"class="small-box"></div>
    `
  }
  htmlCode += "</div>"
  return htmlCode
}

function createAllPalettesHtml() {
  var htmlCode = "";
  for (var i = 0; i < savedPalettes.length; i++) {
    htmlCode += createSinglePaletteHtml(savedPalettes[i])
  }
  return htmlCode 
}

function renderSavedPalettes() {
  domSavedArea.innerHTML = createAllPalettesHtml(); 
}

  