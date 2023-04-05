//
//Chess by Draegan
//

let currentTurnColor = 'white';
let possibilityState = false;
let currentObject;
let pieceSet = 'anarcandy';
let lastObject = [];
let wKingMoved = false;
let bKingMoved = false;
let h1RookMoved = false;
let a1RookMoved = false;
let a8RookMoved = false;
let h8RookMoved = false;
let wKingInCheck = false;
let bKingInCheck = false;
let squareName;
let checkMate = false;

//En Passant
let leftOfPawn;
let leftStartingSquare;
let leftFindTradeSquare;
let leftTradeSquare;
let rightOfPawn;
let rightStartingSquare;
let rightFindTradeSquare;
let rightTradeSquare;
let InitialDivSquare;
let aboveOrBelowInitalSquare;
let departureSquare;

//Selecting HTML
const divArray = [];
"abcdefgh".split('').forEach((letter) => {
  "12345678".split('').forEach((number) => {
    divArray.push(this[`${letter}${number}div`] = document.querySelector(`.${letter}${number}-Square`));
  })
});

class Square {
  constructor(_rowParam, _colParam, _typeParam, _colorParam) {
    this.row = _rowParam;  //coordinates
    this.col = _colParam;
    this.possible = false;    // marks the square for movement possible
    this.encounter = false;  // marks the square for trade possible
    this.blackCount = 0;        //represents pieces line of sight   
    this.whiteCount = 0;
    this.pieceType = _typeParam;
    this.pieceColor = _colorParam;
    this.altPieceType = '';     //alt board state for moving around pieces without messing up mainboard
    this.pastPieceType = '';        //board state 1 move in the past
    this.pastPieceColor = '';
    this.enPassant = false;
    squaresArray.push(this);
  }
}

//Making Squares
let squaresArray = [];
let a1Square = new Square(0, 0, 'rook', 'white');
let a2Square = new Square(1, 0, 'pawn', 'white');
let a3Square = new Square(2, 0, '', '');
let a4Square = new Square(3, 0, '', '');
let a5Square = new Square(4, 0, '', '');
let a6Square = new Square(5, 0, '', '');
let a7Square = new Square(6, 0, 'pawn', 'black');
let a8Square = new Square(7, 0, 'rook', 'black');

let b1Square = new Square(0, 1, 'knight', 'white');
let b2Square = new Square(1, 1, 'pawn', 'white');
let b3Square = new Square(2, 1, '', '');
let b4Square = new Square(3, 1, '', '');
let b5Square = new Square(4, 1, '', '');
let b6Square = new Square(5, 1, '', '');
let b7Square = new Square(6, 1, 'pawn', 'black');
let b8Square = new Square(7, 1, 'knight', 'black');

let c1Square = new Square(0, 2, 'bishop', 'white');
let c2Square = new Square(1, 2, 'pawn', 'white');
let c3Square = new Square(2, 2, '', '');
let c4Square = new Square(3, 2, '', '');
let c5Square = new Square(4, 2, '', '');
let c6Square = new Square(5, 2, '', '');
let c7Square = new Square(6, 2, 'pawn', 'black');
let c8Square = new Square(7, 2, 'bishop', 'black');


let d1Square = new Square(0, 3, 'queen', 'white');
let d2Square = new Square(1, 3, 'pawn', 'white');
let d3Square = new Square(2, 3, '', '');
let d4Square = new Square(3, 3, '', '');
let d5Square = new Square(4, 3, '', '');
let d6Square = new Square(5, 3, '', '');
let d7Square = new Square(6, 3, 'pawn', 'black');
let d8Square = new Square(7, 3, 'queen', 'black');


let e1Square = new Square(0, 4, 'king', 'white');
let e2Square = new Square(1, 4, 'pawn', 'white');
let e3Square = new Square(2, 4, '', '');
let e4Square = new Square(3, 4, '', '');
let e5Square = new Square(4, 4, '', '');
let e6Square = new Square(5, 4, '', '');
let e7Square = new Square(6, 4, 'pawn', 'black');
let e8Square = new Square(7, 4, 'king', 'black');

let f1Square = new Square(0, 5, 'bishop', 'white');
let f2Square = new Square(1, 5, 'pawn', 'white');
let f3Square = new Square(2, 5, '', '');
let f4Square = new Square(3, 5, '', '');
let f5Square = new Square(4, 5, '', '');
let f6Square = new Square(5, 5, '', '');
let f7Square = new Square(6, 5, 'pawn', 'black');
let f8Square = new Square(7, 5, 'bishop', 'black');

let g1Square = new Square(0, 6, 'knight', 'white');
let g2Square = new Square(1, 6, 'pawn', 'white');
let g3Square = new Square(2, 6, '', '');
let g4Square = new Square(3, 6, '', '');
let g5Square = new Square(4, 6, '', '');
let g6Square = new Square(5, 6, '', '');
let g7Square = new Square(6, 6, 'pawn', 'black');
let g8Square = new Square(7, 6, 'knight', 'black');


let h1Square = new Square(0, 7, 'rook', 'white');
let h2Square = new Square(1, 7, 'pawn', 'white');
let h3Square = new Square(2, 7, '', '');
let h4Square = new Square(3, 7, '', '');
let h5Square = new Square(4, 7, '', '');
let h6Square = new Square(5, 7, '', '');
let h7Square = new Square(6, 7, 'pawn', 'black');
let h8Square = new Square(7, 7, 'rook', 'black');

