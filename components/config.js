"use client";
//config.js
import * as Phaser from 'phaser';
import FlappyBird from './FlappyBird';
import GameOver from './GameOver';

const canvasWidth = 800; // Width of the game canvas
const canvasHeight = 600; // Height of the game canvas

const config = {
    type: Phaser.AUTO,
    width: canvasWidth,
    height: canvasHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, 
            debug: false,
        },
    },
    scene: [FlappyBird], // Use an array for scenes
};

export default config;
