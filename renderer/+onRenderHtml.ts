// /**/+onRenderHtml.ts (usually /renderer/+onRenderHtml.ts)
// Environment: server

export { onRenderHtml };

import type { OnRenderHtmlAsync } from "vike/types";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import { serialize } from "@thi.ng/hiccup";

const onRenderHtml: OnRenderHtmlAsync = async (
	pageContext,
): ReturnType<OnRenderHtmlAsync> => {
	const { Page, data } = pageContext;
	const page = await Page();
	const pageHtml = serialize(page);
	console.log(pageHtml);
	const documentHtml = escapeInject`<!DOCTYPE html>
<html>
	<head>
		<title>${Page.title ?? ""}</title>
	</head>
	<body>
		<div id="page-root">${dangerouslySkipEscape(pageHtml)}</div>
	</body>
</html>`;
	return {
		documentHtml,
		pageContext: {
			// We can define pageContext values here
		},
	};
};
