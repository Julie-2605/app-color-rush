<template>
  <motion
    :data-testid="`circle-${color}`"
    class="circle"
    :style="{ backgroundColor: color, left: `${x}px`, top: `${y}px` }"
    @click="clickCircle"
    v-motion="{
      initial: { scale: 0, opacity: 0 },
      enter: { scale: 1, opacity: 1 },
      leave: { scale: 0.5, opacity: 0, transition: { duration: 0.3 } }
    }"
  />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const props = defineProps<{
  id: number,
  color: string,
  x: number,
  y: number
}>()

const emit = defineEmits(['remove-circle'])

function clickCircle() {
  if (props.color === gameStore.currentColor) {
    gameStore.incrementScore()
  } else {
    gameStore.decrementScore()
  }
  emit('remove-circle', props.id)
}

onMounted(() => {
  setTimeout(() => {
    emit('remove-circle', props.id)
  }, gameStore.circleDisappear)
})
</script>

<style scoped>
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  cursor: pointer;
}
</style>
