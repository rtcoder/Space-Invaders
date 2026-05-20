export class Missiles {
    constructor() {
        this.size = 5;
        this.step = 620;
        this.explodes = new Array();
        this.explodeRadius = 50;
        this.playerMissiles = new Array();
        this.enemiesMissiles = new Array();
    }

    reset() {
        this.explodes = new Array();
        this.playerMissiles = new Array();
        this.enemiesMissiles = new Array();
    }

    move(delta) {
        let pb = this.playerMissiles;
        let eb = this.enemiesMissiles;
        let moveBy = this.step * delta / 1000;
        for (let i in pb) {
            pb[i].y -= moveBy;
            if (pb[i].y < 0) {
                pb.splice(i, 1);
            }
        }
        for (let i in eb) {
            eb[i].y += moveBy;
            if (eb[i].y > canvas.height) {
                eb.splice(i, 1);
            }
        }
    }
}
