import React from "react";
import cruiserHorizontal from "../../../Battleship-image/ships/horizShip2.png";
import cruiserVertical from "../../../Battleship-image/ships/vertShip2.png";
import { connect } from "../../HOCs";
import { selectShip } from "../../../redux/index";

class Cruiser extends React.Component {
  state = {
    name: "cruiser",
    length: 3,
    orientation: "horizontal",
    imageHorizontal: cruiserHorizontal,
    imageVertical: cruiserVertical
  };

  rotateShip = () => {
    this.state.orientation === "horizontal"
      ? this.setState({ orientation: "vertical" })
      : this.setState({ orientation: "horizontal" });
  };

  onShipClick = () => {
    this.props.selectShip({
      name: this.state.name,
      length: this.state.length,
      orientation: this.state.orientation
    });
  };

  render() {
    return (
      <div>
        {this.state.orientation === "horizontal" ? (
          <div className="">
            <img
              onClick={this.onShipClick}
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
            />
          </div>
        ) : (
          <div className="verticalBattleship">
            <img
              onClick={this.onShipClick}
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

export default connect(mapStateToProps, mapDispatchToProps)(Cruiser);
