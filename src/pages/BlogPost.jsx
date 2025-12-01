import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBlogPost } from '../lib/api';

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => getBlogPost(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-gray-600">Loading post...</p>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-gray-600">Post not found.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — Biogleam Blog</title>
        <meta name="description" content={post.summary || ''} />
      </Helmet>

      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/blog" className="text-accent hover:underline mb-4 inline-block">
            ← Back to Blog
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 mt-4">{post.title}</h1>

          {post.summary && (
            <p className="text-xl text-gray-600 mb-8">{post.summary}</p>
          )}

          <div className="flex items-center gap-4 mb-8 text-sm text-gray-500">
            {post.publishedAt && (
              <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.content && (
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
        </div>
      </article>
    </>
  );
}

