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
  startBoard
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
    redirect: false
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

  //   findSegmentPositions = (length, startCoordinates) => {
  //     let targetRow = startCoordinates.slice(0, 1);
  //     let targetColumn = startCoordinates.slice(1);

  //     let positionArray = [];
  //     for (let shipSegment = 0; shipSegment < length; shipSegment++) {
  //       positionArray.push(targetRow + (targetColumn * 1 + shipSegment));
  //     }
  //     return positionArray;
  //   };

  placeShip = ship => {
    const postMessage = this.props.postMessage;
    const gameNumber = this.props.gameNumber;
    const playerName = this.props.playerName;
    const startBoard = this.props.startBoard;
    const placeBattleship = this.props.placeBattleship;
    const placeCarrier = this.props.placeCarrier;
    const placeCruiser = this.props.placeCruiser;
    const placeDestroyer = this.props.placeDestroyer;
    const placeSubmarine = this.props.placeSubmarine;
    console.log("game number is " + gameNumber);
    // may not be able to access "ship" on line 50 or 52
    for (let i = 0; i < ship.length; i++) {
      //   ship.startCoordinates.forEach(
      //   function(coordinate) {
      postMessage({
        text: `Game ${gameNumber} ${ship.name} ${ship.startCoordinates[i]}`
      });
      boards[playerName][ship.startCoordinates[i]].ship = ship.name;
      console.log("ship coordinates are " + ship.startCoordinates);
      startBoard(boards);
    }
    //   switch (ship) {
    //     case ship.name === "battleship":
    //       console.log("placing battleship positions");
    //       placeBattleship(ship.startCoordinates);
    //     case "carrier":
    //       placeCarrier(ship.startCoordinates);
    //     case "cruiser":
    //       placeCruiser(ship.startCoordinates);
    //     case "destroyer":
    //       placeDestroyer(ship.startCoordinates);
    //     case "submarine":
    //       placeSubmarine(ship.startCoordinates);
    //     default:
    //       alert("No ship selected");
  };
  //     });
  // );
  //   };

  defaultStart = () => {
    this.placeShip(this.state.battleship);
    this.placeShip(this.state.carrier);
    this.placeShip(this.state.cruiser);
    this.placeShip(this.state.destroyer);
    this.placeShip(this.state.submarine);
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
  startBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSetupButton);
