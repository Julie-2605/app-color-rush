<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'

import Circle from '../components/Circle.vue'
import GameOver from '../components/GameOver.vue'
import ScorePanel from '../components/ScorePanel.vue'
import StartMenu from '../components/StartMenu.vue'
import Timer from '../components/Timer.vue'



const gameStore = useGameStore()

onMounted(() => {
  if (gameStore.gameStarted) {
    gameStore.setNewTargetColor()
  }
})

</script>

<template>
  <main>
    <StartMenu v-if="!gameStore.gameStarted"/>
    <div v-if="gameStore.gameStarted" class="game-container">
      <Timer v-if=" gameStore.gameStarted && !gameStore.gameOver"/>
      <ScorePanel v-if="gameStore.gameStarted && !gameStore.gameOver"/>

      <p v-if="gameStore.gameStarted && !gameStore.gameOver" data-testid="instruction">
        Clique sur le cercle <span data-testid="target-color">{{ gameStore.targetColor }}</span>
      </p>

      <Circle />
    </div>
    <div v-if="gameStore.gameOver && !gameStore.gameStarted" class="gameOver-container">
      <GameOver v-if="gameStore.gameOver"/>
    </div>
  </main>
</template>
