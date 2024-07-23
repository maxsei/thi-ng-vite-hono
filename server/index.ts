import { Hono } from "hono";
import { renderPage } from "vike/server";

import api from "./api";

const app = new Hono<{ Bindings: CloudflareBindings }>();
app.route("/api", api);

app.all("*", async (c) => {
	const pageContextInit = {
		...(c.get("context") ?? {}), // XXX: not used so far in our "framework"
		urlOriginal: c.req.url,
	};
	console.log(pageContextInit);
	const pageContext = await renderPage(pageContextInit);
	const response = pageContext.httpResponse;
	const { readable, writable } = new TransformStream();
	response?.pipe(writable);
	return new Response(readable, {
		status: response?.statusCode,
		headers: response?.headers,
	});
});

export default app;
