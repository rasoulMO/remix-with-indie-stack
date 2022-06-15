// this file is used to access the post on database, this is only used in the server side.

export async function getPosts() {
	const posts = [
		{
			slug: "hello-world",
			title: "Hello World",
		},
		{
			slug: "my-first-remix-post",
			title: "My First Remix Post",
		},
	];

	return posts;
}