const benPassantArray = [a3Square, b3Square, c3Square, d3Square, e3Square, f3Square, g3Square, h3Square];
const wenPassantArray = [a6Square, b6Square, c6Square, d6Square, e6Square, f6Square, g6Square, h6Square];

function
  findKing(color) {
  return squaresArray.find(square => square.pieceType == 'king' && square.pieceColor == color);
};

function
  pastBoardUpdate() {
  for (let i = 0; i < squaresArray.length; i++) {
    squaresArray[i].pastPieceType = squaresArray[i].pieceType;
    squaresArray[i].pastPieceColor = squaresArray[i].pieceColor;
  }
}

function
  updateRealWithPastBoard() {
  for (let i = 0; i < squaresArray.length; i++) {
    squaresArray[i].pieceType = squaresArray[i].pastPieceType;
    squaresArray[i].pieceColor = squaresArray[i].pastPieceColor;
  }
}

//Find the square with col and row coordinates and output that object
function
  findSquare(rowinput, colinput) {

  for (let i = 0; i < squaresArray.length; i++) {
    if (squaresArray[i].row == rowinput && squaresArray[i].col == colinput) {
      return squaresArray[i];
    }
  }
}

//Resets the count (aka pieces line of sight)
function
  resetCount() {
  for (let i = 0; i < squaresArray.length; i++) {
    squaresArray[i].blackCount = 0;
    squaresArray[i].whiteCount = 0;
  }
}

function
  isKingInCheck() {
  for (let i = 0; i < squaresArray.length; i++) {

    if ('king' == squaresArray[i].pieceType && 'white' == squaresArray[i].pieceColor && 0 != squaresArray[i].blackCount) {
      divArray[i].classList.add("check")
      return mateChecker();
    } else {
      divArray[i].classList.remove("check")
    }

    if ('king' == squaresArray[i].pieceType && 'black' == squaresArray[i].pieceColor && 0 != squaresArray[i].whiteCount) {
      divArray[i].classList.add("check")
      return mateChecker();
    } else {
      divArray[i].classList.remove("check")
    }
  }
}

//Making a copy of the board - so that I can modify it while still maintaining the true board state
function
  altSnapshot() {
  for (let i = 0; i < squaresArray.length; i++) {
    squaresArray[i].altPieceType = squaresArray[i].pieceType
    squaresArray[i].altPieceColor = squaresArray[i].pieceColor
  }
}

//This functions relies on a version of the board that is stuck in the past. If a move is made and the king is still in check, we just update the real board
//with the board in the past and skip changing  turns. This way its impossible to make a move that doesnt prevent checkmate or to put yourself in check. 
function
  CheckForPin() {
  let whiteKingSquare = findKing('white');
  let blackKingSquare = findKing('black');
  resetCount();
  altSnapshot();
  countChecker();

  if (currentTurnColor == 'black' && blackKingSquare.whiteCount > 0
    || currentTurnColor == 'white' && whiteKingSquare.blackCount > 0) {
    updateRealWithPastBoard();
    resetCount();
    return false
  }

}

function
  turnColorSwitcher() {
  currentTurnColor = currentTurnColor == 'white' ? 'black' : 'white';
}

function
  changeTurn() {
  checkToSeeIfPawnReachesEnd();
  if (false == CheckForPin()) return;
  turnColorSwitcher();
  possibilityState = false;
  resetPossibleAndEncounter();
  altSnapshot();
  mapImages();
  lastObject.pop();
  lastObject.push(currentObject);
  resetCount();
  countChecker()
  isKingInCheck();
  pastBoardUpdate();
}

//  Possible and encounter refers to movement possibilities of pieces. This resets those possibilities. 
function
  resetPossibleAndEncounter() {
  for (let i = 0; i < squaresArray.length; i++) {
    squaresArray[i].possible = false;
    squaresArray[i].encounter = false;
    squaresArray[i].enPassant = false;
  }
}

//Coloring background of squares in dom.
function
  visualizePossibilities() {
  for (let i = 0; i < squaresArray.length; i++) {
    if (squaresArray[i].encounter == true) {
      divArray[i].classList.add("encounter");
    }
    if ('king' == squaresArray[i].pieceType && 'white' == squaresArray[i].pieceColor && 0 != squaresArray[i].blackCount) {
      divArray[i].classList.add("check")
    }

    if (squaresArray[i].enPassant == true) {
      divArray[i].classList.add("enpassant");
    }

    if (squaresArray[i].possible == true) { divArray[i].classList.add("possible") }
  }
}

function
  unvisualizePossibilities() {
  for (let i = 0; i < squaresArray.length; i++) {
    if (squaresArray[i].encounter == false) { divArray[i].classList.remove("encounter") }
    if (squaresArray[i].possible == false) { divArray[i].classList.remove("possible") }
    if (squaresArray[i].enPassant == false) { divArray[i].classList.remove("enpassant") }
  }
}

setInterval(visualizePossibilities, 100);
setInterval(unvisualizePossibilities, 100);

