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
    },
    getRandomColor() {
        const colors = ["#5DE3F5", "#406DF5", "#3FA7F4", "#9DF5E2", "#A39DF5", "#BCDCF5"];
        
        return colors[Math.floor(Math.random() * colors.length)];
    },
  }
})
