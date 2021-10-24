let imgDeck;
let imgBlack;
let board = [];
let s_ohoh = "data:audio/mpeg;base64,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";
var sndohoh = new Audio (s_ohoh);
//let s_applause; fuckgg
let userHits = 0;
let browserHits = 0;

function preload() {
    for (let s = 0; s < 15; s++) {
        let name = 'idb' + s + '.bmp'
        let img = loadImage(name);
        board.push ({image: img, key: s, visible: true})
    }
    board = shuffle(board.concat(board));
    //console.log(board);
    imgDeck = loadImage('deck.bmp');
    imgBlack = loadImage('black.bmp');
    //s_ohoh = loadSound('https://rawcdn.githack.com/nietoperz809/p5Test/3da27d0690209097beb7234f71094009c9af928f/APPLAUSE.WAV');
    //s_applause = loadSound('https://rawcdn.githack.com/nietoperz809/p5Test/3da27d0690209097beb7234f71094009c9af928f/APPLAUSE.WAV');
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
let click_alowed = true;

function mouseClicked() {
    if (click_alowed === false)
        return;
    let mouX = Math.floor(mouseX / 41);
    let mouY = Math.floor(mouseY / 63);
    if (mouX > 5 || mouY > 4)
        return;
    let idx = mouX + 6 * mouY;
    if (board[idx].visible === false)
        return;
    let xpos = mouX * 41;
    let ypos = mouY * 63;
    image (board[idx].image, xpos, ypos);
    let obj = {x: xpos, y: ypos, idx: idx};
    stack.push(obj);
    clicked++;
    if (clicked === 2) {
        clicked = 0;
        let ob = stack[0];
        if (idx !== ob.idx) {
            if (board[idx].key !== board[ob.idx].key) {
                sndohoh.play();
            }
            else {
                //s_applause.play();
                userHits++;
                board[idx].visible = false;
                board[ob.idx].visible = false;
            }
        }
        click_alowed = false;
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
            click_alowed = true;
        }, 1000);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////


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
