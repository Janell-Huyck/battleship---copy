import React from "react";
import { boards } from ".";
import { connect } from "../../HOCs";

class ClearBoardButton extends React.Component {
  handleClick = () => {
    this.resetReduxBoard();
    window.location.reload();
  };

  resetReduxBoard = () => {
    for (let [, value] of Object.entries(boards.playerA)) {
      value.ship = null;
    }
    for (let [, value] of Object.entries(boards.playerB)) {
      value.ship = null;
    }
    this.props.startBoard(boards);
  };

  render() {
    return <button onClick={this.handleClick}>Clear Board</button>;
  }
}
const mapStateToProps = state => {
  if (state.auth.login.result) {
    return {
      playerName: state.auth.login.result.username
      // board: state.manipulateBoards.startBoard.result,
      // battleshipPosition: state.setUpGame.placeBattleship.result
    };
  } else return {};
};

const mapDispatchToProps = {
  // placeBattleship,
  // placeCarrier,
  // placeCruiser,
  // placeDestroyer,
  // placeSubmarine,
  // startBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(ClearBoardButton);
// export default ClearBoardButton;
