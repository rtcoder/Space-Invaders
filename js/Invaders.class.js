import {BULLET} from './constants.js';

export class Invaders {
    constructor() {
        this.isPaused = false;
        this.isFinished = false;
        this.animationFrameId = null;
        this.lastFrameTime = null;
        this.level = 0;
        this.score = 0;
        this.messageAction = null;
    }

    startGame() {
        this.level = 0;
        this.score = 0;
        this.isPaused = false;
        this.isFinished = false;
        player.reset();
        this.set();
        this.hideMessage();
        this.startLoop();
    }

    startLoop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.lastFrameTime = null;
        this.animationFrameId = requestAnimationFrame(this.loop.bind(this));
    }

    set() {
        if (this.level >= levels.length) {
            this.finish('win');
            return;
        }

        enemies.cols = levels[this.level].cols;
        enemies.rows = levels[this.level].rows;
        enemies.shootInterval = levels[this.level].enemiesShootInterval;
        enemies.color = levels[this.level].enemiesColor;
        enemies.step = levels[this.level].enemiesStep || enemies.step;
        enemies.dropDistance = levels[this.level].enemiesDropDistance || enemies.dropDistance;
        player.shootInterval = levels[this.level].playerShootInterval;

        extras.reset();
        missiles.reset();
        enemies.generate();
        player.moveTo({
            x: canvas.width / 2 - player.width / 2,
            y: canvas.height - player.height - 20
        });
        this.updateHud();
    }

    finish(arg) {
        if (arg === 'fail') {
            this.isFinished = true;
            this.showMessage(
                'Game Over',
                'Final score: ' + this.score + '. Try again from level 1.',
                'Restart',
                this.startGame.bind(this)
            );
            return;
        }

        if (arg === 'win') {
            this.isFinished = true;
            this.showMessage(
                'You Win',
                'All waves cleared. Final score: ' + this.score + '.',
                'Play Again',
                this.startGame.bind(this)
            );
            return;
        }

        if (arg === 'next') {
            this.level++;
            this.set();
        }
    }

    delLives(val) {
        player.lives -= val;
        if (player.lives <= 0) {
            player.lives = 0;
            this.updateHud();
            this.finish('fail');
            return;
        }

        player.makeInvulnerable();
        this.updateHud();
    }

    addLives(val) {
        player.lives += val;
        if (player.lives > player.maxLives) {
            player.lives = player.maxLives;
        }
        this.updateHud();
    }

    addScore(val) {
        this.score += val;
        this.updateHud();
    }

    canUseBomb() {
        return typeof extras.activeExtras.bombWeapon !== 'undefined';
    }

    currentWeaponType() {
        let weapon = extras.activeWeapon();
        return weapon ? weapon.weapon : BULLET;
    }

    togglePause() {
        if (this.isFinished) {
            return;
        }

        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.showMessage(
                'Paused',
                'Take a breath, then jump back in.',
                'Resume',
                this.togglePause.bind(this)
            );
        } else {
            this.hideMessage();
            this.lastFrameTime = null;
        }
    }

    updateHud() {
        document.getElementById('level').innerHTML = this.level + 1;
        document.getElementById('lives').innerHTML = 'x' + player.lives;
        document.getElementById('score').innerHTML = String(this.score).padStart(6, '0');
    }

    showMessage(title, text, actionLabel, action) {
        document.getElementById('messageTitle').innerHTML = title;
        document.getElementById('messageText').innerHTML = text;
        document.getElementById('messageAction').innerHTML = actionLabel;
        document.getElementById('message').classList.remove('hidden');
        this.messageAction = action;
    }

    hideMessage() {
        document.getElementById('message').classList.add('hidden');
        this.messageAction = null;
    }

    loop(timestamp) {
        this.animationFrameId = requestAnimationFrame(this.loop.bind(this));

        if (!this.lastFrameTime) {
            this.lastFrameTime = timestamp;
            return;
        }

        let delta = Math.min(timestamp - this.lastFrameTime, 50);
        this.lastFrameTime = timestamp;

        if (!this.isPaused && !this.isFinished && document.hasFocus()) {
            collisions.Missiles();
            collisions.Explodes();
            collisions.Packages();

            enemies.move(delta);
            missiles.move(delta);
            extras.addPackage();
            extras.move(delta);
            extras.countDown(delta);
            enemies.shoot();
            player.update(delta);

            if (controls.keysControl) {
                if (keys.left) {
                    player.moveLeft(delta);
                }
                if (keys.right) {
                    player.moveRight(delta);
                }
                if (keys.ctrl || keys.space) {
                    player.shoot(this.currentWeaponType());
                }
            }
            if (controls.mouseControl) {
                player.moveTo({x: mouse.xPos});

                if (mouse.left) {
                    player.shoot(this.currentWeaponType());
                }
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            draw.All();
        }
    }
}
