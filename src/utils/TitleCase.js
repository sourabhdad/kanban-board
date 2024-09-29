export function toTitleCase(str) {
    return str
        .toLowerCase() // Convert the entire string to lowercase
        .split(/[_\s]+/) // Split by underscores or spaces
        .map(word => 
            word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : ''
        )
        .join(' ') // Join back into a single string with spaces
        .replace(/\s+/g, ' '); // Replace multiple spaces with a single space
}