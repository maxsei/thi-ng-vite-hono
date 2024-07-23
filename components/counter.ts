import { $replace } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { isNil } from "@thi.ng/checks";
import { ApiType } from "../server/api";
import { hc, ClientResponse } from "hono/client";

const isErr = (v: any) => v instanceof Error;
const onServer = () => typeof window === "undefined";

const jsonRespOrErr = async <T extends Promise<Response>>(
	r: T,
): Error | ReturnType<Awaited<T>["json"]> => {
	const rAw = await r;
	return rAw.ok ? await rAw.json() : new Error(await rAw.text());
};

const api = hc<ApiType>("/api");

export const counter = () => {
	if (onServer()) {
		return ["div", {}, "Loading..."];
	}
	const count = reactive<number | Error>(null);
	count.subscribe({
		next: (v) => {
			console.log(v);
		},
	});
	api.count
		.$get()
		.then(jore)
		.then((v) => count.next(v));

	const comp = (v: number) => [
		"div",
		{},
		[
			"button",
			{
				onclick: async () => {
					const next = count.deref() + 1;
					count.next(next);
					const v = await jsonRespOrErr(api.count.$post());
					if (isErr(v)) {
						console.error(v);
						count.next(next - 1);
						return;
					}
					if (v !== next) {
						count.next(v);
					}
				},
			},
			"+",
		],
		v,
	];

	return $replace(count.map((v) => (isNil(v) || isErr(v) ? v : comp(v))));
};
