import {WORDS4} from "/words4.js"
import {WORDS5} from "/words5.js"

const messageWindow = document.querySelector('.message')
const gameboard = document.querySelector('.gameboard')
const keyboard = document.querySelector("[data-keyboard]")
const options = document.querySelector("[data-options]")

let wordle
let currentTile = 0
let currentRow = 0
let totalRow = 5
let gameOver = false

let fourButton = false
let fiveButton = true
let wordBankButton = true
let apiButton = false

options.querySelector(`[data-key="LETTERS5"]`).classList.add('wrong')
options.querySelector(`[data-key="WORDBANKS"]`).classList.add('wrong')

let word = WORDS5[Math.floor(Math.random() * WORDS5.length)]
let word_API = '/wordleFive'
let list = '/fiveArray'

const boardRows_4 = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
]

const boardRows_5 = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let boardRows = boardRows_5

boardLoad()

wordle = getWordBank(word)

startGame()

function boardLoad() {
    boardRows.forEach((boardRow, boardIndex) => {
        const rowElement = document.createElement('div')
        rowElement.setAttribute('id', 'boardRow-' + boardIndex)
    
        boardRow.forEach((_guess, guessIndex) => {
            const tileElement = document.createElement('div')
            tileElement.setAttribute('id', 'boardRow-' + boardIndex + '-tile-' + guessIndex)
            tileElement.classList.add('tile')
            rowElement.append(tileElement)
        })

        gameboard.append(rowElement)
    })
}

function boardRemove() {
    boardRows.forEach((_boardRow, boardIndex) => {
        document.getElementById('boardRow-' + boardIndex).remove()
    })
}

function getWordBank(word) {
    const capWord = word.toUpperCase()
    console.log(capWord)
    return capWord
}

function getWordArray() {
    fetch('http://localhost:8080' + word_API)
    .then(response=>response.json())
    .then(json => {
        wordle = json.toUpperCase()
    })
    .then(json=>console.log(wordle))
    .catch(err => console.log(err))
}

function startGame() {
    document.addEventListener("click", mouseClick)
    document.addEventListener("keydown", keyPress)
}

function stopGame() {
    document.removeEventListener("click", mouseClick)
    document.removeEventListener("keydown", keyPress)
}

function mouseClick(e) {
    if (e.target.matches("[data-four]")) {
        currentTile = 0
        currentRow = 0
        totalRow = 4
        gameOver = false

        fourButton = true
        fiveButton = false

        boardRemove()
        removeColor()
        boardRows = boardRows_4
        boardLoad()

        options.querySelector(`[data-key="LETTERS4"]`).classList.add('wrong')

        if (wordBankButton && !apiButton) {
            options.querySelector(`[data-key="WORDBANKS"]`).classList.add('wrong')
            word = WORDS4[Math.floor(Math.random() * WORDS4.length)]
            wordle = getWordBank(word)
        }

        else {
            options.querySelector(`[data-key="API"]`).classList.add('wrong')
            word_API = '/wordleFour'
            list = '/fourArray'
            getWordArray()
        }
        
        return
    }

    if (e.target.matches("[data-five]")) {
        if (wordBankButton && !apiButton)
            window.location.reload()

        else {
            currentTile = 0
            currentRow = 0
            totalRow = 5
            gameOver = false

            fourButton = false
            fiveButton = true

            boardRemove()
            removeColor()
            boardRows = boardRows_5
            boardLoad()

            options.querySelector(`[data-key="LETTERS5"]`).classList.add('wrong')

            if (wordBankButton && !apiButton) {
                options.querySelector(`[data-key="WORDBANKS"]`).classList.add('wrong')
                word = WORDS5[Math.floor(Math.random() * WORDS5.length)]
                wordle = getWordBank(word)
            }
                

            else {
                options.querySelector(`[data-key="API"]`).classList.add('wrong')
                word_API = '/wordleFive'
                list = '/fiveArray'
                getWordArray()
            }      
        }
        
        return
    }

    if (e.target.matches("[data-wordbanks]")) {
        if (fiveButton && !fourButton)
            window.location.reload()
        
        else {
            currentTile = 0
            currentRow = 0
            gameOver = false

            wordBankButton = true
            apiButton = false

            boardRemove()
            removeColor()

            options.querySelector(`[data-key="WORDBANKS"]`).classList.add('wrong')

            if (fourButton && !fiveButton) {
                fourButton = true
                fiveButton = false
                totalRow = 4
                word = WORDS4[Math.floor(Math.random() * WORDS4.length)]
                boardRows = boardRows_4
                boardLoad()
                wordle = getWordBank(word)
                options.querySelector(`[data-key="LETTERS4"]`).classList.add('wrong')
            }

            else {
                fourButton = false
                fiveButton = true
                totalRow = 5
                word = WORDS5[Math.floor(Math.random() * WORDS5.length)]
                boardRows = boardRows_5
                boardLoad()
                wordle = getWordBank(word)
                options.querySelector(`[data-key="LETTERS5"]`).classList.add('wrong')
            }
        }
        
        return
    }

    if (e.target.matches("[data-api]")) {
        currentTile = 0
        currentRow = 0
        gameOver = false

        wordBankButton = false
        apiButton = true

        boardRemove()
        removeColor()
        
        options.querySelector(`[data-key="API"]`).classList.add('wrong')

        if (fourButton && !fiveButton) {
            totalRow = 4
            word_API = '/wordleFour'
            list = '/fourArray'
            boardRows = boardRows_4
            boardLoad()
            getWordArray()
            options.querySelector(`[data-key="LETTERS4"]`).classList.add('wrong')
        }

        else {
            totalRow = 5
            word_API = '/wordleFive'
            list = '/fiveArray'
            boardRows = boardRows_5
            boardLoad()
            getWordArray()
            options.querySelector(`[data-key="LETTERS5"]`).classList.add('wrong')
        }
    
        return
    }

    if (e.target.matches("[data-key]")) {
        addKey(e.target.dataset.key)
        return
    }
  
    if (e.target.matches("[data-enter]")) {
        submitWord()
        return
    }
  
    if (e.target.matches("[data-delete]")) {
        deleteKey()
        return
    }
}

