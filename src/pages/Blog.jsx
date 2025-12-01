import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBlogPosts } from '../lib/api';

export default function Blog() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: getBlogPosts,
  });

  const posts = data || [];

  return (
    <>
      <Helmet>
        <title>Blog — Biogleam | Shine Your Brand Online</title>
        <meta
          name="description"
          content="Biogleam — Shine Your Brand Online. Read our latest articles on web design, case studies, and tips for restaurants, interior designers, and photo studios."
        />
      </Helmet>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Blog</h1>
            <p className="text-xl text-gray-600">
              Tips, case studies, and insights on web design and development.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No blog posts available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-bold text-primary mb-3 hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  {post.summary && (
                    <p className="text-gray-600 mb-4">{post.summary}</p>
                  )}
                  <div className="flex items-center justify-between">
                    {post.publishedAt && (
                      <time className="text-sm text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </time>
                    )}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-accent font-semibold hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
