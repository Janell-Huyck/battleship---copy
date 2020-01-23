import React from "react";
import { connect } from "react-redux";

class RandomSetupButton extends React.Component {
  battleship = {
    name: "battleship",
    length: 4,
    orientation: "",
    coordinates: [],
    row: 0,
    column: 0
  };
  carrier = {
    name: "carrier",
    length: 5,
    orientation: "",
    coordinates: [],
    row: 0,
    column: 0
  };
  cruiser = {
    name: "cruiser",
    length: 3,
    orientation: "",
    coordinates: [],
    row: 0,
    column: 0
  };
  destroyer = {
    name: "destroyer",
    length: 2,
    orientation: "",
    coordinates: [],
    row: 0,
    column: 0
  };
  submarine = {
    name: "submarine",
    length: 3,
    orientation: "",
    coordinates: [],
    row: 0,
    column: 0
  };

  shipArray = [
    this.battleship,
    this.carrier,
    this.cruiser,
    this.destroyer,
    this.submarine
  ];

  componentWillUnmount = () => {
    //clear this.interval()  (check syntax)
  };

  clickHandler = () => {
    //for each ship:
    for (
      let whichShipInArray = 0;
      whichShipInArray < this.shipArray.length;
      whichShipInArray++
    ) {
      let shipToPlace = this.shipArray[whichShipInArray];
      this.generateCoordinates(shipToPlace);

      //if it is a legal move, set my redux state to reflect it
      //   (important so i don't overlap other ships)
    }

    //once all ships are placed, send the ship messages
    //send a "ready" message
    //start an interval and start checking for opponent ready
    //toggle the waiting screen
    //once the opponent has sent messages, redirect to the playgame screen
  };

  generateCoordinates = ship => {
    ship.coordinates = [];
    this.generateRandomStartCoordinate(ship);
    this.generateRandomStartOrientation(ship);
    if (this.checkCoordinatesAreOnBoard(ship) === true) {
      if (this.doCoordinatesOverlapOtherShips(ship) === false) {
        console.log(ship.name + ": " + ship.coordinates);
        return ship;
      }
    }
    //if it's not on the board or if it overlaps,
    //then generate another start coordinate and orientation.
    this.generateCoordinates(ship);
  };

  generateRandomStartCoordinate = ship => {
    ship.row = Math.floor(Math.random() * 10);
    ship.column = Math.floor(Math.random() * 10) + 1;
  };

  generateRandomStartOrientation = ship => {
    let randomOrientation = Math.floor(Math.random() * 2);
    if (randomOrientation === 1) {
      ship.orientation = "vertical";
    } else {
      ship.orientation = "horizontal";
    }
  };

  doCoordinatesOverlapOtherShips = ship => {
    //    check each coordinate against redux
    //       if it's != null,
    //          then a ship is already there.
    //
    console.log(
      "pretending to check against redux layer.  assuming no overlap"
    );
    return false;
  };

  checkCoordinatesAreOnBoard = ship => {
    let rowHeaders = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    console.log("ship name is " + ship.name);
    console.log("ship orientation is " + ship.orientation);
    console.log(
      "starting numbers are row " +
        rowHeaders[ship.row] +
        " column " +
        ship.column
    );
    for (
      let coordinateCounter = 0;
      coordinateCounter < ship.length;
      coordinateCounter++
    ) {
      if (ship.orientation === "horizontal") {
        if (ship.column + coordinateCounter <= 10) {
          ship.coordinates.push(
            rowHeaders[ship.row] + (ship.column + coordinateCounter)
          );
        } else {
          console.log("exceeded available columns.");
          return false;
        }
      } else {
        if (ship.row + coordinateCounter < 10) {
          ship.coordinates.push(
            rowHeaders[ship.row + coordinateCounter] + ship.column
          );
        } else {
          console.log("exceeded available rows.");
          return false;
        }
      }
    }
    return true;
  };

  render() {
    return (
      <button onClick={this.clickHandler}>
        Quick-Start (random placement)
      </button>
    );
  }
}

const mapStateToProps = state => {
  if (state.auth.login.result) {
    return {
      // playerName: state.auth.login.result.username,
      // token: state.auth.login.result.token,
      // torpedoMessage: state.play.fireTorpedo.result
      //   ? state.play.fireTorpedo.result.message
      //   : null,
      // TargetCell: state.play.addCoordinates.result
      //   ? state.play.addCoordinates.result
      //   : null,
      // board: state.manipulateBoards.startBoard.result,
      // gameNumber: state.welcome.startGame.result
      //   ? state.welcome.startGame.result.message.text.slice(5, 9)
      //   : undefined
    };
  } else return {};
};

const mapDispatchToProps = {
  // placeBattleship,
  // placeCarrier,
  // placeCruiser,
  // placeDestroyer,
  // placeSubmarine,
  // selectShip,
  // postMessage,
  // getOldMessages,
  // startBoard,
  // fetchLastMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(RandomSetupButton);
