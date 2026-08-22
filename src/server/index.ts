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

const notFound = (): Response =>
  new Response(JSON.stringify({ message: 'Not Found.' }), { status: 404 });

const Worker: ExportedHandler<Env> = {
  async fetch(request, env) {
    const { router } = await createContext(request, env);
    const { pathname } = new URL(request.url);
    const routes: CounttyRouter = {
      '/create': router.create,
      '/peek': router.peek,
      '/badge': router.badge,
      '/views': router.views,
      '/backup': router.backup,
      '/list': router.list,
      '/remove': router.remove,
    };

    return pathname in routes ? routes[pathname]() : notFound();
  },
};

export { Countty };
export default Worker;
