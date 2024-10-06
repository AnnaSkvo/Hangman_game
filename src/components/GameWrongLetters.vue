<template>
    <div v-if="wrongletters.length" class="wrong-letters-container">
        <div class="wrong-letters">
            <p>Ошибки</p>
            <span v-for="(letter,index) in wrongletters" :key="letter">{{ index ===  wrongletters.length - 1 ? letter : `${letter}, `}}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    wrongletters: string[]
}

defineProps<Props>()
</script>