import React from "react";
import { connect, withAsyncAction } from "../../../HOCs";
import { fetchLastMessage } from "../../../../redux";

class DeleteLastTorpedoMessage extends React.Component {
  state = {
    playerName: this.props.playerName,
    id: 0
  };
  getLastTorpedoMessage = () => {
    this.props.fetchLastMessage(this.state.playerName).then(result => {
      result.payload.messages.forEach(message => {
        if (message.text.includes("torpedo")) {
          this.setState({ id: message.id });
          this.props.deleteMessage(this.state.id, this.props.token);
        }
      });
    });
  };

  handleClick = () => {
    this.getLastTorpedoMessage();
  };
  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleClick}>
          Delete the last torpedo message you sent
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerName: state.auth.login.result.username,
    token: state.auth.login.result.token
  };
};

const mapDispatchToProps = { fetchLastMessage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAsyncAction("messages", "deleteMessage")(DeleteLastTorpedoMessage));
