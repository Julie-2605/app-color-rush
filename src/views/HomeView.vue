<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Circle from '../components/Circle.vue'
import GameOver from '../components/GameOver.vue'
import ScorePanel from '../components/ScorePanel.vue'
import StartMenu from '../components/StartMenu.vue'
import Timer from '../components/Timer.vue'

import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const targetColor = ref('')
const circleKey = ref(0) 

function nextRound() {
  targetColor.value = gameStore.getRandomColor()
  circleKey.value++ 
}

onMounted(() => {
  if (gameStore.gameStarted) {
    nextRound()
  }
})

</script>

<template>
  <main>
    <StartMenu v-if="!gameStore.gameStarted"/>
    <div v-if="gameStore.gameStarted" class="game-container">
      <Timer v-if=" gameStore.gameStarted && !gameStore.gameOver"/>
      <ScorePanel v-if="gameStore.gameStarted && !gameStore.gameOver"/>
      <p v-if="gameStore.gameStarted && !gameStore.gameOver" class="instruction" data-testid="instruction">
        Clique sur le cercle {{ targetColor.value }}
      </p>
      <Circle :key="circleKey" :target-color="targetColor" @next-round="nextRound"/>
    </div>
    <div v-if="gameStore.gameOver && !gameStore.gameStarted" class="gameOver-container">
      <GameOver v-if="gameStore.gameOver"/>
      <ScorePanel v-if="gameStore.gameOver"/>
    </div>
  </main>
</template>
