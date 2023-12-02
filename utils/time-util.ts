export class TimeUtil {
  // Parses time for format with leading zeros (e.g., "00:01:58")
  static parseTimeWithZeros(timeStr: string): number {
    const parts = timeStr.split(":").map(Number);
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  // Parses time for format without leading zeros (e.g., "1:07:09")
  static parseTimeWithoutZeros(timeStr: string): number {
    const parts = timeStr.split(":").map(Number);
    return parts.length === 2
      ? parts[0] * 60 + parts[1]
      : parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  // Formats time with leading zeros
  static formatWithZeros(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  // Formats time without leading zeros
  static formatWithoutZeros(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  }
}
