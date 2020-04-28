import React from "react";
import { connect } from "react-redux";
import "./WinLoseAnimations.css";

class WinAnimation extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="win-text">{this.props.message}</h1>
        <div className="torpedo"></div>
        <div className="ship"></div>
        <div className="explosion"></div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WinAnimation);
