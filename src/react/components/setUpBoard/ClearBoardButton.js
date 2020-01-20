import React from "react";

class ClearBoardButton extends React.Component {
  handleClick = () => {
    window.location.reload();
  };

  render() {
    return <button onClick={this.handleClick}>Clear Board</button>;
  }
}

export default ClearBoardButton;
