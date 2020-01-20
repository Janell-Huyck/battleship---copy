import React from "react";
import { connect } from "react-redux";
// import { OpponentBoardGrid } from ".";
// import { checkForLose } from "../checkForLose";
// import { WaitScreen } from "../../waitScreen";
import { deleteMessage, getOldMessages } from "../../../redux/index";

class DefaultSetupButton extends React.Component {
  deleteOldMessages = () => {
    this.props
      .getOldMessages(this.props.playerName)
      .then(result => {
        result.payload.messages.map(message =>
          this.props.deleteMessage(message.id, this.props.token)
        );
      })
      .then(console.log("Messages Deleted"));
  };

  render() {
    return (
      <React.Fragment>
        <h3>
          Click here to place all ships at the top (default testing position)
          and start game{" "}
        </h3>
        <button onClick={this.defaultStart}>Default Start</button>
      </React.Fragment>
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

const mapDispatchToProps = { deleteMessage, getOldMessages };

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSetupButton);
