// this file is used to access the post on database, this is only used in the server side.
import { prisma } from '~/db.server'

// this function is used to solve data overFetching problem.
export async function getPostListing() {
	const posts = await prisma.post.findMany({
		select: {
			slug: true,
			title: true,
		}
	})
	return posts
}


export async function getPosts() {
	// const posts = [
	// 	{
	// 		slug: "hello-world",
	// 		title: "Hello World",
	// 	},
	// 	{
	// 		slug: "my-first-remix-post",
	// 		title: "My First Remix Post",
	// 	},
	// ];
	// return posts;

	// this will get all the posts from the database
	return prisma.post.findMany();
}

export async function getPostBySlug(slug: string) {
	return prisma.post.findUnique({ where: { slug } });
}