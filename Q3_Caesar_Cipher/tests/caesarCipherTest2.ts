import { movingShift } from '../caesarCipher';

// Test 2: Shifting the string with shift value of 3
const s = "I am passionate about VR";
const shift = 1;
const result = movingShift(s, shift);
console.log(result);
// Expected output: [ 'J dq ', 'vhabs', 'zznht', ' rtho', 'o SP' ]
