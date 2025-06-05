<template>
    <div
    :data-testid="`circle-${color}`"
    class="circle"
    :style="{ backgroundColor: color, left: `${x}px`, top: `${y}px` }"
    @click="clickCircle"
    ></div>
</template>

<script setup lang="ts">
import { defineProps, type DefineProps } from 'vue';
import { useGameStore } from '@/stores/gameStore';
import { onMounted, ref } from 'vue';

const gameStore = useGameStore();
// const color = ref('');

const props = defineProps<{
    id: number,
    color: string,
    x: number,
    y: number,
    // consigneColor: string
}>();

const emit = defineEmits(['remove-circle']);

function clickCircle() {
    if (props.color === gameStore.currentColor) {
        gameStore.incrementScore();
    } else {
        gameStore.decrementScore();
    }

    emit('remove-circle', props.id);
    // if(color.value === gameStore.currentColor) {
    //     gameStore.incrementScore();
    // } else {
    //     gameStore.decrementScore();
    // }
}

onMounted(() => {
    setTimeout(() => {
        emit('remove-circle', props.id);
    }, 2000);
});
</script>

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
