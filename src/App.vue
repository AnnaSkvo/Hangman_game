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
import { getRandomName } from './api/getRandomName'

import { ref, computed, watch } from 'vue'

const word = ref('')
const getRandomWord = async () => {
  try {
    const name = await getRandomName()
    word.value = name.toLowerCase()
  } catch (err) {
    console.log("error: ", err)
    word.value = ''
  }
}

getRandomWord()

const letters = ref<string[]>([])
const correctletters = computed(() => letters.value.filter(letter => word.value.includes(letter)))
const wrongletters = computed(() => letters.value.filter(letter => !word.value.includes(letter)))
const notification = ref<InstanceType<typeof GameNotification> | null>(null)
const popup = ref<InstanceType<typeof GamePopup> | null>(null)

const isLose = computed(() => wrongletters.value.length === 6)
const isWin = computed(() => [...word.value].every(x => correctletters.value.includes(x)))

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
    notification.value?.open()
    setTimeout(() => {
      notification.value?.close()
    }, 2000);
    return
  }
  if (/[а-яА-ЯёЁ]/.test(key)) {
    letters.value.push(key.toLowerCase())
  }
})

const restart = async () => {
  await getRandomWord()
  letters.value = []
  popup.value?.close()
}
</script>