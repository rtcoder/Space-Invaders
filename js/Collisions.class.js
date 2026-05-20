class Collisions {
    Explodes() {
        let e = enemies.list;
        let ex = missiles.explodes;
        for (let j in ex) {
            for (let i in e) {
                let r = {
                    x: e[i].x,
                    y: e[i].y,
                    w: enemies.width,
                    h: enemies.height
                };
                let c = {
                    x: ex[j].x,
                    y: ex[j].y,
                    r: missiles.explodeRadius
                };
                if (e.length > i && ex.length > j
                    && this.RectCircleColliding(c, r)
                    && !e[i].isKilled) {

                    e[i].isKilled = true;
                    Game.addScore(100);
                    enemies.countAlive();
                }
            }
            ex[j].t--;
            if (ex[j].t <= 0) {
                ex.splice(j, 1);
            }
        }
    }

    Missiles() {
        let e = enemies.list;
        let pb = missiles.playerMissiles;
        for (let i in e) {
            for (let j in pb) {
                if (e.length > i && pb.length > j
                    && pb[j].x + missiles.size >= e[i].x
                    && pb[j].x <= e[i].x + enemies.width
                    && pb[j].y + missiles.size >= e[i].y
                    && pb[j].y <= e[i].y + enemies.height
                    && !e[i].isKilled) {
                    if (pb[j].type === BULLET) {
                        e[i].isKilled = true;
                        Game.addScore(100);
                    } else if (pb[j].type === BOMB) {
                        missiles.explodes.push({
                            x: pb[j].x,
                            y: pb[j].y,
                            t: 10
                        });
                    }
                    pb.splice(j, 1);
                    enemies.countAlive();
                }
            }
        }

        let eb = missiles.enemiesMissiles;
        let playerWidth = player.width;
        if (typeof extras.activeExtras.largeShip !== 'undefined') {
            playerWidth = player.largeWidth;
        }
        for (let j in eb) {
            if (eb.length > j
                && !player.isInvulnerable()
                && eb[j].x + missiles.size >= player.x
                && eb[j].x <= player.x + playerWidth
                && eb[j].y + missiles.size >= player.y
                && eb[j].y <= player.y + player.height) {
                eb.splice(j, 1);
                Game.delLives(1);
            }
        }
    }

    Packages() {
        let ex = extras.list;
        let playerWidth = player.width;
        if (typeof extras.activeExtras.largeShip !== 'undefined') {
            playerWidth = player.largeWidth;
        }
        for (let j in ex) {
            if (ex.length > j
                && ex[j].x + ex[j].size >= player.x
                && ex[j].x <= player.x + playerWidth
                && ex[j].y + ex[j].size >= player.y
                && ex[j].y <= player.y + player.height) {

                ex[j].set();
                ex.splice(j, 1);
            }
        }
    }

    PointCircleColliding(circle, point) {
        return Math.pow(circle.x - point.x, 2) + Math.pow(circle.y - point.y, 2) < circle.r * circle.r;
    }

    RectCircleColliding(circle, rect) {
        let distX = Math.abs(circle.x - rect.x - rect.w / 2);
        let distY = Math.abs(circle.y - rect.y - rect.h / 2);

        if (distX > (rect.w / 2 + circle.r)) {
            return false;
        }
        if (distY > (rect.h / 2 + circle.r)) {
            return false;
        }

        if (distX <= (rect.w / 2)) {
            return true;
        }
        if (distY <= (rect.h / 2)) {
            return true;
        }

        let dx = distX - rect.w / 2;
        let dy = distY - rect.h / 2;
        return (dx * dx + dy * dy <= (circle.r * circle.r));
    }
}
