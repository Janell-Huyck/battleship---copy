import React from "react";
import { connect } from "react-redux";
import { withAsyncAction } from "../../../HOCs";
import InitialBoardGrid from "./InitialBoardGrid";
import { ClearBoardButton, ReadyButton } from "../index";
import { Redirect } from "../../index";

class InitialBoard extends React.Component {
  state = {
    redirectToDev: false
  };

  newBoard = [];
  newRow = [];
  label = "";

  devToolsButton = () => {
    return this.setState({ redirectToDev: true });
  };

  render() {
    if (this.state.redirectToDev === true) {
      return <Redirect to="/dev" />;
    }
    return (
      <React.Fragment>
        <div className="newBoard">
          <InitialBoardGrid />
        </div>
        <ClearBoardButton />
        <ReadyButton />
        <button onClick={this.devToolsButton}>Go To Dev Tools</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAsyncAction("setUpGame", "placeBattleship")(InitialBoard));