//Map Images
function
  mapImages() {

  const pieceMap = {
    "knight": "N",
    "bishop": "B",
    "rook": "R",
    "queen": "Q",
    "king": "K",
    "pawn": "P"
  }

  const fileTypeMap = {
    "anarcandy": "svg",
    "basic": "png"
  }

  const colorMap = {
    "black": "b",
    "white": "w"
  }

  for (let i = 0; i < squaresArray.length; i++) {
    if (squaresArray[i].pieceType == "") {
      divArray[i].innerHTML = "";
      continue;
    }

    divArray[i].innerHTML =
      `<img src="./${pieceSet}/${colorMap[squaresArray[i].pieceColor]}${pieceMap[squaresArray[i].pieceType]}.${fileTypeMap[pieceSet]}">  `

  }

}
mapImages();

function
  changePieceButton() {
  if (pieceSet == 'basic') { pieceSet = 'anarcandy'; return mapImages(); }
  else { pieceSet = 'basic'; return mapImages(); }
}

function
  checkSquaresAroundKing() {
  let color = currentTurnColor;
  let row = findKing(color).row;
  let col = findKing(color).col;
  let arr = [[row + 1, col], [row + 1, col + 1], [row, col + 1], [row - 1, col + 1],
  [row - 1, col], [row - 1, col - 1], [row, col - 1], [row + 1, col - 1]];
  console.log(arr[0][0]);

  for (let i = 0; i < arr.length; i++) {
    if (findSquare(arr[i][0], arr[i][1]) == undefined) {
      continue;
    }

    let square = findSquare(arr[i][0], arr[i][1]);
    console.log(square);
    let count = color == "white" ? square.blackCount : square.whiteCount;

    if (count == 0 && square.pieceColor == '') {
      console.log(i + "free square");
      return true;
    }

    if (count == 0 && square.pieceColor != currentTurnColor) {
      console.log(i + "trade square");
      return true;
    }
  }

  return false;
}

function
  recursionCallbackForMovement(row, col, direction, callBack) {
  if (direction == 'stop' || "pawnUp" == direction) return;

  if (direction == 'up') {
    return callBack(row + 1, col, 'up');
  }

  if (direction == 'down') {
    return callBack(row - 1, col, 'down');
  }

  if (direction == 'right') {
    return callBack(row, col + 1, 'right');
  }

  if (direction == 'left') {
    return callBack(row, col - 1, 'left');
  }

  if (direction == 'up-left') {
    return callBack(row + 1, col - 1, 'up-left');
  }

  if (direction == 'up-right') {
    return callBack(row + 1, col + 1, 'up-right');
  }

  if (direction == 'down-left') {
    return callBack(row - 1, col - 1, 'down-left');
  }

  if (direction == 'down-right') {
    return callBack(row - 1, col + 1, 'down-right');
  }
}

function
  movement(row, col, myCallback, piece, option) {
  let arr;
  switch (piece) {
    case "rook":
      arr = [[row + 1, col, "up"], [row - 1, col, "down"], [row, col + 1, "right"], [row, col - 1, "left"]];
      break;
    case "bishop":
      arr = [[row + 1, col + 1, "up-right"], [row - 1, col + 1, "down-right"], [row - 1, col - 1, "down-left"], [row + 1, col - 1, "up-left"]];
      break;
    case "knight":
      arr = [[row + 2, col + 1, 'stop'], [row + 1, col + 2, 'stop'], [row - 1, col + 2, 'stop'], [row - 2, col + 1, 'stop'],
      [row - 2, col - 1, 'stop'], [row - 1, col - 2, 'stop'], [row + 1, col - 2, 'stop'], [row + 2, col - 1, 'stop']];
      break;
    case "king":
      arr = [[row + 1, col, 'stop'], [row + 1, col + 1, 'stop'], [row, col + 1, 'stop'], [row - 1, col + 1, 'stop'],
      [row - 1, col, 'stop'], [row - 1, col - 1, 'stop'], [row, col - 1, 'stop'], [row + 1, col - 1, 'stop']];
      break;
  }

  for (let j = 0; j < arr.length; j++) {
    myCallback(arr[j][0], arr[j][1], arr[j][2], option);
  }
}

