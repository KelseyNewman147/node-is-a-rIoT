(() => {
    // On each change event for each slider, send a new event to 
    // socket.io that contains which color was changed and its new value.
    const socket = io.connect(window.location.hostname + ':' + 3000);
    const red = document.getElementById('red');
    const green = document.getElementById('green');
    const blue = document.getElementById('blue');

    const emitValue = (color, e) => {
        socket.emit('rgb', {
            color: color,
            value: e.target.value
        });
    }

    red.addEventListener('change', emitValue.bind(null, 'red'));
    blue.addEventListener('change', emitValue.bind(null, 'blue'));
    green.addEventListener('change', emitValue.bind(null, 'green'));

    socket.on('connect', (data) => {
        socket.emit('join', 'Client is connected!');
    });

    socket.on('rgb', (data) => {
        const color = data.color;
        document.getElementById(color).value = data.value;
    });
})();