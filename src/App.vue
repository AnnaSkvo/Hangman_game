<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure :wrongletterscount="wrongletters.length" />

    <GameWrongLetters :wrongletters="wrongletters" />

    <GameWord :word="word" :correctletters="correctletters" />
  </div>

  <!-- Container for final message -->
  <GamePopup ref="popup" :word="word" @restart="restart" />

  <!-- Notification -->
  <GameNotification ref="notification" />
</template>

<script setup lang="ts">
import GameHeader from './components/GameHeader.vue'
import GameFigure from './components/GameFigure.vue'
import GameWrongLetters from './components/GameWrongLetters.vue'
import GameWord from './components/GameWord.vue'
import GamePopup from './components/GamePopup.vue'
import GameNotification from './components/GameNotification.vue'
import { useRandomWord } from './composables/useRandomWord'
import { useLetters } from './composables/useLetters'
import { useNotification } from './composables/useNotification'

import { ref, computed, watch } from 'vue'

const { word, getRandomWord } = useRandomWord()
const { letters, correctletters, wrongletters, isLose, isWin, addLetter, resetLetters } = useLetters(word)
const { notification, showNotification } = useNotification()

const popup = ref<InstanceType<typeof GamePopup> | null>(null)

const restart = async () => {
  await getRandomWord()
  resetLetters()
  popup.value?.close()
}

watch(wrongletters, () => {
  if (isLose.value) {
    popup.value?.open('lose')
  }
})

watch(correctletters, () => {
  if (isWin.value) {
    popup.value?.open('win')
  }
})

window.addEventListener('keydown', ({ key }) => {
  if (isLose.value || isWin.value) {
    return
  }
  if (letters.value.includes(key)) {
    showNotification()
    return
  }
  addLetter(key)
})


</script>