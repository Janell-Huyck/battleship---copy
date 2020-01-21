import React from "react";

export default function OpponentBoardSquare(props) {
  let nameOfClass = "newBoardSquare";
  if (props.isShip) {
    nameOfClass += " placedShip";
  }
  const handleDisplay = () => {
    if (props.image === undefined) {
      return null;
    } else {
      if (props.image === "Hit") {
        return (
          <img alt="Hit" className="hitOrMissToken" src="./hitToken.png" />
        );
      }
      return (
        <img alt="Miss" className="hitOrMissToken" src="./missToken.png" />
      );
    }
  };
  return (
    <React.Fragment>
      <span className="tokenSpan">{handleDisplay()}</span>
      <button className={nameOfClass} onClick={props.onClick} key={props.value}>
        {props.value}
      </button>
    </React.Fragment>
  );
}
