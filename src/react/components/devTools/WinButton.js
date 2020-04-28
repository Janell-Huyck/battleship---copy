import React from "react";
import { connect } from "react-redux";
import { deleteMessage, getOldMessages } from "../../../redux/index";
import { WinLoseAnimation } from "../winLoseAnimations";

class WinButton extends React.Component {
  state = {
    win: false
  };

  winClickHandler = () => {
    this.setState({ win: true });
  };

  render() {
    if (this.state.win === true) {
      return <WinLoseAnimation message="You Win!" />;
    }

    return (
      <React.Fragment>
        <button onClick={this.winClickHandler}>
          Click to show win animation
        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WinButton);
