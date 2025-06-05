<script setup lang="ts">
import { defineProps, type DefineProps } from 'vue';
import { ref, watchEffect, onMounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const color = ref<string>('')

const props = defineProps<{
  id: number
  color: string
  x: number
  y: number
}>()

const emit = defineEmits<{
  (e: 'remove-circle', id: number): void
}>()

watchEffect(() => {
  if (gameStore.currentColor) {
    color.value = gameStore.getRandomColor()
  }
})

function handleClick() {
  if (color.value === gameStore.currentColor) {
    gameStore.incrementScore()
  } else {
    gameStore.decrementScore()
  }

setTimeout(() => emit('remove-circle', props.id), 110)

onMounted(() => {
  setTimeout(() => emit('remove-circle', props.id), gameStore.circleDisappear)
})
</script>

<template>
  <motion
    :data-testid="`circle-${color}`"
    class="circle"
    :style="{ backgroundColor: color, left: `${x}px`, top: `${y}px` }"
    :initial="{ scale: 0, opacity: 0 }"
    :enter="{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }"
    :hovered="{ scale: 1.1 }"
    :tapped="{
        scale: [1, 0.8],
        transition: { duration: 0.4, ease: 'easeInOut' }
    }"
    :leave="{ scale: 0.5, opacity: 0, transition: { duration: 0.3 } }"
    @click="handleClick"
  />
</template>


<style scoped>
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  cursor: pointer;
}
</style>
