export class TimeUtil {
    static parseTime(timeStr: string): number {
      const parts = timeStr.split(":").map(Number);
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
  
    static toTimestamp(totalSeconds: number): string {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  }
  