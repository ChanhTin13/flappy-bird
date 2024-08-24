"use client";
import * as Phaser from 'phaser';

class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.score = data.score;
  }

  preload() {
    this.load.image("restart", "/assets/restart.png");
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    // Hiển thị điểm số
    this.add.text(width / 2, height / 2 - 100, `Score: ${this.score}`, {
      fontSize: "64px",
      fill: "#fff",
      align: "center"
    }).setOrigin(0.5, 0.5);

    // Tạo popup
    const restartButton = this.add.image(width / 2, height / 2, "restart").setInteractive();
    restartButton.setScale(0.5);
    restartButton.setOrigin(0.5, 0.5);

    restartButton.on('pointerdown', () => {
      this.scene.stop("FlappyBird");
      this.scene.start("FlappyBird"); // Khởi động lại trò chơi
      this.scene.stop(); // Dừng scene game over
    });

    // Tạo nền popup
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.8); // Màu nền đen với độ trong suốt 80%
    graphics.fillRect(0, 0, width, height);
    graphics.sendToBack(); // Đưa nền ra sau các đối tượng khác
  }
}

export default GameOver;
