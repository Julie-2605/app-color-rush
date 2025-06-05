import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Circle from '@/components/Circle.vue'
import { useGameStore } from '@/stores/gameStore'

vi.mock('@/stores/gameStore', () => ({
  useGameStore: vi.fn(),
}))

const mockedUseGameStore = useGameStore as unknown as ReturnType<typeof vi.fn>

describe('Circle.vue', () => {
  const defaultProps = {
    id: 1,
    x: 100,
    y: 150,
    color: '#FAFAFA',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('affiche un cercle avec une couleur générée et position', () => {
    mockedUseGameStore.mockReturnValue({
    currentColor: '#5DE3F5',
    getRandomColor: () => '#5DE3F5',
    incrementScore: vi.fn(),
    decrementScore: vi.fn(),
  })

  const wrapper = mount(Circle, {
    props: defaultProps,
  })

  const el = wrapper.find('[data-testid="circle-#5DE3F5"]')
  expect(el.exists()).toBe(true)

  const style = el.attributes('style')
  expect(style).toContain('background-color: rgb(93, 227, 245)')
  expect(style).toContain(`left: ${defaultProps.x}px`)
  expect(style).toContain(`top: ${defaultProps.y}px`)
})

  it('augmente le score si on clique sur la bonne couleur', async () => {
    const incrementScore = vi.fn()
    const setNewTargetColor = vi.fn()

    mockedUseGameStore.mockReturnValue({
      currentColor: '#5DE3F5',
      getRandomColor: () => '#5DE3F5',
      incrementScore,
      decrementScore: vi.fn(),
      setNewTargetColor,
    })

    const wrapper = mount(Circle, {
      props: defaultProps,
    })

    await wrapper.trigger('click')

    expect(incrementScore).toHaveBeenCalled()
  })

  it('diminue le score si on clique sur une mauvaise couleur', async () => {
    const decrementScore = vi.fn()
    const setNewTargetColor = vi.fn()

    mockedUseGameStore.mockReturnValue({
      currentColor: '#000000',
      getRandomColor: () => '#5DE3F5',
      incrementScore: vi.fn(),
      decrementScore,
      setNewTargetColor,
    })

    const wrapper = mount(Circle, {
      props: defaultProps,
    })

    await wrapper.trigger('click')

    expect(decrementScore).toHaveBeenCalled()
  })

  it('ne casse pas si currentColor est undefined', async () => {
    mockedUseGameStore.mockReturnValue({
      currentColor: undefined,
      getRandomColor: () => '#5DE3F5',
      incrementScore: vi.fn(),
      decrementScore: vi.fn(),
    })

    const wrapper = mount(Circle, {
      props: defaultProps,
    })

    expect(wrapper.find('.circle').exists()).toBe(true)
    await wrapper.trigger('click') 
  })
})
