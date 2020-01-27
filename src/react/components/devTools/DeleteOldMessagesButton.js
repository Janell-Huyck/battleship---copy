import React from "react";
import { connect } from "react-redux";
import { deleteMessage, getOldMessages } from "../../../redux/index";

class DeleteOldMessagesButton extends React.Component {
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
        <h3> Note: wait 5 seconds between clicks</h3>
        <button onClick={this.deleteOldMessages}>Delete Old Messages</button>
        <h4>Also note: this will delete your start-game message as well.</h4>
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

      board: state.manipulateBoards.startBoard.result
    };
  } else return {};
};

const mapDispatchToProps = { deleteMessage, getOldMessages };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteOldMessagesButton);
