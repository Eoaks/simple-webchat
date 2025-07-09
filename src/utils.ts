export function getTime(timestamp: number) {
    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    return timeString
}