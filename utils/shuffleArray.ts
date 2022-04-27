export default function shuffleArray(array: []) {
    for (var i = array.length - 1; i > 0; i--) {
        let randomPos = Math.floor(Math.random() * (i + 1))
        let temp = array[i]

        array[i] = array[randomPos]
        array[randomPos] = temp
    }
    return array
}
