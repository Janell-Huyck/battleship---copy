import React from "react";
import OpponentBoardSquare from "./OpponentBoardSquare";
import { connect } from "../../../HOCs";

class OpponentBoardGrid extends React.Component {
  state = {
    opponentName: ""
  };
  label = "";
  newRow = [];
  newBoard = [];
  rowLabels = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  targetRow = null;
  targetColumn = null;

  componentDidMount = () => {
    this.findOpponent();
  };

  drawSquare = label => {
    if (this.props.hitAddress.includes(label)) {
      return <OpponentBoardSquare value={label} key={label} image="Hit" />;
    } else if (this.props.missAddress.includes(label)) {
      return <OpponentBoardSquare value={label} key={label} image="Miss" />;
    } else {
      return <OpponentBoardSquare value={label} key={label} />;
    }
  };

  isItAHit = label => {
    if (this.props.theBoard[this.state.opponentName][label].ship) {
      return true;
    }
    return;
  };

  findOpponent = () => {
    if (this.props.playerName === "playerA") {
      this.setState({ opponentName: "playerB" });
    } else {
      this.setState({ opponentName: "playerA" });
    }
  };

  drawRow = (newRow, rowLabel) => {
    return <div key={rowLabel}>{newRow}</div>;
  };

  render() {
    this.newBoard = [];
    this.newRow = [];
    let newSquare = "";

    for (let headerRowLabels = 0; headerRowLabels <= 10; headerRowLabels++) {
      if (headerRowLabels === 0) {
        this.label = "X";
      } else {
        this.label = headerRowLabels;
      }
      newSquare = this.drawSquare(this.label);
      this.newRow.push(newSquare);
    }

    this.newBoard.push(this.drawRow(this.newRow, "header"));

    for (let row = 1; row <= 10; row++) {
      this.newRow = [];
      for (let column = 0; column <= 10; column++) {
        if (column === 0) {
          this.label = this.rowLabels[row];
        } else {
          this.label = this.rowLabels[row] + column.toString();
        }

        newSquare = this.drawSquare(this.label);
        this.newRow.push(newSquare);
      }
      this.newBoard.push(this.drawRow(this.newRow, row));
    }
    this.newBoard.className = "newBoard";

    return this.newBoard;
  }
}

const mapStateToProps = state => {
  return {
    torpedoMessage: state.play.addCoordinates.result
      ? state.play.addCoordinates.result
      : null,
    playerName: state.auth.login.result.username,
    theBoard: state.manipulateBoards.startBoard.result
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OpponentBoardGrid);
