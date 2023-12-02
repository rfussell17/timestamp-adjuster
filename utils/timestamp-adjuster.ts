
import { TimeUtil } from "./time-util";

export class TimestampAdjuster {
  static adjustTimestamps(notes: string, additionalTime: string, addTime: boolean): string {
    const additionalSeconds = TimeUtil.parseTime(additionalTime);
    const lines = notes.split("\n");
    const adjustedLines = lines.map((line) => {
      const regex = /\((\d{2}:\d{2}:\d{2})\)/;
      const match = line.match(regex);

      if (match && match[1]) {
        const currentSeconds = TimeUtil.parseTime(match[1]);
        const adjustedTime = addTime
          ? TimeUtil.toTimestamp(currentSeconds + additionalSeconds)
          : TimeUtil.toTimestamp(currentSeconds - additionalSeconds);
        return line.replace(regex, `(${adjustedTime})`);
      }

      return line;
    });

    return adjustedLines.join("\n");
  }
}

