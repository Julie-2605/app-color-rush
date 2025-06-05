<template>
    <div
    :data-testid="`circle-${color}`"
    class="circle"
    :style="{ backgroundColor: color, left: `${x}px`, top: `${y}px` }"
    @click="clickCircle"
    ></div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const color = ref<string>('')

watchEffect(() => {
  if (gameStore.targetColor) {
    color.value = gameStore.getRandomColor()
  }
})

function handleClick() {
  if (color.value === gameStore.targetColor) {
    gameStore.incrementScore()
  } else {
    gameStore.decrementScore()
  }

  gameStore.setNewTargetColor()
}
</script>

<template>
  <div
    class="circle"
    :style="{ backgroundColor: color }"
    @click="handleClick"
    :data-testid="`circle-${color}`"
  />
</template>

<style scoped>
.circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.circle:hover {
    transform: scale(1.1);
}
</style>
