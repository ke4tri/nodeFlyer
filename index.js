const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const PORT = 5000


const app = express();

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/launch', function (req, res) {
  console.log(req.body)
// go();
  res.send('POST request to the homepage')
})

app.listen(PORT,() => {
  console.log(`Listening on port ${PORT}...`);
});




// const dgram = require('dgram');
// const wait = require('waait');
// const commandDelays = require('./commandDelays');

// const PORT = 8889;
// const HOST = '192.168.10.1';

// const drone = dgram.createSocket('udp4');
// drone.bind(PORT);

// -drone.on('message', message => {
//   console.log(`Drone : ${message}`);
// });

// function handleError(err) {
//   if (err) {
//     console.log('ERROR');
//     console.log(err);
//   }
// }

// const commands = ['command', 'takeoff', 'cw 90', 'land'];
// // const commands = ['command', 'battery?'];

// let i = 0;

// drone.send('command', 0, 'command'.length, PORT, HOST, handleError);

// May need to increase the wait times on the commandDelays 

async function go(command) {
  const delay = commandDelays[command];
  console.log(`running command: ${command}`);
  // drone.send(command, 0, command.length, PORT, HOST, handleError);
  // await wait(delay);
  // i += 1;
  // if (i < commands.length) {
  //   return go();
  // }
  console.log('done!');
}