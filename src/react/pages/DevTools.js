import React from "react";
import "./PlayGame.css";
import { DeleteOldMessagesButton } from "../components/devTools";
import { connect } from "../HOCs";
import { startBoard, getOldMessages } from "../../redux/index";
import { WinButton } from "../components/devTools";

class DevTools extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DeleteOldMessagesButton />
        <h3>Win Animation</h3>
        <WinButton />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    playerName: state.welcome.startGame.result
      ? state.welcome.startGame.result.message.username
      : null,
    gameNumber: state.welcome.gameNumber
      ? state.welcome.gameNumber.result
      : null,
    board: state.manipulateBoards.startBoard.result
  };
};
const mapDispatchToProps = {
  getOldMessages,
  startBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(DevTools);
