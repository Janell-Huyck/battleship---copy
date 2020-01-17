export const checkForLose = playerBoard => {
  let arrayOfSinkage = [];
  if (checkForPlayerBattleship(playerBoard)) {
    arrayOfSinkage.push("battleship");
  }
  if (checkForPlayerCarrier(playerBoard)) {
    arrayOfSinkage.push("carrier");
  }

  if (checkForPlayerCruiser(playerBoard)) {
    arrayOfSinkage.push("cruiser");
  }
  if (checkForPlayerDestroyer(playerBoard)) {
    arrayOfSinkage.push("destroyer");
  }
  if (checkForPlayerSubmarine(playerBoard)) {
    arrayOfSinkage.push("submarine");
  }
  if (arrayOfSinkage.length === 5) {
    return true;
  }
  return arrayOfSinkage;
};

export const checkForPlayerBattleship = playerBoard => {
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

export const checkForPlayerCarrier = playerBoard => {
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

export const checkForPlayerCruiser = playerBoard => {
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

export const checkForPlayerSubmarine = playerBoard => {
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

export const checkForPlayerDestroyer = playerBoard => {
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
