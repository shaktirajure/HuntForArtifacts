const STATIC_CACHE_NAME = 'artifact-hunter-static-v2';
const RUNTIME_CACHE_NAME = 'artifact-hunter-runtime-v2';
const ARTIFACT_CACHE_NAME = 'artifact-hunter-artifacts-v2';

// Static assets to cache
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  // Note: Vite handles JS/CSS file names with hashes, so we'll cache them at runtime
];

// Maximum number of artifact pages to cache
const MAX_ARTIFACT_CACHE = 10;

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== RUNTIME_CACHE_NAME && 
                cacheName !== ARTIFACT_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle artifact pages specifically
  if (url.pathname.startsWith('/artifacts/') && url.pathname !== '/artifacts') {
    event.respondWith(handleArtifactPage(request));
    return;
  }

  // Handle static assets and API calls
  if (url.origin === location.origin) {
    event.respondWith(handleSameOriginRequest(request));
    return;
  }

  // Handle external resources (like images)
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
    return;
  }
});

// Handle artifact pages with LRU cache
async function handleArtifactPage(request) {
  const cache = await caches.open(ARTIFACT_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    console.log('Serving artifact page from cache:', request.url);
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      console.log('Caching artifact page:', request.url);
      
      // Implement LRU cache - remove oldest entries if we exceed limit
      const keys = await cache.keys();
      if (keys.length >= MAX_ARTIFACT_CACHE) {
        // Remove the oldest entry
        await cache.delete(keys[0]);
      }
      
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed for artifact page, serving from cache if available');
    return cachedResponse || new Response('Offline - Page not available', { status: 503 });
  }
}

// Handle same-origin requests (static assets, API)
async function handleSameOriginRequest(request) {
  const staticCache = await caches.open(STATIC_CACHE_NAME);
  const runtimeCache = await caches.open(RUNTIME_CACHE_NAME);
  
  // Check static cache first
  let cachedResponse = await staticCache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Check runtime cache
  cachedResponse = await runtimeCache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache JS, CSS, and font files
      if (request.destination === 'script' || 
          request.destination === 'style' || 
          request.destination === 'font' ||
          request.url.includes('.js') ||
          request.url.includes('.css')) {
        console.log('Caching static asset:', request.url);
        await staticCache.put(request, networkResponse.clone());
      } else {
        // Cache other requests in runtime cache
        await runtimeCache.put(request, networkResponse.clone());
      }
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network request failed:', request.url);
    return new Response('Offline', { status: 503 });
  }
}

// Handle external images with cache-first strategy
async function handleImageRequest(request) {
  const cache = await caches.open(RUNTIME_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('Image not available offline', { status: 503 });
  }
}
