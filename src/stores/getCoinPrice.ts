// Типы для данных, возвращаемых API
interface KlineResponse {
  retCode: number;
  retMsg: string;
  result: {
    symbol: string;
    category: string;
    list: Array<[string, string, string, string, string, string, string]>; // Таймстемп, open, high, low, close, volume, turnover
  };
  retExtInfo: Record<string, any>;
  time: number;
}

// Функция для получения данных
export default async function getCoinPrice(symbol: string, interval: string = '5'): Promise<void> {
  const url = "https://api-testnet.bybit.com/v5/market/kline";
  const params = new URLSearchParams({
    category: "linear", // Категория данных
    symbol: symbol,  // Символ
    interval: interval,      // Интервал свечей
  });

  try {
    // Отправляем запрос с использованием fetch
    const response = await fetch(`${url}?${params.toString()}`);
    
    // Проверяем статус ответа
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Преобразуем ответ в JSON
    const data: KlineResponse = await response.json();

    if (data.retCode === 0) {
      console.log("API Response:", data.result);

      // Обработка данных (пример: выводим свечи)
      data.result.list.forEach((candle) => {
        const [timestamp, open, high, low, close, volume, turnover] = candle;
        console.log(
          `Time: ${new Date(parseInt(timestamp)).toISOString()}, Open: ${open}, High: ${high}, Low: ${low}, Close: ${close}, Volume: ${volume}, Turnover: ${turnover}`
        );
      });
    } else {
      console.error(`Error: ${data.retMsg}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
