const spriteFrameWidth = 271 / 4;
const spriteFrameHeight = 104;
const characterSize = 104;
const moveSpeed = 240;

let walkSprite;
let characterX;
let characterY;
let facing = 1;

function preload() {
  walkSprite = loadImage("walk all.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  characterX = width / 2;
  characterY = height / 2;
  imageMode(CENTER);
  noSmooth();
}

function draw() {
  background("#6A2E35");

  const movingLeft = keyIsDown(LEFT_ARROW);
  const movingRight = keyIsDown(RIGHT_ARROW);
  const isMoving = movingLeft !== movingRight;

  if (isMoving) {
    facing = movingLeft ? -1 : 1;
    characterX += facing * moveSpeed * deltaTime / 1000;
  }

  const drawWidth = spriteFrameWidth * characterSize / spriteFrameHeight;
  characterX = constrain(characterX, drawWidth / 2, width - drawWidth / 2);

  const frame = isMoving ? floor(millis() / 120) % 4 : 0;
  push();
  translate(characterX, characterY);
  scale(facing, 1);
  image(
    walkSprite,
    0,
    0,
    drawWidth,
    characterSize,
    frame * spriteFrameWidth,
    0,
    spriteFrameWidth,
    spriteFrameHeight
  );
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  characterY = height / 2;
}
