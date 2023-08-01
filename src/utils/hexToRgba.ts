export function hexToRGBA(hex: string, alpha: number = 1): string {
    // Remove the '#' character if it exists
    if (hex.startsWith('#')) {
        hex = hex.slice(1);
    }

    // Validate the input format
    const hexRegex = /^[0-9A-Fa-f]{6}$/;
    if (!hexRegex.test(hex)) {
        console.error('Invalid hexadecimal color code.');
        return '';
    }

    // Extract RGB values from the hexadecimal string
    const red = parseInt(hex.slice(0, 2), 16);
    const green = parseInt(hex.slice(2, 4), 16);
    const blue = parseInt(hex.slice(4, 6), 16);

    // Validate alpha value
    if (alpha < 0 || alpha > 1) {
        console.error('Alpha value must be between 0 and 1.');
        return '';
    }

    // Create the RGBA string
    const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    return rgba;
}
