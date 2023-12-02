import { TimeUtil } from "./time-util";

export class TimestampAdjuster {
  static adjustTimestamps(notes: string, additionalTime: string, addTime: boolean, formatWithLeadingZeros: boolean): string {
    const additionalSeconds = formatWithLeadingZeros
      ? TimeUtil.parseTimeWithZeros(additionalTime)
      : TimeUtil.parseTimeWithoutZeros(additionalTime);

    return notes.split("\n").map(line => {
      if (formatWithLeadingZeros) {
        const regex = /\(\d{2}:\d{2}:\d{2}\)/g;
        const parts = line.split(regex);

        // If no timestamps are found, return the line as is
        if (parts.length === 1) return line;

        return parts.reduce((acc, part, index) => {
          if (index === parts.length - 1) return acc + part; // Last part, no timestamp follows

          const match = regex.exec(line);
          if (!match) return acc + part; // If no match is found, just return the accumulated parts

          const timestamp = match[0];
          const cleanTimestamp = timestamp.replace(/[()]/g, ''); // Remove parentheses for parsing
          const currentSeconds = TimeUtil.parseTimeWithZeros(cleanTimestamp);
          const adjustedSeconds = addTime ? currentSeconds + additionalSeconds : currentSeconds - additionalSeconds;
          const adjustedTime = TimeUtil.formatWithZeros(adjustedSeconds);

          return acc + part + `(${adjustedTime})`;
        }, '');
      } else {
        const regex = /(\d{1,2}:\d{2}(:\d{2})?)/g;
        return line.replace(regex, (match, p1) => {
          const currentSeconds = TimeUtil.parseTimeWithoutZeros(p1);
          const adjustedSeconds = addTime ? currentSeconds + additionalSeconds : currentSeconds - additionalSeconds;
          const adjustedTime = TimeUtil.formatWithoutZeros(adjustedSeconds);
          return adjustedTime;
        });
      }
    }).join("\n");
  }
}
