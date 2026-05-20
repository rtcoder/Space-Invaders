class Player {
    constructor() {
        this.allowMoveLeft = true;
        this.allowMoveRight = true;
        this.color = '#fff';
        this.lastShootTime = null;
        this.shootInterval = 1000;
        this.step = 480;
        this.width = 50;
        this.largeWidth = 100;
        this.height = 15;
        this.x = 0;
        this.y = canvas.height - this.height;
        this.maxLives = 3;
        this.lives = this.maxLives;
        this.invulnerableTime = 0;
    }

    reset() {
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 20;
        this.lives = this.maxLives;
        this.lastShootTime = null;
        this.invulnerableTime = 0;
    }

    update(delta) {
        if (this.invulnerableTime > 0) {
            this.invulnerableTime -= delta;
        }
    }

    makeInvulnerable() {
        this.invulnerableTime = 1400;
    }

    isInvulnerable() {
        return this.invulnerableTime > 0;
    }

    moveLeft(delta) {
        if (this.allowMoveLeft) {
            let step = this.step * delta / 1000;
            if (typeof extras.activeExtras.superSpeed !== 'undefined') {
                step *= 2;
            }
            if (this.x >= step) {
                this.x -= step;
            }
        }
    }

    moveRight(delta) {
        if (this.allowMoveRight) {
            let width = this.width;
            if (typeof extras.activeExtras.largeShip !== 'undefined') {
                width = this.largeWidth;
            }
            let step = this.step * delta / 1000;
            if (typeof extras.activeExtras.superSpeed !== 'undefined') {
                step *= 2;
            }
            if (this.x <= canvas.width - width - step) {
                this.x += step;
            }
        }
    }

    moveTo(pos) {
        if (pos.x) {
            this.x = pos.x;
        }
        if (pos.y) {
            this.y = pos.y;
        }
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
        }
        if (this.y < this.height) {
            this.y = this.height;
        }
        let width = this.width;
        if (typeof extras.activeExtras.largeShip !== 'undefined') {
            width = this.largeWidth;
        }
        if (this.x > canvas.width - width) {
            this.x = canvas.width - width;
        }
        if (this.x < 0) {
            this.x = 0;
        }
    }

    shoot(type) {
        if (new Date().getTime() - this.lastShootTime > this.shootInterval || !this.lastShootTime) {
            let width = this.width;
            if (typeof extras.activeExtras.largeShip !== 'undefined') {
                width = this.largeWidth;
            }
            if (typeof extras.activeExtras.doubleShoot !== 'undefined') {
                let obj1 = {
                    x: this.x,
                    y: this.y - this.height,
                    type: type
                };
                let obj2 = {
                    x: this.x + width,
                    y: this.y - this.height,
                    type: type
                };

                missiles.playerMissiles.push(obj1);
                missiles.playerMissiles.push(obj2);
            } else {
                let obj = {
                    x: this.x + width / 2,
                    y: this.y - this.height,
                    type: type
                };

                missiles.playerMissiles.push(obj);
            }
            this.lastShootTime = new Date().getTime();
        }
    }
}
