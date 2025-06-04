<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const props = defineProps<{
  targetColor: string
}>()

const gameStore = useGameStore()
const emit = defineEmits(['next-round'])

const color = ref<string>(gameStore.getRandomColor())

function handleClick() {
  if (color.value === props.targetColor) {
    gameStore.incrementScore()
  } else {
    gameStore.decrementScore()
  }

  emit('next-round')
}
</script>

<template>
  <div
    class="circle"
    :style="{ backgroundColor: color.value }"
    @click="handleClick"
    :data-testid="`circle-${color.value}`"
  />
</template>

<style scoped>
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.circle:hover {
  transform: scale(1.05);
}
</style>
