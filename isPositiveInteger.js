function isPositiveInteger(input) {
  // Check if the input is a number and an integer
  if (typeof input === 'number' && Number.isInteger(input)) {
    // Check if the integer is greater than 0
    return input > 0;
  }
  // If it's not a number or not an integer, return false
  return false;
}