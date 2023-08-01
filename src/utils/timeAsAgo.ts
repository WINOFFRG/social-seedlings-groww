export function timeAgo(dateString: string): string {
    const now = new Date().getTime();
    const date = new Date(dateString).getTime();
    const diff = (now - date) / 1000;

    const years = Math.floor(diff / (365 * 24 * 60 * 60));
    const months = Math.floor(diff / (30 * 24 * 60 * 60)) - years * 12;
    const days = Math.floor(diff / (24 * 60 * 60)) - years * 365 - months * 30;

    let output = '';

    if (years > 0) {
        output += `${years}y`;
    } else if (months > 0) {
        output += `${months}m`;
    } else if (days > 0) {
        output += `${days}d`;
    }

    return output.trim();
}
