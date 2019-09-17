## Using NodeJS to Power IoT applications

This is a small collection of demo scripts utilizing the [Johnny-Five](http://johnny-five.io/) platform to communicate with an Arduino board.

Before you get started, be sure to run:

`npm install`

To run a script from the `/scripts` folder, simply run:

`npm run <script>`

Available options:
- `rgb`: changes the color of an RGB LED through a web interface using web sockets.
- `pulse`: incrementally fades an LED brighter and brighter.
- `fade`: uses of callbacks to fade out a series of LEDs one after the other.

Resources:
- http://blog.ricardofilipe.com/post/getting-started-arduino-johhny-five
- http://johnny-five.io/examples/led-pulse-animation/
- http://johnny-five.io/examples/led-fade-callback/

