<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
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
  if (!gameBoardRef.value) return { x: 0, y: 0 };

  const rect = gameBoardRef.value.getBoundingClientRect();
  const circleSize = 100;

  const width = rect.width - circleSize;
  const height = rect.height - circleSize;

  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);

  return { x, y };
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

let interval: ReturnType<typeof setInterval> | null = null;

function stopLoop () {
  if (interval !== null) clearInterval(interval);
  interval = null;
}

watch(
  () => [gameStore.gameStarted, gameStore.speed] as const,
  ([started, currentSpeed]) => {
    stopLoop();

    if (started) {
      circles.value = [];
      gameStore.defineCurrentColor();
      displayRandomCircle();
      interval = setInterval(displayRandomCircle, currentSpeed);
    }
  }
);

onMounted(stopLoop);
</script>

<template>
  <main>
    <StartMenu v-if="!gameStore.gameStarted" />

    <div v-if="gameStore.gameStarted" class="game-container">
      <Timer v-if="gameStore.gameStarted && !gameStore.gameOver" />
      <ScorePanel v-if="gameStore.gameStarted && !gameStore.gameOver" />
      <ConsigneColor />
      <div class="gameboard" ref="gameBoardRef">
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
      <GameOver v-if="gameStore.gameOver" />
      <ScorePanel v-if="gameStore.gameOver" />
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  width: 1000px;
  display: flex;
  flex-direction: column;
}

.game-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.gameboard {
  flex: 1;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}
</style>
