export class Enemies {
    constructor() {
        this.width = 30;
        this.height = 30;
        this.space = 20;
        this.step = 80;
        this.dropDistance = 12;
        this.color = 'rgba(255, 0, 0, 0.7)';
        this.rows = 5;
        this.cols = 5;
        this.moveBack = false;
        this.shootInterval = 1000;
        this.lastShootTime = null;
        this.list = new Array();
        this.generate();
    }

    generate() {
        this.list = new Array();
        this.moveBack = false;
        this.lastShootTime = null;
        let formationWidth = this.cols * this.width + (this.cols - 1) * this.space;
        let startX = Math.max(0, canvas.width / 2 - formationWidth / 2);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.list.push({
                    x: startX + (this.width + this.space) * j,
                    y: (this.height + this.space) * i,
                    isKilled: false
                });
            }
        }
    }

    move(delta) {
        let e = this.list;
        let alive = e.filter(function (enemy) {
            return !enemy.isKilled;
        });
        if (alive.length === 0) {
            return;
        }
        let moveBy = this.step * delta / 1000;
        for (let i in e) {
            e[i].x += this.moveBack ? -moveBy : moveBy;
        }
        let leftEdge = Math.min.apply(null, alive.map(function (enemy) {
            return enemy.x;
        }));
        let rightEdge = Math.max.apply(null, alive.map(function (enemy) {
            return enemy.x + enemies.width;
        }));
        if ((!this.moveBack && rightEdge > canvas.width)
            || (this.moveBack && leftEdge < 0)) {
            this.moveBack = !this.moveBack;
            for (let i in e) {
                e[i].y += this.dropDistance;
            }
        }

        for (let i in alive) {
            if (alive[i].y + this.height >= player.y) {
                player.lives = 0;
                Game.updateHud();
                Game.finish('fail');
                return;
            }
        }
    }

    shoot() {
        if (new Date().getTime() - this.lastShootTime > this.shootInterval || !this.lastShootTime) {
            let count = 0;
            let c = 0;
            for (let i in this.list) {
                if (!this.list[i].isKilled) {
                    count++;
                }
            }
            if (count === 0) {
                return;
            }
            let random = getRandomInt(1, count);
            for (let i in this.list) {
                if (!this.list[i].isKilled) {
                    c++;
                    if (c === random) {
                        let arr = {
                            x: this.list[i].x + missiles.size / 2,
                            y: this.list[i].y + missiles.size,
                            speed: getRandomInt(310, 430),
                            wobble: getRandomInt(0, 1000)
                        };
                        missiles.enemiesMissiles.push(arr);
                        this.lastShootTime = new Date().getTime();
                    }
                }
            }
        }
    }

    countAlive() {
        let c = 0;
        for (let k in this.list) {
            if (!this.list[k].isKilled) {
                c++;
            }
        }
        if (c === 0) {
            Game.finish('next');
        }
    }
}
