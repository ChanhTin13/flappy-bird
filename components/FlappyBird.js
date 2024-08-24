// FlappyBird.js
import Phaser from "phaser";

class FlappyBird extends Phaser.Scene {
  constructor() {
    super("FlappyBird");
    this.score = 0; // Initialize the score
    this.pipesPassed = []; // Track pipe pairs that have been passed
    this.soundsInitialized = false; // Track if sounds have been initialized
    this.gameStarted = false; // Track if the game has started
  }

  preload() {
    this.load.image("bird", "/assets/bird.png");
    this.load.image("pipe", "/assets/pipe.png");
    this.load.image("sky", "/assets/sky.png");
    this.load.image("restart", "/assets/restart.png"); // Load restart image for game over screen
    // Load sounds
    this.load.audio("click", "/sounds/jump.mp3");
    this.load.audio("score", "/sounds/pass.mp3");
    this.load.audio("hit", "/sounds/bruh.mp3");
  }
  initializeSounds() {
    if (!this.soundsInitialized) {
      this.sound.add("click");
      this.sound.add("score");
      this.sound.add("hit");
      this.soundsInitialized = true;
    }
  }

  create() {
    this.score = 0;
    this.gameStarted = false;
    this.soundsInitialized = false;
    this.initializeSounds();
    const { width, height } = this.sys.game.canvas;
    this.add.image(width / 2, height / 2, "sky").setDisplaySize(width, height);

    this.bird = this.physics.add.image(100, 250, "bird").setOrigin(0.5, 0.5);
    this.bird.setGravityY(0);
    this.bird.setBounce(0.2);
    this.bird.setCollideWorldBounds(true);

     // Tạo đối tượng ground ở đáy màn hình
  this.ground = this.add.rectangle(width / 2, height - 10, width, 0, 0x00ff00);
  this.physics.add.existing(this.ground);
  this.ground.body.setImmovable(true);
  this.ground.body.setAllowGravity(false); // Không áp dụng trọng lực cho ground

    // Create initial pipes and score text
    this.pipes = this.physics.add.group();
    this.physics.add.collider(this.bird, this.pipes, this.endGame, null, this); 
    this.physics.add.collider(this.bird, this.ground, this.endGame, null, this);

    // Create score text in the top-left corner
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#ffffff",
    });
    this.scoreText.setDepth(10); // Set depth to ensure it appears on top

    // Setup input interaction to initialize sounds
    this.input.on("pointerdown", () => {
      if (this.gameStarted==true) {
        this.sound.play("click");
        this.bird.setVelocityY(-300);
        this.bird.setGravityY(1000); // Start gravity
      }
      if (!this.gameStarted) {
        this.gameStarted = true;

        this.time.addEvent({
          delay: 1500,
          callback: this.addPipe,
          callbackScope: this,
          loop: true,
        });
      }
    });
  }

  addPipe() {
    const gap = 150;
    const pipeHeight = this.textures.get("pipe").getSourceImage().height;
    const randomY = Phaser.Math.Between(
      gap + 50,
      this.sys.game.canvas.height - gap - 50
    );

    const topPipe = this.pipes.create(
      this.game.config.width,
      randomY - gap / 2,
      "pipe"
    );
    topPipe.setOrigin(0, 1);
    topPipe.setScale(1.5);
    topPipe.setFlipY(true);
    topPipe.setVelocityX(-200);
    topPipe.allowGravity = false;
    topPipe.scored = false; // Initialize the scored property

    const bottomPipe = this.pipes.create(
      this.game.config.width,
      randomY + gap / 2,
      "pipe"
    );
    bottomPipe.setOrigin(0, 0);
    bottomPipe.setScale(1.5);
    bottomPipe.setVelocityX(-200);
    bottomPipe.allowGravity = false;
    bottomPipe.scored = false; // Initialize the scored property

    topPipe.checkWorldBounds = true;
    topPipe.outOfBoundsKill = true;
    bottomPipe.checkWorldBounds = true;
    bottomPipe.outOfBoundsKill = true;
  }

  update() {
    this.pipes.children.iterate((pipe) => {
      if (pipe.getBounds().right < this.bird.x && !pipe.scored) {
        this.incrementScore();
        if (this.soundsInitialized) this.sound.play("score");
        pipe.scored = true;
        const otherPipe = this.pipes
          .getChildren()
          .find((p) => p !== pipe && p.x === pipe.x);
        if (otherPipe) otherPipe.scored = true;
      }
    }); 
  }

  endGame() {
    this.gameStarted=false;
    this.physics.pause();
    this.bird.setGravity(0);
    this.bird.setTint(0xff0000);

    // Play hit sound if initialized
    if (this.soundsInitialized) {
      this.sound.play("hit");
    }

    this.showGameOverScreen();
  }
  showGameOverScreen() {
    // Show the game over screen
    const { width, height } = this.sys.game.canvas;
    this.add
      .rectangle(width / 2, height / 2, width, height, 0x000000, 0.8)
      .setDepth(5);
    const gameOverText = this.add
      .text(width / 2, height / 2 - 50, `Game Over\nScore: ${this.score}`, {
        fontSize: "64px",
        fill: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(10);

    // Restart button
    const restartButton = this.add
      .image(width / 2, height / 2 + 50, "restart")
      .setInteractive()
      .setDepth(10);
    restartButton.setScale(0.5);
    restartButton.on("pointerdown", () => {
      this.scene.start("FlappyBird"); // Restart the FlappyBird scene
    });
  }

  incrementScore() {
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);
  }
}

export default FlappyBird;
