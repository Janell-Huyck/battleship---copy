//these "ship" components are for the setup board's
//graphical drawings and for the play game page, to display the player's
//own ships on their half of the board

import React from "react";




class Battleship extends React.Component {
  state = {
    name: "Battleship",
    length: 4,
    orientation: "horizontal",
    gridLocations: [[], [], [], []],
    imageHorizontal: "../../../Battleship-image/ships/4Horizontal.PNG",
    imageVertical: "../../../Battleship-image/ships/4Vertical.PNG"
  };

  rotateShip = () => {};

  determineGridLocations = () => {};

  selectShipImage = () => {};
  //===========================================
  //Janell says:
  //stopping point: trying to render the ships by showing a div with the img as the
  //background because i couldn't get them to render an image
  //Kano says:
  //Images are rendering, but links had to be hardcoded in, which is not ideal
  //Wondering if we can import the images using connect so we can more easily 
  //change images. For now(1/8/2020), this is working.
  //======================================================

  render() {
    return (
      <div>
        {this.state.orientation === "horizontal" ? (
          <div className="horizontalBattleship">
            <img height="25px" src={ require( "../../../Battleship-image/ships/4Horizontal.PNG") } />   
            {/* the line below should work but instead error: Module NotFound */} 
            {/*<img height="25px" src={ require( `${ this.state.imageHorizontal }`) } />       */}
          </div>
        ) : (
          <div className="verticalBattleship" />
        )}

        {/* <>image of horizontal or vertical battleship</> */}
      </div>
    );
  }
}

export default Battleship;
