
export default function formatTimestamp(timestamp: number) {
  const options = {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  console.log(new Intl.DateTimeFormat('en-US', options).format(timestamp));
  return new Intl.DateTimeFormat('en-US', options).format(timestamp);
}