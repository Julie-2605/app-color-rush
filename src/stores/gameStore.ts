import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    gameStarted: false,
    gameOver: false,
    score: 0,
  }),

  actions: {
    startGame() {
      this.gameStarted = true
      this.gameOver = false
      this.score = 0
    },
    endGame() {
      this.gameStarted = false
      this.gameOver = true
    },
    incrementScore() {
      this.score += 1
    },
    decrementScore() {
      if (this.score > 0) {
        this.score -= 1
      }
    },
    resetScore() {
      this.score = 0
    }
  }
})
