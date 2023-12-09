const fs = require('node:fs');

try {
  const data = fs.readFileSync('day2input.txt', 'utf8');
  const splitData = data.toString().split(/\r?\n/);

  let total = 0;
  splitData.forEach(line => total = total + findCube(line));

  console.log(total);
} catch(err) {
  console.log(err);
}

// Day 2 Part 2: find the minimum required cubes for each color and multiply. 
// Sum the cubes of all games in the try block above
function findCube(game) {
  let minRed = 0;
  let minGreen = 0;
  let minBlue = 0;

  for (round of game.split(';')) {
    let redSplit = round.split(' red');
    if (redSplit.length > 1) {
      let red = parseInt(redSplit[0].match(/\d+$/)[0]);
      if (red > minRed) minRed = red;
    }

    let greenSplit = round.split(' green');
    if (greenSplit.length > 1) {
      let green = parseInt(greenSplit[0].match(/\d+$/)[0]);
      if (green > minGreen) minGreen = green;
    }

    let blueSplit = round.split(' blue');
    if (blueSplit.length > 1) {
      let blue = parseInt(blueSplit[0].match(/\d+$/)[0]);
      if (blue > minBlue) minBlue = blue;
    }
  }

  return minRed*minGreen*minBlue;
}

// Day 2, Part 1. Evaluate whether a game is possible with the limited set of pieces.
// If possible, return the ID of the game. Sum all possible game IDs in try block above.
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
