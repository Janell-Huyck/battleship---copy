import React from "react";
import { Redirect } from "../../components";

import { connect } from "react-redux";
import {
  placeBattleship,
  placeCarrier,
  placeCruiser,
  placeDestroyer,
  placeSubmarine,
  selectShip,
  postMessage,
  getOldMessages,
  startBoard,
  fetchLastMessage
} from "../../../redux/index";
import { boards } from "../setUpBoard";

class DefaultSetupButton extends React.Component {
  state = {
    battleship: {
      name: "battleship",
      length: 4,
      startCoordinates: ["A1", "A2", "A3", "A4"]
    },
    carrier: {
      name: "carrier",
      length: 5,
      startCoordinates: ["B1", "B2", "B3", "B4", "B5"]
    },
    cruiser: {
      name: "cruiser",
      length: 3,
      startCoordinates: ["C1", "C2", "C3"]
    },
    destroyer: {
      name: "destroyer",
      length: 3,
      startCoordinates: ["D1", "D2", "D3"]
    },
    submarine: {
      name: "submarine",
      length: 2,
      startCoordinates: ["E1", "E2"]
    },
    opponentName: "",
    redirect: false,
    playerReady: false
  };

  componentDidMount = () => {
    this.determineOpponentName();
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  determineOpponentName = () => {
    if (this.props.playerName === "playerA") {
      this.setState({ opponentName: "playerB" });
    } else if (this.props.playerName === "playerB") {
      this.setState({ opponentName: "playerA" });
    }
  };

  placeShip = ship => {
    const postMessage = this.props.postMessage;
    const gameNumber = this.props.gameNumber;
    const playerName = this.props.playerName;
    const startBoard = this.props.startBoard;
    const shipToPlace = ship.name;
    const shipCoordinates = ship.startCoordinates;
    const placeBattleship = this.props.placeBattleship;
    const placeCarrier = this.props.placeCarrier;
    const placeCruiser = this.props.placeCruiser;
    const placeDestroyer = this.props.placeDestroyer;
    const placeSubmarine = this.props.placeSubmarine;
    console.log("game number is " + gameNumber);

    //post the messages on API for each coordinate
    for (let i = 0; i < ship.length; i++) {
      postMessage({
        text: `Game ${gameNumber} ${ship.name} ${ship.startCoordinates[i]}`
      });
      boards[playerName][ship.startCoordinates[i]].ship = ship.name;
      console.log("ship coordinates are " + ship.startCoordinates);
      startBoard(boards);
    }

    //set the redux layer for your ships on your playerboard
    switch (shipToPlace) {
      case "battleship":
        placeBattleship(shipCoordinates);
        break;
      case "carrier":
        placeCarrier(shipCoordinates);
        break;
      case "cruiser":
        placeCruiser(shipCoordinates);
        break;
      case "destroyer":
        placeDestroyer(shipCoordinates);
        break;
      case "submarine":
        placeSubmarine(shipCoordinates);
        break;
      default:
        alert("No ship selected");
    }
  };

  defaultStart = () => {
    this.placeShip(this.state.battleship);
    this.placeShip(this.state.carrier);
    this.placeShip(this.state.cruiser);
    this.placeShip(this.state.destroyer);
    this.placeShip(this.state.submarine);
    this.setState({ playerReady: true });
    this.props.postMessage({ text: `Game ${this.props.gameNumber} ready` });
    this.startCheckingForOpponentReady();
  };

  startCheckingForOpponentReady = () => {
    this.interval = setInterval(() => {
      if (this.checkReadyPlay()) {
        this.redirectToPlayGame();
      }
    }, 2000);
  };

  checkReadyPlay = () => {
    this.props.getOldMessages(this.state.opponentName).then(result => {
      result.payload.messages.map(message => {
        console.log("game number is " + this.props.gameNumber);
        return (
          message.text.includes("ready") &&
          message.text.includes(this.props.gameNumber)
        );
      });
    });
  };

  redirectToPlayGame = () => {
    this.props.getOldMessages(this.state.opponentName);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/play" />;
    }
    return (
      <React.Fragment>
        <h3>
          Click here to place all ships at the top left (default testing
          position) and start game{" "}
        </h3>
        <button onClick={this.defaultStart}>Default Start</button>
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

const mapDispatchToProps = {
  placeBattleship,
  placeCarrier,
  placeCruiser,
  placeDestroyer,
  placeSubmarine,
  selectShip,
  postMessage,
  getOldMessages,
  startBoard,
  fetchLastMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSetupButton);
