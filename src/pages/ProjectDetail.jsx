import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProject } from '../lib/api';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => getProject(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-gray-600">Loading project...</p>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-gray-600">Project not found.</p>
        </div>
      </section>
    );
  }

  return (
      <>
        <Helmet>
          <title>{project.title} — Biogleam</title>
        <meta name="description" content={project.summary || ''} />
      </Helmet>

      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {project.client && (
            <p className="text-sm text-gray-500 mb-2">{project.client}</p>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">{project.title}</h1>
          {project.summary && (
            <p className="text-xl text-gray-600 mb-8">{project.summary}</p>
          )}

          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}

          {project.content && (
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          )}
        </div>
      </article>
    </>
  );
}

