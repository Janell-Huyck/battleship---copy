import React from "react";
import { connect, withAsyncAction } from "../../HOCs";
import { Redirect } from "../index";
import {
  fetchLastMessage,
  getOldMessages,
  startBoard
} from "../../../redux/index";
import { WaitScreen } from "../waitScreen";
import { boards } from ".";

class ReadyButton extends React.Component {
  state = {
    redirect: false,
    opponentName: "",
    playerReady: false,
    message: "Waiting for your opponent to finish placing ships..."
  };

  componentDidMount = () => {
    this.determineOpponentName();
  };

  determineOpponentName = () => {
    if (this.props.playerName === "playerA") {
      this.setState({ opponentName: "playerB" });
    } else if (this.props.playerName === "playerB") {
      this.setState({ opponentName: "playerA" });
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  verifyAllShipsPlaced = () => {
    const ships = [
      this.props.battleship,
      this.props.carrier,
      this.props.cruiser,
      this.props.destroyer,
      this.props.submarine
    ];
    if (ships.includes(null)) {
      alert("Please place all your ships on the board!");
      return false;
    } else {
      this.postMessagesOfBattleShipLocation();
      this.postMessagesOfCarrierLocation();
      this.postMessagesOfCruiserLocation();
      this.postMessagesOfDestroyerLocation();
      this.postMessagesOfSubmarineLocation();
      return true;
    }
  };
  postMessagesOfBattleShipLocation = () => {
    const postMessage = this.props.postMessage;
    const startBoard = this.props.startBoard;
    const battleshipCoordinates = this.props.battleship.coordinates;
    const gameNumber = this.props.gameNumber;
    const playerName = this.props.playerName;
    battleshipCoordinates.forEach(function(coordinate) {
      postMessage({
        text: `Game ${gameNumber} battleship ${coordinate}`
      });
      boards[playerName][coordinate].ship = "battleship";
      startBoard(boards);
    });
  };

  postMessagesOfCarrierLocation = () => {
    const postMessage = this.props.postMessage;
    const carrierCoordinates = this.props.carrier.coordinates;
    const gameNumber = this.props.gameNumber;
    const playerName = this.props.playerName;
    carrierCoordinates.forEach(function(coordinate) {
      postMessage({
        text: `Game ${gameNumber} carrier ${coordinate}`
      });
      boards[playerName][coordinate].ship = "carrier";
      startBoard(boards);
    });
  };
  postMessagesOfCruiserLocation = () => {
    const postMessage = this.props.postMessage;
    const cruiserCoordinates = this.props.cruiser.coordinates;
    const gameNumber = this.props.gameNumber;
    const playerName = this.props.playerName;
    cruiserCoordinates.forEach(function(coordinate) {
      postMessage({
        text: `Game ${gameNumber} cruiser ${coordinate}`
      });
      boards[playerName][coordinate].ship = "cruiser";
      startBoard(boards);
    });
  };
  postMessagesOfDestroyerLocation = () => {
    const postMessage = this.props.postMessage;
    const destroyerCoordinates = this.props.destroyer.coordinates;
    const gameNumber = this.props.gameNumber;
    const playerName = this.props.playerName;
    destroyerCoordinates.forEach(function(coordinate) {
      postMessage({
        text: `Game ${gameNumber} destroyer ${coordinate}`
      });
      boards[playerName][coordinate].ship = "destroyer";
      startBoard(boards);
    });
  };
  postMessagesOfSubmarineLocation = () => {
    const postMessage = this.props.postMessage;
    const submarineCoordinates = this.props.submarine.coordinates;
    const gameNumber = this.props.gameNumber;
    const playerName = this.props.playerName;
    submarineCoordinates.forEach(function(coordinate) {
      postMessage({
        text: `Game ${gameNumber} submarine ${coordinate}`
      });
      boards[playerName][coordinate].ship = "submarine";
      startBoard(boards);
    });
  };

  startCheckingForOpponentReady = () => {
    this.interval = setInterval(() => {
      this.checkReadyPlay();
    }, 2000);
  };

  checkReadyPlay = () => {
    this.props.fetchLastMessage(this.state.opponentName).then(result => {
      result.payload.messages.map(message => {
        if (!message.text.includes("start")) {
          return this.redirectToPlayGame();
        } else return false;
      });
    });
  };

  redirectToPlayGame = () => {
    this.props.getOldMessages(this.state.opponentName);
    this.setState({ redirect: true });
  };

  handleClick = () => {
    if (this.verifyAllShipsPlaced() === false) {
      return;
    }
    this.setState({ playerReady: true });
    this.props.postMessage({ text: `Game ${this.props.gameNumber} ready` });
    this.startCheckingForOpponentReady();
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/play" />;
    }
    return (
      <React.Fragment>
        {this.state.playerReady && <WaitScreen message={this.state.message} />}
        <button onClick={this.handleClick}>Ready!</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    battleship: state.setUpGame.placeBattleship.result,
    carrier: state.setUpGame.placeCarrier.result,
    cruiser: state.setUpGame.placeCruiser.result,
    destroyer: state.setUpGame.placeDestroyer.result,
    submarine: state.setUpGame.placeSubmarine.result,
    playerName: state.auth.login.result.username,
    gameNumber: state.welcome.startGame.result
      ? state.welcome.startGame.result.message.text.slice(5, 9)
      : undefined
  };
};
const mapDispatchToProps = {
  fetchLastMessage,
  getOldMessages,
  startBoard
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAsyncAction("messages", "postMessage")(ReadyButton));
