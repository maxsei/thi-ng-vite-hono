// Environment: browser

export { onRenderClient };
import { $compile, $clear } from "@thi.ng/rdom";

async function onRenderClient(pageContext) {
	const { Page } = pageContext;
	const root = document.getElementById("page-root");
	$compile(await Page()).mount($clear(root));
}
