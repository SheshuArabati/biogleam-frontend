import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { createPortal } from 'react-dom';
import { getProjects, createProject, updateProject, deleteProject } from '../../lib/api';
import ImageUpload from '../../components/ImageUpload';

export default function AdminProjects() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (editingProject || isCreating) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [editingProject, isCreating]);

  const { data, isLoading } = useQuery({
    queryKey: ['projects', page, search],
    queryFn: () => getProjects(),
  });

  const projects = data || [];

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsCreating(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setEditingProject(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteMutation.mutate(id);
    }
  };

  const ProjectForm = ({ project, onClose }) => {
    const [projectImages, setProjectImages] = useState(project?.images || []);

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = {
            slug: formData.get('slug'),
            title: formData.get('title'),
            summary: formData.get('summary') || undefined,
            content: formData.get('content') || undefined,
            images: projectImages.length > 0 ? projectImages : undefined,
            client: formData.get('client') || undefined,
            publishedAt: formData.get('publishedAt') || undefined,
          };

          if (project.id) {
            updateMutation.mutate({ id: project.id, data });
          } else {
            createMutation.mutate(data);
          }
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Slug *</label>
          <input type="text" name="slug" defaultValue={project.slug} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Title *</label>
          <input type="text" name="title" defaultValue={project.title} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Summary</label>
          <textarea name="summary" defaultValue={project.summary} rows={3} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Content (HTML)</label>
          <textarea name="content" defaultValue={project.content} rows={10} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Images</label>
          <ImageUpload
            multiple
            maxImages={10}
            existingImages={projectImages}
            onImagesChange={setProjectImages}
            onMultipleUpload={(urls) => {
              setProjectImages([...projectImages, ...urls]);
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Client</label>
          <input type="text" name="client" defaultValue={project.client} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Published At (ISO datetime)</label>
          <input type="datetime-local" name="publishedAt" defaultValue={project.publishedAt ? new Date(project.publishedAt).toISOString().slice(0, 16) : ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300" />
        </div>
        <div className="flex gap-4 pt-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-accent to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex-1"
          >
            {project.id ? 'Update' : 'Create'}
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
          >
            Cancel
          </motion.button>
        </div>
      </form>
    );
  };

  return (
    <>
      <Helmet>
        <title>Manage Projects — Admin</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 particle-bg opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: -20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">Manage Projects</h1>
              <p className="text-gray-600">Create and manage your project portfolio</p>
            </div>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreating(true)}
                className="px-6 py-3 bg-gradient-to-r from-accent to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                + New Project
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/admin/dashboard"
                  className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                >
                  <span>←</span> Dashboard
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="inline-block text-6xl mb-4"
              >
                ⚡
              </motion.div>
              <p className="text-gray-600 text-xl">Loading projects...</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="card overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Slug</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Published</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {projects.map((project, index) => (
                      <motion.tr
                        key={project.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">{project.title}</td>
                        <td className="px-6 py-4 text-gray-600 font-mono text-sm">{project.slug}</td>
                        <td className="px-6 py-4 text-gray-600">{project.client || '-'}</td>
                        <td className="px-6 py-4">
                          {project.publishedAt ? (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {new Date(project.publishedAt).toLocaleDateString()}
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setEditingProject(project)}
                              className="px-4 py-2 bg-gradient-to-r from-accent to-cyan-500 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(project.id)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              Delete
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Create/Edit Modal */}
          {(editingProject || isCreating) && createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-start justify-center p-4 overflow-y-auto"
              style={{ 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                zIndex: 9999,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
              }}
              onClick={() => {
                setEditingProject(null);
                setIsCreating(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: -20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl relative flex flex-col"
                style={{ maxHeight: 'calc(100vh - 4rem)', minHeight: 'min-content' }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl -z-10" />
                <div className="bg-white rounded-t-2xl px-8 pt-8 pb-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-3xl font-bold gradient-text">{isCreating ? 'Create Project' : 'Edit Project'}</h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setEditingProject(null);
                      setIsCreating(false);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                <div className="px-8 pb-8 pt-4 overflow-y-auto flex-1">
                  <ProjectForm
                    project={editingProject || {}}
                    onClose={() => {
                      setEditingProject(null);
                      setIsCreating(false);
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          , document.body)}
        </div>
      </div>
    </>
  );
}
