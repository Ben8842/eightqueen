import React, { Component } from "react";
import "./App.css";

class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
      xCoor: null,
      yCoor: null,
      isChess: false,
      size: 0,
      chessCodeLetter: "",
      chessCodeNumber: "",
      choicesX: [],
      choicesY: [],
      numOfQueens: 8,
      conflict: false,
      solved8: false,
      iChoice: false,
      iChoiceQ: false,
      stepz: 0,
    };
  }

  resethome() {
    this.setState((state) => {
      return {
        showInfo: false,
        xCoor: null,
        yCoor: null,
        isChess: false,
        boardS: 0,
        chessCodeLetter: "",
        chessCodeNumber: "",
        choicesX: [],
        choicesY: [],
        numOfQueens: 0,
        conflict: false,
        solved8: false,
        gridStatus: [],
        iChoice: false,
        iChoiceQ: false,
      };
    });
  }

  showCode(x, y, sizes) {
    this.setState((state) => {
      if (sizes == 8) {
        var chessArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
        var chessX = chessArray[x];
        var chessY = y + 1;
        const holderX = [...state.choicesX, x];
        const holderY = [...state.choicesY, y];
        var newNum = 8 - state.choicesX.length - 1;

        return {
          showInfo: true,
          xCoor: x,
          yCoor: y,
          isChess: true,
          chessCodeLetter: chessX,
          chessCodeNumber: chessY,
          choicesX: holderX,
          choicesY: holderY,
          numOfQueens: newNum,
          iChoice: false,
          iChoiceQ: false,
        };
      } else {
        const holderX = [...state.choicesX, x];
        const holderY = [...state.choicesY, y];

        return {
          showInfo: true,
          xCoor: x,
          yCoor: y,
          isChess: false,
          choicesX: holderX,
          choicesY: holderY,
          iChoice: false,
          iChoiceQ: false,
        };
      }
    });
  }

  invalidChoice() {
    this.setState((state) => {
      return { iChoice: true };
    });
  }

  invalidChoiceQ() {
    this.setState((state) => {
      return { iChoiceQ: true };
    });
  }

  incrementQ() {
    this.setState((state) => {
      return { numOfQueens: state.numOfQueens + 1 };
    });
  }

  renderSquare(x, y) {
    var {
      showInfo,
      xCoor,
      yCoor,
      isChess,
      boardS,
      chessCodeLetter,
      chessCodeNumber,
      choicesX,
      choicesY,
      numOfQueens,
      solved8,
      conflict,
    } = this.state;
    var run = x;
    var rise = y;
    var sizes = this.props.sizeValue;
    var level = 0;

    var losecondition = 0;
    var z;
    for (z = 0; z < choicesX.length; z++) {
      if (choicesX[z] == x && choicesY[z] == y) {
        level = 1;
      } else if ((choicesX[z] == x) | (choicesY[z] == y)) {
        level = 2;
      } else if (
        Math.abs(choicesX[z] - x) == Math.abs(choicesY[z] - y) &&
        xCoor != null
      ) {
        level = 3;
      }
    }

    if (level == 0) {
      losecondition = losecondition + 1;

      return (
        <button
          id="square"
          codex={x}
          codey={y}
          onClick={() => this.showCode(run, rise, sizes, level)}
        >
          .
        </button>
      );
    } else if (level == 1) {
      // this.incrementQ();
      const valueQ = 8 - this.state.numOfQueens;
      return (
        <button
          id="squareSelected"
          codex={x}
          codey={y}
          onClick={() => this.invalidChoiceQ(run, rise, sizes, level)}
        >
          {valueQ}
        </button>
      );
    } else if (level == 2) {
      return (
        <button
          id="squarePath"
          codex={x}
          codey={y}
          onClick={() => this.invalidChoice(run, rise, sizes, level)}
        >
          P
        </button>
      );
    } else if (level == 3) {
      return (
        <button
          id="squareDiagonal"
          codex={x}
          codey={y}
          onClick={() => this.invalidChoice(run, rise, sizes, level)}
        >
          D
        </button>
      );
    }
  }
  nextExplanation() {
    this.setState((state) => {
      return { stepz: this.state.stepz + 1 };
    });
  }

  skipExplanation() {
    this.setState((state) => {
      return { stepz: 5 };
    });
  }

  prevExplanation() {
    this.setState((state) => {
      return { stepz: this.state.stepz - 1 };
    });
  }

  /*
    if (xCoor == x && yCoor == y) {
      return (
        <button
          id="squareSelected"
          codex={x}
          codey={y}
          onClick={() => this.showCode(run, rise, sizes)}
        >
          Q
        </button>
      );
    } else if ((xCoor == x) | (yCoor == y)) {
      return (
        <button
          id="squarePath"
          codex={x}
          codey={y}
          onClick={() => this.showCode(run, rise, sizes)}
        >
          P
        </button>
      );
    } else if (Math.abs(xCoor - x) == Math.abs(yCoor - y) && xCoor != null) {
      return (
        <button
          id="squareDiagonal"
          codex={x}
          codey={y}
          onClick={() => this.showCode(run, rise, sizes)}
        >
          D
        </button>
      );
    } else
      return (
        <button
          id="square"
          codex={x}
          codey={y}
          onClick={() => this.showCode(run, rise, sizes)}
        >
          .
        </button>
      );
  }*/

  render() {
    var {
      showInfo,
      xCoor,
      yCoor,
      isChess,
      boardS,
      chessCodeLetter,
      chessCodeNumber,
      choicesX,
      choicesY,
      numOfQueens,
      iChoice,
      iChoiceQ,
      stepz,
    } = this.state;
    const boardA = this.props.sizeValue;

    const elementS = [];
    const elementZ = [];

    var x;
    var y;

    var chessArray = ["a", "b", "c", "d", "e", "f", "g", "h"];

    for (y = 0; y < boardA; y++) {
      for (x = 0; x < boardA; x++) {
        elementS.push(<span>{this.renderSquare(x, boardA - y - 1)}</span>);
      }
      elementZ.push(
        <div className="newLine">
          <span>
            {elementS.map((value, index) => {
              return <span key={index}>{value}</span>;
            })}
          </span>
        </div>
      );
      for (x = 0; x < boardA; x++) {
        elementS.pop();
      }
    }

    const moreDisplay = (
      <div>
        {chessCodeLetter}
        {chessCodeNumber}
        <ol>
          {choicesX.map((value, index) => {
            return (
              <li key={index}>
                ( {value} , {choicesY[index]} ){" "}
              </li>
            );
          })}
        </ol>
      </div>
    );

    const someDisplay = (
      <div>
        <ol>
          {choicesX.map((value, index) => {
            return (
              <li key={index}>
                ( {value} , {choicesY[index]} )
              </li>
            );
          })}
        </ol>
      </div>
    );

    const errorChoice = (
      <span id="errorC">
        ! You have chosen a location that conflicts with another Queen's path.
        This choice is not allowed to solve this Queen puzzle. Please choose an
        empty square. !
      </span>
    );

    const errorChoiceQ = (
      <span id="errorC">
        ! You may not place a Queen on top of another Queen. This choice is not
        allowed to solve this Queen puzzle. Please choose an empty square. !
      </span>
    );

    const displayLocation = (
      <div class="column">
        <p>
          <span>{iChoice ? errorChoice : null}</span>
          <span>{iChoiceQ ? errorChoiceQ : null}</span>
          <span>{isChess ? moreDisplay : someDisplay}</span>( {xCoor} , {yCoor}{" "}
          )
        </p>
      </div>
    );

    const noneDisplay = (
      <div>
        <p id="explany">
          Click on an empty square to add your Queens! If you are able to find a
          way to add {boardA} queens, you win!
        </p>
      </div>
    );

    const winchecker = <span>Queens left = {numOfQueens}</span>;

    const winpuzzle = (
      <span>
        YOU WIN THE PUZZLE! Try Again!{" "}
        <button type="button" class="button" onClick={() => this.resethome()}>
          RESET Your Puzzle
        </button>
      </span>
    );

    const losepuzzle = (
      <span>
        YOU LOSE THE PUZZLE! Please Try Again.
        <button type="button" class="button" onClick={() => this.resethome()}>
          RESET Your Puzzle
        </button>
      </span>
    );

    const gridDisplay = (
      <div class="column">
        {elementZ.map((value, index) => {
          return <span key={index}>{value}</span>;
        })}

        <div>{numOfQueens !== 0 ? winchecker : winpuzzle}</div>
      </div>
    );

    const explanationZero = (
      <p id="explanation">
        <p id="explany">
          <button id="largebutton" onClick={() => this.prevExplanation()}>
            Previous
          </button>
          <button id="largebutton" onClick={() => this.nextExplanation()}>
            Next
          </button>
          <button id="largebutton" onClick={() => this.skipExplanation()}>
            Skip
          </button>
          <p>Welcome to Eight Queens Puzzle!</p>
          <p id="explany">
            THE CHALLENGE: Can you place EIGHT chess queens on an 8X8 chessboard
            so that no two queens threaten each other?{" "}
            <p id="explany">
              THE HISTORY: The 'eight queens puzzle" was published in 1848 by
              Max Bezzel and solved by Franz Nauck. Many mathematicians,
              including Carl Friedrich Gauss have worked on the puzzle and its
              expanded versions.
            </p>
          </p>
          There are billions of possible arrangements of eight queens on an 8X8
          board, making 'brute-force' computational techniques expensive.
        </p>
      </p>
    );

    const explanationOne = (
      <p id="explanation">
        <button id="largebutton" onClick={() => this.prevExplanation()}>
          Previous
        </button>
        <button id="largebutton" onClick={() => this.nextExplanation()}>
          Next
        </button>
        <button id="largebutton" onClick={() => this.skipExplanation()}>
          Skip
        </button>
        <p id="explany">
          My application gives you a chance to solve the 'Eight Queens' solution
          for yourself. I programed the chessboard to highlight all squares that
          your queen placement threatens. This should give you a great advantage
          as now you can easily visually spot eligible squares where you can
          place new queens. Simply search for 'unhighlighted' elgiible squares
          and make a placement.
        </p>
      </p>
    );

    const explanationTwo = (
      <p id="explanation">
        <button id="largebutton" onClick={() => this.prevExplanation()}>
          Previous
        </button>
        <button id="largebutton" onClick={() => this.nextExplanation()}>
          Next
        </button>
        <button id="largebutton" onClick={() => this.skipExplanation()}>
          Skip
        </button>
        <p id="explany">
          If you are able to fit eight queens on this board, you win the puzzle!
          <p id="explany">
            I wish you so much luck. There are 92 distinct solutions to the
            puzzle.
          </p>
          <p></p>
        </p>
      </p>
    );

    const explanationThree = (
      <p id="explanation">
        <button id="largebutton" onClick={() => this.prevExplanation()}>
          Previous
        </button>
        <button id="largebutton" onClick={() => this.nextExplanation()}>
          Next
        </button>
        <button id="largebutton" onClick={() => this.skipExplanation()}>
          Skip
        </button>
        <p id="imgcenter">
          {" "}
          <p id="explany">
            If you are able to solve the eight queens puzzle, my application
            gives you a chance to try the expanded version. Set the board size
            to 9 and you can try the nine queens puzzle where you attempt to
            place 9 queens on a 9X9 board.
          </p>
        </p>
      </p>
    );

    const explanationFour = (
      <p id="explanation">
        <button id="largebutton" onClick={() => this.prevExplanation()}>
          Previous
        </button>
        <button id="largebutton" onClick={() => this.nextExplanation()}>
          Next
        </button>
        <button id="largebutton" onClick={() => this.skipExplanation()}>
          Skip
        </button>
        <p id="explany">
          Expanding the board is easy, and you can jump as high as you dare. Do
          you dare try to solve the 25 queens puzzle on the 25x25 board?
        </p>
        <p id="explany">
          Note that as the board gets larger, the number of solution will
          actually also increase. For example while the eight queens puzzle has
          92 distinct solutions, the 10 queen puzzle has 724.{" "}
        </p>
      </p>
    );

    return (
      <div id="entireThing">
        <div>
          <button type="button" class="button" onClick={() => this.resethome()}>
            RESET Puzzle
          </button>
        </div>
        <div id="info">
          {stepz == 0 ? explanationZero : null}
          {stepz == 1 ? explanationOne : null}
          {stepz == 2 ? explanationTwo : null}
          {stepz == 3 ? explanationThree : null}
          {stepz == 4 ? explanationFour : null}
          {stepz == 5 ? gridDisplay : null}
          {showInfo && stepz == 5 ? displayLocation : noneDisplay}
        </div>
        <div></div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 8,
    };
  }
  enterCount() {
    var zvalue = document.getElementById("sizeHere").value;

    this.setState((state) => {
      return { count: zvalue, xCoor: null, yCoor: null };
    });
  }

  render() {
    var { count } = this.state;

    const inputBox = (
      <div>
        Choose the size of your chess board
        <form>
          <input type="number" class="button" id="sizeHere"></input>
          <button
            type="button"
            class="button"
            onClick={() => this.enterCount()}
          >
            ENTER
          </button>
        </form>
      </div>
    );
    return (
      <div>
        <p class="toptitle">Eight Queens Puzzle</p>

        <Building sizeValue={count} />
        <div className="HeaderSpot">{inputBox}</div>
      </div>
    );
  }
}

export default App;
