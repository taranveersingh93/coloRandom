//VARIABLES
var hexData = 'ABCDEF0123456789';
hexData = hexData.split('');
var currentPalette = [];
var savedPalettes = [];

// DOM elements 
var domColorBoxes = document.querySelectorAll(".color-box");
var domHexCodes = document.querySelectorAll(".hexcode");
var domNewPaletteButton = document.querySelector(".new-palette-btn");
var domPaletteSection = document.querySelector(".color-boxes");
var domSavePaletteButton = document.querySelector(".save-palette-btn");
var domSavedArea = document.querySelector(".saved-area");
var domSavedPaletteHeading = document.querySelector(".saved-palette-heading");
var domNoSavedPaletteHeading = document.querySelector('.no-saved-palette-heading');
var domLockIcons = document.querySelectorAll(".lock-icon");

//Event listeners
domNewPaletteButton.addEventListener("click", generateNewPalette);
window.addEventListener("load", generateNewPalette);
domPaletteSection.addEventListener("click", function(event) {
  toggleThisBox(event);
});
domSavePaletteButton.addEventListener("click", savePalette);
domSavedArea.addEventListener('click', function(event) {
  removeThisPalette(event);
  reloadSavedPalette(event);
})

//FUNCTIONS
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function generateHexCode() {
  var hexcode = '#'
  for (var i = 0; i < 6; i++) {
    hexcode += hexData[getRandomIndex(hexData)];
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
  var temporaryPalette = [];
    for (var i = 0; i < 5; i++) {
    if (!currentPalette[i]?.isLocked) {
      temporaryPalette[i] = createColor();
    } else {
      temporaryPalette[i] = currentPalette[i];
    }
  }
  return temporaryPalette;
}

function reassignBoxColors() {
  currentPalette = loadBoxColors();
}

function renderPalette() {
  for (var i = 0; i < domColorBoxes.length; i++) {
    domColorBoxes[i].style.backgroundColor = currentPalette[i].hexcode;
    domHexCodes[i].innerText = currentPalette[i].hexcode;

    if(currentPalette[i].isLocked) {
      domLockIcons[i].src = "assets/locked.png" 
    } else {
      domLockIcons[i].src = "assets/unlocked.png"
    }
 }
}

function generateNewPalette() {
  reassignBoxColors();
  renderPalette();
}

function editClonedPalette(event, palette) {
  var temporaryPalette = [];
    var targetID = Number(event.target.closest(".color-card").id);
    for (var i = 0; i < palette.length; i++) {
      temporaryPalette[i] = createColor();
      temporaryPalette[i].hexcode = palette[i].hexcode;
      if (i === targetID) {
        temporaryPalette[i].isLocked = !palette[i].isLocked;      
      } else {
        temporaryPalette[i].isLocked = palette[i].isLocked;
      }
    }
    return temporaryPalette;
}

function toggleLockProperty(event, palette) {
  if (event.target.classList.contains("lock-icon")) {
    return editClonedPalette(event, palette);
   } else {
    return palette;
   }
}


function toggleLockIcon(event) {
  var targetID = parseInt(event.target.closest(".color-card").id);

  if (event.target.classList.contains("lock-icon") && currentPalette[targetID].isLocked) {
      event.target.src = "assets/locked.png";
  } else if (event.target.classList.contains("lock-icon") && !currentPalette[targetID].isLocked) {
      event.target.src = "assets/unlocked.png";
  } 
} 


function updateBanner() {
  showDomElement(domSavedPaletteHeading);
  hideDomElement(domNoSavedPaletteHeading);
}

function checkForSavedDuplicates(inputPalette) {
  for (var i = 0; i < savedPalettes.length; i++) {
    if ((JSON.stringify(savedPalettes[i].description) === JSON.stringify(inputPalette))) {
      return true;
    }
  }
  return false;
}

function createPaletteID(inputPalette) {
  var createPalette = {
    description: inputPalette,
    id: Date.now()
  };
  return createPalette;
}

function savePaletteToArray() {
  if (!checkForSavedDuplicates(currentPalette)) {
    savedPalettes.push(createPaletteID(currentPalette));
  } 
}  

function createSinglePaletteHtml(singleSavedPalette) {
  var htmlCode = "";
  htmlCode = 
  `
  <div class="small-box-container" id=${singleSavedPalette.id}>
  <div class="single-saved-palette">
  `;
  for (var i = 0; i < singleSavedPalette.description.length; i++) {
    htmlCode += 
    `
    <div style="background:${singleSavedPalette.description[i].hexcode}"class="single-small-box"></div>
    `
  }
  htmlCode += 
  `
  </div>
  <img class="delete-icon" src="assets/delete.png">
  </div>
  `
  return htmlCode;
}

function createAllPalettesHtml() {
  var htmlCode = "";
  for (var i = 0; i < savedPalettes.length; i++) {
    htmlCode += createSinglePaletteHtml(savedPalettes[i]);
  }
  return htmlCode;
}

function renderSavedPalettes() {
  domSavedArea.innerHTML = createAllPalettesHtml(); 
}

function savePalette() {
  updateBanner();
  savePaletteToArray();
  renderSavedPalettes();
  generateNewPalette();
}

function deleteFromSavedPalettes(event) {
  if (event.target.classList.contains('delete-icon')) {
    var individualPaletteId = event.target.closest('.small-box-container').id
    for (var i = 0; i < savedPalettes.length; i++) {  
      if (savedPalettes[i].id === Number(individualPaletteId)) {
        savedPalettes.splice(i,1);
      } 
    }
  }
}

function removeThisPalette(event) {
  deleteFromSavedPalettes(event);
  renderSavedPalettes();
}

function reloadSavedPalette(event) {
  assignToCurrentPalette(event);
  renderPalette();
}

function assignToCurrentPalette(event) {
  if (event.target.classList.contains('single-small-box') || event.target.classList.contains('single-saved-palette'))  {
    var individualPaletteId = event.target.closest('.small-box-container').id
      for (var i = 0; i < savedPalettes.length; i++) {
        if (savedPalettes[i].id === Number(individualPaletteId)) {
          currentPalette = savedPalettes[i].description
        }
      }
    }
  }
  
function showDomElement(element) {
      element.classList.remove("hidden");
}
    
function hideDomElement(element) {
      element.classList.add("hidden");
}
  

