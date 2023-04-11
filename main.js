//VARIABLES
var hexData = 'ABCDEF0123456789';
hexData = hexData.split('');
var currentPalette = {};
// var box1 = document.querySelector('.box-one');
// var box2 = document.querySelector('.box-two');
// var box3 = document.querySelector('.box-three');
// var box4 = document.querySelector('.box-four');
// var box5 = document.querySelector('box-five');
var boxes = document.querySelectorAll(".common")


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
   currentPalette.push(createColor())
  }
}

function reassignCurrentPalette() {
  currentPalette = {
    colorArray: reassignBoxColors(),
    id: Date.now()
  }
}

function renderPalette() {
  for (var i = 0; i < currentPalette.length; i++) {
  boxes[i].style.backgroundColor = currentPalette[i].hexcode;
  }
}

function displayPalette() {
  reassignCurrentPalette();
  renderPalette();
}