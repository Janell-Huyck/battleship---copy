import React from "react";
import { Redirect } from "..";
import { connect } from "react-redux";
import { Battleship, Carrier, Cruiser, Destroyer, Submarine } from "../ships";

class RandomSetupButton extends React.Component {
  shipArray = [Battleship, Carrier, Cruiser, Destroyer, Submarine];

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
      this.generateLegalCoordinates(this.shipArray[whichShipInArray]);
      //if it is a legal move, set my redux state to reflect it
      //   (important so i don't overlap other ships)
      // setState to indicate that the ship has been placed??
      //
      //  if (coordinate is illegal) {call this same function again}
      //
      //if it is not a legal move, select another random coordinate and repeat the checks
    }
    //once all ships are placed, send the ship messages
    //send a "ready" message
    //start an interval and start checking for opponent ready
    //toggle the waiting screen
    //once the opponent has sent messages, redirect to the playgame screen
  };

  generateLegalCoordinates = ship => {
    let rowHeaders = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let orientation = "";
    let row = "";
    let column = "";
    let coordinate = "";

    console.log("the ship for the legal coordinates is " + ship);

    //generate random coordinates
    row = rowHeaders[Math.floor(Math.random() * 10)];
    column = this.Math.floor(Math.random() * 10) + 1;
    coordinate = row + column;
    console.log("random coordinate to test is: " + coordinate);

    //generate random orientation
    if (Math.floor(Math.random()) === 1) {
      orientation = "vertical";
      console.log("math.floor was 1.  setting orientatin to vertical");
    } else {
      orientation = "horizontal";
      console.log(
        "math.floor was not equal to 1.  setting orientation to horizontal."
      );
    }

    this.checkIfCoordinateIsLegal(ship, coordinate, orientation);
    //check if coordinate is a legal move
    //    generate what the coordinates would be
    //    check each coordinate against redux
    //        if the coordinate itself is null/undefined, you're out of bounds
    //        if the coordinate exists, check the .ship status.  if it's != null,
    //          then a ship is already there.
  };

  checkIfCoordinateIsLegal = (ship, coordinate, orientation) => {
    console.log(
      "checking ship/coordinate/orientation: " +
        ship +
        " " +
        coordinate +
        " " +
        orientation
    );
  };
  render() {
    return (
      <button onClick={this.clickHandler}>Click To Place Random Ships</button>
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
