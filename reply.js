// Need to install Node.js
// To run this code. Type node reply.js in the terminal

// Naive solution
// Avoid worm holes
// Stay within bounds of matrix
// Don't consider weight of each cell. Only consider if cell is occupied or not
// Move 1 cell at a time, Either Up, Down, Left, Right

// file_name = "00-example.txt";
file_name = "01-chilling-cat.txt";
// file_name = "02-swarming-ant.txt";
// file_name = "03-input-anti-greedy.txt";
// file_name = "04-input-low-points.txt";
// file_name = "05-input-opposite-points-holes.txt";
// file_name = "06-input-reply-running-man.txt";

const fs = require("fs");
let input_raw = "";

// Read in raw text
try {
  input_raw = fs.readFileSync(file_name, { encoding: "utf8", flag: "r" });
} catch (err) {
  console.error(err);
}

// Use this line of code ONLY for file_name = "00-example.txt";
// input_raw = input_raw.split("\r\n");
// Use this line of code for all others
input_raw = input_raw.split("\n");

let input_arr = [];
let input_row = "";

// Convert string to array of characters
for (let i = 0; i < input_raw.length; i++) {
  input_row = input_raw[i].split(" ");
  if (input_row.length > 1) {
    input_arr.push(input_row);
  }
}

const no_cols = parseInt(input_arr[0][0], 10);
const no_rows = parseInt(input_arr[0][1], 10);
const no_snakes = parseInt(input_arr[0][2], 10);

// Crate snakes array containing the lengths of the snakes
let snakes = [];
for (let i = 0; i < no_snakes; i++) {
  snakes.push(parseInt(input_arr[1][i], 10));
}

// Create matrix indicating cells which are occupied.
let matrix = [];
for (let i = 0; i < no_rows; i++) {
  matrix.push([]);
  for (let j = 0; j < no_cols; j++) {
    // [row, col]
    // Avoid all worm holes (*)
    // Set 1 if cell contains * else set to 0
    if (input_arr[2 + i][j] === "*") {
      matrix[i][j] = 1;
    } else {
      matrix[i][j] = 0;
    }
  }
}

// Array of array keeping track of snake head position and movement
// E.g.
// [
// [0 0 R R R R R],
// [6 0 R R R D L L],
// [0 1 R D R R],
// [3 1 R R],
// [6 1 D L],
// ]
let snake_paths = [];

// Keep track of the head of the snake
let current_pos = [0, 0];

// Find the 1st cell in the matrix that is not occupied
const findFreePosition = () => {
  for (let i = 0; i < no_rows; i++) {
    for (let j = 0; j < no_cols; j++) {
      if (matrix[i][j] === 0) {
        return [i, j];
      }
    }
  }
};

for (let k = 0; k < snakes.length; k++) {
  snake_paths.push([]);
  let snake = snakes[k];
  for (let i = 0; i < no_rows; i++) {
    for (let j = 0; j < no_cols; j++) {
      if (snake > 0) {
        // Find starting position
        if (snake_paths[k].length == 0) {
          // If current position is occupied find position that is free
          if (matrix[current_pos[0]][current_pos[1]] == 1) {
            current_pos = findFreePosition();
          }
          // Set that position to be occupied
          matrix[current_pos[0]][current_pos[1]] = 1;
          // Set the 1st two elements as the position of the head of the snake
          snake_paths[k].push(current_pos[1].toString());
          snake_paths[k].push(current_pos[0].toString());
          snake--;
        } else {
          //Check if right is free then move current position to right
          if (
            current_pos[1] < no_cols &&
            matrix[current_pos[0]][current_pos[1] + 1] == 0
          ) {
            matrix[current_pos[0]][current_pos[1] + 1] = 1;
            current_pos[1] = current_pos[1] + 1;
            snake_paths[k].push("R");
            snake--;
          }
          //Check if left is free then move current position to left
          else if (
            current_pos[1] > 0 &&
            matrix[current_pos[0]][current_pos[1] - 1] == 0
          ) {
            matrix[current_pos[0]][current_pos[1] - 1] = 1;
            current_pos[1] = current_pos[1] - 1;
            snake_paths[k].push("L");
            snake--;
          }
          //Check if top is free then move current position to top
          else if (
            current_pos[0] > 0 &&
            matrix[current_pos[0] - 1][current_pos[1]] == 0
          ) {
            matrix[current_pos[0] - 1][current_pos[1]] = 1;
            current_pos[0] = current_pos[0] - 1;
            snake_paths[k].push("U");
            snake--;
          }
          //Check if bottom is free then move current position to bottom
          else if (
            current_pos[0] < no_rows &&
            matrix[current_pos[0] + 1][current_pos[1]] == 0
          ) {
            matrix[current_pos[0] + 1][current_pos[1]] = 1;
            current_pos[0] = current_pos[0] + 1;
            snake_paths[k].push("D");
            snake--;
          }
        }
      }
    }
  }
}

// Prepare array to be written as text
let snake_paths_tmp = [];
for (let i = 0; i < snake_paths.length; i++) {
  snake_paths_tmp.push(snake_paths[i].join(" "));
}
const content = snake_paths_tmp.join("\n");
// console.log(content);

// Write to text file -Name of file "result.txt"
try {
  fs.writeFileSync("result.txt", content);
  // file written successfully
} catch (err) {
  console.error(err);
}
