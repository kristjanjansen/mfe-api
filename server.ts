export default {
  async fetch(): Promise<Response> {
    const body = { message: "Hello world!" };
    return new Response(JSON.stringify(body), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
