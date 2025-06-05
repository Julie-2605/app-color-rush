<template>
  <div>
    <button class="startBtn" @click="startGame">Start</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

function startGame() {
    gameStore.startGame()
    gameStore.resetScore()
}
</script>

<style scoped>
.startBtn {
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