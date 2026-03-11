const http = require('http');

const port = process.argv[2];

const server = http.createServer(function (req, res) {
  // Парсимо URL запиту. Додаємо фіктивний домен (http://example.com), 
  // оскільки req.url містить лише шлях (наприклад, /api/parsetime?iso=...), а об'єкт URL вимагає повну адресу
  const parsedUrl = new URL(req.url, 'http://example.com');
  
  // Отримуємо значення параметра 'iso' з адресного рядка
  const isoTime = parsedUrl.searchParams.get('iso');
  const date = new Date(isoTime);

  let result;

  // Перевіряємо, на який саме маршрут (route) прийшов запит
  if (parsedUrl.pathname === '/api/parsetime') {
    result = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
  } else if (parsedUrl.pathname === '/api/unixtime') {
    result = {
      unixtime: date.getTime()
    };
  }

  // Якщо маршрут розпізнано і результат сформовано
  if (result) {
    // Встановлюємо правильні заголовки
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // Перетворюємо JavaScript-об'єкт на рядок JSON і відправляємо
    res.end(JSON.stringify(result));
  } else {
    // Якщо прийшов запит на невідомий маршрут
    res.writeHead(404);
    res.end('Not found\n');
  }
});

// Запускаємо сервер
server.listen(Number(port));