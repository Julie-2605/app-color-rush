import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
    state: () => ({
        gameStarted: false
    }),

    actions: {
        toggleStartGame() {
            this.gameStarted = !this.gameStarted
        }
    } 
})
