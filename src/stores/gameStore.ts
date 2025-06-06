import Circle from '@/components/Circle.vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    gameStarted: false,
    gameOver: false,
    score: 0,
    colors: ["#5DE3F5", "#406DF5", "#3FA7F4", "#9DF5E2", "#A39DF5"],
    currentColor: '',
    speed: 500,
    circleDisappear: 1500,
  }),

  actions: {
    startGame() {
      this.gameStarted = true
      this.gameOver = false
      this.score = 0
      this.speed = 500
      this.circleDisappear = 1500
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
    defineCurrentColor() {
        this.currentColor = this.getRandomColor();
    },
    getRandomColor() {
     return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
  }
})
