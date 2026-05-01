function checkIfArrayContainsEmptyString(arr) {
  // The 'some()' method tests whether at least one element in the array
  // passes the test implemented by the provided function.
  // It returns true if it finds an element for which the callback returns true; otherwise, it returns false.
  return arr.some(element => typeof element === 'string' && element === '');
}