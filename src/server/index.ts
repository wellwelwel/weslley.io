/// <reference types="@cloudflare/workers-types" />

import type { CounttyRouter, Env } from 'countty';
import { createCountty } from 'countty';

const { Countty, createContext } = createCountty({
  cacheMs: 1000,
  rateLimit: {
    maxRequests: 100,
    windowMs: 10000,
    blockDurationMs: 10000,
  },
});

const Worker: ExportedHandler<Env> = {
  async fetch(request, env) {
    // Countty Routes
    const { router } = await createContext(request, env);
    const url = new URL(request.url);
    const { pathname } = url;
    const counttyRoute: CounttyRouter = {
      '/create': router.create,
      '/peek': router.peek,
      '/badge': router.badge,
      '/views': router.views,
      '/backup': router.backup,
      '/list': router.list,
      '/remove': router.remove,
    };

    if (pathname in counttyRoute) return counttyRoute[pathname]();

    // Website Routes
    return new Response(JSON.stringify({ message: 'Not Found.' }), {
      status: 404,
    });
  },
};

export { Countty };
export default Worker;
