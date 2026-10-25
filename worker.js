export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // 1. Root paths: / or /impu or /impu/ -> /index.html
    if (pathname === '/' || pathname === '' || pathname === '/impu' || pathname === '/impu/') {
      return env.ASSETS.fetch(new URL('/index.html', request.url));
    }

    // 2. Subpath assets under /impu/: /impu/style.css -> /style.css, etc.
    if (pathname.startsWith('/impu/')) {
      const cleanPath = pathname.substring('/impu'.length);
      if (cleanPath === '' || cleanPath === '/') {
        return env.ASSETS.fetch(new URL('/index.html', request.url));
      }
      return env.ASSETS.fetch(new URL(cleanPath, request.url));
    }

    // 3. /jeevs or /jeevs/ -> /jeevs.html
    if (pathname === '/jeevs' || pathname === '/jeevs/') {
      return env.ASSETS.fetch(new URL('/jeevs.html', request.url));
    }

    // 4. Default asset pass-through
    const response = await env.ASSETS.fetch(new URL(pathname, request.url));
    if (response.status === 404 && !pathname.includes('.')) {
      return env.ASSETS.fetch(new URL('/index.html', request.url));
    }

    return response;
  }
};
