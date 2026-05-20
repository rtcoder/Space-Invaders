export class Keys {
    constructor() {
        this.right = false;
        this.left = false;
        this.space = false;
        this.ctrl = false;
        this.shift = false;
        this.C = false;
        this.X = false;
        this.Z = false;

    }

}

export function bindKeyboard() {
    document.onkeydown = function (e) {
        e = e || window.event;
        switch (e.keyCode) {
            case 16:
                keys.shift = true;
                break;
            case 17:
                keys.ctrl = true;
                break;
            case 27:
                Game.togglePause();
                break;
            case 32:
                keys.space = true;
                break;
            case 37:
                keys.left = true;
                break;
            case 39:
                keys.right = true;
                break;
            case 88:
                keys.X = true;
                break;
            case 90:
                keys.Z = true;
                break;
        }
    };
    document.onkeyup = function (e) {
        e = e || window.event;

        switch (e.keyCode) {
            case 16:
                keys.shift = false;
                break;
            case 17:
                keys.ctrl = false;
                break;
            case 32:
                keys.space = false;
                break;
            case 37:
                keys.left = false;
                break;
            case 39:
                keys.right = false;
                break;
            case 88:
                keys.X = false;
                break;
            case 90:
                keys.Z = false;
                break;
        }
    };
}
