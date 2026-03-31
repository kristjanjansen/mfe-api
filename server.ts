import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

const app = new Hono();

app.use("*", cors());

const bills = [
  { id: 1, title: "January 2026", amount: 142.5, status: "paid" },
  { id: 2, title: "February 2026", amount: 138.2, status: "unpaid" },
  { id: 3, title: "March 2026", amount: 155.8, status: "unpaid" },
];

app.get("/api/v2/bills", (c) =>
  c.json({ data: bills, meta: { timestamp: new Date().toISOString() } })
);

app.get("/api/v2/bills/:id", (c) => {
  const bill = bills.find((b) => b.id === Number(c.req.param("id")));
  if (!bill) return c.json({ error: "Not found" }, 404);
  return c.json({ data: bill });
});

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

const port = Number(process.env.PORT) || 5000;
console.log(`Listening on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
// test deploy teisipäev 31 märts 2026 08:55.24 EEST
