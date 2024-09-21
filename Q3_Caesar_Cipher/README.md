# Q2: First Variation on Caesar Cipher

I have created both the Solution and Solution Test Case files for the below Problem Statement. 

## Problem Statement

The task is to implement a variation of the Caesar cipher where the shift increases by 1 for each character in the message. Starting with an initial shift (provided as input), each subsequent character in the string will be shifted by an incrementally larger value. The result is then split into five parts, to be distributed among five "runners."

The parts must be split as evenly as possible, with earlier parts being larger if an exact division isn't feasible. If the last part ends up empty, it should still be included in the result.


### Example

Input:
- s = "I should have known that you would have a perfect answer for me!!!"
- shift = 1

Output:
- ["J vltasl rlhr ", "zdfog odxr ypw", " atasl rlhr p ", "gwkzzyq zntyhv", " lvz wp!!!"]

## Approach

1. **Character Shifting**:
   - For each character, I have determined if it’s a letter (either uppercase or lowercase). If not, keep it unchanged.
   - Then I Calculated the newly shifted character based on the current shift value. The shift increases by 1 after each character.

2. **String Splitting**:
   - After that, Encode the entire string.
   - Split the resulting encoded string into 5 parts. The first 4 parts are of equal or near-equal length, while the last part may be shorter or empty if required.

3. **Return the Parts**:
   - Return an array containing the 5 parts of the encoded message.

## Solution in TypeScript

Check the `movingShift` function within `caesarCipher.ts` file for the solution.

## Running the Tests

To run the tests for this implementation using `ts-node`, follow these steps:

1. **Install Dependencies**:
   Make sure you have `ts-node` installed. You can install it globally using npm:

   ```bash
   npm install -g ts-node
   ```
2. **Run the Tests:**: Navigate to the tests directory and run the tests using the following command:

   ```bash
   ts-node <test_file_name>.ts
   ```
    Replace <test_file_name> with the name of your test file.

