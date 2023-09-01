
// const Colour
const colorList = ['rgb(204, 0, 0)', 'rgb(0, 204, 0)', 'rgb(0, 0, 204)', 'rgb(255, 255, 0)', 'rgb(128, 128, 0)', 'rgb(255, 128, 0)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)']
const colorTestField = document.querySelector('#colorButtonField')
const colorButtonField = document.querySelector('#colorButtonField > ul')
let numberOfButtons = 0
const startBtn = document.querySelector('#btn-start')
let confirmButton = ''
let colorCode = []
let checkButton = ''
let colorDict = { 'rgb(204, 0, 0)': 0, 'rgb(0, 204, 0)': 0, 'rgb(0, 0, 204)': 0, 'rgb(255, 255, 0)': 0, 'rgb(128, 128, 0)': 0, 'rgb(255, 128, 0)': 0, 'rgb(0, 0, 0)': 0, 'rgb(255, 255, 255)': 0 }



class ColourRepo {
    ColourRepo(){

    }


    async initializeDifficultySelect() {
        colorTestField.innerHTML = '<textarea>How many buttons?</textarea><button id="buttonCount">Confirm</button>'
        confirmButton = document.querySelector('#buttonCount')
        return confirmButton
    };

    async getNumberOfButtons() {
        // console.log(document.querySelector('textarea').value)
        userInput = document.querySelector('textarea').value
        if (isNaN(userInput)) {
            alert("invalid parameter, please input a number")
        }
        else {
            if (userInput < 4 || userInput > 8) {
                alert('please input a number between 4 and 8')
            }
            else {
                numberOfButtons = userInput
                colorTestField.innerHTML = ''
                createButtons(numberOfButtons)
                generateColorCode(numberOfButtons)
                checkButton = createCheckButton()
            }
        }
    };

    async createCheckButton() {
        colorTestField.innerHTML += '<button id="check">Check Answer</button>'
        checkButton = document.querySelector('#check')
        checkButton.addEventListener('click', () => {
            checkAnswers(colorCode, colorTestField)
        })
        return checkButton
    };

    async createButtons(numberOfButtons) {
        for (let i = 0; i < numberOfButtons; i++) {
            colorTestField.innerHTML += `<button class='button' id='button${i + 1}'></button>`
            let newButton = document.querySelector(`#button${i + 1}`)
            newButton.style.backgroundColor = colorList[0]
        }
    };

    async colorShift(buttonToChange) {
        buttonInUse = document.querySelector(`#${buttonToChange}`)
        // console.log(colorList.indexOf(buttonInUse.style.backgroundColor))
        // console.log(buttonInUse.style.backgroundColor)
        oldColor = colorList.indexOf(buttonInUse.style.backgroundColor)
        // console.log(colorList.length)
        if (oldColor + 1 >= colorList.length) {
            buttonInUse.style.backgroundColor = colorList[0]
        }
        else {
            buttonInUse.style.backgroundColor = colorList[oldColor + 1]
        }
    };

    async generateColorCode(numberOfButtons) {
        for (let i = 0; i < numberOfButtons; i++) {
            codeNumber = Math.floor(Math.random() * 8)
            codeEntry = colorList[codeNumber]
            // console.log(codeEntry)
            colorDict[codeEntry] += 1
            colorCode.push(codeEntry)
        }
        //To simplify testing, uncomment console.log(colorCode)
        // console.log(colorCode)
        // console.log(colorDict)
    };

    async checkAnswers(colorCode, colorTestField) {
        let correctColors = {}
        let correctPosition = 0
        let correctColor = 0
        // console.log(colorTestField, colorCode)
        // console.log(document.querySelectorAll('.button'))
        buttonList = document.querySelectorAll('.button')
        for (let i = 0; i < buttonList.length; i++) {
            // console.log(buttonList[i])
            buttonColor = buttonList[i].style.backgroundColor
            // console.log(buttonColor)
            // console.log(colorCode.indexOf(buttonColor) != -1)
            // console.log(buttonColor == colorCode[i])
            if (colorCode.indexOf(buttonColor) != -1) {
                if (buttonColor in correctColors) {
                    if (correctColors[buttonColor] < colorDict[buttonColor]) {
                        correctColors[buttonColor] += 1
                    }
                }
                else {
                    correctColors[buttonColor] = 1
                }
                if (buttonColor == colorCode[i]) {
                    correctPosition += 1
                }
            }
        }
        // console.log(correctColors)
        for (let key in correctColors) {
            correctColor += correctColors[key]
        }
        // console.log(correctPosition, correctColor)
        alert(correctColor + ' were the right color, ' + correctPosition + ' were in the right position')
        if (correctPosition == numberOfButtons) {
            endGame()
        }
    };

    async endGame() {
        alert('You win!')
        colorTestField.innerHTML = ''
        startBtn.innerHTML = '<button>Start</button>'
        colorCode = []
    };

    //Event Listeners
    colorTestField.addEventListener('click', (e) => {
        // console.log(e.target)
        // console.log(e.target.className)
        if (e.target.className == 'button') {
            buttonToChange = e.target.id
            // console.log(buttonToChange)
            colorShift(buttonToChange)
        }
    });


    startBtn.addEventListener('click', () => {
        confirmButton = initializeDifficultySelect()
        confirmButton.addEventListener('click', () => {
            getNumberOfButtons()
        })
        startBtn.innerHTML = ''
    });


}
module.exports = ColourRepo



