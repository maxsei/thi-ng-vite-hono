// import { ApiType } from '../api'
// import { hc } from 'hono/client'
import { $replace } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { isNil } from "@thi.ng/checks";

const isErr = (v: any) => v instanceof Error;
const onServer = () => typeof window === "undefined";

const fetchThrow = async (
	input: string | URL | Request,
	init?: RequestInit,
): Promise<Response | Error> => {
	try {
		const r = await fetch(input, init);
		if (!r.ok) return new Error(await r.text());
		return await r.json();
	} catch (e) {
		return e;
	}
};

// const COUNT_URL = "http://localhost:3002/api/count";
const COUNT_URL = "/api/count";

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
	fetchThrow(COUNT_URL).then((v) => count.next(v));

	const comp = (v: number) => [
		"div",
		{},
		[
			"button",
			{
				onclick: () => {
					count.next(count.deref() + 1);
					fetchThrow(COUNT_URL, { method: "POST" }).then((v) =>
						count.next(isErr() ? count.deref() - 1 : v),
					);
				},
			},
			"+",
		],
		v,
	];

	return $replace(count.map((v) => (isNil(v) || isErr(v) ? v : comp(v))));
};
