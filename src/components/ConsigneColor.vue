<template>
    <div class="consigne" data-testid="instruction">
        Cliquez sur les ronds de couleur 
        <strong :data-testid="`${currentColor}`" class="consigne-color">
            <span class="color-sample" :style="{ backgroundColor: currentColor }"></span>
            {{ colorNames[currentColor] }}
        </strong>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/gameStore';
// import { ref, watch } from 'vue';

const { currentColor } = storeToRefs(useGameStore());

const colorNames : Record<string, string> = {"#5DE3F5": "Marais Tranquille", "#406DF5": "Bleu Électrique", "#3FA7F4": "Plongeon à Acapulco", "#9DF5E2": "Vert Opaline", "#A39DF5": "Lavande", "#BCDCF5": "Bleu d'Azur"};


// const gameStore = useGameStore();
// const color = ref('');

// watch(() => gameStore.gameStarted,
//     (newVal) => {
//         if(newVal) {
//             generateConsigne();
//         }
//     }
// );

// function generateConsigne() {
//     color.value = gameStore.getRandomColor();
//     gameStore.currentColor = color.value;
//     return color.value;
// }
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
</style>