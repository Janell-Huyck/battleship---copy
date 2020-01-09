//these "ship" components are for the setup board's
//graphical drawings and for the play game page, to display the player's
//own ships on their half of the board

import React from "react";
import fiveHorizontal from "../../../Battleship-image/ships/5Horizontal.PNG";
import fiveVertical from "../../../Battleship-image/ships/5Vertical.PNG";
import { connect } from "../../HOCs";
import { selectShip } from "../../../redux/index";

class Carrier extends React.Component {
  state = {
    name: "Carrier",
    length: 5,
    orientation: "horizontal",
    imageHorizontal: fiveHorizontal,
    imageVertical: fiveVertical
  };

  rotateShip = () => {
    this.state.orientation === "horizontal"
      ? this.setState({ orientation: "vertical" })
      : this.setState({ orientation: "horizontal" });
  };

  render() {
    return (
      <div>
        {this.state.orientation === "horizontal" ? (
          <div className="">
            <img
              alt={`ship with ${this.state.length} possible hits}`}
              src={this.state.imageHorizontal}
              height={
                (getComputedStyle(document.documentElement).getPropertyValue(
                  "--shipSquare"
                ) *
                  Math.max(
                    document.documentElement.clientHeight,
                    window.innerHeight || 0
                  )) /
                100
              }
              width={
                (this.state.length *
                  (getComputedStyle(document.documentElement).getPropertyValue(
                    "--shipSquare"
                  ) *
                    Math.max(
                      document.documentElement.clientHeight,
                      window.innerHeight || 0
                    ))) /
                100
              }
              onClick={() => {
                this.props.selectShip({
                  text: "selecting horizontal carrier"
                });
              }}
            />
          </div>
        ) : (
          <div className="verticalBattleship">
            <img
              alt={`ship with ${this.state.length} possible hits}`}
              src={this.state.imageVertical}
              height={
                (this.state.length *
                  (getComputedStyle(document.documentElement).getPropertyValue(
                    "--shipSquare"
                  ) *
                    Math.max(
                      document.documentElement.clientHeight,
                      window.innerHeight || 0
                    ))) /
                100
              }
              width={
                (getComputedStyle(document.documentElement).getPropertyValue(
                  "--shipSquare"
                ) *
                  Math.max(
                    document.documentElement.clientHeight,
                    window.innerHeight || 0
                  )) /
                100
              }
              onClick={() => {
                this.props.selectShip({
                  text: "selecting vertical carrier"
                });
              }}
            />
          </div>
        )}
        <button onClick={this.rotateShip}>Rotate Ship</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = { selectShip };

export default connect(mapStateToProps, mapDispatchToProps)(Carrier);
