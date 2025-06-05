<script setup lang="ts">
import { defineProps, type DefineProps } from 'vue';
import { ref, watchEffect, onMounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const color = ref<string>('')

const props = defineProps<{
    id: number,
    color: string,
    x: number,
    y: number,
    // consigneColor: string
}>();

const emit = defineEmits(['remove-circle']);


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

  // gameStore.defineCurrentColor()
  emit('remove-circle', props.id);
}


onMounted(() => {
    setTimeout(() => {
        emit('remove-circle', props.id);
    }, 2000);
});
</script>

<template>
    <div
    :data-testid="`circle-${color}`"
    class="circle"
    :style="{ backgroundColor: color, left: `${x}px`, top: `${y}px` }"
    @click="handleClick"
    ></div>
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
