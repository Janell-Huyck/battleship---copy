import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { connect } from "../../HOCs";
import { getOldMessages, deleteMessage } from "../../../redux/actionCreators";

class SurrenderButton extends React.Component {
  onConfirm = () => {
    var goHome = window.confirm("Click OK to be redirected to the home page.");
    if (goHome) {
      this.deleteOldMessages();
    }
  };

  deleteOldMessages = () => {
    this.props
      .getOldMessages(this.props.playerName)
      .then(result => {
        result.payload.messages.map(message =>
          this.props.deleteMessage(message.id, this.props.token)
        );
      })
      .then((window.location.href = "/"));
  };

  confirmAlert = () => {
    if (window.confirm("Do You Really Want To Surrender?")) {
      this.onConfirm();
    }
  };

  render() {
    return <button onClick={this.confirmAlert}>I Give Up!</button>;
  }
}
const mapStateToProps = state => {
  return {
    playerName: state.auth.login.result.username,
    token: state.auth.login.result.token
  };
};

const mapDispatchToProps = {
  deleteMessage,
  getOldMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(SurrenderButton);
