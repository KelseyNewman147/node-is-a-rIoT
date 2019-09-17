'use strict';

const { Board, Led } = require("johnny-five");
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let led = null;
const board = new Board();

app.use(express.static(__dirname));
app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html')
});

board.on('ready', () => {
  console.log('Arduino is ready.');

  // Initial state for the LED light
  let state = {
    red: 1, green: 1, blue: 1
  };

  // Map pins to digital inputs on the board
  led = new Led.RGB({
    pins: {
      red: 6,
      green: 3,
      blue: 5
    }
  });

  // Helper function to set the colors
  let setStateColor = (state) => {
    led.color({
      red: state.red,
      blue: state.blue,
      green: state.green
    });
};

  // Listen to the web socket connection
  io.on('connection', (client) => {
    client.on('join', (handshake) => {
      console.log(handshake);
    });

    // Set initial state
    setStateColor(state);

  // Every time a 'rgb' event is sent, listen to it and grab its new values for each individual colour
    client.on('rgb', (data) => {
      state.red = data.color === 'red' ? data.value : state.red;
      state.green = data.color === 'green' ? data.value : state.green;
      state.blue = data.color === 'blue' ? data.value : state.blue;

      // Set the new colors
      setStateColor(state);

      client.emit('rgb', data);
      client.broadcast.emit('rgb', data);
    });

    // Turn on the RGB LED
    led.on();
  });
});

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);