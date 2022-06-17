// this is going to be expose Specific Environmental Variables to The Client
// for all the enviroment variables, that we want to use in the server side, we need to add them to the .env file.
import invariant from "tiny-invariant";

export function getEnv() {
	invariant(process.env.ADMIN_EMAIL, "ADMIN_EMAIL should be defined");

	return {
		ADMIN_EMAIL: process.env.ADMIN_EMAIL,
	};
}

type ENV = ReturnType<typeof getEnv>;

declare global {
	var ENV: ENV;
	interface Window {
		ENV: ENV;
	}
}