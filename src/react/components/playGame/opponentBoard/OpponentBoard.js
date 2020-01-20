import React from "react";
import { connect } from "react-redux";
import { OpponentBoardGrid } from ".";
import { checkForLose } from "../checkForLose";
import { WaitScreen } from "../../waitScreen";
import {
  addCoordinates,
  fetchLastMessage,
  startBoard
} from "../../../../redux/index";
import { FireButton } from "../index";

class OpponentBoard extends React.Component {
  state = {
    opponentTurn: false,
    waitMessage: "Waiting for your opponent to take a turn...",
    winMessage: "Congratulations!  You won!  Your opponent has surrendered.",
    TargetCell: "",
    opponentName: "",
    playerHasWon: false,
    hitAddress: [],
    missAddress: [],
    didOpponentWin: false,
    didOpponentAcknowledgeWin: false,
    didOpponentSinkBattleship: false,
    didOpponentSinkCarrier: false,
    didOpponentSinkCruiser: false,
    didOpponentSinkSubmarine: false,
    didOpponentSinkDestroyer: false
  };

  componentDidMount = () => {
    this.determineOpponentName();
    this.determineFirstMove();
    setInterval(this.checkOpponentTurn, 5000);
  };

  determineOpponentName = () => {
    if (this.props.playerName === "playerA") {
      this.setState({ opponentName: "playerB" });
    } else {
      this.setState({ opponentName: "playerA" });
    }
  };

  determineFirstMove = () => {
    if (this.props.playerName === "playerB") {
      this.setState({ opponentTurn: true });
      this.startWaitingForOpponent();
    }
  };

  componentWillUnmount = () => {
    clearInterval();
  };

  startWaitingForOpponent = () => {};

  checkOpponentTurn = () => {
    if (this.state.opponentTurn === false) {
      return;
    }
    this.props.fetchLastMessage(this.state.opponentName).then(result => {
      let opponentTorpedoCoordinates = result.payload.messages[0].text
        .split(" ")
        .slice(-1);
      let messageGameNumber = result.payload.messages[0].text
        .split(" ")
        .slice(1, 2);
      if (messageGameNumber && this.props.gameNumber) {
        if (messageGameNumber.toString() === this.props.gameNumber.toString()) {
          if (result.payload.messages[0].text.includes("surrender")) {
            this.setState({ playerHasWon: true });
          }
          if (result.payload.messages[0].text.includes("torpedo")) {
            let torpedoStatus = this.props.board[this.props.playerName][
              opponentTorpedoCoordinates
            ].torpedo;
            if (torpedoStatus === false) {
              this.props.board[this.props.playerName][
                opponentTorpedoCoordinates
              ].torpedo = true;
              this.props.startBoard(this.props.board);
              this.checkForPlayerLoss(this.props.board);

              this.toggleTurn();
            }
          }
        }
      }
    });
  };

  toggleTurn = () => {
    if (this.state.opponentTurn === true) {
      this.setState({ opponentTurn: false });
    } else {
      this.setState({ opponentTurn: true });
    }
  };

  clickHandler = event => {
    if (this.checkThatNoTorpedoHasBeenFiredHere(event.target.innerHTML)) {
      this.setState({ TargetCell: event.target.innerHTML });
      this.props.addCoordinates(event.target.innerHTML);
      this.startWaitingForOpponent();
    }
  };

  checkThatNoTorpedoHasBeenFiredHere = gridSquare => {
    if (
      this.props.board[this.state.opponentName][gridSquare].torpedo === false
    ) {
      return true;
    }
    return false;
  };

  handleFireButtonClick = () => {
    if (this.state.TargetCell) {
      console.log("we have a target cell " + this.state.TargetCell);
      this.checkStateForHitMarkers(this.props.TargetCell);
      this.setState({ opponentTurn: true, TargetCell: "" });
    } else {
      alert("Please select a torpedo destination before hitting 'Fire' ");
    }
  };

  checkStateForHitMarkers(cellToCheck) {
    if (this.props.board[this.state.opponentName][cellToCheck].ship === null) {
      alert("Miss");
      this.returnDecision("Miss", cellToCheck);
    } else {
      alert("HIT!");
      this.returnDecision("Hit", cellToCheck);
    }
  }

  returnDecision = (msg, cellToCheck) => {
    if (msg === "Hit") {
      this.setState({
        hitAddress: this.state.hitAddress.concat(cellToCheck)
      });
    } else {
      this.setState({
        missAddress: this.state.missAddress.concat(cellToCheck)
      });
    }
  };

  checkForPlayerLoss = boards => {
    if (checkForLose(boards[this.props.playerName]) === true) {
      this.setState({ didPlayerLose: true });
    } else {
      if (!this.state.didOpponentSinkBattleship) {
        if (
          checkForLose(boards[this.props.playerName]).includes("battleship")
        ) {
          this.setState({ didOpponentSinkBattleship: true });
          alert("Your opponent sank your battleship!");
        }
      }
      if (!this.state.didOpponentSinkCarrier) {
        if (checkForLose(boards[this.props.playerName]).includes("carrier")) {
          this.setState({ didOpponentSinkCarrier: true });
          alert("Your opponent sank your carrier!");
        }
      }
      if (!this.state.didOpponentSinkCruiser) {
        if (checkForLose(boards[this.props.playerName]).includes("cruiser")) {
          this.setState({ didOpponentSinkCruiser: true });
          alert("Your opponent sank your cruiser!");
        }
      }
      if (!this.state.didOpponentSinkSubmarine) {
        if (checkForLose(boards[this.props.playerName]).includes("submarine")) {
          this.setState({ didOpponentSinkSubmarine: true });
          alert("Your opponent sank your submarine!");
        }
      }
      if (!this.state.didOpponentSinkDestroyer) {
        if (checkForLose(boards[this.props.playerName]).includes("destroyer")) {
          this.setState({ didOpponentSinkDestroyer: true });
          alert("Your opponent sank your destroyer!");
        }
      }
    }
  };

  render() {
    if (this.state.didPlayerLose) {
      return (
        <WaitScreen message="Your opponent destroyed your fleet! You lose!">
          true
        </WaitScreen>
      );
    }
    return (
      <React.Fragment>
        {this.state.opponentTurn && (
          <WaitScreen message={this.state.waitMessage} />
        )}
        {this.state.playerHasWon && (
          <WaitScreen message={this.state.winMessage} />
        )}
        <div className={"opponentBoard"}>
          <h3>Opponent Board</h3>
          <div className="newBoard" onClick={this.clickHandler}>
            <OpponentBoardGrid
              hitAddress={this.state.hitAddress}
              missAddress={this.state.missAddress}
            />
          </div>
          <div onClick={this.handleFireButtonClick}>
            <FireButton returnDecision={this.returnDecision} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  if (state.auth.login.result) {
    return {
      playerName: state.auth.login.result.username,
      token: state.auth.login.result.token,

      torpedoMessage: state.play.fireTorpedo.result
        ? state.play.fireTorpedo.result.message
        : null,

      TargetCell: state.play.addCoordinates.result
        ? state.play.addCoordinates.result
        : null,

      board: state.manipulateBoards.startBoard.result,

      gameNumber: state.welcome.startGame.result
        ? state.welcome.startGame.result.message.text.slice(5, 9)
        : undefined
    };
  } else return {};
};

const mapDispatchToProps = { addCoordinates, fetchLastMessage, startBoard };

export default connect(mapStateToProps, mapDispatchToProps)(OpponentBoard);
