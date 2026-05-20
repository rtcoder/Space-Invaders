class Package {
    constructor(x, y) {
        this.x = x;
        this.y = y ? y : 0;
        this.type = getRandomInt(1, extras.types.length) - 1;
        this.size = 30;
        this.uid = getRandomString();
        this.color = extras.types[this.type].color;
        this.label = extras.types[this.type].label;
    }

    set() {
        if (typeof extras.activeExtras[extras.types[this.type].name] === "undefined") {
            extras.activeExtras[extras.types[this.type].name] = {
                remaningTime: extras.types[this.type].remaningTime,
                uid: this.uid
            };
        } else {
            if (extras.activeExtras[extras.types[this.type].name].uid !== this.uid) {
                extras.activeExtras[extras.types[this.type].name].uid = this.uid;
                extras.activeExtras[extras.types[this.type].name].remaningTime += extras.types[this.type].remaningTime;
            }
        }
    }
}
