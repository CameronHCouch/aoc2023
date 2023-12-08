const fs = require('node:fs');

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
  line = line.replace(/\D/g, '');
  join = line[0] + line.slice(-1);
  
  return parseInt(join);
}