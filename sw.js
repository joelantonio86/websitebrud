// =========================================================
// SERVICE WORKER - PWA Support
// =========================================================

const CACHE_NAME = 'banda-racional-v2';
const RUNTIME_CACHE = 'banda-racional-runtime-v2';

// Recursos para cachear na instalação
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/styles.css',
    '/styles-index.css',
    '/styles-improvements.css',
    '/styles-menu-submenu.css',
    '/js/main.js',
    '/js/navigation.js',
    '/js/animations.js',
    '/js/forms.js',
    '/js/utils.js',
    '/images/logo-nova.png'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Cache aberto');
                return cache.addAll(PRECACHE_URLS);
            })
            .catch((error) => {
                console.error('Service Worker: Erro ao cachear recursos', error);
            })
    );
    self.skipWaiting();
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                        console.log('Service Worker: Removendo cache antigo', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Interceptar requisições
self.addEventListener('fetch', (event) => {
    // Ignorar requisições que não são GET
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Ignorar requisições de API (serão feitas online)
    if (event.request.url.includes('/api/')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Retornar do cache se disponível
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                // Buscar da rede
                return fetch(event.request)
                    .then((response) => {
                        // Verificar se resposta é válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clonar resposta para cache
                        const responseToCache = response.clone();
                        
                        // Adicionar ao cache runtime
                        caches.open(RUNTIME_CACHE)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Se offline e não estiver no cache, retornar página offline
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});
