const fs = require('node:fs');

try {
  const data = fs.readFileSync('day3input.txt', 'utf8');
  splitData = data.toString().split(/\r?\n/);

  let total = 0;
  splitData.forEach((line, idx) => total = total + findGearRatio(line, idx));

  console.log(total);
} catch(err) {
  console.log(err);
}

// Day 3, Part 1: Sum all numbers next to a symbol
function sumValidNumbers(line, idx) {
  let lineTotal = 0;
  let currentNumber = '';
  let currentNumberIsValid = false;

  for (let i = 0; i < line.length; i++) {
    let char = line[i];
    // if not a number, reset current number and move on
    if (char.match(/\D/)) {
      currentNumber = '';
      currentNumberIsValid = false;
      continue;
    }

    currentNumber = currentNumber + char;

    // we must check if every digit in the number is next to a valid symbol
    if (currentNumberIsValid || lookNorth(idx,i) || 
        lookLeftRight(i, line) || lookSouth(idx, i)) {
          currentNumberIsValid = true;
    }

    // don't add number yet if we still need to build it up!
    if (isNumber(line[i+1])) continue;
    
    if (currentNumberIsValid) lineTotal = lineTotal + parseInt(currentNumber);
    currentNumber = '';
    currentNumberIsValid = false;
  }

  return lineTotal;
}

// Regex below checks that chars are NOT a period and are NOT a number
function lookNorth(idx,i) {
  if (idx == 0) return false;

  return !!(splitData[idx-1].slice(i-1, i+2).match(/[^.\d]/g));
}

function lookSouth(idx,i) {
  if (idx == splitData.length - 1) return false;

  return !!(splitData[idx+1].slice(i-1, i+2).match(/[^.\d]/g));
}

function lookLeftRight(i, line) {
  return !![line[i-1], line[i+1]].join('').match(/[^.\d]/g);
}


// Day 3, Part 2: Gear Foolishness

function findGearRatio(line, idx) {
  let lineTotal = 0;

  for (let i = 0; i < line.length; i++) {
    if (line[i].match(/[^\*]/)) continue;

    let neighbors = [gearLookNorth(idx,i),
                    gearLookSouth(idx,i), 
                    gearLookLeft(idx, i), 
                    gearLookRight(idx, i)].flat().filter(a => a !== null);

    if (neighbors.length == 2) lineTotal = lineTotal + neighbors.reduce((a,b) => a * b);
  } 

  return lineTotal;
}

function gearLookLeft(idx, i) {
  if (!isNumber(splitData[idx][i-1])) return null;

  return buildNumLeft(idx, i-1);
}

function gearLookRight(idx, i) {
  if (!isNumber(splitData[idx][i+1])) return null;

  return buildNumRight(idx, i+1);
}

function gearLookSouth(idx, i) {
  if (idx == splitData.length - 1) return null;

  return gearLookNorthOrSouth(idx+1, i);
}

function gearLookNorth(idx, i) {
  if (idx == 0 ) return null;
  
  return gearLookNorthOrSouth(idx-1, i);
}

function gearLookNorthOrSouth(idx, i) {
  let numberNeighbors = [...splitData[idx].slice(i-1, i+2).matchAll(/\d/g)];
  
  switch (numberNeighbors.length) {
    case 1:
      let numIdx = i - 1 + numberNeighbors[0].index;
      let leftChar = splitData[idx][numIdx-1];
      let rightChar = splitData[idx][numIdx+1];

      if (leftChar == "." && rightChar == ".") return numberNeighbors[0][0];

      if (isNumber(leftChar)) return buildNumLeft(idx, numIdx);
      if (isNumber(rightChar)) return buildNumRight(idx, numIdx);

    case 2:
        // if a period separates the numbers, then we are next to two diff nums
        if (splitData[idx][i] == ".") {
          return [buildNumLeft(idx,i-1), buildNumRight(idx,i+1)];
        }
  
        if (splitData[idx][i-1] == ".") {
          return buildNumRight(idx,i);
        }
        if (splitData[idx][i+1] == ".") {
          return buildNumLeft(idx,i);
        }

    case 3:
      return splitData[idx].slice(i-1, i+2);

    default:
      return null;
  }
}

function buildNumLeft(idx, i){
  let currentNumber = splitData[idx][i];

  while (isNumber(splitData[idx][i-1])) {
    currentNumber = splitData[idx][i-1] + currentNumber;
    i--;
  };

  return currentNumber;
}

function buildNumRight(idx, i){
  let currentNumber = splitData[idx][i];

  while (isNumber(splitData[idx][i+1])) {
    currentNumber = currentNumber + splitData[idx][i+1];
    i++;
  };

  return currentNumber;
}

function isNumber(char) {
  return !!(char && char.match(/\d/));
}



// Regex for symbols
// symbols.match(/[^.\d]/g)

// General strategy for Day 3: find index of symbols and look left, topleft, top, topright, right, botright, bottom, botleft
// Things to do: duplicate-checking for diagonals
// Condensing numbers