import { routes } from "@/route.js";
import fastify from "fastify";

const app = fastify({
  logger: true,
});

app.register(routes);

export default app;
