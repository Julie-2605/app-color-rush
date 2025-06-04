<template>
  <div>
    <p class="timer">Temps restant : {{ timer }}s</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const timer = ref(45)
let intervalId: number | undefined

onMounted(() => {
  intervalId = window.setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      clearInterval(intervalId)
      gameStore.endGame();
    }
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
p {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
