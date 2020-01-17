import React from "react";
import { InitialBoard, ShipsAvailable } from "../components/setUpBoard";
import { Menu } from "../components";
import "./SetUpBoard.css";
import { connect } from "../HOCs";
import boards from "../components/setUpBoard/whereDoTheShipsLive";
import { startBoard } from "../../redux/index";

class SetUpBoard extends React.Component {
  componentDidMount = () => {
    this.props.startBoard(boards);
  };

  whatCursor = () => {
    if (this.props.selectedShip === null) {
      document.body.style.cursor = "auto";
      return null;
    } else {
      if (this.props.selectedShip.name === "battleship") {
        this.props.selectedShip.orientation === "horizontal"
          ? (document.body.style.cursor = "url('./horizShip4Cursor.png'),help")
          : (document.body.style.cursor = "url('./vertShip4Cursor.png'),help");
      }
      if (this.props.selectedShip.name === "carrier") {
        this.props.selectedShip.orientation === "horizontal"
          ? (document.body.style.cursor = "url('./horizShip5Cursor.png'),help")
          : (document.body.style.cursor = "url('./vertShip5Cursor.png'),help");
      }
      if (this.props.selectedShip.name === "submarine") {
        this.props.selectedShip.orientation === "horizontal"
          ? (document.body.style.cursor = "url('./horizShip3Cursor.png'),help")
          : (document.body.style.cursor = "url('./vertShip3Cursor.png'),help");
      }
      if (this.props.selectedShip.name === "cruiser") {
        this.props.selectedShip.orientation === "horizontal"
          ? (document.body.style.cursor = "url('./horizShip2Cursor.png'),help")
          : (document.body.style.cursor = "url('./vertShip2Cursor.png'),help");
      }
      if (this.props.selectedShip.name === "destroyer") {
        this.props.selectedShip.orientation === "horizontal"
          ? (document.body.style.cursor = "url('./horizShip1Cursor.png'),help")
          : (document.body.style.cursor = "url('./vertShip1Cursor.png'),help");
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <Menu />
        <h2>PLACE YOUR SHIPS</h2>
        <div className="setUpBoard">
          <div className="initialBoard">
            <InitialBoard onClick={this.whatCursor()} />
          </div>
          <ShipsAvailable onClick={this.whatCursor()} />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    selectedShip: state.setUpGame.selectShip.result
  };
};
const mapDispatchToProps = { startBoard };
export default connect(mapStateToProps, mapDispatchToProps)(SetUpBoard);
