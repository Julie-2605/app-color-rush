<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Circle from '../components/Circle.vue'
import GameOver from '../components/GameOver.vue'
import ScorePanel from '../components/ScorePanel.vue'
import StartMenu from '../components/StartMenu.vue'
import Timer from '../components/Timer.vue'

import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

function displayRandomCircle(color: string) {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  let x = Math.floor((Math.random()) * windowWidth);
  let y = Math.floor((Math.random()) * windowHeight);
}
</script>

<template>
  <main>
    <StartMenu v-if="!gameStore.gameStarted"/>
    <div v-if="gameStore.gameStarted" class="game-container">
      <Timer v-if=" gameStore.gameStarted && !gameStore.gameOver"/>
      <ScorePanel v-if="gameStore.gameStarted && !gameStore.gameOver"/>
      <Circle v-if="gameStore.gameStarted && !gameStore.gameOver"/>
    </div>
    <div v-if="gameStore.gameOver && !gameStore.gameStarted" class="gameOver-container">
      <GameOver v-if="gameStore.gameOver"/>
      <ScorePanel v-if="gameStore.gameOver"/>
    </div>
  </main>
</template>
