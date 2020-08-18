document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10;
    //  Change bombAmount for difficulty level of the game
    let bombAmount = 20;
    let flags = 0 ;

    // create empty array called 'squares'
    let squares = [];

    // create Boolean isGameOver false

    let isGameOver = false;

    // Create board
    function createBoard() {
        // get shuffled game array with random bombs assigned to squares
        // Create Array(20) and fill  with string value 'bomb'
        const bombsArray = Array(bombAmount).fill('bomb');
        // Create emptyArray(10*10 - 20 = 80) and fill  with string value 'valid'
        const emptyArray = Array(width*width - bombAmount).fill('valid')

        // console.log(bombsArray)
        // console.log(emptyArray)

        // Concat to join both the arrays into the new gameArray

        const gameArray = emptyArray.concat(bombsArray);

        //console.log(gameArray);

    // Create array with all the div block values of 'bomb' and 'valid' all shuffled together

        const shuffledArray = gameArray.sort(() => Math.random() -0.5);
        //console.log(shuffledArray);

        for(let i = 0; i < width*width; i++) {
            const square = document.createElement ('div')
            square.setAttribute('id', i);
            // Add class list of the value from the shuffledArray of 'bomb' or 'valid'
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            // add the created square to the squares array using push
            squares.push(square);

            //ADD Click function
            square.addEventListener('click', function(e){
                click(square)
            })

            // cntrl and left click
            square.oncontextmenu = function(e) {
                e.preventDefault();
                addFlag(square);
            }

        }
        // adding numbers to the boxes

        for (let i =0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i === width - 1);

            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb'))
                total++

                if (i > 9 && !isRightEdge && squares[i +1 - width].classList.contains('bomb'))
                total++

                if (i > 10 && squares[i - width].classList.contains('bomb')) 
                total++

                if (i > 11 && !isLeftEdge && squares[i -1 - width].classList.contains('bomb'))
                total++

                if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb'))
                total++

                if (i < 90 && !isLeftEdge && squares[i -1 + width].classList.contains('bomb'))
                total++

                if (i < 88 && !isRightEdge && squares[i +1 + width].classList.contains('bomb'))
                total++

                if (i <89 && squares[i+width].classList.contains('bomb'))
                total++

                squares[i].setAttribute('data', total);



                //console.log(squares[i]);
            }
        }
    }
    createBoard();

    //ADD Flag with right-click
    function addFlag(square) {
        if (isGameOver) return;
        if (!square.classList.contains('checked') && (flags < bombAmount)) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag');
                square.innerHTML = '🚩';
                flags++
                checkForWin();
            } else {
                square.classList.remove('flag');
                square.innerHTML = '';
                flags --
            }
        }
    }




    function click (square) {
        let currentId = square.id;

        if (isGameOver) return
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;

        if (square.classList.contains('bomb')) {
            //alert ('BOOM !!! GAME OVER !!!')
            //console.log('BOOM !!! GAME OVER !!!')
            gameOver(square);
        }

        else {
            let total = square.getAttribute('data')
            if (total !=0) {
                square.classList.add('checked');
                square.innerHTML = total;
                return
            }
            checkSquare(square, currentId)
            
        }
        square.classList.add('checked');
            square.innerHTML = 0;
    }

    // checkSquare function - check the neighbouring squares once the square is clicked

    function checkSquare(square, currentId){
        const isLeftEdge = (currentId % width === 0);
        const isRightEdge = (currentId % width === width -1);

        setTimeout (() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 -width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 10) {
                const newId = squares[parseInt(currentId - width)].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 -width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 98 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 90 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 +width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 88 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 +width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 89) {
                const newId = squares[parseInt(currentId) + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
        }, 20)
    }
//function gameOver

function gameOver(square) {
    alert('Boom!!! Game Over!!!')
    isGameOver = true;
    // Show all the bomb locations once the Game is over

    squares.forEach(square => {
        if (square.classList.contains('bomb')) {
            square.innerHTML = "💣";
        }
    })
}

// Check for Win function
function checkForWin() {
    let matches = 0;
    for (let i = 0; i<squares.length; i++) {
        if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
            matches++;
        }
        if (matches === bombAmount) {
            alert('YOU WIN !!!');
            isGameOver = true;
        }
    }
}
})