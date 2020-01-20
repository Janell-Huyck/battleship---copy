import React from "react";
import InitialBoardSquare from "./InitialBoardSquare";
import { connect } from "../../../HOCs";

import {
  placeBattleship,
  placeCarrier,
  placeCruiser,
  placeDestroyer,
  placeSubmarine,
  selectShip
} from "../../../../redux/index";

class InitialBoardGrid extends React.Component {
  state = {
    playerName: this.props.playerName
  };

  label = "";
  newRow = [];
  newBoard = [];
  rowLabels = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  targetRow = null;
  targetColumn = null;

  componentDidMount = () => {
    console.log(this.state.playerName);
  };

  drawSquare = (label, isShip, isHeader) => {
    return (
      <InitialBoardSquare
        value={label}
        isShip={isShip}
        onClick={this.handleClick}
        key={label}
      />
    );
  };

  checkForHeader = e => {
    if (e.target.innerHTML.length === 1) {
    }
  };

  drawRow = (newRow, rowLabel) => {
    return <div key={rowLabel}>{newRow}</div>;
  };

  doesAShipResideHereAndIfSoWhichOne = coordinates => {
    if (this.props.battleshipPosition !== null) {
      if (this.props.battleshipPosition.coordinates.includes(coordinates)) {
        return true;
      }
    }

    if (this.props.carrierPosition !== null) {
      if (this.props.carrierPosition.coordinates.includes(coordinates)) {
        return true;
      }
    }

    if (this.props.cruiserPosition !== null) {
      if (this.props.cruiserPosition.coordinates.includes(coordinates)) {
        return true;
      }
    }

    if (this.props.carrierPosition !== null) {
      if (this.props.carrierPosition.coordinates.includes(coordinates)) {
        return true;
      }
    }

    if (this.props.destroyerPosition !== null) {
      if (this.props.destroyerPosition.coordinates.includes(coordinates)) {
        return true;
      }
    }

    if (this.props.submarinePosition !== null) {
      if (this.props.submarinePosition.coordinates.includes(coordinates)) {
        return true;
      }
    }
    return false;
  };

  handleClick = e => {
    this.targetRow = e.target.innerHTML.slice(0, 1);
    this.targetColumn = e.target.innerHTML.slice(1);
    if (this.targetColumn === "" || this.targetColumn === "0") {
      return;
    }
    if (this.props.activeShip === null) {
    } else {
      this.placeShip(this.props.activeShip.name);
    }
  };

  placeShip = () => {
    const position = this.findSegmentPositions(
      this.props.activeShip.length,
      this.props.activeShip.orientation
    );
    if (position === null) {
      return null;
    }
    switch (this.props.activeShip.name) {
      case "battleship":
        this.props.placeBattleship(position);

        this.props.selectShip(null);
        break;
      case "carrier":
        this.props.placeCarrier(position);
        this.props.selectShip(null);
        break;
      case "cruiser":
        this.props.placeCruiser(position);
        this.props.selectShip(null);
        break;
      case "destroyer":
        this.props.placeDestroyer(position);
        this.props.selectShip(null);
        break;
      case "submarine":
        this.props.placeSubmarine(position);
        this.props.selectShip(null);
        break;
      default:
        alert("No ship selected");
    }
  };

  findSegmentPositions = (length, orientation) => {
    let positionArray = [];
    let positionObject = {
      orientation: orientation,
      coordinates: positionArray
    };
    if (orientation === "horizontal") {
      for (let shipSegment = 0; shipSegment < length; shipSegment++) {
        if (
          this.targetColumn * 1 + shipSegment > 10 ||
          this.doesAShipResideHereAndIfSoWhichOne(
            this.targetRow + (this.targetColumn * 1 + shipSegment)
          )
        ) {
          return null;
        }
        positionArray.push(
          this.targetRow + (this.targetColumn * 1 + shipSegment)
        );
      }
    } else {
      let rowIndex = this.rowLabels.indexOf(this.targetRow);
      for (let shipSegment = 0; shipSegment < length; shipSegment++) {
        if (
          rowIndex + shipSegment > 10 ||
          this.doesAShipResideHereAndIfSoWhichOne(
            this.rowLabels[rowIndex + shipSegment] + this.targetColumn
          )
        ) {
          return null;
        }
        positionArray.push(
          this.rowLabels[rowIndex + shipSegment] + this.targetColumn
        );
      }
    }
    return positionObject;
  };

  render() {
    this.newBoard = [];
    this.newRow = [];

    for (let headerRowLabels = 0; headerRowLabels <= 10; headerRowLabels++) {
      if (headerRowLabels === 0) {
        this.label = "X";
      } else {
        this.label = headerRowLabels;
      }
      let newSquare = this.drawSquare(this.label);
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
        let newSquare = "";
        if (!this.doesAShipResideHereAndIfSoWhichOne(this.label)) {
          newSquare = this.drawSquare(this.label, false);
        }
        if (this.doesAShipResideHereAndIfSoWhichOne(this.label)) {
          newSquare = this.drawSquare(this.label, true);
        }
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
    playerName: state.auth.login.result
      ? state.auth.login.result.username
      : null,
    activeShip: state.setUpGame.selectShip.result,
    battleshipPosition: state.setUpGame.placeBattleship.result,
    carrierPosition: state.setUpGame.placeCarrier.result,
    cruiserPosition: state.setUpGame.placeCruiser.result,
    destroyerPosition: state.setUpGame.placeDestroyer.result,
    submarinePosition: state.setUpGame.placeSubmarine.result
  };
};

const mapDispatchToProps = {
  placeBattleship,
  placeCarrier,
  placeCruiser,
  placeDestroyer,
  placeSubmarine,
  selectShip
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialBoardGrid);
