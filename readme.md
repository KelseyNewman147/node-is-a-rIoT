## Using NodeJS to Power IoT applications

This is a small collection of demo scripts utilizing the [Johnny-Five](http://johnny-five.io/) platform to communicate with an Arduino board.

Before you get started, be sure to run:

`npm install`

To run a script from the `/scripts` folder, simply run:

`npm run <script>`

Available options:
- `rgb`: changes the color of an RGB LED through a web interface using web sockets.
- `fade`: incrementally fades an LED brighter and brighter.
- `pulse`: uses of callbacks to fade out a series of LEDs one after the other.