//      This function sets checkmate to true. It  then makes every possible move for a player in check. After every move, it checks to see if the king has a way out. If after its tried every move, its still checkMate == true
//      then the game is over.  The actual movement of the pieces happens after this function. This function calls those movement functions. 
function
  mateChecker() {

  checkMate = true;

  if (true == checkSquaresAroundKing()) {
    checkMate = false;
  }

  for (let i = 0; i < squaresArray.length; i++) {
    if (squaresArray[i].pieceType == 'rook' && squaresArray[i].pieceColor == currentTurnColor) {
      movement(squaresArray[i].row, squaresArray[i].col, mateDirection, "rook", findSquare(squaresArray[i].row, squaresArray[i].col));
    }

    if (squaresArray[i].pieceType == 'bishop' && squaresArray[i].pieceColor == currentTurnColor) {
      movement(squaresArray[i].row, squaresArray[i].col, mateDirection, "bishop", findSquare(squaresArray[i].row, squaresArray[i].col));
    }

    if (squaresArray[i].pieceType == 'queen' && squaresArray[i].pieceColor == currentTurnColor) {
      movement(squaresArray[i].row, squaresArray[i].col, mateDirection, "rook", findSquare(squaresArray[i].row, squaresArray[i].col));
      movement(squaresArray[i].row, squaresArray[i].col, mateDirection, "bishop", findSquare(squaresArray[i].row, squaresArray[i].col));
    }

    if (squaresArray[i].pieceType == 'pawn' && squaresArray[i].pieceColor == "white") {
      if (findSquare(squaresArray[i].row + 1, squaresArray[i].col).pieceType == "") {
        mateDirection(squaresArray[i].row + 1, squaresArray[i].col, 'stop', findSquare(squaresArray[i].row, squaresArray[i].col))
      }
      if (squaresArray[i].row == 1 && findSquare(squaresArray[i].row + 2, squaresArray[i].col).pieceType == "") {
        mateDirection(squaresArray[i].row + 2, squaresArray[i].col, 'stop', findSquare(squaresArray[i].row, squaresArray[i].col))
      }
      if (squaresArray[i].col != 0 && findSquare(squaresArray[i].row - 1, squaresArray[i].col - 1).pieceColor == "black") {
        mateDirection(squaresArray[i].row + 1, squaresArray[i].col - 1, 'stop', findSquare(squaresArray[i].row, squaresArray[i].col))
      }

      if (squaresArray[i].col != 7 && findSquare(squaresArray[i].row - 1, squaresArray[i].col + 1).pieceColor == "black") {
        mateDirection(squaresArray[i].row + 1, squaresArray[i].col + 1, 'stop', findSquare(squaresArray[i].row, squaresArray[i].col))
      }
    }

    if (squaresArray[i].pieceType == 'pawn' && squaresArray[i].pieceColor == "black") {
      if (findSquare(squaresArray[i].row - 1, squaresArray[i].col).pieceType == "") {
        mateDirection(squaresArray[i].row - 1, squaresArray[i].col, 'stop', findSquare(squaresArray[i].row, squaresArray[i].col))
      }
      if (squaresArray[i].row == 6 && findSquare(squaresArray[i].row - 2, squaresArray[i].col).pieceType == "") {
        mateDirection(squaresArray[i].row - 2, squaresArray[i].col, 'stop', findSquare(squaresArray[i].row, squaresArray[i].col))
      }
      if (squaresArray[i].col != 0 && findSquare(squaresArray[i].row - 1, squaresArray[i].col - 1).pieceColor == "white") {
        mateDirection(squaresArray[i].row - 1, squaresArray[i].col - 1, 'stop', findSquare(squaresArray[i].row, squaresArray[i].col))
      }

      if (squaresArray[i].col != 7 && findSquare(squaresArray[i].row - 1, squaresArray[i].col + 1).pieceColor == "white") {
        mateDirection(squaresArray[i].row - 1, squaresArray[i].col + 1, 'stop', findSquare(squaresArray[i].row, squaresArray[i].col))
      }
    }

    if (squaresArray[i].pieceType == 'knight' && squaresArray[i].pieceColor == currentTurnColor) {
      movement(squaresArray[i].row, squaresArray[i].col, mateDirection, "knight", findSquare(squaresArray[i].row, squaresArray[i].col));
    }
  }

  if (true == checkMate) {
    return document.getElementById('checkmate-id').innerHTML = 'CHECKMATE!!!!!!';
  } else {
    return 'Not CheckMate';
  }
}

function
  mateDirection(row, col, direction, startSquare) {
  //already found a way out of checkmate - no need to look further.
  if (false == checkMate) { return }

  if (findSquare(row, col) == undefined) {
    return
  }

  // ran into a piece of the same color
  if (findSquare(row, col).pieceColor == currentTurnColor) {

    return
  }


  // ran into a piece of opposite color
  if (findSquare(row, col).pieceColor != currentTurnColor && findSquare(row, col).pieceColor != '') {
    altSnapshot(); // This removes any previous placeholder pieces from the board and restores pieces that were traded. Its important we dont accumilate placeholders because that would mean a player was making more than one move.

    // This moves the piece that is moving from its original square to reveal if it is pinned or not.
    if (startSquare != undefined) {
      startSquare.altPieceColor = '';
      startSquare.altPieceType = '';
    }

    resetCount(); // This resets the count because previous iterations of this function would have altered the count and those interations dont exist anymore.

    findSquare(row, col).altPieceType = 'placeholder';
    findSquare(row, col).altPieceColor = currentTurnColor;
    countChecker();

    //CheckMate is assumed true unless this is tripped. This simply means that we found a way out of checkmate. 
    if (0 == findKing('black').whiteCount && currentTurnColor == 'black') { checkMate = false; }
    if (0 == findKing('white').blackCount && currentTurnColor == 'white') { checkMate = false; }
    altSnapshot();
    return

  }

  if (findSquare(row, col).pieceColor == '') {

    altSnapshot();

    // Putting the starting square piece back
    if (startSquare != undefined) {
      startSquare.altPieceColor = '';
      startSquare.altPieceType = '';
    }


    resetCount();

    findSquare(row, col).altPieceType = 'placeholder';
    findSquare(row, col).altPieceColor = currentTurnColor;

    countChecker();

    //CheckMate is assumed true unless this is tripped. This simply means that we found a way out of checkmate. 
    if (0 == findKing('black').whiteCount && currentTurnColor == 'black') { checkMate = false; }
    if (0 == findKing('white').blackCount && currentTurnColor == 'white') { checkMate = false; }

    altSnapshot();
    recursionCallbackForMovement(row, col, direction, mateDirection);
  }
}

