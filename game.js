const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 角色属性
let bird = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    velocityY: 0,
    gravity: 0.5,
    jumpStrength: -10,
    currentImage: new Image(),
    frames: ["bird1.png", "bird2.png"], // 两张图片路径
    frameIndex: 0,
    frameRate: 10,
    frameCounter: 0,
};

// 设置初始图片
bird.currentImage.src = bird.frames[0];

// 动态调整画布尺寸
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 更新角色动画帧
function updateFrame() {
    bird.frameCounter++;
    if (bird.frameCounter >= bird.frameRate) {
        bird.frameCounter = 0;
        bird.frameIndex = (bird.frameIndex + 1) % bird.frames.length;
        bird.currentImage.src = bird.frames[bird.frameIndex];
    }
}

// 游戏主循环
function update() {
    // 更新重力和位置
    bird.velocityY += bird.gravity;
    bird.y += bird.velocityY;

    // 碰到地面时复位
    if (bird.y + bird.height > canvas.height) {
        bird.y = canvas.height - bird.height;
        bird.velocityY = 0;
    }

    // 碰到顶部时限制
    if (bird.y < 0) {
        bird.y = 0;
        bird.velocityY = 0;
    }

    // 清空画布并绘制角色
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bird.currentImage, bird.x - bird.width / 2, bird.y, bird.width, bird.height);

    updateFrame();
    requestAnimationFrame(update);
}

// 监听点击事件控制跳跃
canvas.addEventListener("click", () => {
    bird.velocityY = bird.jumpStrength;
});

// 启动游戏
update();
