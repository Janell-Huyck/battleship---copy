import React from "react";
import PlayerBoardSquare from "./PlayerBoardSquare";
import { connect } from "../../../HOCs";

class PlayerBoardGrid extends React.Component {
  label = "";
  newRow = [];
  newBoard = [];
  rowLabels = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  targetRow = null;
  targetColumn = null;

  drawSquare = (label, isShip, whichShip) => {
    return <PlayerBoardSquare 
      value={label} 
      isShip={isShip} 
      key={label} 
      shipImage={whichShip}
      />;
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
      this.carrierLocation = [];
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

  drawShipStartingHere = (cellLabel) => {
    if(this.props.battleshipPosition){
    }
    if(
      this.props.battleshipPosition &&
      cellLabel === this.props.battleshipPosition.coordinates[0]){
      if(this.props.battleshipPosition.orientation === "horizontal"){
        return "./horizShip4.png"
      }
      else return "./vertShip4.png"

    }
    else if(
      this.props.carrierPosition &&
      cellLabel === this.props.carrierPosition.coordinates[0]){
      if(this.props.carrierPosition.orientation === "horizontal"){
        return "./horizShip5.png"
      }
      else return "./vertShip5.png"

    }
    else if(
      this.props.cruiserPosition &&
      cellLabel === this.props.cruiserPosition.coordinates[0]){
      if(this.props.cruiserPosition.orientation === "horizontal"){
        return "./horizShip2.png"
      }
      else return "./vertShip2.png"

    }
    else if(
      this.props.submarinePosition &&
      cellLabel === this.props.submarinePosition.coordinates[0]){
      if(this.props.submarinePosition.orientation === "horizontal"){
        return "./horizShip3.png"
      }
      else return "./vertShip3.png"

    }
    else if(
      this.props.destroyerPosition &&
      cellLabel === this.props.destroyerPosition.coordinates[0]){
      if(this.props.destroyerPosition.orientation === "horizontal"){
        return "./horizShip1.png"
      }
      else return "./vertShip1.png"

    }
    else {return false}
  }

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
          if(!this.drawShipStartingHere(this.label)){
          newSquare = this.drawSquare(this.label, true, null);
          }
          else{
            newSquare = this.drawSquare(this.label, true, this.drawShipStartingHere(this.label))
          }
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
    battleshipPosition: state.setUpGame.placeBattleship.result,
    carrierPosition: state.setUpGame.placeCarrier.result,
    cruiserPosition: state.setUpGame.placeCruiser.result,
    destroyerPosition: state.setUpGame.placeDestroyer.result,
    submarinePosition: state.setUpGame.placeSubmarine.result
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBoardGrid);