function
  matePawn(row, col, forward) {
  if (findSquare(row, col) == undefined) return;

  if (findSquare(row, col).altPieceColor == '' && forward == true) {
    findSquare(row, col).altPieceColor = currentTurnColor;
    findSquare(row, col).altPieceType = 'placeholder';
    return
  }

  if (findSquare(row, col).altPieceColor != currentTurnColor) {

    findSquare(row, col).altPieceType = 'placeholder';
    findSquare(row, col).altPieceColor = currentTurnColor;
    return;
  }
}

//This function uses the same basic algorithm of moving the pieces and the mate checker but its job is to mark the pieces lines of sight.
//This is to detect for check and checkmate.
function
  countChecker() {
  for (let i = 0; i < squaresArray.length; i++) {
    if (squaresArray[i].altPieceType == 'rook' && squaresArray[i].altPieceColor != currentTurnColor) {
      movement(squaresArray[i].row, squaresArray[i].col, countDirection, "rook");
    }

    if (squaresArray[i].altPieceType == 'bishop' && squaresArray[i].altPieceColor != currentTurnColor) {
      movement(squaresArray[i].row, squaresArray[i].col, countDirection, "bishop");
    }

    if (squaresArray[i].altPieceType == 'queen' && squaresArray[i].altPieceColor != currentTurnColor) {
      movement(squaresArray[i].row, squaresArray[i].col, countDirection, "bishop");
      movement(squaresArray[i].row, squaresArray[i].col, countDirection, "rook");
    }

    if (squaresArray[i].altPieceType == 'pawn' && currentTurnColor == 'white' && squaresArray[i].altPieceColor != currentTurnColor) {
      countDirection(squaresArray[i].row - 1, squaresArray[i].col + 1, 'stop')
      countDirection(squaresArray[i].row - 1, squaresArray[i].col - 1, 'stop')
    }

    if (squaresArray[i].altPieceType == 'pawn' && currentTurnColor == 'black' && squaresArray[i].altPieceColor != currentTurnColor) {
      countDirection(squaresArray[i].row + 1, squaresArray[i].col + 1, 'stop')
      countDirection(squaresArray[i].row + 1, squaresArray[i].col - 1, 'stop')
    }

    if (squaresArray[i].altPieceType == 'knight' && squaresArray[i].altPieceColor != currentTurnColor) {
      movement(squaresArray[i].row, squaresArray[i].col, countDirection, "knight");

    }

    if (squaresArray[i].altPieceType == 'king' && squaresArray[i].altPieceColor != currentTurnColor) {
      movement(squaresArray[i].row, squaresArray[i].col, countDirection, "king");

      movement(squaresArray[i].row, squaresArray[i].col, countDirection, "king");
    }
  }
}

//Movement for marking the lines of sight
function
  countDirection(row, col, direction) {
  if (findSquare(row, col) == undefined) return;

  // Here we ignore running into a king so that the squares behind the king are also marked. 
  if (findSquare(row, col).altPieceType != '' && findSquare(row, col).altPieceType != 'king') {
    if (currentTurnColor == 'white') {
      findSquare(row, col).blackCount++;
    }
    if (currentTurnColor == 'black') {
      findSquare(row, col).whiteCount++;
    }
    return
  } else {
    if (currentTurnColor == 'white') {
      findSquare(row, col).blackCount++;
    }
    if (currentTurnColor == 'black') {
      findSquare(row, col).whiteCount++;
    }
    recursionCallbackForMovement(row, col, direction, countDirection);
  }
}

function
  pieceChecker(clickedSquare, row, col) {

  if ('rook' == clickedSquare.pieceType && clickedSquare.pieceColor == currentTurnColor) {

    movement(row, col, pieceDirection, "rook")

  }

  if ('bishop' == clickedSquare.pieceType && clickedSquare.pieceColor == currentTurnColor) {
    movement(row, col, pieceDirection, "bishop")
  }

  if ('queen' == clickedSquare.pieceType && clickedSquare.pieceColor == currentTurnColor) {
    movement(row, col, pieceDirection, "bishop")
    movement(row, col, pieceDirection, "rook")
  }

  if ('pawn' == clickedSquare.pieceType && clickedSquare.pieceColor == "black") {
    let pawnArray = [a7Square, b7Square, c7Square, d7Square, e7Square, f7Square, g7Square, h7Square]
    let currentSquare = findSquare(row, col)

    if (currentSquare == b4Square || currentSquare == c4Square || currentSquare == d4Square || currentSquare == e4Square
      || currentSquare == f4Square || currentSquare == g4Square || currentSquare == h4Square) { bEnPassantLeft(row, col) }

    if (currentSquare == b4Square || currentSquare == c4Square || currentSquare == d4Square || currentSquare == e4Square
      || currentSquare == f4Square || currentSquare == g4Square || currentSquare == a4Square) { bEnPassantRight(row, col) }

    for (let i = 0; i < pawnArray.length; i++) {

      if (currentSquare == pawnArray[i]) {
        pawnUp(row - 2, col, "pawnUp")
        pawnUp(row - 1, col, "pawnUp")
      }
    }
    pieceDirection(row - 1, col + 1, "pawn");
    pieceDirection(row - 1, col - 1, "pawn");
    pieceDirection(row - 1, col, "pawnUp");
  }

  if ('pawn' == clickedSquare.pieceType && clickedSquare.pieceColor == "white") {
    let wPawnArray = [a2Square, b2Square, c2Square, d2Square, e2Square, f2Square, g2Square, h2Square];


    let currentSquare = findSquare(row, col);



    if (currentSquare == b5Square || currentSquare == c5Square || currentSquare == d5Square || currentSquare == e5Square
      || currentSquare == f5Square || currentSquare == g5Square || currentSquare == h5Square) { wEnPassantLeft(row, col) }

    if (currentSquare == b5Square || currentSquare == c5Square || currentSquare == d5Square || currentSquare == e5Square
      || currentSquare == f5Square || currentSquare == g5Square || currentSquare == a5Square) { wEnPassantRight(row, col) }


    for (let i = 0; i < wPawnArray.length; i++) {
      if (currentSquare == wPawnArray[i]) {
        pawnUp(row + 2, col, "pawnUp");
        pawnUp(row + 1, col, "pawnUp");
      }
    }
    pieceDirection(row + 1, col + 1, "pawn");
    pieceDirection(row + 1, col - 1, "pawn");
    pieceDirection(row + 1, col, "pawnUp");
  }

  if ('knight' == clickedSquare.pieceType && clickedSquare.pieceColor == currentTurnColor) {
    movement(row, col, pieceDirection, "knight");
  }

  if ('king' == clickedSquare.pieceType && clickedSquare.pieceColor == currentTurnColor) {

    movement(row, col, pieceDirection, "king");
  }
}

