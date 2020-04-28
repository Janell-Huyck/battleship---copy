import React from "react";
import { withAsyncAction } from "../../HOCs";
import { connect } from "react-redux";
import { Redirect } from "..";
import { WaitScreen } from "../waitScreen/";
import { checkReadyStart, startGame } from "../../../redux/index";
import "./CreateGameButton.css";

class CreateGameButton extends React.Component {
  state = {
    goToSetup: false,
    gameCreated: false,
    message: "",
    gameNumber: "0",
    hasPostedStart: false
  };

  componentDidMount() {
    this.checkReadyStart();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick = () => {
    const newGameNumber = this.generateGameNumber();
    this.props.login({ username: "playerA", password: "playerA" });

    this.setState({
      gameNumber: newGameNumber,
      gameCreated: true,
      message: this.generateMessage(newGameNumber)
    });
    this.interval = setInterval(this.checkReadyStart, 5000);
  };

  checkReadyStart = () => {
    if (this.props.token) {
      if (this.state.hasPostedStart === false) {
        if (this.state.gameNumber !== "0") {
          this.props.startGame(this.state.gameNumber, this.props.token);
          this.setState({ hasPostedStart: true });
        }
      }
    }

    this.props.checkReadyStart().then(result => {
      result.payload.messages.map(message => {
        if (this.state.gameNumber !== "0") {
          if (message.text === "Game " + this.state.gameNumber + " start") {
            if (message.username === "playerB") {
              this.setState({ goToSetup: true });
            }
          }
        }
        return message.text;
      });
    });
  };

  generateLoginData = () => {
    return { username: "playerA", password: "playerA" };
  };

  generateGameNumber = () => {
    let newGameNumber = "";
    for (let i = 1; i <= 4; i++) {
      let digit = Math.floor(Math.random() * 10);
      newGameNumber = newGameNumber + digit;
    }
    return newGameNumber;
  };

  generateMessage = newGameNumber => {
    return (
      "Waiting for your opponent to join.  Please let them know that your game number is " +
      newGameNumber
    );
  };

  render() {
    if (this.state.goToSetup === true) {
      return <Redirect to="/setup" />;
    }
    return (
      <React.Fragment>
        {this.state.gameCreated && <WaitScreen message={this.state.message} />}
        <button id="createNewGame" onClick={this.handleClick}>
          Create New Game
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  if (state.auth.login.result) {
    return {
      token: state.auth.login.result.token
    };
  } else return {};
};

const mapDispatchToProps = {
  checkReadyStart,
  startGame
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAsyncAction("auth", "login")(CreateGameButton));
