
<template>
    <div class="consigne">Cliquez sur les ronds de couleur <strong :data-testid="`${color}`" class="consigne-color">{{ color }}</strong></div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/gameStore';
import { ref, watch } from 'vue';

const gameStore = useGameStore();
const color = ref('');

watch(() => gameStore.gameStarted,
    (newVal) => {
        if(newVal) {
            generateConsigne();
        }
    }
);

function generateConsigne() {
    color.value = gameStore.getRandomColor();
    gameStore.currentColor = color.value;
    return color.value;
}
</script>

<style scoped>

</style>