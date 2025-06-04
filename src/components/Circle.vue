<template>
    <div :data-testid="`circle-${color}`" class="circle" :style="{ backgroundColor: color, left: `${x}px`, top: `${y}px` }"" @click="clickCircle"></div>
</template>

<script setup lang="ts">
import { defineProps, type DefineProps } from 'vue';
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore();

const props = defineProps<{
    color: string,
    x: number,
    y: number,
    consigneColor: string
}>();

function clickCircle() {
    if(props.color === props.consigneColor) {
        gameStore.incrementScore();
    } else {
        gameStore.decrementScore();
    }
}


// function getRandomColor() {
//     const colors = ["#5DE3F5", "#406DF5", "#3FA7F4", "#9DF5E2", "#A39DF5", "#BCDCF5"];
    
//     return colors[Math.floor(Math.random() * colors.length)];
// }

// function displayRandomColor(color: string) {
//     let windowWidth = window.innerWidth;
//     let windowHeight = window.innerHeight;

//     let x = Math.floor((Math.random()) * windowWidth);
//     let y = Math.floor((Math.random()) * windowHeight);

//     const circle = document.createElement('div');
//     circle.classList.add('circle');
//     circle.setAttribute('data-testid', `circle-${color}`);
//     circle.onclick = clickCircle();
//     circle.style.backgroundColor = color;
//     circle.style.position = "absolute";
//     circle.style.left = `${x}px`;
//     circle.style.top = `${y}px`;
// }


// const color = getRandomColor();
</script>

<template>

  <p
  v-if="gameStore.gameStarted && !gameStore.gameOver"
  class="instruction"
  data-testid="instruction"
>
  Clique sur le cercle {{ targetColor }}
</p>

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
