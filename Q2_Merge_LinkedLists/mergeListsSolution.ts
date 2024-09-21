class ListNode {
    value: number;
    next: ListNode | null;

    constructor(value: number, next: ListNode | null = null) {
        this.value = value;
        this.next = next;
    }
}

function mergeLists(head1: ListNode | null, head2: ListNode | null): ListNode | null {
    if (!head1) return head2;
    if (!head2) return head1;

    let dummy = new ListNode(-1);
    let currentNode = dummy;
    
    while (head1 !== null && head2 !== null) {
        if (head1.value <= head2.value) {
            currentNode.next = head1;
            head1 = head1.next;
        } else {
            currentNode.next = head2;
            head2 = head2.next;
        }
        currentNode = currentNode.next;
    }

    if (head1 !== null) {
        currentNode.next = head1;
    } else if (head2 !== null) {
        currentNode.next = head2;
    }

    return dummy.next;
}

// Export for testing purposes
export { ListNode, mergeLists };
