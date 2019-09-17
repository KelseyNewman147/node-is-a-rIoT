const { Board, Led } = require("johnny-five");
const board = new Board();

board.on("ready", () => {
  // Create a standard `led` component
  // on a valid pwm pin
  const led = new Led(11);

  // Instead of passing a time and rate, you can
  // pass any valid Animation() segment opts object
  // https://github.com/rwaldron/johnny-five/wiki/Animation#segment-properties
  led.pulse({
    // specifies the rate of change of a parameter over time.
    easing: "linear",
    duration: 3000,
    // Array of values from 0.0 to 1.0 representing the 
    // beginning and end of the animation respectively
    cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
    // Each keyFrame array should have an element that maps to 
    // each cue point in the cuePoints array
    keyFrames: [0, 10, 0, 50, 0, 255],
    onstop() {
      console.log("Animation stopped");
    }
  });

  // Stop and turn off the led pulse loop after
  // 12 seconds (shown in ms)
  board.wait(30000, () => {

    // stop() terminates the interval
    // off() shuts the led off
    led.stop().off();
  });
});