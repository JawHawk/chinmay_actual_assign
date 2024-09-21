# Q2: Merge Two Sorted Linked Lists

I have created both the Solution and Solution Test Case files for the below Problem Statement. 

## Problem Statement

Given pointers to the heads of two sorted linked lists, merge them into a single, sorted linked list. Either head pointer may be null, meaning that the corresponding list is empty.

### Example

Input:
- headA: 1 → 3 → 7 → NULL
- headB: 1 → 2 → NULL

Output:
- Merged List: 1 → 1 → 2 → 3 → 7 → NULL

## Approach

1. **Initialization**:
   - I have created a dummy node to simplify the merging process.
   - Then a pointer is used to keep track of the last node in the merged list.

2. **Merging**:
   - I then Iterated through both linked lists while comparing the current nodes.
   - Appended the smaller node to the merged list and moved the pointer forward in that list.
   - Continued until one of the lists is exhausted.

3. **Appending Remaining Nodes**:
   - If one list is not yet exhausted, append the remaining nodes to the merged list.

4. **Return the Merged List**:
   - Finally The merged list starts from the next node of the dummy node.

## Solution in TypeScript

Check the `mergeLists` function within `mergeListsSolution.ts` file for the solution.

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

