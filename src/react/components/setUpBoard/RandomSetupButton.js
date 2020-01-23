import React from "react";
import { connect } from "react-redux";
import {
  placeBattleship,
  placeCarrier,
  placeCruiser,
  placeDestroyer,
  placeSubmarine,
  startBoard
} from "../../../redux/index";
import { boards } from "."; //the big long array of possible locations
import { blankBoardForRedux } from ".";

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
    this.resetReduxBoard();
    //for each ship:
    for (
      let whichShipInArray = 0;
      whichShipInArray < this.shipArray.length;
      whichShipInArray++
    ) {
      let shipToPlace = this.shipArray[whichShipInArray];
      shipToPlace.orientation = "";
      shipToPlace.coordinates = [];
      this.generateCoordinates(shipToPlace);
      this.placeShipInRedux(shipToPlace); //place in redux with new coordinates.
    }
  };
  resetReduxBoard = () => {
    for (let [key, value] of Object.entries(boards.playerA)) {
      value.ship = null;
    }
    for (let [key, value] of Object.entries(boards.playerB)) {
      value.ship = null;
    }
    this.props.startBoard(boards);
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
    for (
      let coordinateChecked = 0;
      coordinateChecked < ship.length;
      coordinateChecked++
    ) {
      let reduxSquare = this.props.board[this.props.playerName][
        ship.coordinates[coordinateChecked]
      ].ship;
      console.log(reduxSquare);

      if (reduxSquare !== null) {
        console.log("found a ship at " + ship.coordinates[coordinateChecked]);
        return true;
      }
    }
    console.log("no overlap found");
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

  placeShipInRedux = ship => {
    const startBoard = this.props.startBoard;
    const shipName = ship.name;
    const playerName = this.props.playerName;
    const position = {
      orientation: ship.orientation,
      coordinates: ship.coordinates
    };

    //place the ships in the actual redux layer
    for (
      let coordinateToPlace = 0;
      coordinateToPlace < ship.coordinates.length;
      coordinateToPlace++
    ) {
      let coordinate = ship.coordinates[coordinateToPlace];
      boards[playerName][coordinate].ship = shipName;
    }
    startBoard(boards);

    //place the active ship status for <availableShips> to function until it's reworked
    switch (ship.name) {
      case "battleship":
        this.props.placeBattleship(position);

        break;
      case "carrier":
        this.props.placeCarrier(position);
        break;
      case "cruiser":
        this.props.placeCruiser(position);
        break;
      case "destroyer":
        this.props.placeDestroyer(position);
        break;
      case "submarine":
        this.props.placeSubmarine(position);
        break;
      default:
        console.log("we goofed up - i cannot place this ship in redux");
    }
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
      playerName: state.auth.login.result.username,
      board: state.manipulateBoards.startBoard.result,
      battleshipPosition: state.setUpGame.placeBattleship.result
    };
  } else return {};
};

const mapDispatchToProps = {
  placeBattleship,
  placeCarrier,
  placeCruiser,
  placeDestroyer,
  placeSubmarine,
  startBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(RandomSetupButton);
