const fs = require('node:fs');

const numberMap = {
  one: 'one1one',
  two: 'two2two',
  three: 'three3three',
  four: 'four4four',
  five: 'five5five',
  six: 'six6six',
  seven: 'seven7seven',
  eight: 'eight8eight',
  nine: 'nine9nine'
}

try {
  const data = fs.readFileSync('day1input.txt', 'utf8');
  const splitData = data.toString().split(/\r?\n/);

  let total = 0;
  splitData.forEach(line => total = total + findNumbers(line));

  console.log(total);
} catch(err) {
  console.log(err);
}

function findNumbers(line) {
  let join = 0;
  line = convertTextToDigits(line);
  line = line.replace(/\D/g, '');
  
  join = line[0] + line.slice(-1);
  return parseInt(join);
}

// Day 1, Part 2: reading left to right, replace text with digit if text spells number
// Edge case: overlapping numbers BOTH count 🤦‍♂️
// EX: fiveight = 58
function convertTextToDigits(line) {
  let newLine = line;
  Object.keys(numberMap).forEach( textNum => {
    const reggie = new RegExp(textNum, 'g');
    newLine = newLine.replace(reggie, numberMap[textNum]);
  })
  return newLine;
}

// Leftover from Day 1, Part 1
// function findDigits(line) {
//   let join = 0;
//   line = line.replace(/\D/g, '');
//   join = line[0] + line.slice(-1);
  
//   return parseInt(join);
// }