const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 115200 })
// const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 })

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

parser.on('data', function(input) {
    try {
        console.log(input);
    } catch(e) {
        return;
    }
});


//serial read event
// const worker = new Worker('./serial_test2.js');


//typing read event (enter)
process.stdin.setEncoding("utf8");

var lines = []; 
var data = [];
var m1_position = 18000;
var m2_position = 10000;
var rmd_position = 4000;
var step = 128000;

data[0]=0xFF & m1_position;
data[1]=m1_position>>8;
data[2]=0xFF & m2_position;
data[3]=m2_position>>8;
data[4]=0xFF & rmd_position;
data[5]=rmd_position>>8;
data[6]=0xFF & step;
data[7]=0xFF & (step>>8);
data[8]=0xFF & (step>>16);
data[9]=0xFF & (step>>24);

console.log("Hello 1");

var reader = require('readline').createInterface({　//readlineという機能を用いて標準入力からデータを受け取る
  input: process.stdin,
  output: process.stdout
});

console.log("Hello 2");

reader.on("line", function(line) {
    // port.write(line);
    port.read();
    switch(line){
        case 't':
            console.log("teaching mode");
            data[0]=0x74;
            for(var i=1;i<10;i++)data[i]=0xFF;
            port.write(data);
            break; 
        case 'm':
            console.log("motor mode");
            data[0]=0x6D;
            for(var i=1;i<10;i++)data[i]=0xFF;
            port.write(data);
            break; 
        case 'd':
            console.log("teaching done");
            data[0]=0x64;
            for(var i=1;i<10;i++)data[i]=0xFF;
            port.write(data);
            break; 
        case 's':
            console.log("send data");

            data[0]=0xFF & m1_position;
            data[1]=m1_position>>8;
            data[2]=0xFF & m2_position;
            data[3]=m2_position>>8;
            data[4]=0xFF & rmd_position;
            data[5]=rmd_position>>8;
            data[6]=0xFF & step;
            data[7]=0xFF & (step>>8);
            data[8]=0xFF & (step>>16);
            data[9]=0xFF & (step>>24);

            port.write(data);
            console.log(data); 
            break;
        default:
            console.log("Error");     

    }
  //改行ごとに"line"イベントが発火される
//   lines.push(line); //ここで、lines配列に、標準入力から渡されたデータを入れる
//   console.log(line); 
//   port.write(line);
});

console.log("Hello 3");
