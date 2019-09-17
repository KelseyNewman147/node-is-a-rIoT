const { Board, Leds } = require("johnny-five");
const board = new Board();

board.on("ready", () => {
  // Set up the following PWM pins as LEDs.
  // Fade an LED out, and the complete callback will start
  // fading the next LED in sequence out, and so on.
  const leds = new Leds([11, 10, 9, 6, 5, 3]);
  const timing = 500;
  // If randomFade is true, then fading will happen in random
  // order instead of sequentially.
  const randomFade = false;
  const ledCount = leds.length;
  let fadeIndex = 0;

  function fadeNext() {
    let candidateIndex = fadeIndex;
    leds[fadeIndex].fadeIn(timing);

    // Determine the next LED to fade
    if (randomFade) {
      while (candidateIndex === fadeIndex) {
        candidateIndex = Math.round(Math.random() * (ledCount - 1));
      }
    } else {
      candidateIndex = (fadeIndex < ledCount - 1) ? fadeIndex + 1 : 0;
    }
    fadeIndex = candidateIndex;

    leds[fadeIndex].fadeOut(timing, fadeNext);
  }

  leds.on();
  leds[fadeIndex].fadeOut(timing, fadeNext);
});