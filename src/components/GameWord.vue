<template>
    <div class="word">
        <span v-for="(letter, index) in word" :key="index" class="letter">{{ correctletters.includes(letter) ? letter :
            '' }}</span>
    </div>
</template>

<script setup lang="ts">
interface Props {
    word: string
    correctletters: string[]
}

defineProps<Props>()
</script>