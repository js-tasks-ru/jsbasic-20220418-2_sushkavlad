function checkSpam(str) {
  let strLowerCase = str.toLowerCase();
  if (strLowerCase.includes("1xBet".toLowerCase()) || strLowerCase.includes("XXX".toLowerCase())) {
    return true;
  } else {
    return false;
  }
}
