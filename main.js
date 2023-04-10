//VARIABLES
var hexData = 'ABCDEF0123456789';
hexData = hexData.split('');





//Functions
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function generateHexCode() {
  var hexcode = '#'
  for(var i = 0; i < 6; i++) {
    hexcode += hexData[getRandomIndex(hexData)]
  }
  return hexcode
}

function createColor() {
  var color = {
    hexcode: generateHexCode(),
    id: Date.now()
  }
  return color
}
