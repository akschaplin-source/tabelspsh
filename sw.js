const CACHE_NAME = 'uchet-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  // Сюда можно добавить пути к вашим иконкам, если они есть: './icon-192.png'
];

// Установка Service Worker и кэширование файлов
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Активация и удаление старых кэшей
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Перехват запросов (работа офлайн)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