//Movement of the pieces
function
  pieceDirection(row, col, direction) {
  if (findSquare(row, col) == undefined) return;
  if (findSquare(row, col).pieceColor == currentTurnColor) return;

  if (findSquare(row, col).pieceColor != '' && findSquare(row, col).pieceColor != currentTurnColor) {

    // Stops pawn from encountering upwards
    if ("black" == currentTurnColor && direction == "pawnUp" && findSquare(row - 1, col) != "") { return }
    if ("white" == currentTurnColor && direction == "pawnUp" && findSquare(row + 1, col) != "") { return }
    findSquare(row, col).encounter = true;
    return
  } else {
    if (direction == "pawn") return;

    findSquare(row, col).possible = true;
    recursionCallbackForMovement(row, col, direction, pieceDirection);
  }
}

function
  pawnUp(row, col) {
  let currentSquare = findSquare(row, col);

  if (currentSquare == undefined) { return }
  else if (currentSquare.pieceColor != '') {
    console.log(currentSquare);
    return;
  } else {
    currentSquare.possible = true;
    console.log(currentSquare);
    return;
  }
}

function
  pawnEncounter(row, col) {
  let currentSquare = findSquare(row, col)

  if (currentSquare == undefined) { return }
  else if (currentSquare.pieceColor == currentTurnColor || currentSquare == undefined) {
    console.log(currentSquare);
    return;
  }

  else if (currentSquare.pieceColor != '' && currentSquare.pieceColor != currentTurnColor) {
    currentSquare.encounter = true;
    console.log(currentSquare)
    return;
  }
}

function
  wEnPassantLeft(row, col) {
  leftOfPawn = findSquare(row, col - 1)
  leftStartingSquare = findSquare(row + 2, col - 1)
  leftFindTradeSquare = findSquare(row + 1, col - 1)

  let wEnPassantArray = [b5Square, c5Square, d5Square, e5Square, f5Square, g5Square, h5Square]

  for (let i = 0; i < wEnPassantArray.length; i++) {
    if (wEnPassantArray[i].pieceType == 'pawn' && wEnPassantArray[i].pieceColor == 'white'
      && currentTurnColor == 'white' && leftOfPawn.pieceType == 'pawn'
      && leftOfPawn.pieceColor == 'black' && lastObject[0] == leftStartingSquare) {
      console.log('enPassant');
      leftTradeSquare = leftFindTradeSquare;
      leftTradeSquare.enPassant = true;

    }

  }
}

function
  wEnPassantRight(row, col) {

  rightOfPawn = findSquare(row, col + 1);
  rightStartingSquare = findSquare(row + 2, col + 1);
  rightFindTradeSquare = findSquare(row + 1, col + 1);

  let wEnPassantArray = [a5Square, b5Square, c5Square, d5Square, e5Square, f5Square, g5Square];

  for (let i = 0; i < wEnPassantArray.length; i++) {
    if (wEnPassantArray[i].pieceType == 'pawn' && wEnPassantArray[i].pieceColor == 'white'
      && currentTurnColor == 'white' && rightOfPawn.pieceType == 'pawn'
      && rightOfPawn.pieceColor == 'black' && lastObject[0] == rightStartingSquare) {
      console.log('enPassant');
      rightTradeSquare = rightFindTradeSquare;
      rightTradeSquare.enPassant = true;
    }
  }
}

function
  bEnPassantLeft(row, col) {

  leftOfPawn = findSquare(row, col - 1)
  leftStartingSquare = findSquare(row - 2, col - 1)
  leftFindTradeSquare = findSquare(row - 1, col - 1)

  let bEnPassantArray = [b4Square, c4Square, d4Square, e4Square, f4Square, g4Square, h4Square];

  for (let i = 0; i < bEnPassantArray.length; i++) {
    if (bEnPassantArray[i].pieceType == 'pawn' && bEnPassantArray[i].pieceColor == 'black'
      && currentTurnColor == 'black' && leftOfPawn.pieceType == 'pawn'
      && leftOfPawn.pieceColor == 'white' && lastObject[0] == leftStartingSquare) {
      console.log('enPassant')
      leftTradeSquare = leftFindTradeSquare;
      leftTradeSquare.enPassant = true;
    }
  }
}

