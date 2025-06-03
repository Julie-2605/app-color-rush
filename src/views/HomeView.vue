<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
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
    <Circle v-if="gameStore.gameStarted && !gameStore.gameOver"/>
  </main>
</template>
