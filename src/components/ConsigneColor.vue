<template>
  <Transition name="fade-slide" mode="out-in">
    <motion
      :key="currentColor"
      class="consigne"
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }"
    >
      Cliquez sur les ronds de couleur 
      <strong :data-testid="`${currentColor}`" class="consigne-color">
        <span class="color-sample" :style="{ backgroundColor: currentColor }"></span>
        {{ colorNames[currentColor] }}
      </strong>
    </motion>
  </Transition>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/gameStore'

const { currentColor } = storeToRefs(useGameStore())

const colorNames: Record<string, string> = {
  '#5DE3F5': 'Marais Tranquille',
  '#406DF5': 'Bleu Électrique',
  '#3FA7F4': 'Plongeon à Acapulco',
  '#9DF5E2': 'Vert Opaline',
  '#A39DF5': 'Lavande'
}
</script>

<style scoped>
.consigne {
  font-size: 20px;
  margin: 1rem;
}

.consigne-color {
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.color-sample {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid #333;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
