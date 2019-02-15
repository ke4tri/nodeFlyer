const express = require('express')
const dgram = require('dgram');
const bodyParser = require('body-parser');
const SERVERPORT = 5000

const commandDelays = require('./commandDelays');

const PORT = 8889;
const HOST = '192.168.10.1';

const drone = dgram.createSocket('udp4');
drone.bind(PORT);

-drone.on('message', message => {
  console.log(`Drone : ${message}`);
});

const app = express();

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/launch', function (req, res) {
  const requestCommand = req.body.command;
  const flightCommand = requestCommand.split(',');
  goForLaunch(flightCommand);
  res.send('SUCCESS!')
})

app.listen(SERVERPORT,() => {
  console.log(`Listening on port ${SERVERPORT}...`);
});

function handleError(err) {
  if (err) {
    console.log('ERROR', err);
  }
}

async function goForLaunch(commands) {
  commands.forEach((command) => {
    console.log(`running command: ${command}`);
    const delay = commandDelays[command];
    setTimeout(function(){
      drone.send(command, 0, command.length, PORT, HOST, handleError);
    }, delay);
  })
}