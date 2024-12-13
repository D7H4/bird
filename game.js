// 获取游戏画布和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 设置画布尺寸
canvas.width = 480;
canvas.height = 640;

// 设置背景颜色
document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
canvas.style.backgroundColor = '#70c5ce'; // 背景颜色设为天蓝色

// 鸟的属性
const bird = {
  x: canvas.width / 2 - 15,  // 初始位置设置为画面中央
  y: canvas.height / 2 - 15,
  width: 30,
  height: 30,
  speed: 0,
  gravity: 0.2,  // 重力
  lift: -5,      // 跳跃力度
  isGameStarted: false  // 游戏是否开始
};

// 跳跃操作
document.addEventListener('keydown', function(event) {
  if (event.key === ' ' && !bird.isGameStarted) {
    bird.isGameStarted = true;  // 开始游戏
  } else if (event.key === ' ' && bird.isGameStarted) {
    bird.speed = bird.lift;  // 控制跳跃力度
  }
});

// 游戏主循环
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布

  // 如果游戏还没开始，显示提示
  if (!bird.isGameStarted) {
    ctx.fillStyle = '#000'; // 提示文字颜色
    ctx.font = '30px Arial';
    ctx.fillText('Press Space to Start', canvas.width / 3, canvas.height / 2);
  } else {
    // 角色物理
    bird.speed += bird.gravity;
    bird.y += bird.speed;

    // 如果鸟飞出屏幕，重置位置
    if (bird.y > canvas.height - bird.height) {
      bird.y = canvas.height - bird.height;
      bird.speed = 0;
    }
    if (bird.y < 0) {
      bird.y = 0;
      bird.speed = 0;
    }

    // 绘制鸟
    ctx.fillStyle = '#ff0'; // 鸟的颜色
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
  }

  requestAnimationFrame(gameLoop); // 调用下一帧
}

// 启动游戏
gameLoop();
