import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { marked } from "marked";
import { getPostBySlug } from "~/models/post.server";

type LoaderData = {
  title: string;
  html: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  // what invariant does is that it will throw an error if the slug is not provided.
  invariant(slug, "slug is required");
  const post = await getPostBySlug(slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  const html = marked(post.markdown);
  return json<LoaderData>({ title: post.title, html });
};

export default function PostRoute() {
  const { title, html } = useLoaderData() as LoaderData;
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  if (error instanceof Error) {
    return (
      <div className="text-red-500">
        Oh no, something went wrong!
        <pre>{error.message}</pre>
      </div>
    );
  }
  return <div className="text-red-500">Oh no, something went wrong!</div>;
}
