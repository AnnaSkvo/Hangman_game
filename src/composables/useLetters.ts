import { ref, computed, type Ref } from 'vue'

export const useLetters = (word: Ref<string>) => {
    const letters = ref<string[]>([])
    const correctletters = computed(() => letters.value.filter(letter => word.value.includes(letter)))
    const wrongletters = computed(() => letters.value.filter(letter => !word.value.includes(letter)))

    const isLose = computed(() => wrongletters.value.length === 6)
    const isWin = computed(() => [...word.value].every(x => correctletters.value.includes(x)))

    const addLetter = (key: string) => {
        if (/[а-яА-ЯёЁ]/.test(key)) {
            letters.value.push(key.toLowerCase())
        }
    }

    const resetLetters = () => {
        letters.value = []
    }

    return {
        letters, correctletters, wrongletters, isLose, isWin, addLetter, resetLetters
    }
}