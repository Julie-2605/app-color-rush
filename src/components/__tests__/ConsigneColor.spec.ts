import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Consigne from '@/components/ConsigneColor.vue'
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'

// Mock du module une seule fois
vi.mock('@/stores/gameStore', () => ({
  useGameStore: vi.fn(),
}))

// Accès direct au mock
const mockedUseGameStore = useGameStore as unknown as ReturnType<typeof vi.fn>

// Générateur de store simulé
const mockUseGameStore = (color: string | undefined) => {
  return { currentColor: ref(color) }
}

describe('Consigne.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('affiche la consigne avec la bonne couleur et le nom', () => {
  mockedUseGameStore.mockReturnValue(mockUseGameStore('#5DE3F5'))

  const wrapper = mount(Consigne)

  const instruction = wrapper.get('[data-testid="instruction"]')
  expect(instruction.text()).toContain('Cliquez sur les ronds de couleur')

  const strong = wrapper.get('[data-testid="#5DE3F5"]')
  expect(strong.text()).toContain('Marais Tranquille')

  // Vérifie la couleur appliquée via style CSS
  const colorSpan = strong.find('span.color-sample').element as HTMLElement
  expect(colorSpan.style.backgroundColor).toBe('rgb(93, 227, 245)')
})


  it('ne plante pas si currentColor est undefined', () => {
    mockedUseGameStore.mockReturnValue(mockUseGameStore(undefined))

    const wrapper = mount(Consigne)
    expect(wrapper.find('[data-testid="instruction"]').exists()).toBe(true)
  })

  it('gère une couleur non connue', () => {
    mockedUseGameStore.mockReturnValue(mockUseGameStore('#123456'))

    const wrapper = mount(Consigne)
    const strong = wrapper.get('[data-testid="#123456"]')
    expect(strong.text()).not.toContain('undefined') // pas de nom = string vide
  })

  it('gère une couleur vide', () => {
    mockedUseGameStore.mockReturnValue(mockUseGameStore(''))

    const wrapper = mount(Consigne)
    const strong = wrapper.find('[data-testid=""]')
    expect(strong.exists()).toBe(true)
  })
})
