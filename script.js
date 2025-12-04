document.addEventListener("DOMContentLoaded",function (){

    const gameArena = document.getElementById("game-arena");
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0;//initial score of the game
    let gameStarted = false;
    let food = {x:300,y:200} // {x:15*20,y:10*20}
    let snake = [{x:160,y:200},{x:140,y:200},{x:120,y:200}];

    function drawDiv(){

    }
    function drawSnakeandFood(){



        drawDiv();

    }
    function rungame(){
        if(!gameStarted){
            gameStarted = true;

            drawSnakeandFood();
        }
    }
    function initiateGame(){
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';

        document.body.insertBefore(scoreBoard,gameArena);

        const startbtn = document.createElement('Button');
        startbtn.textContent = "Start Game";
        startbtn.classList.add('start-button');
        startbtn.addEventListener('click',()=>{
            startbtn.style.display = 'none';
            rungame();
        })
        document.body.appendChild(startbtn,gameArena);
    }

    initiateGame();



})