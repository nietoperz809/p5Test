let img = [];
let imgDeck;
let imgs = 15;
let board = [];
let visible = [];
let s_ohoh;

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
    s_ohoh = loadSound('res/ohoh.wav');
}

function draw_board() {
    background(200);
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
let x_old;
let y_old;
let idx_old;

function mouseClicked() {
    let mouX = Math.floor(mouseX / 41);
    let mouY = Math.floor(mouseY / 63);
    let idx = mouX + 5 * mouY;
    let xpos = mouX * 41;
    let ypos = mouY * 63;
    console.log(idx, xpos, ypos);
    image(img[board[idx]], xpos, ypos);
    clicked++;
    if (clicked === 1) {
        x_old = xpos;
        y_old = ypos;
        idx_old = idx;
    }
    if (clicked === 2) {
        clicked = 0;
        // if (idx === idx_old)
        //     return;
        if (board[idx] !== board[idx_old])
            s_ohoh.play();
        else {
            visible[idx] = false;
            visible[idx_old] = false;
        }
        let timer = setTimeout(function () {
            image(imgDeck, x_old, y_old);
            image(imgDeck, xpos, ypos);
            clearTimeout(timer);
        }, 1000);
    }
    //draw_board();
}

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
