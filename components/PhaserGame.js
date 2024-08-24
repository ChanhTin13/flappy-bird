// components/PhaserGame.js
"use client"; // Ensure this is a client-side component
import React, { useEffect } from 'react';
import * as Phaser from 'phaser';
import config from './config';

const PhaserGame = () => {
    useEffect(() => {
        // Initialize the Phaser game
        const game = new Phaser.Game(config);

        // Clean up the game instance on component unmount
        return () => {
            if (game && game.destroy) {
                game.destroy(true); // Ensure game is destroyed properly
            }
        };
    }, []);

    return <div id="game" style={{ width: '100%', height: '100%' }} />;
};

export default PhaserGame;
