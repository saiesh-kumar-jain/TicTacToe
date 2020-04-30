const x_Class = 'x'
const circle_Class ='circle'
const winning_Combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningTextElement = document.querySelector('[ data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const playAgainBtn  = document.getElementById('playAgain')


let circleTurn

startGame()

playAgainBtn.addEventListener('click',startGame)

function startGame(){
    circleTurn = false
    cellElements.forEach(cell =>{
        cell.classList.remove(x_Class)
        cell.classList.remove(circle_Class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click',handleClick, {once:true} )
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? circle_Class : x_Class;
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
        setBoardHoverClass()
    }
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(x_Class) || cell.classList.contains(circle_Class)
    })
}

function endGame(draw){
    if(draw){
        winningTextElement.innerText = "Draw!"
        winningMessageElement.classList.add('show')
    }
    else{
        winningTextElement.innerText =  `${ circleTurn ? "O's" : "X's"} Wins !`
        winningMessageElement.classList.add('show')
    }

}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    boardElement.classList.remove(x_Class)
    boardElement.classList.remove(circle_Class)
    if(circleTurn){
        boardElement.classList.add(circle_Class)        
    }
    else{
        boardElement.classList.add(x_Class)
    }
}

function checkWin(currentClass){
    return winning_Combinations.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}