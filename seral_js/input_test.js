const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('What is your name? ', (answer) => {
  console.log(`Hello, ${answer}!`);
  readline.close();
});