function keyPress(e) {
    if (e.key === "Enter") {
        e.preventDefault()
        submitWord()
        return
    }
  
    if (e.key === "Delete" || e.key === "Backspace") {
        deleteKey()
        return
    }

    if (e.key.match(/^[a-z]$/) || e.key.match(/^[A-Z]$/)) {
        addKey(e.key)
        return
    }
}

function addKey(key) {
    if (fourButton && !fiveButton) {
        if (currentTile < 4 && currentRow < 5) {
            const tile = document.getElementById('boardRow-' + currentRow + '-tile-' + currentTile)
            tile.textContent = key.toUpperCase()
            boardRows[currentRow][currentTile] = key.toUpperCase()
            tile.setAttribute('data', key.toUpperCase())
            currentTile++
        }
    }

    else {
        if (currentTile < 5 && currentRow < 6) {
            const tile = document.getElementById('boardRow-' + currentRow + '-tile-' + currentTile)
            tile.textContent = key.toUpperCase()
            boardRows[currentRow][currentTile] = key.toUpperCase()
            tile.setAttribute('data', key.toUpperCase())
            currentTile++
        }
    }
}

function deleteKey() {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('boardRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        boardRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

function submitWord() {
    const guess = boardRows[currentRow].join('')

    if (fourButton && !fiveButton) {
        if (currentTile > 3) {
            if (apiButton && !wordBankButton)
                submitAPI(guess)

            else
                submitWordBank(guess)
        }

        else {
            showMessage('Not enough letters.')
            shakeAnimation()
            return
        }
    }

    else {
        if (currentTile > 4) {
            if (apiButton && !wordBankButton)
                submitAPI(guess)

            else
                submitWordBank(guess)
        }

        else {
            showMessage('Not enough letters.')
            shakeAnimation()
            return
        }
    }
}

function submitWordBank(guess) {
    if (!WORDS4.includes(guess.toLowerCase()) && !WORDS5.includes(guess.toLowerCase())) {
        showMessage('Invalid word.')
        shakeAnimation()
        return
    }

    else {
        flipAnimation()

        if (wordle == guess) {
            gameOver = true
            showMessage('Congratulations, You Win!')
            setTimeout(() => {  danceAnimation(); }, 2500);
            stopGame()
            return
        } 
        
        else {
            if (currentRow >= totalRow) {
                gameOver = true
                showMessage('Game Over, the word was "' + wordle + '".')
                stopGame()
                return
            }

            if (currentRow < totalRow) {
                currentTile = 0
                currentRow++
            }
        }
    }
}

function submitAPI(guess) {
    fetch(`http://localhost:8080` + list)
        .then(response => response.json())
        .then(json => {
            if (!json.includes(guess.toLowerCase())) {
                showMessage('Invalid word.')
                shakeAnimation()
                return
            }

            else {
                flipAnimation()

                if (wordle == guess) {
                    gameOver = true
                    showMessage('Congratulations!')
                    setTimeout(() => {  danceAnimation(); }, 2500);
                    stopGame()
                    return
                } 
                
                else {
                    if (currentRow >= totalRow) {
                        gameOver = true
                        showMessage('Game Over, the word was "' + wordle + '".')
                        stopGame()
                        return
                    }

                    if (currentRow < totalRow) {
                        currentTile = 0
                        currentRow++
                    }
                }
            }
        })
        .catch(err => console.log(err))
}

function showMessage(message) {
    const messageElement = document.createElement('messageBox')
    messageElement.textContent = message
    messageWindow.append(messageElement)

    if (!gameOver)
        setTimeout(() => messageWindow.removeChild(messageElement), 2000)
}

function flipAnimation() {
    const rowTiles = document.querySelector('#boardRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'wrong'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'correct'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'exists'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            colorKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}

function colorKey(keyLetter, color) {
    let key = keyboard.querySelector(`[data-key="${keyLetter}"]`)
    key.classList.add(color)
}

function removeColor() {
    let removeKey = keyboard.querySelectorAll('.key')

    removeKey.forEach(key => {
        key.classList.remove('wrong')
        key.classList.remove('exists')
        key.classList.remove('correct')
    })

    let removeOptions = options.querySelectorAll('.option.key')

    removeOptions.forEach(option => {
        option.classList.remove('wrong')
    })
}

function shakeAnimation() {
    const rowTiles = document.querySelector('#boardRow-' + currentRow).childNodes

    rowTiles.forEach(tile => {
        tile.classList.add("shake")
        tile.addEventListener(
            "animationend",
            () => {
                tile.classList.remove("shake")
            },
            { once: true }
        )
    })
}

function danceAnimation() {
    const rowTiles = document.querySelector('#boardRow-' + currentRow).childNodes
    
    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add("dance")
            tile.addEventListener(
                "animationend",
                () => {
                    tile.classList.remove("dance")
                },
                { once: true }
            )
        }, (index * 500) / 5)
    })
}