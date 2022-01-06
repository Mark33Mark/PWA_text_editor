
// workbox-strategies installed for caching js and css.
// To respond to requests with a cached response, a strategy 
// called StaleWhileRevalidate is used with warmStrategyCache.
// These strategies first check the cache for a response, and 
// if it finds one, it returns it.


const { warmStrategyCache }                 = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate }  = require('workbox-strategies');
const { registerRoute }                     = require('workbox-routing');
const { CacheableResponsePlugin }           = require('workbox-cacheable-response');
const { ExpirationPlugin }                  = require('workbox-expiration');
const { precacheAndRoute }                  = require('workbox-precaching/precacheAndRoute');

// The precacheAndRoute() method takes an array of URLs to precache. The 
// self._WB_MANIFEST is an array that contains the list of URLs to precache.
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),

    // set cache expiry of 30 days.
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Set up asset cache
registerRoute(

  // Define the callback function to filter the requests we want to cache 
  // (in this case, JS and CSS files)
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  
  new StaleWhileRevalidate({
    // Name of the cache storage.
    cacheName: "asset-cache",
    plugins: [
      // Caches responses with headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })

);
