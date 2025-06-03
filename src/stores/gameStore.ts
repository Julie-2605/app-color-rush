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
        }
    } 
})
