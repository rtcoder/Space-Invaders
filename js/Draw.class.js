import {BOMB, BULLET, LASER, PIERCE, ROCKET, SHIELD} from './constants.js';

export class Draw {
    constructor() {
        this.backgroundColor = '#02030a';
        this.stars = [];
    }

    ensureStars() {
        if (this.stars.length > 0) {
            return;
        }

        for (let i = 0; i < 120; i++) {
            this.stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: getRandomInt(1, 2),
                speed: getRandomInt(12, 42),
                alpha: getRandomInt(35, 95) / 100
            });
        }
    }

    player() {
        let width = player.width;
        if (typeof extras.activeExtras.largeShip !== 'undefined') {
            width = player.largeWidth;
        }

        let blink = player.isInvulnerable() && Math.floor(player.invulnerableTime / 120) % 2 === 0;
        let hullColor = blink ? 'rgba(255, 255, 255, 0.35)' : player.color;
        let accentColor = blink ? 'rgba(64, 224, 208, 0.25)' : '#40e0d0';

        ctx.beginPath();
        ctx.moveTo(player.x + width / 2, player.y - 18);
        ctx.lineTo(player.x + width - 3, player.y + player.height);
        ctx.lineTo(player.x + width * 0.66, player.y + player.height);
        ctx.lineTo(player.x + width * 0.58, player.y + 3);
        ctx.lineTo(player.x + width * 0.42, player.y + 3);
        ctx.lineTo(player.x + width * 0.34, player.y + player.height);
        ctx.lineTo(player.x + 3, player.y + player.height);
        ctx.closePath();
        ctx.fillStyle = hullColor;
        ctx.fill();

        ctx.fillStyle = accentColor;
        ctx.fillRect(player.x + width / 2 - 4, player.y - 5, 8, 10);
        ctx.fillRect(player.x + 8, player.y + player.height - 4, 10, 4);
        ctx.fillRect(player.x + width - 18, player.y + player.height - 4, 10, 4);
    }

    background() {
        this.ensureStars();

        ctx.beginPath();
        ctx.strokeStyle = 'transparent';
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = this.backgroundColor;
        ctx.fill();
        ctx.stroke();

        for (let i in this.stars) {
            let star = this.stars[i];
            let y = (star.y + performance.now() * star.speed / 1000) % canvas.height;
            ctx.fillStyle = 'rgba(255, 255, 255, ' + star.alpha + ')';
            ctx.fillRect(star.x, y, star.size, star.size);
        }
    }

    enemies() {
        let e = enemies.list;
        for (let i in e) {
            if (!e[i].isKilled) {
                let x = e[i].x;
                let y = e[i].y;
                ctx.fillStyle = enemies.color;
                ctx.fillRect(x + 6, y + 2, enemies.width - 12, 6);
                ctx.fillRect(x + 2, y + 8, enemies.width - 4, 12);
                ctx.fillRect(x + 7, y + 20, 5, 7);
                ctx.fillRect(x + enemies.width - 12, y + 20, 5, 7);
                ctx.fillRect(x - 2, y + 12, 4, 7);
                ctx.fillRect(x + enemies.width - 2, y + 12, 4, 7);

                ctx.fillStyle = '#02030a';
                ctx.fillRect(x + 9, y + 11, 4, 4);
                ctx.fillRect(x + enemies.width - 13, y + 11, 4, 4);
            }
        }
    }

    missiles() {
        let pb = missiles.playerMissiles;
        for (let i in pb) {
            let x = pb[i].x;
            let y = pb[i].y;
            if (pb[i].type === BULLET) {
                ctx.fillStyle = '#f8ffff';
                ctx.fillRect(x - 2, y - 10, 4, 12);
                ctx.fillStyle = '#40e0d0';
                ctx.fillRect(x - 1, y - 14, 2, 5);
            } else if (pb[i].type === LASER) {
                ctx.fillStyle = '#f8ffff';
                ctx.fillRect(x - 2, y - 34, 4, 36);
                ctx.fillStyle = '#40e0d0';
                ctx.fillRect(x - 5, y - 28, 10, 2);
            } else if (pb[i].type === ROCKET) {
                ctx.fillStyle = '#ff8a3d';
                ctx.fillRect(x - 5, y - 16, 10, 16);
                ctx.fillStyle = '#ffd84d';
                ctx.fillRect(x - 2, y, 4, 8);
            } else if (pb[i].type === PIERCE) {
                ctx.fillStyle = '#98ff6f';
                ctx.fillRect(x - 3, y - 18, 6, 18);
                ctx.fillStyle = '#f8ffff';
                ctx.fillRect(x - 1, y - 22, 2, 6);
            } else if (pb[i].type === SHIELD) {
                ctx.fillStyle = 'rgba(141, 216, 255, 0.55)';
                ctx.fillRect(x - 18, y - 6, 36, 14);
                ctx.strokeStyle = '#8dd8ff';
                ctx.strokeRect(x - 18, y - 6, 36, 14);
            } else if (pb[i].type === BOMB) {
                ctx.beginPath();
                ctx.arc(x, y, missiles.size, 0, 2 * Math.PI, false);
                ctx.fillStyle = '#3688ff';
                ctx.fill();
                ctx.strokeStyle = '#b8d7ff';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
        let eb = missiles.enemiesMissiles;
        for (let i in eb) {
            let x = eb[i].x;
            let y = eb[i].y;
            ctx.fillStyle = '#ff4d6d';
            ctx.fillRect(x - 2, y - 2, 4, 12);
            ctx.fillStyle = '#ffd84d';
            ctx.fillRect(x - 1, y + 8, 2, 5);
        }
    }

    packages() {
        let e = extras.list;
        for (let i in e) {
            ctx.beginPath();
            let x = e[i].x;
            let y = e[i].y;
            let pulse = 1 + Math.sin(performance.now() / 180 + i) * 0.08;
            let radius = e[i].size / 2 * pulse;
            ctx.moveTo(x, y - radius);
            ctx.lineTo(x + radius, y);
            ctx.lineTo(x, y + radius);
            ctx.lineTo(x - radius, y);
            ctx.closePath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillStyle = e[i].color;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, y, e[i].size / 2.8, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(2, 3, 10, 0.82)';
            ctx.fill();
            ctx.fillStyle = '#f8ffff';
            ctx.font = '16px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(e[i].label, x, y);
        }
    }

    explodes() {
        let ex = missiles.explodes;
        for (let i in ex) {
            let alpha = Math.max(0.15, ex[i].t / 10);
            ctx.beginPath();
            ctx.arc(ex[i].x, ex[i].y, (ex[i].r || missiles.explodeRadius) * (1.1 - alpha / 2), 0, 2 * Math.PI, false);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(64, 224, 208, ' + alpha + ')';
            ctx.stroke();
            ctx.fillStyle = 'rgba(54, 136, 255, ' + alpha / 4 + ')';
            ctx.fill();
        }
    }

    All() {
        this.background();
        this.packages();
        this.enemies();
        this.missiles();
        this.explodes();
        this.player();
    }
}
