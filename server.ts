const response = {
  data: [
    {
      id: 1,
      title: "First title",
    },
    {
      id: 2,
      title: "Second title",
    },
  ],
  meta: {
    timestamp: new Date().toISOString(),
    env: {
      BILLING_BACKEND_URL: process.env.BILLING_BACKEND_URL,
    },
  },
};

export default {
  async fetch(): Promise<Response> {
    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
