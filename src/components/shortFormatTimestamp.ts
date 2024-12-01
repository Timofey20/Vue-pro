
export default function shortFormatTimestamp(timestamp: number) {
  const options = {
    timeZone: 'Asia/Bangkok',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Intl.DateTimeFormat('en-US', options).format(timestamp);
}