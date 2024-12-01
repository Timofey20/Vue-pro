// Типизация для ответа
interface BybitTimeResponse {
  retCode: number;
  retMsg: string;
  result: {
    timeSecond: string;
    timeNano: string;
  };
  retExtInfo: Record<string, unknown>;
  time: number;
}

// Функция для выполнения GET-запроса
async function fetchBybitTime(): Promise<number> {
  const url = 'https://api-testnet.bybit.com/v5/market/time';

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Парсинг и типизация данных
    const data: BybitTimeResponse = await response.json();
    return Number(data.result.timeSecond) * 1000

  } catch (error) {
    console.error('Error fetching Bybit time:', error);
  }
}

export default fetchBybitTime
