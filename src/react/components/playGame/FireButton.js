import React from "react";
import { connect } from "react-redux";
import { fireTorpedo, startBoard, postWinner } from "../../../redux/index";
import { boards } from "../setUpBoard";
import { checkForWin } from "./checkForWin";

class FireButton extends React.Component {
  state = {
    hitAddress: [],
    missAddress: [],
    didPlayerSinkBattleship: false,
    didPlayerSinkCarrier: false,
    didPlayerSinkCruiser: false,
    didPlayerSinkSubmarine: false,
    didPlayerSinkDestroyer: false
  };

  opponentName = this.props.playerName === "playerA" ? "playerB" : "playerA";

  FireTorpedo = event => {
    if (this.props.TargetCell === null) {
    } else {
      this.props.fireTorpedo({
        text: this.props.gameNumber + " torpedo " + this.props.TargetCell
      });
      boards[this.opponentName][this.props.TargetCell].torpedo = true;

      if (checkForWin(boards[this.opponentName]) === true) {
        postWinner(this.props.playerName, {
          text: this.props.gameNumber + " win"
        });
      } else {
        if (!this.state.didPlayerSinkBattleship) {
          if (checkForWin(boards[this.opponentName]).includes("battleship")) {
            this.setState({ didPlayerSinkBattleship: true });
            alert("You sank your opponent's battleship!");
          }
        }
        if (!this.state.didPlayerSinkCarrier) {
          if (checkForWin(boards[this.opponentName]).includes("carrier")) {
            this.setState({ didPlayerSinkCarrier: true });
            alert("You sank your opponent's carrier!");
          }
        }
        if (!this.state.didPlayerSinkCruiser) {
          if (checkForWin(boards[this.opponentName]).includes("cruiser")) {
            this.setState({ didPlayerSinkCruiser: true });
            alert("You sank your opponent's cruiser!");
          }
        }
        if (!this.state.didPlayerSinkSubmarine) {
          if (checkForWin(boards[this.opponentName]).includes("submarine")) {
            this.setState({ didPlayerSinkSubmarine: true });
            alert("You sank your opponent's submarine!");
          }
        }
        if (!this.state.didPlayerSinkDestroyer) {
          if (checkForWin(boards[this.opponentName]).includes("destroyer")) {
            this.setState({ didPlayerSinkDestroyer: true });
            alert("You sank your opponent's destroyer!");
          }
        }
      }
    }
  };

  render() {
    return (
      <button
        className={"fireButton"}
        onClick={this.FireTorpedo}
        style={{ backgroundColor: "red", borderRadius: ".5em" }}
      >
        Fire Torpedo!
      </button>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerName: state.auth.login.result.username,
    TargetCell: state.play.addCoordinates.result
      ? state.play.addCoordinates.result
      : null,
    gameNumber: state.welcome.gameNumber.result,
    board: state.manipulateBoards.startBoard.result
  };
};

const mapDispatchToProps = {
  fireTorpedo,
  startBoard,
  postWinner
};

export default connect(mapStateToProps, mapDispatchToProps)(FireButton);
