import {BOMB, LASER, PIERCE, RAPID, ROCKET, SHIELD, SPREAD} from './constants.js';

export class Extras {
    constructor() {
        this.types = [
            {
                name: 'doubleShoot',
                remaningTime: 10000,
                color: '#ffd84d',
                label: 'D'
            },
            {
                name: 'largeShip',
                remaningTime: 15000,
                color: '#ff4d6d',
                label: 'L'
            },
            {
                name: 'superSpeed',
                remaningTime: 10000,
                color: '#40e0d0',
                label: 'S'
            },
            {
                name: 'bombWeapon',
                remaningTime: 9000,
                color: '#3688ff',
                label: 'B',
                weapon: BOMB
            },
            {
                name: 'laserWeapon',
                remaningTime: 8000,
                color: '#f8ffff',
                label: 'L',
                weapon: LASER
            },
            {
                name: 'spreadWeapon',
                remaningTime: 10000,
                color: '#a78bfa',
                label: 'S',
                weapon: SPREAD
            },
            {
                name: 'rocketWeapon',
                remaningTime: 9000,
                color: '#ff8a3d',
                label: 'R',
                weapon: ROCKET
            },
            {
                name: 'pierceWeapon',
                remaningTime: 9000,
                color: '#98ff6f',
                label: 'P',
                weapon: PIERCE
            },
            {
                name: 'rapidWeapon',
                remaningTime: 8000,
                color: '#ff62d0',
                label: 'F',
                weapon: RAPID
            },
            {
                name: 'shieldWeapon',
                remaningTime: 9000,
                color: '#8dd8ff',
                label: 'H',
                weapon: SHIELD
            }
        ];
        this.activeExtras = [];
        this.interval = 5000;
        this.list = [];
        this.lastDropTime = null;
        this.step = 90;
    }

    weaponTypes() {
        return this.types.filter(function (type) {
            return typeof type.weapon !== 'undefined';
        });
    }

    activeWeapon() {
        let weapons = this.weaponTypes();
        for (let i in weapons) {
            if (typeof this.activeExtras[weapons[i].name] !== 'undefined') {
                return weapons[i];
            }
        }
        return null;
    }

    clearWeapons() {
        let weapons = this.weaponTypes();
        for (let i in weapons) {
            delete this.activeExtras[weapons[i].name];
            document.getElementById(weapons[i].name + 'Container').style.display = 'none';
        }
    }

    reset() {
        this.list = [];
        this.activeExtras = [];
        this.lastDropTime = null;
        for (let i in this.types) {
            document.getElementById(this.types[i].name + 'Container').style.display = 'none';
        }
    }

    move(delta) {
        let el = this.list;
        let moveBy = this.step * delta / 1000;
        for (let i in el) {
            el[i].y += moveBy;
            if (el[i].y > canvas.height) {
                el.splice(i, 1);
            }
        }
    }

    addPackage() {
        if (!this.lastDropTime || new Date().getTime() - this.lastDropTime > this.interval) {
            let size = 30;
            let x = getRandomInt(size / 2, canvas.width - size / 2);
            let y = getRandomInt(size / 2, canvas.height / 3);
            let p = new Package(x, y);
            this.list.push(p);
            this.lastDropTime = new Date().getTime();
        }
    }

    countDown(delta) {
        let ae = this.activeExtras;
        for (let i in ae) {
            if (ae[i].remaningTime <= 0) {
                delete ae[i];
                document.getElementById(i + 'Container').style.display = 'none';
            } else {
                ae[i].remaningTime -= delta;
                document.getElementById(i).innerHTML = Math.floor(ae[i].remaningTime / 1000) + 's';
                document.getElementById(i + 'Container').style.display = 'inline-flex';
            }
        }
    }
}
