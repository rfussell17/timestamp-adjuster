import { TimeUtil } from "./time-util";

export class TimestampAdjuster {
  static adjustTimestamps(notes: string, additionalTime: string, addTime: boolean, formatWithLeadingZeros: boolean): string {
    const additionalSeconds = formatWithLeadingZeros
      ? TimeUtil.parseTimeWithZeros(additionalTime)
      : TimeUtil.parseTimeWithoutZeros(additionalTime);

    return notes.split("\n").map(line => {
      if (formatWithLeadingZeros) {
        // Look for timestamps in format with any brackets: (HH:MM:SS), [HH:MM:SS], {HH:MM:SS}
        const regex = /([(\[{])(\d{2}:\d{2}:\d{2})([)\]}])/g;
        return line.replace(regex, (match, openBracket, timestamp, closeBracket) => {
          const currentSeconds = TimeUtil.parseTimeWithZeros(timestamp);
          const adjustedSeconds = addTime ? currentSeconds + additionalSeconds : currentSeconds - additionalSeconds;
          const adjustedTime = TimeUtil.formatWithZeros(Math.max(0, adjustedSeconds));
          return `${openBracket}${adjustedTime}${closeBracket}`; // Keep original bracket type
        });
      } else {
        // Look for timestamps with any brackets or without brackets
        const regex = /(?:([(\[{])(\d{1,2}:\d{2}(?::\d{2})?)([)\]}])|\b(\d{1,2}:\d{2}(?::\d{2})?)\b)/g;
        return line.replace(regex, (match, openBracket, bracketedTimestamp, closeBracket, unbracketedTimestamp) => {
          const timestamp = bracketedTimestamp || unbracketedTimestamp;
          const currentSeconds = TimeUtil.parseTimeWithoutZeros(timestamp);
          const adjustedSeconds = addTime ? currentSeconds + additionalSeconds : currentSeconds - additionalSeconds;
          const adjustedTime = TimeUtil.formatWithoutZeros(Math.max(0, adjustedSeconds));
          
          // If it had brackets, keep them; if not, return without brackets
          if (openBracket && closeBracket) {
            return `${openBracket}${adjustedTime}${closeBracket}`;
          } else {
            return adjustedTime;
          }
        });
      }
    }).join("\n");
  }
}