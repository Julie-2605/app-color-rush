import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import ScorePanel from '../ScorePanel.vue'
import { useGameStore } from '@/stores/gameStore'

vi.mock('@/stores/gameStore', () => ({
    useGameStore: vi.fn(),
}))

const mockedUseGameStore = useGameStore as unknown as ReturnType<typeof vi.fn>

describe('ScorePanel.vue', () => {
    it('affiche le score actuel', () => {
        mockedUseGameStore.mockReturnValue({
            score: ref(15)
        })
        const wrapper = mount(ScorePanel)

        expect(wrapper.text()).toContain('Votre score : 15')
    })

    it('affiche 0 quand le score est à 0', () => {
        mockedUseGameStore.mockReturnValue({ score: ref(0) })
        const wrapper = mount(ScorePanel)
        expect(wrapper.text()).toContain('Votre score : 0')
    })

    it('affiche une valeur positive', () => {
        mockedUseGameStore.mockReturnValue({ score: ref(15) })
        const wrapper = mount(ScorePanel)
        expect(wrapper.text()).toContain('Votre score : 15')
    })

    it('met à jour l\'affichage quand le score change', async () => {
        const scoreRef = ref(10)
        mockedUseGameStore.mockReturnValue({ score: scoreRef })

        const wrapper = mount(ScorePanel)
        expect(wrapper.text()).toContain('Votre score : 10')

        scoreRef.value = 42
        await nextTick()
        expect(wrapper.text()).toContain('Votre score : 42')
    })


    it('affiche un très grand score correctement', () => {
        mockedUseGameStore.mockReturnValue({
            score: ref(9999999)
        })
        const wrapper = mount(ScorePanel)

        expect(wrapper.text()).toContain('Votre score : 9999999')
    })
})
