import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPostListing } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListing>>;
};

// this loader is used just on the server.
export const loader: LoaderFunction = async () => {
  const posts = await getPostListing();

  // this is what we have to do if we don't use {json} from "@remix-run/node"
  // const postsString = JSON.stringify({ posts });

  // return new Response(postsString, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // here we still can incude headers if we need to...
  // for getPosts we could plucked off the pieces of the response we didn't need
  return json<LoaderData>({ posts });
};

export default function PostsRoute() {
  // we use useLoaderData to get the data in the client.
  const { posts } = useLoaderData() as LoaderData;

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/posts/${post.slug}`}
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
