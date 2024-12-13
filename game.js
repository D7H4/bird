const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 定義馬力歐的屬性
let mario = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 70,
    velocity: 0,
    gravity: 0.5,
    jumpCount: 0, // 記錄跳躍次數
    maxJumps: 2, // 最大允許的跳躍次數
    currentImage: null,
    images: {
        idle: new Image(),
        jump: new Image()
    }
};

// 加載馬力歐圖片
mario.images.idle.src = "mario_idle.png"; // 站立圖
mario.images.jump.src = "mario_jump.png"; // 跳躍圖
mario.currentImage = mario.images.idle; // 預設為站立圖

function drawMario() {
    ctx.drawImage(mario.currentImage, mario.x, mario.y, mario.width, mario.height);
}

function update() {
    mario.velocity += mario.gravity;
    mario.y += mario.velocity;

    // 碰到地面時重置跳躍
    if (mario.y + mario.height > canvas.height) {
        mario.y = canvas.height - mario.height;
        mario.velocity = 0;
        mario.jumpCount = 0; // 重置跳躍次數
        mario.currentImage = mario.images.idle; // 切回站立圖
    }

    // 清空畫布並繪製 Mario
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMario();
    requestAnimationFrame(update);
}

// 點擊跳躍
canvas.addEventListener("click", () => {
    if (mario.jumpCount < mario.maxJumps) {
        mario.velocity = -10; // 跳躍力量
        mario.jumpCount++; // 增加跳躍次數
        mario.currentImage = mario.images.jump; // 切換到跳躍圖
    }
});

// 開始遊戲循環
update();
