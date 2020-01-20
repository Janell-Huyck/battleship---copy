import React from "react";
import "./PlayGame.css";
import {
  OpponentBoard,
  PlayerBoard,
  SurrenderButton
} from "../components/playGame";
import { connect } from "../HOCs";
import board from "../components/setUpBoard/whereDoTheShipsLive";
import { startBoard, getOldMessages } from "../../redux/index";

class PlayGame extends React.Component {
  componentDidMount = () => {
    this.findOpponentShipCoordinates();
  };

  findOpponentShipCoordinates = () => {
    let opponentName = this.determineOpponent();
    this.props
      .getOldMessages(opponentName)
      .then(result => {
        result.payload.messages.forEach(message => {
          if (
            !message.text.includes("ready") &&
            !message.text.includes("torpedo") &&
            !message.text.includes("start") &&
            message.text.includes(this.props.gameNumber)
          ) {
            let splitMessage = message.text.split(" ");
            let messageCoordinate = splitMessage[3];
            let messageShipName = splitMessage[2];
            board[opponentName][messageCoordinate].ship = messageShipName;
          }
        });
      })
      .then(this.props.startBoard(board));
    return true;
  };

  determineOpponent = () => {
    if (this.props.playerName === "playerA") {
      return "playerB";
    } else return "playerA";
  };

  render() {
    return (
      <React.Fragment>
        <div className="twoBoards">
          <PlayerBoard />
          <OpponentBoard />
        </div>
        <SurrenderButton />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    playerName: state.welcome.startGame.result
      ? state.welcome.startGame.result.message.username
      : null,
    gameNumber: state.welcome.startGame.result
      ? state.welcome.startGame.result.message.text.slice(5, 9)
      : null,
    reduxLayerBoard: state.manipulateBoards.startBoard.result
  };
};
const mapDispatchToProps = {
  getOldMessages,
  startBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
