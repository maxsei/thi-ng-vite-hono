import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { pages } from "vike-cloudflare";
import vike from "vike/plugin";
import { defineConfig } from "vite";

const entry = "./server/index.ts";

export default defineConfig({
	plugins: [
		devServer({
			entry,
			adapter,

			exclude: [
				/^\/@.+$/,
				/.*\.(ts|tsx|vue)($|\?)/,
				/.*\.(s?css|less)($|\?)/,
				/^\/favicon\.ico$/,
				/.*\.(svg|png)($|\?)/,
				/^\/(public|assets|static)\/.+/,
				/^\/node_modules\/.*/,
			],

			injectClientScript: false,
		}),
		vike({}),
		pages({
			server: {
				kind: "hono",
				entry,
			},
		}),
	],
});