function
  bEnPassantRight(row, col) {

  rightOfPawn = findSquare(row, col + 1);
  rightStartingSquare = findSquare(row - 2, col + 1);
  rightFindTradeSquare = findSquare(row - 1, col + 1);

  let bEnPassantArray = [a4Square, b4Square, c4Square, d4Square, e4Square, f4Square, g4Square];

  for (let i = 0; i < bEnPassantArray.length; i++) {
    if (bEnPassantArray[i].pieceType == 'pawn' && bEnPassantArray[i].pieceColor == 'black'
      && currentTurnColor == 'black' && rightOfPawn.pieceType == 'pawn'
      && rightOfPawn.pieceColor == 'white' && lastObject[0] == rightStartingSquare) {
      console.log('enPassant');
      rightTradeSquare = rightFindTradeSquare;
      rightTradeSquare.enPassant = true;
    }
  }
}

function
  enPassantMove(row, col, color_direction) {
  switch (color_direction) {
    case "blackleft":
      {
        InitialDivSquare = findSquare(row, col);
        aboveOrBelowInitalSquare = findSquare(row + 1, col);
        departureSquare = findSquare(row + 1, col - 1);
        break;
      }
    case "blackright":
      {
        InitialDivSquare = findSquare(row, col);
        aboveOrBelowInitalSquare = findSquare(row + 1, col);
        departureSquare = findSquare(row + 1, col + 1);
        break;
      }
    case "whiteleft":
      {
        InitialDivSquare = findSquare(row, col);
        aboveOrBelowInitalSquare = findSquare(row - 1, col);
        departureSquare = findSquare(row - 1, col + 1);
        break;
      }
    case "whiteright":
      {
        InitialDivSquare = findSquare(row, col);
        aboveOrBelowInitalSquare = findSquare(row - 1, col);
        departureSquare = findSquare(row - 1, col - 1);
        break;
      }
  }

  InitialDivSquare.pieceType = 'pawn';
  InitialDivSquare.pieceColor = currentTurnColor;
  aboveOrBelowInitalSquare.pieceType = '';
  aboveOrBelowInitalSquare.pieceColor = '';
  departureSquare.pieceType = '';
  departureSquare.pieceColor = '';
  leftTradeSquare = '';
  rightTradeSquare = '';
}

function clickingNonPossibleSquare() {
  resetPossibleAndEncounter();
  isKingInCheck();
  possibilityState = false;
}

function clickingPossibleSquare(squareName) {
  squareName.pieceType = currentObject.pieceType;
  squareName.pieceColor = currentObject.pieceColor;
  currentObject.pieceType = '';
  currentObject.pieceColor = '';
  changeTurn();
}

function clickingEncounterSquare(squareName) {
  squareName.pieceType = currentObject.pieceType;
  squareName.pieceColor = currentObject.pieceColor;
  currentObject.pieceType = '';
  currentObject.pieceColor = '';
  changeTurn();
}

for (let index = 0; index < divArray.length; index++) {
  //Create an event listener that runs a function with the paremeter telling the function what square to work on.
  divArray[index].addEventListener('click', () => {
    countChecker();
    isKingInCheck();
    mainEventFunction(squaresArray[index]);
  })
}

function
  mainEventFunction(currentSquare) {
  if (rightTradeSquare == currentSquare && currentTurnColor == 'black') {
    enPassantMove(currentSquare.row, currentSquare.col, "blackleft");
    changeTurn();
    return;
  }

  if (leftTradeSquare == currentSquare && currentTurnColor == 'black') {
    enPassantMove(currentSquare.row, currentSquare.col, "blackright");
    changeTurn();
    return;
  }

  if (rightTradeSquare == currentSquare && currentTurnColor == 'white') {
    enPassantMove(currentSquare.row, currentSquare.col, "whiteright");
    changeTurn();
    return
  }

  if (leftTradeSquare == currentSquare && currentTurnColor == 'white') {
    enPassantMove(currentSquare.row, currentSquare.col, "whiteleft");
    changeTurn();
    return;
  }

  if (true == possibilityState && false == currentSquare.possible && false == currentSquare.encounter) {
    clickingNonPossibleSquare();
    return;
  }

  if (true == currentSquare.possible) {
    clickingPossibleSquare(currentSquare)
    return;
  }
  if (true == currentSquare.encounter) {
    clickingEncounterSquare(currentSquare)
    return;
  }
  if (true == possibilityState) {
    return;

  } else if ('white' == currentTurnColor && 'white' == currentSquare.pieceColor) {
    currentObject = currentSquare;
    pieceChecker(currentSquare, currentSquare.row, currentSquare.col);
    possibilityState = true;
    return;

  } else if ('black' == currentSquare.pieceColor && 'black' == currentTurnColor) {
    currentObject = currentSquare;
    possibilityState = true;
    pieceChecker(currentSquare, currentSquare.row, currentSquare.col);
    return;

  }
  isKingInCheck();
}

