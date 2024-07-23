import { Hono } from "hono";

const api = new Hono<{ Bindings: CloudflareBindings }>();

let count = 0;
const getCount = api.get("/count", (c) => c.json(count));
const setCount = api.post("/count", (c) => {
	count += 1;
	return c.json(count);
});

export type ApiType = typeof getCount | typeof setCount;

export default api;
