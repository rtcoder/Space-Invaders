Object.size = function (obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
            size++;
    }
    return size;
};

export function getRandomInt(min, max) {
    if (!min) {
        min = 1;
    }
    if (!max) {
        max = 100;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomString(length) {
    if (!length) {
        length = 10;
    }
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function resize() {
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight - document.getElementById('info').offsetHeight);
}

export function log() {
    console.log.apply(this, arguments);
}
