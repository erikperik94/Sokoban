//------ global varibles ----------------------------------------------------------------------------------

/*  Legend
    W = Wall
    B = Movable block
    P = Player starting position
    G = Goal area for the blocks
*/
var tileMap01 = {
    width: 19,
    height: 16,
  
    mapGrid: 
    [
      [ [" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],["W"],["W"],["W"],["W"],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],["W"],[" "],[" "],[" "],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],["W"],["B"],[" "],[" "],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],["W"],["W"],["W"],[" "],[" "],["B"],["W"],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],["W"],[" "],[" "],["B"],[" "],["B"],[" "],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ ["W"],["W"],["W"],[" "],["W"],[" "],["W"],["W"],[" "],["W"],[" "],[" "],[" "],["W"],["W"],["W"],["W"],["W"],["W"], ],
      [ ["W"],[" "],[" "],[" "],["W"],[" "],["W"],["W"],[" "],["W"],["W"],["W"],["W"],["W"],[" "],[" "],["G"],["G"],["W"], ],
      [ ["W"],[" "],["B"],[" "],[" "],["B"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],["G"],["G"],["W"], ],
      [ ["W"],["W"],["W"],["W"],["W"],[" "],["W"],["W"],["W"],[" "],["W"],["P"],["W"],["W"],[" "],[" "],["G"],["G"],["W"], ],
      [ [" "],[" "],[" "],[" "],["W"],[" "],[" "],[" "],[" "],[" "],["W"],["W"],["W"],["W"],["W"],["W"],["W"],["W"],["W"], ],
      [ [" "],[" "],[" "],[" "],["W"],["W"],["W"],["W"],["W"],["W"],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
    ],
  };

  
  
  const myBoard = document.getElementById("board");
  var finalPointArray = [];
  var playerId = "";
  
  //------ functions ----------------------------------------------------------------------------------------
  
  //Loops thorugh mapgrid and makes board game
  function makeBoard() {
    var elementCoordinate = "";
  
      for (let AreaHeight = 0; AreaHeight < tileMap01.height; AreaHeight++) {
          for (let AreaWidth = 0; AreaWidth < tileMap01.width; AreaWidth++) {

            elementCoordinate = AreaWidth + "," + AreaHeight;
  
            if(tileMap01.mapGrid[AreaHeight][AreaWidth][0] === "P"){
              makeBoxOnBoard("orange", elementCoordinate);
              playerId = elementCoordinate;
            }
            else if (tileMap01.mapGrid[AreaHeight][AreaWidth][0] === "W") {
              makeBoxOnBoard("blue", elementCoordinate);
            }
            else if (tileMap01.mapGrid[AreaHeight][AreaWidth][0] === "G"){
              makeBoxOnBoard("green", elementCoordinate);
              finalPointArray.push(elementCoordinate);         
            }
            else if (tileMap01.mapGrid[AreaHeight][AreaWidth][0] === "B"){
              makeBoxOnBoard("darkred", elementCoordinate);
            }
            else {
              makeBoxOnBoard("lightgray", elementCoordinate);
            }
          }
      }
  }
  
  //Choosen from makeBoard creates the element box
  function makeBoxOnBoard(elementColor, elementCoordinate) {
    var newBox = document.createElement("div");
    newBox.id = elementCoordinate;
    newBox.style.backgroundColor = elementColor;
    newBox.classList.add("box"); 
    document.addEventListener("keydown", PlayerInput);
    myBoard.appendChild(newBox);
  }
  
  //Moves player
  function moveRight(){
    move(1, 2, 0, 0);
  }
  
  function moveLeft(){
    move(-1, -2, 0, 0);
  }
  
  function moveUp(){
    move(0, 0, -1, -2);
  }
  
  function moveDown(){
    move(0, 0, 1, 2);
  }
  //Remember offset and last move, so it can calculate this move
  function move(offset_1, offset_2, offset_3, offset_4){
    var x_1 = 0;
    var x_2 = 0;
    var y_1 = 0;
    var y_2 = 0;
    var playerElement = null;
    var playerIdString = "";
    var playerIdArray = null;
    var firstElementId = "";
    var secondElementId = "";
    var firstElement;
    var secondElement;
    
    playerElement = document.getElementById(playerId);
    playerIdString = playerId.split(",");
    playerIdArray = Array.from(playerIdString);
   
    x_1 = Number(playerIdArray[0]) + offset_1;
    x_2 = Number(playerIdArray[0]) + offset_2; 
    y_1 = Number(playerIdArray[1]) + offset_3;
    y_2 = Number(playerIdArray[1]) + offset_4;
   
    firstElementId = x_1 + "," + y_1;
    secondElementId = x_2 + "," + y_2;
    firstElement = document.getElementById(firstElementId);
    secondElement = document.getElementById(secondElementId);
    
    if(firstElement.style.backgroundColor === "lightgray" || firstElement.style.backgroundColor === "green"){
      firstElement.style.backgroundColor = playerElement.style.backgroundColor;
      playerElement.style.backgroundColor = "lightgray";
  
      playerId = firstElementId;
    }
    else if(firstElement.style.backgroundColor === "darkred" && secondElement.style.backgroundColor !== "darkred" && secondElement.style.backgroundColor !== "blue"){
      secondElement.style.backgroundColor = firstElement.style.backgroundColor;
      firstElement.style.backgroundColor = playerElement.style.backgroundColor;
      playerElement.style.backgroundColor = "lightgray";
  
      playerId = firstElementId;
    }
  
    getPlayerAndGreenArea();
    checkScore();
  }
  //Fixes finish Area and player
  function getPlayerAndGreenArea(){
    for (let i = 0; i < finalPointArray.length; i++) {
      if(document.getElementById(finalPointArray[i]).style.backgroundColor !== "darkred"){
         document.getElementById(finalPointArray[i]).style.backgroundColor = "green";
      }
    }
    document.getElementById(playerId).style.backgroundColor = "orange";
  }
  //Game finsihed?
  function checkScore(){
    var totalPoint = 0;
    for (let i = 0; i < finalPointArray.length; i++) {
      if(document.getElementById(finalPointArray[i]).style.backgroundColor === "darkred"){
         totalPoint++;
      }
    }
    
    if(totalPoint == finalPointArray.length){
      alert("Congratulations! You won!");
    }
  }
  //If keyboard arrow were hit
  function PlayerInput(event){
     if(event.keyCode === 37){
      moveLeft();
     }
     else if(event.keyCode === 38){
      moveUp();
     }
     else if(event.keyCode === 39){
      moveRight();
     }
     else if(event.keyCode === 40){
      moveDown();
     }
    }
    
  document.getElementsByTagName("body")[0].style.backgroundColor = "orange";
  makeBoard();