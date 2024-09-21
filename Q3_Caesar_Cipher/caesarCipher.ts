// Helper function to shift characters
function shiftChar(char: string, shift: number): string {
    const isUpper = char >= 'A' && char <= 'Z';
    const isLower = char >= 'a' && char <= 'z';

    if (!isUpper && !isLower) {
        return char;
    }

    const charCode = char.charCodeAt(0);
    const base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);

    return String.fromCharCode(((charCode - base + shift) % 26) + base);
}

// Main function to perform the variation of Caesar Cipher
function movingShift(s: string, shift: number): string[] {
    let result = '';
    for (let i = 0; i < s.length; i++) {
        result += shiftChar(s[i], shift + i);
    }

    const partLength = Math.ceil(result.length / 5);
    const parts: string[] = [];
    for (let i = 0; i < 5; i++) {
        const start = i * partLength;
        parts.push(result.slice(start, start + partLength));
    }

    return parts;
}

// Export for testing purposes
export { movingShift };
