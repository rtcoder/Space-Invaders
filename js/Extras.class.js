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
            }
        ];
        this.activeExtras = [];
        this.interval = 5000;
        this.list = [];
        this.lastDropTime = null;
        this.step = 90;
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
