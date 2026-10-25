export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle /jeevs and /jeevs/
    if (pathname === '/jeevs' || pathname === '/jeevs/') {
      return env.ASSETS.fetch(new URL('/jeevs.html', request.url));
    }

    // Handle /impu and /impu/
    if (pathname === '/impu' || pathname === '/impu/') {
      return env.ASSETS.fetch(new URL('/', request.url));
    }

    // Handle subpath assets: /impu/style.css -> /style.css, etc.
    if (pathname.startsWith('/impu/')) {
      const cleanPath = pathname.substring('/impu'.length);
      return env.ASSETS.fetch(new URL(cleanPath, request.url));
    }

    // Default pass-through to static assets
    return env.ASSETS.fetch(request);
  }
};
