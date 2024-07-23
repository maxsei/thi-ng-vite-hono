// export default () => ["div", {}, "Hello World!"];
import { component } from "./styles.module.css";
import { counter } from "../../components/counter";

export const Page = async () => [
	`div.${component}`,
	{},
	"Hello World!",
	await counter(),
];
