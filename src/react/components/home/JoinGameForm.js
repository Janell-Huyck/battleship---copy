import React from "react";
import { Spinner } from "../";
import { withAsyncAction } from "../../HOCs";
import { Redirect } from "../";
import { connect } from "react-redux";
import {
  getOldMessages,
  startGame,
  login
} from "../../../redux/actionCreators";
import { WaitScreen } from "../waitScreen";

class JoinGameForm extends React.Component {
  state = {
    value: "",
    goToSetup: false,
    loginData: {},
    lookingForMatch: false,
    message: "Searching for your game...",
    hasStartedGame: false
  };
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleJoin = e => {
    e.preventDefault();
    this.props.login({ username: "playerB", password: "playerB" });
    this.setState({ lookingForMatch: true });
    this.interval = setInterval(this.waitToBeLoggedIn, 5000);
  };

  waitToBeLoggedIn = () => {
    if (this.state.hasStartedGame === false) {
      this.props.startGame(this.state.value, this.props.token);
      this.setState({ hasStartedGame: true });
    }
    if (this.props.token) {
      this.checkGameNumber();
      return true;
    } else {
      return false;
    }
  };

  checkGameNumber = () => {
    this.props
      .getOldMessages("playerA")

      .then(result => {
        let matchingMessage = result.payload.messages.map(message => {
          if (message.text === "Game " + this.state.value + " start") {
            if (message.username === "playerA") {
              clearInterval(this.interval);

              this.setState({ goToSetup: true });
            }
          }
          return matchingMessage;
        });
      })
      .then(result => {
        if (result) {
        } else {
        }
      });
  };

  render() {
    const { loading, error } = this.props;
    if (this.state.goToSetup === true) {
      return <Redirect to="/setup" />;
    }
    return (
      <React.Fragment>
        {this.state.lookingForMatch && (
          <WaitScreen message={this.state.message} />
        )}

        <form id="login-form" onSubmit={this.handleJoin}>
          <button type="submit" disabled={loading}>
            Join Game
          </button>
          <input
            type="text"
            name="gameId"
            autoFocus
            required
            onChange={this.handleChange}
            placeholder="enter 4-digit game number"
          />
        </form>
        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
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
  getOldMessages,
  startGame,
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAsyncAction("auth", "login")(JoinGameForm));
