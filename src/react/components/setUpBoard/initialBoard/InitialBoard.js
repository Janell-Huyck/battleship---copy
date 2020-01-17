import React from "react";
import { connect } from "react-redux";
import { withAsyncAction } from "../../../HOCs";
import InitialBoardGrid from "./InitialBoardGrid";
import { ClearBoardButton, ReadyButton } from "../index";

class InitialBoard extends React.Component {
  newBoard = [];
  newRow = [];
  label = "";

  render() {
    return (
      <React.Fragment>
        <div className="newBoard">
          <InitialBoardGrid />
        </div>
        <ClearBoardButton />
        <ReadyButton />
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
