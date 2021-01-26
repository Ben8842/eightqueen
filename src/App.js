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
    };
  }

  showCode(x, y, sizes) {
    this.setState((state) => {
      if (sizes == 8) {
        var chessArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
        var chessX = chessArray[x];
        var chessY = y + 1;
        const holderX = [...state.choicesX, x];
        const holderY = [...state.choicesY, y];

        return {
          showInfo: true,
          xCoor: x,
          yCoor: y,
          isChess: true,
          chessCodeLetter: chessX,
          chessCodeNumber: chessY,
          choicesX: holderX,
          choicesY: holderY,
        };
      } else {
        return { showInfo: true, xCoor: x, yCoor: y, isChess: false };
      }
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
    } = this.state;
    var run = x;
    var rise = y;
    var sizes = this.props.sizeValue;
    var level = 0;
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
    } else if (level == 1) {
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
    } else if (level == 2) {
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
    } else if (level == 3) {
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

    const displayLocation = (
      <div class="column">
        <p>
          <span>{isChess ? moreDisplay : null}</span>( {xCoor} , {yCoor} )
        </p>
      </div>
    );

    const noneDisplay = (
      <div class="column">
        <p>Click on a square for more info</p>
      </div>
    );

    return (
      <div id="entireThing">
        <div class="row" id="info">
          <div class="column">
            {elementZ.map((value, index) => {
              return <span key={index}>{value}</span>;
            })}
          </div>
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
      count: 0,
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
