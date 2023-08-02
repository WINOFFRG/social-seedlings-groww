export function hexToRGBA(hex: string, alpha: number = 1): string {
    if (hex.startsWith('#')) {
        hex = hex.slice(1);
    }

    const red = parseInt(hex.slice(0, 2), 16);
    const green = parseInt(hex.slice(2, 4), 16);
    const blue = parseInt(hex.slice(4, 6), 16);

    const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    return rgba;
}
