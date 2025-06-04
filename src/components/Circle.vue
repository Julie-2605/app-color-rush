<template>
    <div :data-testid="`circle-${color}`" class="circle" :style="{ backgroundColor: color }"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

function getRandomColor() {
    const colors = ["#5DE3F5", "#406DF5", "#3FA7F4", "#9DF5E2", "#A39DF5", "#BCDCF5"];

    return colors[Math.floor(Math.random() * colors.length)];
}

function displayRandomColor(color: string) {
    const gameBoard = document.querySelector('.gameboard') as HTMLElement | null;
    if (!gameBoard) return;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let x = Math.floor((Math.random()) * windowWidth);
    let y = Math.floor((Math.random()) * windowHeight);

    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.setAttribute('data-testid', `circle-${color}`);
    circle.style.backgroundColor = color;
    circle.style.position = "absolute";
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    gameBoard.appendChild(circle);
}

onMounted(() => {
    const color = getRandomColor();

    displayRandomColor(color);
});

const color = getRandomColor();
</script>

<style scoped>
/* .circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: blue;
} */

 .gameboard {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
}
</style>