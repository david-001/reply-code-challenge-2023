file_name = "00-example.txt";
// file_name = "01-chilling-cat.txt";
// file_name = "02-swarming-ant.txt";
// file_name = "03-input-anti-greedy.txt";
// file_name = "04-input-low-points.txt";
// file_name = "05-input-opposite-points-holes.txt";

const fs = require("fs");
let input_raw = "";

// Read in raw text
try {
  input_raw = fs.readFileSync(file_name, { encoding: "utf8", flag: "r" });
} catch (err) {
  console.error(err);
}

input_raw = input_raw.split("\r\n");

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

const snake_lengths = [];
for (let i = 0; i < no_snakes; i++) {
  snake_lengths.push(parseInt(input_arr[1][i], 10));
}

// Create matrix
let matrix = [];
for (let i = 0; i < no_rows; i++) {
  matrix.push([]);
  for (let j = 0; j < no_cols; j++) {
    // [row, col]
    // Set 1 if cell contains * else set to 0
    if (input_arr[2 + i][j] === "*") {
      matrix[i][j] = 1;
    } else {
      matrix[i][j] = 0;
    }
  }
}

let snake1 = snake_lengths[0];
let snake_paths = [];
let current_pos = [0, 0];

for (let i = 0; i < no_rows; i++) {
  for (let j = 0; j < no_cols; j++) {
    if (snake1 > 0) {
      // if (current_pos == 0) {
      //   snake--;
      // }

      if (
        snake_paths.length == 0 &&
        matrix[current_pos[0]][current_pos[1]] == 0
      ) {
        matrix[current_pos[0]][current_pos[1]] = 1;
        snake_paths.push(current_pos[1].toString());
        snake_paths.push(current_pos[0].toString());
        snake1--;
      } else {
        //Check if right is free
        if (
          current_pos[1] < no_cols &&
          matrix[current_pos[0]][current_pos[1] + 1] == 0
        ) {
          matrix[current_pos[0]][current_pos[1] + 1] = 1;
          current_pos[1] = current_pos[1] + 1;
          snake_paths.push("R");
          snake1--;
        }
        //Check if left is free
        else if (
          current_pos[1] > 0 &&
          matrix[current_pos[0]][current_pos[1] - 1] == 0
        ) {
          matrix[current_pos[0]][current_pos[1] - 1] = 1;
          current_pos[1] = current_pos[1] - 1;
          snake_paths.push("L");
          snake1--;
        }
        //Check if top is free
        else if (
          current_pos[0] > 0 &&
          matrix[current_pos[0] - 1][current_pos[1]] == 0
        ) {
          matrix[current_pos[0] - 1][current_pos[1]] = 1;
          current_pos[0] = current_pos[0] - 1;
          snake_paths.push("U");
          snake1--;
        }
        //Check if bottom is free
        else if (
          current_pos[0] < no_rows &&
          matrix[current_pos[0] + 1][current_pos[1]] == 0
        ) {
          matrix[current_pos[0] + 1][current_pos[1]] = 1;
          current_pos[0] = current_pos[0] + 1;
          snake_paths.push("D");
          snake1--;
        }
      }
    }
  }
}
console.log(matrix);

let snake1_length = 6;
let snakes = [];

let snakes000 = ["0", "0", "R"];

let content = snake_paths.join(" ");

// Write to text file
try {
  fs.writeFileSync("test.txt", content);
  // file written successfully
} catch (err) {
  console.error(err);
}
