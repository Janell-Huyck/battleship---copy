export const checkForLose = playerBoard => {
  let arrayOfSinkage = [];
  if (checkForSunkBattleship(playerBoard)) {
    arrayOfSinkage.push("battleship");
    console.log("battleship is sunk");
  }
  if (checkForSunkCarrier(playerBoard)) {
    arrayOfSinkage.push("carrier");
    console.log("carrier is sunk");
  }
  if (checkForSunkCruiser(playerBoard)) {
    arrayOfSinkage.push("cruiser");
    console.log("cruiser is sunk");
  }
  if (checkForSunkDestroyer(playerBoard)) {
    arrayOfSinkage.push("destroyer");
    console.log("destroyer is sunk");
  }
  if (checkForSunkSubmarine(playerBoard)) {
    arrayOfSinkage.push("submarine");
    console.log("submarine is sunk");
  }

  return arrayOfSinkage;
};

export const checkForSunkBattleship = playerBoard => {
  let numberOfHits = 0;
  for (let coordinates in playerBoard) {
    if (
      playerBoard[coordinates].ship === "battleship" &&
      playerBoard[coordinates].torpedo
    )
      numberOfHits++;
  }
  if (numberOfHits === 4) {
    return true;
  }
};

export const checkForSunkCarrier = playerBoard => {
  let numberOfHits = 0;
  for (let coordinates in playerBoard) {
    if (
      playerBoard[coordinates].ship === "carrier" &&
      playerBoard[coordinates].torpedo
    )
      numberOfHits++;
  }
  if (numberOfHits === 5) {
    return true;
  }
};

export const checkForSunkCruiser = playerBoard => {
  let numberOfHits = 0;
  for (let coordinates in playerBoard) {
    if (
      playerBoard[coordinates].ship === "cruiser" &&
      playerBoard[coordinates].torpedo
    )
      numberOfHits++;
  }
  if (numberOfHits === 3) {
    return true;
  }
};

export const checkForSunkSubmarine = playerBoard => {
  let numberOfHits = 0;
  for (let coordinates in playerBoard) {
    if (
      playerBoard[coordinates].ship === "submarine" &&
      playerBoard[coordinates].torpedo
    )
      numberOfHits++;
  }
  if (numberOfHits === 3) {
    return true;
  }
};

export const checkForSunkDestroyer = playerBoard => {
  let numberOfHits = 0;
  for (let coordinates in playerBoard) {
    if (
      playerBoard[coordinates].ship === "destroyer" &&
      playerBoard[coordinates].torpedo
    )
      numberOfHits++;
  }
  if (numberOfHits === 2) {
    return true;
  }
};
