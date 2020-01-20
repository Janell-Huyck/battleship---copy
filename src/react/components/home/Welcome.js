import React from "react";

import { CreateGameButton, JoinGameForm } from ".";
import { logout } from "../../../redux/actionCreators";
import { connect } from "../../HOCs";

class Welcome extends React.Component {
  componentDidMount = () => {
    if (this.props.isPlayerLoggedIn) {
      let token = this.props.isPlayerLoggedIn.token;
      this.props.logout(token);
    }
  };

  render() {
    return (
      <div className="CreateAndJoin">
        <CreateGameButton />

        <div className="JoinGameForm">
          <JoinGameForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isPlayerLoggedIn: state.auth.login.result
  };
};

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
