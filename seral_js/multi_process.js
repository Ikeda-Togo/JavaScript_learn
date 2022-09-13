const {Worker} = require('worker_threads');

//serial read event
const worker = new Worker('./serial_test2.js');