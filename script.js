document.addEventListener("DOMContentLoaded",function (){

    const gameArena = document.getElementById("game-arena");
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0;//initial score of the game
    let gameStarted = false;
    let food = {x:300,y:200} // {x:15*20,y:10*20}
    let snake = [{x:160,y:200},{x:140,y:200},{x:120,y:200}];
    let dx = cellSize;
    let dy = 0;
    let intervalId;
    let gameSpeed = 200;

    function moveFood(){
        let newX,newY;
        do{
            newX = Math.floor(Math.random()*30)*cellSize;
            newY = Math.floor(Math.random()*30)*cellSize;
        }while(snake[0].x === newX && snake[0].y === newY);
        food = {x:newX,y:newY};
    }

    function updateSnake(){
        // console.log("update snake is active");
        let newHead = {x:snake[0].x+dx,y:snake[0].y+dy};
        snake.unshift(newHead);

        if(newHead.x === food.x && newHead.y === food.y){
            score +=10;
            moveFood();
            if(gameSpeed > 50) {
                clearInterval(intervalId);
                gameSpeed -= 10;
                gameLoop();
            }
        }else {
            snake.pop();
        }
    }

    function changeDirection(e){
        console.log("key press",e);
        let isGoingDown = dy === cellSize;
        let isGoingUp = dy === -cellSize;
        let isGoingleft = dx === -cellSize;
        let isGoingright = dx === cellSize;
        if(e.key === 'ArrowUp' && !isGoingDown){
            dx =0;
            dy = -cellSize;
        }else if(e.key === 'ArrowDown' && !isGoingUp){
            dx =0;
            dy = cellSize;
        }else if(e.key === 'ArrowLeft' && !isGoingright){
            dx = -cellSize;
            dy =0;
        }else if(e.key === 'ArrowRight' && !isGoingleft){
            dx = cellSize;
            dy = 0;
        }
    }
    function drawDiv(x,y,classname){
        const divElement = document.createElement('div');
        divElement.classList.add(classname);
        divElement.style.top = `${y}px`;
        divElement.style.left = `${x}px`;
        return divElement;
    }
    function drawSnakeandFood(){
        gameArena.innerHTML = '';// wipeout everything present in the arena
        const foodElement = drawDiv(food.x,food.y,'food');
        gameArena.appendChild(foodElement);
        snake.forEach((snakeCell)=>{
          const snakeElement= drawDiv(snakeCell.x,snakeCell.y,'snake');
            gameArena.appendChild(snakeElement);
        })
        // gameArena.appendChild(snakeElement);
    }
     function isGameOver() {
        // snake collision checks
        for(let i = 1; i < snake.length; i++) {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                return true;
            }
        }

        // wall collision checks
        const hitLeftWall = snake[0].x < 0; // snake[0] -> head
        const hitRightWall = snake[0].x > arenaSize - cellSize;
        const hitTopWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > arenaSize - cellSize;
        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
    }
    function gameLoop(){
         intervalId = setInterval(() => {
            if(isGameOver()) {
                clearInterval(intervalId);
                gameStarted = false;
                alert('Game Over' + '\n' + 'Your Score: ' + score);
                return;
            }
            updateSnake();
            drawSnakeandFood();
            drawScoreBoard();
        }, gameSpeed);
    }
     function drawScoreBoard() {
        const scoreBoard = document.getElementById('score-board');
        scoreBoard.textContent = `Score: ${score}`;
    }
    function rungame(){
        if(!gameStarted){
            gameStarted = true;
            drawSnakeandFood();
            document.addEventListener('keydown',changeDirection);
            gameLoop();
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