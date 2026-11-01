var CACHE = "timenotes-v2";

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(["./", "./index.html", "./manifest.json", "./icon-192.png"]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", function (e) {
  var url = e.request.url;
  if (e.request.method !== "GET" || url.indexOf("supabase.co") !== -1) {
    return;
  }
  e.respondWith(
    fetch(e.request)
      .then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return res;
      })
      .catch(function () {
        return caches.match(e.request);
      })
  );
});
