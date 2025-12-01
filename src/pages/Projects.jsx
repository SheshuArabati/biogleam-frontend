import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../lib/api';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const projects = data || [];

  return (
    <>
      <Helmet>
        <title>Projects — Biogleam | Shine Your Brand Online</title>
        <meta name="description" content="Biogleam — Shine Your Brand Online. View our portfolio of custom websites and web applications." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-slate-900 to-primary text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              Our Projects
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore case studies from our recent work with restaurants, hotels, e-commerce stores, fitness centers, interior designers, and photo studios.
          </p>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="inline-block text-6xl mb-4"
              >
                ⚡
              </motion.div>
              <p className="text-gray-600 text-xl">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-primary mb-2">Coming Soon</h3>
              <p className="text-gray-600 text-lg mb-8">
                We're working on amazing projects. Check back soon to see our portfolio!
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-block"
              >
                <span>Start Your Project</span>
              </motion.a>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Featured <span className="gradient-text">Work</span>
                </h2>
                <p className="text-lg text-gray-600">
                  {projects.length} {projects.length === 1 ? 'Project' : 'Projects'} and counting
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    index={index}
                    slug={project.slug}
                    title={project.title}
                    summary={project.summary || ''}
                    image={project.images?.[0]}
                    client={project.client}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {projects.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Ready to Start Your <span className="gradient-text">Project</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch and let's discuss your vision.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a
                href="/contact"
                className="btn-primary inline-block"
              >
                <span>Get Started →</span>
              </a>
            </motion.div>
          </motion.div>
        </section>
      )}
    </>
  );
}
