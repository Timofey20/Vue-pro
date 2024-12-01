export default async function getOpenInteres(symbol: string) {
  const queryParams = {
    category: "linear",
    symbol: symbol,
    intervalTime: "5min",
    limit: 10
    // startTime: currentTime,
    // endTime: fiveMinutesAgo,
  };
  const queryString = new URLSearchParams(queryParams).toString();

  const url = `https://api-testnet.bybit.com/v5/market/open-interest?${queryString}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('Ошибка:', error);
  }
}