//geting all the containers to be displayed
const page1 = document.querySelector('#main_page');
const page2 = document.querySelector('#player_choice');
const page3 = document.querySelector('#main_game_content');
const winningMeasage = document.querySelector('.custom_message');
const messageContainer = document.querySelector('.game_message');
const player_1_score = document.querySelector('.player_1_score')
const player_2_score = document.querySelector('.player_2_score')

let score1 = 0;
let score2 = 0;


const WINING_CONDITIONS =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
];

let currentclass;


//geting the with friend btn
const withFriendBtn = document.querySelector('#friend_btn');
const cells = document.querySelectorAll('.cell')

//handeling the with friend btn click event
withFriendBtn.addEventListener('click', () => {
        page1.style.display = 'none';
        page2.style.display = 'flex';
        
        players.forEach(player => {
              player.checked = false; // Uncheck all other checkboxes
        
         });
})

//handeling the continue btn click event
const continueBtn = document.querySelector('#continue_btn');
continueBtn.addEventListener('click', () => {
        page1.style.display = 'none';
        page2.style.display = 'none';
        page3.style.display = 'flex';

         // Determine which player starts
    let startingPlayer = null;
    players.forEach(player => {
        if (player.checked) {
            startingPlayer = player.value; // Get the ID of the checked player
        }
    });

    if (startingPlayer === 'player1') {
        console.log('Player 1 will start');
        // Set the starting class to 'x' for Player 1
        currentclass = x_class;
        document.querySelector('.x_player').classList.add('playing');
    } else if (startingPlayer === 'player2') {
        console.log('Player 2 will start');
        // Set the starting class to 'o' for Player 
        currentclass = o_class;
        document.querySelector('.o_player').classList.add('playing');

    }
})

//handelling the setting button event
const settingBtn = document.querySelector('#setting_btn');
const settingContainer = document.querySelector('#setting_box_black');

settingBtn.addEventListener('click', () => {
        settingContainer.style.display = 'flex';
        page1.style.display = 'none';
        page2.style.display = 'none';
})

//handeling the close setting btn event
const closeSettingBtn = document.querySelector('#close_btn');
closeSettingBtn.addEventListener('click', () => {
        settingContainer.style.display = 'none';
        page1.style.display = 'none';
})

settingContainer.addEventListener('click', () => {
        settingContainer.style.display = 'none'
})

//handelling stop game button event
const stopGameBtn = document.querySelector('#stop_btn');
stopGameBtn.addEventListener('click', (cell) => {

        cells.forEach(cell => {
                cell.classList.remove(x_class, o_class); // Remove both 'x' and 'o' classes
            });
        
        
        page1.style.display = 'flex';
        page2.style.display = 'none';
        page3.style.display = 'none';
        settingContainer.style.display = 'none';
        continueBtn.style.display='none';
        score1 = 0;
        score2 = 0;
        player_1_score.innerText = score1;
        player_2_score.innerText = score2;
        
          // Re-enable click events on cells
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });


})
//handelling reset game btn event
const restartBtn = document.querySelector('#restart_btn');
restartBtn.addEventListener('click', () => {
        console.log('restart game');
        settingContainer.style.display = 'none';
        score1 = 0;
        score2 = 0;
        currentclass = currentclass;
        player_1_score.innerText = score1;
        player_2_score.innerText = score2;
        cells.forEach(cell => {
                cell.classList.remove(x_class, o_class, 'highlight'); // Remove 'x', 'o', and 'highlight' classes
            });
})



//main game handelling
const players = document.querySelectorAll('.checked');
players.forEach(player => {
    player.addEventListener('click', (event) => {
       
        if (event.target.checked) {
            console.log(`${event.target.id} is checked`);
            continueBtn.style.display='block'
            
        } else {
            continueBtn.style.display='none'

        }
        players.forEach(player => {
                player.addEventListener('change', removeCheck);
            });
    });

});
//handelling AI btn event
const AI_btn = document.querySelector('#AI_btn');
const error = document.querySelector('#error_text');

const x_class = 'x';
const o_class = 'o';

function aiMove() {
    const availableCells = [...cells].filter(cell => {
        return !cell.classList.contains(x_class) && !cell.classList.contains(o_class);
    });
  
    if (availableCells.length > 0) {
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        placeMark(randomCell, o_class); // Assuming AI plays as 'O'
        if (checkWin(o_class)) {
            winningMessage(o_class);
        } else if (isDraw()) {
            messageContainer.style.display = 'flex';
            winningMeasage.innerText = 'DRAW';
            setTimeout(() => {
                messageContainer.style.display = 'none';
                resetGame();
            }, 3000);
        } else {
            swapTurn();
        }
    }
}




