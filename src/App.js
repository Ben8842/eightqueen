import React, { Component } from "react";
import "./App.css";

class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
      xCoor: 0,
      yCoor: 0,
      isChess: false,
      size: 0,
      chessCodeLetter: "",
      chessCodeNumber: "",
    };
  }

  showCode(x, y, sizes) {
    this.setState((state) => {
      if (sizes == 8) {
        var chessArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
        var chessX = chessArray[x];
        var chessY = y + 1;

        return {
          showInfo: true,
          xCoor: x,
          yCoor: y,
          isChess: true,
          chessCodeLetter: chessX,
          chessCodeNumber: chessY,
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
    } = this.state;
    var run = x;
    var rise = y;
    var sizes = this.props.sizeValue;

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
    } else if (Math.abs(xCoor - x) == Math.abs(yCoor - y)) {
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
  }

  render() {
    var {
      showInfo,
      xCoor,
      yCoor,
      isChess,
      size,
      chessCodeLetter,
      chessCodeNumber,
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
      </div>
    );

    const displayLocation = (
      <div>
        <p>
          <span>{isChess ? moreDisplay : null}</span>( {xCoor} , {yCoor} )
        </p>
      </div>
    );

    const noneDisplay = (
      <div>
        <p>Click on a square for more info</p>
      </div>
    );

    return (
      <div id="entireThing">
        <div id="info">{showInfo ? displayLocation : noneDisplay}</div>
        <div>
          <span>
            {elementZ.map((value, index) => {
              return <span key={index}>{value}</span>;
            })}
          </span>
        </div>
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
