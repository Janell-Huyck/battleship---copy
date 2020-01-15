import React from "react";
import { Redirect } from "react-router-dom"
import "./WaitScreen.css";
import { deleteMessage, getOldMessages } from "../../../redux/index";
import { connect, withAsyncAction } from "../../HOCs";

class WaitScreen extends React.Component {
  handleGoToCreditsClick = event => {
    return <Redirect to="/Credits" />;
  }
  isThisAGameEndingMessage = (trueOrFalse) =>{
    if(trueOrFalse){
      return <button onClick={this.handleGoToCreditsClick}>Credits</button>
    }
  }
  render() {
    return (
      <div className="waitScreen">
        <p className="waitMessage">{this.props.message}</p>
        {this.isThisAGameEndingMessage(this.props.children)}
        {/* <button onClick={this.deleteOldMessages}>deleteOldMessages</button> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.auth.login.result) {
    return {
      playerName: state.auth.login.result.username,
      token: state.auth.login.result.token
    };
  } else return {};
};

const mapDispatchToProps = {
  // checkReadyStart,
  deleteMessage,
  getOldMessages
  // startGame
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAsyncAction("auth", "login")(WaitScreen));

// export default WaitScreen;
