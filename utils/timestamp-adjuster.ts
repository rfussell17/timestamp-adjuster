import { TimeUtil } from "./time-util";

export class TimestampAdjuster {
  static adjustTimestamps(notes: string, additionalTime: string, addTime: boolean, formatWithLeadingZeros: boolean): string {
    const additionalSeconds = formatWithLeadingZeros
      ? TimeUtil.parseTimeWithZeros(additionalTime)
      : TimeUtil.parseTimeWithoutZeros(additionalTime);

    const lines = notes.split("\n");
    const adjustedLines = lines.map((line) => {
      const regex = formatWithLeadingZeros ? /\((\d{2}:\d{2}:\d{2})\)/ : /(\d{1,2}:\d{2}:\d{2}|\d{1,2}:\d{2})/;
      const match = line.match(regex);

      if (match && match[1]) {
        const currentSeconds = formatWithLeadingZeros
          ? TimeUtil.parseTimeWithZeros(match[1])
          : TimeUtil.parseTimeWithoutZeros(match[1]);
        const adjustedSeconds = addTime ? currentSeconds + additionalSeconds : currentSeconds - additionalSeconds;
        const adjustedTime = formatWithLeadingZeros
          ? TimeUtil.formatWithZeros(adjustedSeconds)
          : TimeUtil.formatWithoutZeros(adjustedSeconds);
        return line.replace(match[0], formatWithLeadingZeros ? `(${adjustedTime})` : adjustedTime);
      }

      return line;
    });

    return adjustedLines.join("\n");
  }
}
