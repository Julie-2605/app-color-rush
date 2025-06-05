<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Circle from '../components/Circle.vue'
import GameOver from '../components/GameOver.vue'
import ScorePanel from '../components/ScorePanel.vue'
import StartMenu from '../components/StartMenu.vue'
import Timer from '../components/Timer.vue'
import ConsigneColor from '@/components/ConsigneColor.vue'

import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore();
const circles = ref<{id: number, color: string; x: number; y: number}[]>([]);

const gameBoardRef = ref<HTMLElement | null>(null);

function getRandomCoordonnees() {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  let x = Math.floor((Math.random()) * windowWidth);
  let y = Math.floor((Math.random()) * windowHeight);

  return { x: x, y: y };
}



function displayRandomCircle() {
  const color = gameStore.getRandomColor();
  const { x, y } = getRandomCoordonnees();
  const id = Math.random();
  circles.value.push({ id, color, x, y });
}

function removeCircle(id: number) {
  circles.value = circles.value.filter(circle => circle.id !== id);
}

let interval: number | null = null

watch(
  () => gameStore.gameStarted,
  (started) => {
    if (started) {
      gameStore.defineCurrentColor();
      displayRandomCircle();
      interval = setInterval(displayRandomCircle, 1000);
    } else {
      if (interval) clearInterval(interval);
      circles.value = [];
    }
  }
);

onMounted(() => {
  if (interval) clearInterval(interval);
});

</script>

<template>
  <main>
    <StartMenu v-if="!gameStore.gameStarted"/>

    <div v-if="gameStore.gameStarted" class="game-container">
      <Timer v-if=" gameStore.gameStarted && !gameStore.gameOver"/>
      <ScorePanel v-if="gameStore.gameStarted && !gameStore.gameOver"/>
      <ConsigneColor />
      
      <div class="gameboard" ref="gameboardRef">
        <Circle
            v-for="(circle, index) in circles"
            :key="circle.id"
            :id="circle.id"
            :color="circle.color"
            :x="circle.x"
            :y="circle.y"
            @remove-circle="removeCircle"
          />
      </div>
    </div>

    <div v-if="gameStore.gameOver && !gameStore.gameStarted" class="gameOver-container">
      <GameOver v-if="gameStore.gameOver"/>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.game-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.gameboard {
  flex: 1;
  position: relative;
  overflow: hidden;
}
</style>