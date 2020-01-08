//these "ship" components are for the setup board's
//graphical drawings and for the play game page, to display the player's
//own ships on their half of the board

import React from "react";
import fourHorizontal from "../../../Battleship-image/ships/4Horizontal.PNG";
import fourVertical from "../../../Battleship-image/ships/4Vertical.PNG";

class Battleship extends React.Component {
  state = {
    name: "Battleship",
    length: 4,
    orientation: "vertical",
    gridLocations: [[], [], [], []],
    imageHorizontal: fourHorizontal,
    imageVertical: fourVertical,
    height: ((getComputedStyle(document.documentElement).getPropertyValue('--battleshipHeight'))*(Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0)
    ))/100,
    width: ((getComputedStyle(document.documentElement).getPropertyValue('--battleshipWidth'))*(Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0)
    ))/100,
  };

  rotateShip = () => {};

  determineGridLocations = () => {};

  selectShipImage = () => {};

  render() {
    return (
      <div>
        {this.state.orientation === "horizontal" ? (
          <div className="horizontalBattleship">
            <img
              alt={`ship with ${this.state.length} possible hits}`}
              src={this.state.imageHorizontal}
              height={this.state.height}
              width={this.state.width}
            />
          </div>
        ) : (
          <div className="verticalBattleship">
            <img
              alt={`ship with ${this.state.length} possible hits}`}
              src={this.state.imageVertical}
              height={this.state.width}
              width={this.state.height}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Battleship;
