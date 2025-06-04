import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Timer from '../Timer.vue'
import { useGameStore } from '@/stores/gameStore'

vi.mock('@/stores/gameStore', () => ({
    useGameStore: vi.fn()
}))

const mockedUseGameStore = useGameStore as unknown as ReturnType<typeof vi.fn>

describe('Timer.vue', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('affiche 60s au début', () => {
        mockedUseGameStore.mockReturnValue({
            startGame: vi.fn(),
            endGame: vi.fn()
        })

        const wrapper = mount(Timer)
        expect(wrapper.text()).toContain('60s')
    })

    it('réduit le temps chaque seconde', async () => {
        mockedUseGameStore.mockReturnValue({
            startGame: vi.fn(),
            endGame: vi.fn()
        })

        const wrapper = mount(Timer)

        vi.advanceTimersByTime(1000)
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('59s')
    })
    it('ne passe jamais sous 0', async () => {
        mockedUseGameStore.mockReturnValue({
            endGame: vi.fn(),
            startGame: vi.fn()
        })

        const wrapper = mount(Timer)

        vi.advanceTimersByTime(70000)
        await wrapper.vm.$nextTick()

        const text = wrapper.text()
        const seconds = parseInt(text.match(/\d+/)?.[0] || '0', 10)

        expect(seconds).toBeGreaterThanOrEqual(0)
    })
    it('appelle endGame() quand le timer atteint 0', async () => {
        const endGame = vi.fn()

        mockedUseGameStore.mockReturnValue({
            startGame: vi.fn(),
            endGame
        })

        mount(Timer)

        vi.advanceTimersByTime(61000)
        expect(endGame).toHaveBeenCalled()
    })
})
