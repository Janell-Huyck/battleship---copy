import React from "react";
import { connect } from "react-redux";
import { OpponentBoardGrid } from ".";
import { checkForLose } from "../checkForLose";
import { WaitScreen } from "../../waitScreen";
import {
  addCoordinates,
  fetchLastMessage,
  startBoard,
  winner,
  postWinner
} from "../../../../redux/index";
import { FireButton } from "../index";
import { WinLoseAnimation } from "../../winLoseAnimations";

class OpponentBoard extends React.Component {
  state = {
    opponentTurn: false,
    waitMessage: "Waiting for your opponent to take a turn...",
    TargetCell: "",
    opponentName: "",
    hitAddress: [],
    missAddress: [],
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
      this.checkOpponentTurn();
    }
  };

  componentWillUnmount = () => {
    clearInterval();
  };

  // startWaitingForOpponent = () => {};

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
        .slice(0, 2)
        .join(" ");
      if (messageGameNumber && this.props.gameNumber) {
        if (messageGameNumber === this.props.gameNumber) {
          if (result.payload.messages[0].text.includes("surrender")) {
            postWinner(this.props.playerName);
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
      this.checkOpponentTurn();
    }
  };

  checkThatNoTorpedoHasBeenFiredHere = gridSquare => {
    if (!this.props.board[this.state.opponentName][gridSquare]) {
      console.log(
        "error in checkThatNoTorpedoHasBeenFiredHere!  square to check is: " +
          this.props.board[this.state.opponentName][gridSquare]
      );
    }
    if (
      this.props.board[this.state.opponentName][gridSquare].torpedo === false
    ) {
      return true;
    }
    return false;
  };

  handleFireButtonClick = () => {
    if (this.state.TargetCell) {
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
    let sunkenShips = checkForLose(boards[this.props.playerName]);
    console.log("there are " + sunkenShips.length + " ships sunk so far.");
    if (sunkenShips.length === 5) {
      console.log("running winner(this.state.opponentName) now.");
      winner(this.state.opponentName);
    } else {
      if (!this.state.didOpponentSinkBattleship) {
        if (sunkenShips.includes("battleship")) {
          this.setState({ didOpponentSinkBattleship: true });
          alert("Your opponent sank your battleship!");
        }
      }
      if (!this.state.didOpponentSinkCarrier) {
        if (sunkenShips.includes("carrier")) {
          this.setState({ didOpponentSinkCarrier: true });
          alert("Your opponent sank your carrier!");
        }
      }
      if (!this.state.didOpponentSinkCruiser) {
        if (sunkenShips.includes("cruiser")) {
          this.setState({ didOpponentSinkCruiser: true });
          alert("Your opponent sank your cruiser!");
        }
      }
      if (!this.state.didOpponentSinkSubmarine) {
        if (sunkenShips.includes("submarine")) {
          this.setState({ didOpponentSinkSubmarine: true });
          alert("Your opponent sank your submarine!");
        }
      }
      if (!this.state.didOpponentSinkDestroyer) {
        if (sunkenShips.includes("destroyer")) {
          this.setState({ didOpponentSinkDestroyer: true });
          alert("Your opponent sank your destroyer!");
        }
      }
    }
  };

  render() {
    if (this.props.winner.result) {
      if (this.props.winner.result === this.props.playerName) {
        return <WinLoseAnimation message="You Win!" />;
      } else if (this.props.winner.result === this.state.opponentName) {
        return <WinLoseAnimation message="You Lose!" />;
      }
    }

    return (
      <React.Fragment>
        {this.state.opponentTurn && (
          <WaitScreen message={this.state.waitMessage} />
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
      winner: state.winner ? state.winner.result : null,

      playerName: state.auth.login.result.username,
      token: state.auth.login.result.token,

      torpedoMessage: state.play.fireTorpedo.result
        ? state.play.fireTorpedo.result.message
        : null,

      TargetCell: state.play.addCoordinates.result
        ? state.play.addCoordinates.result
        : null,

      board: state.manipulateBoards.startBoard.result,

      gameNumber: state.welcome.gameNumber.result
    };
  } else return {};
};

const mapDispatchToProps = {
  addCoordinates,
  fetchLastMessage,
  startBoard,
  winner,
  postWinner
};

export default connect(mapStateToProps, mapDispatchToProps)(OpponentBoard);
