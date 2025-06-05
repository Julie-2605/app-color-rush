<template>
  <div>
    <p class="timer">Temps restant : {{ timer }}s</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const timer = ref(60)
// let intervalId: number | undefined
let intervalId: ReturnType<typeof setInterval> | null = null

watch(timer, (t) => {
  if (t === 30) {
    gameStore.speed = 400;
    gameStore.circleDisappear = 750;
  }

  if (t === 15) {
    gameStore.speed = 120;
    gameStore.circleDisappear = 1100;
  }
});

onMounted(() => {
  intervalId = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      if (intervalId !== null) clearInterval(intervalId)
      gameStore.endGame()
    }
  }, 1000)
});

onBeforeUnmount(() => {
  if (intervalId !== null) clearInterval(intervalId)
});
</script>

<style scoped>
p {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>