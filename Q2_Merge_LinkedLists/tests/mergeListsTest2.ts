import { mergeLists, ListNode } from '../mergeListsSolution';

// Helper function to convert an array to a linked list
function arrayToLinkedList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to convert linked list to array
function linkedListToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    let current = head;
    while (current) {
        result.push(current.value);
        current = current.next;
    }
    return result;
}

// Test 2: Merging two lists [2, 5, 6] and [1, 3, 4]
const listA = arrayToLinkedList([2, 5, 6]);
const listB = arrayToLinkedList([1, 3, 4]);
const merged = mergeLists(listA, listB);
const result = linkedListToArray(merged);
console.log(result); // Expected output: [1, 2, 3, 4, 5, 6]
