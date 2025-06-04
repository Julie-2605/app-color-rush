<script setup lang="ts">
import Circle from '../components/Circle.vue'
import GameOver from '../components/GameOver.vue'
import ScorePanel from '../components/ScorePanel.vue'
import StartMenu from '../components/StartMenu.vue'

import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

</script>

<template>
  <main>
    <StartMenu v-if="!gameStore.gameStarted"/>
    <div v-if="gameStore.gameStarted" class="game-container">
          <Circle v-if="gameStore.gameStarted && !gameStore.gameOver"/>
    </div>
  </main>
</template>
