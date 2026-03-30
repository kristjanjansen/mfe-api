import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

const app = new Hono();

app.use("*", cors());

app.get("/api/v2/bills", (c) =>
  c.json({
    data: [
      { id: 1, title: "First title" },
      { id: 2, title: "Second title" },
    ],
    meta: { timestamp: new Date().toISOString() },
  })
);

app.get("/api/v1/session", (c) =>
  c.json({
    authenticated: true,
    user: { id: "user-1", name: "Test User", email: "test@example.com" },
    mandates: [
      { id: "m-1", type: "residential", label: "Home" },
      { id: "m-2", type: "business", label: "Company OÜ" },
    ],
    activeMandate: "m-1",
  })
);

app.get("/api/v1/mandates", (c) =>
  c.json([
    { id: "m-1", type: "residential", label: "Home" },
    { id: "m-2", type: "business", label: "Company OÜ" },
  ])
);

const port = Number(process.env.PORT) || 4000;
console.log(`Listening on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