// Function to ensure only one checkbox is checked at a time


function removeCheck(event) {
        players.forEach(player => {
            if (player !== event.target) {
                player.checked = false; // Uncheck all other checkboxes
            }
        });
    }

//handelling the main game functions


cells.forEach(cell =>{
        cell.addEventListener('click', handleClick, {once:true})
})

function handleClick(e){
        const cell = e.target;
        placeMark(cell, currentclass);
        checkWin(currentclass)
        if (checkWin(currentclass)) {
        
                winningMessage(currentclass);
                
        }else if(isDraw()){
                messageContainer.style.display = 'flex';
                winningMeasage.innerText =  'DRAW';
                setTimeout(() => {
                        messageContainer.style.display = 'none';
                        resetGame();
                    }, 3000);
        } else {
                swapTurn();
        }
        

}


function isDraw(){
        return [...cells].every(cell =>{
                return cell.classList.contains(x_class) || cell.classList.contains(o_class)
        })
}

function placeMark(cell, currentClass){
        cell.classList.add(currentClass)
}
function gameStart(){

}
function swapTurn(){
        if(currentclass === x_class){
                currentclass = o_class
                  // Update the playing class
        document.querySelector('.x_player').classList.remove('playing');
        document.querySelector('.o_player').classList.add('playing');
        }else{
                currentclass = x_class
                  // Update the playing class
        document.querySelector('.o_player').classList.remove('playing');
        document.querySelector('.x_player').classList.add('playing');
        }
}

function checkWin(currentClass) {
        const winningCombination = WINING_CONDITIONS.find(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentClass);
            });
        });
    
        if (winningCombination) {
            highlightWinningCells(winningCombination); // Highlight the winning cells
            return true;
        }
        return false;
    }


function highlightWinningCells(winningCombination) {
        winningCombination.forEach(index => {
            cells[index].classList.add('highlight'); // Add the highlight class to winning cells
        });
    }



function winningMessage(winnerClass) {
        // Show the winning message
        winningMeasage.innerText = `${winnerClass === x_class ? 'Player X' : 'Player O'} WON!`; 
        messageContainer.style.display = 'flex';
    
        // Hide the message after 5 seconds and reset the game
        setTimeout(() => {
            messageContainer.style.display = 'none';
            if(winnerClass === x_class){
                score1 += 1;
                player_1_score.innerText = score1;
            }else if(winnerClass = o_class){
                score2 += 1;
                player_2_score.innerText = score2
            }else{
                score1 = score1;
                score2 = score2;
            }
            resetGame();
        }, 3000);
}

    /*--------------------------------------------------- */

    function resetGame() {
        // Clear all marks from the board
        cells.forEach(cell => {
            cell.classList.remove(x_class, o_class, 'highlight'); // Remove 'x', 'o', and 'highlight' classes
        });
    
        // Reset the current class to the default starting player
        currentclass = currentclass;
    
        // Re-enable click events on cells
        cells.forEach(cell => {
            cell.addEventListener('click', handleClick, { once: true });
        });
    
        console.log('Game has been reset');
    }
    /*--------------------------------------------------- */


    /*--------------------------------------------------- */

    //handelling winning condition for second level 
    //winning condition of a [4 x 5] matrix box

    const WINING_CONDITIONS_2 =[
        [0, 1, 2],[1, 2, 3],[4, 5, 6],[5, 6, 7],
        [8, 9, 10],[9, 10, 11],[12, 13, 14],[13, 14, 15],
        [16, 17, 18],[17, 18, 19],[0, 4, 8],[16, 12, 8],
        [4, 8, 2],[1, 5, 9],[9, 13, 17],[5, 9, 13],
        [2, 6, 10],[10, 14, 18],[6, 10, 14],[3, 7, 11],
        [11, 15, 19],[7, 11, 15],[2, 5, 8],[9, 6, 3],
        [2, 9, 6],[7, 10, 13],[16, 13, 10],[11, 14, 17],
        [1, 6, 11],[0, 5, 10],[0, 5, 10],[5, 10, 15]
        [4, 9, 14],[9, 14, 19],[8, 13, 18]
    ];
    /*--------------------------------------------------- */
    