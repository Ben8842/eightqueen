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
    };
  }

  resethome() {
    this.setState((state) => {
      return {
        showInfo: false,
        xCoor: null,
        yCoor: null,
        isChess: false,
        size: 0,
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
      size,
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
      return (
        <button
          id="squareSelected"
          codex={x}
          codey={y}
          onClick={() => this.invalidChoiceQ(run, rise, sizes, level)}
        >
          {numOfQueens}
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
      size,
      chessCodeLetter,
      chessCodeNumber,
      choicesX,
      choicesY,
      numOfQueens,
      iChoice,
      iChoiceQ,
    } = this.state;
    const viewSize = this.props.sizeValue;

    const elementS = [];
    const elementZ = [];

    var x;
    var y;

    var chessArray = ["a", "b", "c", "d", "e", "f", "g", "h"];

    for (y = 0; y < viewSize; y++) {
      for (x = 0; x < viewSize; x++) {
        elementS.push(<span>{this.renderSquare(x, viewSize - y - 1)}</span>);
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
      for (x = 0; x < viewSize; x++) {
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
      <span>
        You have chosen a location that conflicts with another Queen's path.
        This choice is not allowed to solve this Queen puzzle.{" "}
      </span>
    );

    const errorChoiceQ = (
      <span>
        You may not place a Queen on top of another Queen. This choice is not
        allowed to solve this Queen puzzle.{" "}
      </span>
    );

    const displayLocation = (
      <div class="column">
        <p>
          <span>{isChess ? moreDisplay : someDisplay}</span>
          <span>{iChoice ? errorChoice : null}</span>
          <span>{iChoiceQ ? errorChoiceQ : null}</span>( {xCoor} , {yCoor} )
        </p>
      </div>
    );

    const noneDisplay = (
      <div class="column">
        <p>Click on a square to add your Queens!</p>
      </div>
    );

    const gridDisplay = (
      <div class="column">
        {elementZ.map((value, index) => {
          return <span key={index}>{value}</span>;
        })}
        <div>Queens left = {numOfQueens}</div>
      </div>
    );

    return (
      <div id="entireThing">
        <button type="button" class="button" onClick={() => this.resethome()}>
          RESET Your Puzzle
        </button>
        <div class="row" id="info">
          {gridDisplay}

          {showInfo ? displayLocation : noneDisplay}
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
        Eight Queens Puzzle
        <form>
          <input type="number" class="button" id="sizeHere"></input>
          <button
            type="button"
            class="button"
            onClick={() => this.enterCount()}
          >
            ENTER
          </button>
          <button
            type="button"
            class="button"
            onClick={() => this.enterCount()}
          >
            Show Solutions
          </button>
        </form>
      </div>
    );
    return (
      <div>
        <div className="HeaderSpot">{inputBox}</div>
        <Building sizeValue={count} />
      </div>
    );
  }
}

export default App;
