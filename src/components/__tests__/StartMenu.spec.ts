import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import StartMenu from '../StartMenu.vue'
import { useGameStore } from '@/stores/gameStore'

// Mock du store
vi.mock('@/stores/gameStore', () => ({
  useGameStore: vi.fn(),
}))

// Cast pour pouvoir accéder à mockReturnValue
const mockedUseGameStore = useGameStore as unknown as ReturnType<typeof vi.fn>

describe('StartMenu.vue', () => {
  it('affiche le bouton Start', () => {
    mockedUseGameStore.mockReturnValue({
      startGame: vi.fn(),
      resetScore: vi.fn()
    })

    const wrapper = mount(StartMenu)
    expect(wrapper.get('button.startBtn').text()).toBe('Start')
  })

  it('appelle les fonctions du store quand on clique', async () => {
    const toggleMock = vi.fn()
    const resetMock = vi.fn()

    mockedUseGameStore.mockReturnValue({
      startGame: toggleMock,
      resetScore: resetMock
    })

    const wrapper = mount(StartMenu)
    await wrapper.get('button.startBtn').trigger('click')

    expect(toggleMock).toHaveBeenCalled()
    expect(resetMock).toHaveBeenCalled()
  })
})
