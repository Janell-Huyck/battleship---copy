import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { connect } from "../../HOCs";
import { postMessage, winner } from "../../../redux/index";

class SurrenderButton extends React.Component {
  state = {
    opponentName: ""
  };

  componentDidMount = () => {
    this.determineOpponent();
  };

  determineOpponent = () => {
    let opponentName =
      this.props.playerName === "playerA" ? "playerB" : "playerA";
    this.setState({ opponentName: opponentName });
  };

  onConfirm = () => {
    let gameNumber = this.props.gameNumber;
    console.log("message confirmed");
    this.props.postMessage({ text: `${gameNumber} surrender` });
    this.props.winner(this.state.opponentName);
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
    gameNumber: state.welcome.gameNumber.result,
    playerName: state.auth.login.result.username,
    token: state.auth.login.result.token
  };
};

const mapDispatchToProps = { winner, postMessage };

export default connect(mapStateToProps, mapDispatchToProps)(SurrenderButton);
