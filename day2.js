const fs = require('node:fs');

try {
  const data = fs.readFileSync('day2input.txt', 'utf8');
  const splitData = data.toString().split(/\r?\n/);

  let total = 0;
  splitData.forEach(line => total = total + evaluateGame(line));

  console.log(total);
} catch(err) {
  console.log(err);
}

function evaluateGame(game) {
  let maxRed = 12;
  let maxGreen = 13;
  let maxBlue = 14;
  let gameId = parseInt(game.match(/\d+/)[0]);

  for (round of game.split(';')) {
    let redSplit = round.split(' red')
    if (redSplit.length > 1) {
      let red = redSplit[0].match(/\d+$/)[0];
      if (red > maxRed) return 0;
    }

    let greenSplit = round.split(' green')
    if (greenSplit.length > 1) {
      let green = greenSplit[0].match(/\d+$/)[0];
      if (green > maxGreen) return 0;
    }

    let blueSplit = round.split(' blue')
    if (blueSplit.length > 1) {
      let blue = blueSplit[0].match(/\d+$/)[0]
      if (blue > maxBlue) return 0;
    }
  }

  return gameId;
}



// 12 red;
// 13 green;
// 14 blue;
