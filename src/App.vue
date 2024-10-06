<template>
  <GameHeader/>
  <div class="game-container">
    <GameFigure/>

    <GameWrongLetters/>

    <GameWord/>
  </div>

  <!-- Container for final message -->
  <GamePopup/>

  <!-- Notification -->
  <GameNotification/>
</template>

<script setup lang="ts">
  import GameHeader from './components/GameHeader.vue'
  import GameFigure from './components/GameFigure.vue'
  import GameWrongLetters from './components/GameWrongLetters.vue'
  import GameWord from './components/GameWord.vue'
  import GamePopup from './components/GamePopup.vue'
  import GameNotification from './components/GameNotification.vue'
</script>