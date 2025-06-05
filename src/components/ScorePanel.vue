<template>
    <div class="score" data-testid="score">Votre score : {{ gameStore.score }}</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore();
const { score } = storeToRefs(gameStore);

</script>

<style scoped>

</style>