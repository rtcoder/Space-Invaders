export class Controls {
    constructor() {
        this.mouseControl = true;
        this.keysControl = true;
        this.gamepadControl = false;
    }

    setScheme(scheme) {
        this.mouseControl = scheme === 'mouse' || scheme === 'both';
        this.keysControl = scheme === 'keyboard' || scheme === 'both';
        this.gamepadControl = false;
    }
}
