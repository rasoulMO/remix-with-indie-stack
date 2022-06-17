// this file is used to access the post on database, this is only used in the server side.
import type { Post } from '@prisma/client';
import { prisma } from '~/db.server'

export type { Post };

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

export async function createPost(post: Pick<Post, "slug" | "title" | "markdown">) {
	return prisma.post.create({ data: post });
}

export async function updatePost(
	slug: string,
	post: Pick<Post, "slug" | "title" | "markdown">
) {
	return prisma.post.update({ data: post, where: { slug } });
}

export async function deletePost(slug: string) {
	return prisma.post.delete({ where: { slug } });
}