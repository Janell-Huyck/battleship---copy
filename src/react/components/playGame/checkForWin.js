export const checkForWin = board => {
  let arrayOfSinkage = [];
  if (checkForOpponentBattleship(board)) {
    arrayOfSinkage.push("battleship");
  }
  if (checkForOpponentCarrier(board)) {
    arrayOfSinkage.push("carrier");
  }

  if (checkForOpponentCruiser(board)) {
    arrayOfSinkage.push("cruiser");
  }
  if (checkForOpponentDestroyer(board)) {
    arrayOfSinkage.push("destroyer");
  }
  if (checkForOpponentSubmarine(board)) {
    arrayOfSinkage.push("submarine");
  }
  if (arrayOfSinkage.length === 5) {
    return true;
  }
  return arrayOfSinkage;
};

export const checkForOpponentBattleship = board => {
  let numberOfHits = 0;
  for (let coordinates in board) {
    if (board[coordinates].ship === "battleship" && board[coordinates].torpedo)
      numberOfHits++;
  }
  if (numberOfHits === 4) {
    return true;
  }
};

export const checkForOpponentCarrier = board => {
  let numberOfHits = 0;
  for (let coordinates in board) {
    if (board[coordinates].ship === "carrier" && board[coordinates].torpedo)
      numberOfHits++;
  }
  if (numberOfHits === 5) {
    return true;
  }
};

export const checkForOpponentCruiser = board => {
  let numberOfHits = 0;
  for (let coordinates in board) {
    if (board[coordinates].ship === "cruiser" && board[coordinates].torpedo)
      numberOfHits++;
  }
  if (numberOfHits === 3) {
    return true;
  }
};

export const checkForOpponentSubmarine = board => {
  let numberOfHits = 0;
  for (let coordinates in board) {
    if (board[coordinates].ship === "submarine" && board[coordinates].torpedo)
      numberOfHits++;
  }
  if (numberOfHits === 3) {
    return true;
  }
};

export const checkForOpponentDestroyer = board => {
  let numberOfHits = 0;
  for (let coordinates in board) {
    if (board[coordinates].ship === "destroyer" && board[coordinates].torpedo)
      numberOfHits++;
  }
  if (numberOfHits === 2) {
    return true;
  }
};
