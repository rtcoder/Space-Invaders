export class Missiles {
    constructor() {
        this.size = 5;
        this.step = 620;
        this.enemyStep = 360;
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
            let speed = pb[i].speed || this.step;
            pb[i].y -= speed * delta / 1000;
            if (pb[i].vx) {
                pb[i].x += pb[i].vx * delta / 1000;
            }
            if (pb[i].y < 0) {
                pb.splice(i, 1);
            }
        }
        for (let i in eb) {
            let speed = eb[i].speed || this.enemyStep;
            eb[i].y += speed * delta / 1000;
            if (eb[i].wobble) {
                eb[i].x += Math.sin((performance.now() + eb[i].wobble) / 90) * 0.35;
            }
            if (eb[i].y > canvas.height) {
                eb.splice(i, 1);
            }
        }
    }
}
