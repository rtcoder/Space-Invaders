import {levels} from './levels.js';
import {BOMB, BULLET, LASER, PIERCE, RAPID, ROCKET, SHIELD, SPREAD} from './constants.js';
import {getRandomInt, getRandomString, resize} from './custom.js';
import {Controls} from './Controls.class.js';
import {Mouse} from './Mouse.class.js';
import {Keys, bindKeyboard} from './Keys.class.js';
import {Extras} from './Extras.class.js';
import {Package} from './Package.class.js';
import {Enemies} from './Enemies.class.js';
import {Collisions} from './Collisions.class.js';
import {Draw} from './Draw.class.js';
import {Missiles} from './Missiles.class.js';
import {Player} from './Player.class.js';
import {Invaders} from './Invaders.class.js';

window.BULLET = BULLET;
window.BOMB = BOMB;
window.LASER = LASER;
window.SPREAD = SPREAD;
window.ROCKET = ROCKET;
window.PIERCE = PIERCE;
window.RAPID = RAPID;
window.SHIELD = SHIELD;
window.levels = levels;
window.getRandomInt = getRandomInt;
window.getRandomString = getRandomString;
window.Package = Package;
window.canvas = document.getElementById('canvas');
window.ctx = window.canvas.getContext('2d');

resize();
window.addEventListener('resize', resize);

window.draw = new Draw();
window.enemies = new Enemies();
window.missiles = new Missiles();
window.player = new Player();
window.extras = new Extras();
window.keys = new Keys();
window.mouse = new Mouse();
window.controls = new Controls();
window.collisions = new Collisions();
window.Game = new Invaders();

bindKeyboard();

const Game = window.Game;
const controls = window.controls;

function openView(view) {
    let menu = document.getElementById('menu');
    menu.classList.add('hidden');

    let viewDiv = document.getElementById(view);
    viewDiv.classList.add('visible');
}

function backToMenu() {
    let menu = document.getElementById('menu');
    menu.classList.remove('hidden');

    let viewDivs = document.getElementsByClassName('view');
    for (let div of viewDivs) {
        div.classList.remove('visible');
    }
}

function startGame() {
    let menu = document.getElementById('menu');
    menu.classList.add('hidden');
    Game.startGame();
}

function selectControl(btn) {
    controls.setScheme(btn.dataset.control);
    let buttons = document.getElementsByClassName('control-option');
    for (let option of buttons) {
        option.classList.remove('active');
    }
    btn.classList.add('active');
}

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('messageAction').addEventListener('click', function () {
    if (Game.messageAction) {
        Game.messageAction();
    }
});
document.getElementById('messageMenu').addEventListener('click', function () {
    Game.backToMenu();
});

let menuListElements = document.getElementsByClassName('open-view');
for (let btn of menuListElements) {
    let id = btn.dataset.id;
    btn.addEventListener('click', function () {
        openView(id);
    });
}

let backButtons = document.getElementsByClassName('back');
for (let btn of backButtons) {
    btn.addEventListener('click', function () {
        backToMenu();
    });
}

let controlButtons = document.getElementsByClassName('control-option');
for (let btn of controlButtons) {
    btn.addEventListener('click', function () {
        selectControl(btn);
    });
    if (btn.dataset.control === 'both') {
        btn.classList.add('active');
    }
}