//Castling
document.getElementById("g1-id").addEventListener('click', () => {

  if (currentObject == e1Square && false == wKingMoved && false == h1RookMoved && f1Square.pieceType == '' && g1Square.pieceType == ''
    && 0 == g1Square.blackCount && 0 == f1Square.blackCount && 0 == e1Square.blackCount) {
    e1Square.pieceType = '';
    h1Square.pieceType = '';
    e1Square.pieceColor = '';
    h1Square.pieceColor = '';

    f1Square.pieceType = 'rook';
    f1Square.pieceColor = 'white';
    g1Square.pieceType = 'king';
    g1Square.pieceColor = 'white'

    changeTurn();
    return;
  }
})


document.getElementById("g8-id").addEventListener('click', () => {

  if (currentObject == e8Square && false == bKingMoved && false == h8RookMoved && f8Square.pieceType == '' && g8Square.pieceType == ''
    && 0 == g8Square.whiteCount && 0 == f8Square.whiteCount && 0 == e8Square.whiteCount) {
    e8Square.pieceType = '';
    h8Square.pieceType = '';
    e8Square.pieceColor = '';
    h8Square.pieceColor = '';

    f8Square.pieceType = 'rook';
    f8Square.pieceColor = 'black';
    g8Square.pieceType = 'king';
    g8Square.pieceColor = 'black'

    changeTurn();
    return;
  }
})

document.getElementById("c1-id").addEventListener('click', () => {

  if (currentObject == e1Square && false == wKingMoved && false == a1RookMoved && b1Square.pieceType == '' && c1Square.pieceType == ''
    && 0 == c1Square.blackCount && 0 == e1Square.blackCount && 0 == d1Square.blackCount && d1Square.pieceType == '') {
    a1Square.pieceType = '';
    b1Square.pieceType = '';
    a1Square.pieceColor = '';
    b1Square.pieceColor = '';

    d1Square.pieceType = 'rook';
    d1Square.pieceColor = 'white';
    c1Square.pieceType = 'king';
    c1Square.pieceColor = 'white'

    changeTurn();
    return;
  }
})

document.getElementById("c8-id").addEventListener('click', () => {

  if (currentObject == e8Square && false == bKingMoved && false == a8RookMoved && b8Square.pieceType == '' && c8Square.pieceType == ''
    && 0 == c8Square.whiteCount && 0 == e8Square.whiteCount && 0 == d8Square.whiteCount && d8Square.pieceType == '') {
    a8Square.pieceType = '';
    e8Square.pieceType = '';
    a8Square.pieceColor = '';
    e8Square.pieceColor = '';

    d8Square.pieceType = 'rook';
    d8Square.pieceColor = 'black';
    c8Square.pieceType = 'king';
    c8Square.pieceColor = 'black'

    changeTurn();
    return;
  }
})


// Pawn queening:

const pieceSelect = {
  cover: document.querySelector("[data-cover]"),
  whiteBox: document.querySelector("[data-choose-white]"),
  blackBox: document.querySelector("[data-choose-black]"),
  // Piece Order is [Rook, Knight, Bishop, Queen]
  whitePieces: document.querySelectorAll("[data-piece-white]"),
  blackPieces: document.querySelectorAll("[data-piece-black]"),
  currentSquare: null
}

function checkToSeeIfPawnReachesEnd() {
  let whiteSideSquares = [a1Square, b1Square, c1Square, d1Square, e1Square, f1Square, g1Square, h1Square];
  let blackSideSquares = [a8Square, b8Square, c8Square, d8Square, e8Square, f8Square, g8Square, h8Square];

  whiteSideSquares.forEach((square) => {
    if (square.pieceType == "pawn") {
      pieceSelectionMode("black");
      pieceSelect.currentSquare = square;
    }
  });

  blackSideSquares.forEach((square) => {
    if (square.pieceType == "pawn") {
      pieceSelectionMode("white")
      pieceSelect.currentSquare = square;
    }
  });
}

function pieceSelectionMode(color, off) {
  if (off) {
    pieceSelect.cover.style = "display: none";
    pieceSelect.whiteBox.style = "display: none";
    pieceSelect.blackBox.style = "display: none";
    return
  }
  pieceSelect.cover.style = "display: block";
  if (color == "white") {
    pieceSelect.whiteBox.style = "display: block";
  } else if (color == "black") {
    pieceSelect.blackBox.style = "display: block";
  }
}

function pieceSelectionPlacePiece(currentPiece, color) {
  pieceSelect.currentSquare.pieceType = currentPiece;
  mapImages();
  pieceSelectionMode("none", true)
}

// Event Listeners for the piece selection buttons
pieceSelect.whitePieces[0].addEventListener("click", () => {
  pieceSelectionPlacePiece("rook", "white");
})
pieceSelect.whitePieces[1].addEventListener("click", () => {
  pieceSelectionPlacePiece("knight", "white");
})
pieceSelect.whitePieces[2].addEventListener("click", () => {
  pieceSelectionPlacePiece("bishop", "white");
})
pieceSelect.whitePieces[3].addEventListener("click", () => {
  pieceSelectionPlacePiece("queen", "white");
})

pieceSelect.blackPieces[0].addEventListener("click", () => {
  pieceSelectionPlacePiece("rook", "black");
})
pieceSelect.blackPieces[1].addEventListener("click", () => {
  pieceSelectionPlacePiece("knight", "black");
})
pieceSelect.blackPieces[2].addEventListener("click", () => {
  pieceSelectionPlacePiece("bishop", "black");
})
pieceSelect.blackPieces[3].addEventListener("click", () => {
  pieceSelectionPlacePiece("queen", "black");
})


