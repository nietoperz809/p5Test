let img = [];
let imgDeck;
let imgBlack;
let board = [];
let s_ohoh;
let s_applause;
let userHits = 0;
let browserHits = 0;

function preload() {
    for (let s = 0; s < 15; s++) {
        let name = 'res/idb' + s + '.bmp'
        img[s] = loadImage(name);
        board.push ({key: s, visible: true})
    }
    board = shuffle(board.concat(board));
    imgDeck = loadImage('res/deck.bmp');
    imgBlack = loadImage('res/black.bmp');
    s_ohoh = loadSound('res/ohoh.wav');
    s_applause = loadSound('res/applause.wav');
}

function draw_board() {
    background(0);
    for (let n = 0; n < 6; n++) {
        for (let s = 0; s < 5; s++) {
            image(imgDeck, n * 41, s * 63);
        }
    }
}

function setup() {
    createCanvas(800, 600);
    draw_board();
}

function printScore() {
    fill(255, 0, 0);
    rect (6, 320, 160, 40);
    rect (6, 366, 160, 40);
    textSize(32);
    fill(255, 204, 0);
    text('User: ' + userHits, 10, 350);
    text('Comp: ' + browserHits, 10, 396);
}

let clicked = 0;
let stack = [];

function mouseClicked() {
    let mouX = Math.floor(mouseX / 41);
    let mouY = Math.floor(mouseY / 63);
    if (mouX > 5 || mouY > 4)
        return;
    let idx = mouX + 6 * mouY;
    if (board[idx].visible === false)
        return;
    let xpos = mouX * 41;
    let ypos = mouY * 63;
    image(img[board[idx].key], xpos, ypos);
    let obj = {x: xpos, y: ypos, idx: idx};
    stack.push(obj);
    clicked++;
    if (clicked === 2) {
        clicked = 0;
        let ob = stack[0];
        if (idx !== ob.idx) {
            if (board[idx].key !== board[ob.idx].key)
                s_ohoh.play();
            else {
                s_applause.play();
                userHits++;
                board[idx].visible = false;
                board[ob.idx].visible = false;
            }
        }
        let timer = setTimeout(function () {
            while (stack.length !== 0) {
                let ob = stack.pop();
                if (board[ob.idx].visible === true)
                    image(imgDeck, ob.x, ob.y);
                else
                    image(imgBlack, ob.x, ob.y);
            }
            printScore();
            clearTimeout(timer);
        }, 1000);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}
