import { movingShift } from '../caesarCipher';

// Test 1: Shifting the string with shift value of 1
const s = "I should have known that you would have a perfect answer for me!!!";
const shift = 1;
const result = movingShift(s, shift);
console.log(result);
// Expected output: [
//   "J vltasl rlhr ",
//   "zdfog odxr ypw",
//   " atasl rlhr p ",
//   "gwkzzyq zntyhv",
//   " lvz wp!!!"
// ]
