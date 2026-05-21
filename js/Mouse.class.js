export class Mouse {
    constructor() {
        this.right = false;
        this.left = false;
        this.wheelClick = false;
        this.scrollDown = false;
        this.scrollUp = false;
        this.xPos = 0;
        this.yPos = 0;

        this.setEvents();
    }

    setEvents() {
        let $this = this;
        (function () {
            window.addEventListener('mousedown', function (e) {
                $this.onMousedown(e, $this);
            });
            window.addEventListener('mouseup', function (e) {
                $this.onMouseup(e, $this);
            });
            window.addEventListener('mousemove', function (e) {
                $this.onMousemove(e, $this);
            });
            window.addEventListener('touchstart', function (e) {
                $this.onTouch(e, $this);
            }, {passive: false});
            window.addEventListener('touchmove', function (e) {
                $this.onTouch(e, $this);
            }, {passive: false});
            window.addEventListener('touchend', function (e) {
                $this.onTouch(e, $this);
            }, {passive: false});
            window.addEventListener('touchcancel', function (e) {
                $this.onTouch(e, $this);
            }, {passive: false});
            ['scroll', 'mousewheel', 'DOMMouseScroll'].map(function (e) {
                window.addEventListener(e, function (event) {
                    $this.onScroll(event, $this);
                });
            });

            window.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            })
        })();
    }

    onScroll(e, self) {
        e = e || window.event;
        if (e.wheelDelta / 120 > 0) {
            self.scrollUp = true;
        } else {
            self.scrollDown = true;
        }

        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            self.scrollDown = false;
            self.scrollUp = false;
        }, 150);
    }

    onMousemove(e, self) {
        e = e || window.event;
        self.xPos = e.pageX;
        self.yPos = e.pageY;
    }

    onTouch(e, self) {
        e.preventDefault();
        if (e.touches.length > 0) {
            self.xPos = e.touches[0].pageX;
            self.yPos = e.touches[0].pageY;
            self.left = true;
            self.right = false;
            return;
        }

        self.left = false;
        self.right = false;
    }

    onMouse(e, self, valueToSet) {
        e = e || window.event;
        if ("buttons" in e) {
            if (e.buttons === 1) {
                self.left = valueToSet;
            }
            if (e.buttons === 2) {
                self.right = valueToSet;
            }
            if (e.buttons === 4) {
                self.wheelClick = valueToSet;
            }
        }
        let button = e.which || e.button;
        if (button === 1) {
            self.left = valueToSet;
        }
        if (button === 2) {
            self.right = valueToSet;
        }
        if (button === 4) {
            self.wheelClick = valueToSet;
        }
    }

    onMouseup(e, self) {
        self.onMouse(e, self, false);

        if (e.buttons === 0) {
            self.right = false;
        }
    }

    onMousedown(e, self) {
        self.onMouse(e, self, true);
    }
}

let timer = null;
