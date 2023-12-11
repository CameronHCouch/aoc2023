const fs = require('node:fs');

try {
  const data = fs.readFileSync('day3input.txt', 'utf8');
  splitData = data.toString().split(/\r?\n/);

  let total = 0;
  splitData.forEach((line, idx) => total = total + sumValidNumbers(line, idx));

  console.log(total);
} catch(err) {
  console.log(err);
}

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
    if (line[i+1] && line[i+1].match(/\d/)) continue;
    
    if (currentNumberIsValid) lineTotal = lineTotal + parseInt(currentNumber);
    currentNumber = '';
    currentNumberIsValid = false;
  }

  return lineTotal;
}

function lookNorth(idx,i) {
  if (idx == 0) return false;

  return !![splitData[idx-1][i-1],
  splitData[idx-1][i],
  splitData[idx-1][i+1]].join('').match(/[^.\d]/g)
}

function lookSouth(idx,i) {
  if (idx == splitData.length - 1) return false;

  return !![splitData[idx+1][i-1],
  splitData[idx+1][i],
  splitData[idx+1][i+1]].join('').match(/[^.\d]/g)
}

function lookLeftRight(i, line) {
  return !![line[i-1], line[i+1]].join('').match(/[^.\d]/g);
}

// Regex for symbols
// symbols.match(/[^.\d]/g)

// General strategy for Day 3: find index of symbols and look left, topleft, top, topright, right, botright, bottom, botleft
// Things to do: duplicate-checking for diagonals
// Condensing numbers
// Replace symbol with period after ?