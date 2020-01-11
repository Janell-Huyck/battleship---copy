import React from "react";

export default function OpponentBoardSquare(props) {
  let nameOfClass = "newBoardSquare";
  if (props.isShip) {
    nameOfClass += " placedShip";
  }

  return (
    <button className={nameOfClass} onClick={props.onClick} key={props.value}>
      {props.value}
    </button>
  );
}
