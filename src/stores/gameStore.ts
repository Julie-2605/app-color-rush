import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
    state: () => ({
        gameStarted: false,
        gameOver: false,
    }),

    actions: {
        toggleStartGame() {
            this.gameStarted = !this.gameStarted
        },
        toggleGameOver() {
            this.gameOver = !this.gameOver
        },
        getRandomColor() {
            // const colors = {"Marais Tranquille": "#5DE3F5", "Bleu Électrique" : "#406DF5", "Plongeon à Acapulco" : "#3FA7F4", "Vert Opaline" : "#9DF5E2", "Lavande" : "#A39DF5", "Bleu d'Azur" : "#BCDCF5"};
            const colors = ["#5DE3F5", "#406DF5", "#3FA7F4", "#9DF5E2", "#A39DF5", "#BCDCF5"];
            
            return colors[Math.floor(Math.random() * colors.length)];
        },
        displayRandomCircle() {

        },
        clickCircle() {

        },
        updateScore() {

        },
        adjustSpeed() {
            
        },
    }
});
