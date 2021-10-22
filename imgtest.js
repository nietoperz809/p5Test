let img = [];
let imgDeck;
let imgBlack;
let imgs = 15;
let board = [];
let visible = [];
let s_ohoh;
let s_applause;

function preload() {
    for (let s = 0; s < imgs; s++) {
        let name = 'res/idb' + s + '.bmp'
        img[s] = loadImage(name);
        board[s] = s;
        visible[s] = true;
    }
    visible = visible.concat(visible);
    board = shuffle(board.concat(board));
    imgDeck = loadImage('res/deck.bmp');
    imgBlack = loadImage('res/black.bmp');
    s_ohoh = loadSound('res/ohoh.wav');
    s_applause = loadSound('res/applause.wav');
}

function draw_board() {
    background(0);
    for (let n = 0; n < 5; n++) {
        for (let s = 0; s < 6; s++) {
            let idx = n + 6 * s;
            if (visible[idx] === true)
                image(imgDeck, s * 41, n * 63);
        }
    }
}

function setup() {
    createCanvas(800, 400);
    draw_board();
}

let clicked = 0;
let stack = [];

function mouseClicked() {
    let mouX = Math.floor(mouseX / 41);
    let mouY = Math.floor(mouseY / 63);
    let idx = mouX + 5 * mouY;
    let xpos = mouX * 41;
    let ypos = mouY * 63;
    //console.log(idx, xpos, ypos);
    image(img[board[idx]], xpos, ypos);
    let obj = {x: xpos, y: ypos, idx: idx};
    stack.push(obj);
    clicked++;
    if (clicked === 2) {
        clicked = 0;
        let ob = stack[0];
        if (idx !== ob.idx) {
            if (board[idx] !== board[ob.idx])
                s_ohoh.play();
            else {
                s_applause.play();
                visible[idx] = false;
                visible[ob.idx] = false;
            }
        }
        let timer = setTimeout(function () {
            while (stack.length !== 0) {
                let ob = stack.pop();
                if (visible[ob.idx] === true)
                    image(imgDeck, ob.x, ob.y);
                else
                    image(imgBlack, ob.x, ob.y);
            }
            clearTimeout(timer);
        }, 1000);
    }
    //draw_board();
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
