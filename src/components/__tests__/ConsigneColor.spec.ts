 
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ConsigneColor from '@/components/ConsigneColor.vue'
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'


vi.mock('@/stores/gameStore', () => ({
  useGameStore: vi.fn(),
}))

const mockUseGameStore = (color: string | undefined) => {
  const currentColor = ref(color)
  return { currentColor }
}

describe('Consigne.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

 it('affiche la consigne avec la bonne couleur et le nom', () => {
    const store = mockUseGameStore('#5DE3F5')
    const useGameStore = require('@/stores/gameStore').useGameStore
    useGameStore.mockReturnValue(store)

    const wrapper = mount(ConsigneColor)

    const instruction = wrapper.get('[data-testid="instruction"]')
    expect(instruction.text()).toContain('Cliquez sur les ronds de couleur')

    const strong = wrapper.get(`[data-testid="#5DE3F5"]`)
    const colorSample = strong.find('.color-sample')
    expect(colorSample.attributes('style')).toContain('background-color: #5DE3F5')
  })

  it('ne plante pas si currentColor est undefined', () => {
    const store = mockUseGameStore(undefined)
    const useGameStore = require('@/stores/gameStore').useGameStore
    useGameStore.mockReturnValue(store)

    const wrapper = mount(ConsigneColor)
    expect(wrapper.find('[data-testid="instruction"]').exists()).toBe(true)
  })
   it('gère une couleur non connue', () => {
    const store = mockUseGameStore('#123456')
    const useGameStore = require('@/stores/gameStore').useGameStore
    useGameStore.mockReturnValue(store)

    const wrapper = mount(ConsigneColor)
    const strong = wrapper.get(`[data-testid="#123456"]`)
    expect(strong.text()).not.toContain('undefined')
  })

  it('gère une couleur vide', () => {
    const store = mockUseGameStore('')
    const useGameStore = require('@/stores/gameStore').useGameStore
    useGameStore.mockReturnValue(store)

    const wrapper = mount(ConsigneColor)
    const strong = wrapper.find('[data-testid=""]')
    expect(strong.exists()).toBe(true)
  })
})