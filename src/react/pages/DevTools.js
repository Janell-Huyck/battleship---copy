import React from "react";
import "./PlayGame.css";
import {
  DeleteOldMessagesButton
  //   DefaultSetupButton
} from "../components/devTools";
import { connect } from "../HOCs";
import { startBoard, getOldMessages } from "../../redux/index";

class DevTools extends React.Component {
  componentDidMount = () => {};

  render() {
    return (
      <React.Fragment>
        <DeleteOldMessagesButton />
        {/* <DefaultSetupButton /> */}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    playerName: state.welcome.startGame.result
      ? state.welcome.startGame.result.message.username
      : null,
    gameNumber: state.welcome.startGame.result
      ? state.welcome.startGame.result.message.text.slice(5, 9)
      : null,
    board: state.manipulateBoards.startBoard.result
  };
};
const mapDispatchToProps = {
  getOldMessages,
  startBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(DevTools);
