import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GameOver from '../GameOver.vue'
import { useGameStore } from '@/stores/gameStore'

// Mock du store
vi.mock('@/stores/gameStore', () => ({
  useGameStore: vi.fn(),
}))

const mockedUseGameStore = useGameStore as unknown as ReturnType<typeof vi.fn>

describe('GameOver.vue', () => {
  it('affiche le message "Partie terminée"', () => {
    mockedUseGameStore.mockReturnValue({ score: 10 })
    const wrapper = mount(GameOver)

    expect(wrapper.find('.gameOver').exists()).toBe(true)
    expect(wrapper.text()).toContain('Partie terminée')
  })

  it('affiche le ScorePanel', () => {
    mockedUseGameStore.mockReturnValue({ score: 5 })
    const wrapper = mount(GameOver)

    expect(wrapper.findComponent({ name: 'ScorePanel' }).exists()).toBe(true)
  })

  // Cas inattendus

  it('n\'explose pas si score est undefined', () => {
    mockedUseGameStore.mockReturnValue({})
    const wrapper = mount(GameOver)

    expect(wrapper.find('.gameOver').exists()).toBe(true)
  })

  it('affiche correctement un très grand score', () => {
    mockedUseGameStore.mockReturnValue({ score: 999999 })
    const wrapper = mount(GameOver)

    expect(wrapper.text()).toContain('Partie terminée')
  })

  it('affiche le message même si score est NaN', () => {
    mockedUseGameStore.mockReturnValue({ score: NaN })
    const wrapper = mount(GameOver)

    expect(wrapper.find('.gameOver').text()).toContain('Partie terminée')
  })
})
