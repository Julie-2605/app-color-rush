import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGameStore } from '../gameStore'

describe('gameStore', () => {
  let store: ReturnType<typeof useGameStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useGameStore()
  })

  it('état initial', () => {
    expect(store.gameStarted).toBe(false)
    expect(store.gameOver).toBe(false)
    expect(store.score).toBe(0)
  })

  it('startGame initialise correctement', () => {
    store.startGame()
    expect(store.gameStarted).toBe(true)
    expect(store.gameOver).toBe(false)
    expect(store.score).toBe(0)
  })

  it('endGame met fin à la partie', () => {
    store.startGame()
    store.endGame()
    expect(store.gameStarted).toBe(false)
    expect(store.gameOver).toBe(true)
  })

  it('incrementScore augmente le score', () => {
    store.score = 5
    store.incrementScore()
    expect(store.score).toBe(6)
  })

  it('decrementScore diminue le score s\'il est > 0', () => {
    store.score = 2
    store.decrementScore()
    expect(store.score).toBe(1)
  })

  it('decrementScore ne diminue pas le score s\'il est à 0', () => {
    store.score = 0
    store.decrementScore()
    expect(store.score).toBe(0)
  })

  it('resetScore remet le score à 0', () => {
    store.score = 10
    store.resetScore()
    expect(store.score).toBe(0)
  })

  it('getRandomColor retourne une couleur valide', () => {
    const validColors = ["#5DE3F5", "#406DF5", "#3FA7F4", "#9DF5E2", "#A39DF5", "#BCDCF5"]
    for(let i = 0; i < 20; i++) {
      const color = store.getRandomColor()
      expect(validColors).toContain(color)
    }
  })

  it('defineCurrentColor définit une couleur valide', () => {
    store.defineCurrentColor()
    expect(store.colors).toContain(store.currentColor)
  })
})
