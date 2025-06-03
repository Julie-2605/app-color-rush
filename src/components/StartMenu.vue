<template>
  <div>
    <button class="start" @click="startGame">Start</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

function startGame() {
    gameStore.toggleStartGame()
}
</script>

<style scoped>
.start {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.game-container {
  margin-top: 20px;
}
</style>
