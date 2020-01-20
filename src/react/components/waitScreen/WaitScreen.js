import React from "react";
import { Link } from "react-router-dom";
import "./WaitScreen.css";
import { deleteMessage, getOldMessages } from "../../../redux/index";
import { connect, withAsyncAction } from "../../HOCs";

class WaitScreen extends React.Component {
  handleGoToCreditsClick = event => {};
  isThisAGameEndingMessage = trueOrFalse => {
    if (trueOrFalse) {
      return (
        <div>
          {/* <Link to="/Credits">Credits </Link>; */}
          Product Owner: Janell Hyuck; Design & CSS: LeighAnn Featheringill &
          Givon Dickerson; Javascript, React, Redux: Andrew Belanger, Chelsea
          White, Drashti Dalsania, Kano Marvel; API: Taylor Hurt
          <Link
            to="/"
            title="Product Owner: Janell Hyuck; Design & CSS: LeighAnn Featheringill & Givon Dickerson; Javascript, React, Redux: Andrew Belanger, Chelsea White, Drashti Dalsania, Kano Marvel; API: Taylor Hurt"
          >
            PLAY AGAIN?
          </Link>
        </div>
      );
    }
  };
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
  deleteMessage,
  getOldMessages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAsyncAction("auth", "login")(WaitScreen));
