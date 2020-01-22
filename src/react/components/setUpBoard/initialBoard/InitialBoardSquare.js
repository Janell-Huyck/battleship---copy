import React from "react";

export default function InitialBoardSquare(props) {
  let nameOfClass = "newBoardSquare";
  if (props.isShip) {
    nameOfClass = "placedShip";
  }
  if (props.isHeader) {
    nameOfClass += " headerSquare";
  }

  const handleShipImage = () => {
    let shipImageClass = ""
    
    if (props.shipImage) {
      shipImageClass = props.shipImage.slice(2)
      shipImageClass = shipImageClass.slice(0,-4)
      console.log(shipImageClass)
      return (
        <span>
          <img src={props.shipImage} alt="ship" className={shipImageClass}>
            {console.log("I'm here", props.shipImage)}
          </img>
        </span>
      );
    }
  };

  return (
    <React.Fragment>
      {handleShipImage()}
      <button className={nameOfClass} onClick={props.onClick} key={props.value}>
        {props.value}
      </button>
    </React.Fragment>
  );
}
